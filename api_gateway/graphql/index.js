const { buildSchema } = require('graphql')
const { mergeTypes, mergeResolvers } = require('merge-graphql-schemas')

// Importing schemas and resolvers for each microservice
const comments = require('./comments')
// Importar aqui la carpeta de su microservicio

const m_services = [comments] // Agregar aqui el nombre de la variable

module.exports = {
  schema: buildSchema(mergeTypes(m_services.map( ms => ms.schema ), { all: true })),
  rootValue: mergeResolvers(m_services.map( ms => ms.resolvers )),
  graphiql: true
}
