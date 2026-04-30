import type { Product } from '../models/types';
// props to know what parameters this component needs
interface ProductCardProps {
    product: Product;
    onAddToCart: (product: Product) => void; 
}

export const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
    // variable that defines if the product is in stock
    const isOutOfStock = product.quantity <= 0;

    // DRAWING
    return (
        <div style={{
            border: '1px solid #ddd',
            padding: '16px',
            borderRadius: '8px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px'
        }}>
            <h3 style={{ margin: 0 }}>{product.name}</h3>
            <p style={{ margin: 0, color: '#555' }}>{product.description}</p>
            <strong style={{ fontSize: '1.2em' }}>{product.price} Kč</strong>

            <span style={{ color: isOutOfStock ? 'red' : 'green', fontWeight: 'bold' }}>
                {isOutOfStock ? 'Vyprodáno' : `Skladem: ${product.quantity} ks`}
            </span>

            <button
                onClick={() => onAddToCart(product)}
                disabled={isOutOfStock}
                style={{
                    padding: '10px',
                    backgroundColor: isOutOfStock ? '#ccc' : '#007BFF',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: isOutOfStock ? 'not-allowed' : 'pointer'
                }}
            >
                Přidat do košíku
            </button>
        </div>
    );
};