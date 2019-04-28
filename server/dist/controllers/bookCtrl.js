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
var Books = require('../models/book');
var ipfsClient = require('ipfs-http-client');

var ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });

var BookCtrl = function BookCtrl() {
  var _this = this;

  (0, _classCallCheck3.default)(this, BookCtrl);

  this.create = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(req, res) {
      var data, book;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;

              // this.validateRequest(req);
              data = {};

              /* send buffered content to enrico */
              // TODO somewhere it needs policy_encrypting_pubkey

              superagent.post('localhost:5151/encrypt_message') // enrico node
              .send({ message: req.body.content }) // send buffered content
              // .set('X-API-Key', 'foobar')
              // .set('accept', 'json')
              .end(function (err, response) {
                if (err) {
                  throw err;
                } else {
                  console.log('enrico response', response);
                  data = response.result;
                }
              });

              /* save to IPFS */
              ipfs.add(data, {}, function () {
                var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(err, ipfsHash) {
                  return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          if (err) {
                            console.error(err);
                          } else {
                            console.log('IPFSHASH', ipfsHash);
                            req.body.ipfsHash = ipfsHash;
                          }

                        case 1:
                        case 'end':
                          return _context.stop();
                      }
                    }
                  }, _callee, _this);
                }));

                return function (_x3, _x4) {
                  return _ref2.apply(this, arguments);
                };
              }());

              /* create book */
              book = new Books({
                address: req.body.address,
                label: req.body.label,
                ipfsHash: req.body.ipfsHash,
                ethPrice: req.body.ethPrice,
                title: req.body.title
              });
              _context2.next = 7;
              return book.save();

            case 7:

              /* call fxn in contract */
              // web3.paidAccess.methods.addContent().call();

              /* send response */
              res.status(201).json({
                message: 'Book uploaded.',
                bookId: book._id,
                ipfsHash: book.ipfsHash
              });
              _context2.next = 13;
              break;

            case 10:
              _context2.prev = 10;
              _context2.t0 = _context2['catch'](0);

              res.status(400).json({
                message: _context2.t0.message ? _context2.t0.message : _context2.t0[0].msg
              });

            case 13:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, _this, [[0, 10]]);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }();

  this.getAll = function () {
    var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(req, res) {
      var books;
      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _context3.next = 3;
              return Books.find({}).exec();

            case 3:
              books = _context3.sent;

              res.status(200).json(books);
              _context3.next = 10;
              break;

            case 7:
              _context3.prev = 7;
              _context3.t0 = _context3['catch'](0);

              res.status(400).json({
                message: _context3.t0.message ? _context3.t0.message : _context3.t0[0].msg
              });

            case 10:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, _this, [[0, 7]]);
    }));

    return function (_x5, _x6) {
      return _ref3.apply(this, arguments);
    };
  }();

  this.makePubkey = function () {
    var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(req, res) {
      var data;
      return _regenerator2.default.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              try {
                data = {};

                /* send base 64 label to alice */

                superagent.put('localhost:8151/derive_policy_pubkey').send({ label: req.body.label }).end(function (err, response) {
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
};

exports.default = new BookCtrl();