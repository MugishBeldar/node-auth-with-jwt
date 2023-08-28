const useCases = require('../usecases');
const jwt = require('jsonwebtoken');
const constants = require('../constant');

const makeTestControllerAction = require('./test-controller');
const testControllerAction = makeTestControllerAction({test: useCases.test});

const makeLoginControllerAction = require('./login');
const loginControllerAction = makeLoginControllerAction({jwt, constants});

const makeProfileControllerAction = require('./profile');
const profileControllerAction = makeProfileControllerAction({jwt, constants});

module.exports = Object.freeze({
    testControllerAction,
    loginControllerAction,
    profileControllerAction,
})