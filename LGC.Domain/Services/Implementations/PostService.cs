using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using LGC.Data.Context;
using LGC.Data.DTOs;
using LGC.Data.Models;
using LGC.Domain.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace LGC.Domain.Services.Implementations
{
    public class PostService : IPostService
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public PostService(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<Post> CreatePostAsync(PostDto postDto)
        {
            var post = _mapper.Map<PostDto, Post>(postDto);
            _context.Posts.Add(post);
            await _context.SaveChangesAsync();
            return await _context.Posts.FirstOrDefaultAsync(p => p.Id == post.Id) ?? throw new Exception("Post not found");
        }

        public Task<Post?> GetPostByIdAsync(int id)
        {
            return _context.Posts.Include(x => x.Comments).Where(p => p.Id == id).FirstOrDefaultAsync();
        }

        public Task<List<Post>> GetPostsAsync()
        {
            return _context.Posts.Include(x => x.Comments).ToListAsync();
        }
    }
}