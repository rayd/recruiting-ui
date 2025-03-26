import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from '@reach/router';

import { Button } from 'components/Buttons';
import Icon from 'components/Icon';
import Page from 'components/Page';
import Book from 'components/Book';
import { Shelf } from '../styles/layout';
import useBookSorting from '../hooks/useBookSorting';
import useViewMode from '../hooks/useViewMode';
import { getBookId } from '../utils/bookTransforms';

export default function Bookshelf({ books, actions, saved }) {
  const navigate = useNavigate();
  const view = useViewMode();
  const { sortedBooks, SorterControl } = useBookSorting(books);

  const handleAddBook = () => navigate('/books/new');

  const handleSaveBook = useCallback((book) => {
    actions.addBook(book);
  }, [actions]);

  const handleRemoveBook = useCallback((book) => {
    const bookId = getBookId(book);
    const savedBook = saved.find(({ id }) => id === bookId);
    if (savedBook) {
      actions.removeBook(savedBook);
    }
  }, [actions, saved]);

  const isBookSaved = useCallback((book) => {
    const bookId = getBookId(book);
    return saved.some(({ id }) => id === bookId);
  }, [saved]);

  return (
    <Page
      pageTitle="Your Saved Books"
      filters={[
        <Button onClick={handleAddBook} key="add-new">
          <Icon icon="plus" /> Add new book
        </Button>,
        SorterControl,
      ]}
    >
      {books.length === 0 ? (
        <p>You haven't saved any books yet. Add some books to get started!</p>
      ) : (
        <Shelf width="1080px" margin="0 auto">
          {sortedBooks.map(book => (
            <Book
              view={view}
              book={book}
              key={getBookId(book)}
              onSave={handleSaveBook}
              onRemove={handleRemoveBook}
              saved={isBookSaved(book)}
            />
          ))}
        </Shelf>
      )}
    </Page>
  );
}

Bookshelf.propTypes = {
  books: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      description: PropTypes.string,
      image_url: PropTypes.string.isRequired,
    })
  ),
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  saved: PropTypes.arrayOf(PropTypes.object),
};

Bookshelf.defaultProps = {
  books: [],
  saved: [],
};
