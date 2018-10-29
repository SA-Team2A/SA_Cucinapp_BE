// Imports
const Recipe = require('../models/recipe')
const recipes_controller = require('express').Router()
const {
  ok,
  created,
  not_found,
  internal_error,
  unprocessable_entity
} = require('../utilities/status')

// TODO: Revisar la busqueda por ingredientes

const recipe_fields_extractor = (body) => {
  return {
    name: body.name,
    description: body.description,
    difficulty_id: body.difficulty_id,
    portions: body.portions,
    preparation_time: body.preparation_time,
    cooking_time: body.cooking_time,
    photos: body.photos,
    ingredients: body.ingredients,
    steps: body.steps
  }
}

recipes_controller.route('/')
.get((req, res, next) => {
  Recipe.find({}, (err, recipes) => {
    if (err) {
      return res.status(internal_error.status).json(internal_error)
    }
    res.status(ok.status).json(recipes)
  })
})
.post((req, res, next) => {
  const recipe_fields = recipe_fields_extractor(req.body)
  const recipe = new Recipe(recipe_fields)
  recipe.save((err, recipe) => {
    if (err) {
      return res.status(unprocessable_entity.status).json(unprocessable_entity)
    }
    res.status(created.status).json(recipe)
  })
})

recipes_controller.route('/search').
get((req, res, next) => {
  const query = req.query
  var filter = {}
  if (!query) {
    return next()
  }
  // Parametro unico
  if (query.name) {
    filter['name'] = new RegExp(query.name, "i")
  }
  // parametro multiple
  if (query.difficulty_id) {
    const d = query.difficulty_id.map(id => parseInt(id))
    filter['difficulty_id'] = { $in: d }
  }
  // puntos de referencia
  if (query.portions) {
    const { min, max } = JSON.parse(query.portions)
    if (min && max) {
      filter.portions = { $gte: parseInt(min), $lte: parseInt(max) }
    } else if (min) {
      filter.portions = { $gte: parseInt(min) }
    } else {
      filter.portions = { $lte: parseInt(max) }
    }
  }
  // puntos de referencia
  if (query.preparation_time) {
    const { min, max } = JSON.parse(query.preparation_time)
    if (min && max) {
      filter.preparation_time = { $gte: parseInt(min), $lte: parseInt(max) }
    } else if (min) {
      filter.preparation_time = { $gte: parseInt(min) }
    } else {
      filter.preparation_time = { $lte: parseInt(max) }
    }
  }
  // puntos de referencia
  if (query.cooking_time) {
    const { min, max } = JSON.parse(query.cooking_time)
    if (min && max) {
      filter.cooking_time = { $gte: parseInt(min), $lte: parseInt(max) }
    } else if (min) {
      filter.cooking_time = { $gte: parseInt(min) }
    } else {
      filter.cooking_time = { $lte: parseInt(max) }
    }
  }
  // parametro multiple
  if (query.ingredients) {
    const i = query.ingredients.map( i => new RegExp('^'+ i +'$', "i"))
    filter.ingredients = { $in: i }
  }

  Recipe.find(filter, (err, recipes) => {
    if (err) {
      return res.status(internal_error.status).json(internal_error)
    }
    res.status(ok.status).json(recipes)
  })
})

recipes_controller.route('/:recipe_id')
.get((req, res, next) => {
  Recipe.findById(req.params.recipe_id, (err, recipe) => {
    if (err) {
      if (err.name === 'CastError') {
        return res.status(not_found.status).json(not_found)
      }
      return res.status(internal_error.status).json(internal_error)
    }
    if (!recipe) {
      return res.status(not_found.status).json(not_found)
    }
    res.status(ok.status).json(recipe)
  })
})
.put((req, res, next) => {
  Recipe.findById(req.params.recipe_id, (err, recipe) => {
    if (err) {
      if (err.name === 'CastError') {
        return res.status(not_found.status).json(not_found)
      }
      return res.status(internal_error.status).json(internal_error)
    }
    if (!recipe) {
      return res.status(not_found.status).json(not_found)
    }
    const recipe_fields = recipe_fields_extractor(req.body)
    var unproc = true
    for (let key in recipe_fields) {
      unproc = unproc && !recipe_fields[key]
      if (recipe_fields[key]) {
        recipe[key] = recipe_fields[key]
      }
    }
    if (unproc) {
      res.status(unprocessable_entity.status).json(unprocessable_entity)
    }
    recipe.save((err, recipe_updated) => {
      if (err) {
        return res.status(unprocessable_entity.status).json(unprocessable_entity)
      }
      res.status(ok.status).json(recipe_updated)
    })
  })
})
.delete((req, res, next) => {
  Recipe.findById(req.params.recipe_id, (err, recipe) => {
    if (err) {
      if (err.name === 'CastError') {
        return res.status(not_found.status).json(not_found)
      }
      return res.status(internal_error.status).json(internal_error)
    }
    if (!recipe) {
      return res.status(not_found.status).json(not_found)
    }
    recipe.remove((err, recipe_removed) => {
      if (err) {
        return res.status(internal_error.status).json(internal_error)
      }
      res.status(ok.status).json(recipe)
    })
  })
})


module.exports = recipes_controller
