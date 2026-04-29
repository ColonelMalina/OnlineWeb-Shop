using Microsoft.EntityFrameworkCore;
using OnlineWeb.Server.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
// calling for database                                 // calling for adress in appsettings.json
builder.Services.AddDbContext<AppDbContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

var app = builder.Build();

// for sending files to frontend 
app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.
// Open Swagger only if developer
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
// to secure connection from http to https
app.UseHttpsRedirection();

// for future authorization of users
app.UseAuthorization();

// for using Controllers
app.MapControllers();

// fallback method for user to not get 404 error when refreshing the site
// redirects the responsibility of loading the right site to frontend
app.MapFallbackToFile("/index.html");

app.Run();
