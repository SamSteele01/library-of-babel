import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";

/**
 * get contract, call function
 * @arg id, eth, account
 */

export default function Confirm({ account, bookId, contract, price }) {
  function purchase(bookId) {
    contract.methods
      .buyAccess(bookId)
      .send({
        from: account,
        value: window.web3.utils.toWei(price, "ether")
        // gas: 3000000
      })
      .on("transactionHash", hash => {
        console.log(hash);
      })
      .on("receipt", receipt => {
        console.log(receipt);
      })
      .on("error", console.error);
  }

  return (
    <div>
      <Button size="small" color="primary" onClick={purchase(bookId)}>
        Confirm purchase
      </Button>
    </div>
  );
}

Confirm.propTypes = {
  bookId: PropTypes.string.isRequired,
  contract: PropTypes.object.isRequired,
  account: PropTypes.string.isRequired
};
