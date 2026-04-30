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
        // TODO: [HttpGet] - for future to have method of getting orders data from server on frontend
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
                BillingAddress = orderDto.BillingAddress, 
                TotalPrice = 0 
            };

            // Processing products in cart
            foreach (var item in orderDto.Items)
            {
                var product = await _context.Products.FindAsync(item.ProductId);
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

                // Lowering quantity of items
                if (product.Quantity < item.Quantity)
                {
                    return BadRequest($"Bohužel, produkt {product.Name} už není v tomto množství na skladě. Zbývá: {product.Quantity}ks.");
                }
                else
                {
                    product.Quantity -= item.Quantity;
                }
            }

            // saving everything to DB together
            _context.Orders.Add(order);
            await _context.SaveChangesAsync();

            return Ok(order);
        }
    }
    // DTO - Data Transfer Object
    // Helping class for data from React
    public class OrderDto
    {
        public string CustomerName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public Address BillingAddress { get; set; } = new();
        public List<CartItemDto> Items { get; set; } = new();
    }

    public class CartItemDto
    {
        public int ProductId { get; set; }
        public int Quantity { get; set; }
    }
}