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

var Accounts = require('../models/account.js');

var AccountCtrl = function AccountCtrl() {
  var _this = this;

  (0, _classCallCheck3.default)(this, AccountCtrl);

  this.create = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res) {
      var account;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;

              // /* check if merchantName and username are unique */
              // this.validateRequest(req);
              // await this.validateUnique(req);
              // Users.validateRequest(req);
              // await Users.validateUnique(req);

              /* get keys */
              superagent.get('localhost:11151/public_keys') // bob node
              .end(function (err, response) {
                if (err) {
                  throw err;
                } else {
                  console.log('BOB RESPONSE', response); // .json()
                }
              });

              /* create account */
              account = new Accounts({
                address: req.body.address
              });
              _context.next = 5;
              return account.save();

            case 5:

              /* send response */
              res.status(201).json({
                message: 'Account created.'
                // accountId: account._id,
              });
              _context.next = 11;
              break;

            case 8:
              _context.prev = 8;
              _context.t0 = _context['catch'](0);

              res.status(400).json({
                message: _context.t0.message ? _context.t0.message : _context.t0[0].msg
              });

            case 11:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this, [[0, 8]]);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }();

  this.get = function () {
    var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(req, res) {
      var account;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              console.log('REQ.PARAMS.ID', req.params.ethAddress);
              _context2.prev = 1;
              _context2.next = 4;
              return Accounts.findOne({ address: req.params.ethAddress }).exec();

            case 4:
              account = _context2.sent;

              if (!(account === null)) {
                _context2.next = 7;
                break;
              }

              return _context2.abrupt('return', res.status(404).json({ message: "This account doesn't exist yet" }));

            case 7:
              res.status(200).json(account);
              _context2.next = 13;
              break;

            case 10:
              _context2.prev = 10;
              _context2.t0 = _context2['catch'](1);

              res.status(400).json(_context2.t0);

            case 13:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, _this, [[1, 10]]);
    }));

    return function (_x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  }();
};

exports.default = new AccountCtrl();