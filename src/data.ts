import { Product, Courier, PaymentMethod } from './types';

// The pre-populated hot-linked products from the user screens
export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'uniqlo-oversized-cotton-tshirt',
    name: 'Oversized Cotton T-shirt',
    brand: 'Uniqlo',
    price: 390000,
    color: 'White',
    colors: ['White', 'Black', 'Heather Grey'],
    size: 'M',
    sizes: ['S', 'M', 'L', 'XL'],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBh3ttdqFG1umdi9IE9ssDFoG1lDyqioyvsikZNYaB-HG9DiCRVzfl8riqLyd9r_Oloi78UMxW24v1cAkBpxUgLwiRlh1xEVfbr5pu3dZt7um1Uw4-8htqK5YxC5Dgz0bW8Au0qCtYWqf2DyDFdyZYWEXDMzx57VUWp0inuwcV9F1PddaBHiphGiXds9V776-7AJb0o9N4PL_J8cHmw4Cesc62leFSIZ_OL7HIf8uYTU0Yn6QqxplvXMDLUV6u--nCCHcxTmiLvl1A',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBh3ttdqFG1umdi9IE9ssDFoG1lDyqioyvsikZNYaB-HG9DiCRVzfl8riqLyd9r_Oloi78UMxW24v1cAkBpxUgLwiRlh1xEVfbr5pu3dZt7um1Uw4-8htqK5YxC5Dgz0bW8Au0qCtYWqf2DyDFdyZYWEXDMzx57VUWp0inuwcV9F1PddaBHiphGiXds9V776-7AJb0o9N4PL_J8cHmw4Cesc62leFSIZ_OL7HIf8uYTU0Yn6QqxplvXMDLUV6u--nCCHcxTmiLvl1A',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDezV7kCnqtWrR2F5UCu73nXixL-pYyJbZCKrgGlKt2NkqYyCOXAvMniZ8G62VQsePTSfI5KBWKw20r0xFoHu8usjEZY8DWMiY95A18T-Xw3cR4UtK1bxS0WPJRaRd_c7ooc_Cp22zbPCmZsmhgUVsYAl8fgh1bvIUDHFZs9SEIF_eRpf7sjLYtDcysMRXykTim09PVrfxjIGARlw9TMgzmdct0_5MGvtv2xvfe7L4ZhEhXj0GOIjKMf0evXtJNKDEybf_q2WkqIs4',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDOTtQv0kLUG86XdbSMaUaysXMnoE92uFXwmz-ECoZFyhFRnR1kddKGuE4Nb7z09Hm-8S2IwFda3T3KuLNNsubAvEIDHh74qeoWCEkUt-aYSSjlPKt0iZBlliCvOiZtJ3LQoNdD1Lfmr32FGfd9g5f6qCp78qJZF8BjUwcEEnCP9EY0j12XxLTdPuhRtODD1VD1amurcQfc5R52CQH6xoahQzDHnr0ei5EZ0xyW51lhXfBzug2UyvxR8nTMt1CH2RbKPQKsZ2hsorE',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBGRf2zH5dK6SMknzSoFcE-FUVagxGLRQOuDlrtI2zcq3R61z4mxxqIPVi9logQdssXxeKJIklSgrThgu5olk0PqGgFu9smTBMDevIJuADHEeiC4nqAcKuLedCDq9OJhde0XD44rsdjiURDnH5Fk0GlEKqh534bOMXTfvhy7IDKojr91lnJTNCp9EsPosYH24PTWAUor84MTgKM2bUECs7XHnYT_3S9j80eH5Ez3qhDUEWcAtrKRuUr3xMj6UsfV5YGZMAPsbnHLPI'
    ],
    description: 'Chất liệu thun cotton 100% mềm mại, thoáng mát cực kỳ dễ thở. Thiết kế phom dáng oversized suông rộng thời thượng tạo sự tự tin thoải mái tối đa, phong cách tối giản chuẩn Hàn Quốc.',
    condition: 'Như mới (Không tag)',
    category: 'Áo',
    city: 'Hồ Chí Minh',
    trending: true,
    likesCount: 142
  },
  {
    id: 'nike-air-street-sneaker',
    name: 'Nike Air Street Sneaker',
    brand: 'Nike',
    price: 2100000,
    originalPrice: 2450000,
    color: 'Premium White',
    colors: ['Premium White'],
    size: '41',
    sizes: ['39', '40', '41', '42'],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCN4UHXaoHKLtodn-xbKFHqJ50g1LVsj9bjdsoEFkXbrKPWCReZnY7n2RW06XziTvO6ap2_ivu-cXsiKzOKjvPl0qYeTN-2UboIlJ6iMhU6VdbxeliKXteyn-qMIDaKxeJvdfhil89DSpTzQJ8n_XyeGaY93ophnCOmo1WMBNxJvKodQHUQs3KM-dr1andZJYLqd3l4knvggyXbUyLcO6tTWbW5kDH_Y16cE5RCOeTjmME5fvf5SFnS9mqjogyiJghrNhKgiCcCX14',
    description: 'Giày thể thao đường phố cao cấp với thiết kế năng động, êm chân tuyệt đối. Phù hợp phối mọi set đồ streetwear cá tính.',
    condition: 'Mới (Có tag)',
    category: 'Giày',
    city: 'Hồ Chí Minh',
    trending: true,
    likesCount: 520
  },
  {
    id: 'zara-linen-mini-dress',
    name: 'Zara Linen Mini Dress',
    brand: 'Zara',
    price: 890000,
    color: 'Beige',
    colors: ['Beige', 'White'],
    size: 'S',
    sizes: ['XS', 'S', 'M'],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDrZbm8OcLpcUOO9GSm9jf0BkpoDtM8o_Bl-nS0D5PTAfxB1F_lH5Jc4LoUsmgd4XrW7oribj8sS87EPF2qoB2b95dMM5133V3YUe87UeH3XJVUiBoYwEq47R1X-d5kLh_HrjuC3jhBjETvIX056gD5wREimcJoF6Q9Hj2eHG3OVV3OARh_vh5RPkp021dgVsWuc4dWvCBztabEbunp-dZxAb36ikHpQPuXzRmbs_BuCGTngLcO5wfDFfWUCK3PL_ncOjJGMheF0fY',
    description: 'Đầm vải linen thô nhẹ mát mẻ từ thương hiệu Zara. Phom ôm dáng mini trẻ trung, ngọt ngào tôn làn da.',
    condition: 'Đã qua sử dụng',
    category: 'Váy',
    city: 'Hà Nội',
    trending: false,
    likesCount: 98
  },
  {
    id: 'wide-leg-denim-jeans',
    name: 'Wide Leg Denim Jeans',
    brand: 'Local Brand',
    price: 650000,
    originalPrice: 750000,
    color: 'Light Wash Blue',
    colors: ['Light Wash Blue', 'Deep Blue'],
    size: 'M',
    sizes: ['S', 'M', 'L'],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDxQSuwmHB7pGVRKqPEovr_rHmi0W_4n2AJBsO0pQFBuRjUPwdb4ti45jfXkOgQMDiSFy0l8HhqNVYxAzcXd9OLpLW6FLQ8Am4n6_2XhiEBT12uFlL38G6YTxTJ8-jAQbC0eOuYqN8LZd5Ota-JQ-2MmAJEhAzPIa1W83YcWk0vACv_BifexrWfp6fSb1PFAKdWQClx1HoNxOfecsxoqT1jFrVFKtU1rOOQeLpubD4xutvcspCSRZaTnhaxYXZtLzfqhB864WHKFf4',
    description: 'Quần jeans ống rộng phom suông cực kỳ cá tính và hack dáng tôn chân. Vải denim mềm dễ đứng phom.',
    condition: 'Như mới (Không tag)',
    category: 'Quần',
    city: 'Đà Nẵng',
    trending: false,
    likesCount: 221
  },
  {
    id: 'blazer-minimalist-pink',
    name: 'Áo khoác Blazer Minimalist Hồng',
    brand: 'VibeCloset',
    price: 850000,
    color: 'Pastel Pink',
    colors: ['Pastel Pink', 'Creamy White'],
    size: 'M',
    sizes: ['S', 'M', 'L'],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDkT11pa3TYUV56mTwqLzOC15ot41y5TzzHUo79SE1lBjL4Cuwd5siiiSAdCRm4hpTDRHCX8-fCAH3Fw1puUK-7vnuEUFXsdYZlvOMbSy9wiN6scbXq3bR5oTuILJJRWuOHwMIC0tn0bqL4zPEnuddwmttrh1kq6SHekrKjbezjH4iO850SwWIEyExh8UKRKSGeyrLPoFEnBxhNia-1PdIZ4Dr1JClGRDnX6jBEIGSBkfBZZBBEhDWbqbqHCrfXc6G3_vIXzH5rg3U',
    description: 'Chiếc blazer thiết kế phom rộng vai xuôi thanh lịch, màu hồng phấn nhẹ nhàng làm nổi bật cá tính thời thượng phóng khoáng.',
    condition: 'Như mới (Không tag)',
    category: 'Áo',
    city: 'Hồ Chí Minh',
    trending: true,
    likesCount: 310
  },
  {
    id: 'premium-vneck-tee',
    name: 'Premium V-Neck Tee',
    brand: 'Uniqlo',
    price: 290000,
    color: 'White',
    colors: ['White', 'Heather Gray'],
    size: 'M',
    sizes: ['S', 'M', 'L'],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD4ns0YU90QomsyN5zZjqGhME1foqWQdbeMFjXCTQlp3ucHbyNQQGYpY2Pd-7QE9XmD1IcRYzINSSEg5_WMbDeiiKu5J8tVRcp7oD0f0w8A8HAmuxF00oD8JMGpragyAo5q9wu4Q2kkISqF-WkQ2wfB-VJx0tkjQ8qhmIjsamgWM_zWtxYn5ADLv2BPh1jIQLXZdqfhM6goIFYimIG5Pu8fYCk_Yrb99u5Sgm3efjHWZ5Dvp4BqTrEPkzMCPM-ZoClwFp6I9vu1zUc',
    description: 'Áo phun cổ chữ V thun trơn thoáng mát, thớ dệt sợi bông tự nhiên vô cùng thoải mái cho ngày hè năng động.',
    condition: 'Mới (Có tag)',
    category: 'Áo',
    city: 'Hà Nội',
    trending: false,
    likesCount: 154
  },
  {
    id: 'minimal-graphic-tee',
    name: 'Minimal Graphic Tee',
    brand: 'VibeCloset',
    price: 350000,
    color: 'Silver Grey',
    colors: ['Silver Grey'],
    size: 'L',
    sizes: ['M', 'L', 'XL'],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDqq0iA5Jijn_DBl_6gwxRnk5cYAA02lQ_tvLRoCxhcU_Z1RT6Zu6nkyzBGaufTdcNG0gSggQpLq1KpohxJ6rDYazJGk132vONC9cgzdtU0wIVxj6UY6SO2an-zliAMm7DUU8JtxHWYx1DpuswUo6tGR0BvtUleRkqmxGwKRXYS93GxHYjMldFEhBZz1visOk0feyu-TgW-h-1zxrcM2613wmGBHct1_as0ph4jIJCntUs6kFsSYnOtgpk29ig9iCxcGzcMADNb0KU',
    description: 'Thiết kế hoạ tiết tinh tế hiện đại, sành điệu, chất vải giữ phom siêu việt chuẩn Hàn.',
    condition: 'Như mới (Không tag)',
    category: 'Áo',
    city: 'Đà Nẵng',
    trending: true,
    likesCount: 182
  },
  {
    id: 'classic-striped-tee',
    name: 'Classic Striped Tee',
    brand: 'Local Brand',
    price: 420000,
    color: 'Striped Navy',
    colors: ['Striped Navy'],
    size: 'S',
    sizes: ['S', 'M', 'L'],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCdwInT5_yuFxnmIjYUt1lweil1PBBixt9GioK1MT4z2X4zllFMODe_Mg-gn-bmFq4qCTEc7-5Ze_T8qdjSrs4sfiK-WknwqKOM-Aem2szoMO5t3WjM2b7Hu0D5VFIKX7VtLlfcr0iyh3Ia7TMfrWfErP7Nay7IIVnKyn4D3rH0DJKAalKSeHqYZSRgzZsuJnKOxwIiMLcSrGfAQie7311r-Frtnd7cm7dPN596GyejOtbdhbUNoO24vACIJpbNxI2mEaqMAj8-J9M',
    description: 'Hoạ tiết kẻ ngang cổ điển thanh lịch, chất vải cotton pha dệt kim bền bỉ mềm mại tuyệt đẹp.',
    condition: 'Đã qua sử dụng',
    category: 'Áo',
    city: 'Hồ Chí Minh',
    trending: false,
    likesCount: 88
  },
  {
    id: 'loose-denim-jeans-ai',
    name: 'Wide Leg Denim Jeans',
    brand: 'Korea Design',
    price: 750000,
    color: 'Light Blue',
    colors: ['Light Blue'],
    size: 'M',
    sizes: ['S', 'M', 'L'],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBRoM6YwkHm8qw2JKRxVM-iaqzFpaMsJXLrVivcdiA32kZDRTJ0j08T9vmGsf-xtATTJjahEOvYRkiXTrkT36e2QLDBBAflPDKFj0u5LtOueW6aab6x2Sofy0C0OfP5gvzDzdMd7KnmEEHmRXV8r6Ye3-sPAWQuEZLbQduughbl_2E6miBakRKGBk73eIzeuvpayykP5Qc5FMy_Say7h604rIXu0Bg1zSrVmYi__srPuBDMzonmp4oUNZdJ6WlnyK3v_wbEBTlTXfI',
    description: 'Dòng sản phẩm denim mỏng nhẹ tạo phom dáng thời thượng, lôi cuốn ngay từ cái nhìn đầu tiên.',
    condition: 'Như mới (Không tag)',
    category: 'Quần',
    city: 'Hồ Chí Minh',
    trending: true,
    likesCount: 420
  },
  {
    id: 'minimalist-sling-bag-ai',
    name: 'Minimalist Sling Bag',
    brand: 'VibeCloset',
    price: 450000,
    color: 'Noir Black',
    colors: ['Noir Black', 'Slate Grey'],
    size: 'Freesize',
    sizes: ['Freesize'],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBSdnhkZqV_Uxnlk4MP9JNTM1WGudg0SrdE7k5IFI4V36t0e-RCYllYlL1lhrnAaXDJS3KTeluaZb1V9uK6PjIuPSyy7t1P88Um60f0bA1KituKY5Ps1GFR5InOSP5aLJ5Yn-uQqb2XkL4_N_t76-ZliW_HCSXdrQsNHO45wg4cNdlGMmDdrIHe0DZkM1tEho3g-msOYzcJe8wFSPf0c0bU_gzrHCDdUtNcedvM7HNDwm7XIBnhuAhmwYlfsDn7fmVwssUC0VFszYs',
    description: 'Chất liệu da hạt mềm cao cấp, phụ kiện kim loại sơn mờ hiện đại không rỉ sét. Một sản phẩm mang đậm tư duy tối giản.',
    condition: 'Mới (Có tag)',
    category: 'Túi',
    city: 'Hồ Chí Minh',
    trending: true,
    likesCount: 689
  }
];

