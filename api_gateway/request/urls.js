// Variables definition

// Users_ms
const users_port = process.env.USER_PORT || 8081
const users_baseUrl = process.env.USER_URL || 'localhost'
const users_url = `http://${users_baseUrl}:${users_port}`

// Recipes_ms
const recipes_port = process.env.RECIPES_PORT || 8082
const recipes_baseUrl = process.env.RECIPES_URL || 'localhost'
const recipes_url = `http://${recipes_baseUrl}:${recipes_port}`

// Suppliers_ms
const suppliers_port = process.env.SUPPILERS_PORT || 8083
const suppliers_baseUrl = process.env.SUPPILERS_URL || 'localhost'
const suppliers_url = `http://${suppliers_baseUrl}:${suppliers_port}`

// Forums_ms
const forums_port = process.env.FORUMS_PORT || 8084
const forums_baseUrl = process.env.FORUMS_URL || 'localhost'
const forums_url = `http://${forums_baseUrl}:${forums_port}`

// Ingredients_ms
const ingredients_port = process.env.INGREDIENTS_PORT || 8085
const ingredients_baseUrl = process.env.INGREDIENTS_URL || 'localhost'
const ingredients_url = `http://${ingredients_baseUrl}:${ingredients_port}`

module.exports = {
  users_url,
  forums_url,
  recipes_url,
  suppliers_url,
  ingredients_url
}
