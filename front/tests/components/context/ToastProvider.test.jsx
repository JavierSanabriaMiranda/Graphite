import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { ToastProvider, useToast } from '../../../src/components/context/ToastContext';

const TestComponent = ({ message, type }) => {
  const { showToast } = useToast();
  return (
    <button onClick={() => showToast(message, type)}>
      Show Toast
    </button>
  );
};

describe('ToastProvider', () => {
  beforeEach(() => {
    vi.useFakeTimers(); // Habilitamos timers falsos para controlar el setTimeout
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it('should render children correctly', () => {
    render(
      <ToastProvider>
        <div data-testid="child">Content</div>
      </ToastProvider>
    );
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });

  it('should show a success toast by default', () => {
    render(
      <ToastProvider>
        <TestComponent message="Successful operation" />
      </ToastProvider>
    );

    fireEvent.click(screen.getByText('Show Toast'));

    const toast = screen.getByText('Successful operation');
    expect(toast).toBeInTheDocument();
    // Verificamos que tiene las clases de éxito (línea 40 aprox)
    expect(toast.parentElement).toHaveClass('bg-green-100');
  });

  it('should show error and info toasts with correct styles', () => {
    const { rerender } = render(
      <ToastProvider>
        <TestComponent message="Critical error" type="error" />
      </ToastProvider>
    );

    fireEvent.click(screen.getByText('Show Toast'));
    expect(screen.getByText('Critical error').parentElement).toHaveClass('bg-red-50');

    rerender(
      <ToastProvider>
        <TestComponent message="Info message" type="info" />
      </ToastProvider>
    );
    fireEvent.click(screen.getByText('Show Toast'));
    expect(screen.getByText('Info message').parentElement).toHaveClass('bg-blue-50');
  });

  it('should remove toast when clicking the close button', () => {
    render(
      <ToastProvider>
        <TestComponent message="Delete me" />
      </ToastProvider>
    );

    fireEvent.click(screen.getByText('Show Toast'));
    const closeButton = screen.getByText('✕');
    
    fireEvent.click(closeButton);
    
    expect(screen.queryByText('Delete me')).not.toBeInTheDocument();
  });

  it('should automatically remove the toast after 3 seconds', () => {
    render(
      <ToastProvider>
        <TestComponent message="Auto delete" />
      </ToastProvider>
    );

    fireEvent.click(screen.getByText('Show Toast'));
    expect(screen.getByText('Auto delete')).toBeInTheDocument();

    // Adelantamos el tiempo 3 segundos
    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(screen.queryByText('Auto delete')).not.toBeInTheDocument();
  });

  it('should handle multiple toasts simultaneously', () => {
    const MultipleToasts = () => {
      const { showToast } = useToast();
      return (
        <button onClick={() => {
          showToast('Toast 1');
          showToast('Toast 2');
        }}>Launch 2</button>
      );
    };

    render(
      <ToastProvider>
        <MultipleToasts />
      </ToastProvider>
    );

    fireEvent.click(screen.getByText('Launch 2'));

    expect(screen.getByText('Toast 1')).toBeInTheDocument();
    expect(screen.getByText('Toast 2')).toBeInTheDocument();
  });
});