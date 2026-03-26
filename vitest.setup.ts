import '@testing-library/jest-dom';

// Mock environment variables for Sanity client initialization during tests
process.env.NEXT_PUBLIC_SANITY_PROJECT_ID = 'test-project-id';
process.env.NEXT_PUBLIC_SANITY_DATASET = 'test-dataset';
process.env.NEXT_PUBLIC_SANITY_API_VERSION = '2025-05-22';
