import { combineReducers } from 'redux';
import savedBooks from './savedBooks';

export const initialState = {
  books: [],
};

export default combineReducers({
  books: (state = initialState.books, action) => {
    switch (action.type) {
      case 'books_loaded':
        return action.books;
      default:
        return state;
    }
  },
  savedBooks,
});
