using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LGC.Data.DTOs;
using LGC.Domain.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LGC.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CommentController(ICommentService commentService) : ControllerBase

    {
        private readonly ICommentService _commentService = commentService;

        [HttpPost]
        public async Task<IActionResult> CreateComment([FromBody] CommentDto commentDto)
        {
            if (commentDto == null)
            {
                return BadRequest("Comment data is null.");
            }

            var result = await _commentService.CreateCommentAsync(commentDto);
            if (result == null)
            {
                return StatusCode(500, "A problem happened while handling your request.");
            }
            return CreatedAtAction(nameof(GetComment), new { id = result.Id }, result);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetComment(int id)
        {
            var comment = await _commentService.GetCommentByIdAsync(id);
            if (comment == null)
            {
                return NotFound("Comment not found.");
            }
            return Ok(comment);
        }

        [HttpGet]
        public async Task<IActionResult> ListComments()
        {
            var comments = await _commentService.GetAllCommentsAsync();
            return Ok(comments);
        }
    }
}