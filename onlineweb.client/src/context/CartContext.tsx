import { createContext, useContext, useState, type ReactNode } from 'react';
import type { Product, Size } from '../models/types';

// how items look in cart
export interface CartItem {
    product: Product;
    quantity: number;
    size: Size;
}

// DTO for data from checkout page
export interface CheckoutData {
    customerName: string;
    email: string;
    phone: string;
    street: string;
    houseNumber: string;
    city: string;
    zipCode: string;
}

// define which functions and data can our cart give to other sites
interface CartContextType {
    cartItems: CartItem[];
    addToCart: (product: Product, size: Size) => void;
    decreaseQuantity: (productId: number, size: Size) => void;
    clearCart: () => void;
    totalPrice: number;
    checkout: (customerData: CheckoutData) => Promise<void>; // Getting data from form
}

// declaring new Context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Provider - a component that "wraps" the application and provides it with data
export const CartProvider = ({ children }: { children: ReactNode }) => {
    // Here we hold state of cart
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    // method for adding stuff to the cart
    const addToCart = (product: Product, size: Size) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item.product.id === product.id && item.size === size);
            if (existingItem) {
                // if the item is there +=
                return prevItems.map(item => (item.product.id === product.id && item.size === size)
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
                );
            }
            // if not we just add it once
            return [...prevItems, { product, quantity: 1, size }];
        });
        // ADD TEMPORARY POP UP 
    };

    const decreaseQuantity = (productId: number, size: Size) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item.product.id === productId && item.size === size);

            // if there is only 1 item left in the cart and the user clicks the minus, we will delete the product completely
            if (existingItem?.quantity === 1) {
                return prevItems.filter(item => !(item.product.id === productId && item.size === size));
            }

            // else we lower the quantity by 1
            return prevItems.map(item => (item.product.id === productId && item.size === size)
                ? { ...item, quantity: item.quantity - 1 }
                : item);
        });
    };

    // clearing the cart after getting order to database
    const clearCart = () => setCartItems([]);

    // Logic for sending order to backend
    const checkout = async (customerData: CheckoutData) => {
        // mapping data from cart and form to format for OrdersController
        const orderDto = {
            customerName: customerData.customerName,
            email: customerData.email,
            phone: customerData.phone,
            address: { 
                street: customerData.street,
                houseNumber: customerData.houseNumber,
                city: customerData.city,
                zipCode: customerData.zipCode,
                country: "Česká republika"
            },
            items: cartItems.map(item => ({
                productId: item.product.id,
                quantity: item.quantity,
                size: item.size
            }))
        };

        try {
            const response = await fetch('https://localhost:7019/api/Orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(orderDto)
            });

            if (response.ok) {
                alert("Objednávka byla úspěšně vytvořena!");
                clearCart(); // clearing the cart after success 
            } else {
                const errorText = await response.text();
                alert("Chyba při objednávce: " + errorText);
            }
        } catch (error) {
            console.error("Chyba při komunikaci se serverem:", error);
            alert("Nepodařilo se spojit se serverem.");
        }
    };

    const totalPrice = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

    return (
        <CartContext.Provider value={{ cartItems, addToCart, decreaseQuantity, clearCart, totalPrice, checkout }}>
            {children}
        </CartContext.Provider>
    );
};
// helping hook so that we dont need complex imports in components
// Special comment that turns off linter warnings for the following line only
// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart musí být použit uvnitř CartProvider!");
    }
    return context;
};