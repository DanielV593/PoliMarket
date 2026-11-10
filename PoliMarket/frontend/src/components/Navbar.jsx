import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const Navbar = () => {
  // 👈 Extraemos el estado del carrito (no la función, solo los datos)
  const { carrito } = useContext(CartContext);

  return (
    <nav style={{ 
      backgroundColor: '#0a3d62', 
      padding: '15px 30px', 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      color: 'white',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
    }}>
      <h2 style={{ margin: 0 }}>🛒 PoliMarket</h2>

      <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
        Carrito 
        <span style={{ 
          backgroundColor: '#ff6b6b', 
          color: 'white', 
          borderRadius: '50%', 
          padding: '4px 10px', 
          marginLeft: '10px',
          fontSize: '1rem'
        }}>
          {carrito.length} {/* 👈 Aquí se imprime el número dinámico */}
        </span>
      </div>
    </nav>
  );
};

export default Navbar;