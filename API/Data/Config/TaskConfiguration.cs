using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace API.Data.Config
{
    public class TaskConfiguration : IEntityTypeConfiguration<Entities.Task>
    {
        public void Configure(EntityTypeBuilder<Entities.Task> builder)
        {
            builder.Property(t => t.Id).IsRequired();
            builder.Property(t => t.Name).IsRequired().HasMaxLength(50);
            builder.Property(t => t.DeadlineDate).IsRequired().HasMaxLength(50);
            builder.HasOne(t => t.Repository).WithMany().HasForeignKey(t => t.RepositoryId).OnDelete(DeleteBehavior.Cascade);
        }
    }
}