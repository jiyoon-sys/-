import React, { useState } from 'react';
import { Product } from '../types';
import { Plus, Image as ImageIcon, CheckCircle, HelpCircle } from 'lucide-react';

interface UploadFormViewProps {
  onAddProduct: (newProduct: Product) => void;
}

// Pre-seeded uploadable item image presets so users don't have to search for URLs!
const IMAGE_PRESETS = [
  { name: 'Áo khoác Blazer Hồng', url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDkT11pa3TYUV56mTwqLzOC15ot41y5TzzHUo79SE1lBjL4Cuwd5siiiSAdCRm4hpTDRHCX8-fCAH3Fw1puUK-7vnuEUFXsdYZlvOMbSy9wiN6scbXq3bR5oTuILJJRWuOHwMIC0tn0bqL4zPEnuddwmttrh1kq6SHekrKjbezjH4iO850SwWIEyExh8UKRKSGeyrLPoFEnBxhNia-1PdIZ4Dr1JClGRDnX6jBEIGSBkfBZZBBEhDWbqbqHCrfXc6G3_vIXzH5rg3U' },
  { name: 'Korea Oversized Blazer', url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCfnp_5uwu3Kv4v6cv0o3DyVQWfyUnvhu9aP2mkj4DakLSMaKIRApqTqyK1rCYooo-9oGgHBam5n9aBs3TR-LZIIw8LqtjJn65ZatU_6-BLL3OS-bxq3tquxBVRLc1fFKNs4zk00Q1FiCnxwm-CqQF6qElRwFsZ25eor15KdOdBnVynbEUQfCrxPJLlqMTLgMyQCoApXnDlrgLRGcqF-RiiiQWIXiB6g8yVlGwRt0rJKNc1w3ngVRvB4HSUf4jl189DUAwSwAQ3xc4' },
  { name: 'Jeans suông ống rộng', url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBRoM6YwkHm8qw2JKRxVM-iaqzFpaMsJXLrVivcdiA32kZDRTJ0j08T9vmGsf-xtATTJjahEOvYRkiXTrkT36e2QLDBBAflPDKFj0u5LtOueW6aab6x2Sofy0C0OfP5gvzDzdMd7KnmEEHmRXV8r6Ye3-sPAWQuEZLbQduughbl_2E6miBakRKGBk73eIzeuvpayykP5Qc5FMy_Say7h604rIXu0Bg1zSrVmYi__srPuBDMzonmp4oUNZdJ6WlnyK3v_wbEBTlTXfI' },
  { name: 'Nike Street Sneaker', url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCN4UHXaoHKLtodn-xbKFHqJ50g1LVsj9bjdsoEFkXbrKPWCReZnY7n2RW06XziTvO6ap2_ivu-cXsiKzOKjvPl0qYeTN-2UboIlJ6iMhU6VdbxeliKXteyn-qMIDaKxeJvdfhil89DSpTzQJ8n_XyeGaY93ophnCOmo1WMBNxJvKodQHUQs3KM-dr1andZJYLqd3l4knvggyXbUyLcO6tTWbW5kDH_Y16cE5RCOeTjmME5fvf5SFnS9mqjogyiJghrNhKgiCcCX14' },
  { name: 'Đầm Zara Mini', url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDrZbm8OcLpcUOO9GSm9jf0BkpoDtM8o_Bl-nS0D5PTAfxB1F_lH5Jc4LoUsmgd4XrW7oribj8sS87EPF2qoB2b95dMM5133V3YUe87UeH3XJVUiBoYwEq47R1X-d5kLh_HrjuC3jhBjETvIX056gD5wREimcJoF6Q9Hj2eHG3OVV3OARh_vh5RPkp021dgVsWuc4dWvCBztabEbunp-dZxAb36ikHpQPuXzRmbs_BuCGTngLcO5wfDFfWUCK3PL_ncOjJGMheF0fY' },
  { name: 'Oversized Tee Trắng', url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBh3ttdqFG1umdi9IE9ssDFoG1lDyqioyvsikZNYaB-HG9DiCRVzfl8riqLyd9r_Oloi78UMxW24v1cAkBpxUgLwiRlh1xEVfbr5pu3dZt7um1Uw4-8htqK5YxC5Dgz0bW8Au0qCtYWqf2DyDFdyZYWEXDMzx57VUWp0inuwcV9F1PddaBHiphGiXds9V776-7AJb0o9N4PL_J8cHmw4Cesc62leFSIZ_OL7HIf8uYTU0Yn6QqxplvXMDLUV6u--nCCHcxTmiLvl1A' }
];

export default function UploadFormView({ onAddProduct }: UploadFormViewProps) {
  // Form fields state
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [color, setColor] = useState('');
  const [size, setSize] = useState('');
  const [condition, setCondition] = useState('Như mới (Không tag)');
  const [price, setPrice] = useState<number | ''>('');
  const [city, setCity] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(IMAGE_PRESETS[0].url); // default to preset
  const [customUrl, setCustomUrl] = useState('');
  const [isUrlTab, setIsUrlTab] = useState(false);

  // Success screen
  const [showSuccess, setShowSuccess] = useState(false);
  const [newlyCreatedId, setNewlyCreatedId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !brand || !category || !size || !price || !city) {
      alert('Vui lòng điền đầy đủ tất cả các trường có dấu sao (*)!');
      return;
    }

    const finalImage = isUrlTab && customUrl ? customUrl : image;
    const randomId = 'custom-' + Date.now();

    const newProduct: Product = {
      id: randomId,
      name,
      brand,
      price: Number(price),
      color: color || 'Trắng',
      colors: [color || 'Trắng'],
      size,
      sizes: [size],
      image: finalImage,
      images: [finalImage],
      description: description || `Sản phẩm dạng ${category} của thương hiệu ${brand} đăng tải bởi người dùng tại ${city}.`,
      condition,
      category,
      city,
      trending: false,
      likesCount: 0
    };

    onAddProduct(newProduct);
    setNewlyCreatedId(randomId);
    setShowSuccess(true);

    // Reset Form state
    setName('');
    setBrand('');
    setCategory('');
    setColor('');
    setSize('');
    setCondition('Như mới (Không tag)');
    setPrice('');
    setCity('');
    setDescription('');
    setCustomUrl('');
  };

  if (showSuccess) {
    return (
      <div className="w-full max-w-[640px] mx-auto bg-surface-lowest p-8 rounded-2xl border border-outline-variant/40 shadow-xl text-center flex flex-col items-center justify-center py-16 animate-fade-in-up">
        <div className="w-20 h-20 bg-brand-container text-white rounded-full flex items-center justify-center text-4xl mb-6 shadow-md animate-bounce">
          ✓
        </div>
        
        <h2 className="text-2xl font-extrabold text-on-surface">Đăng Sản Phẩm Thành Công!</h2>
        <p className="text-sm font-medium text-brand-slate mt-2 max-w-[360px] mx-auto">
          Món đồ thời trang của bạn đã được đưa lên sàn VibeCloset và sẵn sàng phục vụ các tín đồ mua sắm.
        </p>

        <div className="mt-8 p-4 bg-surface-low rounded-xl border border-outline-variant/30 text-left w-full">
          <p className="text-xs font-bold text-brand-slate uppercase mb-1">Thông số sản phẩm vừa tải lên:</p>
          <div className="grid grid-cols-2 gap-2 text-sm mt-2">
            <div><span className="text-brand-slate">Mặt hàng:</span> <strong className="text-on-surface">{name}</strong></div>
            <div><span className="text-brand-slate">Thương hiệu:</span> <strong className="text-on-surface">{brand}</strong></div>
            <div><span className="text-brand-slate">Giá bán:</span> <strong className="text-brand-primary">{price.toLocaleString()}đ</strong></div>
            <div><span className="text-brand-slate">Khu vực:</span> <strong className="text-on-surface">{city}</strong></div>
          </div>
        </div>

        <button
          onClick={() => {
            setShowSuccess(false);
          }}
          className="mt-8 px-6 py-3 bg-brand-primary text-white font-bold text-sm rounded-xl hover:opacity-95 cursor-pointer shadow-md"
        >
          Tiếp tục đăng sản phẩm mới
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[800px] mx-auto animate-fade-in-up">
      
      <div className="mb-6 text-center select-none">
        <h2 className="text-2xl font-extrabold text-on-surface">Đăng sản phẩm</h2>
        <p className="text-sm font-medium text-on-surface-variant mt-1.5">
          Chia sẻ phong cách của bạn và tìm chủ nhân mới cho món đồ.
        </p>
      </div>

      <form 
        onSubmit={handleSubmit}
        className="bg-surface-lowest p-6 md:p-8 rounded-2xl shadow-sm space-y-6 border border-outline-variant/30"
      >
        
        {/* Image Selection Section */}
        <section className="space-y-3">
          <label className="block text-sm font-bold text-on-surface">
            Hình ảnh sản phẩm * <span className="text-xs font-normal text-brand-slate normal-case">(Chọn mẫu hoặc điền link ảnh)</span>
          </label>

          {/* Toggle Tab between Preset & Custom URL */}
          <div className="flex bg-surface-low p-1 rounded-xl border border-outline-variant/20 max-w-[320px]">
            <button
              type="button"
              onClick={() => setIsUrlTab(false)}
              className={`flex-1 py-1.5 text-xs font-bold rounded-lg cursor-pointer transition-colors ${
                !isUrlTab ? 'bg-surface-lowest text-brand-primary shadow-sm' : 'text-brand-slate'
              }`}
            >
              Chọn Mẫu Sẵn Có
            </button>
            <button
              type="button"
              onClick={() => setIsUrlTab(true)}
              className={`flex-1 py-1.5 text-xs font-bold rounded-lg cursor-pointer transition-colors ${
                isUrlTab ? 'bg-surface-lowest text-brand-primary shadow-sm' : 'text-brand-slate'
              }`}
            >
              Dán Link Ảnh Tùy Ý
            </button>
          </div>

          {!isUrlTab ? (
            <div className="space-y-3">
              {/* Preset selector grid */}
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {IMAGE_PRESETS.map((pst, idx) => {
                  const isSelected = image === pst.url;
                  return (
                    <button
                      type="button"
                      key={idx}
                      onClick={() => setImage(pst.url)}
                      className={`relative aspect-[4/5] rounded-lg overflow-hidden border-2 cursor-pointer transition-all ${
                        isSelected ? 'border-brand-primary scale-105 shadow-sm' : 'border-outline-variant/30 opacity-75 hover:opacity-100'
                      }`}
                    >
                      <img src={pst.url} alt={pst.name} className="w-full h-full object-cover" />
                      {isSelected && (
                        <div className="absolute inset-0 bg-brand-primary/20 flex items-center justify-center text-white text-xs font-bold">
                          ✓ Selected
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
              <p className="text-[11px] font-semibold text-brand-slate">Mẹo: Chúng tôi chuẩn bị sẵn các mẫu ảnh chất lượng cao để trải nghiệm bán chạy sành điệu nhất.</p>
            </div>
          ) : (
            <div>
              <input
                type="url"
                value={customUrl}
                onChange={(e) => setCustomUrl(e.target.value)}
                placeholder="Nhập đường dẫn hình ảnh (https://...)"
                className="w-full bg-surface-bright border border-outline-variant/60 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all placeholder:text-brand-slate/60"
              />
              <p className="text-[11px] font-semibold text-brand-slate mt-1.5">Hỗ trợ các dạng đính kèm link JPEG/PNG/WEBP.</p>
            </div>
          )}

          {/* Dotted Layout matching screen */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
            
            {/* Primary thumbnail preview */}
            <div className="col-span-2 aspect-[4/5] bg-surface-low rounded-xl flex flex-col items-center justify-center border-2 border-dashed border-outline-variant/60 hover:border-brand-primary hover:bg-surface-bright transition-colors relative overflow-hidden">
              <img 
                src={isUrlTab && customUrl ? customUrl : image} 
                alt="Main Preview" 
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback
                  e.currentTarget.src = IMAGE_PRESETS[0].url;
                }}
              />
              <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-sm text-white px-2 py-1 rounded text-[10px] font-bold">
                Mặt trước (Ảnh chính)
              </div>
            </div>

            {/* Back preview simulator */}
            <div className="aspect-[4/5] bg-surface-low rounded-xl flex flex-col items-center justify-center border border-dashed border-outline-variant/40 hover:border-brand-primary/60 transition-colors cursor-pointer group p-2 relative">
              <Plus className="w-6 h-6 text-brand-slate group-hover:text-brand-primary transition-colors mb-1.5" />
              <span className="text-[11px] font-bold text-brand-slate group-hover:text-brand-primary text-center leading-tight">Mặt sau/Chi tiết</span>
              <div className="absolute bottom-1.5 text-[8px] text-brand-slate uppercase tracking-wider font-semibold">Tự động nạp</div>
            </div>

            {/* Tag preview simulator */}
            <div className="aspect-[4/5] bg-surface-low rounded-xl flex flex-col items-center justify-center border border-dashed border-outline-variant/40 hover:border-brand-primary/60 transition-colors cursor-pointer group p-2 relative">
              <Plus className="w-6 h-6 text-brand-slate group-hover:text-brand-primary transition-colors mb-1.5" />
              <span className="text-[11px] font-bold text-brand-slate group-hover:text-brand-primary text-center leading-tight">Tag/Lỗi (nếu có)</span>
              <div className="absolute bottom-1.5 text-[8px] text-brand-slate uppercase tracking-wider font-semibold">Tự động nạp</div>
            </div>

          </div>

        </section>

        {/* Basic Information Section */}
        <section className="space-y-4 pt-4 border-t border-surface-low">
          
          <div>
            <label className="block text-xs font-bold text-on-surface uppercase tracking-wider mb-2.5">
              Tên sản phẩm *
            </label>
            <input 
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ví dụ: Áo khoác da dáng lửng thêu thắt..."
              className="w-full bg-surface-bright border border-outline-variant/60 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <div>
              <label className="block text-xs font-bold text-on-surface uppercase tracking-wider mb-2.5">
                Thương hiệu *
              </label>
              <select
                required
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="w-full bg-surface-bright border border-outline-variant/60 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all appearance-none"
              >
                <option value="">Chọn thương hiệu</option>
                <option value="Uniqlo">Uniqlo</option>
                <option value="Zara">Zara</option>
                <option value="H&M">H&M</option>
                <option value="Nike">Nike</option>
                <option value="Adidas">Adidas</option>
                <option value="Local Brand">Không có / Local Brand</option>
                <option value="Korea Design">Korea Minimalist</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-on-surface uppercase tracking-wider mb-2.5">
                Danh mục *
              </label>
              <select
                required
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-surface-bright border border-outline-variant/60 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all appearance-none"
              >
                <option value="">Chọn danh mục</option>
                <option value="Áo">Áo (Top/Outerwear)</option>
                <option value="Quần">Quần (Bottom/Jeans)</option>
                <option value="Váy">Đầm/Váy (Dress)</option>
                <option value="Giày">Giày dép (Footwear)</option>
                <option value="Túi">Bao túi (Sling Bag/Tote)</option>
                <option value="Phụ kiện">Phụ kiện thời trang khác</option>
              </select>
            </div>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <div>
              <label className="block text-xs font-bold text-on-surface uppercase tracking-wider mb-2.5">
                Màu sắc
              </label>
              <input 
                type="text"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                placeholder="Ví dụ: Trắng, Đen, Be pastel..."
                className="w-full bg-surface-bright border border-outline-variant/60 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-on-surface uppercase tracking-wider mb-2.5">
                Kích cỡ *
              </label>
              <select
                required
                value={size}
                onChange={(e) => setSize(e.target.value)}
                className="w-full bg-surface-bright border border-outline-variant/60 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all appearance-none"
              >
                <option value="">Chọn kích cỡ</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
                <option value="Freesize">Freesize</option>
                <option value="39">39 (Giày)</option>
                <option value="40">40 (Giày)</option>
                <option value="41">41 (Giày)</option>
                <option value="42">42 (Giày)</option>
              </select>
            </div>

          </div>

          <div>
            <label className="block text-xs font-bold text-on-surface uppercase tracking-wider mb-2.5">
              Mô tả chi tiết sản phẩm
            </label>
            <textarea 
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Chất vải, phom dáng, dệt may, phong cách, độ co giãn thế nào..."
              className="w-full bg-surface-bright border border-outline-variant/60 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all"
            />
          </div>

        </section>

        {/* Condition & Pricing Section */}
        <section className="space-y-4 pt-4 border-t border-surface-low">
          
          <div>
            <label className="block text-xs font-bold text-on-surface uppercase tracking-wider mb-2.5">
              Tình trạng sản phẩm *
            </label>
            
            <div className="flex flex-wrap gap-2.5">
              {['Mới (Có tag)', 'Như mới (Không tag)', 'Đã qua sử dụng'].map((cond) => {
                const isSelected = condition === cond;
                return (
                  <label key={cond} className="cursor-pointer">
                    <input 
                      type="radio"
                      name="condition"
                      value={cond}
                      checked={isSelected}
                      onChange={() => setCondition(cond)}
                      className="sr-only"
                    />
                    <div className={`px-4.5 py-2 rounded-full border text-xs font-bold transition-all ${
                      isSelected 
                        ? 'bg-brand-primary border-brand-primary text-white shadow-sm' 
                        : 'bg-surface-lowest text-on-surface-variant border-outline-variant/60 hover:border-brand-primary/60'
                    }`}>
                      {cond}
                    </div>
                  </label>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            
            <div>
              <label className="block text-xs font-bold text-on-surface uppercase tracking-wider mb-2.5">
                Giá bán (VND) *
              </label>
              <div className="relative">
                <input 
                  type="number"
                  min={1}
                  required
                  placeholder="0"
                  value={price}
                  onChange={(e) => setPrice(e.target.value === '' ? '' : Number(e.target.value))}
                  className="w-full bg-surface-bright border border-outline-variant/60 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-brand-slate select-none">₫</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-on-surface uppercase tracking-wider mb-2.5">
                Thành phố / Khu vực *
              </label>
              <select
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full bg-surface-bright border border-outline-variant/60 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all appearance-none"
              >
                <option value="">Chọn địa điểm</option>
                <option value="Hồ Chí Minh">Hồ Chí Minh</option>
                <option value="Hà Nội">Hà Nội</option>
                <option value="Đà Nẵng">Đà Nẵng</option>
                <option value="Khác">Khác / Toàn Quốc</option>
              </select>
            </div>

          </div>

        </section>

        {/* Submit action trigger */}
        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-brand-primary text-white font-extrabold text-base py-4 rounded-xl hover:opacity-95 active:scale-[0.99] transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
          >
            Đăng sản phẩm ngay
          </button>
        </div>

      </form>

    </div>
  );
}
