import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useNavigate, useParams } from '@reach/router';
import { Shelf } from '../styles/layout';
import Page from 'components/Page';
import Book from 'components/Book';
import useBookSorting from '../hooks/useBookSorting';
import useViewMode from '../hooks/useViewMode';
import { transformNYTBook } from '../utils/bookTransforms';

export default function Overview({ books, actions, saved }) {
  const navigate = useNavigate();
  const { listName } = useParams();
  const view = useViewMode();
  const [state, setState] = useState('loading');
  const [selected, setSelected] = useState(listName || 'hardcover-fiction');
  const [lists, setLists] = useState([]);
  
  const { sortedBooks, SorterControl } = useBookSorting(books);

  // Fetch list of book categories
  useEffect(() => {
    const API_KEY = process.env.REACT_APP_API_KEY || '';
    fetch(
      `https://api.nytimes.com/svc/books/v3/lists/names.json?api-key=${API_KEY}`
    )
      .then(resp => resp.json())
      .then(({ results }) => setLists(results))
      .catch(error => console.error('Error fetching book lists:', error));
  }, []);

  // Fetch books for selected category
  useEffect(() => {
    setState('loading');
    actions.getBooks(selected)
      .then(() => setState('done'))
      .catch(() => setState('error'));
  }, [actions, selected]);

  const handleChange = e => {
    const { value } = e.target;
    setSelected(value);
    navigate(`/${value}`, { replace: true });
  };

  const handleSaveBook = useCallback((book) => {
    actions.saveBookFromList(book);
  }, [actions]);

  const handleRemoveBook = useCallback((book) => {
    const savedBook = saved.find(({ id }) => id === book.primary_isbn13);
    if (savedBook) {
      actions.removeBook(savedBook);
    }
  }, [actions, saved]);

  const isBookSaved = useCallback((bookId) => {
    return saved.some(({ id }) => id === bookId);
  }, [saved]);

  return (
    <Page
      pageTitle="Discover New Books"
      filters={[
        <select onChange={handleChange} value={selected} key="lists">
          {lists.map(list => (
            <option key={list.list_name_encoded} value={list.list_name_encoded}>
              {list.display_name}
            </option>
          ))}
        </select>,
        SorterControl,
      ]}
    >
      {state === 'loading' && <p>Loading books...</p>}
      {state === 'error' && <p>Error loading books. Please try again later.</p>}
      {state === 'done' && (
        <Shelf>
          {sortedBooks.map(book => {
            const transformedBook = transformNYTBook(book);
            return (
              <Book
                view={view}
                book={transformedBook}
                key={transformedBook.id}
                onSave={handleSaveBook}
                onRemove={handleRemoveBook}
                saved={isBookSaved(transformedBook.id)}
              />
            );
          })}
        </Shelf>
      )}
    </Page>
  );
}

Overview.propTypes = {
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  books: PropTypes.arrayOf(PropTypes.object),
  saved: PropTypes.arrayOf(PropTypes.object),
};

Overview.defaultProps = {
  books: [],
  saved: [],
};
