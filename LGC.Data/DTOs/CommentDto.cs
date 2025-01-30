using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LGC.Data.DTOs
{
    public class CommentDto
    {
        public required int PostId { get; set; }
        public required int UserId { get; set; }
        public required string Text { get; set; }
    }
}