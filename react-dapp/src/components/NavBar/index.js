import React, { useState } from "react";

import "./index.css";

function NavBar() {
  const [book, setBook] = useState(null);
  return (
    <div>
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <p>Library of Babel</p>
      </header>
    </div>
  );
}

export default NavBar;
