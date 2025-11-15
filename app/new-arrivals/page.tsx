"use client";

import {
  ChevronDown,
  Filter,
  Grid,
  List,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { useEffect, useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import ProductCard from "../components/ProductCard";
import { getNewArrivals, Product } from "../lib/productService";

export default function NewArrivalsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSubCategory, setSelectedSubCategory] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("newest");
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showSubCategoryDropdown, setShowSubCategoryDropdown] = useState(false);

  useEffect(() => {
    fetchNewArrivalsProducts();
  }, []);

  const fetchNewArrivalsProducts = async () => {
    try {
      const newProducts = await getNewArrivals(50); // Fetch latest 50 products
      setProducts(newProducts);
    } catch (error) {
      console.error("❌ Error fetching new arrivals:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const categories = Array.from(
    new Set(products.map((p) => p.category))
  ).filter(Boolean);
  const subCategories = Array.from(
    new Set(products.map((p) => p.subCategory))
  ).filter(Boolean);

  const filteredSubCategories =
    selectedCategory === "all"
      ? subCategories
      : Array.from(
          new Set(
            products
              .filter((p) => p.category === selectedCategory)
              .map((p) => p.subCategory)
          )
        ).filter(Boolean);

  const getSortedProducts = () => {
    if (!Array.isArray(products)) return [];

    let filtered = [...products];

    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    if (selectedSubCategory !== "all") {
      filtered = filtered.filter(
        (product) => product.subCategory === selectedSubCategory
      );
    }

    switch (sortBy) {
      case "price-low":
        return filtered.sort((a, b) => a.price - b.price);
      case "price-high":
        return filtered.sort((a, b) => b.price - a.price);
      case "name":
        return filtered.sort((a, b) => a.name.localeCompare(b.name));
      case "rating":
        return filtered.sort((a, b) => b.rating - a.rating);
      default:
        return filtered;
    }
  };

  const sortedProducts = getSortedProducts();

  useEffect(() => {
    setSelectedSubCategory("all");
  }, [selectedCategory]);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="relative bg-linear-to-br from-pink-50 to-purple-100 border-b border-pink-200 overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-pink-200 rounded-full blur-3xl animate-pulse" />
          <div
            className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-200 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 py-20 md:py-28 text-center">
          <div
            className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full
            bg-white/80 backdrop-blur-sm border border-pink-200 shadow-sm"
          >
            <Sparkles className="w-4 h-4 text-pink-600" />
            <span className="text-sm font-semibold text-pink-900 tracking-wider uppercase">
              New Arrivals
            </span>
            <TrendingUp className="w-4 h-4 text-pink-600" />
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight text-gray-900">
            Discover the Latest
          </h1>

          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light">
            Stay ahead in fashion with our curated collection of
            <span className="text-pink-600 font-medium"> new arrivals </span>
            across all categories.
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="sticky top-0 z-40 backdrop-blur-xl bg-white/80 border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-wrap gap-4 justify-between">
          {/* Category Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
              className="flex items-center gap-2 px-4 py-3 bg-white border-2 border-gray-300 rounded-xl text-sm font-medium text-gray-700 hover:border-pink-500 transition-all cursor-pointer min-w-48 justify-between"
            >
              <span>
                {selectedCategory === "all"
                  ? "All Categories"
                  : selectedCategory}
              </span>
              <ChevronDown
                size={16}
                className={
                  showCategoryDropdown ? "rotate-180 transition-transform" : ""
                }
              />
            </button>

            {showCategoryDropdown && (
              <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-gray-200 rounded-2xl shadow-2xl z-40 max-h-60 overflow-y-auto">
                <button
                  onClick={() => {
                    setSelectedCategory("all");
                    setShowCategoryDropdown(false);
                  }}
                  className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors ${
                    selectedCategory === "all"
                      ? "bg-pink-50 text-pink-600 font-medium"
                      : "text-gray-700"
                  } border-b border-gray-100`}
                >
                  All Categories
                </button>
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => {
                      setSelectedCategory(category);
                      setShowCategoryDropdown(false);
                    }}
                    className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors ${
                      selectedCategory === category
                        ? "bg-pink-50 text-pink-600 font-medium"
                        : "text-gray-700"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Sub-category Dropdown */}
          <div className="relative">
            <button
              onClick={() =>
                setShowSubCategoryDropdown(!showSubCategoryDropdown)
              }
              disabled={filteredSubCategories.length === 0}
              className="flex items-center gap-2 px-4 py-3 bg-white border-2 border-gray-300 rounded-xl text-sm font-medium text-gray-700 hover:border-pink-500 transition-all cursor-pointer min-w-48 justify-between disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>
                {selectedSubCategory === "all"
                  ? "All Sub-Categories"
                  : selectedSubCategory}
              </span>
              <ChevronDown
                size={16}
                className={
                  showSubCategoryDropdown
                    ? "rotate-180 transition-transform"
                    : ""
                }
              />
            </button>

            {showSubCategoryDropdown && filteredSubCategories.length > 0 && (
              <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-gray-200 rounded-2xl shadow-2xl z-40 max-h-60 overflow-y-auto">
                <button
                  onClick={() => {
                    setSelectedSubCategory("all");
                    setShowSubCategoryDropdown(false);
                  }}
                  className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors ${
                    selectedSubCategory === "all"
                      ? "bg-pink-50 text-pink-600 font-medium"
                      : "text-gray-700"
                  } border-b border-gray-100`}
                >
                  All Sub-Categories
                </button>
                {filteredSubCategories.map((subCategory) => (
                  <button
                    key={subCategory}
                    onClick={() => {
                      setSelectedSubCategory(subCategory);
                      setShowSubCategoryDropdown(false);
                    }}
                    className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors ${
                      selectedSubCategory === subCategory
                        ? "bg-pink-50 text-pink-600 font-medium"
                        : "text-gray-700"
                    }`}
                  >
                    {subCategory}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Sort + View Controls */}
          <div className="flex gap-3 items-center">
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="pl-4 pr-12 py-3 bg-white border-2 border-gray-300 rounded-xl text-sm font-medium text-gray-900 hover:border-pink-500 focus:ring-2 focus:ring-pink-500 transition-all cursor-pointer"
              >
                <option value="newest">Newest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name A-Z</option>
                <option value="rating">Top Rated</option>
              </select>
              <Filter
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600 pointer-events-none"
                size={16}
              />
            </div>

            <div className="flex bg-gray-100 rounded-xl p-1.5 border border-gray-300">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2.5 rounded-lg transition-all ${
                  viewMode === "grid"
                    ? "bg-pink-600 text-white shadow-md"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-200"
                }`}
              >
                <Grid size={18} />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2.5 rounded-lg transition-all ${
                  viewMode === "list"
                    ? "bg-pink-600 text-white shadow-md"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-200"
                }`}
              >
                <List size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Click outside overlay */}
      {(showCategoryDropdown || showSubCategoryDropdown) && (
        <div
          className="fixed inset-0 z-30"
          onClick={() => {
            setShowCategoryDropdown(false);
            setShowSubCategoryDropdown(false);
          }}
        />
      )}

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {Array.isArray(sortedProducts) &&
              sortedProducts.length > 0 &&
              sortedProducts.map((product) => (
                <ProductCard
                  key={product._id || product.slug}
                  product={product}
                  variant="light"
                />
              ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            {Array.isArray(sortedProducts) &&
              sortedProducts.length > 0 &&
              sortedProducts.map((product) => (
                <ProductCard
                  key={product._id || product.slug}
                  product={product}
                  variant="light"
                  layout="list"
                />
              ))}
          </div>
        )}

        {!Array.isArray(products) || sortedProducts.length === 0 ? (
          <div className="text-center py-20">
            <div className="bg-pink-50 w-32 h-32 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-lg border border-pink-200">
              <Filter size={48} className="text-pink-600" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              No new arrivals found
            </h3>
            <p className="text-gray-600 max-w-md mx-auto mb-8 text-lg leading-relaxed">
              We&lsquo;re currently updating our collection. Please check back
              soon.
            </p>
          </div>
        ) : null}

        {loading && (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600"></div>
          </div>
        )}
      </div>
    </div>
  );
}
