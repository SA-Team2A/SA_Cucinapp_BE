// Imports
const Difficulty = require('../models/difficulty')
const difficulties_controller = require('express').Router()
const { ok, internal_error } = require('../utilities/status')
const { error_notifier } = require('../utilities/middlewares')

difficulties_controller.route('/')
.get((req, res, next) => {
  Difficulty.find({}, (err, difficulties) => {
    if (err) {
      return next(internal_error)
    }
    res.status(ok.status).json(difficulties)
  })
})

difficulties_controller.use(error_notifier)
module.exports = difficulties_controller
