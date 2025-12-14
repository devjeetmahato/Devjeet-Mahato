import React, { useRef, ReactNode } from 'react';
import { UploadIcon } from './icons/UploadIcon';
import Button from './Button';

interface StudentListInputProps {
  id: string;
  label: string;
  value: string;
  onTextChange: (value: string) => void;
  placeholder: string;
  icon: ReactNode;
}

const StudentListInput: React.FC<StudentListInputProps> = ({ id, label, value, onTextChange, placeholder, icon }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        onTextChange(text);
      };
      reader.readAsText(file);
    }
    // Reset file input to allow uploading the same file again
    if(event.target) {
        event.target.value = '';
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-2">
        <label htmlFor={id} className="flex items-center text-base md:text-lg font-semibold text-slate-700 dark:text-slate-200">
          <span className="mr-2 text-primary">{icon}</span>
          {label}
        </label>
        <button 
            onClick={handleUploadClick} 
            className="text-xs font-medium text-primary bg-primary/5 hover:bg-primary/10 px-3 py-1.5 rounded-full flex items-center transition-colors"
        >
            <UploadIcon className="w-3 h-3 mr-1.5" />
            Upload File
        </button>
      </div>
      
      <div className="relative flex-grow">
        <textarea
          id={id}
          value={value}
          onChange={(e) => onTextChange(e.target.value)}
          placeholder={placeholder}
          className="w-full h-32 md:h-40 p-3 text-sm md:text-base border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition duration-150 dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400 resize-none shadow-sm"
        />
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept=".txt,.csv"
        />
      </div>
    </div>
  );
};

export default StudentListInput;