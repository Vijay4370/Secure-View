import { useState } from 'react';
import { CreditCard, Lock, ArrowLeft, CheckCircle, Loader2 } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Checkout = ({ onBack, currentUser }) => {
  const { cart, getCartTotal, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState('razorpay');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [orderId, setOrderId] = useState('');
  
  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
    state: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    setIsProcessing(true);

    // Validate form
    if (!formData.name || !formData.email || !formData.phone || !formData.address) {
      alert('Please fill in all required fields');
      setIsProcessing(false);
      return;
    }

    try {
      // Load Razorpay script
      const scriptLoaded = await loadRazorpayScript();
      
      if (!scriptLoaded) {
        alert('Failed to load payment gateway. Please try again.');
        setIsProcessing(false);
        return;
      }

      // In production, you would create an order on your backend
      // For demo, we'll use Razorpay's test mode
      const amount = getCartTotal() * 100; // Razorpay expects amount in paise

      // Razorpay options
      const options = {
        key: 'rzp_test_SLxrvOlcErmve4', // Your Razorpay Key ID
        amount: amount.toString(),
        currency: 'INR',
        name: 'SecureView CCTV Shop',
        description: 'CCTV Camera Purchase',
        image: '/vite.svg',
        handler: function(response) {
          // Payment successful
          const newOrderId = 'ORD-' + Date.now();
          setOrderId(newOrderId);
          setPaymentSuccess(true);
          clearCart();
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone
        },
        theme: {
          color: '#F59E0B'
        }
      };

      // Open Razorpay checkout
      const razorpay = new window.Razorpay(options);
      razorpay.open();
      
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment failed. Please try again.');
    }

    setIsProcessing(false);
  };

  // Demo payment without actual Razorpay
  const handleDemoPayment = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const newOrderId = 'ORD-' + Date.now();
    setOrderId(newOrderId);
    setPaymentSuccess(true);
    clearCart();
    
    setIsProcessing(false);
  };

  if (paymentSuccess) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4 py-8">
        <div className="max-w-md w-full glass rounded-2xl p-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-success/20 rounded-full mb-6">
            <CheckCircle className="w-8 h-8 text-success" />
          </div>
          <h2 className="font-orbitron text-2xl font-bold text-text-primary mb-2">
            Payment Successful!
          </h2>
          <p className="text-text-secondary font-inter mb-4">
            Thank you for your order!
          </p>
          <div className="bg-primary rounded-lg p-4 mb-6">
            <p className="text-text-secondary text-sm">Order ID</p>
            <p className="font-orbitron text-accent">{orderId}</p>
          </div>
          <p className="text-text-secondary text-sm mb-6">
            A confirmation email has been sent to {formData.email}
          </p>
          <button
            onClick={onBack}
            className="w-full py-3 bg-accent text-background font-inter font-semibold rounded-lg hover:bg-amber-400 transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-text-secondary hover:text-text-primary mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-inter">Back to Cart</span>
        </button>

        <h1 className="font-orbitron text-2xl font-bold text-text-primary mb-8">
          Checkout
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Billing Details */}
          <div className="glass rounded-2xl p-6">
            <h2 className="font-orbitron text-lg font-semibold text-text-primary mb-6">
              Billing Details
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-text-secondary text-sm font-inter mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-primary border border-border rounded-xl text-text-primary font-inter focus:outline-none focus:border-accent"
                />
              </div>

              <div>
                <label className="block text-text-secondary text-sm font-inter mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-primary border border-border rounded-xl text-text-primary font-inter focus:outline-none focus:border-accent"
                />
              </div>

              <div>
                <label className="block text-text-secondary text-sm font-inter mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-primary border border-border rounded-xl text-text-primary font-inter focus:outline-none focus:border-accent"
                />
              </div>

              <div>
                <label className="block text-text-secondary text-sm font-inter mb-2">
                  Address *
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  rows="3"
                  className="w-full px-4 py-3 bg-primary border border-border rounded-xl text-text-primary font-inter focus:outline-none focus:border-accent resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-text-secondary text-sm font-inter mb-2">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-primary border border-border rounded-xl text-text-primary font-inter focus:outline-none focus:border-accent"
                  />
                </div>
                <div>
                  <label className="block text-text-secondary text-sm font-inter mb-2">
                    Pincode
                  </label>
                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-primary border border-border rounded-xl text-text-primary font-inter focus:outline-none focus:border-accent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-text-secondary text-sm font-inter mb-2">
                  State
                </label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-primary border border-border rounded-xl text-text-primary font-inter focus:outline-none focus:border-accent"
                />
              </div>
            </div>
          </div>

          {/* Order Summary & Payment */}
          <div className="space-y-6">
            {/* Order Summary */}
            <div className="glass rounded-2xl p-6">
              <h2 className="font-orbitron text-lg font-semibold text-text-primary mb-6">
                Order Summary
              </h2>

              <div className="space-y-3 mb-6">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div>
                        <p className="font-inter text-sm text-text-primary">{item.name}</p>
                        <p className="font-inter text-xs text-text-secondary">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <p className="font-inter text-sm text-text-primary">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t border-border pt-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-text-secondary font-inter">Subtotal</span>
                  <span className="text-text-primary font-inter">${getCartTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary font-inter">Shipping</span>
                  <span className="text-success font-inter">Free</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-border">
                  <span className="font-inter font-semibold text-text-primary">Total</span>
                  <span className="font-orbitron text-xl font-bold text-accent">
                    ${getCartTotal().toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="glass rounded-2xl p-6">
              <h2 className="font-orbitron text-lg font-semibold text-text-primary mb-6">
                Payment Method
              </h2>

              <div className="space-y-3">
                <label className="flex items-center justify-between p-4 bg-primary rounded-xl cursor-pointer border border-accent">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      value="razorpay"
                      checked={paymentMethod === 'razorpay'}
                      onChange={() => setPaymentMethod('razorpay')}
                      className="w-5 h-5 text-accent"
                    />
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-5 h-5 text-accent" />
                      <span className="font-inter text-text-primary">Razorpay</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-text-secondary">UPI</span>
                    <span className="text-xs text-text-secondary">Cards</span>
                    <span className="text-xs text-text-secondary">Wallets</span>
                  </div>
                </label>

                <label className="flex items-center justify-between p-4 bg-primary rounded-xl cursor-pointer border border-border hover:border-text-secondary">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      value="cod"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                      className="w-5 h-5 text-accent"
                    />
                    <span className="font-inter text-text-primary">Cash on Delivery</span>
                  </div>
                </label>
              </div>

              <button
                onClick={paymentMethod === 'razorpay' ? handlePayment : handleDemoPayment}
                disabled={isProcessing || cart.length === 0}
                className={`w-full mt-6 py-3 rounded-xl font-inter font-semibold transition-all flex items-center justify-center gap-2 ${
                  isProcessing || cart.length === 0
                    ? 'bg-accent/50 text-background cursor-not-allowed'
                    : 'bg-accent text-background hover:bg-amber-400 btn-glow'
                }`}
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Lock className="w-5 h-5" />
                    {paymentMethod === 'razorpay' ? `Pay ₹${(getCartTotal() * 83).toFixed(0)} via Razorpay` : `Place Order (Cash on Delivery)`}
                  </>
                )}
              </button>

              <p className="text-text-secondary text-xs text-center mt-4 flex items-center justify-center gap-1">
                <Lock className="w-3 h-3" />
                Secure payment powered by Razorpay
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
