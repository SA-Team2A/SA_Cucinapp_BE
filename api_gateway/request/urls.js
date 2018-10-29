// Variables definition

// Comments_ms
const comments_port = process.env.COMMENTS_PORT || 8085
const comments_baseUrl = process.env.COMMENTS_URL || 'localhost'
const comments_url = `http://${comments_baseUrl}:${comments_port}`

module.exports = {
  comments_url
}
