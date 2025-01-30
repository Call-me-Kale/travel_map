﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Models;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CountriesController : ControllerBase
    {
        private readonly ApiDbContext _context;

        public CountriesController(ApiDbContext context)
        {
            _context = context;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Country>>> GetCountries()
        {
            return await _context.Countries.ToListAsync();
        }
        [HttpGet("user_cards/{UserId}")]
        public async Task<ActionResult<IEnumerable<CountryCard>>> GetUserCountryCards(int UserId)
        {
            {
                if (UserId == 0
                    || UserId == null)
                {
                    return BadRequest("All fields (userId and Country) are required.");
                }

                var allUserCountries = await _context.UserCountryCards.Where(u => u.UserId == UserId).ToListAsync();

                if (allUserCountries == null)
                {
                    return BadRequest("User don't have any country cards!");
                }

                return allUserCountries;
            }
        }

        [HttpPost("create")]
        public async Task<ActionResult<CountryCard>> NewUserCountryCard(server.Models.CreateDto createDto)
        {
            {
                if (createDto.UserId == 0 
                    || createDto.UserId == null
                    || string.IsNullOrEmpty(createDto.Description)
                    || string.IsNullOrEmpty(createDto.Country))
                {
                    return BadRequest("All fields (userId, Country, and Description) are required.");
                }

                var allUserCountries = await _context.UserCountryCards.Where(u => u.UserId == createDto.UserId).ToListAsync();
                var isCountryInUse = allUserCountries.Any(u => u.CountryName == createDto.Country);

                if (isCountryInUse)
                {
                    return BadRequest("User already have this country!");
                }


                var countryCard = new CountryCard(
                    UserId: createDto.UserId,
                    CardDescription: createDto.Description,
                    CountryName: createDto.Country

                );

                _context.UserCountryCards.Add(countryCard);
                await _context.SaveChangesAsync();

                return Ok("Country Card Created!");
            }
        }

        [HttpPut("edit")]
        public async Task<ActionResult<CountryCard>> EditUserCountryCard(server.Models.CreateDto createDto)
        {
            {
                if (createDto.UserId == 0
                    || createDto.UserId == null
                    || string.IsNullOrEmpty(createDto.Description)
                    || string.IsNullOrEmpty(createDto.Country))
                {
                    return BadRequest("All fields (userId, Country, and Description) are required.");
                }

                var allUserCountries = await _context.UserCountryCards.Where(u => u.UserId == createDto.UserId).ToListAsync();
                var CountryInUse = allUserCountries.FirstOrDefault(u => u.CountryName == createDto.Country);

                if (CountryInUse == null)
                {
                    return BadRequest("User don't have this country!");
                }
                   
                CountryInUse.CardDescription = createDto.Description;

                await _context.SaveChangesAsync();

                return Ok("Country has been edited successfully.");
            }
        }

        [HttpDelete("delete")]
        public async Task<ActionResult<CountryCard>> DeleteUserCountryCard(server.Models.DeleteDTO createDto)
        {
            {
                if (createDto.UserId == 0
                    || createDto.UserId == null
                    || string.IsNullOrEmpty(createDto.Country))
                {
                    return BadRequest("All fields (userId and Country) are required.");
                }

                var allUserCountries = await _context.UserCountryCards.Where(u => u.UserId == createDto.UserId).ToListAsync();
                var CountryInUse = allUserCountries.FirstOrDefault(u => u.CountryName == createDto.Country);

                if (CountryInUse == null)
                {
                    return BadRequest("User don't have this country!");
                }

                _context.UserCountryCards.Remove(CountryInUse);
                await _context.SaveChangesAsync();

                return Ok(new { message = "Country has been removed successfully." });
            }
        }
    }
}
