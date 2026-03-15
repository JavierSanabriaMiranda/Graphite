import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import SearchablePicker from '../../../src/components/util/SearchablePicker';

const mockItems = [
  { value: 'es', label: 'Español' },
  { value: 'en', label: 'English' },
];

// Mock for scrollIntoView function
window.HTMLElement.prototype.scrollIntoView = vi.fn();

describe('SearchablePicker', () => {
  const onSelectMock = vi.fn();

  beforeEach(() => {
    onSelectMock.mockClear();
  });

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

  it('should change active index on ArrowDown and ArrowUp', () => {
    render(<SearchablePicker items={mockItems} buttonLabel="Picker" onSelect={onSelectMock} />);
    fireEvent.click(screen.getByText('Picker'));

    const input = screen.getByPlaceholderText(/search/i);
    const items = screen.getAllByRole('button').filter(btn => btn.classList.contains('picker-item'));

    // At beggining first must be active (activeIndex 0)
    expect(items[0]).toHaveClass('font-bold');

    // Press keyDown
    fireEvent.keyDown(input, { key: 'ArrowDown' });
    expect(items[1]).toHaveClass('font-bold');
    expect(items[0]).not.toHaveClass('font-bold');

    // Press keyUp
    fireEvent.keyDown(input, { key: 'ArrowUp' });
    expect(items[0]).toHaveClass('font-bold');
  });

  it('should select item when pressing Enter', () => {
    render(<SearchablePicker items={mockItems} buttonLabel="Picker" onSelect={onSelectMock} />);
    fireEvent.click(screen.getByText('Picker'));

    const input = screen.getByPlaceholderText(/search/i);

    // go to second element and press enter
    fireEvent.keyDown(input, { key: 'ArrowDown' });
    fireEvent.keyDown(input, { key: 'Enter' });

    expect(onSelectMock).toHaveBeenCalledWith('en');
    // Verify that search cleans and menu gets closed
    expect(screen.queryByPlaceholderText(/search/i)).not.toBeVisible();
  });

  it('should close the menu when pressing Escape', () => {
    render(<SearchablePicker items={mockItems} buttonLabel="Picker" />);
    fireEvent.click(screen.getByText('Picker'));

    const input = screen.getByPlaceholderText(/search/i);
    fireEvent.keyDown(input, { key: 'Escape' });

    const floatingMenu = input.closest('.z-1000');
    expect(floatingMenu).toHaveStyle({ visibility: 'hidden' });
  });

  it('should change active index on mouse enter', () => {
    render(<SearchablePicker items={mockItems} buttonLabel="Picker" />);
    fireEvent.click(screen.getByText('Picker'));

    const items = screen.getAllByRole('button').filter(btn => btn.classList.contains('picker-item'));

    // Simulate mouse entering second element
    fireEvent.mouseEnter(items[1]);
    expect(items[1]).toHaveClass('font-bold');
  });

  it('should select item on click', () => {
    render(<SearchablePicker items={mockItems} buttonLabel="Picker" onSelect={onSelectMock} />);
    fireEvent.click(screen.getByText('Picker'));

    const items = screen.getAllByRole('button').filter(btn => btn.classList.contains('picker-item'));

    fireEvent.click(items[1]);
    expect(onSelectMock).toHaveBeenCalledWith('en');
  });

  it('should use custom placeholder when provided', () => {
    render(<SearchablePicker items={mockItems} buttonLabel="Picker" placeholder="Custom Search..." />);
    fireEvent.click(screen.getByText('Picker'));
    expect(screen.getByPlaceholderText('Custom Search...')).toBeInTheDocument();
  });

  it('should render item icons when provided', () => {
    const itemsWithIcon = [{ value: 'star', label: 'Star', icon: <span data-testid="star-icon">⭐</span> }];
    render(<SearchablePicker items={itemsWithIcon} buttonLabel="Icons" />);
    fireEvent.click(screen.getByText('Icons'));
    expect(screen.getByTestId('star-icon')).toBeInTheDocument();
  });

  it('should not select anything if Enter is pressed with no results', () => {
    render(<SearchablePicker items={mockItems} buttonLabel="Picker" onSelect={onSelectMock} />);
    fireEvent.click(screen.getByText('Picker'));

    const input = screen.getByPlaceholderText(/search/i);
    fireEvent.change(input, { target: { value: 'XYZ_NO_EXISTE' } });
    fireEvent.keyDown(input, { key: 'Enter' });

    expect(onSelectMock).not.toHaveBeenCalled();
  });
});