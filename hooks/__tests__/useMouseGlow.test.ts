import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useMouseGlow, glowStyle } from '../useMouseGlow';
import type React from 'react';

describe('glowStyle', () => {
  it('returns a radial gradient with default opacity', () => {
    const style = glowStyle(100, 200);
    expect(style.background).toBe(
      'radial-gradient(600px circle at 100px 200px, rgba(14, 165, 233, 0.15), transparent 40%)'
    );
  });

  it('returns a radial gradient with custom opacity', () => {
    const style = glowStyle(50, 75, 0.3);
    expect(style.background).toBe(
      'radial-gradient(600px circle at 50px 75px, rgba(14, 165, 233, 0.3), transparent 40%)'
    );
  });

  it('returns correct type (React.CSSProperties)', () => {
    const style = glowStyle(0, 0);
    expect(typeof style).toBe('object');
    expect(style).toHaveProperty('background');
  });
});

describe('useMouseGlow', () => {
  it('returns initial state with position (0,0) and not hovering', () => {
    const { result } = renderHook(() => useMouseGlow());
    expect(result.current.mousePosition).toEqual({ x: 0, y: 0 });
    expect(result.current.isHovering).toBe(false);
  });

  it('returns all required handlers', () => {
    const { result } = renderHook(() => useMouseGlow());
    expect(typeof result.current.handleMouseMove).toBe('function');
    expect(typeof result.current.handleMouseEnter).toBe('function');
    expect(typeof result.current.handleMouseLeave).toBe('function');
  });

  it('sets isHovering to true on handleMouseEnter', () => {
    const { result } = renderHook(() => useMouseGlow());

    act(() => {
      result.current.handleMouseEnter();
    });

    expect(result.current.isHovering).toBe(true);
  });

  it('sets isHovering to false on handleMouseLeave', () => {
    const { result } = renderHook(() => useMouseGlow());

    act(() => {
      result.current.handleMouseEnter();
    });
    act(() => {
      result.current.handleMouseLeave();
    });

    expect(result.current.isHovering).toBe(false);
  });

  it('updates mousePosition relative to element bounds on handleMouseMove', () => {
    const { result } = renderHook(() => useMouseGlow());

    const mockEvent = {
      clientX: 150,
      clientY: 250,
      currentTarget: {
        getBoundingClientRect: () => ({ left: 50, top: 100, width: 400, height: 300 }),
      },
    } as unknown as React.MouseEvent<HTMLDivElement>;

    act(() => {
      result.current.handleMouseMove(mockEvent);
    });

    expect(result.current.mousePosition).toEqual({ x: 100, y: 150 });
  });

  it('handlers are stable references (useCallback)', () => {
    const { result, rerender } = renderHook(() => useMouseGlow());
    const { handleMouseMove, handleMouseEnter, handleMouseLeave } = result.current;

    rerender();

    expect(result.current.handleMouseMove).toBe(handleMouseMove);
    expect(result.current.handleMouseEnter).toBe(handleMouseEnter);
    expect(result.current.handleMouseLeave).toBe(handleMouseLeave);
  });
});
