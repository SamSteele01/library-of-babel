import React, { useGlobal } from 'reactn';
import PropTypes from 'prop-types';
// import Sell from './Sell';
import Create from './Create';
import UploadList from './UploadList';


export default function Uploads(props) {
  const [account] = useGlobal('account');

  return (
    <div>
      <Create
        account={account}
      />
      <UploadList
        account={account}
      />
    </div>
  );
}

Uploads.propTypes = {

};