export const COURIERS: Courier[] = [
  {
    id: 'ghn',
    name: 'Giao Hàng Nhanh (GHN)',
    fee: 35000,
    estDays: '2-3 ngày (Có sẵn tại TP. HCM)'
  },
  {
    id: 'ghtk',
    name: 'Giao Hàng Tiết Kiệm (GHTK)',
    fee: 22000,
    estDays: '3-5 ngày (Toàn quốc)'
  }
];

export const PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: 'cod',
    name: 'Thanh toán khi nhận hàng (COD)',
    iconName: 'Banknote'
  },
  {
    id: 'momo',
    name: 'Ví MoMo',
    iconName: 'Wallet'
  },
  {
    id: 'zalopay',
    name: 'ZaloPay',
    iconName: 'WalletCards'
  },
  {
    id: 'credit',
    name: 'Thẻ tín dụng / Ghi nợ',
    iconName: 'CreditCard'
  },
  {
    id: 'bank',
    name: 'Chuyển khoản ngân hàng',
    iconName: 'Building2'
  }
];

// Seed initial profile
export const INITIAL_PROFILE = {
  name: 'Nguyễn Văn A',
  phone: '0901234567',
  address: '123 Đường Lê Lợi, Phường Bến Nghé, Quận 1',
  city: 'Hồ Chí Minh',
  uploadedProductIds: [] as string[],
  likedProductIds: ['uniqlo-oversized-cotton-tshirt', 'nike-air-street-sneaker'] as string[]
};
