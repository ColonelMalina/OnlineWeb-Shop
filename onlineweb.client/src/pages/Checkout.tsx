import { OrderInfo } from '../components/OrderInfo';
import { ProductsInCheckout } from '../components/ProductsInCheckout';

export const Checkout = () => {
    // Testdummy
    const tempCart = [
        { product: { id: 1, name: "Tričko", price: 300, description: "", quantity: 10, size : "M" }, quantity: 2 }
    ];

    return (
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '40px', marginTop: '20px' }}>
            <OrderInfo />
            <div>
                <ProductsInCheckout products={tempCart} />
                <button style={{
                    width: '100%',
                    marginTop: '20px',
                    padding: '15px',
                    backgroundColor: '#28a745',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    fontWeight: 'bold',
                    cursor: 'pointer'
                }}>
                    Odeslat objednávku
                </button>
            </div>
        </div>
    );
};