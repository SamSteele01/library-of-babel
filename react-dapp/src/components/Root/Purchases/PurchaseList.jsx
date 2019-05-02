import React, { useGlobal, setGlobal } from 'reactn';
import PropTypes from 'prop-types';
import superagent from 'superagent';
import Card from './Card';
import { CardLoader } from '../../common/CardLoader';

export default class PurchaseList extends React.Component {

  static propTypes = {
    account: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      purchaseList: null,
    };
  }

  componentDidMount() {
    this.getPurchases(this.props.account);
  }

  getPurchases = async (account) => {
    try {
      const res = await superagent.get(`${this.global.serverUrl}/purchases/${account}`);
      console.log(res);

      this.setGlobal({ purchases: res.body });
      this.setState({ purchaseList: res.body });
    } catch (err) {
      console.log(err);
      // console.log('The server is not running. Using test data...');
      this.setState({ error: true });
    }
  };

  // filterPurchases = () => {
  //
  // }

  getBooksFromPurchases = () => {
    // for each, get book

  }

  viewFile = () => {

  }

  decryptKey = () => {

  }

  getDecryptKey = () => {
    
  }

  render() {

    let list = <CardLoader />;

    if (this.state.purchaseList && this.state.purchaseList.length > 0) {
      list = this.state.purchaseList.map((purchase) => {
        console.log('PURCHASE', purchase);
        return (
          <Card
            key={purchase.id}
            id={purchase.id}
            labelHash={purchase.labelHash}
            ipfsPath={purchase.ipfsPath}
            title={purchase.title}
            image={purchase.image}
            viewFile={this.viewFile}
            decryptKey={this.decryptKey}
            getDecryptKey={this.getDecryptKey}
          />
        );
      })
    }

    return (
      <div>

        {this.state.error ? (
          <div>There was an error loading</div>
        ) : (
          <div>
            {list}
          </div>
        )}

      </div>
    );
  }
}
/*
{
        "_id": "5cc7612dd84e645153f02fdf",
        "bookId": "5cc75db7b69346510a27eaf4",
        "ethAddress": "0x57ab1e0ab1e0a7e0decea5ed0beef",
        "txn": "0xnot1really1a1txn",
        "created_at": "2019-04-29T20:40:13.783Z",
        "updated_at": "2019-04-29T20:40:13.783Z",
        "__v": 0
    }
    */
