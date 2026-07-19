import React, { useState, useMemo } from 'react';
import { Product } from '../types';
import { User, Phone, MapPin, Edit3, Save, Trash2, Heart, Tag } from 'lucide-react';

interface MeViewProps {
  products: Product[];
  likedProductIds: string[];
  userProfile: { name: string; phone: string; address: string; city: string; uploadedProductIds: string[] };
  onUpdateAddress: (profile: { name: string; phone: string; address: string; city: string }) => void;
  onSelectProduct: (product: Product) => void;
  onDeleteUploadedProduct?: (productId: string) => void;
}

export default function MeView({
  products,
  likedProductIds,
  userProfile,
  onUpdateAddress,
  onSelectProduct,
  onDeleteUploadedProduct
}: MeViewProps) {
  const [activeTab, setActiveTab] = useState<'uploads' | 'favorites'>('uploads');
  
  // Profile editing
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(userProfile.name);
  const [phone, setPhone] = useState(userProfile.phone);
  const [address, setAddress] = useState(userProfile.address);
  const [city, setCity] = useState(userProfile.city);

  // Filter products uploaded by the user
  const uploadedItems = useMemo(() => {
    return products.filter(p => userProfile.uploadedProductIds.includes(p.id) || p.id.startsWith('custom-'));
  }, [products, userProfile.uploadedProductIds]);

  // Filter products hearted/liked by the user
  const heartedItems = useMemo(() => {
    return products.filter(p => likedProductIds.includes(p.id));
  }, [products, likedProductIds]);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateAddress({ name, phone, address, city });
    setIsEditing(false);
  };

  return (
    <div className="w-full flex flex-col gap-6 animate-fade-in-up">
      
      {/* Profile summary info card */}
      <section className="bg-gradient-to-br from-brand-primary to-brand-secondary text-white p-6 rounded-2xl shadow-md border border-brand-accent/20">
        
        {isEditing ? (
          <form onSubmit={handleSaveProfile} className="space-y-4">
            <h3 className="font-bold text-base border-b border-white/20 pb-1 text-white flex items-center justify-between">
              Cập nhật thông tin cá nhân
              <button 
                type="button" 
                onClick={() => setIsEditing(false)} 
                className="text-xs hover:underline text-stone-200"
              >
                Hủy
              </button>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-stone-200 uppercase mb-1">Họ và tên</label>
                <input 
                  type="text" 
                  value={name} 
                  required
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-white/10 rounded-lg p-2 border border-white/20 text-white text-sm focus:outline-none focus:bg-white/20 placeholder:text-stone-300"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-stone-200 uppercase mb-1">Số điện thoại</label>
                <input 
                  type="tel" 
                  value={phone} 
                  required
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-white/10 rounded-lg p-2 border border-white/20 text-white text-sm focus:outline-none focus:bg-white/20 placeholder:text-stone-300"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-[10px] font-bold text-stone-200 uppercase mb-1">Địa chỉ giao hàng</label>
                <input 
                  type="text" 
                  value={address} 
                  required
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full bg-white/10 rounded-lg p-2 border border-white/20 text-white text-sm focus:outline-none focus:bg-white/20 placeholder:text-stone-300"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-stone-200 uppercase mb-1">Thành phố</label>
                <input 
                  type="text" 
                  value={city} 
                  required
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full bg-white/10 rounded-lg p-2 border border-white/20 text-white text-sm focus:outline-none focus:bg-white/20"
                />
              </div>
            </div>

            <button 
              type="submit"
              className="px-5 py-2.5 bg-white text-brand-primary font-bold text-xs rounded-xl hover:bg-stone-100 flex items-center gap-1 cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              Lưu thay đổi
            </button>
          </form>
        ) : (
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-white text-brand-primary flex items-center justify-center font-extrabold text-2xl shadow-sm border-2 border-brand-accent select-none">
                {userProfile.name[0] || 'V'}
              </div>
              <div>
                <h2 className="text-xl font-extrabold flex items-center gap-2">
                  {userProfile.name}
                  <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">Thành viên Vibe</span>
                </h2>
                <div className="flex flex-col gap-0.5 text-xs text-white/90 mt-1.5">
                  <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-brand-fixed-dim" /> {userProfile.phone}</span>
                  <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-brand-fixed-dim" /> {userProfile.address}, {userProfile.city}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-white/15 hover:bg-white/25 text-white font-bold text-xs rounded-xl backdrop-blur-sm flex items-center gap-1 transition-all cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" />
              Chỉnh sửa thông tin
            </button>

          </div>
        )}

        {/* Aggregate count badges layout in ribbon banner of card */}
        <div className="grid grid-cols-3 gap-2 mt-6 pt-5 border-t border-white/20 text-center select-none">
          <div className="flex flex-col">
            <span className="text-xl font-extrabold">{uploadedItems.length}</span>
            <span className="text-[10px] text-white/80 font-bold uppercase tracking-widest mt-0.5">Sản phẩm đăng bán</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-extrabold">{heartedItems.length}</span>
            <span className="text-[10px] text-white/80 font-bold uppercase tracking-widest mt-0.5">Mặt hàng yêu thích</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-extrabold">0đ</span>
            <span className="text-[10px] text-white/80 font-bold uppercase tracking-widest mt-0.5">Thu nhập tích lỹ</span>
          </div>
        </div>

      </section>

      {/* Sub tabs switches uploads vs favorites */}
      <div className="flex border-b border-outline-variant/30 select-none">
        
        <button
          onClick={() => setActiveTab('uploads')}
          className={`flex-1 py-3.5 text-sm font-bold border-b-2 transition-all cursor-pointer text-center ${
            activeTab === 'uploads' 
              ? 'border-brand-primary text-brand-primary' 
              : 'border-transparent text-brand-slate hover:text-on-surface'
          }`}
        >
          Sản phẩm của tôi ({uploadedItems.length})
        </button>

        <button
          onClick={() => setActiveTab('favorites')}
          className={`flex-1 py-3.5 text-sm font-bold border-b-2 transition-all cursor-pointer text-center ${
            activeTab === 'favorites' 
              ? 'border-brand-primary text-brand-primary' 
              : 'border-transparent text-brand-slate hover:text-on-surface'
          }`}
        >
          Mặt hàng đã thích ({heartedItems.length})
        </button>

      </div>

      {/* Sub tab details canvas lists */}
      <div className="mt-2 animate-fade-in-up">
        
        {activeTab === 'uploads' ? (
          
          uploadedItems.length === 0 ? (
            <div className="py-16 text-center bg-surface-low rounded-2xl border border-dashed border-outline-variant/50">
              <span className="text-3xl">👗</span>
              <p className="text-on-surface font-extrabold text-sm mt-3">Bạn chưa có sản phẩm đăng bán nào!</p>
              <p className="text-xs text-brand-slate mt-1">Hãy chuyển sang tab Đăng Sản Phẩm (Upload) để bán món đồ đầu tiên.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {uploadedItems.map((p) => (
                <div 
                  key={p.id}
                  className="flex bg-surface-lowest rounded-xl border border-outline-variant/30 overflow-hidden shadow-sm hover:border-brand-primary/60 transition-colors p-3 gap-3 relative group"
                >
                  <div className="w-16 h-20 bg-surface-low rounded-lg overflow-hidden shrink-0">
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                  </div>
                  
                  <div className="flex-grow flex flex-col justify-between min-w-0 pr-8">
                    <div>
                      <span className="text-[9px] font-extrabold text-brand-slate uppercase leading-none">{p.brand}</span>
                      <h4 onClick={() => onSelectProduct(p)} className="font-bold text-sm text-on-surface truncate cursor-pointer hover:text-brand-primary leading-tight mt-0.5">{p.name}</h4>
                      <p className="text-[10px] text-brand-slate mt-1 font-semibold leading-none">Size {p.size} | {p.condition}</p>
                    </div>
                    <span className="font-extrabold text-xs text-brand-primary mt-1">{p.price.toLocaleString('vi-VN')} VND</span>
                  </div>

                  {/* Delete uploading option */}
                  {onDeleteUploadedProduct && (
                    <button 
                      onClick={() => onDeleteUploadedProduct(p.id)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-brand-slate hover:text-brand-primary p-1.5 rounded-full hover:bg-surface transition-colors cursor-pointer"
                      title="Xóa sản phẩm"
                    >
                      <Trash2 className="w-4.5 h-4.5" />
                    </button>
                  )}

                </div>
              ))}
            </div>
          )

        ) : (
          
          heartedItems.length === 0 ? (
            <div className="py-16 text-center bg-surface-low rounded-2xl border border-dashed border-outline-variant/50">
              <span className="text-3xl">❤️</span>
              <p className="text-on-surface font-extrabold text-sm mt-3">Chưa có sản phẩm yêu thích!</p>
              <p className="text-xs text-brand-slate mt-1">Sản phẩm bạn thả tim ở Home sẽ xuất hiện ngay tại đây.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {heartedItems.map((p) => (
                <div 
                  key={p.id}
                  onClick={() => onSelectProduct(p)}
                  className="group cursor-pointer flex flex-col justify-between bg-surface-lowest p-2.5 rounded-xl border border-outline-variant/30 hover:border-brand-primary transition-colors shadow-sm"
                >
                  <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden bg-surface-low mb-2.5">
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  </div>
                  <div>
                    <span className="text-[9px] font-extrabold text-brand-slate uppercase">{p.brand}</span>
                    <h4 className="font-bold text-xs text-on-surface line-clamp-1 group-hover:text-brand-primary transition-colors leading-tight mt-0.5">{p.name}</h4>
                    <p className="text-xs font-bold text-brand-primary mt-1">{p.price.toLocaleString('vi-VN')} VND</p>
                  </div>
                </div>
              ))}
            </div>
          )

        )}

      </div>

    </div>
  );
}
