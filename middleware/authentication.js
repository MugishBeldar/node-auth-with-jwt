module.exports = function makeAuthentication({}) {
  return async function authentication(req, res, next) {
      const bearerHeader = req.headers['authorization'];
      console.log(bearerHeader);
      if(bearerHeader) {
        const token = bearerHeader.split(' ')[1];
        req.token = token;
        next();
      } else {
        res.send({message: "invalid token"});
      }
  }
}