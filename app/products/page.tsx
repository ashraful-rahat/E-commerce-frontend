"use client";

import { Filter, Grid, Heart, List, ShoppingBag, Star } from "lucide-react";
import { useEffect, useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import { getProductsByGender, Product } from "../lib/productService";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedGender, setSelectedGender] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("newest");
  const [wishlist, setWishlist] = useState<string[]>([]);

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const fetchAllProducts = async () => {
    try {
      const [menProducts, womenProducts, kidsProducts] = await Promise.all([
        getProductsByGender("men"),
        getProductsByGender("women"),
        getProductsByGender("kids"),
      ]);

      const allProducts = [...menProducts, ...womenProducts, ...kidsProducts];
      setProducts(allProducts);
    } catch (error) {
      console.error("Error fetching all products:", error);
    } finally {
      setLoading(false);
    }
  };

  const removeHtmlTags = (htmlString: string) => {
    if (!htmlString) return "";
    return htmlString.replace(/<[^>]*>/g, "");
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const getSortedProducts = () => {
    const filtered =
      selectedGender === "all"
        ? products
        : products.filter((product) => product.gender === selectedGender);

    switch (sortBy) {
      case "price-low":
        return filtered.sort((a, b) => a.price - b.price);
      case "price-high":
        return filtered.sort((a, b) => b.price - a.price);
      case "name":
        return filtered.sort((a, b) => a.name.localeCompare(b.name));
      case "rating":
        return filtered.sort((a, b) => b.rating - a.rating);
      case "newest":
      default:
        return filtered;
    }
  };

  const filteredProducts = getSortedProducts();

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Clean Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Discover Your Style
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Explore our curated collection of premium fashion for every occasion
          </p>
        </div>
      </div>

      {/* Controls Section */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row gap-6 justify-between items-start lg:items-center">
            {/* Gender Filter */}
            <div className="flex gap-2 flex-wrap">
              {[
                { value: "all", label: "All Products" },
                { value: "men", label: "Men's" },
                { value: "women", label: "Women's" },
                { value: "kids", label: "Kids" },
              ].map(({ value, label }) => (
                <button
                  key={value}
                  onClick={() => setSelectedGender(value)}
                  className={`px-5 py-2.5 rounded-lg font-medium transition-all duration-200 ${
                    selectedGender === value
                      ? "bg-gray-900 text-white shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Controls */}
            <div className="flex gap-3 items-center">
              {/* Sort */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="pl-4 pr-10 py-2.5 border border-gray-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-gray-900 focus:border-transparent appearance-none"
                >
                  <option value="newest">Newest First</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="name">Name A-Z</option>
                  <option value="rating">Top Rated</option>
                </select>
                <Filter
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={16}
                />
              </div>

              {/* View Toggle */}
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-md transition-all ${
                    viewMode === "grid"
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <Grid size={18} />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-md transition-all ${
                    viewMode === "list"
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <List size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Results Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {selectedGender === "all"
                ? "All Products"
                : `${
                    selectedGender.charAt(0).toUpperCase() +
                    selectedGender.slice(1)
                  }'s Collection`}
            </h2>
            <p className="text-gray-600 mt-1">
              {filteredProducts.length} products found
            </p>
          </div>
        </div>

        {/* Products Grid/List */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => {
              const discount =
                product.compareAtPrice > product.price
                  ? Math.round(
                      ((product.compareAtPrice - product.price) /
                        product.compareAtPrice) *
                        100
                    )
                  : 0;

              return (
                <div key={product._id || product.slug} className="group">
                  {/* Product Card */}
                  <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-200 hover:border-gray-300">
                    {/* Image Container */}
                    <div className="relative overflow-hidden bg-gray-100">
                      <img
                        src={product.images[0] || "/images/placeholder.jpg"}
                        alt={product.name}
                        className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-500"
                      />

                      {/* Discount Badge */}
                      {discount > 0 && (
                        <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-md text-xs font-bold">
                          {discount}% OFF
                        </div>
                      )}

                      {/* Wishlist Button */}
                      <button
                        onClick={() =>
                          toggleWishlist(product._id || product.slug)
                        }
                        className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-200 ${
                          wishlist.includes(product._id || product.slug)
                            ? "bg-red-500 text-white"
                            : "bg-white/90 text-gray-600 hover:bg-white hover:text-red-500"
                        }`}
                      >
                        <Heart
                          size={18}
                          fill={
                            wishlist.includes(product._id || product.slug)
                              ? "currentColor"
                              : "none"
                          }
                        />
                      </button>

                      {/* Quick Add Button */}
                      <button className="absolute bottom-3 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-5 py-2.5 rounded-lg font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-black shadow-lg flex items-center gap-2">
                        <ShoppingBag size={16} />
                        Quick Add
                      </button>
                    </div>

                    {/* Product Info */}
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 text-base mb-2 line-clamp-2">
                        {product.name}
                      </h3>

                      <p className="text-gray-600 text-sm mb-3 line-clamp-2 leading-relaxed">
                        {removeHtmlTags(product.description).substring(0, 70)}
                        ...
                      </p>

                      {/* Rating */}
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center gap-1">
                          <Star
                            className="fill-yellow-400 text-yellow-400"
                            size={14}
                          />
                          <span className="font-semibold text-sm">
                            {product.rating}
                          </span>
                        </div>
                        <span className="text-gray-400 text-sm">•</span>
                        <span className="text-gray-500 text-sm">
                          {product.totalReviews} reviews
                        </span>
                      </div>

                      {/* Price */}
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-gray-900">
                          ৳{product.price}
                        </span>
                        {product.compareAtPrice > product.price && (
                          <span className="text-sm text-gray-500 line-through">
                            ৳{product.compareAtPrice}
                          </span>
                        )}
                      </div>

                      {/* Gender Badge */}
                      <div className="mt-3">
                        <span
                          className={`inline-block px-2 py-1 rounded-md text-xs font-medium capitalize ${
                            product.gender === "men"
                              ? "bg-blue-100 text-blue-700"
                              : product.gender === "women"
                              ? "bg-pink-100 text-pink-700"
                              : "bg-green-100 text-green-700"
                          }`}
                        >
                          {product.gender}'s
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* List View */
          <div className="space-y-4">
            {filteredProducts.map((product) => {
              const discount =
                product.compareAtPrice > product.price
                  ? Math.round(
                      ((product.compareAtPrice - product.price) /
                        product.compareAtPrice) *
                        100
                    )
                  : 0;

              return (
                <div
                  key={product._id || product.slug}
                  className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden border border-gray-200"
                >
                  <div className="flex flex-col md:flex-row">
                    {/* Image */}
                    <div className="md:w-48 relative bg-gray-100">
                      <img
                        src={product.images[0] || "/images/placeholder.jpg"}
                        alt={product.name}
                        className="w-full h-48 md:h-full object-cover"
                      />
                      {discount > 0 && (
                        <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-md text-xs font-bold">
                          {discount}% OFF
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-4">
                      <div className="flex flex-col h-full">
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">
                              {product.name}
                            </h3>
                            <button
                              onClick={() =>
                                toggleWishlist(product._id || product.slug)
                              }
                              className={`p-1.5 rounded-md transition-all ${
                                wishlist.includes(product._id || product.slug)
                                  ? "text-red-500 bg-red-50"
                                  : "text-gray-400 hover:text-red-500 hover:bg-gray-100"
                              }`}
                            >
                              <Heart
                                size={18}
                                fill={
                                  wishlist.includes(product._id || product.slug)
                                    ? "currentColor"
                                    : "none"
                                }
                              />
                            </button>
                          </div>

                          <p className="text-gray-600 text-sm mb-3 leading-relaxed">
                            {removeHtmlTags(product.description)}
                          </p>

                          <div className="flex items-center gap-3 mb-3">
                            <div className="flex items-center gap-1">
                              <Star
                                className="fill-yellow-400 text-yellow-400"
                                size={14}
                              />
                              <span className="font-semibold text-sm">
                                {product.rating}
                              </span>
                              <span className="text-gray-500 text-sm">
                                ({product.totalReviews})
                              </span>
                            </div>
                            <span
                              className={`px-2 py-1 rounded-md text-xs font-medium capitalize ${
                                product.gender === "men"
                                  ? "bg-blue-100 text-blue-700"
                                  : product.gender === "women"
                                  ? "bg-pink-100 text-pink-700"
                                  : "bg-green-100 text-green-700"
                              }`}
                            >
                              {product.gender}'s
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                          <div className="flex items-center gap-2">
                            <span className="text-xl font-bold text-gray-900">
                              ৳{product.price}
                            </span>
                            {product.compareAtPrice > product.price && (
                              <span className="text-sm text-gray-500 line-through">
                                ৳{product.compareAtPrice}
                              </span>
                            )}
                          </div>
                          <button className="bg-gray-900 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-black transition-all duration-200 flex items-center gap-2">
                            <ShoppingBag size={16} />
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Filter size={32} className="text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No products found
            </h3>
            <p className="text-gray-600 max-w-md mx-auto mb-6">
              We couldn't find any products matching your criteria. Try
              adjusting your filters.
            </p>
            <button
              onClick={() => setSelectedGender("all")}
              className="bg-gray-900 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-black transition-all duration-200"
            >
              View All Products
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
