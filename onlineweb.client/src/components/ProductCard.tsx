import { useState } from 'react'; // 1. IMPORT: Přidáme useState pro pamatování velikosti
import { useCart } from '../context/CartContext';
import type { Product, Size } from '../models/types'; // Přidán import Size
import { Link } from 'react-router-dom';
interface ProductCardProps {
    product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
    const { addToCart } = useCart();

    // logic for default size - we find the first size that has more than 0 pieces
    const firstAvailableSize = product.stock.find(s => s.quantity > 0)?.size || product.stock[0]?.size;

    // Size status - this is where we remember what the user has selected. Default is now dynamic
    const [selectedSize, setSelectedSize] = useState<Size>(firstAvailableSize as Size);

    // Helping variable - we find out how many pieces the currently selected size has
    const currentStockEntry = product.stock.find(s => s.size === selectedSize);
    const isOutOfStock = !currentStockEntry || currentStockEntry.quantity <= 0;

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
            {/* Link to the item page*/ }
            <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <h3 style={{ margin: 0, cursor: 'pointer' }}>{product.name}</h3>
            </Link>
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
                    {/*map the stock directly from the database and list the number of pieces*/}
                    {product.stock.map(item => (
                        <option
                            key={item.size}
                            value={item.size}
                            disabled={item.quantity <= 0} // prevents selection of out-of-stock sizes in gray state
                        >
                            {item.size} {item.quantity <= 0 ? '(Vyprodáno)' : `(${item.quantity} ks)`}
                        </option>
                    ))}
                </select>
            </div>

            {/*FIXED BUTTON: We now ship the product AND the selected size AT THE SAME TIME*/}
            <button
                onClick={() => addToCart(product, selectedSize)}
                disabled={isOutOfStock} // button is off if not available
                style={{
                    padding: '10px',
                    backgroundColor: isOutOfStock ? '#ccc' : '#007BFF', // different color if not available
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: isOutOfStock ? 'not-allowed' : 'pointer',
                    fontWeight: 'bold',
                    marginTop: '10px'
                }}
            >
                {isOutOfStock ? 'Nedostupné' : 'Přidat do košíku'}
            </button>
        </div>
    );
};