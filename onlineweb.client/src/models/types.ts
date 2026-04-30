// these models need to be same as our models in C#

// export interface User - for future// 
export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    quantity: number;
    size: string;
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

