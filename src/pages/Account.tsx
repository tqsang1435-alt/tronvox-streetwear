import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

type Order = {
  id: string;
  orderNumber: string;
  total: number;
  status: string;
  createdAt: string;
};

export default function Account() {
  const { user, token, logout, isLoading: isAuthLoading } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isAuthLoading) return;
    if (!token) {
      navigate("/login");
      return;
    }

    async function loadOrders() {
      try {
        const res = await fetch('http://localhost:5000/api/orders', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        if (data.success) {
          setOrders(data.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }

    loadOrders();
  }, [token, isAuthLoading, navigate]);

  if (isAuthLoading || isLoading) {
    return (
      <section className="py-24 sm:py-32">
        <div className="site-container">
          <p className="text-sm text-gray">Loading...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 sm:py-24">
      <div className="site-container">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
          {/* Sidebar */}
          <aside className="w-full lg:w-64 shrink-0">
            <h1 className="editorial-title text-3xl mb-8">My Account</h1>
            <p className="text-sm font-medium mb-1">{user?.name}</p>
            <p className="text-xs text-gray mb-8">{user?.email}</p>

            <nav className="flex flex-col gap-4">
              <button className="text-left text-sm font-medium text-black">Order History</button>
              <button className="text-left text-sm text-gray hover:text-black transition-colors">Addresses</button>
              <button className="text-left text-sm text-gray hover:text-black transition-colors">Settings</button>
              <button 
                onClick={() => {
                  logout();
                  navigate("/");
                }}
                className="text-left text-sm text-gray hover:text-black transition-colors mt-4 pt-4 border-t border-border"
              >
                Log Out
              </button>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            <h2 className="text-lg font-medium mb-8">Order History</h2>
            
            {orders.length === 0 ? (
              <div className="bg-[#F5F2F3] p-8 text-center border border-border">
                <p className="text-sm text-gray">You haven't placed any orders yet.</p>
                <button 
                  onClick={() => navigate("/shop")}
                  className="mt-6 inline-block border-b border-black pb-1 text-xs uppercase tracking-[0.14em] text-black font-medium"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm border-collapse min-w-[600px]">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="font-medium text-gray pb-4 font-normal">Order</th>
                      <th className="font-medium text-gray pb-4 font-normal">Date</th>
                      <th className="font-medium text-gray pb-4 font-normal">Status</th>
                      <th className="font-medium text-gray pb-4 font-normal">Total</th>
                      <th className="font-medium text-gray pb-4 font-normal text-right"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order.id} className="border-b border-border hover:bg-[#FCFAFA] transition-colors">
                        <td className="py-4 font-medium">{order.orderNumber}</td>
                        <td className="py-4 text-gray">{new Date(order.createdAt).toLocaleDateString()}</td>
                        <td className="py-4 text-gray capitalize">{order.status.toLowerCase()}</td>
                        <td className="py-4">${order.total.toFixed(2)}</td>
                        <td className="py-4 text-right">
                          <button 
                            onClick={() => navigate(`/account/orders/${order.id}`)}
                            className="text-xs uppercase tracking-widest font-medium underline underline-offset-4 decoration-border hover:decoration-black transition-colors"
                          >
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </main>
        </div>
      </div>
    </section>
  );
}

