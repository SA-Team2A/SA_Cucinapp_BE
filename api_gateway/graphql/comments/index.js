const requireSchema = require('require-graphql-file')
const schema = requireSchema('./comments_schema')
const { comments_url } = require('../../request/urls')
const { GET, POST, PUT, DELETE } = require('../../request')

// Resolvers
const resolvers = {
  getComments: async () => {
    let res = await GET(comments_url, '/comments')
    return res.comments
  },
  getCommentById: async ({ _id }) => {
    return await GET(comments_url, `comments/${_id}`)
  },
  getCommentsByUserId: async ({ user_id }) => {
    let res = await GET(comments_url, `comments?user_id=${user_id}`)
    return res.comments
  },
  getCommentsByRecipeId: async ({ recipe_id }) => {
    let res = await GET(comments_url, `comments?recipe_id=${recipe_id}`)
    return res.comments
  },
  getCommentsByRecipeIdAndUserId: async ({ user_id, recipe_id }) => {
    let res = await GET(comments_url, `comments?recipe_id=${recipe_id}&user_id=${user_id}`)
    return res.comments
  },
  createComment: async ({ comment }) => {
    return await POST(comments_url, 'comments', comment)
  },
  updateComment: async ({ _id, comment }) => {
    return await PUT(comments_url, `comments/${_id}`, {comment})
  },
  deleteComment: async ({ _id }) => {
    return await DELETE(comments_url, `comments/${_id}`)
  }
}

module.exports = { schema, resolvers } // Exportar siempre con estos nombres
