using Microsoft.EntityFrameworkCore;

namespace OnlineWeb.Server.Models
{
    [Owned] // For EFCore to know this class is owned by another entity
    public class Address
    {
        public string Street { get; set; } = string.Empty;
        public string HouseNumber { get; set; } = string.Empty;
        public string City { get; set; } = string.Empty;
        public string ZipCode { get; set; } = string.Empty;
        public string Country { get; set; } = "Česká republika"; //IS NOT DEFIDED
    }
}