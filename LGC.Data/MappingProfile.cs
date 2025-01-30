using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using LGC.Data.DTOs;
using LGC.Data.Models;

namespace LGC.Data
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Post, PostDto>().ReverseMap(); ;
            CreateMap<User, UserDto>().ReverseMap(); ;
            CreateMap<Comment, CommentDto>().ReverseMap();
        }
    }
}