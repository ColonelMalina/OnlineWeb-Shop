import type { Product } from '../models/types';

interface ProductInCartProps {
    product: Product;
    cartQuantity: number;
}

export const ProductInCart = ({ product, cartQuantity }: ProductInCartProps) => {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '1px solid #eee',
            padding: '10px 0'
        }}>
            <div>
                <strong style={{ display: 'block' }}>{product.name}</strong>
                <span style={{ fontSize: '0.9em', color: '#666' }}>{product.price} Kč / ks</span>
            </div>

            <div>
                <span style={{ padding: '0 15px' }}>Množství: <strong>{cartQuantity}</strong></span>
            </div>

            <div style={{ fontSize: '1.2em', fontWeight: 'bold' }}>
                {product.price * cartQuantity} Kč
            </div>
        </div>
    );
};