'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var superagent = require('superagent');
var Web3 = require('web3');
var moment = require('moment');
var Accounts = require('../models/account');
var Books = require('../models/book');
var Purchases = require('../models/purchase');
var ipfsClient = require('ipfs-http-client');
var Validate = require('../validate').default;

var ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });
var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:9545'));
// const paidAccessContract = web3.eth.Contract(abi, address);

var PurchaseCtrl = function PurchaseCtrl() {
  var _this = this;

  (0, _classCallCheck3.default)(this, PurchaseCtrl);

  this.create = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res) {
      var purchase;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;

              Validate.purchase(req);
              Validate.labelHashAndEthAddress(req);

              /* create purchase */
              purchase = new Purchases({
                bookId: req.body.bookId,
                ethAddress: req.body.ethAddress,
                labelHash: req.body.labelHash,
                txn: req.body.txn
              });
              _context.next = 6;
              return purchase.save();

            case 6:

              /* send response */
              res.status(201).json({
                message: 'Purchase saved.',
                purchaseId: purchase._id
              });
              _context.next = 12;
              break;

            case 9:
              _context.prev = 9;
              _context.t0 = _context['catch'](0);

              res.status(400).json({
                message: _context.t0.message ? _context.t0.message : _context.t0[0].msg
              });

            case 12:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this, [[0, 9]]);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }();

  this.getAll = function () {
    var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(req, res) {
      var purchases, purchasesObject;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;

              Validate.ethAddressParam(req);

              _context2.next = 4;
              return Purchases.find({ ethAddress: req.params.ethAddress }).exec();

            case 4:
              purchases = _context2.sent;
              purchasesObject = JSON.parse(JSON.stringify(purchases));


              res.status(200).json(purchasesObject); // filter on the front end
              _context2.next = 12;
              break;

            case 9:
              _context2.prev = 9;
              _context2.t0 = _context2['catch'](0);

              res.status(400).json({
                message: _context2.t0.message ? _context2.t0.message : _context2.t0[0].msg
              });

            case 12:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, _this, [[0, 9]]);
    }));

    return function (_x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  }();

  this.getDecryptionKey = function () {
    var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(req, res) {
      var hasPaid, account, accountObject, expDate, result;
      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;

              Validate.labelHashAndEthAddress(req);
              Validate.purchaseId(req);

              hasPaid = true; // true for testing / skip contract check

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

              if (!(hasPaid !== true)) {
                _context3.next = 6;
                break;
              }

              throw 'That content has not been paid for.';

            case 6:
              _context3.next = 8;
              return Accounts.findOne({ ethAddress: req.body.ethAddress }).exec();

            case 8:
              account = _context3.sent;

              /* convert from Mongoose object to JSON object */
              accountObject = JSON.parse(JSON.stringify(account));
              // console.log('ACCOUNTOBJECT', accountObject);

              /* get purchase */
              // let purchase = await Purchases.findById(req.body.purchaseId).exec();
              // let purchaseObject = JSON.parse(JSON.stringify(purchase));
              // console.log('purchaseOBJECT', purchaseObject);
              // if (purchaseObject === null) throw "No purchase found with that id."

              expDate = moment().add(1, 'months').utc().format();

              console.log('EXPDATE', expDate);

              // console.log('ACCOUNTOBJECT.ENCRYPTINGKEY', accountObject.encryptingKey);
              /* get key from Alice */
              _context3.next = 14;
              return new Promise(function (resolve) {
                superagent.put('http://localhost:8151/grant') // alice node
                .send({
                  bob_encrypting_key: accountObject.encryptingKey,
                  bob_signing_key: accountObject.signingKey,
                  label: req.body.labelHash,
                  m: 1,
                  n: 1,
                  // expiration_time: expDate, // '2019-05-28T19:37:37Z' this doesn't work!
                  expiration_time: '2019-05-19T12:56:26.976816'
                }).end(function (err, response) {
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

            case 14:
              result = _context3.sent;

              console.log('RESULT', result.alice_signing_key);

              /* update with key */
              _context3.next = 18;
              return Purchases.updateOne({ _id: req.body.purchaseId }, {
                aliceSigningPubkey: result.alice_signing_key,
                policyEncryptingPubkey: result.policy_encrypting_key
              });

            case 18:

              res.status(200).json({
                aliceSigningPubkey: result.alice_signing_key,
                policyEncryptingPubkey: result.policy_encrypting_key
              });
              _context3.next = 24;
              break;

            case 21:
              _context3.prev = 21;
              _context3.t0 = _context3['catch'](0);

              res.status(400).json({
                message: _context3.t0.message ? _context3.t0.message : _context3.t0
              });

            case 24:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, _this, [[0, 21]]);
    }));

    return function (_x5, _x6) {
      return _ref3.apply(this, arguments);
    };
  }();

  this.joinPolicy = function () {
    var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(req, res) {
      return _regenerator2.default.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              try {
                /* send request to Bob */
                superagent.post('http://localhost:11151/join-policy') // bob node
                .send({
                  alice_signing_pubkey: req.body.aliceSigningPubkey,
                  label: req.body.labelHash
                }).end(function (err, response) {
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
                  message: err.message ? err.message : err[0].msg
                });
              }

            case 1:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, _this);
    }));

    return function (_x7, _x8) {
      return _ref4.apply(this, arguments);
    };
  }();

  this.download = function () {
    var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(req, res) {
      var book, bookObject, encryptedContent;
      return _regenerator2.default.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;

              /* look up bookId and aliceSigningPubkey from purchaseId */
              // Validate.purchaseId(req);

              /* or expect in req.body */
              Validate.download(req);

              /* look up ipfsPath, labelHash, and pubKey from bookId */
              _context5.next = 4;
              return Books.findById(req.body.bookId).exec();

            case 4:
              book = _context5.sent;
              bookObject = JSON.parse(JSON.stringify(book));
              // console.log('bookObject', bookObject);

              /* get data from IPFS */

              _context5.next = 8;
              return new Promise(function (resolve) {
                ipfs.get(bookObject.ipfsPath, function (err, ipfsData) {
                  if (err) {
                    console.error(err);
                    throw err;
                  } else {
                    resolve(JSON.parse(ipfsData[0].content.toString())); // content.type === 'Buffer'
                  }
                });
              });

            case 8:
              encryptedContent = _context5.sent;


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
              _context5.next = 15;
              break;

            case 12:
              _context5.prev = 12;
              _context5.t0 = _context5['catch'](0);

              res.status(400).json({
                message: _context5.t0.message ? _context5.t0.message : _context5.t0[0].msg
              });

            case 15:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, _this, [[0, 12]]);
    }));

    return function (_x9, _x10) {
      return _ref5.apply(this, arguments);
    };
  }();
}

// this really is what the contract is for
;

exports.default = new PurchaseCtrl();