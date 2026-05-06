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

    // function for updating data
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setCustomerData(prev => ({ ...prev, [name]: value }));
    };

    // Check all address fields
    const handleOrderSubmit = async () => {

        // validation of field
        const isFormValid = Object.values(customerData).every(value => value.trim() !== '');

        if (!isFormValid) {
            alert("Prosím vyplňte všechny doručovací údaje včetně kompletní adresy.");
            return;
        }

        //checkout call: Pass an object with all the data
        //cartContext then creates the correct object for the backend
        await checkout(customerData);
    };

    return (
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '40px', marginTop: '20px' }}>
            {/* adding data to orderinfo */}
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