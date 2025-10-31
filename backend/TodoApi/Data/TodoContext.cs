using Microsoft.EntityFrameworkCore;
using TodoApi.Models;

namespace TodoApi.Data
{
    public class TodoContext : DbContext
    {
        public TodoContext(DbContextOptions<TodoContext> options) : base(options)
        {
        }

        public DbSet<Todo> Todos { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configure Todo entity
            modelBuilder.Entity<Todo>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Title).IsRequired().HasMaxLength(200);
                entity.Property(e => e.Description).HasMaxLength(1000);
                entity.Property(e => e.IsCompleted).HasDefaultValue(false);
                entity.Property(e => e.CreatedAt).HasDefaultValueSql("datetime('now')");
            });

            // Seed some initial data
            modelBuilder.Entity<Todo>().HasData(
                new Todo
                {
                    Id = 1,
                    Title = "Learn React.js",
                    Description = "Complete the React.js tutorial and build a sample project",
                    IsCompleted = false,
                    CreatedAt = DateTime.UtcNow
                },
                new Todo
                {
                    Id = 2,
                    Title = "Build ASP.NET Core API",
                    Description = "Create a RESTful API using ASP.NET Core and Entity Framework",
                    IsCompleted = true,
                    CreatedAt = DateTime.UtcNow.AddDays(-1)
                },
                new Todo
                {
                    Id = 3,
                    Title = "Deploy to Production",
                    Description = "Deploy the full-stack application to a cloud provider",
                    IsCompleted = false,
                    CreatedAt = DateTime.UtcNow.AddHours(-2)
                }
            );
        }
    }
}
