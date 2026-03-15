import { useRef } from 'react';
import type React from 'react';

export function useSwipe(onSwipeLeft: () => void, onSwipeRight: () => void, minDistance = 50) {
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const onTouchStart = (e: React.TouchEvent) => {
    touchEndX.current = null;
    touchStartX.current = e.targetTouches[0].clientX;
    touchStartY.current = e.targetTouches[0].clientY;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
    if (touchStartX.current !== null && touchStartY.current !== null) {
      const dx = Math.abs(touchStartX.current - e.targetTouches[0].clientX);
      const dy = Math.abs(touchStartY.current - e.targetTouches[0].clientY);
      if (dx > dy && dx > 10) e.preventDefault();
    }
  };

  const onTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    if (distance > minDistance) onSwipeLeft();
    if (distance < -minDistance) onSwipeRight();
    touchStartX.current = null;
    touchStartY.current = null;
    touchEndX.current = null;
  };

  return { onTouchStart, onTouchMove, onTouchEnd };
}
