const controller = require('./controller')
const express = require('express');
const router = express.Router();

// ALL API ENDPOINTS
router.get('/test',controller.testControllerAction)

module.exports = {router}

