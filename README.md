<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

## Description

* Setup DB configuration in .env file 
* Use Postman to test api. More details found in documentation.txt file

## Installation

```bash
$ npm install or npm install --force
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

DB Design 
![alt text](<misc/Screenshot 2024-03-03 215156.png>)
* User <-> Order   //One to Many
* Order <-> Product  //Many to Many

Note: In above daigram user mapped through Intermideate table. For for info read Models folder where entities are present


