using System.Text.Json.Serialization;
namespace OnlineWeb.Server.Models
{
    public class ProductStock
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public string Size { get; set; } = string.Empty;
        public int Quantity { get; set; }
        [JsonIgnore]
        public Product? Product { get; set; }
    }
}