const recipes_controller = require('./recipes_controller')
const difficulties_controller = require('./difficulties_controller')

module.exports = [
  { path: '/recipes', controller: recipes_controller },
  { path: '/difficulties', controller: difficulties_controller }
]
