import React, { useState } from 'react';
import { ArrowRight, Lock, Mail, User, Phone, CheckCircle2 } from 'lucide-react';

interface SplashViewProps {
  onEnter: (asGuest: boolean, userCredentials?: { name: string; phone: string }) => void;
}

export default function SplashView({ onEnter }: SplashViewProps) {
  const [modalType, setModalType] = useState<'none' | 'login' | 'register'>('none');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleGuest = () => {
    onEnter(true);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || !password) {
      alert('Vui lòng điền đầy đủ thông tin!');
      return;
    }
    setSuccessMsg('Đăng nhập thành công!');
    setTimeout(() => {
      onEnter(false, { name: 'Nguyễn Văn A', phone });
    }, 1000);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !password) {
      alert('Vui lòng điền đầy đủ thông tin bắt buộc (*)!');
      return;
    }
    setSuccessMsg('Đăng ký tài khoản thành công!');
    setTimeout(() => {
      onEnter(false, { name, phone });
    }, 1000);
  };

  return (
    <div className="relative w-full max-w-[480px] h-[850px] bg-surface mx-auto overflow-hidden shadow-2xl sm:rounded-[2rem] border border-outline-variant/30 flex flex-col justify-between">
      
      {/* Top Half: Trendy Fashion Collage */}
      <div className="relative h-[60%] w-full overflow-hidden p-3 grid grid-cols-2 gap-2">
        {/* Main Hero Image (Left, Tall) */}
        <div 
          className="col-span-1 row-span-2 rounded-2xl bg-cover bg-center overflow-hidden relative shadow-md transition-transform duration-700 hover:scale-[1.02]"
          style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCfnp_5uwu3Kv4v6cv0o3DyVQWfyUnvhu9aP2mkj4DakLSMaKIRApqTqyK1rCYooo-9oGgHBam5n9aBs3TR-LZIIw8LqtjJn65ZatU_6-BLL3OS-bxq3tquxBVRLc1fFKNs4zk00Q1FiCnxwm-CqQF6qElRwFsZ25eor15KdOdBnVynbEUQfCrxPJLlqMTLgMyQCoApXnDlrgLRGcqF-RiiiQWIXiB6g8yVlGwRt0rJKNc1w3ngVRvB4HSUf4jl189DUAwSwAQ3xc4')` }}
        >
          <div className="absolute inset-0 bg-brand-primary/10 mix-blend-overlay"></div>
        </div>
        
        {/* Secondary Image (Top Right) */}
        <div 
          className="col-span-1 row-span-1 rounded-2xl bg-cover bg-center overflow-hidden relative shadow-sm transition-transform duration-700 hover:scale-[1.02]"
          style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDHWEjXxTogtTsrD2QUIpyyWyIiiwW2EdSnBQRPSYHhWjNSbz7zfrRnCdbs93XBnACySG8MEVrKk647pb_2AGa3gcyVnC8eZadTxr7dJ3IH4iwHlZrAb6u_SIjnz8nAkmq5cNwxB9nczc9ddiy1CzDXCyjhYNqqxu5Sv1mX5AKli5JZDbsyTyGWCSjmYndG3AL2iSYCkzdBEWBVDF6LtgJzROmnzyFjKNiyTLe_mc6QuG8zpapL530WCsc-gXjb21liwzK9Syj9qRE')` }}
        >
          <div className="absolute inset-0 bg-black/5"></div>
        </div>

        {/* Tertiary Image (Bottom Right) */}
        <div 
          className="col-span-1 row-span-1 rounded-2xl bg-cover bg-center overflow-hidden relative shadow-sm transition-transform duration-700 hover:scale-[1.02]"
          style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuA2w3lyatWksjznNEo9omgHt-Cmlp9kr3U4b5Q7tBfLyJgfVZOEv31FcXHRxqcSr1j3ikvcprel03ml6fB4P00GvxDCUBDFzQ1WSUo6JIx0c_DsYgP5FkB9ztXZZlhNpeByPJ8vHkXsazjGW2n9Vpw3l-u_Xg_MxxxnOydIxvYzIHMcGHb9DbjQa7PUGfukQX7hM7fwPuJ4UunWUlF9C7lHFi4CXyKboS0gJxF81CF0sNuZda-kbbAcwH6QOETEzwIy6P67mguAk2o')` }}
        >
          <div className="absolute inset-0 bg-brand-primary/10 mix-blend-multiply"></div>
        </div>
      </div>

      {/* Ambient gradient layer */}
      <div className="absolute top-[40%] left-0 w-full h-[25%] bg-gradient-to-t from-surface via-surface/90 to-transparent pointer-events-none z-10"></div>

      {/* Bottom Half: Brand Description & Action Buttons */}
      <div className="relative z-20 flex flex-col justify-end px-6 pb-10 pt-4 flex-grow select-none">
        
        {/* Brand Header */}
        <div className="flex flex-col items-center text-center mb-6 animate-fade-in-up">
          <h1 className="text-4xl font-extrabold text-brand-primary tracking-tighter mb-1 select-none">
            VibeCloset
            <span className="block text-xl font-bold text-on-surface tracking-normal mt-1 opacity-90">Vietnam</span>
          </h1>
          <p className="text-sm font-medium text-on-surface-variant max-w-[280px]">
            Thời trang của bạn, phong cách của bạn
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col gap-3 w-full animate-fade-in-up md:delay-100">
          
          {/* Register (Primary CTA) */}
          <button 
            id="register-btn"
            onClick={() => setModalType('register')}
            className="w-full h-14 bg-brand-primary text-white rounded-full flex items-center justify-center font-semibold text-base hover:opacity-95 active:scale-95 transition-all shadow-[0px_4px_20px_rgba(185,7,96,0.25)] cursor-pointer"
          >
            Đăng ký
          </button>

          {/* Login (Secondary CTA) */}
          <button 
            id="login-btn"
            onClick={() => setModalType('login')}
            className="w-full h-14 bg-surface-lowest text-on-surface rounded-full flex items-center justify-center font-semibold text-base border border-outline-variant/50 hover:bg-surface-high active:scale-95 transition-all cursor-pointer"
          >
            Đăng nhập
          </button>

          {/* Continue with Guest Mode */}
          <button 
            id="guest-btn"
            onClick={handleGuest}
            className="mt-2 w-full h-10 flex items-center justify-center font-semibold text-sm text-brand-slate hover:text-brand-primary transition-colors group cursor-pointer"
          >
            Tiếp tục với tư cách khách
            <ArrowRight className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
          </button>

        </div>
      </div>

      {/* Login / Register Modal Dialog Card Overlay */}
      {modalType !== 'none' && (
        <div className="absolute inset-0 bg-black/40 z-50 flex items-end justify-center">
          <div className="w-full max-h-[85%] bg-surface rounded-t-[1.75rem] p-6 shadow-2xl overflow-y-auto animate-fade-in-up relative">
            
            {/* Close Button line */}
            <div className="w-12 h-1.5 bg-outline-variant/40 rounded-full mx-auto mb-5 cursor-pointer" onClick={() => { setModalType('none'); setSuccessMsg(''); }} />
            
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-on-surface">
                {modalType === 'login' ? 'Đăng nhập tài khoản' : 'Đăng ký VibeCloset'}
              </h2>
              <button 
                onClick={() => { setModalType('none'); setSuccessMsg(''); }}
                className="text-brand-slate hover:text-brand-primary text-sm font-semibold cursor-pointer"
              >
                Hủy
              </button>
            </div>

            {successMsg ? (
              <div className="py-12 flex flex-col items-center justify-center text-center">
                <CheckCircle2 className="w-16 h-16 text-brand-tertiary mb-4 animate-bounce" />
                <p className="text-lg font-bold text-on-surface">{successMsg}</p>
                <p className="text-sm text-brand-slate mt-1">Vui lòng chờ giây lát...</p>
              </div>
            ) : (
              <form onSubmit={modalType === 'login' ? handleLoginSubmit : handleRegisterSubmit} className="space-y-4">
                
                {modalType === 'register' && (
                  <div>
                    <label className="block text-xs font-bold text-brand-slate uppercase tracking-wider mb-1">Họ và tên *</label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-slate w-4 h-4" />
                      <input 
                        type="text" 
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Ví dụ: Nguyễn Văn A"
                        className="w-full bg-surface-lowest border border-outline-variant/60 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-brand-primary transition-all"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold text-brand-slate uppercase tracking-wider mb-1">Số điện thoại *</label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-slate w-4 h-4" />
                    <input 
                      type="tel" 
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Ví dụ: 0901234567"
                      className="w-full bg-surface-lowest border border-outline-variant/60 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-brand-primary transition-all"
                    />
                  </div>
                </div>

                {modalType === 'register' && (
                  <div>
                    <label className="block text-xs font-bold text-brand-slate uppercase tracking-wider mb-1">Địa chỉ Email (Nếu có)</label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-slate w-4 h-4" />
                      <input 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="username@gmail.com"
                        className="w-full bg-surface-lowest border border-outline-variant/60 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-brand-primary transition-all"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold text-brand-slate uppercase tracking-wider mb-1">Mật khẩu *</label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-slate w-4 h-4" />
                    <input 
                      type="password" 
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Nhập mật khẩu"
                      className="w-full bg-surface-lowest border border-outline-variant/60 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-brand-primary transition-all"
                    />
                  </div>
                </div>

                <div className="pt-4 pb-2">
                  <button 
                    type="submit"
                    className="w-full py-4 bg-brand-primary text-white rounded-xl font-semibold hover:bg-brand-primary/95 transition-colors cursor-pointer"
                  >
                    {modalType === 'login' ? 'Đăng nhập ngay' : 'Đăng ký tài khoản mới'}
                  </button>
                </div>

                <div className="text-center">
                  <span className="text-xs text-brand-slate">
                    {modalType === 'login' ? 'Bạn chưa có tài khoản?' : 'Bạn đã có tài khoản rồi?'}
                  </span>{' '}
                  <button 
                    type="button" 
                    onClick={() => { setModalType(modalType === 'login' ? 'register' : 'login'); setSuccessMsg(''); }}
                    className="text-xs font-bold text-brand-primary hover:underline ml-1 cursor-pointer"
                  >
                    {modalType === 'login' ? 'Đăng ký tại đây' : 'Đăng nhập tại đây'}
                  </button>
                </div>

              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
