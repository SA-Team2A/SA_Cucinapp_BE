const mongo = require('mongoose')

const difficulty_schema = new mongo.Schema({
  _id: {
    type: Number,
    required: 'Name is required'
  },
  description: {
    type: String,
    required: 'Description is required',
  }
}, { versionKey: false })

module.exports = mongo.model('Difficulty', difficulty_schema)
