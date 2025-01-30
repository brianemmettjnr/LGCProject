using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LGC.Data.DTOs;
using LGC.Data.Models;

namespace LGC.Domain.Services.Interfaces
{
    public interface ICommentService
    {
        Task<Comment> CreateCommentAsync(CommentDto commentDto);
        Task<List<Comment>> GetAllCommentsAsync();
        Task<List<Comment>> GetCommentsByTripIdAsync(int tripId);
        Task<Comment?> GetCommentByIdAsync(int id);
    }
}