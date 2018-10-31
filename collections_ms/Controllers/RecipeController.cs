using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CollectionMS.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CollectionMS.Controllers
{
	[Route("/[controller]")]
	public class RecipeController: InjectedController
	{
		public RecipeController(DataContext context) : base(context) {}
	
		// Get all recipes.
		[HttpGet("")]
		public List<CollectionRecipe> GetRecipes()
		{
			return db.Recipes.ToList();
		}
	
		// Get recipe with id.
		[HttpGet("{id:int}")]
		public async Task<IActionResult> GetRecipe(int id)
		{
			var recipe = await db.Recipes.FindAsync(id);
			if (recipe == null)
			{
				return NotFound();
			}
			return Ok(recipe);
		}

		// Add new recipe to db.
		[HttpPost]
		public async Task<IActionResult> AddRecipe([FromBody] CollectionRecipe recipe)
		{
			if (!ModelState.IsValid)
			{
				return BadRequest(ModelState);
			}
			var collection = await db.Collections.FindAsync(recipe.CollectionID);
			if (collection == null)
			{
				ModelState.AddModelError("Collection ID", $"Collection {recipe.CollectionID} does not exist");
				return BadRequest(ModelState);
			}

			await db.Recipes.AddAsync(recipe);
			await db.SaveChangesAsync();
			return Ok(recipe);
		}

		// Modify a recipe.
		[HttpPut("{id:int}")]
		public async Task<IActionResult> ModifyRecipe(int id, [FromBody] CollectionRecipe recipe)
		{
			if (!ModelState.IsValid)
			{
				return BadRequest(ModelState);
			}
			
			var collection = await db.Collections.FindAsync(recipe.CollectionID);
			if (collection == null)
			{
				ModelState.AddModelError("Collection ID", $"Collection {recipe.CollectionID} does not exist");
				return BadRequest(ModelState);
			}
			
			var recipeOld = await db.Recipes.FindAsync(id);
			if (recipeOld == default(CollectionRecipe))
			{
				return NotFound();
			}
			else
			{
				recipeOld.Name = recipe.Name;
				recipeOld.CollectionID = recipe.CollectionID;
				recipeOld.RecipeID = recipe.RecipeID;
				db.Update(recipeOld);
				db.SaveChanges();
				recipe.ID = recipeOld.ID;
				return Ok(recipe);
			}
		}

		// Delete a recipe.
		[HttpDelete("{id:int}")]
		public async Task<IActionResult> DeleteRecipe(int id)
		{			
			var recipe = await db.Recipes.FindAsync(id);
			if (recipe == default(CollectionRecipe))
			{
				return NotFound();
			}
			else
			{
				db.Remove(recipe);
				db.SaveChanges();
				return Ok(recipe);
			}
		}		
	}
}