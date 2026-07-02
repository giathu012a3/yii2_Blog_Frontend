import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm]       = useState({ username: '', password: '' });
  const [errors, setErrors]   = useState({});
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [focused, setFocused]  = useState('');

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors(prev => ({ ...prev, [e.target.name]: '' }));
  };

  const validate = () => {
    const errs = {};
    if (!form.username) errs.username = 'Tên đăng nhập không được để trống';
    else if (form.username.length < 3) errs.username = 'Tên đăng nhập tối thiểu 3 ký tự';
    if (!form.password) errs.password = 'Mật khẩu không được để trống';
    else if (form.password.length < 6) errs.password = 'Mật khẩu phải có ít nhất 6 ký tự';
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    try {
      await login(form);
      navigate('/');
    } catch (err) {
      if (!err.response) {
        setErrors({ general: 'Không thể kết nối đến máy chủ. Vui lòng kiểm tra lại kết nối mạng.' });
        return;
      }
      const responseData = err.response.data;
      if (responseData && responseData.data) {
        const serverErrors = responseData.data;
        if (typeof serverErrors === 'object' && !Array.isArray(serverErrors)) {
          const mapped = {};
          Object.entries(serverErrors).forEach(([k, v]) => {
            mapped[k] = Array.isArray(v) ? v[0] : v;
          });
          setErrors(mapped);
        } else {
          setErrors({ general: responseData.message || 'Đã có lỗi xảy ra. Vui lòng thử lại.' });
        }
      } else if (responseData && responseData.message) {
        setErrors({ general: responseData.message });
      } else {
        setErrors({ general: 'Thông tin đăng nhập không chính xác hoặc lỗi hệ thống.' });
      }
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = (name) => ({
    width: '100%',
    padding: '0.9rem 1rem 0.9rem 3rem',
    fontSize: '0.9rem',
    fontFamily: 'inherit',
    color: '#f1f5f9',
    background: focused === name ? 'rgba(255,255,255,0.07)' : 'rgba(255,255,255,0.04)',
    border: `1.5px solid ${errors[name] ? '#f87171' : focused === name ? '#818cf8' : 'rgba(255,255,255,0.1)'}`,
    borderRadius: '14px',
    outline: 'none',
    transition: 'all 0.25s ease',
    boxSizing: 'border-box',
    boxShadow: focused === name ? '0 0 0 4px rgba(129,140,248,0.12)' : 'none',
  });

  return (
    <div style={S.page}>
      <div style={S.mesh1} />
      <div style={S.mesh2} />
      <div style={S.mesh3} />
      <div style={S.gridLines} />

      <div style={S.container}>
        <div style={S.heroPanel}>
          <div style={S.orb1} />
          <div style={S.orb2} />
          <div style={S.orb3} />

          <div style={S.logoRow}>
            <div style={S.logoBox}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.3">
                <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                <path d="M2 17l10 5 10-5"/>
                <path d="M2 12l10 5 10-5"/>
              </svg>
            </div>
            <span style={S.logoText}>Yii2 Blog</span>
          </div>

          <div style={S.heroContent}>
            <div style={S.heroBadge}>✦ Nền tảng viết blog thế hệ mới</div>
            <h2 style={S.heroTitle}>
              Viết. Chia sẻ.<br />
              <span style={S.heroGradText}>Truyền cảm hứng.</span>
            </h2>
            <p style={S.heroDesc}>
              Tham gia cộng đồng hàng nghìn tác giả, chia sẻ kiến thức và
              kết nối với độc giả trên toàn thế giới.
            </p>

            <div style={S.statsRow}>
              {[
                { val: '10K+', label: 'Bài viết' },
                { val: '5K+',  label: 'Tác giả' },
                { val: '50K+', label: 'Độc giả' },
              ].map(s => (
                <div key={s.label} style={S.statItem}>
                  <span style={S.statVal}>{s.val}</span>
                  <span style={S.statLabel}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={S.testimonial}>
            <div style={S.testimonialAvatar}>TN</div>
            <div>
              <p style={S.testimonialText}>"Nền tảng tuyệt vời để chia sẻ kiến thức lập trình!"</p>
              <span style={S.testimonialAuthor}>Thanh Nguyễn · Senior Developer</span>
            </div>
          </div>
        </div>

        <div style={S.formPanel}>
          <div style={S.formInner}>
            <div style={S.formHead}>
              <h1 style={S.formTitle}>Đăng nhập</h1>
              <p style={S.formSub}>
                Chưa có tài khoản?{' '}
                <Link to="/register" style={S.inlineLink}>Tạo tài khoản miễn phí</Link>
              </p>
            </div>

            {errors.general && (
              <div style={S.errorBanner}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0 }}>
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="12" y1="8" x2="12" y2="12"/>
                  <line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                {errors.general}
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate style={S.form}>
              <div style={S.field}>
                <label style={S.label}>Tên đăng nhập</label>
                <div style={{ position: 'relative' }}>
                  <svg style={S.iconLeft} width="16" height="16" viewBox="0 0 24 24" fill="none"
                    stroke={focused === 'username' ? '#818cf8' : '#64748b'} strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                  <input
                    id="username" name="username" type="text"
                    value={form.username} onChange={handleChange}
                    placeholder="Nhập tên đăng nhập"
                    disabled={loading}
                    style={inputStyle('username')}
                    onFocus={() => setFocused('username')}
                    onBlur={() => setFocused('')}
                    autoComplete="username"
                  />
                </div>
                {errors.username && <span style={S.errMsg}>{errors.username}</span>}
              </div>

              <div style={S.field}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <label style={S.label}>Mật khẩu</label>
                  <a href="#" style={S.forgotLink}>Quên mật khẩu?</a>
                </div>
                <div style={{ position: 'relative' }}>
                  <svg style={S.iconLeft} width="16" height="16" viewBox="0 0 24 24" fill="none"
                    stroke={focused === 'password' ? '#818cf8' : '#64748b'} strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                  <input
                    id="password" name="password"
                    type={showPass ? 'text' : 'password'}
                    value={form.password} onChange={handleChange}
                    placeholder="Nhập mật khẩu của bạn"
                    disabled={loading}
                    style={{ ...inputStyle('password'), paddingRight: '3rem' }}
                    onFocus={() => setFocused('password')}
                    onBlur={() => setFocused('')}
                  />
                  <button type="button" onClick={() => setShowPass(p => !p)}
                    style={S.eyeBtn} tabIndex={-1}>
                    {showPass
                      ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                      : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                    }
                  </button>
                </div>
                {errors.password && <span style={S.errMsg}>{errors.password}</span>}
              </div>

              <button type="submit" disabled={loading} style={{
                ...S.submitBtn,
                opacity: loading ? 0.75 : 1,
                cursor: loading ? 'not-allowed' : 'pointer',
              }}
                onMouseEnter={e => { if (!loading) { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 35px rgba(99,102,241,0.55)'; }}}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 6px 25px rgba(99,102,241,0.4)'; }}
              >
                {loading ? (
                  <><span style={S.spinner} /> Đang xác thực...</>
                ) : (
                  <><span>Đăng nhập ngay</span>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <line x1="5" y1="12" x2="19" y2="12"/>
                      <polyline points="12 5 19 12 12 19"/>
                    </svg>
                  </>
                )}
              </button>
            </form>

            <div style={S.divider}>
              <span style={S.dividerLine} />
              <span style={S.dividerText}>Hoặc tiếp tục với</span>
              <span style={S.dividerLine} />
            </div>

            <div style={S.socialRow}>
              {[
                { name: 'Google', icon: (
                  <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                )},
                { name: 'GitHub', icon: (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="rgba(255,255,255,0.8)"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                )},
              ].map(s => (
                <button key={s.name} type="button" style={S.socialBtn}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                >
                  {s.icon}
                  <span style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.75)', fontWeight: 500 }}>{s.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const S = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#07091a',
    fontFamily: "'Inter', system-ui, sans-serif",
    position: 'relative',
    overflow: 'hidden',
    padding: '1.5rem',
  },
  mesh1: { position:'fixed', top:'-20%', left:'-10%', width:'55vw', height:'55vw', borderRadius:'50%', background:'radial-gradient(circle, rgba(99,102,241,0.25) 0%, transparent 65%)', pointerEvents:'none' },
  mesh2: { position:'fixed', bottom:'-15%', right:'-5%', width:'45vw', height:'45vw', borderRadius:'50%', background:'radial-gradient(circle, rgba(59,130,246,0.2) 0%, transparent 65%)', pointerEvents:'none' },
  mesh3: { position:'fixed', top:'40%', left:'40%', width:'30vw', height:'30vw', borderRadius:'50%', background:'radial-gradient(circle, rgba(168,85,247,0.15) 0%, transparent 65%)', pointerEvents:'none' },
  gridLines: {
    position:'fixed', inset:0, pointerEvents:'none',
    backgroundImage:'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
    backgroundSize:'60px 60px',
  },
  container: {
    position:'relative', zIndex:1,
    display:'flex',
    width:'100%', maxWidth:'1060px',
    minHeight:'600px',
    borderRadius:'28px',
    overflow:'hidden',
    boxShadow:'0 30px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.06)',
  },
  heroPanel: {
    width:'52%', position:'relative',
    background:'linear-gradient(145deg, #0f0c29, #302b63, #24243e)',
    padding:'2.5rem',
    display:'flex', flexDirection:'column',
    overflow:'hidden',
  },
  orb1: { position:'absolute', top:'-80px', right:'-60px', width:'300px', height:'300px', borderRadius:'50%', background:'radial-gradient(circle, rgba(99,102,241,0.4), transparent 70%)', pointerEvents:'none' },
  orb2: { position:'absolute', bottom:'-60px', left:'-40px', width:'250px', height:'250px', borderRadius:'50%', background:'radial-gradient(circle, rgba(139,92,246,0.35), transparent 70%)', pointerEvents:'none' },
  orb3: { position:'absolute', top:'50%', left:'45%', width:'200px', height:'200px', borderRadius:'50%', background:'radial-gradient(circle, rgba(59,130,246,0.25), transparent 70%)', pointerEvents:'none' },
  logoRow: { display:'flex', alignItems:'center', gap:'0.7rem', position:'relative', zIndex:1 },
  logoBox: {
    width:'40px', height:'40px', borderRadius:'12px',
    background:'linear-gradient(135deg, #6366f1, #8b5cf6)',
    display:'flex', alignItems:'center', justifyContent:'center',
    boxShadow:'0 4px 16px rgba(99,102,241,0.5)',
  },
  logoText: { fontSize:'1.1rem', fontWeight:'700', color:'#fff', letterSpacing:'-0.3px' },
  heroContent: { marginTop:'auto', marginBottom:'2rem', position:'relative', zIndex:1 },
  heroBadge: {
    display:'inline-flex', alignItems:'center', gap:'6px',
    padding:'0.35rem 0.85rem',
    background:'rgba(99,102,241,0.2)',
    border:'1px solid rgba(99,102,241,0.4)',
    borderRadius:'999px',
    fontSize:'0.75rem', fontWeight:'600',
    color:'#a5b4fc', letterSpacing:'0.3px',
    marginBottom:'1.25rem',
  },
  heroTitle: {
    fontSize:'2.4rem', fontWeight:'800', color:'#fff',
    lineHeight:'1.2', margin:'0 0 1rem',
    letterSpacing:'-1px',
  },
  heroGradText: {
    background:'linear-gradient(90deg, #818cf8, #c4b5fd, #67e8f9)',
    WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent',
  },
  heroDesc: { fontSize:'0.9rem', color:'rgba(255,255,255,0.55)', lineHeight:'1.7', margin:'0 0 2rem', maxWidth:'340px' },
  statsRow: { display:'flex', gap:'2rem' },
  statItem: { display:'flex', flexDirection:'column', gap:'2px' },
  statVal: { fontSize:'1.4rem', fontWeight:'800', color:'#fff' },
  statLabel: { fontSize:'0.75rem', color:'rgba(255,255,255,0.45)', fontWeight:'500' },
  testimonial: {
    display:'flex', alignItems:'center', gap:'0.85rem',
    padding:'1rem 1.25rem',
    background:'rgba(255,255,255,0.06)',
    border:'1px solid rgba(255,255,255,0.1)',
    borderRadius:'16px',
    backdropFilter:'blur(10px)',
    position:'relative', zIndex:1,
  },
  testimonialAvatar: {
    width:'40px', height:'40px', borderRadius:'50%',
    background:'linear-gradient(135deg, #6366f1, #8b5cf6)',
    display:'flex', alignItems:'center', justifyContent:'center',
    fontSize:'0.8rem', fontWeight:'700', color:'#fff',
    flexShrink:0,
  },
  testimonialText: { fontSize:'0.8rem', color:'rgba(255,255,255,0.75)', lineHeight:'1.5', margin:'0 0 3px' },
  testimonialAuthor: { fontSize:'0.73rem', color:'rgba(255,255,255,0.4)', fontWeight:'500' },
  formPanel: {
    flex:1,
    background:'#0d1117',
    display:'flex', alignItems:'center', justifyContent:'center',
    padding:'2.5rem',
    borderLeft:'1px solid rgba(255,255,255,0.06)',
  },
  formInner: { width:'100%', maxWidth:'360px' },
  formHead: { marginBottom:'2rem' },
  formTitle: { fontSize:'1.9rem', fontWeight:'800', color:'#f1f5f9', margin:'0 0 0.4rem', letterSpacing:'-0.8px' },
  formSub: { fontSize:'0.85rem', color:'rgba(255,255,255,0.4)', margin:0 },
  inlineLink: { color:'#818cf8', fontWeight:'600', textDecoration:'none' },
  errorBanner: {
    display:'flex', alignItems:'center', gap:'0.6rem',
    padding:'0.8rem 1rem', marginBottom:'1.25rem',
    background:'rgba(239,68,68,0.1)', border:'1px solid rgba(239,68,68,0.3)',
    borderRadius:'12px', color:'#fca5a5', fontSize:'0.83rem',
  },
  form: { display:'flex', flexDirection:'column', gap:'1.25rem' },
  field: { display:'flex', flexDirection:'column', gap:'0.45rem' },
  label: { fontSize:'0.8rem', fontWeight:'600', color:'rgba(255,255,255,0.6)', letterSpacing:'0.2px' },
  iconLeft: {
    position:'absolute', left:'14px', top:'50%', transform:'translateY(-50%)',
    pointerEvents:'none', transition:'stroke 0.2s',
  },
  errMsg: { fontSize:'0.76rem', color:'#f87171' },
  forgotLink: { fontSize:'0.78rem', color:'#818cf8', textDecoration:'none', fontWeight:'500' },
  eyeBtn: {
    position:'absolute', right:'12px', top:'50%', transform:'translateY(-50%)',
    background:'none', border:'none', cursor:'pointer',
    color:'rgba(255,255,255,0.3)', display:'flex', alignItems:'center',
    padding:'4px', borderRadius:'6px', transition:'color 0.2s',
  },
  submitBtn: {
    width:'100%', padding:'0.95rem 1.5rem', marginTop:'0.5rem',
    background:'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #4f46e5 100%)',
    backgroundSize:'200% 200%',
    border:'none', borderRadius:'14px',
    color:'#fff', fontSize:'0.95rem', fontWeight:'700',
    fontFamily:'inherit',
    display:'flex', alignItems:'center', justifyContent:'center', gap:'0.5rem',
    boxShadow:'0 6px 25px rgba(99,102,241,0.4)',
    transition:'transform 0.2s, box-shadow 0.2s',
    letterSpacing:'0.2px',
  },
  spinner: {
    display:'inline-block', width:'17px', height:'17px',
    border:'2.5px solid rgba(255,255,255,0.3)',
    borderTopColor:'#fff', borderRadius:'50%',
    animation:'spin 0.7s linear infinite',
  },
  divider: { display:'flex', alignItems:'center', gap:'1rem', margin:'1.5rem 0 1.25rem' },
  dividerLine: { flex:1, height:'1px', background:'rgba(255,255,255,0.08)' },
  dividerText: { fontSize:'0.75rem', color:'rgba(255,255,255,0.3)', whiteSpace:'nowrap', fontWeight:'500' },
  socialRow: { display:'flex', gap:'0.75rem' },
  socialBtn: {
    flex:1, display:'flex', alignItems:'center', justifyContent:'center', gap:'0.6rem',
    padding:'0.75rem',
    background:'rgba(255,255,255,0.05)',
    border:'1px solid rgba(255,255,255,0.1)',
    borderRadius:'12px', cursor:'pointer',
    transition:'background 0.2s', fontFamily:'inherit',
  },
};
