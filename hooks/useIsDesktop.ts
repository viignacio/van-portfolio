'use client';

import { useState, useEffect } from 'react';

export function useIsDesktop(): boolean {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const check = () => {
      const next = window.innerWidth >= 1024;
      setIsDesktop((prev) => (prev === next ? prev : next));
    };
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return isDesktop;
}
