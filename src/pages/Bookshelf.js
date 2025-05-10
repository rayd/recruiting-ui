import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { Button } from 'components/Buttons';
import Icon from 'components/Icon';
import Page from 'components/Page';
import Book from 'components/Book';

const Shelf = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: flex-start;
  width: 1080px;
  margin: 0 auto;
`;

export default function Bookshelf({ books, actions, saved }) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const view = searchParams.get('view') || 'grid';
  const [sortBy, setSortBy] = useState('title');

  const Sorter = (
    <label key="sorter">
      Sort by&nbsp;
      <select onChange={e => setSortBy(e.target.value)} value={sortBy}>
        <option>title</option>
        <option>author</option>
      </select>
    </label>
  );

  return (
    <Page
      pageTitle="Your Saved Books"
      filters={[
        <Button onClick={() => navigate('/books/new')} key="add-new">
          <Icon icon="plus" /> Add new book
        </Button>,
        Sorter,
      ]}
    >
      {books.length === 0 ? (
        <p>
          You haven&apos;t saved any books yet. Add some books to get started!
        </p>
      ) : (
        <Shelf>
          {books
            .sort(({ [sortBy]: a }, { [sortBy]: b }) =>
              a < b ? -1 : a > b ? 1 : 0
            )
            .map(book => (
              <Book
                view={view}
                book={book}
                key={book.primary_isbn13 || book.id}
                onSave={() => {
                  actions.addBook(book);
                }}
                onRemove={() =>
                  actions.removeBook(
                    saved.find(
                      ({ id }) => id === (book.primary_isbn13 || book.id)
                    )
                  )
                }
                saved={saved.some(
                  ({ id }) => id === (book.primary_isbn13 || book.id)
                )}
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
      id: PropTypes.string,
      primary_isbn13: PropTypes.string,
      title: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      description: PropTypes.string,
      image_url: PropTypes.string.isRequired,
    })
  ),
  actions: PropTypes.shape({
    addBook: PropTypes.func.isRequired,
    removeBook: PropTypes.func.isRequired,
  }).isRequired,
  saved: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    })
  ),
};

Bookshelf.defaultProps = {
  books: [],
  saved: [],
};
