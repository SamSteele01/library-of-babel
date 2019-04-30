import React, { useState, useGlobal } from "reactn";

import EbookList from "../Listings";
import Header from "../Header";
import SingleEBook from "../SingleEBook";
import Purchases from './Purchases';
// import Info from "../Info";
// import Sell from "../Sell";
// import ListingStatus from "../ListingStatus";
// import DecryptionStatus from "../DecryptionStatus";

import "./index.css";

function Root() {
  const [bookId, setBookId] = useState(null);
  // const [displayWeb3] = useGlobal('displayWeb3');
  const [route] = useGlobal('route');

  return (
    <div className="Root">
      <Header />
      {/* {displayWeb3 && <Web3Banner />} */}

      {route === 'listings' && (
        <div className='listings'>
          {bookId ? (
            <SingleEBook book={bookId} setBook={setBookId} />
          ) : (
            <EbookList setBook={setBookId} />
          )}
        </div>
      )}

      {route === 'purchases' && (
        <Purchases />
      )}

      {route === 'uploads' && (
        <div>

        </div>
      )}

      {/* <Info />
      <Sell />
      <ListingStatus />
      <DecryptionStatus /> */}
    </div>
  );
}

export default Root;
