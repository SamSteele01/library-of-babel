import React, { Component } from 'react';
import PropTypes from 'prop-types';


export default class GetAccounts extends Component {

  static propTypes = {

  };

  constructor(props) {
    super(props);

    this.state = {

    };
  }

  componentDidMount() {
    window.web3.eth.getAccounts().then((accounts) => {
      console.log(accounts); // ['0x...']
    });
  }

  render() {
    return (
      <div>MyComponent</div>
    );
  }

}
