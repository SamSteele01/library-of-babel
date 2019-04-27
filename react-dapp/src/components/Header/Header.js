import React from "react";
import { Menu, CloudDownload, Print, Bookmark } from "@material-ui/icons";

import Example from "../Example";

import "./index.css";

function Header() {
  return (
    <div>
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <p>Library of Babel</p>
        <Example />
        <Menu />
        <CloudDownload />
        <Print />
        <Bookmark />
      </header>
    </div>
  );
}

export default Header;
