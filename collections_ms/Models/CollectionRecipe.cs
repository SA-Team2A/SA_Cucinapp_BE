using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace CollectionMS.Models
{
	public class CollectionRecipe
	{
		[Key]
		public int ID { get; set; }

		[Range(1, int.MaxValue)]
		public int Collection_id { get; set; }
		
		[Range(1, int.MaxValue)]
		public int Recipe_id { get; set; }

		[Required(ErrorMessage = "Please enter a Name for the Recipe.")]
		[StringLength(50)]
		public string Name { get; set; }
	}
}