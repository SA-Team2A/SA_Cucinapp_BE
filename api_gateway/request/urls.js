// Recipes_ms
const recipes_port = process.env.RECIPES_PORT || 8081
const recipes_baseUrl = process.env.RECIPES_URL || 'localhost'
const recipes_url = `http://${recipes_baseUrl}:${recipes_port}`

// Collections_ms
const collections_port = process.env.COLLECTIONS_PORT || 8082
const collections_baseUrl = process.env.COLLECTIONS_URL || '192.168.99.100'
const collections_url = `http://${collections_baseUrl}:${collections_port}`

// Users_ms
const users_port = process.env.USERS_PORT || 8083
const users_baseUrl = process.env.USERS_URL || 'localhost'
const users_url = `http://${users_baseUrl}:${users_port}`

// Notifications_ms
const notifications_port = process.env.NOTIFICATIONS_PORT || 8084
const notifications_baseUrl = process.env.NOTIFICATIONS_URL || 'localhost'
const notifications_url = `http://${notifications_baseUrl}:${notifications_port}`

// Comments_ms
const comments_port = process.env.COMMENTS_PORT || 8085
const comments_baseUrl = process.env.COMMENTS_URL || 'localhost'
const comments_url = `http://${comments_baseUrl}:${comments_port}`

module.exports = {
  users_url,
  recipes_url,
  comments_url,
  collections_url,
  notifications_url
}
