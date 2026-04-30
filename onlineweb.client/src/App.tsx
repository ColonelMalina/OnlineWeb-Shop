import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { CartProvider } from './context/CartContext';
import { ProductPage } from './pages/ProductPage';

function App() {
  return (
      // whole app needs to be in Router
  <CartProvider>
     <Router>
          <div style={{ padding: '30px', fontFamily: 'Arial, sans-serif', maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
            
            {/* MAIN NAVIGATION */}
              <div style={{ justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #333', paddingBottom: '10px', marginBottom: '20px' }}>
                <h1 style={{ margin: 0 }}>E-shop 🚀</h1>
                
                  <nav style={{ display: 'flex', justifyContent: 'flex-end', gap: '20px' }}>
                    {/* from router-dom library to make routing between sites */}
                    <Link to="/" style={{ textDecoration: 'none', color: '#007BFF', fontWeight: 'bold' }}>Nabídka</Link>
                    <Link to="/košík" style={{ textDecoration: 'none', color: '#007BFF', fontWeight: 'bold' }}>Košík</Link>
                </nav>
            </div>

              {/* from router-dom library to make routing between sites */}
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/košík" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/product/:id" element={<ProductPage />} />
            </Routes>
            
        </div>
     </Router>
  </CartProvider>
  );
}

export default App;