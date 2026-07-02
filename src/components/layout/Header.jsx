import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Header() {
  const { user, logout, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[#0b0f19]/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                  <path d="M2 17l10 5 10-5"/>
                  <path d="M2 12l10 5 10-5"/>
                </svg>
              </div>
              <span className="text-white font-bold text-lg tracking-tight">Yii2 Blog</span>
            </Link>

            <nav className="hidden md:flex items-center gap-6">
              <Link to="/" className="text-white/70 hover:text-white text-sm font-medium transition-colors">
                Trang chủ
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            {isLoggedIn && user ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-300 text-xs font-semibold uppercase">
                    {user.username ? user.username.substring(0, 2) : 'US'}
                  </div>
                  <span className="text-white/80 text-sm font-medium hidden sm:inline">{user.username}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="px-3.5 py-1.5 rounded-lg border border-white/10 text-white/70 hover:text-white hover:border-white/20 text-xs font-semibold transition-all duration-200"
                >
                  Đăng xuất
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to="/login"
                  className="text-white/70 hover:text-white text-sm font-semibold px-3 py-1.5 transition-colors"
                >
                  Đăng nhập
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-sm font-semibold shadow-lg shadow-indigo-500/25 transition-all duration-200"
                >
                  Đăng ký
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
