import React, { useState } from "react";

import EbookList from "../Listings";
import Purchase from "../Purchase";
import "./index.css";

function Root() {
  const [book, setBook] = useState(null);
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <p>Library of Babel</p>
      </header>
      {/* ebook list */}
      {book ? (
        <Purchase book={book} setBook={setBook} />
      ) : (
        <EbookList setBook={setBook} />
      )}
    </div>
  );
}

export default Root;
