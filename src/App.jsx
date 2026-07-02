import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';

// Placeholder pages
const Home = () => (
  <div style={{ color: '#fff', textAlign: 'center', padding: '4rem', fontFamily: 'Inter, sans-serif', background: '#0f0f1a', minHeight: '100vh' }}>
    <h1 style={{ fontSize: '2rem' }}>🏠 Trang chủ</h1>
    <p style={{ color: 'rgba(255,255,255,0.5)' }}>Đăng nhập thành công! Sẽ build tiếp trang này.</p>
  </div>
);

const Register = () => (
  <div style={{ color: '#fff', textAlign: 'center', padding: '4rem', fontFamily: 'Inter, sans-serif', background: '#0f0f1a', minHeight: '100vh' }}>
    <h1>📝 Register</h1>
    <p style={{ color: 'rgba(255,255,255,0.5)' }}>Trang đăng ký — coming soon!</p>
  </div>
);

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
