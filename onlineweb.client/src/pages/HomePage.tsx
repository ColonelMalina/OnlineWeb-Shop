import { useEffect, useState } from 'react';
import type { Product } from '../models/types';
import { apiService } from '../services/api';
import { ProductCard } from '../components/ProductCard';

export const HomePage = () => {
    // here we save products from server
    const [products, setProducts] = useState<Product[]>([]);

    // States for loading and errors
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // useEffect is launched automaticaly after first draw of the page
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // calling for our bridge into C#
                const data = await apiService.getProducts();
                setProducts(data);
            } catch {
                setError('Nepodařilo se načíst produkty. Běží ti backend?');
            } finally {
                setIsLoading(false);
            }
        };

        fetchProducts();
    }, []); // empty brackets on end mean "start only one time" 

    //// function that is added to the card
    //const handleAddToCart = (product: Product) => {
    //    console.log("Přidávám do košíku:", product.name);
    //    alert(`Produkt ${product.name} přidán! (Zatím jen na zkoušku)`);
    //};

    // for loading or showing errors 
    if (isLoading) return <p>Načítám produkty...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    // DRAWING
    return (
        <div>
            <h2>Naše nabídka</h2>
            {/* Drawing of a grid for products */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                gap: '20px'
            }}>
                {products.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}   
                    />
                ))}
            </div>  
        </div>
    );
};