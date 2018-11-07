const { not_found } = require('./status')

module.exports = {
  url_not_exists: (req, res, next) => {
    res.status(not_found.status).json(not_found)
  },
  cors: (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'Content-type')
    res.header('Access-Control-Allow-Credentials', true)
    if ('OPTIONS' == req.method) {
      res.sendStatus(200)
    } else {
      next()
    }
  },
  error_notifier: (err, req, res, next) => {
    res.status(err.status).json(err)
  }
}
