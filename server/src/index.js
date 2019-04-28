// index.js
import AccountCtrl from './controllers/accountCtrl';
import BookCtrl from './controllers/bookCtrl';
import PurchaseCtrl from './controllers/purchaseCtrl';
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const cors = require('cors');
// var path = require('path');
const db = require('./db');
// const AccountCtrl = require('./controllers/accountCtrl');
// const BookCtrl = require('./controllers/bookCtrl');
// const PurchaseCtrl = require('./controllers/purchaseCtrl');

// const router = express.Router();
// const app = express();

const port = process.env.PORT || 8080;

const corsOptionsAll = {
  allowedHeaders: [
    'content-type',
    'authorization',
    'content-length',
    'x-requested-with',
    'accept',
    'origin',
    'connection',
    'upgrade',
  ],
  credentials: false,
  methods: ['GET', 'PUT', 'POST', 'CONNECT', 'OPTIONS'],
  origin: '*',
};

// Routes
// const root = require('./routes/root.routes.js');

// initialize our express ap
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());

/* so we can get the client's IP address */
// app.enable('trust proxy', 'loopback');

/* TODO: update this to be more specific instead of opening up everything */
app.use(cors());

/* ---------------------- Routes ---------------------- */

// get account if it exists
app.get('/account/:ethAddress', AccountCtrl.get);

// error message
app.get('/account', (req, res) => {
  res.status(400).json({ message: 'You must include a param of: ethaddress' })
});

// save new ethAddress in new account
app.post('/account', AccountCtrl.create);

// delete that mofo
app.delete('/account', AccountCtrl.delete);

/** make a policy_pubkey from a label
* @body label
*/
app.post('/get-encrypt-key', BookCtrl.derivePolicyPubkey)

// get all books available
app.get('/books', BookCtrl.getAll);

// get one book by id
app.get('/book/:id', BookCtrl.getOne);

/** upload new book, encrypt, store on ipfs, save in db
* @body title, content, ethPrice, labelHash, ethAddress, pubKey
* @return bookId, ipfsHash
*/
app.post('/books', BookCtrl.create);

/** TESTING get content from IPFS
* @body ipfsPath
*/
app.post('/get-from-ipfs', BookCtrl.ipfsGet);

// show purchases from this ethAddress
app.get('/purchases/:ethAddress', PurchaseCtrl.getAll);

/** record purchase to db. Call right after F.E. gets txn confirmation
* @body bookId, ethAddress, labelHash, txn
*/
app.post('/purchase', PurchaseCtrl.create);

// get decryption key for purchased book
app.post('/get-decrypt-key', PurchaseCtrl.getDecryptionKey);

// join policy
app.post('/join-policy', PurchaseCtrl.joinPolicy);

// download content with key
app.post('/download', PurchaseCtrl.download);

/* Alice */

// /derive_policy_pubkey

// grant

/* Bob */

// retrieve

/* Enrico */

// encrypt message

/* Ursula */

app.get('/test', (req, res) => res.send('Hello World!'));

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Uncaught error!');
});

app.listen(port, () => {
  console.log('Server is up and running on port number ' + port);
});
