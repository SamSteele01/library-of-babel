import React from 'react';

export function withContract(WrappedComponent, abi, address) {
  // console.log('ADDRESS', address);
  // console.log('ABI', abi);
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        contract: new window.web3.eth.Contract(abi, address)
        // contract: "not"
      };
    }

    render() {
      return <WrappedComponent contract={this.state.contract} {...this.props} />;
    }
  };
}
