const passport = require('passport')
const { GET } = require('../request')
const secret_key = require('./secret')
const { users_url } = require('../request/urls')
const JWTStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt


const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secret_key
}

passport.use(new JWTStrategy(options, async (jwtPayload, done) => {
  let res = await GET(users_url, `/users/${jwtPayload.sub}`)
  if (res.response) {
    return done(null, false)
  }
  return done(null, res)
}))

module.exports = passport
