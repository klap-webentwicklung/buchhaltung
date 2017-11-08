'use strict';

var app = require('../..');
import request from 'supertest';

var newStatement;

describe('Statement API:', function() {

  describe('GET /api/statements', function() {
    var statements;

    beforeEach(function(done) {
      request(app)
        .get('/api/statements')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          statements = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      statements.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/statements', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/statements')
        .send({
          name: 'New Statement',
          info: 'This is the brand new statement!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newStatement = res.body;
          done();
        });
    });

    it('should respond with the newly created statement', function() {
      newStatement.name.should.equal('New Statement');
      newStatement.info.should.equal('This is the brand new statement!!!');
    });

  });

  describe('GET /api/statements/:id', function() {
    var statement;

    beforeEach(function(done) {
      request(app)
        .get('/api/statements/' + newStatement._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          statement = res.body;
          done();
        });
    });

    afterEach(function() {
      statement = {};
    });

    it('should respond with the requested statement', function() {
      statement.name.should.equal('New Statement');
      statement.info.should.equal('This is the brand new statement!!!');
    });

  });

  describe('PUT /api/statements/:id', function() {
    var updatedStatement;

    beforeEach(function(done) {
      request(app)
        .put('/api/statements/' + newStatement._id)
        .send({
          name: 'Updated Statement',
          info: 'This is the updated statement!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedStatement = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedStatement = {};
    });

    it('should respond with the updated statement', function() {
      updatedStatement.name.should.equal('Updated Statement');
      updatedStatement.info.should.equal('This is the updated statement!!!');
    });

  });

  describe('DELETE /api/statements/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/statements/' + newStatement._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when statement does not exist', function(done) {
      request(app)
        .delete('/api/statements/' + newStatement._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
