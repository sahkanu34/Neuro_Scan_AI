import React from 'react';

interface PatientInfoFormProps {
  patientInfo: {
    id: string;
    age: string;
    gender: string;
    notes: string;
  };
  onChange: (info: any) => void;
}

const PatientInfoForm: React.FC<PatientInfoFormProps> = ({ patientInfo, onChange }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    onChange({
      ...patientInfo,
      [name]: value
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Patient Information (Optional)</h3>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="patientId" className="form-label">
            Patient ID
          </label>
          <input
            type="text"
            id="patientId"
            name="id"
            value={patientInfo.id}
            onChange={handleInputChange}
            className="form-input"
            placeholder="Enter patient ID"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="patientAge" className="form-label">
              Age
            </label>
            <input
              type="number"
              id="patientAge"
              name="age"
              value={patientInfo.age}
              onChange={handleInputChange}
              className="form-input"
              placeholder="Enter age"
              min="0"
              max="120"
            />
          </div>
          
          <div>
            <label htmlFor="patientGender" className="form-label">
              Gender
            </label>
            <select
              id="patientGender"
              name="gender"
              value={patientInfo.gender}
              onChange={handleInputChange}
              className="form-input"
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
        
        <div>
          <label htmlFor="patientNotes" className="form-label">
            Clinical Notes
          </label>
          <textarea
            id="patientNotes"
            name="notes"
            value={patientInfo.notes}
            onChange={handleInputChange}
            className="form-input min-h-[100px]"
            placeholder="Enter any relevant clinical notes or symptoms"
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default PatientInfoForm;