using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace LGC.Data.Models
{
    public class Post
    {
        public int Id { get; set; }
        [MaxLength(20)]
        public required string Title { get; set; }
        [MaxLength(100)]
        public required string Text { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now.ToUniversalTime();
        public virtual ICollection<Comment> Comments { get; set; } = new List<Comment>();
    }
}