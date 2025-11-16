"use client";

import { Heart, ShoppingBag, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Product } from "../lib/productService";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const discountPercentage =
    product.compareAtPrice > product.price
      ? Math.round(
          ((product.compareAtPrice - product.price) / product.compareAtPrice) *
            100
        )
      : 0;

  const inStock =
    product.variants?.some((variant) =>
      variant.sizes?.some((size) => size.stock > 0)
    ) ?? true;

  return (
    <div className="group bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300">
      {/* Image Section */}
      <div className="relative h-64 overflow-hidden bg-gray-100">
        <Link href={`/products/${product.slug}`}>
          <Image
            src={product.images?.[0] || "/images/placeholder.jpg"}
            alt={product.name}
            fill
            className={`object-cover group-hover:scale-105 transition-transform duration-500 ${
              imageLoading ? "blur-sm" : "blur-0"
            }`}
            onLoad={() => setImageLoading(false)}
          />
        </Link>

        {/* Discount Badge */}
        {discountPercentage > 0 && (
          <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
            {discountPercentage}% OFF
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={() => setIsWishlisted(!isWishlisted)}
          className={`absolute top-3 right-3 p-2 rounded-full transition-all ${
            isWishlisted
              ? "bg-red-500 text-white scale-110"
              : "bg-white/90 text-gray-700 opacity-0 group-hover:opacity-100 hover:bg-white"
          }`}
        >
          <Heart size={20} className={isWishlisted ? "fill-white" : ""} />
        </button>

        {/* Out of Stock Overlay */}
        {!inStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="bg-white px-4 py-2 rounded-lg font-semibold text-gray-900">
              Out of Stock
            </span>
          </div>
        )}

        {/* Rating Badge */}
        {product.rating > 0 && (
          <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
            <Star size={16} className="fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-semibold text-gray-900">
              {product.rating}
            </span>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-5">
        {/* Category */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-500 uppercase font-medium tracking-wide">
            {product.category}
          </span>
          {product.isFeatured && (
            <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-xs font-semibold">
              Featured
            </span>
          )}
        </div>

        {/* Product Name */}
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-semibold text-lg text-gray-900 mb-2 hover:text-blue-600 transition-colors line-clamp-2 leading-tight">
            {product.name}
          </h3>
        </Link>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
          {product.description}
        </p>

        {/* Price Section */}
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl font-bold text-gray-900">
            ৳{product.price?.toLocaleString()}
          </span>
          {product.compareAtPrice > product.price && (
            <span className="text-lg text-gray-500 line-through">
              ৳{product.compareAtPrice?.toLocaleString()}
            </span>
          )}
        </div>

        {/* Brand & Stock */}
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <span className="font-medium">{product.brand}</span>
          {inStock ? (
            <span className="text-green-600 font-semibold">In Stock</span>
          ) : (
            <span className="text-red-600 font-semibold">Out of Stock</span>
          )}
        </div>

        {/* Add to Cart Button */}
        <button
          disabled={!inStock}
          className={`w-full py-3 px-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
            inStock
              ? "bg-gray-900 text-white hover:bg-gray-800 active:scale-95"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          <ShoppingBag size={18} />
          {inStock ? "Add to Cart" : "Out of Stock"}
        </button>
      </div>
    </div>
  );
}
