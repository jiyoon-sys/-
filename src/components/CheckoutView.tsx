import React, { useState, useMemo } from 'react';
import { CartItem, Courier, PaymentMethod } from '../types';
import { MapPin, Phone, User, Edit2, ShieldCheck, Mail, CheckCircle, Ticket } from 'lucide-react';
import { COURIERS, PAYMENT_METHODS } from '../data';

interface CheckoutViewProps {
  cartItems: CartItem[];
  userProfile: { name: string; phone: string; address: string; city: string };
  onUpdateAddress: (profile: { name: string; phone: string; address: string; city: string }) => void;
  onClearCartAndCheckoutSuccess: (orderDetail: { orderId: string; total: number; courierName: string; paymentMethodName: string }) => void;
  onBackToCart: () => void;
}

export default function CheckoutView({
  cartItems,
  userProfile,
  onUpdateAddress,
  onClearCartAndCheckoutSuccess,
  onBackToCart
}: CheckoutViewProps) {
  // Address edit state
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [editName, setEditName] = useState(userProfile.name);
  const [editPhone, setEditPhone] = useState(userProfile.phone);
  const [editAddress, setEditAddress] = useState(userProfile.address);
  const [editCity, setEditCity] = useState(userProfile.city);

  // checkout states
  const [selectedCourierId, setSelectedCourierId] = useState<string>('ghn');
  const [selectedPaymentId, setSelectedPaymentId] = useState<string>('cod');
  
  // discount codes
  const [promoCode, setPromoCode] = useState('');
  const [activeDiscount, setActiveDiscount] = useState<{ code: string; type: 'percent' | 'flat'; value: number } | null>(null);
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');

  // active objects lookup
  const selectedCourier = useMemo(() => {
    return COURIERS.find(c => c.id === selectedCourierId) || COURIERS[0];
  }, [selectedCourierId]);

  const selectedPayment = useMemo(() => {
    return PAYMENT_METHODS.find(p => p.id === selectedPaymentId) || PAYMENT_METHODS[0];
  }, [selectedPaymentId]);

  // arithmetic aggregates
  const subtotal = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  }, [cartItems]);

  const discountAmount = useMemo(() => {
    if (!activeDiscount) return 0;
    if (activeDiscount.type === 'percent') {
      return Math.round(subtotal * (activeDiscount.value / 100));
    }
    return activeDiscount.value;
  }, [activeDiscount, subtotal]);

  const grandTotal = useMemo(() => {
    return Math.max(0, subtotal + selectedCourier.fee - discountAmount);
  }, [subtotal, selectedCourier, discountAmount]);

  const handleApplyPromo = () => {
    setPromoError('');
    setPromoSuccess('');
    const codeClean = promoCode.trim().toUpperCase();

    if (!codeClean) {
      setPromoError('Vui lòng nhập mã giảm giá!');
      return;
    }

    if (codeClean === 'VIBE30') {
      setActiveDiscount({ code: 'VIBE30', type: 'percent', value: 30 });
      setPromoSuccess('Áp dụng mã VIBE30 thành công (Giảm 30%)!');
    } else if (codeClean === 'KSTYLE50') {
      setActiveDiscount({ code: 'KSTYLE50', type: 'flat', value: 50000 });
      setPromoSuccess('Áp dụng mã KSTYLE50 thành công (Giảm 50.000đ)!');
    } else if (codeClean === 'FREESHIP') {
      // simulate freeship by applying flat discount equal to current shipping fee
      setActiveDiscount({ code: 'FREESHIP', type: 'flat', value: selectedCourier.fee });
      setPromoSuccess('Áp dụng mã FREESHIP thành công!');
    } else {
      setPromoError('Mã giảm giá không hợp lệ hoặc đã hết hạn!');
    }
  };

  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateAddress({
      name: editName,
      phone: editPhone,
      address: editAddress,
      city: editCity
    });
    setIsEditingAddress(false);
  };

  const handleCheckoutSubmit = () => {
    if (cartItems.length === 0) {
      alert('Giỏ hàng trống! Hãy thêm sản phẩm trước.');
      return;
    }

    const randomOrderId = 'VIBE-' + Math.floor(Math.random() * 900000 + 100000);
    
    // Clear cart and trigger modal
    onClearCartAndCheckoutSuccess({
      orderId: randomOrderId,
      total: grandTotal,
      courierName: selectedCourier.name,
      paymentMethodName: selectedPayment.name
    });
  };

  return (
    <div className="w-full flex flex-col gap-6 animate-fade-in-up">
      
      {/* Navigation Header */}
      <div className="flex items-center gap-2 -mt-2">
        <button 
          onClick={onBackToCart}
          className="text-brand-primary font-bold text-sm flex items-center gap-1 cursor-pointer hover:underline"
        >
          ← Chỉnh sửa giỏ hàng
        </button>
        <span className="text-brand-slate text-xs">/</span>
        <span className="text-brand-slate text-xs">Thanh toán đơn hàng</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Logistical and selection Details */}
        <div className="md:col-span-7 flex flex-col gap-6">
          
          {/* 1. Recipient Address Section */}
          <section className="bg-surface-lowest p-5 md:p-6 rounded-2xl shadow-sm border border-outline-variant/30">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-surface-low">
              <h2 className="text-lg font-bold text-on-surface flex items-center gap-2">
                <span className="text-brand-primary">📍</span>
                Địa chỉ nhận hàng
              </h2>
              {!isEditingAddress && (
                <button 
                  onClick={() => setIsEditingAddress(true)}
                  className="text-brand-primary text-xs font-bold hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Edit2 className="w-3 h-3" />
                  Thay đổi
                </button>
              )}
            </div>

            {isEditingAddress ? (
              <form onSubmit={handleSaveAddress} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-brand-slate uppercase mb-1">Họ và tên người nhận</label>
                    <input 
                      type="text" 
                      required
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="w-full bg-surface-bright border border-outline-variant/60 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-brand-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-brand-slate uppercase mb-1">Số điện thoại liên hệ</label>
                    <input 
                      type="tel" 
                      required
                      value={editPhone}
                      onChange={(e) => setEditPhone(e.target.value)}
                      className="w-full bg-surface-bright border border-outline-variant/60 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-brand-primary"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-brand-slate uppercase mb-1">Địa chỉ chi tiết (Số nhà, tên đường, phường/xã)</label>
                  <input 
                    type="text" 
                    required
                    value={editAddress}
                    onChange={(e) => setEditAddress(e.target.value)}
                    className="w-full bg-surface-bright border border-outline-variant/60 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-brand-primary"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-brand-slate uppercase mb-1">Tỉnh / Thành phố</label>
                  <select
                    value={editCity}
                    onChange={(e) => setEditCity(e.target.value)}
                    className="w-full bg-surface-bright border border-outline-variant/60 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-brand-primary appearance-none"
                  >
                    <option value="Hồ Chí Minh">Hồ Chí Minh</option>
                    <option value="Hà Nội">Hà Nội</option>
                    <option value="Đà Nẵng">Đà Nẵng</option>
                    <option value="Cần Thơ">Cần Thơ</option>
                    <option value="Khác">Tỉnh thành khác</option>
                  </select>
                </div>

                <div className="flex gap-2.5 pt-2">
                  <button 
                    type="submit"
                    className="px-4.5 py-2 bg-brand-primary text-white text-xs font-bold rounded-xl cursor-pointer hover:opacity-90"
                  >
                    Lưu thay đổi
                  </button>
                  <button 
                    type="button"
                    onClick={() => setIsEditingAddress(false)}
                    className="px-4.5 py-2 bg-surface-high text-on-surface-variant text-xs font-bold rounded-xl cursor-pointer hover:bg-surface-highest"
                  >
                    Hủy bỏ
                  </button>
                </div>
              </form>
            ) : (
              <div className="flex flex-col gap-1 border-l-3 border-brand-primary pl-4 py-1.5">
                <span className="font-bold text-sm text-on-surface">{userProfile.name} | {userProfile.phone}</span>
                <span className="text-xs text-on-surface-variant mt-0.5">{userProfile.address}</span>
                <span className="text-xs text-on-surface-variant">{userProfile.city}, Việt Nam</span>
              </div>
            )}
          </section>

          {/* 2. Courier Selection Section */}
          <section className="bg-surface-lowest p-5 md:p-6 rounded-2xl shadow-sm border border-outline-variant/30">
            <h2 className="text-lg font-bold text-on-surface flex items-center gap-2 mb-4 pb-2 border-b border-surface-low">
              <span className="text-brand-primary">🚚</span>
              Đơn vị vận chuyển
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {COURIERS.map((c) => {
                const isSelected = selectedCourierId === c.id;
                return (
                  <label 
                    key={c.id} 
                    className={`relative flex items-start p-4 border rounded-xl cursor-pointer transition-all hover:bg-surface-low ${
                      isSelected 
                        ? 'border-brand-primary bg-surface-low shadow-sm scale-[1.01]' 
                        : 'border-outline-variant/50 bg-white'
                    }`}
                  >
                    <input 
                      type="radio" 
                      name="deliveryOption" 
                      value={c.id}
                      checked={isSelected}
                      onChange={() => setSelectedCourierId(c.id)}
                      className="form-radio mt-1 text-brand-primary border-outline-variant focus:ring-brand-accent focus:ring-opacity-50"
                    />
                    <div className="ml-3 flex flex-col justify-between">
                      <span className="font-bold text-xs text-on-surface leading-tight">{c.name}</span>
                      <span className="text-[11px] text-brand-slate mt-1 leading-snug">{c.estDays}</span>
                      <span className="font-extrabold text-xs text-brand-primary mt-2">
                        {c.fee.toLocaleString('vi-VN')}đ
                      </span>
                    </div>
                  </label>
                );
              })}
            </div>
          </section>

          {/* 3. Payment Methods Selector */}
          <section className="bg-surface-lowest p-5 md:p-6 rounded-2xl shadow-sm border border-outline-variant/30">
            <h2 className="text-lg font-bold text-on-surface flex items-center gap-2 mb-4 pb-2 border-b border-surface-low">
              <span className="text-brand-primary">💳</span>
              Phương thức thanh toán
            </h2>

            <div className="flex flex-col gap-3">
              {PAYMENT_METHODS.map((pm) => {
                const isSelected = selectedPaymentId === pm.id;
                return (
                  <label 
                    key={pm.id}
                    className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer transition-all hover:bg-surface-low ${
                      isSelected 
                        ? 'border-brand-primary bg-surface-low shadow-sm' 
                        : 'border-outline-variant/40 bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input 
                        type="radio"
                        name="paymentMethod"
                        value={pm.id}
                        checked={isSelected}
                        onChange={() => setSelectedPaymentId(pm.id)}
                        className="form-radio text-brand-primary border-outline-variant focus:ring-brand-accent focus:ring-opacity-50"
                      />
                      <span className="font-semibold text-xs sm:text-sm text-on-surface">{pm.name}</span>
                    </div>
                  </label>
                );
              })}
            </div>
          </section>

        </div>

        {/* Right Column: Order Summary (Sticky styled panel) */}
        <div className="md:col-span-5 relative">
          <div className="sticky top-24 bg-surface-lowest p-5 md:p-6 rounded-2xl shadow-sm border border-outline-variant/30 flex flex-col gap-5">
            
            <h2 className="text-lg font-bold text-on-surface">Tóm tắt đơn hàng</h2>
            
            {/* Products Preview */}
            <div className="flex flex-col gap-4 max-h-[220px] overflow-y-auto pr-1">
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-3 items-center text-xs border-b border-surface-low pb-2 last:border-b-0">
                  <div className="w-12 h-16 bg-surface-low rounded-lg overflow-hidden shrink-0">
                    <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-grow min-w-0">
                    <h4 className="font-bold text-on-surface truncate leading-tight">{item.product.name}</h4>
                    <p className="text-[10px] text-brand-slate mt-1 leading-none">
                      Size {item.selectedSize} | Màu: {item.selectedColor} | SL: {item.quantity}
                    </p>
                  </div>
                  <span className="font-bold text-on-surface shrink-0 text-right">
                    {(item.product.price * item.quantity).toLocaleString('vi-VN')}đ
                  </span>
                </div>
              ))}
            </div>

            {/* Discount Section code */}
            <div className="flex flex-col gap-2 pt-2">
              <span className="text-[10px] font-extrabold text-brand-slate uppercase">Nhập mã giảm giá</span>
              <div className="flex gap-2">
                <div className="relative flex-grow">
                  <Ticket className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-slate w-4 h-4" />
                  <input 
                    type="text" 
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="VIBE30, KSTYLE50, FREESHIP..."
                    className="w-full bg-surface-bright border border-outline-variant/60 rounded-lg pl-9 pr-2 py-2 text-xs focus:outline-none focus:border-brand-primary placeholder:text-brand-slate/60 uppercase"
                  />
                </div>
                <button 
                  type="button"
                  onClick={handleApplyPromo}
                  className="bg-brand-primary text-white text-xs font-bold px-4 py-2 rounded-lg hover:opacity-95 transition-all cursor-pointer"
                >
                  Áp dụng
                </button>
              </div>

              {promoError && <p className="text-[11px] font-bold text-brand-primary">{promoError}</p>}
              {promoSuccess && <p className="text-[11px] font-bold text-brand-tertiary">{promoSuccess}</p>}

              {/* Informational Code cheatsheet */}
              <div className="bg-brand-container/10 p-2.5 rounded-lg border border-brand-container/25 text-[10px] text-[#5b002c]">
                🎫 Gợi ý mã cho bạn thử: <strong>VIBE30</strong> (Giảm 30%), <strong>KSTYLE50</strong> (Giảm 50k), <strong>FREESHIP</strong>
              </div>
            </div>

            {/* Subtotal mathematics breakdown table */}
            <div className="flex flex-col gap-2 pt-4 border-t border-outline-variant/20 font-semibold text-xs">
              
              <div className="flex justify-between text-brand-slate">
                <span>Tạm tính</span>
                <span>{subtotal.toLocaleString('vi-VN')}đ</span>
              </div>
              
              <div className="flex justify-between text-brand-slate">
                <span>Phí vận chuyển</span>
                <span>{selectedCourier.fee.toLocaleString('vi-VN')}đ</span>
              </div>
              
              <div className="flex justify-between text-brand-tertiary">
                <span>Giảm giá</span>
                <span>-{discountAmount.toLocaleString('vi-VN')}đ</span>
              </div>

            </div>

            {/* Sum total sum table and CTA */}
            <div className="border-t border-outline-variant/30 pt-4 flex flex-col gap-4">
              
              <div className="flex justify-between items-center">
                <span className="text-sm font-bold text-on-surface">Tổng cộng</span>
                <span className="text-xl font-extrabold text-brand-primary">
                  {grandTotal.toLocaleString('vi-VN')}đ
                </span>
              </div>
              <p className="text-[10px] text-brand-slate text-right -mt-3">(Đã bao gồm thuế giá trị gia tăng VAT)</p>

              <button 
                type="button"
                id="place-order-btn"
                onClick={handleCheckoutSubmit}
                className="w-full bg-brand-primary text-white font-extrabold text-sm py-3.5 rounded-xl block text-center hover:opacity-95 active:scale-95 shadow-md shadow-brand-primary/20 transition-all cursor-pointer"
              >
                Thanh toán ngay ({grandTotal.toLocaleString('vi-VN')}đ)
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-brand-slate">
                <ShieldCheck className="w-4 h-4 text-brand-tertiary shrink-0" />
                <span>Giao dịch an toàn và bảo mật 100%</span>
              </div>

            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
