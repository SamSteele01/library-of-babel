import React, { useState } from "react";

import EbookList from "../Listings";
import Header from "../Header";
import Info from "../Info";
import Purchase from "../Purchase";
import Sell from "../Sell";
import ListingStatus from "../ListingStatus";
import DecryptionStatus from "../DecryptionStatus";

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
      <Sell />
      <ListingStatus />
      <DecryptionStatus />
    </div>
  );
}

export default Root;