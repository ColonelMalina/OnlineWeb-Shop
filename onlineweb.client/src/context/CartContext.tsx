import { createContext, useContext, useState, type ReactNode } from 'react';
import type { Product, Size } from '../models/types';

// how items look in cart
export interface CartItem {
    product: Product;
    quantity: number;
    size: Size;
}

// define which functions and data can our cart give to other sites
interface CartContextType {
    cartItems: CartItem[];
    addToCart: (product: Product, size: Size) => void;
    decreaseQuantity: (productId: number, size: Size) => void;
    clearCart: () => void;
    totalPrice: number;
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
            const existingItem = prevItems.find(item => item.product.id === product.id);
            if (existingItem) {
                // if the item is there +=
                return prevItems.map(item => (item.product.id === product.id && item.size === size)
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            // if not we just add it once
            return [...prevItems, { product, quantity: 1, size}];
        });
    };

    const decreaseQuantity = (productId: number, size: Size) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item.product.id === productId && item.size === size);

            // Pokud je v košíku už jen 1 kus a uživatel klikne na mínus, produkt úplně vymažeme
            if (existingItem?.quantity === 1) {
                return prevItems.filter(item => !(item.product.id === productId && item.size === size));
            }

            // Jinak jen snížíme množství o 1
            return prevItems.map(item => (item.product.id === productId && item.size === size)
                    ? { ...item, quantity: item.quantity - 1 }
                    : item );
        });
    };
    // clearing the cart after getting order to database
    const clearCart = () => setCartItems([]);

    // 
    const totalPrice = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

    return (
        <CartContext.Provider value={{ cartItems, addToCart, decreaseQuantity, clearCart, totalPrice }}>
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