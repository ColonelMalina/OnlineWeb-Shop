using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OnlineWeb.Server.Data;
using OnlineWeb.Server.Models;

namespace OnlineWeb.Server.Controllers
{
    [Route("api/[controller]")] // Adresa bude: api/products
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly AppDbContext _context;

        // V konstruktoru si vyžádáme náš databázový kontext
        public ProductsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/products (Získá seznam všech produktů)
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> GetProducts()
        {
            return await _context.Products.ToListAsync();
        }

        // POST: api/products (Uloží nový produkt)
        [HttpPost]
        public async Task<ActionResult<Product>> PostProduct(Product product)
        {
            _context.Products.Add(product);
            await _context.SaveChangesAsync();

            return Ok(product);
        }
    }
}