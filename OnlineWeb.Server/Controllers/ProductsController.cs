using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OnlineWeb.Server.Data;
using OnlineWeb.Server.Models;

namespace OnlineWeb.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ProductsController(AppDbContext context)
        {
            _context = context;
        }


        // ENDPOINTS 

        // GET: api/Products
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> GetProducts()
        {
            // Include ensures that database loads data about size
            return await _context.Products.Include(p => p.Stock).ToListAsync();
        }

        // GET: api/Products/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            var product = await _context.Products.Include(p => p.Stock)
                .FirstOrDefaultAsync(p => p.Id == id);

            if (product == null)
            {
                return NotFound();
            }

            return product;
        }

        // POST: api/Products
        // method for making product and his stock together
        [HttpPost]
        public async Task<ActionResult<Product>> CreateProduct([FromBody] ProductCreateDto newProductDto)
        {
            if (newProductDto == null)
            {
                return BadRequest("Data produktu chybí.");
            }

            // mapping dto to data model
            var product = new Product
            {
                Name = newProductDto.Name,
                Description = newProductDto.Description,
                Price = newProductDto.Price,
                // for every item in dto make new ProductStock
                Stock = newProductDto.Stock.Select(s => new ProductStock
                {
                    Size = s.Size,
                    Quantity = s.Quantity
                }).ToList()
            };

            _context.Products.Add(product);
            await _context.SaveChangesAsync();

            // return new product with ID
            return CreatedAtAction(nameof(GetProduct), new { id = product.Id }, product);
        }
    }
}