const Difficulty = require('../models/difficulty')
const Recipe = require('../models/recipe')
const recipes = require('./recipes')

const difficulties = [
  { _id: 1, description: 'Baja'},
  { _id: 2, description: 'Media'},
  { _id: 3, description: 'Avanzada'}
]

Difficulty.countDocuments({}, (err, count) => {
  if (err) {
    console.log('Error on count: Difficulty seed')
    return -1
  }
  if (count == 0) {
    Difficulty.insertMany(difficulties, (err, difficulties) => {
      if (err) {
        console.log('Error on insertMany: Difficulty seed')
        return -1
      }
    })
  }
})

Recipe.countDocuments({}, (err, count) => {
  if (err) {
    console.log('Error on count: Recipe seed')
    return -1
  }
  if (count == 0) {
    Recipe.insertMany(recipes, (err, recipes) => {
      if (err) {
        console.log('Error on insertMany: Recipe seed')
        return -1
      }
    })
  }
})
