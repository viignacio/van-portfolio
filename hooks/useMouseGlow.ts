'use client';

import { useState, useCallback } from 'react';
import type React from 'react';

export interface MouseGlowState {
  mousePosition: { x: number; y: number };
  isHovering: boolean;
  handleMouseMove: (e: React.MouseEvent<HTMLDivElement>) => void;
  handleMouseEnter: () => void;
  handleMouseLeave: () => void;
}

export function useMouseGlow(): MouseGlowState {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }, []);

  const handleMouseEnter = useCallback(() => setIsHovering(true), []);
  const handleMouseLeave = useCallback(() => setIsHovering(false), []);

  return { mousePosition, isHovering, handleMouseMove, handleMouseEnter, handleMouseLeave };
}
