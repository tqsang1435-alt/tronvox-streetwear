import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });
      const data = await res.json();
      
      if (!data.success) {
        throw new Error(data.error || 'Failed to register');
      }

      login(data.data.token, data.data.user);
      navigate("/account"); 
    } catch (err: any) {
      setError(err.message || "Failed to register");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-24 sm:py-32">
      <div className="site-container flex flex-col items-center">
        <div className="w-full max-w-md">
          <h1 className="editorial-title text-4xl text-center mb-8">Register</h1>

          {error && (
            <div className="mb-6 px-4 py-3 border border-border bg-[#F5F2F3]">
              <p className="text-xs tracking-widest text-[#E9A5B7] uppercase text-center font-semibold">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs uppercase tracking-widest mb-2" htmlFor="name">Full Name</label>
              <input
                id="name"
                type="text"
                required
                className="w-full h-12 border border-border bg-transparent px-4 text-sm focus:outline-none focus:border-black transition-colors"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest mb-2" htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                required
                className="w-full h-12 border border-border bg-transparent px-4 text-sm focus:outline-none focus:border-black transition-colors"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest mb-2" htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                required
                minLength={8}
                className="w-full h-12 border border-border bg-transparent px-4 text-sm focus:outline-none focus:border-black transition-colors"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`mt-8 flex h-14 w-full items-center justify-center bg-black text-xs font-semibold uppercase tracking-widest text-white transition-colors ${isLoading ? 'opacity-70' : 'hover:bg-black/90'}`}
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <div className="mt-8 text-center border-t border-border pt-8">
            <p className="text-sm text-gray mb-4">Already have an account?</p>
            <Link to="/login" className="text-xs uppercase tracking-widest font-medium underline underline-offset-4 decoration-border hover:decoration-black transition-colors">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
