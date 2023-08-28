const controller = require('./controller')
const express = require('express');
const router = express.Router();
const {authentication} = require('./middleware')
// ALL API ENDPOINTS
router.get('/test',controller.testControllerAction)
router.post('/login', controller.loginControllerAction)
router.post('/profile', authentication ,controller.profileControllerAction)

module.exports = {router}

