const superagent = require('superagent');
const Accounts = require('../models/account.js');
const Validate = require('../validate').default;

class AccountCtrl {

  create = async (req, res) => {
    try {
      /* validate ethAddress */
      console.log(req.body);
      Validate.ethAddressBody(req);

      /* get keys */
      let result = await new Promise(resolve => {
        superagent
        .get('http://localhost:11151/public_keys') // bob node
        .end((err, response) => {
          if (err) {
            throw err;
          } else {
            console.log('BOB RESPONSE', JSON.parse(response.text).result); // .json()
            resolve(JSON.parse(response.text).result);
          }
        });
      })

      // (async () => {
      //   try {
      //     const res = await superagent.get('http://localhost:11151/public_keys');
      //     console.log(res);
      //     console.log('BOB RESPONSE', JSON.parse(res.text).result); // .json()
      //     let result = JSON.parse(res.text).result;
      //   } catch (err) {
      //     console.error(err);
      //     throw err;
      //   }
      // })();

      /* create account */
      let account = new Accounts({
        ethAddress: req.body.ethAddress,
        signingKey: result.bob_signing_key,
        encryptingKey: result.bob_encrypting_key
      });
      await account.save();

      /* send response */
      res.status(201).json({
        message: 'Account created.',
        accountId: account._id,
        signingKey: result.bob_signing_key,
        encryptingKey: result.bob_encrypting_key
      });
    } catch (err) {
      res.status(400).json({
        message: err.message ? err.message : err[0].msg,
      });
    }
  }

  get = async (req, res) => {
    try {
      Validate.ethAddressParam(req);
      let account = await Accounts.findOne({ ethAddress: req.params.ethAddress }).exec();
      // let account = await Accounts.find({}).exec();
      // console.log('ACCOUNT', account);
      if (account === null) {
        return res.status(404).json({ message: "This account doesn't exist yet" });
      }
      let accountObject = JSON.parse(JSON.stringify(account));
      console.log('ACCOUNTOBJECT', accountObject);

      res.status(200).json(accountObject);
    } catch (err) {
      res.status(400).json(err);
    }
  };

  delete = async (req, res) => {
    try {
      Validate.ethAddressBody(req);
      await Accounts.deleteOne({ ethAddress: req.body.ethAddress }).exec();

      res.status(200).json({ message: 'Account successfully deleted.' });
    } catch (err) {
      res.status(400).json(err);
    }
  };

}
export default new AccountCtrl();
