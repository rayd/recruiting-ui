const initialState = new Set();

export default function savedBooks(state = initialState, action) {
  switch (action.type) {
    case 'book_added':
      return new Set([...state, action.book.id]);
    case 'book_removed':
      const newState = new Set(state);
      newState.delete(action.book.id);
      return newState;
    default:
      return state;
  }
} 