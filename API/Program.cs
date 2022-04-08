using API.Data;
using Microsoft.EntityFrameworkCore;
using System;

var builder = WebApplication.CreateBuilder(args);
string connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
// Add services to the container.
builder.Services.AddTransient<DataSeeder>();
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<Context>(opt => {
    opt.UseNpgsql(connectionString);
});
builder.Services.AddCors();
var app = builder.Build();
if(args.Length == 1 && args[0].ToLower() == "seeddata")
{
    SeedData(app);
}
void SeedData (IHost app)
{
    var scopedFactory = app.Services.GetService<IServiceScopeFactory>();
    using(var scope = scopedFactory.CreateScope())
    {
        var service = scope.ServiceProvider.GetService<DataSeeder>();
        service.Seed();
    }
}
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


app.UseHttpsRedirection();
app.UseCors(opt =>{
    opt.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:3000");

});
app.UseAuthorization();

app.MapControllers();

app.Run();
