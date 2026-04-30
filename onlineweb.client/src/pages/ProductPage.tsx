import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import type { Product, Size, ProductStock } from '../models/types';

export const ProductPage = () => {
    // Getting ID from URL
    const { id } = useParams<{ id: string }>();
    const { addToCart } = useCart();

    // Status to save the loaded product and selected size
    const [product, setProduct] = useState<Product | null>(null);
    const [selectedSize, setSelectedSize] = useState<Size | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Loading data from backend for specific ID
        fetch(`https://localhost:7019/api/Products/${id}`)
            .then(res => {
                if (!res.ok) throw new Error("Produkt nebyl nalezen");
                return res.json();
            })
            .then(data => {
                setProduct(data);
                // Automatically choosing size
                const available = data.stock.find((s: ProductStock) => s.quantity > 0);
                if (available) setSelectedSize(available.size);
            })
            .catch(err => setError(err.message));
    }, [id]);

    if (error) return <div style={{ padding: '20px' }}>Chyba: {error}</div>;
    if (!product) return <div style={{ padding: '20px' }}>Načítám...</div>;

    // controlling that the item of that size is in stock
    const currentStock = product.stock.find(s => s.size === selectedSize);
    const canAdd = currentStock && currentStock.quantity > 0;

    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
            <h1>{product.name}</h1>
            <p style={{ color: '#666', fontSize: '1.1em' }}>{product.description}</p>
            <h2 style={{ color: '#007BFF' }}>{product.price} Kč</h2>

            <div style={{ margin: '20px 0' }}>
                <h3>Dostupné velikosti:</h3>
                <div style={{ display: 'flex', gap: '10px' }}>
                    {product.stock.map(item => (
                        <button
                            key={item.size}
                            onClick={() => setSelectedSize(item.size)}
                            disabled={item.quantity <= 0}
                            style={{
                                padding: '10px 15px',
                                border: selectedSize === item.size ? '2px solid #007BFF' : '1px solid #ccc',
                                backgroundColor: selectedSize === item.size ? '#e7f3ff' : 'white',
                                cursor: item.quantity <= 0 ? 'not-allowed' : 'pointer',
                                opacity: item.quantity <= 0 ? 0.5 : 1
                            }}
                        >
                            {item.size} ({item.quantity} ks)
                        </button>
                    ))}
                </div>
            </div>

            <button
                onClick={() => selectedSize && addToCart(product, selectedSize)}
                disabled={!canAdd}
                style={{
                    padding: '15px 30px',
                    fontSize: '1.1em',
                    backgroundColor: canAdd ? '#007BFF' : '#ccc',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: canAdd ? 'pointer' : 'not-allowed'
                }}
            >
                {canAdd ? 'Přidat do košíku' : 'Vyprodáno'}
            </button>
        </div>
    );
}; 