import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

const CartDrawer = ({ onCheckout }) => {
  const { cart, isCartOpen, closeCart, removeFromCart, updateQuantity, getCartTotal } = useCart();

  if (!isCartOpen) return null;

  const handleCheckout = () => {
    closeCart();
    if (onCheckout) {
      onCheckout();
    }
  };

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-60 backdrop-blur-sm"
        onClick={closeCart}
      ></div>

      {/* Drawer */}
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-secondary border-l border-border shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center space-x-2">
            <ShoppingBag className="w-6 h-6 text-accent" />
            <h2 className="font-orbitron text-lg font-semibold text-text-primary">
              Shopping Cart
            </h2>
          </div>
          <button
            onClick={closeCart}
            className="p-2 text-text-secondary hover:text-text-primary transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag className="w-16 h-16 text-text-secondary mb-4" />
              <p className="text-text-secondary font-inter">Your cart is empty</p>
              <button
                onClick={closeCart}
                className="mt-4 px-6 py-2 bg-accent text-background font-inter font-medium rounded-lg hover:bg-amber-400 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div 
                  key={item.id}
                  className="flex items-center gap-4 p-3 bg-primary rounded-lg border border-border"
                >
                  {/* Product Image */}
                  <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-inter text-sm font-medium text-text-primary truncate">
                      {item.name}
                    </h3>
                    <p className="font-inter text-xs text-text-secondary">
                      {item.model}
                    </p>
                    <p className="font-inter text-sm font-semibold text-accent mt-1">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex flex-col items-end gap-2">
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-1 text-text-secondary hover:text-danger transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <div className="flex items-center gap-2 bg-background rounded-lg p-1">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 text-text-secondary hover:text-text-primary transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="font-inter text-sm text-text-primary w-6 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 text-text-secondary hover:text-text-primary transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="p-4 border-t border-border bg-primary">
            <div className="flex items-center justify-between mb-4">
              <span className="font-inter text-text-secondary">Subtotal</span>
              <span className="font-orbitron text-xl font-bold text-text-primary">
                ${getCartTotal().toFixed(2)}
              </span>
            </div>
            <button 
              onClick={handleCheckout}
              className="w-full py-3 bg-accent text-background font-inter font-semibold rounded-lg hover:bg-amber-400 transition-colors btn-glow"
            >
              Proceed to Checkout
            </button>
            <button
              onClick={closeCart}
              className="w-full mt-2 py-2 border border-border text-text-secondary font-inter rounded-lg hover:text-text-primary hover:border-text-secondary transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
