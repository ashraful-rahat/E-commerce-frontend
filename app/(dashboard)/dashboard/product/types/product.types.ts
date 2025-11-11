export interface ProductVariantSize {
  size: string;
  sku: string;
  stock: number;
  price?: number;
  discountPrice?: number;
  isAvailable: boolean;
}

export interface ProductVariant {
  color: string;
  image?: string;
  sku?: string;
  sizes: ProductVariantSize[];
}

export interface ProductSEO {
  title?: string;
  description?: string;
  keywords?: string[];
}

export interface Product {
  _id: string;
  name: string;
  slug: string;
  gender: "men" | "women" | "kids";
  category: string;
  subCategory: string;
  tags: string[];
  brand?: string;
  fabric?: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  costPrice?: number;
  images: string[];
  variants: ProductVariant[];
  trackInventory: boolean;
  status: "draft" | "published" | "out_of_stock" | "archived";
  isFeatured: boolean;
  isFlashSale: boolean;
  isCombo: boolean;
  rating?: number;
  totalReviews: number;
  seo?: ProductSEO;
  createdAt: string;
  updatedAt: string;
  discountPercentage?: number;
  totalStock?: number;
}

export interface ProductFormData {
  name: string;
  slug: string;
  gender: "men" | "women" | "kids";
  category: string;
  subCategory: string;
  tags: string[];
  brand: string;
  fabric: string;
  description: string;
  price: number | "";
  compareAtPrice: number | "";
  costPrice: number | "";
  trackInventory: boolean;
  status: "draft" | "published" | "out_of_stock" | "archived";
  isFeatured: boolean;
  isFlashSale: boolean;
  isCombo: boolean;
  images: File[];
  imagePreviews: string[];
  variants: ProductVariant[];
  seo: ProductSEO;
}
