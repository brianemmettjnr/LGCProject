using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LGC.Data.DTOs
{
    public class PostDto
    {
        public required string Title { get; set; }
        public required string Text { get; set; }
    }
}