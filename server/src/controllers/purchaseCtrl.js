const superagent = require('superagent');
const Web3 = require('web3');
const moment = require('moment');
const Accounts = require('../models/account.js');
const Purchases = require('../models/purchase');
const ipfsClient = require('ipfs-http-client')
const Validate = require('../validate').default;

const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:9545'));
// const paidAccessContract = web3.eth.Contract(abi, address);

class PurchaseCtrl {

  // this really is what the contract is for
  create = async (req, res) => {
    try {
      Validate.purchase(req);
      Validate.labelHashAndEthAddress(req);

      /* create purchase */
      let purchase = new Purchases({
        bookId: req.body.bookId,
        ethAddress: req.body.ethAddress,
        labelHash: req.body.labelHash,
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
      Validate.ethAddressParam(req);

      let purchases = await Purchases.find({ ethAddress: req.params.ethAddress }).exec();
      let purchasesObject = JSON.parse(JSON.stringify(purchases));

      res.status(200).json(purchasesObject); // filter on the front end
    } catch (err) {
      res.status(400).json({
        message: err.message ? err.message : err[0].msg,
      });
    }
  };

  getDecryptionKey = async (req, res) => {
    try {
      Validate.labelHashAndEthAddress(req);
      Validate.purchaseId(req);

      let hasPaid = true;

      /* check contract */
      // paidAccessContract.methods.hasPaid(ethAddress, label).call(
        // (error, result) => {
        //   if (error) {
        //     throw error;
        //   } else {
        //     console.log('RESULT', result);
        //     hasPaid = result;
        //   }
        // }
      // )

      if (hasPaid !== true) throw 'That content has not been paid for.'

      /* check DB for account (bob) keys */
      let account = await Accounts.findOne({ ethAddress: req.body.ethAddress }).exec();
      /* convert from Mongoose object to JSON object */
      let accountObject = JSON.parse(JSON.stringify(account));
      // console.log('ACCOUNTOBJECT', accountObject);

      /* get purchase */
      let purchase = await Purchases.findById(req.body.purchaseId).exec();
      let purchaseObject = JSON.parse(JSON.stringify(purchase));
      // console.log('purchaseOBJECT', purchaseObject);

      let expDate = moment().add(1, 'months').utc().format();
      // console.log('EXPDATE', expDate);

      // console.log('ACCOUNTOBJECT.ENCRYPTINGKEY', accountObject.encryptingKey);
      /* get key from Alice */
      superagent
        .put('http://localhost:8151/grant') // alice node
        .send(JSON.stringify({
          bob_encrypting_key: accountObject.encryptingKey,
          bob_signing_key: accountObject.signingKey,
          label: req.body.labelHash,
          m: 5,
          n: 10,
          expiration_time: expDate,
        }))
        .end((err, response) => {
          if (err) {
            console.log('RESPONSE', response);
            throw err;
          } else {
            console.log('ALICE RESPONSE', response);
            req.body.key = result.alice_signing_pubkey;
          }
        });

      /* save key */
      // await purchase.update({ aliceSigningPubkey: req.body.key });

      res.status(200).json({ key: "req.body.key" });
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
