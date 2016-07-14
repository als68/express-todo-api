'use strict';

const superTest = require('supertest');

//THURSDAY MORNING -- get paths correct

const app = require('.././server');
const chai = require('chai');
const expect = chai.expect;
const should = chai.should();

describe('GET /', function(){
  it('request has been successfully made', function(done){
    superTest(app)
      .get('/')
      .expect(200, done);
  });
});

describe('GET /buzzwords', function(){
  it('request has been successfully made', function(done){
    superTest(app)
      .get('/buzzwords')
      .expect(200, done);
  });
});

describe('POST /buzzword', function(){
  it('request has been successfully made', function(done){
    superTest(app)
      .post('/buzzword')
      .send({"buzzWord": "yo1", "points": 14})
      .expect(200, done);
  });
  it('request has been successfully made', function(done){
    superTest(app)
      .post('/buzzword')
      .send({"buzzWord": "yo1", "points": 14})
      .expect(200, done);
  });
});

describe('PUT /buzzword', function(){
  it('request has been successfully made', function(done){
    superTest(app)
      .put('/buzzword')
      .send({"buzzWord": "putRequest", "heard": true})
      .expect(200, done);
  });
});

describe('DELETE /buzzword', function(){
  it('request has been successfully made', function(done){
    superTest(app)
      .delete('/buzzword')
      .send({"buzzWord": "buzzwordToBeDeleted"})
      .expect(200, done);
  });
});

describe('POST /reset', function(){
  it('request has been successfully made', function(done){
    superTest(app)
      .post('/reset')
      .send({"reset": true})
      .expect(200, done);
  });
});
