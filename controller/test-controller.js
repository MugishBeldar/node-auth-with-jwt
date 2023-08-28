module.exports = function makeTestControllerAction({test}) {
    return async function testControllerAction(req, res) {
        const response = await test();
        res.send({
            statusCode:200,
            body: response
        })
    }
}