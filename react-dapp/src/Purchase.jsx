import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

import Web3Banner from './Web3Banner';
import Ebook from './Ebook';
import Confirm from './Confirm';
import withContract from './withContract';

// purchase onClick needs to get web3, then call contract function
export default function Purchase({ book, setBook }) {
  const [displayWeb3, setDisplay] = useState(false);
  const [account, setAccount] = useState(false);

  const ConfirmAndSend = withContract(Confirm, abi, contractAddress);

  return (
    <div>
      {displayWeb3 &&
        <Web3Banner
          accountReady={setAccount}
        />
      }
      <Button size="small" color="primary" onClick={event => setBook(null)}>
        Back
      </Button>
      {/* Id: {book} */}
      <Ebook
        key={book.id}
        index={book.index}
        title={book.title}
        image={book.image}
        desc={book.desc}
        price={book.price}
        purchase={setDisplay}
      />
      {account &&
        <ConfirmAndSend
          account={account}
          bookId={book.id}
          price={book.price}
        />
      }
    </div>
  );
}

Purchase.propTypes = {
  book: PropTypes.object.isRequired,
  setBook: PropTypes.func.isRequired
};
