import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cctv-cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  // Store product that should be added after login
  const [pendingProduct, setPendingProduct] = useState(null);

  useEffect(() => {
    localStorage.setItem('cctv-cart', JSON.stringify(cart));
  }, [cart]);

  // Check for pending product when cart changes (login happened)
  useEffect(() => {
    const savedPending = localStorage.getItem('cctv-pending-product');
    if (savedPending && cart.length === 0) {
      // User just logged in and has pending product
      try {
        const pending = JSON.parse(savedPending);
        if (pending) {
          addToCart(pending);
          localStorage.removeItem('cctv-pending-product');
          setIsCartOpen(true);
        }
      } catch (e) {
        console.error('Error parsing pending product:', e);
      }
    }
  }, []);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  // Add product and store in localStorage for persistence
  const addToCartWithPending = (product) => {
    // Check if user is logged in
    const currentUser = localStorage.getItem('cctv-current-user');
    
    if (!currentUser) {
      // Store pending product
      localStorage.setItem('cctv-pending-product', JSON.stringify(product));
      setPendingProduct(product);
      // Dispatch event to open login panel
      window.dispatchEvent(new CustomEvent('open-login-panel'));
      return false; // Not added yet
    }
    
    // User is logged in, add directly
    addToCart(product);
    return true; // Added successfully
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        addToCartWithPending,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartCount,
        isCartOpen,
        toggleCart,
        closeCart,
        pendingProduct,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
