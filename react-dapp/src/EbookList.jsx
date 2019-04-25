import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { CardLoader } from './CardLoader';
import Ebook from './Ebook';

const bookDataObjects = [
  {
    id: "1",
    title: "Huh",
    image: null,
    desc: "someText",
    price: "dollars"
  },
  {
    id: "2",
    title: "Huh",
    image: null,
    desc: "someText",
    price: "dollars"
  },
  {
    id: "3",
    title: "Huh",
    image: null,
    desc: "someText",
    price: "dollars"
  }
]

export default class EbookList extends Component {

  static propTypes = {
    setBook: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      books: null,
    };
  }

  componentDidMount() {
    this.getBooks();
  }

  getBooks = () => {
    // api call to db. Hardcode for now
    let books = bookDataObjects;
    this.setState({ books })
  }

  purchaseFunction = (index) => {
    // detect web3

    // convert price to eth

    // render checkout component
    this.props.setBook(bookDataObjects[index]);
  }

  render() {
    let bookList = <CardLoader />
    if (this.state.books) {
      bookList = this.state.books.map((book, index) => {
        return (
          <Ebook
            key={book.id}
            index={index}
            title={book.title}
            image={book.image}
            desc={book.desc}
            price={book.price}
            purchase={this.purchaseFunction}
          />
        )
      })
    }

    return (
      <div className="ebook-list">
        {bookList}
      </div>
    );
  }

}
