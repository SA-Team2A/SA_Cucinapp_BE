const mongo = require('mongoose')

const recipe_schema = new mongo.Schema({
  name: {
    type: String,
    required: 'Name is required'
  },
  description: {
    type: String,
    required: 'Description is required',
  },
  difficulty_id: {
    type: Number,
    required: 'Difficuty_id is required'
  },
  portions:{
    type: Number,
    min: 1,
    required: 'Portions is required'
  },
  preparation_time: {
    type: Number,
    min: 0,
    default: 0
  },
  photos: {
    type: [String],
    default: []
  },
  ingredients: {
    type: [String],
    required: 'Ingredients are required'
  },
  steps: {
    type: [String],
    required: 'Steps are required'
  },
  user_id: {
    type: Number,
    required: 'user_id is required'
  }
}, { versionKey: false })

module.exports = mongo.model('Recipe', recipe_schema)
