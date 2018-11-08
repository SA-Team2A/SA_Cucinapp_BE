const requireSchema = require('require-graphql-file')
const schema = requireSchema('./users_schema')
const { users_url } = require('../../request/urls')
const { GET, POST, PUT, DELETE } = require('../../request')

const resolvers = {
  // Queries
  getUsers: async () => {
    return await GET(users_url, '/users')
  },
  getUserById: async ({ id }) => {
    return await GET(users_url, `/users/${id}`)
  },
  getUserByEmail: async ({ email }) => {
    return await GET(users_url, '/users/searchOne', { email })
  },
  getUsersByUsernameLike: async ({ username }) => {
    return await GET(users_url, '/users/searchMany', { username })
  },

  // Mutations
  addFollower: async ({ user_id, follower_id }) => {
    return await GET(users_url, `/users/${user_id}/addfollower/${follower_id}`)
  },
  removeFollower: async ({ user_id, follower_id }) => {
    return await GET(users_url, `/users/${user_id}/removefollower/${follower_id}`)
  },
  updateUser: async ({ id, user }) => {
    return await PUT(users_url, `/users/${id}`, user)
  },
  deleteUser: async ({ id }) => {
    return await DELETE(users_url, `/users/${id}`)
  }
}
 module.exports = { schema, resolvers }
