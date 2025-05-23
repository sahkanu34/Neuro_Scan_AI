import React from 'react';
import { ScanResult } from '../../lib/api';
import { formatPercentage, getConfidenceColor } from '../../lib/utils';
import { AlertCircle, CheckCircle2, AlertTriangle } from 'lucide-react';

interface ClassificationResultProps {
  result: ScanResult;
}

const CLASSIFICATION_LABELS: Record<string, { name: string; icon: React.ReactNode }> = {
  glioma: { 
    name: 'Glioma', 
    icon: <AlertCircle className="h-6 w-6 text-error-500" />
  },
  meningioma: { 
    name: 'Meningioma', 
    icon: <AlertTriangle className="h-6 w-6 text-warning-500" />
  },
  pituitary: { 
    name: 'Pituitary Tumor', 
    icon: <AlertTriangle className="h-6 w-6 text-warning-500" />
  },
  no_tumor: { 
    name: 'No Tumor Detected', 
    icon: <CheckCircle2 className="h-6 w-6 text-success-500" />
  }
};

const ClassificationResult: React.FC<ClassificationResultProps> = ({ result }) => {
  const { prediction } = result;
  const classification = prediction.classification;
  const confidence = prediction.confidence;
  const confidenceColor = getConfidenceColor(confidence);
  
  const classInfo = CLASSIFICATION_LABELS[classification] || {
    name: 'Unknown',
    icon: <AlertCircle className="h-6 w-6 text-gray-500" />
  };

  return (
    <div className="card overflow-visible">
      <div className="p-6">
        <div className="flex items-center mb-6">
          <div className="mr-3">
            {classInfo.icon}
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900">{classInfo.name}</h3>
            <div className="flex items-center mt-1">
              <div className={`badge badge-${confidenceColor}`}>
                Confidence: {formatPercentage(confidence)}
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">Probability Distribution</h4>
            {Object.entries(prediction.probabilities).map(([key, value]) => {
              const label = CLASSIFICATION_LABELS[key]?.name || key;
              return (
                <div key={key} className="mb-2">
                  <div className="flex justify-between text-sm mb-1">
                    <span>{label}</span>
                    <span className="font-medium">{formatPercentage(value)}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className={`bg-${getConfidenceColor(value)}-500 h-2.5 rounded-full`}
                      style={{ width: `${value * 100}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="bg-gray-50 p-4 rounded-md mt-4 border border-gray-200">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Interpretation</h4>
            {classification === 'no_tumor' ? (
              <p className="text-sm text-gray-600">
                The scan appears to be normal with no detectable signs of a tumor. The prediction confidence 
                is {formatPercentage(confidence)}. As always, clinical correlation is recommended.
              </p>
            ) : (
              <p className="text-sm text-gray-600">
                The model has detected patterns consistent with {classInfo.name} with 
                {confidence < 0.7 ? ' moderate' : ' high'} confidence ({formatPercentage(confidence)}). 
                This result should be correlated with clinical findings and potentially verified with 
                additional diagnostic procedures.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassificationResult;