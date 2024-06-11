using System.Security.Cryptography;
using System.Text;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Helpers;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class AccountController(Context context, ITokenService tokenService) : BaseController
    {
        [HttpPost("register")] // POST: /api/account/register
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            if (await UserExists(registerDto.Email)) return BadRequest("An account related to this email does already exist!");

            using var hmac = new HMACSHA512();

            var user = new User
            {
                DateOfBirth = registerDto.DateOfBirth,
                Email = registerDto.Email.ToLower(),
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password)),
                PasswordSalt = hmac.Key,
                Surname = StringHandler.CapitalizeFirstLetter(registerDto.Surname),
                Name = StringHandler.CapitalizeFirstLetter(registerDto.Name),
                RoleId = registerDto.RoleId,
                Role = context.Roles.FirstOrDefault(x => x.Id == registerDto.RoleId)
            };

            context.Users.Add(user);
            await context.SaveChangesAsync();

            return new UserDto
            {
                DateOfBirth = user.DateOfBirth,
                Email = user.Email,
                Name = user.Name,
                Surname = user.Surname,
                Token = tokenService.CreateToken(user),
                RoleName = user.Role.Name
            };
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await context.Users.SingleOrDefaultAsync(u => u.Email.ToLower() == loginDto.Email.ToLower());

            if (user == null) return Unauthorized("Wrong email address!");

            using var hmac = new HMACSHA512(user.PasswordSalt);

            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));

            for (int i = 0; i < computedHash.Length; i++)
            {
                if (computedHash[i] != user.PasswordHash[i]) return Unauthorized("The password is invalid!");
            }

            return new UserDto
            {
                Email = user.Email,
                Name = user.Name,
                Surname = user.Surname,
                Token = tokenService.CreateToken(user),
                RoleName = context.Roles.FirstOrDefault(x => x.Id == user.RoleId).Name
            };
        }

        private async Task<bool> UserExists(string email)
        {
            return await context.Users.AnyAsync(u => u.Email.ToLower() == email.ToLower());
        }
    }
}