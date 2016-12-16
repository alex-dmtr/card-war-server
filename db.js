var pg = require('pg');

// create a config to configure both pooling behavior
// and client options
// note: all config is optional and the environment variables
// will be read if the config is not present
var config = {
  user: 'zeoucxfliyvuga', //env var: PGUSER
  database: 'df287ddnrmgv7p', //env var: PGDATABASE
  password: '75acd52173ec2333583d9d0ba0d46577eaa8bd58b44bae2de99aa5aafe89d0d4', //env var: PGPASSWORD
  host: 'ec2-54-75-248-193.eu-west-1.compute.amazonaws.com', // Server hosting the postgres database
  port: 5432, //env var: PGPORT
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000, 
    ssl: true // how long a client is allowed to remain idle before being closed
};



//this initializes a connection pool
//it will keep idle connections open for a 30 seconds
//and set a limit of maximum 10 idle clients
var pool = new pg.Pool(config);

// to run a query we can acquire a client from the pool,
// run a query on the client, and then return the client to the pool
function query(text, params, callback) {
    

pool.connect(function(err, client, done) {
  if(err) {
    return console.error('error fetching client from pool', err);
  }
  
  
  client.query(text, params, function(err, result) {
    //call `done()` to release the client back to the pool
    done();

    if(err) {
      return console.error('error running query', err);
    }
    
    callback(null, result.rows);
  });
});

}

pool.on('error', function (err, client) {
  // if an error is encountered by a client while it sits idle in the pool
  // the pool itself will emit an error event with both the error and
  // the client which emitted the original error
  // this is a rare occurrence but can happen if there is a network partition
  // between your application and the database, the database restarts, etc.
  // and so you might want to handle it and at least log it out
  console.error('idle client error', err.message, err.stack)
})

module.exports = {
    query: query
};