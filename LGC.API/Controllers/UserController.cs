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
    public class UserController : ControllerBase

    {
        private readonly IUserService _userService;
        public UserController(IUserService userService)
        {
            _userService = userService;
        }
        [HttpPost]
        public async Task<IActionResult> CreateUser([FromBody] UserDto userDto)
        {
            if (userDto == null)
            {
                return BadRequest("User data is null.");
            }

            var result = await _userService.CreateUserAsync(userDto);

            if (result != null)
            {
                return Ok(result);
            }

            return BadRequest("A problem happened while handling your request.");
        }
    }
}