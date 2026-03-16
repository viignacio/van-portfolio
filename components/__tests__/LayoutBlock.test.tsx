import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import LayoutBlock from '../LayoutBlock';

describe('LayoutBlock', () => {
  it('renders children', () => {
    render(<LayoutBlock>Hello World</LayoutBlock>);
    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });

  it('applies relative and overflow-hidden classes by default', () => {
    const { container } = render(<LayoutBlock>content</LayoutBlock>);
    const div = container.firstChild as HTMLElement;
    expect(div).toHaveClass('relative');
    expect(div).toHaveClass('overflow-hidden');
  });

  it('appends custom className', () => {
    const { container } = render(<LayoutBlock className="my-class">content</LayoutBlock>);
    const div = container.firstChild as HTMLElement;
    expect(div).toHaveClass('my-class');
    expect(div).toHaveClass('relative');
  });

  it('applies the id prop', () => {
    const { container } = render(<LayoutBlock id="section-hero">content</LayoutBlock>);
    const div = container.firstChild as HTMLElement;
    expect(div).toHaveAttribute('id', 'section-hero');
  });

  it('renders without id when not provided', () => {
    const { container } = render(<LayoutBlock>content</LayoutBlock>);
    const div = container.firstChild as HTMLElement;
    expect(div).not.toHaveAttribute('id');
  });

  it('renders multiple children', () => {
    render(
      <LayoutBlock>
        <span>Child 1</span>
        <span>Child 2</span>
      </LayoutBlock>
    );
    expect(screen.getByText('Child 1')).toBeInTheDocument();
    expect(screen.getByText('Child 2')).toBeInTheDocument();
  });
});
