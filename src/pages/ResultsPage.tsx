import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Printer, Download, Share2 } from 'lucide-react';
import Button from '../components/ui/Button';
import ScanViewer from '../components/results/ScanViewer';
import ClassificationResult from '../components/results/ClassificationResult';
import { getScanResults, ScanResult } from '../lib/api';
import { formatDate } from '../lib/utils';

const ResultsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [result, setResult] = useState<ScanResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResult = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const data = await getScanResults(id);
        setResult(data);
      } catch (err) {
        console.error('Error fetching results:', err);
        setError('Failed to load the scan results. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchResult();
  }, [id]);

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    if (navigator.share && window.location.href) {
      navigator.share({
        title: 'NeuroScan AI Results',
        text: 'Check out these brain scan results from NeuroScan AI',
        url: window.location.href,
      }).catch((error) => {
        console.log('Error sharing:', error);
      });
    } else {
      // Copy to clipboard if Web Share API is not available
      navigator.clipboard.writeText(window.location.href).then(() => {
        alert('Link copied to clipboard!');
      });
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="text-center py-20">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Analyzing scan results...</p>
        </div>
      </div>
    );
  }

  if (error || !result) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {error || 'Result not found'}
          </h2>
          <p className="text-gray-600 mb-8">
            {error ? 'An error occurred while loading the scan results.' : 'The requested scan result could not be found.'}
          </p>
          <Link to="/scan">
            <Button>Upload a New Scan</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
        <div>
          <Link to="/scan" className="flex items-center text-gray-600 hover:text-gray-900 mb-2">
            <ArrowLeft className="w-4 h-4 mr-1" />
            <span>Back to Scan Upload</span>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Scan Results</h1>
          <p className="text-gray-600">
            Analyzed on {formatDate(result.timestamp)}
          </p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            icon={<Printer className="w-4 h-4" />}
            onClick={handlePrint}
          >
            Print
          </Button>
          <Button
            variant="outline"
            icon={<Share2 className="w-4 h-4" />}
            onClick={handleShare}
          >
            Share
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <ScanViewer imageUrl={result.imageUrl} />
        <ClassificationResult result={result} />
      </div>
      
      {result.patientInfo && Object.values(result.patientInfo).some(value => value) && (
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Patient Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {result.patientInfo.id && (
              <div>
                <p className="text-sm text-gray-500">Patient ID</p>
                <p className="font-medium">{result.patientInfo.id}</p>
              </div>
            )}
            {result.patientInfo.age && (
              <div>
                <p className="text-sm text-gray-500">Age</p>
                <p className="font-medium">{result.patientInfo.age}</p>
              </div>
            )}
            {result.patientInfo.gender && (
              <div>
                <p className="text-sm text-gray-500">Gender</p>
                <p className="font-medium">{result.patientInfo.gender}</p>
              </div>
            )}
          </div>
          {result.patientInfo.notes && (
            <div className="mt-4">
              <p className="text-sm text-gray-500">Clinical Notes</p>
              <p className="mt-1">{result.patientInfo.notes}</p>
            </div>
          )}
        </div>
      )}
      
      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Disclaimer</h2>
        <p className="text-sm text-gray-600">
          This analysis is provided for informational purposes only and should not be considered a 
          substitute for professional medical advice, diagnosis, or treatment. Always seek the advice 
          of a qualified healthcare provider with any questions regarding a medical condition. NeuroScan AI 
          has an accuracy rate of approximately 97%, but false positives and false negatives can occur.
        </p>
      </div>
    </div>
  );
};

export default ResultsPage;