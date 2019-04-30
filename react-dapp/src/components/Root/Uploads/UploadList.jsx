import React from 'reactn';
import PropTypes from 'prop-types';
import superagent from 'superagent';
import UCard from './UCard';
import { CardLoader } from '../../common/CardLoader';

export default class UploadList extends React.Component {

  static propTypes = {
    account: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      uploadList: null,
    };
  }

  componentDidMount() {
    this.getUploads(this.props.account);
  }

  getUploads = async (account) => {
    try {
      const res = await superagent.get(`http://localhost:8080/uploads/${account}`);
      console.log(res);

      this.setGlobal({ uploads: res.body });
      this.setState({ uploadList: res.body });
    } catch (err) {
      console.log(err);
      // console.log('The server is not running. Using test data...');
      this.setState({ error: true });
    }
  };

  // filterPurchases = () => {
  //
  // }

  getBooksFromUploads = () => {
    // for each, get book

  }

  viewFile = () => {

  }

  render() {

    let list = <CardLoader />;

    if (this.state.uploadList && this.state.uploadList.length > 0) {
      list = this.state.uploadList.map((upload) => {
        console.log('UPLOAD', upload);
        return (
          <UCard
            key={upload._id}
            id={upload._id}
            labelHash={upload.labelHash}
            ipfsPath={upload.ipfsPath}
            title={upload.title}
            image={upload.image}
            ethPrice={upload.ethPrice}
            view={this.viewFile}
          />
        );
      })
    }

    return (
      <div>
        <hr />
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
