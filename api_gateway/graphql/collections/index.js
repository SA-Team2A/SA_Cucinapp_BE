const requireSchema = require('require-graphql-file')
const schema = requireSchema('./collections_schema')
const { collections_url } = require('../../request/urls')
const { GET, POST, PUT, DELETE } = require('../../request')

// Resolvers
const resolvers = {
	
	// Collection Resolvers	
	getCollections: async () => {
		return await GET(collections_url, "/collection/")
	},
	getCollection: async ({id}) => {
		return await GET(collections_url, `/collection/${id}`)
	},
	createCollection: async ({input}) => {
		return await POST(collections_url, "/collection/", input)
	},
	updateCollection: async ({ id, input }) => {
		return await PUT(collections_url, `/collection/${id}`, input)
	},
	deleteCollection: async ({id}) => {
		return await DELETE(collections_url, `/collection/${id}`)
	},
	
	// Recipe Resolvers
	getRecipes: async () => {
		return await GET(collections_url, "/recipe/")
	},
	getRecipe: async ({id}) => {
		return await GET(collections_url, `/recipe/${id}`)
	},
	createRecipe: async ({input}) => {
		return await POST(collections_url, "/recipe/", input)
	},
	updateRecipe: async ({ id, input }) => {
		return await PUT(collections_url, `/recipe/${id}`, input)
	},
	deleteRecipe: async ({id}) => {
		return await DELETE(collections_url, `/recipe/${id}`)
	}
}

module.exports = { schema, resolvers } // Exportar siempre con estos nombres