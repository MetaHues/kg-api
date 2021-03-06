# Kitty Glitter

## How to develop

Read these: 
https://expressjs.com/en/advanced/best-practice-security.html
https://expressjs.com/en/advanced/best-practice-performance.html

### Install Docker

https://www.docker.com/community-edition

- you might have to enable virtualization in BIOS

### Install Packages

```shell
npm install
```

### Start the database

```shell
docker-compose up --build
```

### Start Express Server

```shell
node index.js
```

### Run BDD Tests

With the service running on "http://localhost:3000", run

```shell
npm test
```

### Test with Postman

Open postman and import the collection `./KittyGlitter/BackEnd-NoAuth/metahues-kittyglitter-backend-noauth.postman_collection.json`
Have fun!

## Roadmap

- eslint integration on commit
- prettier integration on commit
- implement cors
- implement authentication
- unit tests
- cucumber or other BDD tests
