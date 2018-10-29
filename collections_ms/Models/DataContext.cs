using Microsoft.EntityFrameworkCore;

namespace CollectionMS.Models
{
	public class DataContext: DbContext
	{
		public DbSet<Collection> Collections { get; set; }

		public DbSet<CollectionRecipe> Recipes { get; set; }

		public DataContext(DbContextOptions options): base(options) { }
	}
}