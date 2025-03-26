import { renderHook, act } from '@testing-library/react-hooks';
import useBookSorting from './useBookSorting';

describe('useBookSorting', () => {
  const testBooks = [
    { id: '1', title: 'B Book', author: 'Z Author' },
    { id: '2', title: 'C Book', author: 'Y Author' },
    { id: '3', title: 'A Book', author: 'X Author' },
  ];

  it('should sort books by title by default', () => {
    const { result } = renderHook(() => useBookSorting(testBooks));
    
    expect(result.current.sortBy).toBe('title');
    expect(result.current.sortedBooks[0].title).toBe('A Book');
    expect(result.current.sortedBooks[1].title).toBe('B Book');
    expect(result.current.sortedBooks[2].title).toBe('C Book');
  });

  it('should sort books by the specified initial sort property', () => {
    const { result } = renderHook(() => useBookSorting(testBooks, 'author'));
    
    expect(result.current.sortBy).toBe('author');
    expect(result.current.sortedBooks[0].author).toBe('X Author');
    expect(result.current.sortedBooks[1].author).toBe('Y Author');
    expect(result.current.sortedBooks[2].author).toBe('Z Author');
  });

  it('should change sort order when setSortBy is called', () => {
    const { result } = renderHook(() => useBookSorting(testBooks));
    
    // Initial sort by title
    expect(result.current.sortedBooks[0].title).toBe('A Book');
    
    // Change sort to author
    act(() => {
      result.current.setSortBy('author');
    });
    
    expect(result.current.sortBy).toBe('author');
    expect(result.current.sortedBooks[0].author).toBe('X Author');
  });

  it('should return an empty array when books is undefined', () => {
    const { result } = renderHook(() => useBookSorting());
    expect(result.current.sortedBooks).toEqual([]);
  });

  it('should handle empty books array', () => {
    const { result } = renderHook(() => useBookSorting([]));
    expect(result.current.sortedBooks).toEqual([]);
  });

  it('should not mutate the original books array', () => {
    const originalBooks = [...testBooks];
    renderHook(() => useBookSorting(testBooks));
    
    // Ensure original array wasn't modified
    expect(testBooks).toEqual(originalBooks);
  });

  it('should provide a SorterControl component', () => {
    const { result } = renderHook(() => useBookSorting(testBooks));
    expect(result.current.SorterControl).toBeDefined();
  });
}); 