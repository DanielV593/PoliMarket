import { createContext, useState } from 'react';

// 1. Creamos el contexto (con C mayúscula)
export const CartContext = createContext();

// 2. Creamos el Proveedor (con C mayúscula)
export const CartProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);

  const agregarAlCarrito = (producto) => {
    setCarrito((carritoActual) => [...carritoActual, producto]);
    console.log("Producto agregado:", producto.nombre);
  };

  return (
    <CartContext.Provider value={{ carrito, agregarAlCarrito }}>
      {children}
    </CartContext.Provider>
  );
};