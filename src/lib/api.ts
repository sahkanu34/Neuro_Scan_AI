import axios from 'axios';

// API base URL (make sure your FastAPI backend is running on this port)
const API_BASE_URL = 'http://localhost:8000';

// Type definitions
export interface ScanResult {
  id: string;
  timestamp: string;
  imageUrl: string;
  prediction: {
    classification: string;
    confidence: number;
    probabilities: Record<string, number>;
  };
  patientInfo?: {
    id?: string;
    age?: number;
    gender?: string;
    notes?: string;
  };
}

export interface Classification {
  id: string;
  name: string;
  description: string;
}

// Initialize the API with better error handling
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // 30 second timeout for large file uploads
  headers: {
    'Accept': 'application/json',
  },
});

// Function to upload an MRI scan and get predictions
export async function uploadScan(file: File, patientInfo?: any): Promise<string> {
  try {
    // Create a form data object
    const formData = new FormData();
    formData.append('file', file);
    
    if (patientInfo) {
      formData.append('patientInfo', JSON.stringify(patientInfo));
    }
    
    // Make API call to upload scan
    const response = await api.post('/upload-scan/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total!);
        console.log(`Upload Progress: ${percentCompleted}%`);
      },
    });
    
    if (!response.data || !response.data.scan_id) {
      throw new Error('Invalid response from server');
    }
    
    return response.data.scan_id;
  } catch (error: any) {
    console.error('Error uploading scan:', error);
    if (error.response) {
      throw new Error(error.response.data.detail || 'Failed to upload scan. Please try again.');
    }
    throw new Error('Failed to upload scan. Please check your connection and try again.');
  }
}

// Function to get the prediction results for a scan
export async function getScanResults(scanId: string): Promise<ScanResult> {
  try {
    if (!scanId) {
      throw new Error('Scan ID is required');
    }

    // Make API call to get scan results
    const response = await api.get(`/scan-results/${scanId}`);
    
    if (!response.data) {
      throw new Error('No data received from server');
    }

    // Process the response data
    const data = response.data;
    const result: ScanResult = {
      id: data.id,
      timestamp: data.timestamp,
      imageUrl: data.imageUrl,
      prediction: {
        classification: data.prediction.classification,
        confidence: typeof data.prediction.confidence === 'string' 
          ? parseFloat(data.prediction.confidence) 
          : data.prediction.confidence,
        probabilities: data.prediction.probabilities,
      },
      patientInfo: data.patientInfo,
    };
    
    // Fix the image URL to include the base URL if it's a relative path
    if (result.imageUrl && result.imageUrl.startsWith('/')) {
      result.imageUrl = `${API_BASE_URL}${result.imageUrl}`;
    }
    
    // Add to local history
    try {
      const history = JSON.parse(localStorage.getItem('scan_history') || '[]');
      history.push({
        id: scanId,
        timestamp: result.timestamp,
        classification: result.prediction.classification,
        confidence: result.prediction.confidence
      });
      localStorage.setItem('scan_history', JSON.stringify(history));
    } catch (storageError) {
      console.warn('Failed to update scan history:', storageError);
    }
    
    return result;
  } catch (error: any) {
    console.error('Error getting scan results:', error);
    if (error.response) {
      throw new Error(error.response.data.detail || 'Failed to get scan results. Please try again.');
    }
    throw new Error('Failed to get scan results. Please check your connection and try again.');
  }
}

// Get all tumor classifications
export async function getClassifications(): Promise<Classification[]> {
  try {
    const response = await api.get('/classifications/');
    if (!Array.isArray(response.data)) {
      throw new Error('Invalid response format');
    }
    return response.data;
  } catch (error: any) {
    console.error('Error getting classifications:', error);
    if (error.response) {
      throw new Error(error.response.data.detail || 'Failed to get classifications. Please try again.');
    }
    throw new Error('Failed to get classifications. Please check your connection and try again.');
  }
}

// Get scan history
export async function getScanHistory(): Promise<
  Array<{
    id: string;
    timestamp: string;
    classification: string;
    confidence: number;
  }>
> {
  try {
    const history = localStorage.getItem('scan_history');
    return history ? JSON.parse(history) : [];
  } catch (error) {
    console.error('Error getting scan history:', error);
    return [];
  }
}

// Initialize API module with better error handling
export function initializeApi() {
  // Set up axios defaults
  axios.defaults.baseURL = API_BASE_URL;
  
  // Add request interceptor for logging
  api.interceptors.request.use(
    (config) => {
      console.log(`Making ${config.method?.toUpperCase()} request to ${config.url}`);
      return config;
    },
    (error) => {
      console.error('Request error:', error);
      return Promise.reject(error);
    }
  );
  
  // Add response interceptor for better error handling
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('API Error Response:', {
          status: error.response.status,
          data: error.response.data,
          headers: error.response.headers,
        });
      } else if (error.request) {
        // The request was made but no response was received
        console.error('API Error Request:', error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('API Error:', error.message);
      }
      return Promise.reject(error);
    }
  );
}