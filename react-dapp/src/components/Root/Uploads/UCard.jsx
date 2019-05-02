import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from "@material-ui/core/Button";
import Ebook from '../../common/Ebook';

export default class UCard extends Component {

  static propTypes = {

  };

  constructor(props) {
    super(props);



    this.state = {

    };
  }

  render() {

    const props = this.props;

    return (
      <div className="ucard">
        <Ebook
          key={props.key}
          id={props.id}
          labelHash={props.labelHash}
          ipfsPath={props.ipfsPath}
          title={props.title}
          image={props.image}
          price={props.ethPrice}
        />
        {/* edit controls */}
        <Button size="small" color="primary"
          // onClick={this.props.edit}
        >
          Edit
        </Button>
      </div>
    );
  }

}
