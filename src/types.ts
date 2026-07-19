export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  color: string;
  colors?: string[]; // Multiple available colors
  size: string;
  sizes?: string[]; // Available sizes for selection
  image: string; // Featured image
  images?: string[]; // Lightbox images
  description: string;
  condition: string; // 'Mới (Có tag)' | 'Như mới (Không tag)' | 'Đã qua sử dụng'
  category: string; // e.g. 'Áo' | 'Quần' | 'Váy' | 'Giày' | 'Túi'
  city: string; // 'Hồ Chí Minh' | 'Hà Nội' | 'Đà Nẵng' | 'Khác'
  trending?: boolean;
  likesCount?: number;
}

export interface CartItem {
  id: string; // custom cart itemId combining productId + color + size
  product: Product;
  quantity: number;
  selectedColor: string;
  selectedSize: string;
}

export interface Courier {
  id: string;
  name: string;
  fee: number;
  estDays: string;
}

export interface PaymentMethod {
  id: string;
  name: string;
  iconName: string;
}

export type AppRoute = 'onboarding' | 'home' | 'detail' | 'upload' | 'checkout' | 'me' | 'wishlist' | 'search';

export interface UserProfile {
  name: string;
  phone: string;
  address: string;
  city: string;
  uploadedProductIds: string[];
  likedProductIds: string[];
}
