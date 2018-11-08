const jwt = require('jsonwebtoken')
const secret_key = require('./secret')

module.exports = {
  sign: (id) => new Promise((resolve, reject) => {
    jwt.sign({ sub: id }, secret_key, { expiresIn: '1d'}, (error, token) => {
      if (error) {
        return reject(error)
      }
      return resolve(token)
    })
  }).then( token => token ).catch( error => error ),
  verify: (token) => new Promise((resolve, reject) => {
    jwt.verify(token, secret_key, (error, decoded) => {
      if (error) {
        return resolve(null)
      }
      return resolve(decoded.sub)
    })
  }).then( res => res ).catch( error => error )
}
