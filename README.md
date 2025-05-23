# Neuro Scan AI

An advanced AI-powered brain tumor detection and classification application built with React, FastAPI, and deep learning.

## Features

- Upload and analyze MRI scans for brain tumor detection
- Real-time AI prediction with visual probability scores
- Detailed results with tumor classification and confidence metrics
- Scan history management for registered users
- Educational resources about brain tumor types
- Responsive design optimized for medical professionals

## Tech Stack

### Frontend
- React with TypeScript
- Tailwind CSS for styling
- React Router for navigation
- Axios for API communication
- React Dropzone for file uploads

### Backend
- FastAPI for the API server
- Python for AI model integration
- Uvicorn as the ASGI server
- PIL for image processing
- Docker for containerization

## Getting Started

### Prerequisites
- Node.js 16+
- Python 3.10+
- Docker and Docker Compose (for containerized deployment)

### Development Setup

1. Clone the repository:
   ```
   git clone https://github.com/sahkanu34/neuro-scan-ai.git
   cd neuro-scan-ai
   ```

2. Install frontend dependencies:
   ```
   npm install
   ```

3. Install backend dependencies:
   ```
   cd backend
   pip install -r requirements.txt
   ```

4. Start the frontend development server:
   ```
   npm run dev
   ```

5. Start the backend server:
   ```
   cd backend
   uvicorn main:app --reload
   ```

### Docker Deployment

1. Build and start the containers:
   ```
   docker-compose up -d
   ```

2. Access the application:
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:8000

## Project Structure

```
neuro-scan-ai/
├── src/                    # Frontend source code
│   ├── components/         # React components
│   ├── pages/              # Page components
│   ├── lib/                # Utility functions and API
│   └── ...
├── backend/                # FastAPI backend
│   ├── main.py             # Main API endpoints
│   └── requirements.txt    # Python dependencies
├── public/                 # Static assets
├── Dockerfile              # Backend Docker configuration
├── Dockerfile.frontend     # Frontend Docker configuration
└── docker-compose.yml      # Docker Compose configuration
```

## API Endpoints

- `POST /upload-scan/` - Upload an MRI scan for analysis
- `GET /scan-results/{scan_id}` - Get analysis results for a specific scan
- `GET /classifications/` - Get all possible tumor classifications

## Deployment Options

The application can be deployed using:

1. Docker and Docker Compose (recommended)
2. Kubernetes for production scaling
3. Manual deployment of frontend and backend separately

## License

[MIT License](LICENSE)