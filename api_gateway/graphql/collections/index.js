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
	getMyCollections: async (args, context, info) => {
		let user_id = context.user.id
		return await GET(collections_url, `/collection/user/${user_id}`)
	},
	getCollectionById: async ({ id }) => {
		return await GET(collections_url, `/collection/${id}`)
	},
	getCollectionsByUserId: async ({ user_id }) => {
		return await GET(collections_url, `/collection/user/${user_id}`)
	},
	getRecipeByName: async ({ user_id, name }) => {
		return await GET(collections_url, `/collection/user/${user_id}/${name}`)
	},
	createCollection: async ({ input }) => {
		return await POST(collections_url, "/collection/", input)
	},
	updateCollection: async ({ id, input }) => {
		return await PUT(collections_url, `/collection/${id}`, input)
	},
	deleteCollection: async ({ id }) => {
		return await DELETE(collections_url, `/collection/${id}`)
	},

	// Recipe Resolvers
	getCollectionRecipes: async () => {
		return await GET(collections_url, "/recipe/")
	},
	getCollectionRecipeById: async ({ id }) => {
		return await GET(collections_url, `/recipe/${id}`)
	},
	addToCollection: async ({ input }) => {
		return await POST(collections_url, "/recipe/", input)
	},
	updateCollectionRecipe: async ({ id, input }) => {
		return await PUT(collections_url, `/recipe/${id}`, input)
	},
	removeFromCollection: async ({ id }) => {
		return await DELETE(collections_url, `/recipe/${id}`)
	}
}

module.exports = { schema, resolvers } // Exportar siempre con estos nombres
