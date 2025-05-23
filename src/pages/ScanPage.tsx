import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload } from 'lucide-react';
import UploadDropzone from '../components/scan/UploadDropzone';
import PatientInfoForm from '../components/scan/PatientInfoForm';
import Button from '../components/ui/Button';
import { uploadScan } from '../lib/api';

const ScanPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [patientInfo, setPatientInfo] = useState({
    id: '',
    age: '',
    gender: '',
    notes: ''
  });

  const handleFileSelected = (file: File) => {
    setSelectedFile(file);
  };

  const handlePatientInfoChange = (info: any) => {
    setPatientInfo(info);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedFile) {
      return;
    }
    
    try {
      setIsUploading(true);
      
      // Convert patient info to match expected format
      const formattedPatientInfo = {
        ...patientInfo,
        age: patientInfo.age ? parseInt(patientInfo.age, 10) : undefined
      };
      
      // Upload scan
      const scanId = await uploadScan(selectedFile, formattedPatientInfo);
      
      // Navigate to results page
      navigate(`/results/${scanId}`);
    } catch (error) {
      console.error('Error uploading scan:', error);
      // In a real app, we would show an error notification here
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="py-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 animate-fade-in">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Upload MRI Scan</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Upload an MRI scan image to analyze and detect potential brain tumors using our AI model.
          For optimal results, use high-quality images in JPEG, PNG, or DICOM format.
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Upload Scan Image</h2>
          <UploadDropzone onFileSelected={handleFileSelected} />
        </div>
        
        <PatientInfoForm patientInfo={patientInfo} onChange={handlePatientInfoChange} />
        
        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={!selectedFile || isUploading}
            isLoading={isUploading}
            icon={<Upload className="w-5 h-5" />}
            size="lg"
          >
            {isUploading ? 'Processing...' : 'Analyze Scan'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ScanPage;