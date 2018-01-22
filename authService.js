var jwt = require('express-jwt')
var jwks = require('jwks-rsa')

var jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: "https://natperson.auth0.com/.well-known/jwks.json"
  }),
  audience: 'https://podspeak.herokuapp.com',
  issuer: "https://natperson.auth0.com/",
  algorithms: ['RS256']
})


class authService {
    static isValid(token){ 
        console.log('nope')
    }
}


module.exports = authService