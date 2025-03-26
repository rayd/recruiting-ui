import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from '@reach/router';
import BookCard from './BookCard';
import { SaveButton } from './Buttons';

// Mock the SaveButton component
jest.mock('./Buttons', () => ({
  SaveButton: ({ saved, onSave, onRemove }) => (
    <button onClick={saved ? onRemove : onSave}>
      {saved ? 'Saved to List' : 'Save to list'}
    </button>
  ),
}));

const mockBook = {
  id: '1',
  title: 'Test Book',
  author: 'Test Author',
  description: 'Test Description',
  image_url: 'https://example.com/image.jpg',
};

describe('BookCard', () => {
  const defaultProps = {
    book: mockBook,
    view: 'grid',
    saved: false,
    onSave: jest.fn(),
    onRemove: jest.fn(),
  };

  const renderBookCard = (props = {}) => {
    return render(
      <MemoryRouter>
        <BookCard {...defaultProps} {...props} />
      </MemoryRouter>
    );
  };

  it('renders book information correctly in grid view', () => {
    renderBookCard();
    
    expect(screen.getByText('Test Book')).toBeInTheDocument();
    expect(screen.getByText('Test Author')).toBeInTheDocument();
    expect(screen.getByText('Save to list')).toBeInTheDocument();
    expect(screen.queryByText('Test Description')).not.toBeInTheDocument();
  });

  it('renders book information correctly in list view', () => {
    renderBookCard({ view: 'list' });
    
    expect(screen.getByText('Test Book')).toBeInTheDocument();
    expect(screen.getByText('Test Author')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    expect(screen.getByText('Save to list')).toBeInTheDocument();
  });

  it('calls onSave when save button is clicked', () => {
    renderBookCard();
    
    fireEvent.click(screen.getByText('Save to list'));
    expect(defaultProps.onSave).toHaveBeenCalled();
  });

  it('calls onRemove when remove button is clicked', () => {
    renderBookCard({ saved: true });
    
    fireEvent.click(screen.getByText('Saved to List'));
    expect(defaultProps.onRemove).toHaveBeenCalled();
  });

  it('renders book image with correct alt text', () => {
    renderBookCard();
    
    const image = screen.getByAltText('Test Book');
    expect(image).toBeInTheDocument();
    expect(image.src).toBe('https://example.com/image.jpg');
  });
}); 