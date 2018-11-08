const express = require('express')
const graphqlAPI = require('./graphql')
const graphqlAuth = require('./graphql/auth')
const graphqlHTTP = require('express-graphql')
const passport = require('./authentication/passport')

const app = express()
const port = process.env.PORT || 8080

// CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST')
  res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-type')
  res.header('Access-Control-Allow-Credentials', true)
  if ('OPTIONS' == req.method) {
    res.sendStatus(200)
  } else {
    next()
  }
})

// Login, Register and Verify tokens
app.use('/auth', graphqlHTTP(graphqlAuth))

// API GraphQL without authentication (only use 1)
app.use('/test', graphqlHTTP(graphqlAPI))

// API GraphQL with authentication (only use 1)
app.use('/', passport.authenticate('jwt', { session: false }), graphqlHTTP(graphqlAPI))


// URL Not found
app.use((req, res, next) => {
  res.status(404).json({
    code: 404,
    message: 'NOT FOUND'
  })
})

app.listen(port, () => {
  console.log(`API Gateway running on port ${port}`)
})
