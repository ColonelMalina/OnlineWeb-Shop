import { useState } from 'react'; // 1. IMPORT: Přidáme useState pro pamatování velikosti
import { useCart } from '../context/CartContext';
import type { Product, Size } from '../models/types'; // Přidán import Size

interface ProductCardProps {
    product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
    const { addToCart } = useCart();

    // SIZE STATUS: This is where we remember what the user has selected. Default is M
    const [selectedSize, setSelectedSize] = useState<Size>('M');

    // We can prepare an array of available sizes for easier rendering
    const availableSizes: Size[] = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

    // DRAWING
    return (
        <div style={{
            border: '1px solid #eee',
            padding: '20px',
            borderRadius: '8px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px'
        }}>
            <h3 style={{ margin: 0 }}>{product.name}</h3>
            <p style={{ color: '#555', fontSize: '0.9em', flexGrow: 1 }}>{product.description}</p>
            <div style={{ fontSize: '1.2em', fontWeight: 'bold' }}>{product.price} Kč</div>

            { /*SIZE SELECTION: New selection section */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '10px' }}>
                <label htmlFor={`size-${product.id}`} style={{ fontWeight: 'bold' }}>Velikost:</label>
                <select
                    id={`size-${product.id}`}
                    value={selectedSize}
                    onChange={(e) => setSelectedSize(e.target.value as Size)} 
                    style={{ padding: '5px', borderRadius: '4px', border: '1px solid #ccc' }}
                >
                    {availableSizes.map(size => (
                        <option key={size} value={size}>{size}</option>
                    ))}
                </select>
            </div>

            {/*FIXED BUTTON: We now ship the product AND the selected size AT THE SAME TIME*/ }
            <button
                onClick={() => addToCart(product, selectedSize)}
                style={{
                    padding: '10px',
                    backgroundColor: '#007BFF',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    marginTop: '10px'
                }}
            >
                Přidat do košíku
            </button>
        </div>
    );
};