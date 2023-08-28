module.exports = function makeLoginControllerAction({jwt, constants}) {
  return async function loginControllerAction(req, res) {
      const user = {
        userName: req.body.userName,
        password: req.body.password,
      }
      const token = jwt.sign({user}, constants.secretKey, {expiresIn: constants.expiresIn});
      res.send({token});
      // res.send({
      //     statusCode:200,
      //     body: response
      // })
  }
}