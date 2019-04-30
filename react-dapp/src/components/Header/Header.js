import React, { useGlobal } from "reactn";
import Button from "@material-ui/core/Button";
import Web3Banner from "../Web3Banner";
import TabTray from './TabTray/TabTray';

import "./index.css";

function Header() {
  const [displayWeb3, setDisplayWeb3] = useGlobal('displayWeb3');
  // const [route, setRoute] = useGlobal('route');

  return (
    <div>
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <div className='header-top-row'>

          <h4 className='header-name-box'>Library of Babel</h4>

          {displayWeb3 ? (
            <TabTray />
            // <div className='header-button-tray'>
            //   {/* listings */}
            //   <Button size="small" color="primary"
            //     onClick={event => setRoute('listings')}
            //   >
            //     Listings
            //   </Button>
            //   {/* my purchases */}
            //   <Button size="small" color="primary"
            //     onClick={event => setRoute('purchases')}
            //   >
            //     My Purchases
            //   </Button>
            //   {/* my uploads */}
            //   <Button size="small" color="primary"
            //     onClick={event => setRoute('uploads')}
            //   >
            //     My Uploads
            //   </Button>
            // </div>
          ) : (
            <Button size="small" color="primary"
              onClick={event => setDisplayWeb3(true)}
            >
              Log In
            </Button>
          )}
        </div>
        <div className='header-bottom-row'>
          {displayWeb3 && <Web3Banner />}
        </div>

      </header>
    </div>
  );
}

export default Header;
