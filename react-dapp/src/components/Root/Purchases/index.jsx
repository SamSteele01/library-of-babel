import React, { useGlobal } from 'reactn';
// import PropTypes from 'prop-types';
// import superagent from 'superagent';
import PurchaseList from './PurchaseList';


export default function Purchases(props) {

  // const [purchases, setPurchases] = useGlobal('purchases');
  const [account] = useGlobal('account');


  return (
    <div>
      <PurchaseList
        account={account}
      />
    </div>
  );
}

Purchases.propTypes = {

};
