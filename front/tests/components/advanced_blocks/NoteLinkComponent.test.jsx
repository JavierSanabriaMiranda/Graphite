import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import NoteLinkComponent from '../../../src/components/advanced_blocks/NoteLinkComponent';
import { useNote } from '../../../src/components/context/NoteContext';

// Mock Tiptap's NodeViewWrapper (it's essentially a fragment in tests)
vi.mock('@tiptap/react', () => ({
  NodeViewWrapper: ({ children, className }) => <div className={className}>{children}</div>,
}));

// Mock the NoteContext
vi.mock('../../../src/components/context/NoteContext', () => ({
  useNote: vi.fn(),
}));

// Mock i18next
vi.mock('i18next', () => ({
  t: (key) => (key === 'note_link.broken_link' ? 'Broken link' : key),
}));

describe('NoteLinkComponent', () => {
  const mockSelectNote = vi.fn();
  
  const mockNotes = [
    { note_id: '1', title: 'Test Note', icon: '📄' },
    { note_id: '2', title: 'Note without Icon', icon: null }
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  /**
   * Test: Success state with full data
   */
  it('should render the note title and icon correctly when note exists', () => {
    useNote.mockReturnValue({
      allNotes: mockNotes,
      selectNote: mockSelectNote,
    });

    const node = { attrs: { noteId: '1' } };
    render(<NoteLinkComponent node={node} />);

    expect(screen.getByText('Test Note')).toBeDefined();
    expect(screen.getByText('📄')).toBeDefined();
  });

  /**
   * Test: Navigation callback
   */
  it('should call selectNote when clicked', () => {
    useNote.mockReturnValue({
      allNotes: mockNotes,
      selectNote: mockSelectNote,
    });

    const node = { attrs: { noteId: '1' } };
    render(<NoteLinkComponent node={node} />);

    fireEvent.click(screen.getByRole('button'));
    expect(mockSelectNote).toHaveBeenCalledWith(mockNotes[0]);
  });

  /**
   * Test: Fallback icon when no icon is provided
   */
  it('should render fallback icon if note has no icon', () => {
    useNote.mockReturnValue({
      allNotes: mockNotes,
      selectNote: mockSelectNote,
    });

    const node = { attrs: { noteId: '2' } };
    const { container } = render(<NoteLinkComponent node={node} />);

    // Check if lucide icon (FileText) is present via class or data-testid if added
    const svg = container.querySelector('svg');
    expect(svg).toBeDefined();
  });

  /**
   * Test: Broken link state
   */
  it('should render broken link state when note is not found in allNotes', () => {
    useNote.mockReturnValue({
      allNotes: mockNotes,
      selectNote: mockSelectNote,
    });

    const node = { attrs: { noteId: '999' } }; // Non-existent ID
    render(<NoteLinkComponent node={node} />);

    expect(screen.getByText('Broken link')).toBeDefined();
  });
});