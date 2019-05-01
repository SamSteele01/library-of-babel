# library-of-babel Encrypted book store and file sharing


Live demo of the front end: http://library-of-babel2.s3-website.us-east-2.amazonaws.com/


Upload files which get encrypted and stored to IPFS. Set a price for the file which gets stored in a smart contract with the ipfsPath. Paying the contract grants you access and forwards funds to the content uploader. You can then get the decryption keys to download and decrypt the file.

### Front end

`cd react-dapp`

`yarn install`

`yarn start`


### Server

`cd server`

run `docker-compose up`

Open a new terminal in the server folder and run `yarn install` and then `yarn start`

In Postman `get` the `http://localhost:8080/get-encrypt-key` endpoint. It returns the 'pubKey'. Copy and paste that in to the docker-compose.yml file.

In the docker terminal hit `ctrl-c` to stop the containers. Then `docker-compose up` to resume with the new key for Enrico.

Now everything should be ready to run.

If you need to drop the DB: `docker-compose down`, `docker volume rm server_mongo`.
