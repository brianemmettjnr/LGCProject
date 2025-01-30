using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using LGC.Data.Context;
using LGC.Data.DTOs;
using LGC.Data.Models;
using LGC.Domain.Services.Interfaces;

namespace LGC.Domain.Services.Implementations
{

    public class UserService : IUserService
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;
        public UserService(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<User> CreateUserAsync(UserDto userDto)
        {
            var user = _mapper.Map<UserDto, User>(userDto);
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return user;
        }
    }
}