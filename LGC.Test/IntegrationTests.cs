using LGC.Data.DTOs;
using LGC.Data.Models;
using Testcontainers.PostgreSql;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;
using LGC.Data.Context;
using LGC.Domain.Services;
using LGC.Domain.Services.Interfaces;
using LGC.Domain.Services.Implementations;
using AutoMapper;
using LGC.Data;

namespace LGC.Test;

public class IntegrationTests : IAsyncLifetime
{
    private readonly PostgreSqlContainer _postgreSqlContainer;
    private readonly ServiceProvider _serviceProvider;

    public IntegrationTests()
    {
        _postgreSqlContainer = new PostgreSqlBuilder()
            .WithDatabase("testdb")
            .WithUsername("postgres")
            .WithPassword("password")
            .Build();

        var services = new ServiceCollection();
        services.AddDbContext<ApplicationDbContext>(options =>
            options.UseNpgsql(_postgreSqlContainer.GetConnectionString()));
        services.AddScoped<IPostService, PostService>();
        services.AddScoped<ICommentService, CommentService>();
        //Automapper profile for DTOS 
        var mapperConfig = new MapperConfiguration(mc =>
        {
            mc.AddProfile(new MappingProfile());
        });
        var mapper = mapperConfig.CreateMapper();
        services.AddSingleton(mapper);
        _serviceProvider = services.BuildServiceProvider();
    }

    public async Task InitializeAsync()
    {
        await _postgreSqlContainer.StartAsync();
        using var scope = _serviceProvider.CreateScope();
        var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
        await context.Database.EnsureCreatedAsync();

        if (!await context.Posts.AnyAsync(p => p.Id == 1))
        {
            context.Posts.Add(new Post { Title = "Test Post", Text = "Test Post Text" });
            await context.SaveChangesAsync();
        }
    }

    public async Task DisposeAsync()
    {
        await _postgreSqlContainer.StopAsync();
        await _postgreSqlContainer.DisposeAsync();
    }

    [Fact]
    public async Task CreatePostAsync_ShouldPersistPost()
    {
        using var scope = _serviceProvider.CreateScope();
        var postService = scope.ServiceProvider.GetRequiredService<IPostService>();
        var postDto = new PostDto { Title = "Integration Test", Text = "Integration Test Text" };

        var post = await postService.CreatePostAsync(postDto);

        Assert.NotNull(post);
        Assert.Equal("Integration Test", post.Title);
    }

    [Fact]
    public async Task CreateCommentAsync_ShouldPersistComment()
    {
        using var scope = _serviceProvider.CreateScope();
        var commentService = scope.ServiceProvider.GetRequiredService<ICommentService>();
        var commentDto = new CommentDto { PostId = 1, Text = "Integration Test Comment" };

        var comment = await commentService.CreateCommentAsync(commentDto);

        Assert.NotNull(comment);
        Assert.Equal("Integration Test Comment", comment.Text);
    }
}
