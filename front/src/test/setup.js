import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';

// Extends Vitest matchers with Jest DOM
// This allows to use .toBeInTheDocument(), .toHaveClass(), etc.
expect.extend(matchers);

// Cleans DOM after every test to avoid interferences
afterEach(() => {
    cleanup();
});

// Mock of browser APIs that JSDOM doesn't have
// For example Floating UI sometimes needs ResizeObserver
global.ResizeObserver = vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
}));