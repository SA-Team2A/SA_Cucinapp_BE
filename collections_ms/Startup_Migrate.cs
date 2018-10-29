using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CollectionMS.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using MySql.Data.MySqlClient;

namespace CollectionMS
{
	// Change class name to use apropriately
	//public class Startup
	public class StartupMigration
	{
		public void ConfigureServices(IServiceCollection services)
		{
			services.AddDbContext<DataContext>(ops => ops.UseMySql(@"Server=192.168.99.100; Database=Collections; Uid=user_name_1; Pwd=my-secret-pw"));
			services.AddMvc();
		}

		public void Configure(IApplicationBuilder app, IHostingEnvironment env, DataContext context)
		{
			if (env.IsDevelopment())
			{
				app.UseDeveloperExceptionPage();
			}
			context.Database.Migrate();
			app.UseMvc();
		}
	}
}