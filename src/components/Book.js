import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import BookCard from './BookCard';

/**
 * Book component that wraps BookCard with Redux state management
 * @param {Object} props
 * @param {Object} props.book - The book object to display
 * @param {string} props.view - The view mode ('grid' or 'list')
 * @returns {JSX.Element}
 */
export default function Book({ book, view }) {
  const savedBooks = useSelector(state => state.savedBooks);
  const saved = savedBooks.has(book.id);

  return (
    <BookCard
      book={book}
      view={view}
      saved={saved}
    />
  );
}

Book.propTypes = {
  book: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    description: PropTypes.string,
    image_url: PropTypes.string.isRequired,
  }).isRequired,
  view: PropTypes.oneOf(['grid', 'list']).isRequired,
};
