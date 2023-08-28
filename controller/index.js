const useCases = require('../usecases');

const makeTestControllerAction = require('./test-controller');
const testControllerAction = makeTestControllerAction({test: useCases.test});

module.exports = Object.freeze({
    testControllerAction
})