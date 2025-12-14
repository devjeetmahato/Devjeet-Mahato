
import React, { ReactNode } from 'react';

interface StudentListDisplayProps {
  title: string;
  students: string[];
  icon: ReactNode;
  highlightColor?: 'red' | 'yellow';
  action?: ReactNode;
}

const StudentListDisplay: React.FC<StudentListDisplayProps> = ({ title, students, icon, highlightColor, action }) => {
  
  const colorClasses = {
    red: 'text-red-600 dark:text-red-400 font-semibold',
    yellow: 'text-amber-600 dark:text-amber-400 font-semibold',
  };
  
  const textColorClass = highlightColor ? colorClasses[highlightColor] : 'text-slate-800 dark:text-slate-300';
  
  return (
    <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-lg flex flex-col h-full">
      <div className="flex justify-between items-center pb-3 border-b border-slate-200 dark:border-slate-700">
        <div className="flex items-center">
            <span className="mr-2 text-primary">{icon}</span>
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">{title} ({students.length})</h3>
        </div>
        {action}
      </div>
      <div className="flex-grow mt-3 overflow-y-auto max-h-64 pr-2">
        {students.length > 0 ? (
          <ul className="space-y-2">
            {students.map((student, index) => (
              <li key={index} className={`text-sm ${textColorClass} bg-slate-50 dark:bg-slate-700/50 p-2 rounded-md`}>
                {student}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-slate-500 dark:text-slate-400 italic text-center py-8">No students to display.</p>
        )}
      </div>
    </div>
  );
};

export default StudentListDisplay;
