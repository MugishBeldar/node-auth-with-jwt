module.exports = function makeTest() {
    return async function test() {
        logger('test use case called');
        return 'test use case called';
    }
}