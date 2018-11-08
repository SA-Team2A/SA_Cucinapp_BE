const { buildSchema } = require('graphql')
const { mergeTypes, mergeResolvers } = require('merge-graphql-schemas')

// Importing schemas and resolvers for each microservices
const users = require('./users')
const recipes = require('./recipes')
const comments = require('./comments')
const collections = require('./collections')

const m_services = [/*users,*/ recipes, comments, collections]

module.exports = {
  schema: buildSchema(mergeTypes(m_services.map( ms => ms.schema ), { all: true })),
  rootValue: mergeResolvers(m_services.map( ms => ms.resolvers )),
  graphiql: true
}
