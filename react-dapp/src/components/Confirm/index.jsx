// Confirm/index.jsx //

import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";


export default function Confirm({ account, contract, labelHash, price, recordInDB }) {

  const utils = window.web3.utils;

  // TODO this should come from the web3banner
  function purchase(label) {
    contract.methods
      .purchaseContent(label)
      .send({
        from: account,
        value: utils.toWei(utils.toBN(price), "finney"),
        gas: 3000000
      })
      .on("transactionHash", hash => {
        console.log('hash', hash);
        recordInDB(hash);
      })
      .on("receipt", receipt => {
        console.log(receipt);
      })
      .on("error", console.error);
  }



  return (
    <div>
      <Button size="small" color="primary"
        onClick={event => purchase(labelHash)}
      >
        Confirm purchase
      </Button>
    </div>
  );
}

Confirm.propTypes = {
  account: PropTypes.string.isRequired,
  contract: PropTypes.object.isRequired,
  labelHash: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired
};
