module.exports = function makeProfileControllerAction({jwt, constants}) {
  return async function profileControllerAction(req, res) {
    jwt.verify(req.token, constants.secretKey, (err, authData)=>{
      if(err) {
        res.send(
          {result: 'invalid token', err: err}
        )
      } else {
        res.json({
          message: 'profile accessed',
          authData,
        })
      }
    })
  }
}