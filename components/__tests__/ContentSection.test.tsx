import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ContentSection from '../ContentSection';

// Mock dependencies
vi.mock('next-sanity', () => ({
  PortableText: ({ value }: { value: any }) => <div data-testid="portable-text">{JSON.stringify(value)}</div>,
}));

vi.mock('@/components/MediaRenderer', () => ({
  default: ({ alt }: { alt?: string }) => <img data-testid="media-image" alt={alt} />,
}));

vi.mock('@/components/QuoteSection', () => ({
  default: ({ data }: any) => <div data-testid="quote-section">{data.text} - {data.author} - {data.role}</div>,
}));

vi.mock('@/components/TechSelectionSection', () => ({
  default: ({ data }: any) => (
    <div data-testid="tech-section">
      {data.title}
      {data.items?.map((item: any, i: number) => (
        <div key={i}>{item.tool}: {item.reasoning}</div>
      ))}
    </div>
  ),
}));

const mockData = {
  contentItems: [
    {
      _type: 'contentBlock',
      body: [{ _type: 'block', children: [{ _text: 'Hello world' }] }],
    },
    {
      _type: 'mediaBlock',
      image: { asset: { _ref: 'image-1' } },
      caption: 'Test Caption',
    },
    {
      _type: 'mediaBlock',
      videoUrl: 'https://www.youtube.com/embed/test',
      caption: 'Video Caption',
    },
    {
      _type: 'galleryBlock',
      items: [
        { image: { asset: { _ref: 'gal-1' } }, caption: 'Gallery 1' },
      ],
    },
    {
      _type: 'ctaBlock',
      text: 'Click Me',
      url: 'https://example.com',
    },
    {
      _type: 'quoteSection',
      text: 'Design is not just what it looks like and feels like. Design is how it works.',
      author: 'Steve Jobs',
      role: 'Co-founder of Apple',
      variant: 'centered',
    },
    {
      _type: 'techSelectionSection',
      title: 'Built With',
      items: [
        { tool: 'Next.js', reasoning: 'For its robust App Router.', icon: 'nextjs' },
        { tool: 'Tailwind CSS', reasoning: 'For rapid styling.', icon: 'tailwind' },
      ],
    },
  ],
} as any;

describe('ContentSection', () => {
  it('renders null when data or contentItems is missing', () => {
    const { container: container1 } = render(<ContentSection data={null as any} />);
    expect(container1.firstChild).toBeNull();

    const { container: container2 } = render(<ContentSection data={{ contentItems: [] } as any} />);
    // Empty array should render the wrapper div but it will be empty
    expect(container2.querySelector('.flex-col')).toBeInTheDocument();
    expect(container2.querySelector('.flex-col')?.children.length).toBe(0);
  });

  it('renders content blocks', () => {
    render(<ContentSection data={mockData} />);
    expect(screen.getByTestId('portable-text')).toBeInTheDocument();
  });

  it('renders media blocks with images', () => {
    render(<ContentSection data={mockData} />);
    expect(screen.getByAltText('Test Caption')).toBeInTheDocument();
    expect(screen.getByText('Test Caption')).toBeInTheDocument();
  });

  it('renders media blocks with videos', () => {
    const { container } = render(<ContentSection data={mockData} />);
    const iframe = container.querySelector('iframe');
    expect(iframe).toHaveAttribute('src', 'https://www.youtube.com/embed/test');
    expect(screen.getByText('Video Caption')).toBeInTheDocument();
  });

  it('renders gallery blocks', () => {
    render(<ContentSection data={mockData} />);
    expect(screen.getByAltText('Gallery 1')).toBeInTheDocument();
  });

  it('renders CTA blocks', () => {
    render(<ContentSection data={mockData} />);
    const cta = screen.getByRole('link', { name: /click me/i });
    expect(cta).toHaveAttribute('href', 'https://example.com');
    expect(cta).toHaveTextContent('Click Me');
  });
  
  it('renders quote sections', () => {
    render(<ContentSection data={mockData} />);
    const quote = screen.getByTestId('quote-section');
    expect(quote).toHaveTextContent(/Design is how it works/i);
    expect(quote).toHaveTextContent('Steve Jobs');
    expect(quote).toHaveTextContent('Co-founder of Apple');
  });

  it('renders tech selection sections', () => {
    render(<ContentSection data={mockData} />);
    const tech = screen.getByTestId('tech-section');
    expect(tech).toHaveTextContent('Built With');
    expect(tech).toHaveTextContent('Next.js: For its robust App Router.');
    expect(tech).toHaveTextContent('Tailwind CSS: For rapid styling.');
  });

  it('renders nothing for unknown block types', () => {
    const dataWithUnknown = {
      contentItems: [{ _type: 'unknownType' }],
    } as any;
    const { container } = render(<ContentSection data={dataWithUnknown} />);
    expect(container.querySelector('.flex-col')?.children.length).toBe(0);
  });
});
