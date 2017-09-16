var localtunnel = require('localtunnel');
localtunnel(5000, { subdomain: 'jannmexsk' }, function(err, tunnel) {
  console.log('LT running')
});