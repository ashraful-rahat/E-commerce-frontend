"use client";

import { Sparkles, Star } from "lucide-react";
import { useEffect, useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import ProductCard from "../components/ProductCard";
import { getFeaturedProducts, Product } from "../lib/productService";

export default function FeaturedProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      const data = await getFeaturedProducts();
      setProducts(data);
    } catch (error) {
      console.error("❌ Error fetching featured products:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Enhanced Hero Section */}
      <div className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 py-20 md:py-24 text-center">
          {/* Premium Badge */}
          <div className="inline-flex items-center gap-3 mb-8 px-6 py-3 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 shadow-lg">
            <Sparkles className="w-5 h-5 text-white" />
            <span className="text-sm font-semibold text-white tracking-wider uppercase">
              Premium Collection
            </span>
            <Star className="w-5 h-5 text-white" />
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight text-white">
            Featured Products
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed font-light mb-8">
            Discover our exclusive collection of handpicked products, carefully
            curated for exceptional quality and style
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mt-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">
                {products.length}+
              </div>
              <div className="text-blue-200 text-sm font-medium">
                Premium Products
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">⭐ 4.8+</div>
              <div className="text-blue-200 text-sm font-medium">
                Customer Rating
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">🚚 Free</div>
              <div className="text-blue-200 text-sm font-medium">
                Fast Shipping
              </div>
            </div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="w-full h-12 text-white"
          >
            <path
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
              opacity=".25"
              fill="currentColor"
            ></path>
            <path
              d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
              opacity=".5"
              fill="currentColor"
            ></path>
            <path
              d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
              fill="currentColor"
            ></path>
          </svg>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Why Choose Our Featured Collection?
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Each product in our featured collection undergoes rigorous quality
            checks and is selected based on customer preferences, trending
            styles, and exceptional craftsmanship. We bring you the best of the
            best.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <div className="text-center p-8 rounded-2xl bg-white shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl">🎯</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Handpicked Selection
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Every product is carefully selected by our experts for quality,
              design, and customer satisfaction.
            </p>
          </div>

          <div className="text-center p-8 rounded-2xl bg-white shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl">⭐</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Premium Quality
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Experience superior craftsmanship and materials that stand the
              test of time and usage.
            </p>
          </div>

          <div className="text-center p-8 rounded-2xl bg-white shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl">🚀</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Trending Styles
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Stay ahead of fashion curves with our curated collection of
              trending and timeless designs.
            </p>
          </div>
        </div>

        {/* Products Grid Header */}
        <div className="text-center mb-12">
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Explore The Collection
          </h3>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Browse through our exclusive featured products and find your perfect
            match
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard
              key={product._id || product.slug}
              product={product}
              variant="featured"
            />
          ))}
        </div>

        {/* Empty State */}
        {products.length === 0 && (
          <div className="text-center py-20">
            <div className="bg-gradient-to-br from-blue-100 to-purple-100 w-32 h-32 rounded-2xl flex items-center justify-center mx-auto mb-8 border border-blue-200">
              <Star size={48} className="text-blue-600" />
            </div>

            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Coming Soon!
            </h3>
            <p className="text-gray-600 max-w-md mx-auto text-lg leading-relaxed mb-8">
              We're preparing something special for you. Our featured collection
              will be available soon with amazing products.
            </p>

            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 max-w-md mx-auto">
              <p className="text-blue-800 font-medium">
                🎁 In the meantime, explore our regular collection for great
                finds!
              </p>
            </div>
          </div>
        )}

        {/* CTA Section */}
        {products.length > 0 && (
          <div className="text-center mt-20">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white relative overflow-hidden">
              {/* Background Elements */}
              <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute bottom-0 right-0 w-48 h-48 bg-white/10 rounded-full translate-x-1/2 translate-y-1/2"></div>

              <h3 className="text-3xl font-bold mb-4 relative z-10">
                Love What You See?
              </h3>
              <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto relative z-10">
                Explore our complete collection with thousands more products
                waiting to be discovered. Find your perfect style today!
              </p>
              <button className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg relative z-10">
                Explore Full Collection
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
