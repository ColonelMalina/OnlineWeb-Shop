using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace OnlineWeb.Server.Models
{
    public class Order
    {
        public int Id { get; set; }

        public DateTime OrderDate { get; set; } = DateTime.Now;

        [Required]
        public string CustomerName { get; set; } = string.Empty;

        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;
        public string PhoneNum { get; set; } = string.Empty;

        // can be added later 
        // public Address ShippingAddress { get; set; } = new Address();
        [Required]
        public Address BillingAddress { get; set; } = new Address();
        [Precision(18, 2)]
        public decimal TotalPrice { get; set; }

        // for EF to know that order has more OrderItems
        public List<OrderItem> OrderItems { get; set; } = new();
    }
}