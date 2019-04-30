import React, { Component } from "react";
import PropTypes from "prop-types";
import superagent from 'superagent';

import { CardLoader } from "../common/CardLoader";
import Ebook from "../common/Ebook";

const bookDataObjects = [
  {
    _id: "5cc7860bf1a83b5a12531e59",
    ethAddress: "0xde1ec7ab1e0feca1",
    finneyPrice: "10",
    ipfsPath: "QmcUmMW1oQjq6DHrFj79eUcoK31DJd1cwHZzyaXRA9UUpi",
    labelHash: "aXBmcyB0ZXN0IGxhYmVs",
    policyEncryptingPubkey: "02a1371a45a447ab79de0f9a7d4b91fdb9a37754d3a473fac7b452c14793737aa8",
    title: "Lorem ipsum",
  },
  {
    id: "2",
    title: "Huh",
    image: null,
    desc: "someText",
    price: "15"
  },
  {
    id: "3",
    title: "Huh",
    image: null,
    desc: "someText",
    price: "20"
  }
];

export default class EbookList extends Component {
  static propTypes = {
    setBook: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      books: null
    };
  }

  componentDidMount() {
    this.getBooks();
  }

  getBooks = async () => {
    try {
      const res = await superagent.get('http://localhost:8080/books');
      console.log('books!', res.body);
      this.setState({ books: res.body });
    } catch (err) {
      console.log(err);
      console.log('The server is not running. Using test data...');
      this.setState({ books: bookDataObjects });
    }
  };

  view = bookId => {
    // render Purchase component
    this.props.setBook(this.state.books.filter((book) => book._id === bookId)[0]);
  };

  render() {
    let bookList = <CardLoader />;
    if (this.state.books) {
      bookList = this.state.books.map((book) => {
        return (
          <Ebook
            key={book._id}
            id={book._id}
            labelHash={book.labelHash}
            title={book.title}
            image={book.image}
            desc={book.desc}
            price={book.ethPrice}
            view={this.view}
          />
        );
      });
    }

    return <div className="ebook-list">{bookList}</div>;
  }
}
