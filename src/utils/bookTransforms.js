/**
 * Transforms a book from the NYT API format to the app's internal format
 * @param {Object} book - The book from NYT API
 * @returns {Object} - Transformed book object
 */
export const transformNYTBook = (book) => ({
  id: book.primary_isbn13,
  title: book.title,
  author: book.author,
  image_url: book.book_image,
  description: book.description,
});

/**
 * Gets a book's ID regardless of whether it comes from the NYT API or the internal format
 * @param {Object} book - The book object
 * @returns {string} - The book's ID
 */
export const getBookId = (book) => book.primary_isbn13 || book.id;

/**
 * Creates a sorter function for books based on a specific property
 * @param {string} sortBy - The property to sort by
 * @returns {Function} - The sorter function
 */
export const createBookSorter = (sortBy) => {
  return (a, b) => {
    const valueA = a[sortBy]?.toLowerCase();
    const valueB = b[sortBy]?.toLowerCase();
    return valueA < valueB ? -1 : valueA > valueB ? 1 : 0;
  };
}; 