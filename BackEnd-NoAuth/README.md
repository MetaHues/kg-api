
## How to develop
Read this https://expressjs.com/en/advanced/best-practice-performance.html

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

### Run DBB Tests
With the service running on "http://localhost:3000", run
```shell
npm test
```
