const superagent = require('superagent');
const ipfsClient = require('ipfs-http-client');
const btoa = require('btoa');
const Books = require('../models/book');
const Validate = require('../validate').default;

const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' })



class BookCtrl {

  /** UPLOAD new book, encrypt, store on ipfs, save in db
  * @body title, content, ethPrice, labelHash, ethAddress, pubKey
  * @return bookId, ipfsHash
  */
  create = async (req, res) => {
    try {
      Validate.createBook(req);
      Validate.labelHashAndEthAddress(req);

      /** send base 64 content to enrico - for now using:
      * "labelHash": "aXBmcyB0ZXN0IGxhYmVs",
      * "pubKey": "02a1371a45a447ab79de0f9a7d4b91fdb9a37754d3a473fac7b452c14793737aa8"
      * for all uploads */
      let btoaContent = btoa(req.body.content);
      let bufferedContent = await new Promise((resolve, reject) => {
        superagent
          .post('http://localhost:5151/encrypt_message') // enrico node
          .send({ message: btoaContent }) // send base 64 content
          .end((err, response) => {
            if (err) {
              console.log('ERR', err);
              throw err;
            } else {
              // console.log('enrico response', JSON.parse(response.text).result);
              let data = JSON.parse(response.text).result;
              resolve(Buffer.from(JSON.stringify(data)));
              // data = { message_kit, signature }
            }
          });
      })
      // console.log('BUFFEREDCONTENT', bufferedContent);

        /* save to IPFS */
        let ipfsPath = await new Promise((resolve, reject) => {
          ipfs.add(bufferedContent, (err, ipfsRes) => {
            if (err) {
              console.error(err)
              throw err;
            } else {
              resolve(ipfsRes[0].path);
            }
          })
        })
        // console.log('IPFSPATH', ipfsPath);

        /* create book */
        let book = new Books({
          // accountId: ??
          ethAddress: req.body.ethAddress,
          ethPrice: req.body.ethPrice,
          ipfsPath,
          labelHash: req.body.labelHash,
          policyEncryptingPubkey: "02a1371a45a447ab79de0f9a7d4b91fdb9a37754d3a473fac7b452c14793737aa8",
          title: req.body.title,
        });
        await book.save();

        // test
        res.status(201).json({
          message: 'Book encrypted and uploaded to IPFS.',
          bookId: book._id,
          ipfsPath,
        });

      /* call fxn in contract */
      // web3.paidAccess.methods.addContent(ethAddress, ipfsPath, labelHash, price).call();

    } catch (err) {
      console.log('ERR', err);
      // TODO check if array and map over err array to generate message
      res.status(400).json({
        message: err.message ? err.message : err[0].msg,
      });
    }
  }

  getAll = async (req, res) => {
    try {
      const books = await Books.find({}).exec();
      let booksObject = JSON.parse(JSON.stringify(books));
      res.status(200).json(booksObject);
    } catch (err) {
      res.status(400).json({
        message: err.message ? err.message : err[0].msg,
      });
    }
  };

  getOne = async (req, res) => {
    try {
      Validate.id(req);
      const book = await Books.findById(req.params.id).exec();
      let bookObject = JSON.parse(JSON.stringify(book));
      // console.log('BOOKSOBJECT', booksObject);
      res.status(200).json(bookObject);
    } catch (err) {
      res.status(400).json({
        message: err.message ? err.message : err[0].msg,
      });
    }
  };

  derivePolicyPubkey = async (req, res) => {
    try {
      Validate.label(req);

      let labelHash = btoa(req.body.label);
      // if last character of label is a "/" Alice gives a 404 error
      if (labelHash.substr(-1) === '/') throw 'That label will not work. Try changing one character'
      // console.log('labelHash', labelHash);
      let data = {};
      /* send base 64 label to alice */
      superagent
        .post(`http://localhost:8151/derive_policy_pubkey/${labelHash}`)
        // .send({ label: req.body.label })
        .end((err, response) => {
          if (err) {
            console.log('ERR', err);
            // throw err;
            if (response.status === 404) {
              // throw "404 response from Alice."
              res.send(response.text);
            } else {
              throw err;
            };
          } else {
            console.log('alice response', JSON.parse(response.text).result);
            data = JSON.parse(response.text).result;
            // console.log(data.policy_encrypting_key);
            res.status(200).json({
              labelHash,
              pubKey: data.policy_encrypting_key // used to start enrico - later needed for each upload
            });
          }
        });
        // console.log("data", data);
    } catch (err) {
      console.log('ERR', err);
      res.status(400).json({
        message: err.message ? err.message : err,
      });
    }
  }

  ipfsGet = (req, res) => {
    try {
      let content;
      ipfs.get(req.body.path, (err, ipfsRes) => {
        if (err) {
          console.error(err)
        } else {
          console.log('ipfsRes', ipfsRes);
          console.log('CONTENT', ipfsRes[0].content.toString('utf8'));
          content = ipfsRes[0].content.toString('utf8');
          // test
          res.status(201).json({
            content
          });
        }
      })
    } catch (err) {
      console.log('ERR', err);
      res.status(400).json({
        message: err.message ? err.message : err,
      });
    }
  }

}
export default new BookCtrl();
