import React, { useCallback, memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';

import Icon from './Icon';

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
 * SaveButton component that allows users to save or remove books
 * @param {Object} props 
 * @param {boolean} props.saved - Whether the book is currently saved
 * @param {Function} props.onSave - Function to call when saving a book
 * @param {Function} props.onRemove - Function to call when removing a book
 * @param {string} props.className - Optional CSS class
 */
export const SaveButton = memo(({ saved, onSave, onRemove, className }) => {
  const handleSaveClick = useCallback(() => {
    onSave();
  }, [onSave]);

  const handleRemoveClick = useCallback(() => {
    onRemove();
  }, [onRemove]);

  if (saved) {
    return (
      <TextButton
        className={className}
        onClick={handleRemoveClick}
        aria-label="Remove from saved list"
      >
        <Icon icon="check" /> Saved to List
      </TextButton>
    );
  }
  
  return (
    <Button
      className={className}
      onClick={handleSaveClick}
      aria-label="Save to list"
    >
      <Icon icon="plus" /> Save to list
    </Button>
  );
});

SaveButton.propTypes = {
  saved: PropTypes.bool,
  onSave: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  className: PropTypes.string,
};

SaveButton.defaultProps = {
  saved: false,
  className: '',
};

// Add display name for better debugging
SaveButton.displayName = 'SaveButton';
