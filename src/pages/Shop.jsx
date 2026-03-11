import { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { products } from '../data/mockData';
import { useCart } from '../context/CartContext';

const Shop = ({ setCurrentPage, handleCheckout }) => {
  const { addToCart } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const productTypes = ['all', 'Dome', 'Bullet', 'PTZ', 'Turret', 'Fisheye', 'Thermal'];
  
  const priceRanges = [
    { value: 'all', label: 'All Prices' },
    { value: '0-150', label: 'Under $150' },
    { value: '150-300', label: '$150 - $300' },
    { value: '300-500', label: '$300 - $500' },
    { value: '500+', label: '$500+' },
  ];
  const sortOptions = [
    { value: 'featured', label: 'Featured' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Top Rated' },
    { value: 'newest', label: 'Newest' },
  ];

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.model.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query)
      );
    }

    // Type filter
    if (selectedType !== 'all') {
      filtered = filtered.filter((p) => p.type === selectedType);
    }

    // Price range filter
    if (priceRange !== 'all') {
      const [min, max] = priceRange.split('-').map(Number);
      filtered = filtered.filter((p) => {
        if (max) {
          return p.price >= min && p.price <= max;
        }
        return p.price >= min;
      });
    }

    // Sort
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    return filtered;
  }, [searchQuery, selectedType, priceRange, sortBy]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedType('all');
    setSelectedBrand('all');
    setPriceRange('all');
    setSortBy('featured');
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-orbitron text-4xl font-bold text-text-primary mb-2">
            Camera <span className="text-accent">Shop</span>
          </h1>
          <p className="text-text-secondary font-inter">
            Browse our complete collection of security cameras
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-secondary" />
            <input
              type="text"
              placeholder="Search cameras..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-secondary border border-border rounded-xl text-text-primary placeholder-text-secondary font-inter focus:outline-none focus:border-accent transition-colors"
            />
          </div>

          {/* Filter Toggle (Mobile) */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="md:hidden flex items-center justify-center gap-2 px-4 py-3 bg-secondary border border-border rounded-xl text-text-primary font-inter"
          >
            <SlidersHorizontal className="w-5 h-5" />
            Filters
          </button>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-3 bg-secondary border border-border rounded-xl text-text-primary font-inter focus:outline-none focus:border-accent"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <aside
            className={`fixed md:static inset-0 z-40 md:z-auto w-full md:w-64 bg-secondary md:bg-transparent p-6 md:p-0 transition-transform ${
              showFilters ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
            }`}
          >
            <div className="md:hidden flex items-center justify-between mb-6">
              <h3 className="font-orbitron text-lg font-semibold text-text-primary">Filters</h3>
              <button onClick={() => setShowFilters(false)}>
                <X className="w-6 h-6 text-text-secondary" />
              </button>
            </div>

            {/* Type Filter */}
            <div className="mb-6">
              <h4 className="font-orbitron text-sm font-semibold text-text-primary mb-3">Camera Type</h4>
              <div className="flex flex-wrap gap-2">
                {productTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedType(type)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-inter transition-colors ${
                      selectedType === type
                        ? 'bg-accent text-background'
                        : 'bg-secondary text-text-secondary hover:text-text-primary'
                    }`}
                  >
                    {type === 'all' ? 'All' : type}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range Filter */}
            <div className="mb-6">
              <h4 className="font-orbitron text-sm font-semibold text-text-primary mb-3">Price Range</h4>
              <div className="space-y-2">
                {priceRanges.map((range) => (
                  <label
                    key={range.value}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="priceRange"
                      value={range.value}
                      checked={priceRange === range.value}
                      onChange={(e) => setPriceRange(e.target.value)}
                      className="w-4 h-4 accent-accent"
                    />
                    <span className="text-text-secondary font-inter text-sm">{range.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Clear Filters */}
            <button
              onClick={clearFilters}
              className="w-full py-2 border border-border text-text-secondary font-inter rounded-lg hover:text-text-primary hover:border-text-secondary transition-colors"
            >
              Clear Filters
            </button>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Results Count */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-text-secondary font-inter">
                Showing {filteredProducts.length} products
              </p>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-text-secondary font-inter text-lg">No products found matching your criteria.</p>
                <button
                  onClick={clearFilters}
                  className="mt-4 px-6 py-2 bg-accent text-background font-inter rounded-lg hover:bg-amber-400 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onViewDetails={setSelectedProduct}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setSelectedProduct(null)}
          ></div>
          <div className="relative bg-secondary border border-border rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 p-2 text-text-secondary hover:text-text-primary z-10"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Image */}
              <div className="h-64 md:h-full">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover rounded-l-2xl"
                />
              </div>

              {/* Info */}
              <div className="p-6">
                <span className="text-text-secondary text-sm font-inter">{selectedProduct.brand}</span>
                <h3 className="font-orbitron text-2xl font-bold text-text-primary mt-1">
                  {selectedProduct.name}
                </h3>
                <p className="text-text-secondary text-sm font-inter mt-1">{selectedProduct.model}</p>

                <div className="flex items-center gap-4 mt-4">
                  <span className="font-orbitron text-2xl font-bold text-accent">
                    ${selectedProduct.price.toFixed(2)}
                  </span>
                  {selectedProduct.originalPrice > selectedProduct.price && (
                    <span className="font-inter text-text-secondary line-through">
                      ${selectedProduct.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>

                <p className="text-text-secondary font-inter text-sm mt-4">
                  {selectedProduct.description}
                </p>

                <div className="mt-4">
                  <h4 className="font-orbitron text-sm font-semibold text-text-primary mb-2">Features:</h4>
                  <ul className="space-y-1">
                    {selectedProduct.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-text-secondary text-sm">
                        <span className="w-1.5 h-1.5 bg-accent rounded-full"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <button 
                  onClick={() => {
                    addToCart(selectedProduct);
                    setSelectedProduct(null);
                  }}
                  className="mt-3 py-3 px-4 gap-4 bg-accent text-background font-inter font-semibold rounded-xl hover:bg-amber-400 transition-colors btn-glow w-full"
                >
                  Add to Cart
                </button>
                <button 
                  onClick={() => {
                    addToCart(selectedProduct);
                    setSelectedProduct(null);
                    handleCheckout();
                  }}
                  className="mt-3 py-3 px-4 gap-4 bg-accent text-background font-inter font-semibold rounded-xl hover:bg-amber-400 transition-colors btn-glow w-full"
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Shop;
