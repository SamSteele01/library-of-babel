// index.js
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const cors = require('cors');
const db = require('./db');
var path = require('path');

const router = express.Router();

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
app.enable('trust proxy', 'loopback');

/* TODO: update this to be more specific instead of opening up everything */
app.use(cors());

/* Routes --------------------- */

app.get('/purchases')

app.post('/purchases', (req, res) => {

})

app.get('/upload')

app.post('/upload', (req, res) => {
 // IPFS_hash, label, eth_address, price
})

/* Alice */

// /derive_policy_pubkey

// grant

/* Bob */



app.get('/test', (req, res) => res.send('Hello World!'));

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Uncaught error!');
});

app.listen(port, () => {
  console.log('Server is up and running on port number ' + port);
});
