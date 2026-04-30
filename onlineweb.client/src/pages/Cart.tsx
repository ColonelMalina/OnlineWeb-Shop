import { ProductInCart } from '../components/ProductInCart';
import type { Product } from '../models/types';
import { useNavigate } from 'react-router-dom';

export const Cart = () => {
    const navigate = useNavigate();
    // TESTOVACÍ DATA: Brzy je nahradíme skutečnými daty z paměti aplikace
    const dummyProduct: Product = {
        id: 99,
        name: "Testovací Super Produkt",
        description: "Jen pro ukázku vzhledu",
        price: 500,
        quantity: 10,
        size : "L"
    };
    // DRAWING
    return (
        <div>  
            <h2>Můj košík</h2>

            <div style={{ backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '8px' }}>
                {/* Zde později použijeme funkci map() pro všechny produkty */}
                <ProductInCart product={dummyProduct} cartQuantity={2} />

                <div style={{ textAlign: 'right', marginTop: '20px' }}>
                    <h3>Celkem k úhradě: {dummyProduct.price * 2} Kč</h3>
                    <button
                        onClick={() => navigate('/checkout')}
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