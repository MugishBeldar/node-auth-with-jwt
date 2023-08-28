const makeAuthentication = require('./authentication');
const authentication = makeAuthentication({});

module.exports = Object.freeze({
  authentication,
})