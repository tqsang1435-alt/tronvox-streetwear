import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const OrderConfirmation: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { token } = useAuth();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/orders/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (!response.ok) throw new Error('Order not found');
        const data = await response.json();
        setOrder(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    if (token && id) {
      fetchOrder();
    }
  }, [id, token]);

  if (loading) {
    return (
      <div className="min-h-screen pt-32 pb-16 flex items-center justify-center bg-[#FFF9FA]">
        <div className="text-sm tracking-wider uppercase text-[#777777]">Loading...</div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen pt-32 pb-16 flex flex-col items-center justify-center bg-[#FFF9FA]">
        <h1 className="text-2xl font-light text-[#151515] mb-4 uppercase tracking-widest">Order Not Found</h1>
        <Link to="/shop" className="border border-[#151515] px-8 py-3 text-sm tracking-wider hover:bg-[#151515] hover:text-[#FFF9FA] transition-colors">
          RETURN TO SHOP
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-16 bg-[#FFF9FA]">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <h1 className="text-3xl font-light text-[#151515] mb-4 uppercase tracking-widest">Thank You</h1>
        <p className="text-sm text-[#777777] mb-8">Your order has been successfully placed.</p>
        
        <div className="bg-[#FFFFFF] border border-[#D8D0D2] p-8 text-left mb-8">
          <h2 className="text-sm uppercase tracking-wider mb-6 border-b border-[#D8D0D2] pb-4">Order Details</h2>
          <div className="grid grid-cols-2 gap-8 mb-8 text-sm">
            <div>
              <p className="text-[#777777] uppercase mb-1 text-xs">Order Number</p>
              <p className="text-[#151515]">{order.orderNumber}</p>
            </div>
            <div>
              <p className="text-[#777777] uppercase mb-1 text-xs">Date</p>
              <p className="text-[#151515]">{new Date(order.createdAt).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-[#777777] uppercase mb-1 text-xs">Email</p>
              <p className="text-[#151515]">{order.contactEmail}</p>
            </div>
            <div>
              <p className="text-[#777777] uppercase mb-1 text-xs">Total Amount</p>
              <p className="text-[#151515]">${order.total.toFixed(2)}</p>
            </div>
          </div>
          
          <div className="space-y-4">
            {order.items.map((item: any) => (
              <div key={item.id} className="flex gap-4 border-t border-[#D8D0D2] pt-4">
                <div className="w-16 h-20 bg-[#F5F5F5] overflow-hidden flex-shrink-0">
                  <img 
                    src={item.variant.product.images[0]?.url} 
                    alt={item.variant.product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 text-sm flex flex-col justify-center">
                  <p className="font-medium text-[#151515]">{item.variant.product.name}</p>
                  <p className="text-[#777777] text-xs uppercase mt-1">
                    {item.variant.color} / {item.variant.size}
                  </p>
                </div>
                <div className="text-sm text-[#151515] flex flex-col justify-center items-end">
                  <p>Qty: {item.quantity}</p>
                  <p>${item.priceAtTime.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center space-x-6">
          <Link to="/account" className="border border-[#151515] px-8 py-3 text-sm tracking-wider uppercase hover:bg-[#151515] hover:text-[#FFF9FA] transition-colors">
            View Orders
          </Link>
          <Link to="/shop" className="bg-[#151515] text-[#FFF9FA] px-8 py-3 text-sm tracking-wider uppercase hover:bg-black transition-colors">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

