import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as listActions from 'actions/lists';
import * as bookActions from 'actions/books';

import Bookshelf from 'pages/Bookshelf';
import BookDetails from 'pages/BookDetails';
import AddBook from 'pages/AddBook';
import Overview from 'pages/Overview';
import Banner from 'components/Banner';

import './App.css';

export function App(props) {
  const { actions, saved } = props;
  return (
    <BrowserRouter>
      <Banner />
      <Routes>
        <Route path="/" element={<Overview {...props} />} />
        <Route path="/:listName" element={<Overview {...props} />} />
        <Route path="/books/new" element={<AddBook actions={actions} />} />
        <Route path="/books/:bookId" element={<BookDetails {...props} />} />
        <Route
          path="/saved"
          element={<Bookshelf books={saved} actions={actions} saved={saved} />}
        />
        <Route
          path="/saved/:bookId"
          element={<BookDetails actions={actions} books={saved} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

App.propTypes = {
  actions: PropTypes.shape({
    getBooks: PropTypes.func.isRequired,
    saveBookFromList: PropTypes.func.isRequired,
    addBook: PropTypes.func.isRequired,
    removeBook: PropTypes.func.isRequired,
  }).isRequired,
  saved: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      description: PropTypes.string,
      image_url: PropTypes.string.isRequired,
    })
  ),
};

App.defaultProps = {
  saved: [],
};

export default connect(
  state => state,
  dispatch => ({
    actions: bindActionCreators({ ...listActions, ...bookActions }, dispatch),
  })
)(App);
