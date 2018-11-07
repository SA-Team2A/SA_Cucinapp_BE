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
				collectionOld.UserID = collection.UserID;
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