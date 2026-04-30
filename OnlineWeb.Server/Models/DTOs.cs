// DTO - Data Transfer Object
// Helping class for data from React
using Microsoft.AspNetCore.Mvc;
using OnlineWeb.Server.Data;
using OnlineWeb.Server.Models;

public class OrderDto
{
    public string CustomerName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public int Phone { get; set; }
    public Address Address { get; set; } = new Address();
    public List<CartItemDto> Items { get; set; } = new();
}

public class CartItemDto
{
    public int ProductId { get; set; }
    public int Quantity { get; set; }
    public string Size { get; set; } = string.Empty;
}
public class ProductCreateDto
{
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
        
    public decimal Price { get; set; }
    // list of items we want to add
    public List<StockCreateDto> Stock { get; set; } = new List<StockCreateDto>();
}
 public class StockCreateDto
 {
    public string Size { get; set; } = string.Empty;
    public int Quantity { get; set; }
 }
