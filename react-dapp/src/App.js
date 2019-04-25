import React from 'react';
// import logo from './logo.svg';
import fortmatic from './fortmatic';
import GetAccounts from './GetAccounts';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <p>
          Library of Babel
        </p>
      </header>
      {/* ebook list */}
      <GetAccounts />
    </div>
  );
}

export default App;
