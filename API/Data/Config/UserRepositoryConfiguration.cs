using API.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace API.Data.Config
{
    public class UserRepositoryConfiguration : IEntityTypeConfiguration<UserRepository>
    {
        public void Configure(EntityTypeBuilder<UserRepository> builder)
        {
            builder.Property(u => u.Id).IsRequired();
            builder.HasKey(ur => new { ur.UserId, ur.RepositoryId });
            builder.HasOne(ur => ur.User).WithMany(u => u.UserRepositories).HasForeignKey(ur => ur.UserId).OnDelete(DeleteBehavior.Cascade);
            builder.HasOne(ur => ur.Repository).WithMany(r => r.UserRepositories).HasForeignKey(ur => ur.RepositoryId).OnDelete(DeleteBehavior.Cascade);
        }
    }
}