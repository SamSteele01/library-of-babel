# library-of-babel

## Front end

`cd react-dapp`

`yarn install`

`yarn start`


## Server

`cd server`

run `docker-compose up`

Open a new terminal in the server folder and run `yarn install` and then `yarn start`

In Postman `get` the `http://localhost:8080/get-encrypt-key` endpoint. It returns the 'pubKey'. Copy and paste that in to the Dockerfile
```
  nucypher-enrico:
    command:
```
In the docker terminal hit `ctrl-c` to stop the containers. Then `docker-compose up` to resume with the new key for Enrico.

Now everything should be ready to run.

If you need to drop the DB: `docker-compose down`, `docker volume rm server_mongo`.
