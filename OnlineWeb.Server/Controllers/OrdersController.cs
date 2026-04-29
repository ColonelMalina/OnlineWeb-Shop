// For controlling orders during checkout

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OnlineWeb.Server.Data;
using OnlineWeb.Server.Models;

namespace OnlineWeb.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly AppDbContext _context;

        public OrdersController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost]
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

                // Making item of order and freezing price
                var orderItem = new OrderItem
                {
                    ProductId = product.Id,
                    Quantity = item.Quantity,
                    PriceAtPurchase = product.Price 
                };

                order.OrderItems.Add(orderItem);
                order.TotalPrice += orderItem.PriceAtPurchase * orderItem.Quantity;

                // Lowering quantity of items
                product.Quantity -= item.Quantity;
            }

            // saving everything to DB together
            _context.Orders.Add(order);
            await _context.SaveChangesAsync();

            return Ok(order);
        }
    }

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