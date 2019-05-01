'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Validate = function Validate() {
  (0, _classCallCheck3.default)(this, Validate);

  this.download = function (req) {
    req.checkBody('bookId', 'The bookId cannot be empty').notEmpty();
    req.checkBody('aliceSigningPubkey', 'The aliceSigningPubkey cannot be empty').notEmpty();
    var errors = req.validationErrors();
    if (errors) throw errors;
  };

  this.ethAddressBody = function (req) {
    req.checkBody('ethAddress', 'The ethAddress cannot be empty').notEmpty();
    var errors = req.validationErrors();
    if (errors) throw errors;
  };

  this.ethAddressParam = function (req) {
    req.checkParams('ethAddress', 'The ethAddress cannot be empty').notEmpty();
    var errors = req.validationErrors();
    if (errors) throw errors;
  };

  this.labelHashAndEthAddress = function (req) {
    req.checkBody('labelHash', 'The labelHash cannot be empty').notEmpty();
    req.checkBody('ethAddress', 'The ethAddress cannot be empty').notEmpty();
    var errors = req.validationErrors();
    if (errors) throw errors;
  };

  this.id = function (req) {
    req.checkParams('id', 'The id cannot be empty').notEmpty();
    var errors = req.validationErrors();
    if (errors) throw errors;
  };

  this.label = function (req) {
    req.checkBody('label', 'The label cannot be empty').notEmpty();
    var errors = req.validationErrors();
    if (errors) throw errors;
  };

  this.createBook = function (req) {
    req.checkBody('content', 'The content cannot be empty').notEmpty();
    req.checkBody('ethPrice', 'The ethPrice cannot be empty').notEmpty();
    // req.checkBody('pubKey', 'The pubKey cannot be empty').notEmpty();
    req.checkBody('title', 'The title cannot be empty').notEmpty();
    var errors = req.validationErrors();
    if (errors) throw errors;
  };

  this.purchase = function (req) {
    req.checkBody('bookId', 'The bookId cannot be empty').notEmpty();
    req.checkBody('txn', 'The txn cannot be empty').notEmpty();
    var errors = req.validationErrors();
    if (errors) throw errors;
  };

  this.purchaseId = function (req) {
    req.checkBody('purchaseId', 'The purchaseId cannot be empty').notEmpty();
    var errors = req.validationErrors();
    if (errors) throw errors;
  };
};

exports.default = new Validate();