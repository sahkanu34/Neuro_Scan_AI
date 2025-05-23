import React, { useEffect, useState } from 'react';
import { getScanHistory } from '../lib/api';
import ScanHistoryTable from '../components/history/ScanHistoryTable';

const HistoryPage: React.FC = () => {
  const [scans, setScans] = useState<Array<{
    id: string;
    timestamp: string;
    classification: string;
    confidence: number;
  }>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true);
        const history = await getScanHistory();
        // Sort by timestamp, newest first
        const sortedHistory = [...history].sort((a, b) => {
          return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
        });
        setScans(sortedHistory);
      } catch (err) {
        console.error('Error fetching scan history:', err);
        setError('Failed to load scan history. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  return (
    <div className="py-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 animate-fade-in">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Scan History</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          View and analyze your previous MRI scan results. Click on any scan to view detailed analysis.
        </p>
      </div>
      
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : error ? (
        <div className="bg-error-50 p-4 rounded-md border border-error-200 mb-6">
          <p className="text-error-800">{error}</p>
        </div>
      ) : scans.length === 0 ? (
        <p className="text-center">No scan history available.</p>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <ScanHistoryTable scans={scans} isLoading={loading} />
        </div>
      )}
    </div>
  );
};

export default HistoryPage;