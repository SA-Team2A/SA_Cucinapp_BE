using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CollectionMS.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CollectionMS.Controllers
{
	[Route("/[controller]")]
	public class CollectionController: InjectedController
	{
		public CollectionController(DataContext context) : base(context) { }
		
		// Get all collections.
		[HttpGet("")]
		public List<Collection> GetCollections()
		{
			return db.Collections.ToList();
		}
		
		// Get collection with given id.
		[HttpGet("{id:int}")]
		public async Task<IActionResult> GetCollection(int id)
		{
			var collection = await db.Collections.FindAsync(id);
			if (collection == default(Collection))
			{
				return NotFound();
			}
			return Ok(collection);
		}
		
		// Get collections with given user_id.
		[HttpGet("user/{userID:int}")]
		public List<Collection> GetCollectionByUser(int userID)
		{
			List<Collection> collections = db.Collections.ToList();
			List<Collection> userCollections = new List<Collection>();
			
			foreach (Collection collection in collections)
			{
				if (collection.User_id == userID)
				{
					userCollections.Add(collection);
				}
			}
			
			return userCollections;
		}
		
		// Get collection with given name from a user with given user_id.
		[HttpGet("user/{userID:int}/{name}")]
		public List<CollectionRecipe> GetCollectionByName(int userID, string name)
		{
			List<Collection> collections = db.Collections.ToList();
			List<CollectionRecipe> recipes = db.Recipes.ToList();
			
			List<Collection> userCollections = new List<Collection>();
			List<CollectionRecipe> userRecipes = new List<CollectionRecipe>();
			
			foreach (Collection collection in collections)
			{
				if (collection.User_id == userID && collection.Name == name)
				{
					foreach (CollectionRecipe recipe in recipes)
					{
						if (recipe.Collection_id == collection.ID)
						{
							userRecipes.Add(recipe);
						}
					}
				}
			}
			
			return userRecipes;
		}

		// Add a collection to db.
		[HttpPost]
		public async Task<IActionResult> AddCollection([FromBody] Collection collection)
		{
			if (!ModelState.IsValid)
			{
				return BadRequest(ModelState);
			}
			await db.AddAsync(collection);
			await db.SaveChangesAsync();
			return Ok(collection);
		}

		// Modify a collection.
		[HttpPut("{id:int}")]
		public async Task<IActionResult> ModifyCollection(int id, [FromBody] Collection collection)
		{	
			if (!ModelState.IsValid)
			{
				return BadRequest(ModelState);
			}

			var collectionOld = await db.Collections.FindAsync(id);
			if (collectionOld == default(Collection))
			{
				return NotFound();
			}
			else
			{
				collectionOld.User_id = collection.User_id;
				collectionOld.Name = collection.Name;
				db.Update(collectionOld);
				db.SaveChanges();
				collection.ID = collectionOld.ID;
				return Ok(collection);
			}
		}

		// Delete a collection.
		[HttpDelete("{id:int}")]
		public async Task<IActionResult> DeleteCollection(int id)
		{			
			var collection = await db.Collections.FindAsync(id);
			if (collection == default(Collection))
			{
				return NotFound();
			}
			else
			{
				db.Remove(collection);
				db.SaveChanges();
				return Ok(collection);
			}
		}
	}
    
	// Helper class to take care of db context injection.
	public class InjectedController: ControllerBase
	{
		protected readonly DataContext db;

		public InjectedController(DataContext context)
		{
			db = context;
		}
	}
}