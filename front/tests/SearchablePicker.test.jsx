import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import SearchablePicker from '../src/components/util/SearchablePicker';

const mockItems = [
  { value: 'es', label: 'Español' },
  { value: 'en', label: 'English' },
];

// Mock for scrollIntoView function
window.HTMLElement.prototype.scrollIntoView = vi.fn();

describe('SearchablePicker', () => {
  it('should render with the initial label', () => {
    render(<SearchablePicker items={mockItems} buttonLabel="Select language" />);
    
    expect(screen.getByText('Select language')).toBeInTheDocument();
  });

  it('should show options when clicked', () => {
    render(<SearchablePicker items={mockItems} buttonLabel="Click me" />);
    
    const button = screen.getByRole('button', { name: /click me/i });
    fireEvent.click(button);

    expect(screen.getByText('Español')).toBeInTheDocument();
    expect(screen.getByText('English')).toBeInTheDocument();
  });

  it('should filter items based on search input', async () => {
    render(<SearchablePicker items={mockItems} buttonLabel="Picker" />);
    
    fireEvent.click(screen.getByText('Picker'));
    
    const input = screen.getByPlaceholderText(/search/i);
    fireEvent.change(input, { target: { value: 'Esp' } });

    expect(screen.getByText('Español')).toBeInTheDocument();
    expect(screen.queryByText('English')).not.toBeInTheDocument();
  });

  it('should filter items based on search input ignoring cases', async () => {
    render(<SearchablePicker items={mockItems} buttonLabel="Picker" />);
    
    fireEvent.click(screen.getByText('Picker'));
    
    const input = screen.getByPlaceholderText(/search/i);
    fireEvent.change(input, { target: { value: 'esp' } });

    expect(screen.getByText('Español')).toBeInTheDocument();
    expect(screen.queryByText('English')).not.toBeInTheDocument();
  });
});