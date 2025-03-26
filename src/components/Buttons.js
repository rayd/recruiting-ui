import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { useDispatch, useSelector } from 'react-redux';
import Icon from './Icon';
import { addBook, removeBook } from '../actions/books';

export const Button = styled.button`
  border: 1px solid #d6216b;
  border-radius: 20px;
  background: #fff;
  color: #d6216b;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  width: 150px;
  height: 40px;
  ${Icon} {
    font-size: 0.75em;
    margin-top: 1px;
    margin-right: 8px;
  }
`;

const TextButton = styled.button`
  border: none;
  background: none;
  color: #1eb5c4;
  display: flex;
  justify-content: center;
  align-items: center;
  ${Icon} {
    font-size: 0.75em;
    margin-top: 1px;
    margin-right: 8px;
  }
`;

/**
 * SaveButton component that handles saving and removing books from the user's list
 * @param {Object} props
 * @param {Object} props.book - The book object to save/remove
 * @param {string} props.className - Optional CSS class name
 * @returns {JSX.Element}
 */
export const SaveButton = ({ book, className }) => {
  const dispatch = useDispatch();
  const savedBooks = useSelector(state => state.savedBooks);
  const isSaved = savedBooks.has(book.id);

  const handleSave = () => {
    dispatch(addBook(book));
  };

  const handleRemove = () => {
    dispatch(removeBook(book));
  };

  return isSaved ? (
    <TextButton
      className={className}
      onClick={handleRemove}
      aria-label="Remove from saved list"
    >
      <Icon icon="check" /> Saved to List
    </TextButton>
  ) : (
    <Button
      className={className}
      onClick={handleSave}
      aria-label="Save to list"
    >
      <Icon icon="plus" /> Save to list
    </Button>
  );
};

SaveButton.propTypes = {
  book: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    description: PropTypes.string,
    image_url: PropTypes.string.isRequired,
  }).isRequired,
  className: PropTypes.string,
};
