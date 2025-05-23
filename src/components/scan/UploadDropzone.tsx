import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X, Image, AlertCircle } from 'lucide-react';
import { cn } from '../../lib/utils';
import Button from '../ui/Button';

interface UploadDropzoneProps {
  onFileSelected: (file: File) => void;
  className?: string;
}

const UploadDropzone: React.FC<UploadDropzoneProps> = ({ onFileSelected, className }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setError(null);
    
    if (acceptedFiles.length === 0) {
      return;
    }
    
    const file = acceptedFiles[0];
    
    // Check file type (only allow image files)
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file');
      return;
    }
    
    // Check file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError('File is too large. Maximum size is 10MB');
      return;
    }
    
    // Create preview
    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
    
    // Call the callback
    onFileSelected(file);
  }, [onFileSelected]);
  
  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.tiff', '.dicom', '.dcm']
    },
    maxFiles: 1
  });
  
  const resetUpload = () => {
    setPreview(null);
    setError(null);
  };
  
  return (
    <div className={className}>
      {!preview && !error && (
        <div 
          {...getRootProps()} 
          className={cn(
            'border-2 border-dashed rounded-lg p-6 cursor-pointer transition-colors flex flex-col items-center justify-center text-center h-64',
            isDragActive ? 'border-primary-500 bg-primary-50' : 'border-gray-300 hover:border-primary-400',
            isDragReject && 'border-error-500 bg-error-50'
          )}
        >
          <input {...getInputProps()} />
          <Upload 
            className={cn(
              'w-12 h-12 mb-4',
              isDragActive ? 'text-primary-500' : 'text-gray-400',
              isDragReject && 'text-error-500'
            )} 
          />
          
          {isDragActive ? (
            <p className="text-primary-600 font-medium">Drop the MRI scan here</p>
          ) : (
            <>
              <p className="text-gray-700 font-medium mb-2">Drag and drop your MRI scan here</p>
              <p className="text-gray-500 text-sm mb-4">or click to browse files</p>
              <p className="text-gray-400 text-xs">Supported formats: JPEG, PNG, TIFF, DICOM</p>
              <p className="text-gray-400 text-xs">Maximum size: 10MB</p>
            </>
          )}
        </div>
      )}
      
      {error && (
        <div className="border-2 border-error-300 rounded-lg p-6 bg-error-50">
          <div className="flex items-center mb-4">
            <AlertCircle className="text-error-500 w-6 h-6 mr-2" />
            <h3 className="text-error-700 font-medium">Upload Error</h3>
          </div>
          <p className="text-error-600 mb-4">{error}</p>
          <Button
            onClick={resetUpload}
            variant="outline"
            size="sm"
          >
            Try Again
          </Button>
        </div>
      )}
      
      {preview && (
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-gray-50 px-4 py-3 border-b flex justify-between items-center">
            <div className="flex items-center">
              <Image className="w-5 h-5 text-gray-500 mr-2" />
              <span className="text-gray-700 font-medium">MRI Scan Preview</span>
            </div>
            <Button 
              onClick={resetUpload}
              variant="ghost" 
              size="sm" 
              icon={<X className="w-4 h-4" />}
              aria-label="Remove image"
            />
          </div>
          <div className="p-4">
            <div className="relative rounded-md overflow-hidden">
              <img 
                src={preview} 
                alt="MRI Scan Preview" 
                className="max-h-64 mx-auto" 
              />
            </div>
            <div className="flex justify-end mt-4">
              <Button
                onClick={resetUpload}
                variant="outline"
                size="sm"
                className="mr-2"
              >
                Change Image
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadDropzone;