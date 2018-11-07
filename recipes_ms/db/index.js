// Imports
const mongo = require('mongoose')
require('./seed')

// DB variables
const mongo_url = process.env.MONGO_URL || 'mongodb://localhost/recipes_ms'

// DB config
mongo.set('bufferCommands', false)
mongo.connect(mongo_url, { useNewUrlParser: true }).catch(err => {
  console.log('Connection DB error')
})

module.exports = (req, res, next) => {
  if (mongo.connection.readyState !== 1) {
    mongo.disconnect().then(
      () => {
        mongo.connect(mongo_url, { useNewUrlParser: true })
        .then(
          () => {
            res.send('1')
          }
        )
        .catch(err => {
          console.log('Reconnection DB error')
          res.send('0')
        })
      }
    ).catch(
      err => {
        console.log('Disconnection DB error')
        res.send('0')
      }
    )
  } else {
    res.send('1')
  }
}
