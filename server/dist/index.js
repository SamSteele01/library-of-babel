'use strict';

var _accountCtrl = require('./controllers/accountCtrl');

var _accountCtrl2 = _interopRequireDefault(_accountCtrl);

var _bookCtrl = require('./controllers/bookCtrl');

var _bookCtrl2 = _interopRequireDefault(_bookCtrl);

var _purchaseCtrl = require('./controllers/purchaseCtrl');

var _purchaseCtrl2 = _interopRequireDefault(_purchaseCtrl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('dotenv').config(); // index.js

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

var port = process.env.PORT || 8080;

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
console.log('ACCOUNTCTRL.GET', _accountCtrl2.default.get);
app.get('/account', _accountCtrl2.default.get);

// save new ethAddress in new account
app.post('/account', _accountCtrl2.default.create);

// get all books available
app.get('/books', _bookCtrl2.default.getAll);

// make a policy_pubkey from a label
app.post('/get-encrypt-key', _bookCtrl2.default.makePubkey);

/** upload new book, encrypt, store on ipfs, save in db
* @body IPFS_hash, label, eth_address, price
*/
app.post('/books', _bookCtrl2.default.create);

// show purchases from this ethAddress
app.get('/purchases', _purchaseCtrl2.default.getAll);

// record purchase to db
app.post('/purchase', _purchaseCtrl2.default.create);

// get decryption key for purchased book
app.post('/get-decrypt-key', _purchaseCtrl2.default.getKey);

// join policy
app.post('/join-policy', _purchaseCtrl2.default.joinPolicy);

// download content with key
app.post('/download', _purchaseCtrl2.default.download);

/* Alice */

// /derive_policy_pubkey

// grant

/* Bob */

// retrieve

/* Enrico */

// encrypt message

/* Ursula */

app.get('/test', function (req, res) {
  return res.send('Hello World!');
});

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Uncaught error!');
});

app.listen(port, function () {
  console.log('Server is up and running on port number ' + port);
});