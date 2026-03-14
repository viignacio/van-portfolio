'use client';

import React from 'react';

interface LayoutBlockProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export default function LayoutBlock({ children, className = '', id }: LayoutBlockProps) {
  return (
    <div id={id} className={`relative overflow-hidden ${className}`.trim()}>
      {children}
    </div>
  );
}
