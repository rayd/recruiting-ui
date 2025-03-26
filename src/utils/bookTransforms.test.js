import { transformNYTBook, getBookId, createBookSorter } from './bookTransforms';

describe('bookTransforms', () => {
  describe('transformNYTBook', () => {
    it('transforms a book from NYT API format to internal format', () => {
      const nytBook = {
        primary_isbn13: '1234567890123',
        title: 'Test Book',
        author: 'Test Author',
        book_image: 'https://example.com/image.jpg',
        description: 'Test description',
      };

      const result = transformNYTBook(nytBook);

      expect(result).toEqual({
        id: '1234567890123',
        title: 'Test Book',
        author: 'Test Author',
        image_url: 'https://example.com/image.jpg',
        description: 'Test description',
      });
    });
  });

  describe('getBookId', () => {
    it('returns id for internal book format', () => {
      const book = { id: '1234567890123' };
      expect(getBookId(book)).toBe('1234567890123');
    });

    it('returns primary_isbn13 for NYT book format', () => {
      const book = { primary_isbn13: '1234567890123' };
      expect(getBookId(book)).toBe('1234567890123');
    });

    it('prefers primary_isbn13 if both id and primary_isbn13 exist', () => {
      const book = { id: '1111111111111', primary_isbn13: '1234567890123' };
      expect(getBookId(book)).toBe('1234567890123');
    });
  });

  describe('createBookSorter', () => {
    const books = [
      { title: 'B Book', author: 'Z Author' },
      { title: 'C Book', author: 'Y Author' },
      { title: 'A Book', author: 'X Author' },
    ];

    it('creates a sorter function for the title property', () => {
      const sorter = createBookSorter('title');
      const sorted = [...books].sort(sorter);
      
      expect(sorted[0].title).toBe('A Book');
      expect(sorted[1].title).toBe('B Book');
      expect(sorted[2].title).toBe('C Book');
    });

    it('creates a sorter function for the author property', () => {
      const sorter = createBookSorter('author');
      const sorted = [...books].sort(sorter);
      
      expect(sorted[0].author).toBe('X Author');
      expect(sorted[1].author).toBe('Y Author');
      expect(sorted[2].author).toBe('Z Author');
    });

    it('handles null or undefined values gracefully', () => {
      const booksWithMissingData = [
        { title: 'B Book' },
        { title: 'C Book', author: null },
        { title: 'A Book', author: 'X Author' },
      ];
      
      const sorter = createBookSorter('author');
      const sorted = [...booksWithMissingData].sort(sorter);
      
      // Books with missing authors should be placed after books with authors
      expect(sorted[0].author).toBe('X Author');
    });

    it('is case-insensitive', () => {
      const booksWithMixedCase = [
        { title: 'b book' },
        { title: 'C Book' },
        { title: 'a BOOK' },
      ];
      
      const sorter = createBookSorter('title');
      const sorted = [...booksWithMixedCase].sort(sorter);
      
      expect(sorted[0].title).toBe('a BOOK');
      expect(sorted[1].title).toBe('b book');
      expect(sorted[2].title).toBe('C Book');
    });
  });
}); 