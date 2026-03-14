import React from 'react';

interface AzureIconProps {
  className?: string;
}

export const AzureIcon: React.FC<AzureIconProps> = ({ className = "w-5 h-5" }) => {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 2L2 16l14 14 14-14L16 2zm0 2.828L27.172 16 16 27.172 4.828 16 16 4.828z" fill="#0089D6"/>
      <path d="M16 8L8 16l8 8 8-8-8-8zm0 2.828L21.172 16 16 21.172 10.828 16 16 10.828z" fill="#0089D6"/>
    </svg>
  );
};
