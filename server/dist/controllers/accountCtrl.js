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
var Accounts = require('../models/account.js');
var Validate = require('../validate').default;

var AccountCtrl = function AccountCtrl() {
  var _this = this;

  (0, _classCallCheck3.default)(this, AccountCtrl);

  this.create = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res) {
      var result, account;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;

              /* validate ethAddress */
              console.log(req.body);
              Validate.ethAddressBody(req);

              /* get keys */
              _context.next = 5;
              return new Promise(function (resolve) {
                superagent.get('http://localhost:11151/public_keys') // bob node
                .end(function (err, response) {
                  if (err) {
                    throw err;
                  } else {
                    console.log('BOB RESPONSE', JSON.parse(response.text).result); // .json()
                    resolve(JSON.parse(response.text).result);
                  }
                });
              });

            case 5:
              result = _context.sent;


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
              account = new Accounts({
                ethAddress: req.body.ethAddress,
                signingKey: result.bob_signing_key,
                encryptingKey: result.bob_encrypting_key
              });
              _context.next = 9;
              return account.save();

            case 9:

              /* send response */
              res.status(201).json({
                message: 'Account created.',
                accountId: account._id,
                signingKey: result.bob_signing_key,
                encryptingKey: result.bob_encrypting_key
              });
              _context.next = 15;
              break;

            case 12:
              _context.prev = 12;
              _context.t0 = _context['catch'](0);

              res.status(400).json({
                message: _context.t0.message ? _context.t0.message : _context.t0[0].msg
              });

            case 15:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this, [[0, 12]]);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }();

  this.get = function () {
    var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(req, res) {
      var account, accountObject;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;

              Validate.ethAddressParam(req);
              _context2.next = 4;
              return Accounts.findOne({ ethAddress: req.params.ethAddress }).exec();

            case 4:
              account = _context2.sent;

              if (!(account === null)) {
                _context2.next = 7;
                break;
              }

              return _context2.abrupt('return', res.status(404).json({ message: "This account doesn't exist yet" }));

            case 7:
              accountObject = JSON.parse(JSON.stringify(account));

              console.log('ACCOUNTOBJECT', accountObject);

              res.status(200).json(accountObject);
              _context2.next = 15;
              break;

            case 12:
              _context2.prev = 12;
              _context2.t0 = _context2['catch'](0);

              res.status(400).json(_context2.t0);

            case 15:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, _this, [[0, 12]]);
    }));

    return function (_x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  }();

  this.delete = function () {
    var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(req, res) {
      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;

              Validate.ethAddressBody(req);
              _context3.next = 4;
              return Accounts.deleteOne({ ethAddress: req.body.ethAddress }).exec();

            case 4:

              res.status(200).json({ message: 'Account successfully deleted.' });
              _context3.next = 10;
              break;

            case 7:
              _context3.prev = 7;
              _context3.t0 = _context3['catch'](0);

              res.status(400).json(_context3.t0);

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
};

exports.default = new AccountCtrl();