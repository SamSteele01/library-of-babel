const Books = require('../models/book');
const ipfsClient = require('ipfs-http-client')

const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' })

class BookCtrl {

  create = async (req, res) => {
    try {
      // this.validateRequest(req);
      let data = {};

      /* send buffered content to enrico */
      // TODO somewhere it needs policy_encrypting_pubkey
      superagent
        .post('localhost:5151/encrypt_message') // enrico node
        .send({ message: req.body.content }) // send buffered content
        // .set('X-API-Key', 'foobar')
        // .set('accept', 'json')
        .end((err, response) => {
          if (err) {
            throw err;
          } else {
            console.log('enrico response', response);
            data = response.result;
          }
        });

      /* save to IPFS */
      ipfs.add(data, {}, async (err, ipfsHash) => {
        if (err) {
          console.error(err)
        } else {
          console.log('IPFSHASH', ipfsHash);
          req.body.ipfsHash = ipfsHash
        }
      })

      /* create book */
      let book = new Books({
        address: req.body.address,
        label: req.body.label,
        ipfsHash: req.body.ipfsHash,
        ethPrice: req.body.ethPrice,
        title: req.body.title,
      });
      await book.save();

      /* call fxn in contract */
      // web3.paidAccess.methods.addContent().call();

      /* send response */
      res.status(201).json({
        message: 'Book uploaded.',
        bookId: book._id,
        ipfsHash: book.ipfsHash,
      });
    } catch (err) {
      res.status(400).json({
        message: err.message ? err.message : err[0].msg,
      });
    }
  }

  getAll = async (req, res) => {
    try {
      // Api.validateVendible(req);
      const books = await Books.find({}).exec();
      res.status(200).json(books);
    } catch (err) {
      res.status(400).json({
        message: err.message ? err.message : err[0].msg,
      });
    }
  };

  makePubkey = async (req, res) => {
    try {
      let data = {};

      /* send base 64 label to alice */
      superagent
        .put('localhost:8151/derive_policy_pubkey')
        .send({ label: req.body.label })
        .end((err, response) => {
          if (err) {
            throw err;
          } else {
            console.log('alice response', response);
            data = response.result;
          }
        });

      res.status(200).json({ pubKey: data.policy_encrypting_pubkey });
    } catch (err) {
      res.status(400).json({
        message: err.message ? err.message : err[0].msg,
      });
    }
  }

}
export default new BookCtrl();
