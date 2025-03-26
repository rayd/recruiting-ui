import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { Title, Author, Description, Anchor } from '../styles/common';

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
 * BookCard component that displays book information in either grid or list view
 * @param {Object} props
 * @param {Object} props.book - The book object containing title, author, description, and image_url
 * @param {string} props.view - The view mode ('grid' or 'list')
 * @param {Function} props.onSave - Callback function when book is saved
 * @param {Function} props.onRemove - Callback function when book is removed
 * @param {boolean} props.saved - Whether the book is currently saved
 * @returns {JSX.Element}
 */
export default function BookCard({ book, view, onSave, onRemove, saved }) {
  return (
    <Wrapper view={view}>
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
        <SaveButton onSave={onSave} onRemove={onRemove} saved={saved} />
      </Details>
    </Wrapper>
  );
}

BookCard.propTypes = {
  book: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    description: PropTypes.string,
    image_url: PropTypes.string.isRequired,
  }).isRequired,
  view: PropTypes.oneOf(['grid', 'list']).isRequired,
  onSave: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  saved: PropTypes.bool.isRequired,
}; 