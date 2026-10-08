import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export const Checkout: React.FC = () => {
  const { items, subtotal, clearCart } = useCart();
  const { token, user } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1); // 1: Contact, 2: Address, 3: Method, 4: Payment
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    contactEmail: user?.email || '',
    firstName: '',
    lastName: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    phone: '',
    cardNumber: '',
    expDate: '',
    cvv: ''
  });

  useEffect(() => {
    if (!token) {
      navigate('/login?redirect=/checkout');
    }
  }, [token, navigate]);

  if (!items || items.length === 0) {
    return (
      <div className="min-h-screen pt-32 pb-16 flex flex-col items-center justify-center bg-[#FFF9FA]">
        <h1 className="text-2xl font-light text-[#151515] mb-4">YOUR BAG IS EMPTY</h1>
        <button
          onClick={() => navigate('/shop')}
          className="border border-[#151515] px-8 py-3 text-sm tracking-wider hover:bg-[#151515] hover:text-[#FFF9FA] transition-colors"
        >
          RETURN TO SHOP
        </button>
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNextStep = () => {
    if (step === 1 && !formData.contactEmail) {
      setError('Email is required');
      return;
    }
    if (step === 2) {
      const { firstName, lastName, address1, city, state, zipCode, country, phone } = formData;
      if (!firstName || !lastName || !address1 || !city || !state || !zipCode || !country || !phone) {
        setError('Please fill in all required shipping fields');
        return;
      }
    }
    setError('');
    setStep((prev) => (prev < 4 ? (prev + 1 as any) : prev));
  };

  const handleSubmitOrder = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          contactEmail: formData.contactEmail,
          shippingAddress: {
            firstName: formData.firstName,
            lastName: formData.lastName,
            address1: formData.address1,
            address2: formData.address2,
            city: formData.city,
            state: formData.state,
            zipCode: formData.zipCode,
            country: formData.country,
            phone: formData.phone
          }
        })
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to place order');
      }

      const order = await response.json();
      await clearCart(); // Sync local state
      navigate(`/order-confirmation/${order.id}`);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const shippingFee = subtotal >= 200 ? 0 : 25;
  const total = subtotal + shippingFee;

  return (
    <div className="min-h-screen pt-32 pb-16 bg-[#FFF9FA]">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: Form */}
        <div className="lg:col-span-7">
          <div className="mb-12">
            <h1 className="text-2xl font-light text-[#151515] tracking-widest uppercase mb-8">Checkout</h1>
            <div className="flex items-center text-xs text-[#777777] uppercase tracking-wider space-x-2">
              <span className={step >= 1 ? "text-[#151515]" : ""}>Information</span>
              <span>/</span>
              <span className={step >= 2 ? "text-[#151515]" : ""}>Shipping</span>
              <span>/</span>
              <span className={step >= 3 ? "text-[#151515]" : ""}>Payment</span>
            </div>
          </div>

          {error && <div className="text-red-500 mb-6 text-sm">{error}</div>}

          <div className="space-y-8">
            {/* Step 1: Contact */}
            {step === 1 && (
              <div>
                <h2 className="text-sm uppercase tracking-wider mb-4">Contact Information</h2>
                <input
                  type="email"
                  name="contactEmail"
                  value={formData.contactEmail}
                  onChange={handleChange}
                  placeholder="Email"
                  className="w-full border border-[#D8D0D2] bg-transparent p-3 text-sm focus:outline-none focus:border-[#151515]"
                />
                <button
                  onClick={handleNextStep}
                  className="mt-6 w-full bg-[#151515] text-[#FFF9FA] py-3 text-sm tracking-wider uppercase hover:bg-black transition-colors"
                >
                  Continue to Shipping
                </button>
              </div>
            )}

            {/* Step 2: Shipping */}
            {step === 2 && (
              <div>
                <h2 className="text-sm uppercase tracking-wider mb-4">Shipping Address</h2>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First name" className="w-full border border-[#D8D0D2] bg-transparent p-3 text-sm focus:outline-none focus:border-[#151515]" />
                  <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last name" className="w-full border border-[#D8D0D2] bg-transparent p-3 text-sm focus:outline-none focus:border-[#151515]" />
                </div>
                <input type="text" name="address1" value={formData.address1} onChange={handleChange} placeholder="Address" className="w-full border border-[#D8D0D2] bg-transparent p-3 text-sm focus:outline-none focus:border-[#151515] mb-4" />
                <input type="text" name="address2" value={formData.address2} onChange={handleChange} placeholder="Apartment, suite, etc. (optional)" className="w-full border border-[#D8D0D2] bg-transparent p-3 text-sm focus:outline-none focus:border-[#151515] mb-4" />
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="City" className="w-full border border-[#D8D0D2] bg-transparent p-3 text-sm focus:outline-none focus:border-[#151515]" />
                  <input type="text" name="state" value={formData.state} onChange={handleChange} placeholder="State" className="w-full border border-[#D8D0D2] bg-transparent p-3 text-sm focus:outline-none focus:border-[#151515]" />
                  <input type="text" name="zipCode" value={formData.zipCode} onChange={handleChange} placeholder="ZIP Code" className="w-full border border-[#D8D0D2] bg-transparent p-3 text-sm focus:outline-none focus:border-[#151515]" />
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <input type="text" name="country" value={formData.country} onChange={handleChange} placeholder="Country" className="w-full border border-[#D8D0D2] bg-transparent p-3 text-sm focus:outline-none focus:border-[#151515]" />
                  <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" className="w-full border border-[#D8D0D2] bg-transparent p-3 text-sm focus:outline-none focus:border-[#151515]" />
                </div>
                <div className="flex space-x-4 mt-6">
                  <button onClick={() => setStep(1)} className="w-1/3 border border-[#D8D0D2] text-[#151515] py-3 text-sm tracking-wider uppercase hover:border-[#151515] transition-colors">Back</button>
                  <button onClick={handleNextStep} className="w-2/3 bg-[#151515] text-[#FFF9FA] py-3 text-sm tracking-wider uppercase hover:bg-black transition-colors">Continue to Payment</button>
                </div>
              </div>
            )}

            {/* Step 3: Payment */}
            {(step === 3 || step === 4) && (
              <div>
                <h2 className="text-sm uppercase tracking-wider mb-4">Payment</h2>
                <div className="p-4 border border-[#D8D0D2] mb-6">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm">Credit Card</span>
                    <span className="text-xs text-[#777777] uppercase">Mock Payment</span>
                  </div>
                  <input type="text" name="cardNumber" value={formData.cardNumber} onChange={handleChange} placeholder="Card number" className="w-full border border-[#D8D0D2] bg-transparent p-3 text-sm focus:outline-none focus:border-[#151515] mb-4" />
                  <div className="grid grid-cols-2 gap-4">
                    <input type="text" name="expDate" value={formData.expDate} onChange={handleChange} placeholder="MM/YY" className="w-full border border-[#D8D0D2] bg-transparent p-3 text-sm focus:outline-none focus:border-[#151515]" />
                    <input type="text" name="cvv" value={formData.cvv} onChange={handleChange} placeholder="CVV" className="w-full border border-[#D8D0D2] bg-transparent p-3 text-sm focus:outline-none focus:border-[#151515]" />
                  </div>
                </div>
                <div className="flex space-x-4">
                  <button onClick={() => setStep(2)} className="w-1/3 border border-[#D8D0D2] text-[#151515] py-3 text-sm tracking-wider uppercase hover:border-[#151515] transition-colors">Back</button>
                  <button onClick={handleSubmitOrder} disabled={loading} className="w-2/3 bg-[#151515] text-[#FFF9FA] py-3 text-sm tracking-wider uppercase hover:bg-black transition-colors disabled:opacity-50">
                    {loading ? 'Processing...' : 'Pay Now'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Order Summary */}
        <div className="lg:col-span-5">
          <div className="bg-[#FFFFFF] border border-[#D8D0D2] p-6 sticky top-32">
            <h2 className="text-sm uppercase tracking-wider mb-6">Order Summary</h2>
            <div className="space-y-6 mb-6">
              {items.map(item => (
                <div key={`${item.id}-${item.selectedSize}`} className="flex gap-4">
                  <div className="w-20 h-24 bg-[#F5F5F5] overflow-hidden flex-shrink-0">
                    <img 
                      src={item.images && item.images[0] ? item.images[0] : ''} 
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 text-sm">
                    <p className="font-medium text-[#151515] mb-1">{item.name}</p>
                    <p className="text-[#777777] text-xs uppercase mb-1">Color: {item.color}</p>
                    <p className="text-[#777777] text-xs uppercase mb-2">Size: {item.selectedSize}</p>
                    <p className="text-[#777777] text-xs">Qty: {item.quantity}</p>
                  </div>
                  <div className="text-sm text-[#151515]">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-[#D8D0D2] pt-4 space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-[#777777]">Subtotal</span>
                <span className="text-[#151515]">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#777777]">Shipping</span>
                <span className="text-[#151515]">{shippingFee === 0 ? 'Free' : `$${shippingFee.toFixed(2)}`}</span>
              </div>
              <div className="border-t border-[#D8D0D2] pt-3 flex justify-between font-medium">
                <span className="text-[#151515] uppercase tracking-wider">Total</span>
                <span className="text-[#151515]">${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
