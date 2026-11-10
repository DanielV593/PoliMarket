import { useState } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        // Si el login es exitoso, lo mandamos a su tienda
        navigate('/dashboard');
      })
      .catch(() => {
        setError('Correo o contraseña incorrectos, ¡intenta de nuevo!');
      });
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
      <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '10px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)', width: '100%', maxWidth: '400px' }}>
        <h2 style={{ color: '#0a3d62', textAlign: 'center', marginTop: 0 }}>🔐 Iniciar Sesión</h2>
        <p style={{ textAlign: 'center', color: '#64748b', marginBottom: '20px' }}>Ingresa con tu correo institucional</p>
        
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input 
            type="email" 
            placeholder="ejemplo@epn.edu.ec" 
            required 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ padding: '12px', borderRadius: '5px', border: '1px solid #ccc' }}
          />
          <input 
            type="password" 
            placeholder="Tu contraseña" 
            required 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ padding: '12px', borderRadius: '5px', border: '1px solid #ccc' }}
          />
          
          {error && <p style={{ color: '#ff6b6b', fontSize: '0.9rem', margin: 0, textAlign: 'center' }}>{error}</p>}
          
          <button type="submit" style={{ backgroundColor: '#0a3d62', color: 'white', border: 'none', padding: '12px', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', marginTop: '10px' }}>
            Entrar a PoliMarket
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;