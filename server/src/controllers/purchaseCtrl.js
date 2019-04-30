const superagent = require('superagent');
const Web3 = require('web3');
const moment = require('moment');
const Accounts = require('../models/account');
const Books = require('../models/book');
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
    /* a.k.a. aliceSigningPubkey or alice_signing_pubkey */
    try {
      Validate.labelHashAndEthAddress(req);
      Validate.purchaseId(req);

      let hasPaid = true; // true for testing / skip contract check

      /* check contract */
      // hasPaid = await new Promise(resolve => {
      //   paidAccessContract.methods.hasPaid(ethAddress, label).call(
      //     (error, result) => {
      //       if (error) {
      //         throw error;
      //       } else {
      //         console.log('RESULT', result);
      //         resolve(result);
      //       }
      //     }
      //   )
      // });

      if (hasPaid !== true) throw 'That content has not been paid for.'

      /* check DB for account (bob) keys */
      let account = await Accounts.findOne({ ethAddress: req.body.ethAddress }).exec();
      /* convert from Mongoose object to JSON object */
      let accountObject = JSON.parse(JSON.stringify(account));
      // console.log('ACCOUNTOBJECT', accountObject);

      /* get purchase */
      // let purchase = await Purchases.findById(req.body.purchaseId).exec();
      // let purchaseObject = JSON.parse(JSON.stringify(purchase));
      // console.log('purchaseOBJECT', purchaseObject);
      // if (purchaseObject === null) throw "No purchase found with that id."

      let expDate = moment().add(1, 'months').utc().format();
      console.log('EXPDATE', expDate);

      // console.log('ACCOUNTOBJECT.ENCRYPTINGKEY', accountObject.encryptingKey);
      /* get key from Alice */
      let result = await new Promise(resolve => {
        superagent
          .put('http://localhost:8151/grant') // alice node
          .send({
            bob_encrypting_key: accountObject.encryptingKey,
            bob_signing_key: accountObject.signingKey,
            label: req.body.labelHash,
            m: 1,
            n: 1,
            // expiration_time: expDate, // '2019-05-28T19:37:37Z' this doesn't work!
            expiration_time: '2019-05-19T12:56:26.976816',
          })
          .end((err, response) => {
            if (err) {
              console.log('RESPONSE', response.text);
              throw err;
            } else {
              console.log('ALICE RESPONSE', JSON.parse(response.text).result);
              resolve(JSON.parse(response.text).result);
              // returns treasure_map, policy_encrypting_pubkey, alice_signing_pubkey
            }
          });
      });
      console.log('RESULT', result.alice_signing_key);

      /* update with key */
      await Purchases.updateOne({ _id: req.body.purchaseId}, {
        aliceSigningPubkey: result.alice_signing_key,
        policyEncryptingPubkey: result.policy_encrypting_key,
      });

      res.status(200).json({
        aliceSigningPubkey: result.alice_signing_key,
        policyEncryptingPubkey: result.policy_encrypting_key,
      });
    } catch (err) {
      res.status(400).json({
        message: err.message ? err.message : err,
      });
    }
  };

  joinPolicy = async (req, res) => {
    try {
      /* send request to Bob */
      superagent
        .post('http://localhost:11151/join-policy') // bob node
        .send({
          alice_signing_pubkey: req.body.aliceSigningPubkey,
          label: req.body.labelHash,
        })
        .end((err, response) => {
          if (err) {
            console.log('ERR', err);
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
      /* look up bookId and aliceSigningPubkey from purchaseId */
      // Validate.purchaseId(req);

      /* or expect in req.body */
      Validate.download(req);

      /* look up ipfsPath, labelHash, and pubKey from bookId */
      let book = await Books.findById(req.body.bookId).exec();
      let bookObject = JSON.parse(JSON.stringify(book));
      // console.log('bookObject', bookObject);

      /* get data from IPFS */
      let encryptedContent = await new Promise(resolve => {
        ipfs.get(bookObject.ipfsPath, (err, ipfsData) => {
          if (err) {
            console.error(err);
            throw err;
          } else {
            resolve(JSON.parse(ipfsData[0].content.toString())); // content.type === 'Buffer'
          }
        })
      })

      /* send request to Bob */

      /**
      * this isn't working due to an issue with NuCypher :(
      */

      // let decryptedContent = await new Promise(resolve => {
      //   superagent
      //     .post('http://localhost:11151/retrieve')
      //     .send({
      //       label: bookObject.labelHash,
      //       alice_signing_pubkey: req.body.aliceSigningPubkey,
      //       policy_encrypting_pubkey: bookObject.policyEncryptingPubkey,
      //       datasource_signing_pubkey: encryptedContent.signature, // not needed?
      //       message_kit: encryptedContent.message_kit
      //     })
      //     .end((err, response) => {
      //       if (err) {
      //         console.log('ERR', err);
      //         console.log('BOB RESPONSE', response);
      //         throw err; // crashes server with 500 error
      //       } else {
      //         console.log('BOB RESPONSE', response);
      //         // JSON.parse(Buffer.from(bobRes.result.plaintext[0], 'base64').toString('utf-8'))
      //
      //       }
      //     });
      // })
      // console.log('DECRYPTEDCONTENT', decryptedContent);

      res.status(200).json({
        contents: encryptedContent.message_kit
      });
    } catch (err) {
      res.status(400).json({
        message: err.message ? err.message : err[0].msg,
      });
    }
  }

}
export default new PurchaseCtrl();
