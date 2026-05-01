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
            // Include zajistí, že se z databáze načtou i data o velikostech (Stock)
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
        // Tato metoda vytvoří produkt i jeho skladové zásoby najednou
        [HttpPost]
        public async Task<ActionResult<Product>> CreateProduct([FromBody] ProductCreateDto newProductDto)
        {
            if (newProductDto == null)
            {
                return BadRequest("Data produktu chybí.");
            }

            // Mapování z DTO na databázový model
            var product = new Product
            {
                Name = newProductDto.Name,
                Description = newProductDto.Description,
                Price = newProductDto.Price,
                // Pro každou položku v DTO seznamu vytvoříme nový ProductStock
                Stock = newProductDto.Stock.Select(s => new ProductStock
                {
                    Size = s.Size,
                    Quantity = s.Quantity
                }).ToList()
            };

            _context.Products.Add(product);
            await _context.SaveChangesAsync();

            // Vrátíme nově vytvořený produkt (včetně jeho Id, které přidělilo SQL)
            return CreatedAtAction(nameof(GetProduct), new { id = product.Id }, product);
        }
    }
}