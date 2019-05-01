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
var ipfsClient = require('ipfs-http-client');
var btoa = require('btoa');
var Books = require('../models/book');
var Validate = require('../validate').default;

var ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });

var BookCtrl = function BookCtrl() {
  var _this = this;

  (0, _classCallCheck3.default)(this, BookCtrl);

  this.create = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res) {
      var btoaContent, bufferedContent, ipfsPath, book;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;

              Validate.createBook(req);
              Validate.labelHashAndEthAddress(req);

              /** send base 64 content to enrico - for now using:
              * "labelHash": "aXBmcyB0ZXN0IGxhYmVs",
              * "pubKey": "02a1371a45a447ab79de0f9a7d4b91fdb9a37754d3a473fac7b452c14793737aa8"
              * for all uploads */
              btoaContent = btoa(req.body.content);
              _context.next = 6;
              return new Promise(function (resolve, reject) {
                superagent.post('http://localhost:5151/encrypt_message') // enrico node
                .send({ message: btoaContent }) // send base 64 content
                .end(function (err, response) {
                  if (err) {
                    console.log('ERR', err);
                    throw err;
                  } else {
                    // console.log('enrico response', JSON.parse(response.text).result);
                    var data = JSON.parse(response.text).result;
                    resolve(Buffer.from(JSON.stringify(data)));
                    // data = { message_kit, signature }
                  }
                });
              });

            case 6:
              bufferedContent = _context.sent;
              _context.next = 9;
              return new Promise(function (resolve, reject) {
                ipfs.add(bufferedContent, function (err, ipfsRes) {
                  if (err) {
                    console.error(err);
                    throw err;
                  } else {
                    resolve(ipfsRes[0].path);
                  }
                });
              });

            case 9:
              ipfsPath = _context.sent;

              // console.log('IPFSPATH', ipfsPath);

              /* create book */
              book = new Books({
                // accountId: ??
                ethAddress: req.body.ethAddress,
                ethPrice: req.body.ethPrice,
                ipfsPath: ipfsPath,
                labelHash: req.body.labelHash,
                policyEncryptingPubkey: "02a1371a45a447ab79de0f9a7d4b91fdb9a37754d3a473fac7b452c14793737aa8",
                title: req.body.title
              });
              _context.next = 13;
              return book.save();

            case 13:

              // test
              res.status(201).json({
                message: 'Book encrypted and uploaded to IPFS.',
                bookId: book._id,
                ipfsPath: ipfsPath
              });

              /* call fxn in contract */
              // web3.paidAccess.methods.addContent(ethAddress, ipfsPath, labelHash, price).call();

              _context.next = 20;
              break;

            case 16:
              _context.prev = 16;
              _context.t0 = _context['catch'](0);

              console.log('ERR', _context.t0);
              // TODO check if array and map over err array to generate message
              res.status(400).json({
                message: _context.t0.message ? _context.t0.message : _context.t0[0].msg
              });

            case 20:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this, [[0, 16]]);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }();

  this.getAll = function () {
    var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(req, res) {
      var books, booksObject;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return Books.find({}).exec();

            case 3:
              books = _context2.sent;
              booksObject = JSON.parse(JSON.stringify(books));

              res.status(200).json(booksObject);
              _context2.next = 11;
              break;

            case 8:
              _context2.prev = 8;
              _context2.t0 = _context2['catch'](0);

              res.status(400).json({
                message: _context2.t0.message ? _context2.t0.message : _context2.t0[0].msg
              });

            case 11:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, _this, [[0, 8]]);
    }));

    return function (_x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  }();

  this.getAllByUser = function () {
    var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(req, res) {
      var books, booksObject;
      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;

              Validate.ethAddressParam(req);

              _context3.next = 4;
              return Books.find({ ethAddress: req.params.ethAddress }).exec();

            case 4:
              books = _context3.sent;
              booksObject = JSON.parse(JSON.stringify(books));

              res.status(200).json(booksObject);
              _context3.next = 12;
              break;

            case 9:
              _context3.prev = 9;
              _context3.t0 = _context3['catch'](0);

              res.status(400).json({
                message: _context3.t0.message ? _context3.t0.message : _context3.t0[0].msg
              });

            case 12:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, _this, [[0, 9]]);
    }));

    return function (_x5, _x6) {
      return _ref3.apply(this, arguments);
    };
  }();

  this.getOne = function () {
    var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(req, res) {
      var book, bookObject;
      return _regenerator2.default.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;

              Validate.id(req);
              _context4.next = 4;
              return Books.findById(req.params.id).exec();

            case 4:
              book = _context4.sent;
              bookObject = JSON.parse(JSON.stringify(book));
              // console.log('BOOKSOBJECT', booksObject);

              res.status(200).json(bookObject);
              _context4.next = 12;
              break;

            case 9:
              _context4.prev = 9;
              _context4.t0 = _context4['catch'](0);

              res.status(400).json({
                message: _context4.t0.message ? _context4.t0.message : _context4.t0[0].msg
              });

            case 12:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, _this, [[0, 9]]);
    }));

    return function (_x7, _x8) {
      return _ref4.apply(this, arguments);
    };
  }();

  this.derivePolicyPubkey = function () {
    var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(req, res) {
      var labelHash, data;
      return _regenerator2.default.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;

              Validate.label(req);

              labelHash = btoa(req.body.label);
              // if last character of label is a "/" Alice gives a 404 error

              if (!(labelHash.substr(-1) === '/')) {
                _context5.next = 5;
                break;
              }

              throw 'That label will not work. Try changing one character';

            case 5:
              // console.log('labelHash', labelHash);
              data = {};
              /* send base 64 label to alice */

              superagent.post('http://localhost:8151/derive_policy_pubkey/' + labelHash)
              // .send({ label: req.body.label })
              .end(function (err, response) {
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
                    labelHash: labelHash,
                    pubKey: data.policy_encrypting_key // used to start enrico - later needed for each upload
                  });
                }
              });
              // console.log("data", data);
              _context5.next = 13;
              break;

            case 9:
              _context5.prev = 9;
              _context5.t0 = _context5['catch'](0);

              console.log('ERR', _context5.t0);
              res.status(400).json({
                message: _context5.t0.message ? _context5.t0.message : _context5.t0
              });

            case 13:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, _this, [[0, 9]]);
    }));

    return function (_x9, _x10) {
      return _ref5.apply(this, arguments);
    };
  }();

  this.ipfsGet = function (req, res) {
    try {
      var content = void 0;
      ipfs.get(req.body.path, function (err, ipfsRes) {
        if (err) {
          console.error(err);
        } else {
          console.log('ipfsRes', ipfsRes);
          console.log('CONTENT', ipfsRes[0].content.toString('utf8'));
          content = ipfsRes[0].content.toString('utf8');
          // test
          res.status(201).json({
            content: content
          });
        }
      });
    } catch (err) {
      console.log('ERR', err);
      res.status(400).json({
        message: err.message ? err.message : err
      });
    }
  };
}

/** UPLOAD new book, encrypt, store on ipfs, save in db
* @body title, content, ethPrice, labelHash, ethAddress, pubKey
* @return bookId, ipfsHash
*/
;

exports.default = new BookCtrl();