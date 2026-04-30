export const OrderInfo = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', textAlign: 'left' }}>
            <h3>Doručovací údaje</h3>
            <input type="text" placeholder="Celé jméno" style={inputStyle} />
            <input type="email" placeholder="E-mail" style={inputStyle} />
            <input type="text" placeholder="Ulice a č.p." style={inputStyle} />
            <div style={{ display: 'flex', gap: '10px' }}>
                <input type="text" placeholder="Město" style={{ ...inputStyle, flex: 2 }} />
                <input type="text" placeholder="PSČ" style={{ ...inputStyle, flex: 1 }} />
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