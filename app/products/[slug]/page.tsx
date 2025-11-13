"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import LoadingSpinner from "@/app/components/LoadingSpinner";
import { getProductBySlug, Product } from "@/app/lib/productService";
import {
  Heart,
  RotateCcw,
  Shield,
  ShoppingBag,
  Star,
  Truck,
} from "lucide-react";
import Image from "next/image";

export default function ProductPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  // HTML tag remove করার function
  const removeHtmlTags = (htmlString: string) => {
    if (!htmlString) return "";
    return htmlString.replace(/<[^>]*>/g, "");
  };

  useEffect(() => {
    fetchProduct();
  }, [slug]);

  const fetchProduct = async () => {
    try {
      const productData = await getProductBySlug(slug);
      setProduct(productData);

      // Set default selections
      if (productData?.variants?.[0]) {
        setSelectedColor(productData.variants[0].color);
        setSelectedSize(productData.variants[0].sizes[0]?.size || "");
      }
    } catch (error) {
      console.error("Error fetching product:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (!product) return <div>Product not found</div>;

  const discountPercentage =
    product.compareAtPrice > product.price
      ? Math.round(
          ((product.compareAtPrice - product.price) / product.compareAtPrice) *
            100
        )
      : 0;

  const selectedVariant = product.variants.find(
    (v) => v.color === selectedColor
  );
  const availableSizes =
    selectedVariant?.sizes.filter((size) => size.isAvailable) || [];

  const addToCart = () => {
    // Add to cart logic
    console.log("Added to cart:", {
      product: product.name,
      color: selectedColor,
      size: selectedSize,
      quantity,
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div>
            {/* Main Image */}
            <div className="relative h-96 lg:h-[500px] bg-gray-50 rounded-xl overflow-hidden mb-4 shadow-sm">
              <Image
                src={product.images[selectedImage] || "/images/placeholder.jpg"}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>

            {/* Thumbnail Images */}
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 relative w-20 h-20 bg-gray-50 rounded-lg overflow-hidden transition-all ${
                    selectedImage === index
                      ? "ring-2 ring-indigo-500"
                      : "ring-1 ring-gray-200"
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {product.name}
              </h1>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  <Star className="fill-yellow-400 text-yellow-400" size={20} />
                  <span className="font-semibold">{product.rating}</span>
                  <span className="text-gray-500">
                    ({product.totalReviews} reviews)
                  </span>
                </div>
                <span className="text-gray-500">•</span>
                <span className="text-green-600 font-semibold">In Stock</span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold text-gray-900">
                ৳{product.price}
              </span>
              {product.compareAtPrice > product.price && (
                <>
                  <span className="text-xl text-gray-500 line-through">
                    ৳{product.compareAtPrice}
                  </span>
                  <span className="bg-red-100 text-red-700 px-2 py-1 rounded-md text-sm font-medium">
                    {discountPercentage}% OFF
                  </span>
                </>
              )}
            </div>

            {/* Description */}
            <div className="text-gray-600 leading-relaxed">
              {removeHtmlTags(product.description)}
            </div>

            {/* Color Selection */}
            <div>
              <h3 className="font-semibold text-lg mb-3">
                Color: <span className="text-indigo-600">{selectedColor}</span>
              </h3>
              <div className="flex gap-2">
                {product.variants.map((variant) => (
                  <button
                    key={variant.color}
                    onClick={() => {
                      setSelectedColor(variant.color);
                      setSelectedSize(variant.sizes[0]?.size || "");
                    }}
                    className={`px-4 py-2 border-2 rounded-lg transition-all ${
                      selectedColor === variant.color
                        ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    {variant.color}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <h3 className="font-semibold text-lg mb-3">Size</h3>
              <div className="flex gap-2">
                {availableSizes.map((size) => (
                  <button
                    key={size.size}
                    onClick={() => setSelectedSize(size.size)}
                    className={`px-4 py-2 border-2 rounded-lg transition-all ${
                      selectedSize === size.size
                        ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    {size.size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="flex gap-4">
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 hover:bg-gray-50 transition-colors"
                >
                  -
                </button>
                <span className="px-4 py-2 min-w-12 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 hover:bg-gray-50 transition-colors"
                >
                  +
                </button>
              </div>

              <button
                onClick={addToCart}
                className="text-white px-8 py-4 font-medium tracking-wider uppercase text-sm hover:bg-gray-100 hover:scale-105 transform transition-all duration-300 flex items-center gap-2 justify-center border border-black shadow-lg hover:shadow-xl"
              >
                <ShoppingBag size={18} />
                Shop Collection
              </button>

              <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Heart size={20} />
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-gray-200">
              <div className="flex items-center gap-2">
                <Truck size={20} className="text-indigo-600" />
                <span className="text-sm">Free Shipping</span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw size={20} className="text-indigo-600" />
                <span className="text-sm">30-Day Returns</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield size={20} className="text-indigo-600" />
                <span className="text-sm">2-Year Warranty</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
