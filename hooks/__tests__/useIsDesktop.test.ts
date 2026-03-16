import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useIsDesktop } from '../useIsDesktop';

function setWindowWidth(width: number) {
  Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: width });
}

describe('useIsDesktop', () => {
  beforeEach(() => {
    setWindowWidth(1024);
  });

  it('returns true when window.innerWidth is exactly 1024', () => {
    const { result } = renderHook(() => useIsDesktop());
    expect(result.current).toBe(true);
  });

  it('returns true when window.innerWidth is greater than 1024', () => {
    setWindowWidth(1440);
    const { result } = renderHook(() => useIsDesktop());
    expect(result.current).toBe(true);
  });

  it('returns false when window.innerWidth is less than 1024', () => {
    setWindowWidth(768);
    const { result } = renderHook(() => useIsDesktop());
    expect(result.current).toBe(false);
  });

  it('updates to true when window is resized above threshold', () => {
    setWindowWidth(768);
    const { result } = renderHook(() => useIsDesktop());
    expect(result.current).toBe(false);

    act(() => {
      setWindowWidth(1280);
      window.dispatchEvent(new Event('resize'));
    });

    expect(result.current).toBe(true);
  });

  it('updates to false when window is resized below threshold', () => {
    setWindowWidth(1440);
    const { result } = renderHook(() => useIsDesktop());
    expect(result.current).toBe(true);

    act(() => {
      setWindowWidth(375);
      window.dispatchEvent(new Event('resize'));
    });

    expect(result.current).toBe(false);
  });

  it('does not re-render when resize does not cross the threshold', () => {
    setWindowWidth(1280);
    const { result } = renderHook(() => useIsDesktop());
    const initialResult = result.current;

    act(() => {
      setWindowWidth(1440);
      window.dispatchEvent(new Event('resize'));
    });

    expect(result.current).toBe(initialResult);
  });

  it('removes the resize event listener on unmount', () => {
    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');
    const { unmount } = renderHook(() => useIsDesktop());
    unmount();
    expect(removeEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function));
  });
});
