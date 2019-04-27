import React from 'react';

export default function withContract(WrappedComponent, abi, address) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        contract: new window.web3.eth.Contract(abi, address)
      };
    }

    render() {
      return <WrappedComponent contract={this.state.contract} {...this.props} />;
    }
  };
}
