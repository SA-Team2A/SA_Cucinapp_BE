using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace CollectionMS.Models
{
	public class CollectionRecipe
	{
		[Key]
		public int ID { get; set; }

		[Range(1, int.MaxValue)]
		public int CollectionID { get; set; }
		
		[Range(1, int.MaxValue)]
		public int RecipeID { get; set; }

		[Required(ErrorMessage = "Please enter a Name for the Recipe.")]
		[StringLength(50)]
		public string Name { get; set; }
	}
}