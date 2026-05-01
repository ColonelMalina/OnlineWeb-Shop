import { useState } from 'react';
import { OrderInfo } from '../components/OrderInfo';
import { ProductsInCheckout } from '../components/ProductsInCheckout';
import { useCart } from '../context/CartContext';

export const Checkout = () => {
    const { cartItems, checkout } = useCart();

    const [customerData, setCustomerData] = useState({
        customerName: '',
        email: '',
        phone: '',
        street: '',     
        houseNumber: '', 
        city: '',        
        zipCode: ''      
    });

    // Funkce pro aktualizaci dat (zůstává stejná, díky 'name' v inputech)
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setCustomerData(prev => ({ ...prev, [name]: value }));
    };

    // 2. LOGIKA ODESLÁNÍ: Teď kontrolujeme všechna pole adresy
    const handleOrderSubmit = async () => {
        if (cartItems.length === 0) {
            alert("Košík je prázdný!");
            return;
        }

        // Validace všech polí
        const isFormValid = Object.values(customerData).every(value => value.trim() !== '');

        if (!isFormValid) {
            alert("Prosím vyplňte všechny doručovací údaje včetně kompletní adresy.");
            return;
        }

        // 3. VOLÁNÍ CHECKOUT: Předáme objekt se všemi daty
        // CartContext si z toho pak vytvoří ten správný objekt pro backend
        await checkout(customerData);
    };

    return (
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '40px', marginTop: '20px' }}>
            {/* Předáváme rozšířený stav do OrderInfo */}
            <OrderInfo formData={customerData} onInputChange={handleInputChange} />

            <div>
                <ProductsInCheckout products={cartItems} />

                <button
                    onClick={handleOrderSubmit}
                    style={{
                        width: '100%',
                        marginTop: '20px',
                        padding: '15px',
                        backgroundColor: cartItems.length === 0 ? '#ccc' : '#28a745',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        fontWeight: 'bold',
                        cursor: cartItems.length === 0 ? 'not-allowed' : 'pointer'
                    }}
                    disabled={cartItems.length === 0}
                >
                    Odeslat objednávku
                </button>
            </div>
        </div>
    );
};