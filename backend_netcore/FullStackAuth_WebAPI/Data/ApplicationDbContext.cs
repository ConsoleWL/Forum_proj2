using FullStackAuth_WebAPI.Configuration;
using FullStackAuth_WebAPI.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace FullStackAuth_WebAPI.Data
{
    public class ApplicationDbContext : IdentityDbContext<User>
    {
        public DbSet<Car> Cars { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<User> Users{ get; set; }
        public DbSet<Topic> Topics { get; set; }
        public DbSet<DirectMessage> DirectMessages { get; set; }

        public ApplicationDbContext(DbContextOptions options)
    : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.ApplyConfiguration(new RolesConfiguration());

            modelBuilder.Entity<DirectMessage>()
                    .HasOne(m => m.FromUser)
                    .WithMany(t => t.DirectMessagesFrom)
                    .HasForeignKey(m => m.FromUserId);


            modelBuilder.Entity<DirectMessage>()
                        .HasOne(m => m.ToUser)
                        .WithMany(t => t.DirectMessagesTo)
                        .HasForeignKey(m => m.ToUserId);
        }
    }
}
