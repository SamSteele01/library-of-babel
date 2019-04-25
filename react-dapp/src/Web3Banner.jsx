import React, { Component } from 'react';
import PropTypes from 'prop-types';
import getWeb3 from './fortmatic';

// banner at the top of the page
// should get web3 from either MetaMask, browser, or Fortmatic
export default class Web3Banner extends Component {

  static propTypes = {

  };

  constructor(props) {
    super(props);

    this.state = {

    };
  }

  componentDidMount() {
    getWeb3()
  }

  render() {
    return (
      <div className="web3-banner">
        Banner!
      </div>
    );
  }

}
