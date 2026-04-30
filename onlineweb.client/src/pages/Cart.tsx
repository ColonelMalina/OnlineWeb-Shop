import { ProductInCart } from '../components/ProductInCart';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

export const Cart = () => {
    const navigate = useNavigate();
    // getting data from memory
    const { cartItems, totalPrice } = useCart();
    // DRAWING
    return (
        <div>  
            <h2>Můj košík</h2>

            <div style={{ backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '8px' }}>
                {cartItems.length === 0 ? (
                    <p style={{ textAlign: 'center', color: '#666', padding: '20px 0' }}>
                        Tvůj košík je zatím prázdný.
                    </p>
                ) : (
                    // if cart is not empty go through the items and draw
                    cartItems.map((item) => (
                        <ProductInCart
                            key={item.product.id}
                            product={item.product}
                            cartQuantity={item.quantity}
                            size={item.size}
                        />
                    ))
                )}

                <div style={{ textAlign: 'right', marginTop: '20px' }}>
                    <h3>Celkem k úhradě: {totalPrice}  Kč</h3>
                    <button
                        onClick={() => navigate('/checkout')}
                        disabled={cartItems.length === 0}
                        style={{
                        padding: '10px 20px',
                        backgroundColor: '#28a745',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '1em'
                    }}>
                        Přejít k pokladně
                    </button>
                </div>
            </div>
        </div>
    );
};