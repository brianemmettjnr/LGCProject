using System;
using System.Collections.Generic;
using System.IO.Compression;
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
    public class CommentService : ICommentService
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;
        public CommentService(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<Comment> CreateCommentAsync(CommentDto commentDto)
        {
            var comment = _mapper.Map<CommentDto, Comment>(commentDto);
            _context.Comments.Add(comment);
            await _context.SaveChangesAsync();
            return _context.Comments.FirstOrDefault(c => c.Id == comment.Id) ?? throw new Exception("Comment not found");
        }

        public Task<List<Comment>> GetCommentsByTripIdAsync(int postId)
        {
            return _context.Comments.Where(c => c.PostId == postId).ToListAsync();
        }
        public Task<List<Comment>> GetAllCommentsAsync()
        {
            return _context.Comments.ToListAsync();
        }
        public Task<Comment?> GetCommentByIdAsync(int id)
        {
            return _context.Comments.Where(c => c.Id == id).FirstOrDefaultAsync();
        }
    }
}