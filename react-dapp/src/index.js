import React, { setGlobal } from 'reactn';
import ReactDOM from "react-dom";
import "./styles/index.css";
import Root from "./components/Root";
import * as serviceWorker from "./serviceWorker";

setGlobal({
  account: null, // local storage?
  displayWeb3: false,
});

ReactDOM.render(<Root />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
