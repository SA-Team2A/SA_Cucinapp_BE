using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using CollectionMS.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using MySql.Data.MySqlClient;

namespace CollectionMS
{
	public class Startup
	{
		private readonly IConfiguration _config;

		private readonly string _connectionString;

		public Startup(IConfiguration config)
		{
			_config = config;
			_connectionString = $@"Server={_config["MYSQL_SERVER_NAME"]}; Database={_config["MYSQL_DATABASE"]}; Uid={_config["MYSQL_USER"]}; Pwd={_config["MYSQL_PASSWORD"]}";
		}

		public void ConfigureServices(IServiceCollection services)
		{
			WaitForDBInit(_connectionString);
			services.AddDbContext<DataContext>(ops => ops.UseMySql(_connectionString));
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

		// Try to connect to the db with exponential backoff on fail.
		private static void WaitForDBInit(string connectionString)
		{
			var connection = new MySqlConnection(connectionString);
			int retries = 1;
			while (retries < 7)
			{
				try
				{
					Console.WriteLine("Conectando a db. Intento: {0}", retries);
					connection.Open();
					connection.Close();
					break;
				}
				catch (MySqlException)
				{
					Thread.Sleep((int) Math.Pow(2, retries) * 1000);
					retries++;
				}
			}
		}
	}
}