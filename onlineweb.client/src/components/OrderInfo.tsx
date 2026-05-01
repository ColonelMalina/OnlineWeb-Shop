import React from 'react';

// 1. DOKUMENTACE: Interface musí přesně odpovídat stavu v Checkout.tsx
interface OrderInfoProps {
    formData: {
        customerName: string;
        email: string;
        street: string;      // Změněno z 'address' na 'street'
        houseNumber: string; // Přidáno nové pole
        city: string;
        zipCode: string; // Sjednoceno na 'zipCode' podle backendu
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
                type="telefon"
                placeholder="Telefoní číslo"
                style={inputStyle}
                value={formData.phone}
                onChange={onInputChange}
            />

            {/* 2. IMPLEMENTACE: Rozdělení adresy na Street a HouseNumber */}
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