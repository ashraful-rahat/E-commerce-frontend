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

  const discountPercentage =
    product.compareAtPrice > product.price
      ? Math.round(
          ((product.compareAtPrice - product.price) / product.compareAtPrice) *
            100
        )
      : 0;

  return (
    <div className="group bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300">
      {/* Product Image with Link */}
      <Link href={`/products/${product.slug}`}>
        <div className="relative h-80 bg-gray-100 overflow-hidden">
          <Image
            src={product.images[0] || "/images/placeholder.jpg"}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />

          {/* Discount Badge */}
          {discountPercentage > 0 && (
            <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded text-sm font-medium">
              {discountPercentage}% OFF
            </div>
          )}

          {/* Wishlist Button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsWishlisted(!isWishlisted);
            }}
            className={`absolute top-3 right-3 p-2 rounded-full transition-all ${
              isWishlisted
                ? "bg-red-500 text-white"
                : "bg-white/80 text-gray-700 opacity-0 group-hover:opacity-100 hover:bg-white"
            }`}
          >
            <Heart size={18} className={isWishlisted ? "fill-white" : ""} />
          </button>

          {/* Rating */}
          <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
            <Star size={14} className="fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{product.rating}</span>
          </div>
        </div>
      </Link>

      {/* Product Info */}
      <div className="p-4">
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-semibold text-lg mb-2 hover:text-blue-600 transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>

        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>

        {/* Price */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xl font-bold text-gray-900">
            ৳{product.price}
          </span>
          {product.compareAtPrice > product.price && (
            <span className="text-sm text-gray-500 line-through">
              ৳{product.compareAtPrice}
            </span>
          )}
        </div>

        {/* Brand & Category */}
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>{product.brand}</span>
          <span>{product.category}</span>
        </div>

        {/* Add to Cart Button */}
        <button className="w-full mt-3 bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition-colors font-medium flex items-center justify-center gap-2">
          <ShoppingBag size={16} />
          Add to Cart
        </button>
      </div>
    </div>
  );
}
