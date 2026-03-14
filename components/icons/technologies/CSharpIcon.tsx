import React from 'react';

interface CSharpIconProps {
  className?: string;
}

export const CSharpIcon: React.FC<CSharpIconProps> = ({ className = "w-5 h-5" }) => {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 2C8.268 2 2 8.268 2 16s6.268 14 14 14 14-6.268 14-14S23.732 2 16 2zm0 26C9.373 28 4 22.627 4 16S9.373 4 16 4s12 5.373 12 12-5.373 12-12 12z" fill="#68217A"/>
      <path d="M22.5 11.5l-2-2-1.5 1.5-1.5-1.5-2 2 1.5 1.5-1.5 1.5 2 2 1.5-1.5 1.5 1.5 2-2-1.5-1.5 1.5-1.5z" fill="#68217A"/>
      <path d="M16 8c-4.418 0-8 3.582-8 8s3.582 8 8 8 8-3.582 8-8-3.582-8-8-8zm0 14c-3.314 0-6-2.686-6-6s2.686-6 6-6 6 2.686 6 6-2.686 6-6 6z" fill="#68217A"/>
    </svg>
  );
};
