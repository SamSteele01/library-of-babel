import React, { useState } from "react";

import NavBar from "../NavBar";
import EbookList from "../Listings";
import Purchase from "../Purchase";
import "./index.css";

function Root() {
  const [book, setBook] = useState(null);
  return (
    <div className="App">
      <NavBar />
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
