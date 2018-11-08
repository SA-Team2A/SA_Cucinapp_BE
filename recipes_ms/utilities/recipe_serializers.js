const Difficulty = require('../models/difficulty')

const load_difficulty = (recipe, difficulty) => {
  return {
    _id: recipe._id,
    name: recipe.name,
    description: recipe.description,
    difficulty,
    portions: recipe.portions,
    preparation_time: recipe.preparation_time,
    photos: recipe.photos,
    ingredients: recipe.ingredients,
    steps: recipe.steps,
    user_id: recipe.user_id
  }
}

module.exports = {
  recipe_serializer: (recipe, done) => {
    Difficulty.findById(recipe.difficulty_id, (err, difficulty) => {
      if (err) {
        return done(err, null)
      }
      return done(null, load_difficulty(recipe, difficulty))
    })
  },
  recipes_list_serializer: (recipes, done) => {
    Difficulty.find({}, (err, difficulties) => {
      if (err) {
        return done(err, null)
      }
      const recipes_2 = recipes.map( recipe => {
        for(let difficulty of difficulties) {
          if (recipe.difficulty_id === difficulty._id) {
            return load_difficulty(recipe, difficulty)
          }
        }
      })
      return done(null, recipes_2)
    })
  }
}
