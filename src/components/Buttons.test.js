import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { SaveButton } from './Buttons';

const mockStore = configureStore([]);

const mockBook = {
  id: '1',
  title: 'Test Book',
  author: 'Test Author',
  description: 'Test Description',
  image_url: 'https://example.com/image.jpg',
};

describe('SaveButton', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      savedBooks: new Set(),
    });
  });

  const renderSaveButton = (props = {}) => {
    return render(
      <Provider store={store}>
        <SaveButton book={mockBook} {...props} />
      </Provider>
    );
  };

  it('renders save button when book is not saved', () => {
    renderSaveButton();
    
    expect(screen.getByText('Save to list')).toBeInTheDocument();
    expect(screen.queryByText('Saved to List')).not.toBeInTheDocument();
  });

  it('renders remove button when book is saved', () => {
    store = mockStore({
      savedBooks: new Set([mockBook.id]),
    });
    
    renderSaveButton();
    
    expect(screen.getByText('Saved to List')).toBeInTheDocument();
    expect(screen.queryByText('Save to list')).not.toBeInTheDocument();
  });

  it('dispatches addBook action when save button is clicked', () => {
    renderSaveButton();
    
    fireEvent.click(screen.getByText('Save to list'));
    
    const actions = store.getActions();
    expect(actions).toEqual([
      {
        type: 'book_added',
        book: mockBook,
      },
    ]);
  });

  it('dispatches removeBook action when remove button is clicked', () => {
    store = mockStore({
      savedBooks: new Set([mockBook.id]),
    });
    
    renderSaveButton();
    
    fireEvent.click(screen.getByText('Saved to List'));
    
    const actions = store.getActions();
    expect(actions).toEqual([
      {
        type: 'book_removed',
        book: mockBook,
      },
    ]);
  });

  it('applies custom className when provided', () => {
    renderSaveButton({ className: 'custom-class' });
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass('custom-class');
  });
}); 