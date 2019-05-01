'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _accountCtrl = require('./controllers/accountCtrl');

var _accountCtrl2 = _interopRequireDefault(_accountCtrl);

var _bookCtrl = require('./controllers/bookCtrl');

var _bookCtrl2 = _interopRequireDefault(_bookCtrl);

var _purchaseCtrl = require('./controllers/purchaseCtrl');

var _purchaseCtrl2 = _interopRequireDefault(_purchaseCtrl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('dotenv').config(); // app.js

var PrettyError = require('pretty-error');
var express = require('express');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var cors = require('cors');
// var path = require('path');
var db = require('./db');
// const AccountCtrl = require('./controllers/accountCtrl');
// const BookCtrl = require('./controllers/bookCtrl');
// const PurchaseCtrl = require('./controllers/purchaseCtrl');

// const router = express.Router();
// const app = express();

// const port = process.env.PORT || 8080;

var pe = new PrettyError();
pe.skipNodeFiles();
pe.skipPackage('express');
pe.start();

var corsOptionsAll = {
  allowedHeaders: ['content-type', 'authorization', 'content-length', 'x-requested-with', 'accept', 'origin', 'connection', 'upgrade'],
  credentials: false,
  methods: ['GET', 'PUT', 'POST', 'CONNECT', 'OPTIONS'],
  origin: '*'
};

// Routes
// const root = require('./routes/root.routes.js');

// initialize our express ap
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());

/* so we can get the client's IP address */
// app.enable('trust proxy', 'loopback');

/* TODO: update this to be more specific instead of opening up everything */
app.use(cors());

/* ---------------------- Routes ---------------------- */

// get account if it exists
app.get('/account/:ethAddress', _accountCtrl2.default.get);

// error message
app.get('/account', function (req, res) {
  res.status(400).json({ message: 'You must include a param of: ethaddress' });
});

// save new ethAddress in new account
app.post('/account', _accountCtrl2.default.create);

// delete that mofo
app.delete('/account', _accountCtrl2.default.delete);

/** make a policy_pubkey from a label
* @body label
* @return labelHash and pubKey
*/
app.post('/get-encrypt-key', _bookCtrl2.default.derivePolicyPubkey);

// get all books available
app.get('/books', _bookCtrl2.default.getAll);

// get one book by id
app.get('/book/:id', _bookCtrl2.default.getOne);

// get all books by ethAddress
app.get('/uploads/:ethAddress', _bookCtrl2.default.getAllByUser);

/** UPLOAD new book, encrypt, store on ipfs, save in db
* @body title, content, ethPrice, labelHash, ethAddress
* @body pubKey - needed after enrico can change on the fly
* @return bookId, ipfsHash
*/
app.post('/books', _bookCtrl2.default.create);

/** TESTING get content from IPFS
* @body ipfsPath
*/
app.post('/get-from-ipfs', _bookCtrl2.default.ipfsGet);

// show purchases from this ethAddress
app.get('/purchases/:ethAddress', _purchaseCtrl2.default.getAll);

/** record purchase to db. Call right after F.E. gets txn confirmation
* @body bookId, ethAddress, labelHash, txn
*/
app.post('/purchase', _purchaseCtrl2.default.create);

/** get decryption key for purchased book
* checks contract then calls Alice/grant
* @body labelHash, ethAddress, purchaseId
*/
app.post('/get-decrypt-key', _purchaseCtrl2.default.getDecryptionKey);

// join policy - not working - not sure if needed
app.post('/join-policy', _purchaseCtrl2.default.joinPolicy);

/** download content with key
* @body bookId and aliceSigningPubkey
*/
app.post('/download', _purchaseCtrl2.default.download);

app.get('/test', function (req, res) {
  return res.send('The Library of Babel server works!');
});

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Uncaught error!');
});

exports.default = app;