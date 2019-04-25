import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

import GetAccounts from './GetAccounts';
import Ebook from './Ebook';

export default function Purchase(props) {
  return (
    <div>
      <GetAccounts />
      <Button size="small" color="primary" onClick={event => props.setBook(null)}>
        Back
      </Button>
      {/* Id: {props.book} */}
      <Ebook
        key={props.book.id}
        index={props.book.index}
        title={props.book.title}
        image={props.book.image}
        desc={props.book.desc}
        price={props.book.price}
        // purchase={this.purchaseFunction}
      />
    </div>
  );
}

Purchase.propTypes = {
  book: PropTypes.object.isRequired,
  setBook: PropTypes.func.isRequired
};
