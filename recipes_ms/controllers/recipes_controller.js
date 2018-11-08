// Imports
const Recipe = require('../models/recipe')
const recipes_controller = require('express').Router()
const { error_notifier } = require('../utilities/middlewares')
const {
  recipe_serializer,
  recipes_list_serializer
} = require('../utilities/recipe_serializers')
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
    photos: body.photos,
    ingredients: body.ingredients,
    steps: body.steps,
    user_id: body.user_id
  }
}

recipes_controller.route('/')
.get((req, res, next) => {
  Recipe.find({}, (err, recipes) => {
    if (err) {
      return next(internal_error)
    }
    recipes_list_serializer(recipes, (err, recipes_2) => {
      if (err) {
        return next(internal_error)
      }
      res.status(ok.status).json(recipes_2)
    })
  })
})
.post((req, res, next) => {
  const recipe_fields = recipe_fields_extractor(req.body)
  const recipe = new Recipe(recipe_fields)
  recipe.save((err, recipe) => {
    if (err) {
      return next(unprocessable_entity)
    }
    recipe_serializer(recipe, (err, recipe_2) => {
      if (err) {
        return next(internal_error)
      }
      res.status(created.status).json(recipe_2)
    })
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

  // parametro multiple
  if (query.ingredients) {
    const i = query.ingredients.map( i => new RegExp('^'+ i +'$', "i"))
    filter.ingredients = { $in: i }
  }

  if (query.user_id) {
    filter.user_id = parseInt(query.user_id)
  }

  Recipe.find(filter, (err, recipes) => {
    if (err) {
      return next(internal_error)
    }
    recipes_list_serializer(recipes, (err, recipes_2) => {
      if (err) {
        return next(internal_error)
      }
      res.status(ok.status).json(recipes_2)
    })
  })
})

recipes_controller.route('/:recipe_id')
.get((req, res, next) => {
  Recipe.findById(req.params.recipe_id, (err, recipe) => {
    if (err) {
      if (err.name === 'CastError') {
        return next(not_found)
      }
      return next(internal_error)
    }
    if (!recipe) {
      return next(not_found)
    }
    recipe_serializer(recipe, (err, recipe_2) => {
      if (err) {
        return next(internal_error)
      }
      res.status(ok.status).json(recipe_2)
    })
  })
})
.put((req, res, next) => {
  Recipe.findById(req.params.recipe_id, (err, recipe) => {
    if (err) {
      if (err.name === 'CastError') {
        return next(not_found)
      }
      return next(internal_error)
    }
    if (!recipe) {
      return next(not_found)
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
      return next(unprocessable_entity)
    }
    recipe.save((err, recipe_updated) => {
      if (err) {
        return next(unprocessable_entity)
      }
      recipe_serializer(recipe_updated, (err, recipe_2) => {
        if (err) {
          return next(internal_error)
        }
        res.status(ok.status).json(recipe_2)
      })
    })
  })
})
.delete((req, res, next) => {
  Recipe.findById(req.params.recipe_id, (err, recipe) => {
    if (err) {
      if (err.name === 'CastError') {
        return next(not_found)
      }
      return next(internal_error)
    }
    if (!recipe) {
      return next(not_found)
    }
    recipe.remove((err, recipe_removed) => {
      if (err) {
        return next(internal_error)
      }
      recipe_serializer(recipe_removed, (err, recipe_2) => {
        if (err) {
          return next(internal_error)
        }
        res.status(ok.status).json(recipe_2)
      })
    })
  })
})

recipes_controller.use(error_notifier)
module.exports = recipes_controller
