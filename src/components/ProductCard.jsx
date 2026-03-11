import { ShoppingCart, Eye, Star, CheckCircle, XCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product, onViewDetails }) => {
  const { addToCart, toggleCart } = useCart();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    
    // Check if user is logged in
    const currentUser = localStorage.getItem('cctv-current-user');
    
    if (!currentUser) {
      // Dispatch custom event to open login panel
      window.dispatchEvent(new CustomEvent('open-login-panel'));
      return;
    }
    
    if (product.inStock) {
      addToCart(product);
      toggleCart();
    }
  };

  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  return (
    <div 
      className="glass rounded-xl overflow-hidden card-hover cursor-pointer group"
      onClick={() => onViewDetails(product)}
    >
      {/* Product Image */}
      <div className="relative h-56 overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Discount Badge */}
        {discount > 0 && (
          <div className="absolute top-3 left-3 px-2 py-1 bg-danger text-white text-xs font-inter font-bold rounded">
            -{discount}%
          </div>
        )}
        
        {/* Stock Status */}
        <div className="absolute top-3 right-3">
          {product.inStock ? (
            <div className="flex items-center gap-1 px-2 py-1 bg-success/20 text-success text-xs font-inter rounded-full">
              <CheckCircle className="w-3 h-3" />
              <span>In Stock</span>
            </div>
          ) : (
            <div className="flex items-center gap-1 px-2 py-1 bg-danger/20 text-danger text-xs font-inter rounded-full">
              <XCircle className="w-3 h-3" />
              <span>Out of Stock</span>
            </div>
          )}
        </div>

        {/* Quick Actions Overlay */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
          <button 
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className={`p-3 rounded-full transition-all transform hover:scale-110 ${
              product.inStock 
                ? 'bg-accent text-background hover:bg-amber-400' 
                : 'bg-gray-500 text-gray-300 cursor-not-allowed'
            }`}
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails(product);
            }}
            className="p-3 rounded-full bg-secondary text-text-primary hover:bg-primary transition-all transform hover:scale-110"
          >
            <Eye className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        {/* Brand & Type */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-text-secondary text-xs font-inter">{product.brand}</span>
          <span className="px-2 py-0.5 bg-primary text-text-secondary text-xs font-inter rounded">
            {product.type}
          </span>
        </div>

        {/* Name */}
        <h3 className="font-orbitron text-lg font-semibold text-text-primary mb-1 truncate">
          {product.name}
        </h3>
        
        {/* Model */}
        <p className="text-text-secondary text-xs font-inter mb-2">{product.model}</p>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-accent fill-accent' : 'text-text-secondary'}`} 
              />
            ))}
          </div>
          <span className="text-text-secondary text-xs font-inter ml-1">
            ({product.reviews})
          </span>
        </div>

        {/* Features */}
        <div className="flex flex-wrap gap-1 mb-3">
          <span className="px-2 py-1 bg-primary text-text-secondary text-xs font-inter rounded">
            {product.resolution}
          </span>
          <span className="px-2 py-1 bg-primary text-text-secondary text-xs font-inter rounded">
            {product.nightVision}
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-orbitron text-xl font-bold text-accent">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice > product.price && (
              <span className="font-inter text-sm text-text-secondary line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
