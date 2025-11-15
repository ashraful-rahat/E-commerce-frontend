import axiosInstance from "../axios";

export interface Product {
  _id?: string;
  name: string;
  slug: string;
  gender: string;
  category: string;
  subCategory: string;
  tags: string[];
  brand: string;
  fabric: string;
  description: string;
  price: number;
  compareAtPrice: number;
  costPrice: number;
  images: string[];
  variants: Variant[];
  trackInventory: boolean;
  status: string;
  isFeatured: boolean;
  isFlashSale: boolean;
  isCombo: boolean;
  rating: number;
  totalReviews: number;
  seo: SEO;
}

export interface Variant {
  color: string;
  image: string;
  sku: string;
  sizes: Size[];
}

export interface Size {
  size: string;
  sku: string;
  stock: number;
  price: number;
  discountPrice: number;
  isAvailable: boolean;
}

export interface SEO {
  title: string;
  description: string;
  keywords: string[];
}

// Get Products by Gender
export const getProductsByGender = async (
  gender: string
): Promise<Product[]> => {
  try {
    const response = await axiosInstance.get(`/products?gender=${gender}`);
    console.log("📦 Raw API response:", response.data);
    return response.data?.data || [];
  } catch (error) {
    console.error(`Error fetching ${gender} products:`, error);
    return [];
  }
};

// Get Single Product by Slug
export const getProductBySlug = async (
  slug: string
): Promise<Product | null> => {
  try {
    const response = await axiosInstance.get(`/products/${slug}`);
    console.log("🔍 Product API response:", response.data);
    return response.data.data || null;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
};

// Get Flash Sale Products
export const getFlashSaleProducts = async (): Promise<Product[]> => {
  try {
    const response = await axiosInstance.get(`/products?isFlashSale=true`);
    console.log("🔥 Flash Sale API response:", response.data);
    return response.data?.data || [];
  } catch (error) {
    console.error("Error fetching flash sale products:", error);
    return [];
  }
};

// Get New Arrivals (latest products)
export const getNewArrivals = async (
  limit: number = 20
): Promise<Product[]> => {
  try {
    const response = await axiosInstance.get(
      `/products?sort=createdAt:desc&limit=${limit}`
    );
    console.log("🆕 New Arrivals API response:", response.data);
    return response.data?.data || [];
  } catch (error) {
    console.error("Error fetching new arrivals:", error);
    return [];
  }
};
