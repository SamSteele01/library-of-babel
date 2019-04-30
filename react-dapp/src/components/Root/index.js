import React, { useState, useGlobal } from "reactn";

import EbookList from "../Listings";
import Header from "../Header";
import Web3Banner from "../Web3Banner";
import Info from "../Info";
import Purchase from "../Purchase";
import Sell from "../Sell";
import ListingStatus from "../ListingStatus";
import DecryptionStatus from "../DecryptionStatus";

import "./index.css";

function Root() {
  const [bookId, setBookId] = useState(null);
  const [displayWeb3] = useGlobal('displayWeb3');

  return (
    <div className="Root">
      <Header />
      {displayWeb3 && <Web3Banner />}
      {bookId ? (
        <Purchase book={bookId} setBook={setBookId} />
      ) : (
        <EbookList setBook={setBookId} />
      )}
      <Info />
      <Sell />
      <ListingStatus />
      <DecryptionStatus />
    </div>
  );
}

export default Root;
