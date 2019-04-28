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
var Purchases = require('../models/purchase');
var ipfsClient = require('ipfs-http-client');

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

              // this.validateRequest(req);

              /* create purchase */
              purchase = new Purchases({
                address: req.body.address,
                label: req.body.label,
                txn: req.body.txn
              });
              _context.next = 4;
              return purchase.save();

            case 4:

              /* send response */
              res.status(201).json({
                message: 'Purchase saved.',
                purchaseId: purchase._id
              });
              _context.next = 10;
              break;

            case 7:
              _context.prev = 7;
              _context.t0 = _context['catch'](0);

              res.status(400).json({
                message: _context.t0.message ? _context.t0.message : _context.t0[0].msg
              });

            case 10:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this, [[0, 7]]);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }();

  this.getAll = function () {
    var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(req, res) {
      var purchases;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return Purchases.find({ address: req.params.address }).exec();

            case 3:
              purchases = _context2.sent;


              res.status(200).json(purchases); // filter on the front end
              _context2.next = 10;
              break;

            case 7:
              _context2.prev = 7;
              _context2.t0 = _context2['catch'](0);

              res.status(400).json({
                message: _context2.t0.message ? _context2.t0.message : _context2.t0[0].msg
              });

            case 10:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, _this, [[0, 7]]);
    }));

    return function (_x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  }();

  this.getKey = function () {
    var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(req, res) {
      var account, accountObject, purchase;
      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;

              // this.validate(req);

              /* check contract */
              // paidAccessContract.methods.hasPaid(ethAddress, label).call(
              (function (error, result) {
                if (error) {
                  throw error;
                } else {
                  console.log('RESULT', result);
                  req.body.hasPaid = result;
                }
              });
              // )

              if (!(req.body.hasPaid !== true)) {
                _context3.next = 4;
                break;
              }

              throw 'That content has not been paid for.';

            case 4:
              _context3.next = 6;
              return Accounts.find({ address: req.body.ethAddress }).exec();

            case 6:
              account = _context3.sent;

              /* convert from Mongoose object to JSON object */
              accountObject = JSON.parse(JSON.stringify(account));

              /* get key from Alice */

              superagent.put('localhost:8151/grant') // alice node
              .send({
                bob_encrypting_key: accountObject.encryptingKey,
                // signing_key: accountObject.signingKey,
                label: req.body.label,
                m: 10,
                n: 5,
                expiration_time: '' // '2019-02-19T12:56:26.976816'
              }).end(function (err, response) {
                if (err) {
                  throw err;
                } else {
                  console.log('ALICE RESPONSE', response);
                  req.body.key = result.alice_signing_pubkey;
                }
              });

              /* save key */
              purchase = Purchases.findOne({ address: req.body.ethAddress, label: req.body.label }).exec();

              purchase.update({ aliceSigningPubkey: req.body.key });

              res.status(200).json({ key: req.body.key });
              _context3.next = 17;
              break;

            case 14:
              _context3.prev = 14;
              _context3.t0 = _context3['catch'](0);

              res.status(400).json({
                message: _context3.t0.message ? _context3.t0.message : _context3.t0[0].msg
              });

            case 17:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, _this, [[0, 14]]);
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
                superagent.put('localhost:11151/join-policy') // bob node
                .send({
                  alice_signing_pubkey: req.body.key,
                  label: req.body.label
                }).end(function (err, response) {
                  if (err) {
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
      var data;
      return _regenerator2.default.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              try {
                data = {};
                /* get data from IPFS */

                ipfs.get(req.body.ipfsHash, function (err, ipfsData) {
                  if (err) {
                    console.error(err);
                  } else {
                    console.log('DATA', data);
                    data = JSON.parse(ipfsData[0].content);
                  }
                });

                /* send request to Bob */
                superagent.post('localhost:11151/retrieve') // bob node
                .send({
                  label: req.body.label,
                  alice_signing_pubkey: req.body.signingKey,
                  policy_encrypting_pubkey: req.body.pubKey,
                  datasource_signing_pubkey: data.signature, // signature
                  message_kit: data.message_kit
                }).end(function (err, response) {
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
                  message: err.message ? err.message : err[0].msg
                });
              }

            case 1:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, _this);
    }));

    return function (_x9, _x10) {
      return _ref5.apply(this, arguments);
    };
  }();
}

// this really is what the contract is for
;

exports.default = new PurchaseCtrl();