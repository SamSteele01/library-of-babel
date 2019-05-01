import React from "reactn";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";

import Ebook from "../../common/Ebook";

// should wrap with contract here

export default function SingleEBook({ book, setBook }) {

  return (
    <div>

        <Button size="small" color="primary" onClick={event => setBook(null)}>
          Back
        </Button>

      <Ebook
        key={book._id}
        id={book._id}
        labelHash={book.labelHash}
        title={book.title}
        image={book.image}
        desc={book.desc}
        price={book.ethPrice}
        purchase={true}
      />
    </div>
  );
}

SingleEBook.propTypes = {
  book: PropTypes.object.isRequired,
  setBook: PropTypes.func.isRequired
};
