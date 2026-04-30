// For controlling orders during checkout

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OnlineWeb.Server.Data;
using OnlineWeb.Server.Models;

namespace OnlineWeb.Server.Controllers
{
    // ATTRIBUTES
    // attribute controlling on which adress this controller works
    [Route("api/[controller]")]
    // attribute that makes this controller better for API handling
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly AppDbContext _context;

        public OrdersController(AppDbContext context)
        {
            _context = context;
        }
        // Method for getting a list of all orders
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Order>>> GetOrders()
        {
            // We load all orders and use .Include to ensure that
            // the individual items within the order (OrderItems) are also loaded.
            return await _context.Orders
                .Include(o => o.OrderItems)
                .OrderByDescending(o => o.OrderDate) // sort by date
                .ToListAsync();
        }

        // Method for getting details of one specific order
        [HttpGet("{id}")]
        public async Task<ActionResult<Order>> GetOrder(int id)
        {
            // We will search for the order by ID and repackage the items
            var order = await _context.Orders
                .Include(o => o.OrderItems)
                .FirstOrDefaultAsync(o => o.Id == id);

            if (order == null)
            {
                return NotFound($"Objednávka s ID {id} nebyla nalezena.");
            }

            return Ok(order);
        }
        [HttpPost]
        // async - asynchronous - runs even when waiting for database to respond
        public async Task<ActionResult<Order>> CreateOrder(OrderDto orderDto)
        {
            // Making instance of order
            var order = new Order
            {
                OrderDate = DateTime.Now,
                CustomerName = orderDto.CustomerName,
                Email = orderDto.Email,
                PhoneNum = orderDto.Phone,
                // EF Core will take care of storing the Owned entity in the same Orders table
                BillingAddress = new Address
                {
                    Street = orderDto.Address.Street,
                    HouseNumber = orderDto.Address.HouseNumber,
                    City = orderDto.Address.City,
                    ZipCode = orderDto.Address.ZipCode,
                    Country = orderDto.Address.Country
                },
                TotalPrice = 0,
                OrderItems = new List<OrderItem>()
            };

            // Processing products in cart
            foreach (var item in orderDto.Items)
            {
                var product = await _context.Products
                    .Include(p => p.Stock)
                    .FirstOrDefaultAsync(p => p.Id == item.ProductId);
                if (product == null) return BadRequest($"Product with ID {item.ProductId} doesn't exist.");

                // TODO: price check in cart if the price changed in database to let customer know that the price is different then when added to the cart

                // Making item of order and freezing price
                var orderItem = new OrderItem
                {
                    ProductId = product.Id,
                    Quantity = item.Quantity,
                    PriceAtPurchase = product.Price
                };
                // calculating final price
                order.OrderItems.Add(orderItem);
                order.TotalPrice += orderItem.PriceAtPurchase * orderItem.Quantity;

                var specificStock = product.Stock.FirstOrDefault(s => s.Size == item.Size);
                // Lowering quantity of items
                if (specificStock == null)
                {
                    return BadRequest($"Bohužel, produkt {product.Name} ve velikosti {item.Size} neexistuje.");
                }

                // 3. Kontrola dostupného množství pro danou velikost
                if (specificStock.Quantity < item.Quantity)
                {
                    return BadRequest($"Bohužel, produkt {product.Name} (Velikost: {item.Size}) už není v tomto množství na skladě. Zbývá: {specificStock.Quantity} ks.");
                }
                else
                {
                    // 4. Snížení množství POUZE u dané velikosti
                    specificStock.Quantity -= item.Quantity;
                }
            }

            // saving everything to DB together
            _context.Orders.Add(order);
            await _context.SaveChangesAsync();

            return Ok(order);
        }
    }
}
