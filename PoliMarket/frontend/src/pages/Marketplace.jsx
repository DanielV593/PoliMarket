import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { CartContext } from '../context/CartContext';

const Marketplace = () => {
  const [productos, setProductos] = useState([]);
  
  const { agregarAlCarrito } = useContext(CartContext);

  useEffect(() => {
    axios.get('http://localhost:3000/api/productos')
      .then(response => setProductos(response.data))
      .catch(error => console.error("Error cargando productos:", error));
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ color: '#0a3d62' }}>🛒 Catálogo de Productos</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
        {productos.map(prod => (
          <div key={prod.id} style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', borderLeft: '5px solid #0a3d62' }}>
            <span style={{ fontSize: '0.8rem', backgroundColor: '#e2e8f0', padding: '3px 8px', borderRadius: '12px', color: '#475569' }}>{prod.categoria}</span>
            <h3 style={{ margin: '10px 0', color: '#1e293b' }}>{prod.nombre}</h3>
            <h2 style={{ margin: '0 0 10px 0', color: '#ff6b6b' }}>${parseFloat(prod.precio).toFixed(2)}</h2>
            <p style={{ margin: '0 0 15px 0', fontSize: '0.9rem', color: '#64748b' }}>👤 Vendedor: {prod.vendedor}</p>
            
            {/* 👈 NUEVO: Nuestro botón conectado a la función mágica */}
            <button 
              onClick={() => agregarAlCarrito(prod)}
              style={{ 
                width: '100%', 
                padding: '10px', 
                backgroundColor: '#0a3d62', 
                color: 'white', 
                border: 'none', 
                borderRadius: '5px', 
                cursor: 'pointer',
                fontWeight: 'bold',
                transition: '0.3s'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#0d5c94'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#0a3d62'}
            >
              Agregar al carrito
            </button>
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marketplace;