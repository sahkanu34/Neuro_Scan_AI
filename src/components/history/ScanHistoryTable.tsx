import React from 'react';
import { Link } from 'react-router-dom';
import { formatDate, formatPercentage, getConfidenceColor } from '../../lib/utils';
import { ArrowRight, Brain } from 'lucide-react';

interface ScanHistoryItem {
  id: string;
  timestamp: string;
  classification: string;
  confidence: number;
}

interface ScanHistoryTableProps {
  scans: ScanHistoryItem[];
  isLoading?: boolean;
}

const CLASSIFICATION_LABELS: Record<string, string> = {
  glioma: 'Glioma',
  meningioma: 'Meningioma',
  pituitary: 'Pituitary Tumor',
  no_tumor: 'No Tumor Detected'
};

const ScanHistoryTable: React.FC<ScanHistoryTableProps> = ({ scans = [], isLoading = false }) => {
  if (isLoading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-10 bg-gray-200 rounded"></div>
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-16 bg-gray-100 rounded"></div>
        ))}
      </div>
    );
  }
  
  if (scans.length === 0) {
    return (
      <div className="text-center py-10 bg-gray-50 rounded-lg border border-gray-200">
        <Brain className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-medium text-gray-900">No scan history</h3>
        <p className="mt-1 text-sm text-gray-500">Get started by uploading your first MRI scan.</p>
        <div className="mt-6">
          <Link
            to="/scan"
            className="btn btn-primary"
          >
            Upload a Scan
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Result
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Confidence
            </th>
            <th scope="col" className="relative px-6 py-3">
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {scans.map((scan) => (
            <tr key={scan.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {formatDate(scan.timestamp)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="text-sm font-medium text-gray-900">
                  {CLASSIFICATION_LABELS[scan.classification] || scan.classification}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`badge badge-${getConfidenceColor(scan.confidence)}`}>
                  {formatPercentage(scan.confidence)}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <Link to={`/results/${scan.id}`} className="text-primary-600 hover:text-primary-900 flex items-center justify-end">
                  View Details
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ScanHistoryTable;