import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

type OrderItem = {
  id: string;
  quantity: number;
  purchasePrice: number;
  variant: {
    size: string;
    color: string;
    product: {
      name: string;
      slug: string;
      images: { url: string }[];
    }
  }
};

type Order = {
  id: string;
  orderNumber: string;
  total: number;
  status: string;
  createdAt: string;
  contactEmail: string;
  shippingAddress: any;
  items: OrderItem[];
};

export default function OrderDetails() {
  const { id } = useParams();
  const { token, isLoading: isAuthLoading } = useAuth();
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isAuthLoading) return;
    if (!token) {
      navigate("/login");
      return;
    }

    async function loadOrder() {
      try {
        const res = await fetch(`http://localhost:5000/api/orders/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        if (data.success) {
          setOrder(data.data);
        } else {
          navigate("/account");
        }
      } catch (err) {
        console.error(err);
        navigate("/account");
      } finally {
        setIsLoading(false);
      }
    }

    loadOrder();
  }, [id, token, isAuthLoading, navigate]);

  if (isAuthLoading || isLoading) {
    return (
      <section className="py-24 sm:py-32">
        <div className="site-container">
          <p className="text-sm text-gray">Loading...</p>
        </div>
      </section>
    );
  }

  if (!order) return null;

  return (
    <section className="py-12 sm:py-24">
      <div className="site-container max-w-4xl">
        <div className="mb-12">
          <Link to="/account" className="text-xs uppercase tracking-widest font-medium text-gray hover:text-black flex items-center gap-2 mb-6 transition-colors">
            ← Back to Account
          </Link>
          <h1 className="editorial-title text-3xl mb-2">Order {order.orderNumber}</h1>
          <p className="text-sm text-gray">Placed on {new Date(order.createdAt).toLocaleDateString()}</p>
        </div>

        <div className="flex flex-col md:flex-row gap-12">
          {/* Order Items */}
          <div className="flex-1">
            <h2 className="text-sm uppercase tracking-widest font-semibold mb-6 border-b border-border pb-4">Items</h2>
            <div className="space-y-6">
              {order.items.map((item) => (
                <div key={item.id} className="flex gap-6">
                  <div className="w-24 shrink-0 bg-[#F5F2F3] aspect-[3/4]">
                    <img src={item.variant.product.images[0]?.url} alt={item.variant.product.name} className="w-full h-full object-contain" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between py-1">
                    <div>
                      <p className="font-medium text-sm">{item.variant.product.name}</p>
                      <p className="text-sm text-gray mt-1">{item.variant.color} / {item.variant.size}</p>
                    </div>
                    <div className="flex justify-between items-end mt-4">
                      <p className="text-sm text-gray">Qty: {item.quantity}</p>
                      <p className="text-sm font-medium">${item.purchasePrice.toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary & Info */}
          <div className="w-full md:w-80 shrink-0">
            <div className="bg-[#FCFAFA] border border-border p-6 mb-6">
              <h2 className="text-sm uppercase tracking-widest font-semibold mb-6">Summary</h2>
              <div className="space-y-4 text-sm mb-6 pb-6 border-b border-border">
                <div className="flex justify-between text-gray">
                  <span>Subtotal</span>
                  <span>${order.total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
              </div>
              <div className="flex justify-between font-medium">
                <span>Total</span>
                <span>${order.total.toFixed(2)}</span>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="text-xs uppercase tracking-widest font-semibold mb-3">Shipping Address</h3>
                <div className="text-sm text-gray leading-relaxed">
                  <p>{order.shippingAddress.firstName} {order.shippingAddress.lastName}</p>
                  <p>{order.shippingAddress.address1}</p>
                  {order.shippingAddress.address2 && <p>{order.shippingAddress.address2}</p>}
                  <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}</p>
                  <p>{order.shippingAddress.country}</p>
                </div>
              </div>

              <div>
                <h3 className="text-xs uppercase tracking-widest font-semibold mb-3">Status</h3>
                <p className="text-sm text-gray capitalize">{order.status.toLowerCase()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

