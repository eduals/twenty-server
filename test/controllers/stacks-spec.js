
var mocha = require('mocha'),
    should = require('should'),
    request = require('request'),
    express = require('express'),
    passport = require('passport'),
    env = require('../../config/env')('test'),
    app = express();


describe('stacks api', function() {
  this.timeout(5000);

  var server,
      host = 'http://' + env.ip + ':' + env.port;

  before(function(done) {
    require('../../config/express')(app, express, env);
    require('../../config/passport')(app, passport, env.ip, env.port);
    require('../../config/routes')(app, passport);
    server = app.listen(env.port);
    done();
  });

  after(function(done) {
    server.close();
    done();
  });

  describe('index action', function() {
    it('should respond with 200 on success', function(done) {
      request.get(host + '/userStack', function(err, res) {
        res.statusCode.should.equal(200);
        done();
      });
    });
  });

  describe('create (approve) action', function() {
    it('should respond with 201 on success', function(done) {
      request.post({
        url: host + '/userStacks/approve',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify([{}])
      }, function(err, res) {
        res.statusCode.should.equal(201);
        done();
      })
    });
  });

  describe('create (reject) action', function() {
    it('should respond with 201 on success', function(done) {
      request.post({
        url: host + '/userStacks/reject',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify([{}])
      }, function(err, res) {
        res.statusCode.should.equal(201);
        done();
      })
    });
  });

  describe('create (reset) action', function() {
    it('should respond with 201 on success', function(done) {
      request.post({
        url: host + '/userStacks/reset',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify([{}])
      }, function(err, res) {
        res.statusCode.should.equal(201);
        done();
      })
    });
  });

  // describe('show action', function() {
  //   it('should respond with 200 on success', function(done) {
  //     request.get(host + '/stacks/1', function(err, res) {
  //       res.statusCode.should.equal(200);
  //       done();
  //     });
  //   });
  // });

  // describe('update action', function() {
  //   it('should respond with 204 on success', function(done) {
  //     request.put({
  //       url: host + '/stacks/1',
  //       headers: { 'content-type': 'application/json' },
  //       body: JSON.stringify([{}])
  //     }, function(err, res) {
  //       res.statusCode.should.equal(204);
  //       done();
  //     })
  //   });
  // });

  // describe('destroy action', function() {
  //   it('should respond with 204 on success', function(done) {
  //     request.del({
  //       url: host + '/stacks/1',
  //       headers: { 'content-type': 'application/json' }
  //     }, function(err, res) {
  //       res.statusCode.should.equal(204);
  //       done();
  //     });
  //   });
  // });

});
