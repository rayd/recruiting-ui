import { useState, useMemo } from 'react';
import { createBookSorter } from '../utils/bookTransforms';

/**
 * Custom hook for sorting books
 * @param {Array} books - Array of book objects
 * @param {string} initialSortBy - Initial property to sort by
 * @returns {Object} - Sorted books and sortBy state
 */
const useBookSorting = (books = [], initialSortBy = 'title') => {
  const [sortBy, setSortBy] = useState(initialSortBy);
  
  const sortedBooks = useMemo(() => {
    if (!books.length) return [];
    return [...books].sort(createBookSorter(sortBy));
  }, [books, sortBy]);

  const SorterControl = (
    <label>
      Sort by&nbsp;
      <select onChange={e => setSortBy(e.target.value)} value={sortBy}>
        <option>title</option>
        <option>author</option>
      </select>
    </label>
  );

  return {
    sortedBooks,
    sortBy,
    setSortBy,
    SorterControl
  };
};

export default useBookSorting; 