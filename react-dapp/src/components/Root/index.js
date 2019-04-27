import React, { useState } from "react";

import Header from "../Header";
import EbookList from "../Listings";
import Info from "../Info";
import Purchase from "../Purchase";
import "./index.css";

function Root() {
  const [book, setBook] = useState(null);
  return (
    <div className="Root">
      <Header />
      {/* ebook list */}
      {book ? (
        <Purchase book={book} setBook={setBook} />
      ) : (
        <EbookList setBook={setBook} />
      )}
      <Info />
    </div>
  );
}

export default Root;
