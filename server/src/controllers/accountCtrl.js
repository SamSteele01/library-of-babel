const Accounts = require('../models/account.js');

class AccountCtrl {

  create = async (req, res) => {
    try {
      // /* check if merchantName and username are unique */
      // this.validateRequest(req);
      // await this.validateUnique(req);
      // Users.validateRequest(req);
      // await Users.validateUnique(req);

      /* get keys */
      superagent
        .get('localhost:11151/public_keys') // bob node
        .end((err, response) => {
          if (err) {
            throw err;
          } else {
            console.log('BOB RESPONSE', response); // .json()

          }
        });

      /* create account */
      let account = new Accounts({
        address: req.body.address,
      });
      await account.save();

      /* send response */
      res.status(201).json({
        message: 'Account created.',
        // accountId: account._id,
      });
    } catch (err) {
      res.status(400).json({
        message: err.message ? err.message : err[0].msg,
      });
    }
  }

  get = async (req, res) => {
    console.log('REQ.PARAMS.ID', req.params.ethAddress);
    try {
      let account = await Accounts.findOne({ address: req.params.ethAddress }).exec();
      if (account === null) {
        return res.status(404).json({ message: "This account doesn't exist yet" });
      }
      res.status(200).json(account);
    } catch (err) {
      res.status(400).json(err);
    }
  };

}
export default new AccountCtrl();
