import { useState, useMemo } from 'react';
import { Product } from '../types';
import { Search, Heart, ArrowRight, Sparkles } from 'lucide-react';

interface HomeViewProps {
  products: Product[];
  likedProductIds: string[];
  onToggleLike: (productId: string) => void;
  onSelectProduct: (product: Product) => void;
  onNavigateToTab: (tab: 'home' | 'search' | 'upload' | 'wishlist' | 'me') => void;
  searchFilter: string;
  setSearchFilter: (term: string) => void;
}

export default function HomeView({
  products,
  likedProductIds,
  onToggleLike,
  onSelectProduct,
  searchFilter,
  setSearchFilter
}: HomeViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('Tất cả');

  // Hardcoded hashtags for clicking
  const hashtags = ['#áo croptop', '#quần jeans', '#váy đi chơi', '#tối giản', '#k-fashion'];

  // Categories aligned with screens
  const categories = [
    { name: 'Tất cả', icon: '✨' },
    { name: 'Áo', icon: '👕' },
    { name: 'Quần', icon: '👖' },
    { name: 'Váy', icon: '👗' },
    { name: 'Giày', icon: '👟' },
    { name: 'Túi', icon: '👜' }
  ];

  const handleHashtagClick = (tag: string) => {
    // Strip hash sign for filter
    const cleanTerm = tag.replace('#', '');
    setSearchFilter(cleanTerm);
  };

  // Filter products based on search term AND category
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchSearch =
        product.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchFilter.toLowerCase()) ||
        product.category.toLowerCase().includes(searchFilter.toLowerCase()) ||
        product.description.toLowerCase().includes(searchFilter.toLowerCase());

      const matchCategory =
        selectedCategory === 'Tất cả' || product.category === selectedCategory;

      return matchSearch && matchCategory;
    });
  }, [products, searchFilter, selectedCategory]);

  // Separate trending (large) and standard items
  const trendingItems = useMemo(() => {
    return filteredProducts.filter(item => item.trending);
  }, [filteredProducts]);

  const regularItems = useMemo(() => {
    return filteredProducts.filter(item => !item.trending);
  }, [filteredProducts]);

  // Fallback to all if no trending matching search
  const displayTrendingInFeature = trendingItems.length > 0;

  return (
    <div className="w-full flex flex-col gap-6 animate-fade-in-up">
      
      {/* Mobile-oriented Sticky Search Bar */}
      <div className="md:hidden sticky top-0 z-30 bg-surface/95 backdrop-blur-md py-2.5 px-1 border-b border-outline-variant/20 -mx-4">
        <div className="relative w-full px-4">
          <Search className="absolute left-7 top-1/2 transform -translate-y-1/2 text-brand-slate w-4 h-4" />
          <input 
            type="text" 
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            placeholder="Tìm kiếm áo, váy, giày, thương hiệu..."
            className="w-full pl-10 pr-10 py-2.5 bg-surface-lowest rounded-full border border-outline-variant/40 text-sm focus:ring-2 focus:ring-brand-accent focus:outline-none transition-all placeholder:text-brand-slate/75"
          />
          {searchFilter && (
            <button 
              onClick={() => setSearchFilter('')}
              className="absolute right-8 top-1/2 -translate-y-1/2 text-xs font-bold text-brand-primary"
            >
              Xóa
            </button>
          )}
        </div>
      </div>

      {/* Hero Banner with gorgeous street models */}
      <div 
        onClick={() => { setSelectedCategory('Tất cả'); setSearchFilter(''); }}
        className="relative w-full h-[360px] md:h-[450px] rounded-2xl overflow-hidden flex items-end p-6 md:p-8 shadow-md cursor-pointer group"
      >
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-[10000ms] group-hover:scale-105"
          style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuD2qXzntllPE6TmBEK9kmoGxMzGCIoszRr2sikI6Ok2OghpMMAjU0XyaChbwlb00lN4ymdtiHH-6x7FA2FLVqpTHeOJdQkUZc9YuTTugZ0bzkjjZXrbaiCoI52uDBQkoJiVfTbpwcTqO0EXa9BsjIvb84oWR6d3QVbMdxfnPvpX9NyuyfmEAJag3LNo_YSC6gs34tunLsLTiDR7_RCte78ipRDvX_wR97PYqA8E-Xpn1Qsjj-h3ZJhWxS9xmRO6dpZazFMVUYQc5S4')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent"></div>
        
        <div className="relative z-10 w-full max-w-md">
          <span className="inline-block px-3 py-1 bg-brand-primary text-white text-xs font-bold rounded-full mb-3 uppercase tracking-wider">
            Mới Nhất
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-4 leading-tight tracking-tight drop-shadow-sm">
            New Korean Street Style Arrivals
          </h1>
          <button className="bg-surface text-brand-primary font-bold text-sm px-5 py-3 rounded-full hover:bg-surface-high transition-colors flex items-center gap-2">
            Khám phá ngay
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Categories Horizontal Scroller */}
      <div className="flex flex-col gap-3">
        <h2 className="text-xl font-bold text-on-surface">Danh Mục</h2>
        
        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2 -mx-4 px-4 md:mx-0 md:px-0">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.name;
            return (
              <button
                key={cat.name}
                onClick={() => setSelectedCategory(cat.name)}
                className="flex flex-col items-center gap-2 min-w-[72px] group focus:outline-none cursor-pointer"
              >
                <div 
                  className={`w-14 h-14 rounded-full flex items-center justify-center transition-all shadow-sm ${
                    isSelected 
                      ? 'bg-brand-primary scale-105 text-white' 
                      : 'bg-surface-high hover:bg-surface-highest text-on-surface-variant'
                  }`}
                >
                  <span className="text-2xl">{cat.icon}</span>
                </div>
                <span 
                  className={`text-xs font-bold transition-colors ${
                    isSelected ? 'text-brand-primary' : 'text-on-surface-variant group-hover:text-brand-primary'
                  }`}
                >
                  {cat.name}
                </span>
              </button>
            );
          })}
        </div>

        {/* Popular Hashtags / Keywords */}
        <div className="flex flex-wrap gap-2 mt-1">
          {hashtags.map((tag) => (
            <button
              key={tag}
              onClick={() => handleHashtagClick(tag)}
              className="px-3.5 py-1.5 bg-surface-high border border-outline-variant/40 hover:border-brand-primary hover:text-brand-primary rounded-full text-xs font-medium text-on-surface-variant cursor-pointer transition-colors"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Search results notice */}
      {searchFilter && (
        <div className="flex justify-between items-center bg-surface-high border-l-4 border-brand-primary p-3.5 rounded-r-xl">
          <span className="text-sm text-on-surface-variant">
            Tìm thấy <strong className="text-brand-primary">{filteredProducts.length}</strong> sản phẩm cho "<strong className="text-on-surface">{searchFilter}</strong>"
          </span>
          <button 
            onClick={() => setSearchFilter('')}
            className="text-xs font-bold text-brand-primary hover:underline cursor-pointer"
          >
            Hủy tìm kiếm
          </button>
        </div>
      )}

      {/* Product Grid Area containing asymmetric look cards */}
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-xl font-bold text-on-surface">Dành riêng cho bạn</h2>
            <p className="text-xs font-semibold text-brand-slate mt-0.5">Gợi ý từ phong cách của bạn</p>
          </div>
          <span className="text-xs font-semibold text-brand-primary hidden md:inline select-none">
            {filteredProducts.length} món đồ
          </span>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="py-20 text-center flex flex-col items-center justify-center bg-surface-high/30 rounded-2xl border border-dashed border-outline-variant/60">
            <span className="text-4xl mb-4">🔍</span>
            <p className="text-on-surface font-semibold text-base">Không tìm thấy sản phẩm nào!</p>
            <p className="text-xs text-brand-slate mt-1 max-w-[280px]">Hãy thử tìm kiếm với các từ khoá khác hoặc hủy bộ lọc.</p>
            <button 
              onClick={() => { setSelectedCategory('Tất cả'); setSearchFilter(''); }}
              className="mt-4 px-4 py-2 bg-brand-primary text-white rounded-full text-xs font-semibold hover:bg-brand-primary/95 cursor-pointer"
            >
              Hủy tất cả bộ lọc
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
            
            {/* 1. Large Feature Card Concept (from Nike screen reference) */}
            {displayTrendingInFeature && (
              <div className="col-span-2 row-span-2 group flex flex-col">
                <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-surface-low border border-outline-variant/20 shadow-sm self-stretch flex-grow group cursor-pointer">
                  
                  {/* Heart button on card */}
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleLike(trendingItems[0].id);
                    }}
                    className="absolute top-3.5 right-3.5 w-9 h-9 rounded-full bg-surface-lowest/80 backdrop-blur-md flex items-center justify-center text-brand-slate hover:text-brand-primary hover:bg-surface-lowest transition-all hover:scale-110 shadow-sm z-10 cursor-pointer"
                  >
                    <Heart 
                      className={`w-5 h-5 transition-transform duration-200 active:scale-75 ${
                        likedProductIds.includes(trendingItems[0].id) 
                          ? 'fill-brand-primary text-brand-primary' 
                          : 'text-on-surface-variant'
                      }`} 
                    />
                  </button>

                  <img 
                    onClick={() => onSelectProduct(trendingItems[0])}
                    src={trendingItems[0].image} 
                    alt={trendingItems[0].name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />

                  {/* Badges */}
                  <div className="absolute bottom-3.5 left-3.5 flex flex-wrap gap-1.5 pointer-events-none">
                    <span className="px-2.5 py-1 bg-brand-primary text-white text-[10px] font-bold rounded-full uppercase tracking-wider shadow-sm">
                      Mới và Nổi bật
                    </span>
                    <span className="px-2.5 py-1 bg-brand-secondary text-white text-[10px] font-bold rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1">
                      <Sparkles className="w-3 h-3" /> Trending
                    </span>
                  </div>

                </div>

                <div className="mt-3">
                  <div className="flex justify-between items-start gap-1">
                    <div>
                      <span className="text-[10px] font-extrabold text-brand-slate uppercase tracking-widest leading-none">
                        {trendingItems[0].brand}
                      </span>
                      <h3 
                        onClick={() => onSelectProduct(trendingItems[0])}
                        className="font-bold text-base text-on-surface line-clamp-1 group-hover:text-brand-primary transition-colors cursor-pointer mt-0.5"
                      >
                        {trendingItems[0].name}
                      </h3>
                    </div>
                  </div>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-base font-extrabold text-brand-primary">
                      {trendingItems[0].price.toLocaleString('vi-VN')} VND
                    </span>
                    {trendingItems[0].originalPrice && (
                      <span className="text-xs text-brand-slate line-through">
                        {trendingItems[0].originalPrice.toLocaleString('vi-VN')} VND
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* List remaining/regular items */}
            {(displayTrendingInFeature ? regularItems : filteredProducts).map((product) => {
              const isLiked = likedProductIds.includes(product.id);
              return (
                <div key={product.id} className="group flex flex-col justify-between">
                  <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden bg-surface-low border border-outline-variant/20 shadow-sm">
                    
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleLike(product.id);
                      }}
                      className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-surface-lowest/85 backdrop-blur-sm flex items-center justify-center text-brand-slate hover:text-brand-primary hover:bg-surface-lowest transition-all hover:scale-110 shadow-sm z-10 cursor-pointer"
                    >
                      <Heart 
                        className={`w-4 h-4 transition-transform duration-200 active:scale-75 ${
                          isLiked ? 'fill-brand-primary text-brand-primary' : 'text-on-surface-variant'
                        }`} 
                      />
                    </button>

                    <img 
                      onClick={() => onSelectProduct(product)}
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover cursor-pointer transition-transform duration-500 group-hover:scale-[1.03]"
                    />

                    {product.trending && !displayTrendingInFeature && (
                      <span className="absolute bottom-2.5 left-2.5 px-2 py-0.5 bg-brand-primary text-white text-[9px] font-bold rounded-full uppercase tracking-widest shadow-sm">
                        Hot
                      </span>
                    )}
                  </div>

                  <div className="mt-2.5 flex-grow">
                    <span className="text-[10px] font-extrabold text-brand-slate uppercase tracking-widest leading-none">
                      {product.brand}
                    </span>
                    <h3 
                      onClick={() => onSelectProduct(product)}
                      className="font-bold text-sm text-on-surface line-clamp-1 group-hover:text-brand-primary transition-colors cursor-pointer mt-0.5"
                    >
                      {product.name}
                    </h3>
                    <div className="flex items-baseline gap-1.5 mt-0.5">
                      <span className="text-sm font-extrabold text-brand-primary">
                        {product.price.toLocaleString('vi-VN')} VND
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}

          </div>
        )}
      </div>

    </div>
  );
}
