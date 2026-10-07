import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function AdminLogin({ onLogin }: { onLogin: () => void }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim().toLowerCase() === 'admin' && password === 'admin123') {
      onLogin();
      navigate('/admin');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f3f4f6] font-sans px-4">
      <div className="bg-white p-8 sm:p-10 rounded-[8px] shadow-[0_4px_24px_rgba(0,0,0,.08)] w-full max-w-[420px] border border-[#e5e7eb]">
        <div className="text-center mb-8">
          <div className="font-serif text-[28px] font-semibold text-navy">Govind CMS</div>
          <div className="text-[12px] uppercase tracking-[.08em] text-taupe font-semibold mt-1">Admin Portal Login</div>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-[12px] font-semibold text-charcoal uppercase tracking-[.04em]">Username</label>
            <input 
              type="text" 
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                if (error) setError('');
              }}
              className="p-3 border border-[#e5e7eb] rounded-[4px] focus:outline-none focus:border-navy text-[14.5px] transition-colors"
              placeholder="e.g. admin"
              autoFocus
              required
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[12px] font-semibold text-charcoal uppercase tracking-[.04em]">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (error) setError('');
              }}
              className="p-3 border border-[#e5e7eb] rounded-[4px] focus:outline-none focus:border-navy text-[14.5px] transition-colors"
              placeholder="e.g. admin123"
              required
            />
          </div>

          {error && (
            <div className="text-red-500 text-[13px] bg-red-50 p-2.5 rounded-[4px] border border-red-100 font-medium text-center">
              {error}
            </div>
          )}

          <button 
            type="submit" 
            className="bg-navy text-white py-3 rounded-[4px] font-semibold tracking-[.02em] hover:bg-navy-deep mt-2 transition-colors cursor-pointer"
          >
            Sign In to CMS
          </button>
        </form>

        <div className="mt-6 pt-5 border-t border-[#f0f0f0] text-center flex flex-col gap-2">
          <p className="text-[11.5px] text-taupe">
            Default credentials: <span className="font-semibold text-navy">admin</span> / <span className="font-semibold text-navy">admin123</span>
          </p>
          <Link to="/" className="text-[12.5px] text-taupe hover:text-navy transition-colors mt-1 font-medium">
            ← Return to public website
          </Link>
        </div>
      </div>
    </div>
  );
}
