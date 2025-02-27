using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LGC.Data.DTOs;
using LGC.Data.Models;

namespace LGC.Domain.Services.Interfaces
{
    public interface IPostService
    {
        Task<Post> CreatePostAsync(PostDto postDto);
        Task<Post?> GetPostByIdAsync(int id);
        Task<List<Post>> GetPostsAsync();
    }
}