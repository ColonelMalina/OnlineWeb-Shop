import { useCart } from '../context/CartContext';
import type { Product, Size } from '../models/types';

interface ProductInCartProps {
    product: Product;
    cartQuantity: number;
    size: Size;
}

export const ProductInCart = ({ product, cartQuantity, size }: ProductInCartProps) => {
    // declaring for use of functions that add and decrease items in cart
    const { addToCart, decreaseQuantity } = useCart();

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '1px solid #ccc',
            padding: '15px 0'
        }}>
            {/* name and price on left */}
            <div style={{ flex: 1 }}>
                <h4 style={{ margin: '0 0 5px 0' }}>{product.name}</h4>
                <p style={{ margin: 0, color: '#666', fontSize: '0.9em' }}>{product.price} Kč / ks</p>
            </div>

            {/* handle amount in centre */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginRight: '20px' }}>
                <button
                    onClick={() => decreaseQuantity(product.id, size)}
                    style={buttonStyle}
                >
                    -
                </button>

                <span style={{ fontWeight: 'bold', width: '20px', textAlign: 'center' }}>
                    {cartQuantity}
                </span>
                <span style={{ fontWeight: 'bold', width: '20px', textAlign: 'center' }}>
                    {size}
                </span>

                <button
                    onClick={() => addToCart(product, size)}
                    style={buttonStyle}
                >
                    +
                </button>
            </div>

            {/* total price on right side */}
            <div style={{ fontWeight: 'bold', fontSize: '1.1em', width: '100px', textAlign: 'right' }}>
                {product.price * cartQuantity} Kč
            </div>
        </div>
    );
};

// Button
const buttonStyle = {
    padding: '5px 12px',
    backgroundColor: '#007BFF',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '1.2em'
};