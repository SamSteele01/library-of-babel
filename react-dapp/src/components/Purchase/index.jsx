import React from "reactn";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";

import Ebook from "../Ebook";

export default function Purchase({ book, setBook }) {

  return (
    <div>
      <Button size="small" color="primary" onClick={event => setBook(null)}>
        Back
      </Button>
      <Ebook
        key={book.id}
        labelHash={book.labelHash}
        title={book.title}
        image={book.image}
        desc={book.desc}
        price={book.finneyPrice}
        purchase={true}
      />
    </div>
  );
}

Purchase.propTypes = {
  book: PropTypes.object.isRequired,
  setBook: PropTypes.func.isRequired
};
