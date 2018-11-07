// Imports
const db_status = require('./db')
const express = require('express')
const controllers = require('./controllers')
const { cors, url_not_exists } = require('./utilities/middlewares')

// App variables
const app = express()
const port = process.env.PORT || 8081

// App main
app.use(express.json())

// DB status
app.get('/', db_status)

// CORS
app.use(cors)

// Mounting Controllers
controllers.forEach(ep => app.use( ep.path, ep.controller))

// Verify URL available
app.use(url_not_exists)

// Listen requests
app.listen(port, () => {
  console.log(`Recipes microservice running on port ${port}`)
})
