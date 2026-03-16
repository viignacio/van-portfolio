import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useSwipe } from '../useSwipe';
import type React from 'react';

function createTouchEvent(x: number, y = 0): React.TouchEvent {
  return {
    targetTouches: [{ clientX: x, clientY: y }],
    preventDefault: vi.fn(),
  } as unknown as React.TouchEvent;
}

describe('useSwipe', () => {
  it('returns onTouchStart, onTouchMove, and onTouchEnd handlers', () => {
    const { result } = renderHook(() => useSwipe(vi.fn(), vi.fn()));
    expect(typeof result.current.onTouchStart).toBe('function');
    expect(typeof result.current.onTouchMove).toBe('function');
    expect(typeof result.current.onTouchEnd).toBe('function');
  });

  it('calls onSwipeLeft when swiped left beyond minDistance', () => {
    const onSwipeLeft = vi.fn();
    const onSwipeRight = vi.fn();
    const { result } = renderHook(() => useSwipe(onSwipeLeft, onSwipeRight, 50));

    result.current.onTouchStart(createTouchEvent(200));
    result.current.onTouchMove(createTouchEvent(100));
    result.current.onTouchEnd();

    expect(onSwipeLeft).toHaveBeenCalledTimes(1);
    expect(onSwipeRight).not.toHaveBeenCalled();
  });

  it('calls onSwipeRight when swiped right beyond minDistance', () => {
    const onSwipeLeft = vi.fn();
    const onSwipeRight = vi.fn();
    const { result } = renderHook(() => useSwipe(onSwipeLeft, onSwipeRight, 50));

    result.current.onTouchStart(createTouchEvent(100));
    result.current.onTouchMove(createTouchEvent(200));
    result.current.onTouchEnd();

    expect(onSwipeRight).toHaveBeenCalledTimes(1);
    expect(onSwipeLeft).not.toHaveBeenCalled();
  });

  it('does not call either handler when swipe distance is below minDistance', () => {
    const onSwipeLeft = vi.fn();
    const onSwipeRight = vi.fn();
    const { result } = renderHook(() => useSwipe(onSwipeLeft, onSwipeRight, 50));

    result.current.onTouchStart(createTouchEvent(100));
    result.current.onTouchMove(createTouchEvent(120));
    result.current.onTouchEnd();

    expect(onSwipeLeft).not.toHaveBeenCalled();
    expect(onSwipeRight).not.toHaveBeenCalled();
  });

  it('does not call handler when onTouchEnd is called without onTouchMove', () => {
    const onSwipeLeft = vi.fn();
    const onSwipeRight = vi.fn();
    const { result } = renderHook(() => useSwipe(onSwipeLeft, onSwipeRight));

    result.current.onTouchStart(createTouchEvent(100));
    result.current.onTouchEnd();

    expect(onSwipeLeft).not.toHaveBeenCalled();
    expect(onSwipeRight).not.toHaveBeenCalled();
  });

  it('uses default minDistance of 50', () => {
    const onSwipeLeft = vi.fn();
    const { result } = renderHook(() => useSwipe(onSwipeLeft, vi.fn()));

    result.current.onTouchStart(createTouchEvent(200));
    result.current.onTouchMove(createTouchEvent(149)); // distance = 51 > 50
    result.current.onTouchEnd();

    expect(onSwipeLeft).toHaveBeenCalledTimes(1);
  });

  it('does not trigger swipe when distance exactly equals minDistance', () => {
    const onSwipeLeft = vi.fn();
    const { result } = renderHook(() => useSwipe(onSwipeLeft, vi.fn(), 50));

    result.current.onTouchStart(createTouchEvent(200));
    result.current.onTouchMove(createTouchEvent(150)); // distance = 50, not > 50
    result.current.onTouchEnd();

    expect(onSwipeLeft).not.toHaveBeenCalled();
  });

  it('resets state after completed gesture (second swipe works)', () => {
    const onSwipeLeft = vi.fn();
    const { result } = renderHook(() => useSwipe(onSwipeLeft, vi.fn(), 50));

    result.current.onTouchStart(createTouchEvent(200));
    result.current.onTouchMove(createTouchEvent(100));
    result.current.onTouchEnd();

    result.current.onTouchStart(createTouchEvent(200));
    result.current.onTouchMove(createTouchEvent(100));
    result.current.onTouchEnd();

    expect(onSwipeLeft).toHaveBeenCalledTimes(2);
  });
});
