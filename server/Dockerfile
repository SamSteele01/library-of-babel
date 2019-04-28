FROM node:10.15.3-alpine

EXPOSE 8080

# Install dependencies needed to compile web3
RUN apk add --no-cache --virtual .gyp \
        python \
        make \
        g++ \
        git ;

WORKDIR /app

COPY ./src /app/src
COPY ./package.json /app/package.json
# COPY ./yarn.lock /app/yarn.lock
# COPY ./node_modules /app/node_modules
COPY ./.babelrc /app/.babelrc
COPY ./dist /app/dist

# RUN yarn install

# CMD ["yarn", "run", "server"]
