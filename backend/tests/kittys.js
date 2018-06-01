/**https://scotch.io/tutorials/test-a-node-restful-api-with-mocha-and-chai */

const sinon = require('sinon');
const assert = require('chai').assert;
const underTest = require('../routes/kittys');
const axios = require('axios');

describe('kittys', () => {
    describe('POST /kittys', () => {
        it('should fail if body is empty', () => {
            const body = {};
            axios({
                method: 'post',
                url: 'http://localhost:3000/kittys',
                headers: {'Content-Type': 'application/json'},
                data: {}
              })
              .then(function (response) {
                assert.fail(response.data, {}, "was expecting an error");
              })
              .catch(function (error) {
                console.log(error);
              });
        });
    });
});