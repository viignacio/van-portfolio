import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import CertificationsSection from '../CertificationsSection';

vi.mock('motion/react', () => {
  const React = require('react');
  const motion = new Proxy({}, {
    get: (_: object, tag: string) => {
      return function MotionEl({ children, initial, animate, whileInView, viewport, transition, ...rest }: {
        children?: React.ReactNode;
        initial?: unknown; animate?: unknown; whileInView?: unknown;
        viewport?: unknown; transition?: unknown;
        [key: string]: unknown;
      }) {
        return React.createElement(tag, rest, children);
      };
    },
  });
  return { motion };
});

vi.mock('@/hooks/useMouseGlow', () => ({
  useMouseGlow: () => ({
    mousePosition: { x: 0, y: 0 },
    isHovering: false,
    handleMouseMove: vi.fn(),
    handleMouseEnter: vi.fn(),
    handleMouseLeave: vi.fn(),
  }),
  glowStyle: vi.fn().mockReturnValue({}),
}));

vi.mock('@/hooks/useIsDesktop', () => ({
  useIsDesktop: () => false,
}));

vi.mock('@/hooks/useSwipe', () => ({
  useSwipe: () => ({
    onTouchStart: vi.fn(),
    onTouchMove: vi.fn(),
    onTouchEnd: vi.fn(),
  }),
}));

vi.mock('@/components/MediaRenderer', () => ({
  default: ({ alt }: { alt?: string }) => <img data-testid="cert-image" alt={alt} />,
}));

const certifications = [
  {
    _id: 'cert-1',
    title: 'AWS Certified Developer',
    issuer: 'Amazon Web Services',
    issueDate: '2023-03-15',
    expirationDate: '2026-03-15',
    credentialId: 'AWS-12345',
    description: 'Associate level certification.',
    credentialUrl: 'https://aws.amazon.com/verify/cert-1',
  },
  {
    _id: 'cert-2',
    title: 'ISTQB Foundation',
    issuer: 'ISTQB',
    issueDate: '2021-06-01',
    expirationDate: '',
    credentialId: 'ISTQB-67890',
    credentialUrl: '',
  },
];

describe('CertificationsSection', () => {
  it('returns null when data is undefined', () => {
    const { container } = render(<CertificationsSection />);
    expect(container.firstChild).toBeNull();
  });

  it('returns null when title and certifications are both missing', () => {
    const { container } = render(<CertificationsSection data={{}} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders section title', () => {
    render(<CertificationsSection data={{ title: 'My Certifications', certifications }} />);
    expect(screen.getByText('My Certifications')).toBeInTheDocument();
  });

  it('renders subtitle when provided', () => {
    render(<CertificationsSection data={{ title: 'Certs', subtitle: 'Cloud & Testing', certifications }} />);
    expect(screen.getByText('Cloud & Testing')).toBeInTheDocument();
  });

  it('renders description when provided', () => {
    render(<CertificationsSection data={{ title: 'Certs', description: 'These are my certs.', certifications }} />);
    expect(screen.getByText('These are my certs.')).toBeInTheDocument();
  });

  it('renders certification titles', () => {
    render(<CertificationsSection data={{ title: 'Certs', certifications }} />);
    expect(screen.getAllByText('AWS Certified Developer').length).toBeGreaterThan(0);
    expect(screen.getAllByText('ISTQB Foundation').length).toBeGreaterThan(0);
  });

  it('renders issuer information', () => {
    render(<CertificationsSection data={{ title: 'Certs', certifications }} />);
    expect(screen.getAllByText(/amazon web services/i).length).toBeGreaterThan(0);
  });

  it('renders formatted issue date', () => {
    render(<CertificationsSection data={{ title: 'Certs', certifications }} />);
    // issueDate "2023-03-15" → "March 2023"
    expect(screen.getAllByText(/issued: march 2023/i).length).toBeGreaterThan(0);
  });

  it('renders formatted expiration date', () => {
    render(<CertificationsSection data={{ title: 'Certs', certifications }} />);
    expect(screen.getAllByText(/expires: march 2026/i).length).toBeGreaterThan(0);
  });

  it('renders "No expiry" when expirationDate is empty', () => {
    render(<CertificationsSection data={{ title: 'Certs', certifications }} />);
    expect(screen.getAllByText('No expiry').length).toBeGreaterThan(0);
  });

  it('renders credential ID', () => {
    render(<CertificationsSection data={{ title: 'Certs', certifications }} />);
    expect(screen.getAllByText('AWS-12345').length).toBeGreaterThan(0);
  });

  it('renders "View Certificate" link when credentialUrl is provided', () => {
    render(<CertificationsSection data={{ title: 'Certs', certifications }} />);
    const links = screen.getAllByRole('link', { name: /view certificate/i });
    expect(links.length).toBeGreaterThan(0);
    expect(links[0]).toHaveAttribute('href', 'https://aws.amazon.com/verify/cert-1');
  });

  it('does not render "View Certificate" link when credentialUrl is empty', () => {
    render(<CertificationsSection data={{ title: 'Certs', certifications }} />);
    const links = screen.getAllByRole('link', { name: /view certificate/i });
    // cert-1 appears in both desktop grid and mobile carousel — only cert-1 has a URL
    links.forEach((link) => {
      expect(link).toHaveAttribute('href', 'https://aws.amazon.com/verify/cert-1');
    });
  });

  it('renders navigation dots for mobile carousel when more than one cert', () => {
    render(<CertificationsSection data={{ title: 'Certs', certifications }} />);
    const dotButtons = screen.getAllByRole('button', { name: /go to certification/i });
    expect(dotButtons.length).toBe(certifications.length);
  });

  it('navigates to specific slide when dot is clicked', async () => {
    const user = userEvent.setup();
    render(<CertificationsSection data={{ title: 'Certs', certifications }} />);
    const dots = screen.getAllByRole('button', { name: /go to certification/i });
    await user.click(dots[1]);
    // Re-query after click — React recreates dot nodes on re-render
    expect(screen.getAllByRole('button', { name: /go to certification/i })[1]).toHaveClass('bg-accent');
  });

  it('does not render dots when only one certification', () => {
    render(<CertificationsSection data={{ title: 'Certs', certifications: [certifications[0]] }} />);
    expect(screen.queryByRole('button', { name: /go to certification/i })).toBeNull();
  });

  it('applies the id prop to the section', () => {
    const { container } = render(
      <CertificationsSection data={{ title: 'Certs', certifications }} id="certifications" />
    );
    expect(container.querySelector('#certifications')).toBeInTheDocument();
  });
});
