export const initialState = {
  books: [],
  saved: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'books_loaded':
      return { ...state, books: action.books };
    case 'book_added':
      return {
        ...state,
        saved: [...state.saved, action.book],
      };
    case 'book_saved_from_list':
      return {
        ...state,
        saved: [...state.saved, action.book],
      };
    case 'book_removed': {
      return {
        ...state,
        saved: state.saved.filter(({ id }) => id !== action.book.id)
      };
    }

    default:
      return state;
  }
}
