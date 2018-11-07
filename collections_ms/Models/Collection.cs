using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace CollectionMS.Models
{
	public class Collection
	{
		[Key]
		public int ID { get; set; }
		
		[Range(1, int.MaxValue)]
		public int UserID { get; set; }

		[Required(ErrorMessage = "Please enter a Name for the Collection.")]
		[StringLength(50)]
		public string Name { get; set; }
	}
}