global.logger = console.log;
const makeTest = require('./test.js')
const test = makeTest();

module.exports = Object.freeze({
    test,
})