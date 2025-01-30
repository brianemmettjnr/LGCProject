using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LGC.Data.Models;
using Microsoft.EntityFrameworkCore;

namespace LGC.Data.Context
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Comment> Comments { get; set; }
        public DbSet<Post> Posts { get; set; }
        public DbSet<User> Users { get; set; }

    }
}