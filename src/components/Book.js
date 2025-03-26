import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';

import { Anchor } from '../styles/layout';
import { Title, Author, Description } from '../styles/typography';
import { SaveButton } from './Buttons';

const Cover = styled.div`
  width: 150px;
  height: 280px;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  & > a > img {
    max-width: 100%;
    max-height: 240px;
    display: block;
  }
`;

const Details = styled.section`
  flex: 1;
`;

const Wrapper = styled.article`
  font-family: Palatino, serif;
  display: flex;
  justify-content: flex-start;
  width: 270px;
  padding: 50px 10px;

  ${({ view }) => {
    if (view === 'list') {
      return `
        align-items: flex-start;
        width: 100%;
        padding: 10px;
        ${Cover} {
            margin-right: 78px;
        }
      `;
    }
    return `
      &&, ${Details} {
        display: flex;
        align-items: center;
        flex-direction: column;
        text-align: center;
      }
  `;
  }}
`;

/**
 * Book component displays a book with different layouts based on view mode
 * @param {Object} props
 * @param {Object} props.book - Book object
 * @param {Function} props.onSave - Function to call when saving a book
 * @param {Function} props.onRemove - Function to call when removing a book
 * @param {boolean} props.saved - Whether the book is saved
 * @param {string} props.view - View mode ('grid' or 'list')
 */
export default function Book({ book, onSave, onRemove, saved, view }) {
  return (
    <Wrapper key={book.id} view={view} data-testid="book-component">
      <Cover>
        <Anchor to={`/books/${book.id}`}>
          <img src={book.image_url} alt={book.title} />
        </Anchor>
      </Cover>
      <Details>
        <Title>
          <Anchor to={`/books/${book.id}`}>{book.title.toLowerCase()}</Anchor>
        </Title>
        <Author>{book.author}</Author>
        {view === 'list' && <Description>{book.description}</Description>}
        <SaveButton onSave={() => onSave(book)} onRemove={() => onRemove(book)} saved={saved} />
      </Details>
    </Wrapper>
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
  saved: PropTypes.bool,
  onSave: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  view: PropTypes.oneOf(['grid', 'list']),
};

Book.defaultProps = {
  saved: false,
  view: 'grid',
};
