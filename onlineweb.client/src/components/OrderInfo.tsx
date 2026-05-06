import React from 'react';

interface OrderInfoProps {
    formData: {
        customerName: string;
        email: string;
        street: string;   
        houseNumber: string; 
        city: string;
        zipCode: string; 
        phone: string;
    };
    onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
// DRAWING
export const OrderInfo = ({ formData, onInputChange }: OrderInfoProps) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', textAlign: 'left' }}>
            <h3>Doručovací údaje</h3>

            <input
                name="customerName"
                type="text"
                placeholder="Celé jméno"
                style={inputStyle}
                value={formData.customerName}
                onChange={onInputChange}
            />

            <input
                name="email"
                type="email"
                placeholder="E-mail"
                style={inputStyle}
                value={formData.email}
                onChange={onInputChange}
            />
            <input
                name="phone"
                type="tel"
                placeholder="Telefoní číslo"
                style={inputStyle}
                value={formData.phone}
                onChange={onInputChange}
            />
            <div style={{ display: 'flex', gap: '10px' }}>
                <input
                    name="street"
                    type="text"
                    placeholder="Ulice"
                    style={{ ...inputStyle, flex: 3 }}
                    value={formData.street}
                    onChange={onInputChange}
                />
                <input
                    name="houseNumber"
                    type="text"
                    placeholder="Č.p."
                    style={{ ...inputStyle, flex: 1 }}
                    value={formData.houseNumber}
                    onChange={onInputChange}
                />
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
                <input
                    name="city"
                    type="text"
                    placeholder="Město"
                    style={{ ...inputStyle, flex: 2 }}
                    value={formData.city}
                    onChange={onInputChange}
                />
                <input
                    name="zipCode"
                    type="text"
                    placeholder="PSČ"
                    style={{ ...inputStyle, flex: 1 }}
                    value={formData.zipCode}
                    onChange={onInputChange}
                />
            </div>
        </div>
    );
};

const inputStyle = {
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '1em'
};