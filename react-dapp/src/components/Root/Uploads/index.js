import React from 'react';
import PropTypes from 'prop-types';
import Sell from './Sell';
import UploadList from './UploadList';

export default function Uploads(props) {
  return (
    <div>
      <Sell />
      <UploadList />
    </div>
  );
}

Uploads.propTypes = {

};
