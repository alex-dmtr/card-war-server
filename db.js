var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');
var url = 'mongodb://nodejs:awesomepassword@ds135798.mlab.com:35798/heroku_d08mv7jf';


var state = {
  db: null,
}

exports.connect = function(done) {
  if (state.db) return done();

  MongoClient.connect(url, function(err, db) {
    if (err) return done(err)
    state.db = db
    done()
  })
}

exports.getUser = function(username, callback) {
  state.db.collection("users").findOne({username:username}, callback)
}

exports.addUser = function(username, callback) {
  state.db.collection("users").insertOne({username:username}, callback);
}

exports.login = function(username, callback) {
  state.db.collection("users").findOne({username:username}, (err, r) => {
    if (r != null)
      callback(null, r)
    else
      callback(null, null)
  })
}

exports.get = function() {
  return state.db
}




exports.close = function(done) {
  if (state.db) {
    state.db.close(function(err, result) {
      state.db = null
      state.mode = null
      done(err)
    })
  }
}