const superagent = require('superagent');
const Web3 = require('web3');
const Purchases = require('../models/purchase');
const ipfsClient = require('ipfs-http-client')


const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:9545'));
// const paidAccessContract = web3.eth.Contract(abi, address);

class PurchaseCtrl {

  // this really is what the contract is for
  create = async (req, res) => {
    try {
      // this.validateRequest(req);

      /* create purchase */
      let purchase = new Purchases({
        address: req.body.address,
        label: req.body.label,
        txn: req.body.txn,
      });
      await purchase.save();

      /* send response */
      res.status(201).json({
        message: 'Purchase saved.',
        purchaseId: purchase._id,
      });
    } catch (err) {
      res.status(400).json({
        message: err.message ? err.message : err[0].msg,
      });
    }
  }

  getAll = async (req, res) => {
    try {
      // Api.validate(req);
      let purchases = await Purchases.find({ address: req.params.address }).exec();

      res.status(200).json(purchases); // filter on the front end
    } catch (err) {
      res.status(400).json({
        message: err.message ? err.message : err[0].msg,
      });
    }
  };

  getKey = async (req, res) => {
    try {
      // this.validate(req);

      /* check contract */
      // paidAccessContract.methods.hasPaid(ethAddress, label).call(
        (error, result) => {
          if (error) {
            throw error;
          } else {
            console.log('RESULT', result);
            req.body.hasPaid = result;
          }
        }
      // )

      if (req.body.hasPaid !== true) throw 'That content has not been paid for.'

      /* check DB for account keys */
      let account = await Accounts.find({ address: req.body.ethAddress }).exec();
      /* convert from Mongoose object to JSON object */
      let accountObject = JSON.parse(JSON.stringify(account));

      /* get key from Alice */
      superagent
        .put('localhost:8151/grant') // alice node
        .send({
          bob_encrypting_key: accountObject.encryptingKey,
          // signing_key: accountObject.signingKey,
          label: req.body.label,
          m: 10,
          n: 5,
          expiration_time: '' // '2019-02-19T12:56:26.976816'
        })
        .end((err, response) => {
          if (err) {
            throw err;
          } else {
            console.log('ALICE RESPONSE', response);
            req.body.key = result.alice_signing_pubkey;
          }
        });

      /* save key */
      let purchase = Purchases.findOne({ address: req.body.ethAddress, label: req.body.label }).exec();
      purchase.update({ aliceSigningPubkey: req.body.key });

      res.status(200).json({ key: req.body.key });
    } catch (err) {
      res.status(400).json({
        message: err.message ? err.message : err[0].msg,
      });
    }
  };

  joinPolicy = async (req, res) => {
    try {

      /* send request to Bob */
      superagent
        .put('localhost:11151/join-policy') // bob node
        .send({
          alice_signing_pubkey: req.body.key,
          label: req.body.label,
        })
        .end((err, response) => {
          if (err) {
            throw err;
          } else {
            console.log('BOB RESPONSE', response);

          }
        });

      res.status(200).json(response);
    } catch (err) {
      res.status(400).json({
        message: err.message ? err.message : err[0].msg,
      });
    }
  }

  download = async (req, res) => {
    try {
      let data = {};
      /* get data from IPFS */
      ipfs.get(req.body.ipfsHash, (err, ipfsData) => {
        if (err) {
          console.error(err);
        } else {
          console.log('DATA', data);
          data = JSON.parse(ipfsData[0].content);
        }
      })

      /* send request to Bob */
      superagent
        .post('localhost:11151/retrieve') // bob node
        .send({
          label: req.body.label,
          alice_signing_pubkey: req.body.signingKey,
          policy_encrypting_pubkey: req.body.pubKey,
          datasource_signing_pubkey: data.signature, // signature
          message_kit: data.message_kit
        })
        .end((err, response) => {
          if (err) {
            throw err;
          } else {
            console.log('BOB RESPONSE', response);
            // JSON.parse(Buffer.from(bobRes.result.plaintext[0], 'base64').toString('utf-8'))

          }
        });

      res.status(200).json(response);
    } catch (err) {
      res.status(400).json({
        message: err.message ? err.message : err[0].msg,
      });
    }
  }

}
export default new PurchaseCtrl();
