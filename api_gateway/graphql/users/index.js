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
  addFollower: async ({ user_id, follower_id }) => {
    return await GET(users_url, `/users/${user_id}/addfollower/${follower_id}`)
  },
  removeFollower: async ({ user_id, follower_id }) => {
    return await GET(users_url, `/users/${user_id}/removefollower/${follower_id}`)
  },

  // Mutations
  createUser: async ({ user }) => {
    return await POST(users_url, `/users`, { user: user })
  },
  // searchRecipes: async ({ search }) => {
  //   let res = await GET(recipes_url, '/recipes', search)
  //   return res
  // },
  updateUser: async ({ id, user }) => {
    return await PUT(users_url, `/users/${id}`, user)
  },
  deleteUser: async ({ id }) => {
    return await DELETE(users_url, `/users/${id}`)
  },

  login: async ({ loginInput }) => {
    return await POST(users_url, `/login`, loginInput)
  }
}
 module.exports = { schema, resolvers }
