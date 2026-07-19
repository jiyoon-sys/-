import { useState, useEffect } from 'react';
import { Product } from '../types';
import { ShoppingCart, Heart, ShieldCheck, MapPin, Truck, ChevronRight } from 'lucide-react';

interface ProductDetailViewProps {
  product: Product;
  allProducts: Product[];
  likedProductIds: string[];
  onToggleLike: (productId: string) => void;
  onAddToCart: (product: Product, color: string, size: string) => void;
  onBuyNow: (product: Product, color: string, size: string) => void;
  onSelectProduct: (product: Product) => void;
  onBack: () => void;
}

export default function ProductDetailView({
  product,
  allProducts,
  likedProductIds,
  onToggleLike,
  onAddToCart,
  onBuyNow,
  onSelectProduct,
  onBack
}: ProductDetailViewProps) {
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [isAddedToast, setIsAddedToast] = useState<boolean>(false);

  // Set default selection based on first item spec
  useEffect(() => {
    setSelectedColor(product.colors && product.colors.length > 0 ? product.colors[0] : product.color);
    setSelectedSize(product.sizes && product.sizes.length > 0 ? product.sizes[0] : product.size);
    setActiveImageIndex(0);
    // Smooth scroll to top on change
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [product]);

  // Handle color change with specific image hotlink swap if Uniqlo oversized tee
  const handleColorChange = (color: string) => {
    setSelectedColor(color);
    if (product.id === 'uniqlo-oversized-cotton-tshirt') {
      if (color === 'Black' && product.images && product.images.length > 3) {
        // Black tee is at index 3 in our preseeded data array
        setActiveImageIndex(3);
      } else if (color === 'White') {
        setActiveImageIndex(0);
      } else if (color === 'Heather Grey') {
        setActiveImageIndex(1);
      }
    }
  };

  const itemImages = product.images && product.images.length > 0 
    ? product.images 
    : [product.image];

  const handleAddToCartClick = () => {
    onAddToCart(product, selectedColor, selectedSize);
    setIsAddedToast(true);
    setTimeout(() => {
      setIsAddedToast(false);
    }, 2500);
  };

  // Filter related items in the same category
  const relatedProducts = allProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  // AI Recommendations
  const recommendedProducts = allProducts
    .filter((p) => p.category !== product.category && p.trending)
    .slice(0, 2);

  const isLiked = likedProductIds.includes(product.id);

  return (
    <div className="w-full flex flex-col gap-6 animate-fade-in-up pb-[100px] md:pb-0">
      
      {/* Toast Notification */}
      {isAddedToast && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 bg-brand-primary text-white text-sm font-bold px-6 py-4 rounded-xl shadow-2xl z-50 flex items-center gap-3 animate-fade-in-up">
          <div className="w-6 h-6 rounded-full bg-white text-brand-primary flex items-center justify-center font-bold text-xs">✓</div>
          <span>Đã thêm sản phẩm vào giỏ hàng thành công!</span>
        </div>
      )}

      {/* Transaction Header bar */}
      <div className="flex items-center gap-2 -mt-2">
        <button 
          onClick={onBack}
          className="text-brand-primary font-bold text-sm flex items-center gap-1 cursor-pointer hover:underline"
        >
          ← Trở lại danh sách
        </button>
        <span className="text-brand-slate text-xs">/</span>
        <span className="text-brand-slate text-xs truncate max-w-[200px]">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mt-1">
        
        {/* Left Aspect: Image Gallery */}
        <div className="md:col-span-7 flex flex-col gap-3">
          
          {/* Main Display Image */}
          <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-surface-low border border-outline-variant/30 shadow-sm relative group">
            <img 
              src={itemImages[activeImageIndex]} 
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-[1.02]"
            />
            
            <button 
              onClick={() => onToggleLike(product.id)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-surface-lowest/80 backdrop-blur-md flex items-center justify-center text-brand-slate hover:text-brand-primary hover:bg-surface-lowest transition-all hover:scale-110 shadow-sm cursor-pointer"
            >
              <Heart className={`w-5 h-5 ${isLiked ? 'fill-brand-primary text-brand-primary' : 'text-on-surface-variant'}`} />
            </button>
          </div>

          {/* Mini Gallery Carousel Indicators */}
          {itemImages.length > 1 && (
            <div className="flex gap-2 overflow-x-auto no-scrollbar">
              {itemImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-16 h-20 rounded-xl overflow-hidden border-2 cursor-pointer transition-all ${
                    idx === activeImageIndex 
                      ? 'border-brand-primary opacity-100 scale-105' 
                      : 'border-outline-variant/40 opacity-75 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

        </div>

        {/* Right Aspect: Purchase Controls Panel */}
        <div className="md:col-span-5 flex flex-col gap-6">
          
          {/* Brand, Title & Pricing info */}
          <div className="flex flex-col gap-1.5">
            <span className="text-xs font-bold text-brand-primary uppercase tracking-widest leading-none">
              {product.brand}
            </span>
            <h1 className="text-2xl md:text-3xl font-extrabold text-on-surface tracking-tight mt-1">
              {product.name}
            </h1>
            
            <div className="flex items-baseline gap-3 mt-2">
              <span className="text-2xl font-extrabold text-brand-primary">
                {product.price.toLocaleString('vi-VN')} VND
              </span>
              {product.originalPrice && (
                <span className="text-sm font-semibold text-brand-slate line-through">
                  {product.originalPrice.toLocaleString('vi-VN')} VND
                </span>
              )}
            </div>

            <p className="text-sm text-on-surface-variant leading-relaxed mt-2.5">
              {product.description}
            </p>

            <div className="flex items-center gap-2 mt-2">
              <span className="text-xs font-bold text-brand-slate uppercase">Tình trạng:</span>
              <span className="inline-block px-2.5 py-1 bg-surface-high text-[11px] font-bold text-on-surface-variant rounded-full border border-outline-variant/30">
                {product.condition}
              </span>
            </div>
          </div>

          <hr className="border-outline-variant/30" />

          {/* Color Selector */}
          {product.colors && product.colors.length > 0 && (
            <div className="flex flex-col gap-2.5">
              <div className="flex justify-between items-center text-sm">
                <span className="font-bold text-on-surface">Màu Sắc</span>
                <span className="font-semibold text-brand-slate">{selectedColor}</span>
              </div>
              <div className="flex gap-4">
                {product.colors.map((color) => {
                  const isSelected = selectedColor === color;
                  // Map color name to custom CSS backgrounds
                  let colorBg = 'bg-white';
                  if (color === 'Black') colorBg = 'bg-brand-ink';
                  if (color === 'Heather Grey') colorBg = 'bg-brand-slate';
                  if (color === 'Pastel Pink') colorBg = 'bg-pink-200';
                  if (color === 'Creamy White') colorBg = 'bg-stone-100';

                  return (
                    <button
                      key={color}
                      onClick={() => handleColorChange(color)}
                      aria-label={color}
                      className={`w-9 h-9 rounded-full ${colorBg} border border-outline-variant/60 shadow-sm relative transition-all hover:scale-110 cursor-pointer ${
                        isSelected 
                          ? 'ring-2 ring-brand-primary ring-offset-2 ring-offset-surface scale-105' 
                          : 'opacity-80'
                      }`}
                    />
                  );
                })}
              </div>
            </div>
          )}

          {/* Size Selector */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="flex flex-col gap-2.5">
              <div className="flex justify-between items-center text-sm">
                <span className="font-bold text-on-surface">Kích Cỡ</span>
                <button className="text-xs font-semibold text-brand-slate underline hover:text-brand-primary">Hướng dẫn đo</button>
              </div>
              <div className="grid grid-cols-4 gap-3">
                {product.sizes.map((size) => {
                  const isSelected = selectedSize === size;
                  return (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`h-11 flex items-center justify-center rounded-xl font-bold text-sm transition-all cursor-pointer border ${
                        isSelected 
                          ? 'bg-brand-primary border-brand-primary text-white scale-[1.02]' 
                          : 'bg-surface-lowest border-outline-variant/50 text-on-surface hover:border-brand-primary/60'
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Simulated Courier Options Metadata Display Card */}
          <div className="bg-surface-low rounded-xl p-4 flex flex-col gap-4 border border-outline-variant/30">
            <div className="flex items-start gap-3">
              <Truck className="w-5 h-5 text-brand-primary mt-0.5" />
              <div>
                <h4 className="font-bold text-sm text-on-surface">Giao hàng nhanh (GHN)</h4>
                <p className="text-xs text-brand-slate mt-0.5">Có sẵn tại khu vực TP. HCM. Nhận hàng trong 24h.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Truck className="w-5 h-5 text-brand-slate mt-0.5" />
              <div>
                <h4 className="font-bold text-sm text-on-surface">Giao hàng tiết kiệm (GHTK)</h4>
                <p className="text-xs text-brand-slate mt-0.5">Có sẵn tại Hà Nội & Toàn quốc. Tiết kiệm chi phí vận chuyển tối đa.</p>
              </div>
            </div>
          </div>

          {/* Action Call to buttons (Hidden on mobile for the fixed sticky navbar, shown on desktop) */}
          <div className="hidden md:flex gap-4 mt-2">
            
            <button 
              id="desktop-add-cart"
              onClick={handleAddToCartClick}
              className="flex-1 h-14 rounded-xl border-2 border-brand-primary text-brand-primary font-bold text-sm bg-surface-lowest hover:bg-brand-primary/5 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <ShoppingCart className="w-4 h-4" />
              Thêm vào giỏ
            </button>

            <button 
              id="desktop-buy-now"
              onClick={() => onBuyNow(product, selectedColor, selectedSize)}
              className="flex-1 h-14 rounded-xl bg-brand-primary text-white font-bold text-sm hover:opacity-95 active:scale-95 transition-all flex items-center justify-center shadow-lg shadow-brand-primary/20 cursor-pointer"
            >
              Mua ngay
            </button>

          </div>

        </div>

      </div>

      <hr className="border-outline-variant/20 my-6" />

      {/* Cross-Sell Related Items Screen Block */}
      {relatedProducts.length > 0 && (
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-end">
            <h2 className="text-lg font-bold text-on-surface">Sản phẩm tương tự</h2>
            <button 
              onClick={onBack}
              className="text-xs font-semibold text-brand-primary hover:underline cursor-pointer"
            >
              Xem tất cả
            </button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {relatedProducts.map((p) => (
              <div 
                key={p.id}
                onClick={() => onSelectProduct(p)}
                className="group cursor-pointer flex flex-col justify-between"
              >
                <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden bg-surface-low border border-outline-variant/30 mb-2">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-350" />
                </div>
                <div>
                  <span className="text-[9px] font-extrabold text-brand-slate uppercase">{p.brand}</span>
                  <h4 className="font-bold text-xs text-on-surface line-clamp-1 group-hover:text-brand-primary transition-colors">{p.name}</h4>
                  <p className="text-xs font-bold text-brand-primary mt-0.5">{p.price.toLocaleString('vi-VN')} VND</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* AI Recommendations Canvas (Stylist Recommends) */}
      {recommendedProducts.length > 0 && (
        <div className="mt-4 p-5 rounded-2xl bg-surface-container border border-outline-variant/40 relative overflow-hidden shadow-sm">
          <div className="absolute top-0 right-0 p-6 opacity-[0.04] pointer-events-none select-none">
            <ShieldCheck className="w-24 h-24 text-brand-primary" />
          </div>
          
          <div className="flex items-center gap-2 mb-4">
            <span className="text-brand-primary font-bold text-lg">💡</span>
            <h2 className="text-base font-bold text-on-surface">VibeCloset Stylist gợi ý phối đồ</h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
            {recommendedProducts.map((p) => (
              <div 
                key={p.id}
                onClick={() => onSelectProduct(p)}
                className="group cursor-pointer bg-surface-lowest p-3 rounded-xl border border-outline-variant/30 flex flex-col justify-between hover:border-brand-primary transition-all duration-300"
              >
                <div className="relative w-full aspect-[4/5] rounded-lg overflow-hidden bg-surface-low mb-2">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-350" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-on-surface line-clamp-1">{p.name}</h4>
                  <p className="text-xs font-bold text-brand-slate mt-0.5">{p.price.toLocaleString('vi-VN')} VND</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Mobile Sticky CTA Bar */}
      <div className="md:hidden fixed bottom-0 left-0 w-full z-40 bg-surface/90 backdrop-blur-md border-t border-outline-variant/20 p-4 pb-6 flex gap-3 shadow-[0px_-4px_20px_rgba(0,0,0,0.05)]">
        
        <button 
          id="mobile-add-cart"
          onClick={handleAddToCartClick}
          className="flex-1 h-12 rounded-xl border border-brand-primary text-brand-primary font-bold text-sm bg-surface hover:bg-brand-primary/5 transition-colors flex items-center justify-center gap-2 cursor-pointer"
        >
          <ShoppingCart className="w-4.5 h-4.5" />
          Giỏ hàng
        </button>

        <button 
          id="mobile-buy-now"
          onClick={() => onBuyNow(product, selectedColor, selectedSize)}
          className="flex-1 h-12 rounded-xl bg-brand-primary text-white font-bold text-sm active:scale-95 transition-transform flex items-center justify-center cursor-pointer"
        >
          Mua ngay
        </button>

      </div>

    </div>
  );
}
