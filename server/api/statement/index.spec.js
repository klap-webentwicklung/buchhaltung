'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var statementCtrlStub = {
  index: 'statementCtrl.index',
  show: 'statementCtrl.show',
  create: 'statementCtrl.create',
  update: 'statementCtrl.update',
  destroy: 'statementCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var statementIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './statement.controller': statementCtrlStub
});

describe('Statement API Router:', function() {

  it('should return an express router instance', function() {
    statementIndex.should.equal(routerStub);
  });

  describe('GET /api/statements', function() {

    it('should route to statement.controller.index', function() {
      routerStub.get
        .withArgs('/', 'statementCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/statements/:id', function() {

    it('should route to statement.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'statementCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/statements', function() {

    it('should route to statement.controller.create', function() {
      routerStub.post
        .withArgs('/', 'statementCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/statements/:id', function() {

    it('should route to statement.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'statementCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/statements/:id', function() {

    it('should route to statement.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'statementCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/statements/:id', function() {

    it('should route to statement.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'statementCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
