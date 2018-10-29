const { POST } = require('../../request')
const { buildSchema } = require('graphql')
const requireSchema = require('require-graphql-file')
const schema = requireSchema('./auth')
const { users_url } = require('../../request/urls')
const { sign, verify } = require('../../authentication/jwt')

const resolvers = {
  login: async ({ input }) => {
    let res = await POST(users_url, '/login', input)
    if (res.response || !res.id) {
      return null
    }
    return await sign(res.id)
  },
  verify: async ({ jwt }) => {
    let id = await verify(jwt)
    if (id) {
      return await sign(id)
    }
    return null
  },
  createUser: async ({ input }) => {
    let res = await POST(users_url, '/users', input)
    if (res.response) {
      return res
    }
    return await sign(res._id)
  }
}

module.exports = {
  schema: buildSchema(schema),
  rootValue: resolvers,
  graphiql: true
}
