using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LGC.Data.Models
{
    public class User
    {
        public int Id { get; set; }
        public required string Username { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now.ToUniversalTime();
    }
}