// these models need to be same as our models in C#

// export interface User - for future// 
export type Size = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL';
export interface ProductStock {
    size: Size;
    quantity: number;
}
export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: ProductStock[];
}

export interface Address {
    street: string;
    houseNumber: string;
    city: string;
    zipCode: string;
    country: string;
}

export interface CartItemDto {
    productId: number;
    quantity: number;
}

export interface OrderDto {
    customerName: string;
    email: string;
    billingAddress: Address;
    items: CartItemDto[];
}

