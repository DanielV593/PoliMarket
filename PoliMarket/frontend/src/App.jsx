import { useState, useEffect, useContext } from 'react'; // 👈 Agregamos useContext
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './firebase';
import { CartContext } from './context/CartContext'; // 👈 Importamos nuestra caja fuerte

import Marketplace from './pages/Marketplace';
import DashboardVendedor from './pages/DashboardVendedor';
import Login from './pages/Login';

const RutaProtegida = ({ user, children }) => {
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  const [user, setUser] = useState(null);

  const { carrito } = useContext(CartContext);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (usuarioActual) => {
      setUser(usuarioActual);
    });
    return () => unsubscribe();
  }, []);

  // 🚪 Función para cerrar sesión
  const handleLogout = () => {
    signOut(auth).catch((error) => console.error("Error al salir:", error));
  };

  return (
    <Router>
      <div style={{ fontFamily: 'system-ui, sans-serif', backgroundColor: '#f4f7f6', minHeight: '100vh' }}>
        
        <nav style={{ backgroundColor: '#0a3d62', padding: '15px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link to="/" style={{ color: 'white', textDecoration: 'none', fontSize: '1.5rem', fontWeight: 'bold' }}>🛍️ PoliMarket</Link>
          
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Catálogo</Link>
            
            <div style={{ color: 'white', fontWeight: 'bold', display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
              Carrito 
              <span style={{ 
                backgroundColor: '#ff6b6b', 
                color: 'white', 
                borderRadius: '50%', 
                padding: '2px 8px', 
                marginLeft: '8px',
                fontSize: '0.9rem'
              }}>
                {carrito.length}
              </span>
            </div>

            {/* Si el usuario EXISTE, mostramos Mi Tienda y Cerrar Sesión */}
            {user ? (
              <>
                <Link to="/dashboard" style={{ color: 'white', textDecoration: 'none' }}>Mi Tienda</Link>
                <button onClick={handleLogout} style={{ backgroundColor: 'transparent', color: '#ff6b6b', border: '1px solid #ff6b6b', padding: '8px 15px', borderRadius: '20px', cursor: 'pointer', fontWeight: 'bold' }}>
                  Cerrar Sesión
                </button>
              </>
            ) : (
              /* Si el usuario NO existe, solo mostramos Iniciar Sesión */
              <Link to="/login" style={{ backgroundColor: '#ff6b6b', color: 'white', padding: '8px 15px', borderRadius: '20px', textDecoration: 'none', fontWeight: 'bold' }}>
                Iniciar Sesión
              </Link>
            )}
          </div>
        </nav>

        {/* Rutas */}
        <main style={{ padding: '20px' }}>
          <Routes>
            <Route path="/" element={<Marketplace />} />
            <Route path="/login" element={<Login />} />
            
            {/* Ruta protegida: Solo accesible si hay un usuario logueado */}
            <Route 
              path="/dashboard" 
              element={
                <RutaProtegida user={user}>
                  <DashboardVendedor />
                </RutaProtegida>
              } 
            />
          </Routes>
        </main>

      </div>
    </Router>
  );
}

export default App;