import React, { useState } from 'react';

import EbookList from './EbookList';
import Purchase from './Purchase';
import './styles/App.css';

function App() {
  const [book, setBook] = useState(null);
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <p>
          Library of Babel
        </p>
      </header>
      {/* ebook list */}
      {book ? (
        <Purchase
          book={book}
          setBook={setBook}
        />
      ) : (
        <EbookList
          setBook={setBook}
        />
      )}
    </div>
  );
}

export default App;
