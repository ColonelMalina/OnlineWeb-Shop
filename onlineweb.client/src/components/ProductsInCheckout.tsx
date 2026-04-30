import type { Product } from '../models/types';

interface Props {
    products: { product: Product, quantity: number }[];
}

export const ProductsInCheckout = ({ products }: Props) => {
    const total = products.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

    return (
        <div style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px', backgroundColor: '#fcfcfc' }}>
            <h3 style={{ marginTop: 0 }}>Shrnutí objednávky</h3>
            {products.map(item => (
                <div key={item.product.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '0.9em' }}>
                    <span>{item.product.name} (x{item.quantity})</span>
                    <span>{item.product.price * item.quantity} Kč</span>
                </div>
            ))}
            <hr />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                <span>Celkem:</span>
                <span>{total} Kč</span>
            </div>
        </div>
    );
};