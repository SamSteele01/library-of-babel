import React, { Component } from "reactn";
import PropTypes from "prop-types";
import getWeb3 from "../../../getWeb3";

// banner at the top of the page
// should get web3 from either MetaMask, browser, or Fortmatic
export default class Web3Banner extends React.Component {
  static propTypes = {
    // accountReady: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      web3Source: null,
      listenerInterval: null,
      account: null
    };
  }

  componentDidMount() {
    this.assignWeb3();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.web3Source !== this.state.web3Source) {
      this.checkNetwork();
    }
    if (
      this.state.web3Source !== null &&
      this.state.listenerInterval === null
    ) {
      const listenInterval = setInterval(this.accountListener, 2000);
      this.setState({ listenerInterval: listenInterval });
    }
    // if (prevState.account !== this.state.account) {
    //   this.props.accountReady(this.state.account);
    // }
  }

  componentWillUnmount() {
    clearInterval(this.state.listenerInterval);
  }

  async assignWeb3() {
    let web3Source = await getWeb3();
    this.setState({ web3Source });
  }

  // if metamask check network
  checkNetwork = () => {
    window.web3.eth.net.getId((err, netId) => {
      if (err) {
        console.log("err: ", err);
      } else {
        console.log("NETID", netId);
        if (netId !== 4) {
          this.setState({ networkMessage: "Please use the Rinkeby network" });
        } else {
          this.setState({ networkMessage: null });
        }
      }
    });
  };

  accountListener = () => {
    console.log("ACCOUNTLISTENER");
    window.web3.eth.getAccounts((error, accounts) => {
      if (error) {
        console.log("ERROR", error);
      } else {
        // console.log(accounts); // ['0x...']
        if (accounts[0] !== this.state.account) {
          this.setGlobal({ account: accounts[0] });
          this.setState({ account: accounts[0] });
        }
      }
    });
  };

  render() {
    const { web3Source, networkMessage, account } = this.state;

    return (
      <div className="web3-banner">
        {/* {web3Source && <h2>{web3Source}</h2>} */}
        {networkMessage && <p>{networkMessage}</p>}
        {account ? (
          <p>using {web3Source} account: {account}</p>
        ) : (
          <p>connecting to your account...</p>
        )}
      </div>
    );
  }
}
