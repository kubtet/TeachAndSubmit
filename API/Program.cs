using System.Text.Json.Serialization;
using API.Data;
using API.Extensions;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
    });
builder.Services.AddApplicationServices(builder.Configuration);
builder.Services.AddIdentityServices(builder.Configuration);

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("CorsPolicy");
app.UseAuthentication();
app.UseAuthorization();

app.UseHttpsRedirection();

app.MapControllers();

using var scope = app.Services.CreateScope();
var services = scope.ServiceProvider;
var context = services.GetRequiredService<Context>();
var logger = services.GetRequiredService<ILogger<Program>>();
try
{
    await context.Database.MigrateAsync();
    await DbContextSeed.SeedAsync(context);
}
catch (Exception ex)
{
    logger.LogError(ex, "An error occured during migration");
}

app.Run();