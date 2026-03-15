import Link from 'next/link';
import { HomeIcon } from '@heroicons/react/24/outline';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-base flex items-center justify-center px-4">
      <div className="text-center animate-fade-up">
        <p className="text-8xl font-bold text-accent font-heading tracking-tight mb-2">404</p>
        <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">Page not found</h1>
        <p className="text-lg text-text-secondary mb-10 max-w-md mx-auto">
          Looks like someone got lost.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-3 px-8 py-4 bg-ui-card text-text-primary rounded-xl border border-base-700 text-base font-semibold lg:hover:border-accent lg:hover:text-accent lg:hover:scale-105 transition-all duration-200 active:scale-95 active:opacity-80"
        >
          <HomeIcon className="w-5 h-5" />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
