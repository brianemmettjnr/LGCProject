using LGC.Domain.Services.Interfaces;
using LGC.Data.DTOs;
using LGC.Data.Models;
using Moq;

namespace LGC.Test;

public class UnitTests
{

    [Fact]
    public async Task CreatePostAsync_ShouldReturnPost()
    {
        // Arrange
        var mockPostService = new Mock<IPostService>();
        var postDto = new PostDto
        {
            Title = "Sample Title",
            Text = "Sample Text",
        };
        var post = new Post
        {
            Title = "Sample Title",
            Text = "Sample Text",
        };
        mockPostService.Setup(service => service.CreatePostAsync(postDto)).ReturnsAsync(post);

        // Act
        var result = await mockPostService.Object.CreatePostAsync(postDto);

        // Assert
        Assert.Equal(post, result);
    }

    [Fact]
    public async Task GetPostByIdAsync_ShouldReturnPost()
    {
        // Arrange
        var mockPostService = new Mock<IPostService>();
        var postId = 1;
        var post = new Post
        {
            Title = "Sample Title",
            Text = "Sample Text",
        };
        mockPostService.Setup(service => service.GetPostByIdAsync(postId)).ReturnsAsync(post);

        // Act
        var result = await mockPostService.Object.GetPostByIdAsync(postId);

        // Assert
        Assert.Equal(post, result);
    }

    [Fact]
    public async Task CreateCommentAsync_ShouldReturnComment()
    {
        // Arrange
        var mockCommentService = new Mock<ICommentService>();
        var commentDto = new CommentDto
        {
            PostId = 1,
            Text = "Sample Comment Text"
        };
        var comment = new Comment
        {
            Text = "Sample Comment Text",
        };
        mockCommentService.Setup(service => service.CreateCommentAsync(commentDto)).ReturnsAsync(comment);

        // Act
        var result = await mockCommentService.Object.CreateCommentAsync(commentDto);

        // Assert
        Assert.Equal(comment, result);
    }

    [Fact]
    public async Task GetCommentByIdAsync_ShouldReturnComment()
    {
        // Arrange
        var mockCommentService = new Mock<ICommentService>();
        var commentId = 1;
        var comment = new Comment
        {
            Text = "Sample Comment Text",
        };
        mockCommentService.Setup(service => service.GetCommentByIdAsync(commentId)).ReturnsAsync(comment);

        // Act
        var result = await mockCommentService.Object.GetCommentByIdAsync(commentId);

        // Assert
        Assert.Equal(comment, result);
    }
}