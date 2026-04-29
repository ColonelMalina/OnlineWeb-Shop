using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace OnlineWeb.Server.Models
{
    public class OrderItem
    {
        public int Id { get; set; }
        public DateTime OrderDate { get; set; } = DateTime.Now;
        // foreign keys
        public int OrderId { get; set; }
        public int ProductId { get; set; }

        public int Quantity { get; set; }

        // for setting price in order if it changes in future
        [Precision (18,2)]
        public decimal PriceAtPurchase { get; set; }
        [JsonIgnore]
        public Order? Order { get; set; }
        public Product? Product { get; set; }
    }
}
