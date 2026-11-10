import { useState } from 'react';
import axios from 'axios';

const DashboardVendedor = () => {
  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: '', precio: '', vendedor: 'Daniel Mera', categoria: 'Electrónica'
  });
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3000/api/productos', {
      ...nuevoProducto,
      precio: parseFloat(nuevoProducto.precio)
    })
    .then(() => {
      setMensaje('✅ ¡Producto publicado con éxito!');
      setNuevoProducto({ ...nuevoProducto, nombre: '', precio: '' });
      setTimeout(() => setMensaje(''), 3000);
    })
    .catch(error => console.error("Error al guardar:", error));
  };

  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto' }}>
      <h2 style={{ color: '#0a3d62' }}>➕ Publicar Nuevo Artículo</h2>
      <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input type="text" placeholder="Nombre del producto..." required value={nuevoProducto.nombre} onChange={(e) => setNuevoProducto({...nuevoProducto, nombre: e.target.value})} style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
          <input type="number" step="0.01" placeholder="Precio ($)" required value={nuevoProducto.precio} onChange={(e) => setNuevoProducto({...nuevoProducto, precio: e.target.value})} style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
          <select value={nuevoProducto.categoria} onChange={(e) => setNuevoProducto({...nuevoProducto, categoria: e.target.value})} style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}>
            <option value="Electrónica">Electrónica</option>
            <option value="Académico">Académico</option>
            <option value="Comida">Comida</option>
            <option value="Servicios">Servicios</option>
          </select>
          <button type="submit" style={{ backgroundColor: '#ff6b6b', color: 'white', border: 'none', padding: '12px', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>
            Publicar Producto
          </button>
        </form>
        {mensaje && <p style={{ color: 'green', textAlign: 'center', marginTop: '15px' }}>{mensaje}</p>}
      </div>
    </div>
  );
};

export default DashboardVendedor;