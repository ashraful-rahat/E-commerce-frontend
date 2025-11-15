"use client";

import {
  ChevronDown,
  Filter,
  Grid,
  Heart,
  List,
  ShoppingBag,
  Sparkles,
  Star,
  TrendingUp,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import { getProductsByGender, type Product } from "../lib/productService";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedGender, setSelectedGender] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSubCategory, setSelectedSubCategory] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("newest");
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [cartItems, setCartItems] = useState<string[]>([]);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showSubCategoryDropdown, setShowSubCategoryDropdown] = useState(false);

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

  // Extract unique categories and sub-categories
  const categories = Array.from(
    new Set(products.map((p) => p.category))
  ).filter(Boolean);
  const subCategories = Array.from(
    new Set(products.map((p) => p.subCategory))
  ).filter(Boolean);

  // Get sub-categories based on selected category
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

  const addToCart = (productId: string) => {
    setCartItems((prev) => [...prev, productId]);
    console.log("Added to cart:", productId);
  };

  const getSortedProducts = () => {
    let filtered = [...products]; // Create a copy to avoid mutating original

    // Filter by gender
    if (selectedGender !== "all") {
      filtered = filtered.filter(
        (product) =>
          product.gender.toLowerCase() === selectedGender.toLowerCase()
      );
    }

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    // Filter by sub-category
    if (selectedSubCategory !== "all") {
      filtered = filtered.filter(
        (product) => product.subCategory === selectedSubCategory
      );
    }

    // Sort products
    const sortedProducts = [...filtered];

    switch (sortBy) {
      case "price-low":
        return sortedProducts.sort((a, b) => a.price - b.price);
      case "price-high":
        return sortedProducts.sort((a, b) => b.price - a.price);
      case "name":
        return sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
      case "rating":
        return sortedProducts.sort((a, b) => b.rating - a.rating);
      case "category":
        return sortedProducts.sort((a, b) =>
          (a.category || "").localeCompare(b.category || "")
        );
      case "subCategory":
        return sortedProducts.sort((a, b) =>
          (a.subCategory || "").localeCompare(b.subCategory || "")
        );
      default:
        // For newest first, return as is (assuming products are already in order)
        return sortedProducts;
    }
  };

  const filteredProducts = getSortedProducts();

  // Reset sub-category when category changes
  useEffect(() => {
    setSelectedSubCategory("all");
  }, [selectedCategory]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setShowCategoryDropdown(false);
      setShowSubCategoryDropdown(false);
    };

    if (showCategoryDropdown || showSubCategoryDropdown) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showCategoryDropdown, showSubCategoryDropdown]);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-blue-50 to-indigo-100 border-b border-blue-200 overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-200 rounded-full blur-3xl animate-pulse" />
          <div
            className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-200 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 py-20 md:py-28 text-center">
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full
              bg-white/80 backdrop-blur-sm border border-blue-200 shadow-sm"
          >
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-semibold text-blue-900 tracking-wider uppercase">
              Premium Collection
            </span>
            <TrendingUp className="w-4 h-4 text-blue-600" />
          </div>

          {/* Heading */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight text-gray-900">
            Discover Your Perfect Style
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light">
            Curated collections of premium fashion pieces, handpicked for those
            who appreciate
            <span className="text-blue-600 font-medium">
              {" "}
              exceptional quality{" "}
            </span>
            and
            <span className="text-blue-600 font-medium"> timeless design</span>.
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="sticky top-0 z-30 backdrop-blur-xl bg-white/80 border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-5">
          <div className="flex flex-col lg:flex-row gap-5 justify-between items-start lg:items-center">
            {/* Gender Filters */}
            <div className="flex gap-2 flex-wrap">
              {[
                { value: "all", label: "All Products", icon: Sparkles },
                { value: "men", label: "Men's" },
                { value: "women", label: "Women's" },
                { value: "kids", label: "Kids" },
              ].map(({ value, label, icon: Icon }) => (
                <button
                  key={value}
                  onClick={() => {
                    setSelectedGender(value);
                    setSelectedCategory("all");
                    setSelectedSubCategory("all");
                  }}
                  className={`group px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 ${
                    selectedGender === value
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {Icon && <Icon className="w-4 h-4" />}
                    {label}
                  </span>
                </button>
              ))}
            </div>

            {/* Category & Sub-category Filters */}
            <div className="flex gap-3 items-center flex-wrap">
              {/* Category Dropdown */}
              <div className="relative">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowCategoryDropdown(!showCategoryDropdown);
                    setShowSubCategoryDropdown(false);
                  }}
                  className="flex items-center gap-2 px-4 py-3 bg-white border-2 border-gray-300 rounded-full text-sm font-medium text-gray-700 hover:border-blue-500 transition-all cursor-pointer min-w-48 justify-between"
                >
                  <span>
                    {selectedCategory === "all"
                      ? "All Categories"
                      : selectedCategory}
                  </span>
                  <ChevronDown
                    size={16}
                    className={`transition-transform ${
                      showCategoryDropdown ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {showCategoryDropdown && (
                  <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-gray-200 rounded-2xl shadow-2xl z-40 max-h-60 overflow-y-auto">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedCategory("all");
                        setShowCategoryDropdown(false);
                      }}
                      className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors ${
                        selectedCategory === "all"
                          ? "bg-blue-50 text-blue-600 font-medium"
                          : "text-gray-700"
                      } ${
                        categories.length > 0 ? "border-b border-gray-100" : ""
                      }`}
                    >
                      All Categories
                    </button>
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedCategory(category);
                          setShowCategoryDropdown(false);
                        }}
                        className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors ${
                          selectedCategory === category
                            ? "bg-blue-50 text-blue-600 font-medium"
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
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowSubCategoryDropdown(!showSubCategoryDropdown);
                    setShowCategoryDropdown(false);
                  }}
                  disabled={filteredSubCategories.length === 0}
                  className="flex items-center gap-2 px-4 py-3 bg-white border-2 border-gray-300 rounded-full text-sm font-medium text-gray-700 hover:border-blue-500 transition-all cursor-pointer min-w-48 justify-between disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span>
                    {selectedSubCategory === "all"
                      ? "All Sub-Categories"
                      : selectedSubCategory}
                  </span>
                  <ChevronDown
                    size={16}
                    className={`transition-transform ${
                      showSubCategoryDropdown ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {showSubCategoryDropdown &&
                  filteredSubCategories.length > 0 && (
                    <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-gray-200 rounded-2xl shadow-2xl z-40 max-h-60 overflow-y-auto">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedSubCategory("all");
                          setShowSubCategoryDropdown(false);
                        }}
                        className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors ${
                          selectedSubCategory === "all"
                            ? "bg-blue-50 text-blue-600 font-medium"
                            : "text-gray-700"
                        } border-b border-gray-100`}
                      >
                        All Sub-Categories
                      </button>
                      {filteredSubCategories.map((subCategory) => (
                        <button
                          key={subCategory}
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedSubCategory(subCategory);
                            setShowSubCategoryDropdown(false);
                          }}
                          className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors ${
                            selectedSubCategory === subCategory
                              ? "bg-blue-50 text-blue-600 font-medium"
                              : "text-gray-700"
                          }`}
                        >
                          {subCategory}
                        </button>
                      ))}
                    </div>
                  )}
              </div>

              {/* Sort + View */}
              <div className="flex gap-3 items-center">
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="pl-4 pr-12 py-3 border-2 border-gray-300 rounded-full text-sm font-medium bg-white hover:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all cursor-pointer"
                  >
                    <option value="newest">Newest First</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="name">Name A-Z</option>
                    <option value="rating">Top Rated</option>
                    <option value="category">Category A-Z</option>
                    <option value="subCategory">Sub-Category A-Z</option>
                  </select>
                  <Filter
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600 pointer-events-none"
                    size={16}
                  />
                </div>

                {/* View Mode */}
                <div className="flex bg-gray-100 rounded-full p-1.5 border border-gray-300">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2.5 rounded-full transition-all ${
                      viewMode === "grid"
                        ? "bg-blue-600 text-white shadow-md"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    <Grid size={18} />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2.5 rounded-full transition-all ${
                      viewMode === "list"
                        ? "bg-blue-600 text-white shadow-md"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    <List size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Active Filters */}
          {(selectedCategory !== "all" || selectedSubCategory !== "all") && (
            <div className="flex items-center gap-2 mt-4 flex-wrap">
              <span className="text-sm text-gray-600">Active filters:</span>
              {selectedCategory !== "all" && (
                <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                  Category: {selectedCategory}
                  <button
                    onClick={() => setSelectedCategory("all")}
                    className="hover:text-blue-900"
                  >
                    ×
                  </button>
                </span>
              )}
              {selectedSubCategory !== "all" && (
                <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                  Sub-Category: {selectedSubCategory}
                  <button
                    onClick={() => setSelectedSubCategory("all")}
                    className="hover:text-green-900"
                  >
                    ×
                  </button>
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Product Listing */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              {selectedGender === "all"
                ? "All Products"
                : `${
                    selectedGender.charAt(0).toUpperCase() +
                    selectedGender.slice(1)
                  }'s Collection`}
            </h2>
            <p className="text-gray-600 text-lg">
              <span className="font-semibold text-blue-600">
                {filteredProducts.length}
              </span>{" "}
              exquisite pieces crafted for you
              {(selectedCategory !== "all" ||
                selectedSubCategory !== "all") && (
                <span className="text-gray-500">
                  {" "}
                  in{" "}
                  {selectedCategory !== "all" && (
                    <span className="font-medium">{selectedCategory}</span>
                  )}
                  {selectedCategory !== "all" &&
                    selectedSubCategory !== "all" &&
                    " • "}
                  {selectedSubCategory !== "all" && (
                    <span className="font-medium">{selectedSubCategory}</span>
                  )}
                </span>
              )}
            </p>
          </div>
        </div>

        {/* === GRID VIEW === */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
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
                <div key={product._id || product.slug} className="group h-full">
                  <Link
                    href={`/products/${product.slug}`}
                    className="block h-full"
                  >
                    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-200 hover:border-blue-300 h-full flex flex-col cursor-pointer transform hover:-translate-y-1">
                      {/* Image */}
                      <div className="relative overflow-hidden bg-gray-100 aspect-3/4">
                        <Image
                          src={
                            product.images[0] ||
                            "/placeholder.svg?height=400&width=300&query=fashion-product"
                          }
                          alt={product.name}
                          width={300}
                          height={400}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          priority={false}
                        />

                        {discount > 0 && (
                          <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                            {discount}% OFF
                          </div>
                        )}

                        {/* Wishlist */}
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            toggleWishlist(product._id || product.slug);
                          }}
                          className={`absolute top-4 right-4 p-2.5 rounded-full backdrop-blur-md border transition-all ${
                            wishlist.includes(product._id || product.slug)
                              ? "bg-red-500 text-white border-red-600 shadow-lg scale-110"
                              : "bg-white/80 text-gray-600 border-gray-300 hover:bg-white hover:text-red-600 hover:border-red-400 hover:scale-110"
                          }`}
                        >
                          <Heart
                            size={16}
                            fill={
                              wishlist.includes(product._id || product.slug)
                                ? "currentColor"
                                : "none"
                            }
                          />
                        </button>

                        {/* Quick Add */}
                        <div className="absolute bottom-0 left-0 right-0 p-4 bg-linear-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              addToCart(product._id || product.slug);
                            }}
                            className="w-full bg-blue-600 text-white px-5 py-3 rounded-xl font-semibold shadow-xl hover:shadow-2xl hover:bg-blue-700 flex items-center justify-center gap-2 transition-all"
                          >
                            <ShoppingBag size={16} />
                            Quick Add
                          </button>
                        </div>
                      </div>

                      {/* Info */}
                      <div className="p-5 grow flex flex-col">
                        <h3 className="font-bold text-gray-900 text-lg mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                          {product.name}
                        </h3>

                        <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed grow">
                          {removeHtmlTags(product.description).substring(0, 80)}
                          {removeHtmlTags(product.description).length > 80 &&
                            "..."}
                        </p>

                        {/* Category & Sub-category */}
                        <div className="flex items-center gap-2 mb-3">
                          <span className="inline-block px-2 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
                            {product.category}
                          </span>
                          <span className="inline-block px-2 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-200">
                            {product.subCategory}
                          </span>
                        </div>

                        {/* Rating */}
                        <div className="flex items-center gap-2 mb-4">
                          <div className="flex items-center gap-1 bg-blue-50 px-3 py-1.5 rounded-full">
                            <Star
                              className="fill-yellow-400 text-yellow-400"
                              size={14}
                            />
                            <span className="font-bold text-sm text-gray-900">
                              {product.rating}
                            </span>
                          </div>
                          <span className="text-gray-500 text-sm">
                            ({product.totalReviews})
                          </span>
                        </div>

                        {/* Price */}
                        <div className="flex items-center gap-3 mb-4">
                          <span className="text-xl font-bold text-gray-900">
                            ৳{product.price.toLocaleString()}
                          </span>
                          {product.compareAtPrice > product.price && (
                            <span className="text-sm text-gray-500 line-through">
                              ৳{product.compareAtPrice.toLocaleString()}
                            </span>
                          )}
                        </div>

                        {/* Gender */}
                        <div className="mt-auto">
                          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-gray-100 text-gray-600 border border-gray-300">
                            {product.gender}s
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        ) : (
          /* === LIST VIEW === */
          <div className="space-y-6">
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
                  className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-200 hover:border-blue-300 group"
                >
                  <Link href={`/products/${product.slug}`} className="block">
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-64 relative bg-gray-100 overflow-hidden">
                        <Image
                          src={
                            product.images[0] ||
                            "/placeholder.svg?height=300&width=250&query=fashion-product"
                          }
                          alt={product.name}
                          width={250}
                          height={300}
                          className="w-full h-56 md:h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        {discount > 0 && (
                          <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                            {discount}% OFF
                          </div>
                        )}
                      </div>

                      <div className="flex-1 p-6">
                        <div className="flex flex-col h-full">
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex-1">
                                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                                  {product.name}
                                </h3>
                                <p className="text-gray-600 leading-relaxed mb-4">
                                  {removeHtmlTags(product.description)}
                                </p>

                                {/* Category & Sub-category */}
                                <div className="flex items-center gap-3 mb-4">
                                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
                                    {product.category}
                                  </span>
                                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-200">
                                    {product.subCategory}
                                  </span>
                                  <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-gray-100 text-gray-600 border border-gray-300">
                                    {product.gender}s
                                  </span>
                                </div>
                              </div>
                              <button
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  toggleWishlist(product._id || product.slug);
                                }}
                                className={`p-3 rounded-full transition-all ml-4 border cursor-pointer ${
                                  wishlist.includes(product._id || product.slug)
                                    ? "bg-red-500 text-white border-red-500 shadow-lg"
                                    : "bg-gray-100 text-gray-600 border-gray-300 hover:text-red-500 hover:bg-red-500/10 hover:border-red-500/50"
                                }`}
                              >
                                <Heart
                                  size={20}
                                  fill={
                                    wishlist.includes(
                                      product._id || product.slug
                                    )
                                      ? "currentColor"
                                      : "none"
                                  }
                                />
                              </button>
                            </div>

                            <div className="flex items-center gap-4 mb-6 flex-wrap">
                              <div className="flex items-center gap-1 bg-blue-50 px-4 py-2 rounded-full">
                                <Star
                                  className="fill-yellow-400 text-yellow-400"
                                  size={16}
                                />
                                <span className="font-bold text-gray-900">
                                  {product.rating}
                                </span>
                                <span className="text-gray-600 text-sm">
                                  ({product.totalReviews})
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                            <div className="flex items-center gap-3">
                              <span className="text-2xl font-bold text-gray-900">
                                ৳{product.price.toLocaleString()}
                              </span>
                              {product.compareAtPrice > product.price && (
                                <span className="text-lg text-gray-500 line-through">
                                  ৳{product.compareAtPrice.toLocaleString()}
                                </span>
                              )}
                            </div>
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                addToCart(product._id || product.slug);
                              }}
                              className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:shadow-lg hover:bg-blue-700 transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2 cursor-pointer"
                            >
                              <ShoppingBag size={18} />
                              Add to Cart
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        )}

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <div className="bg-blue-50 w-32 h-32 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-lg border border-blue-200">
              <Filter size={48} className="text-blue-600" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              No products found
            </h3>
            <p className="text-gray-600 max-w-md mx-auto mb-8 text-lg leading-relaxed">
              We couldn&lsquo;t find any products matching your criteria. Try
              adjusting your filters or explore our full collection.
            </p>
            <button
              onClick={() => {
                setSelectedGender("all");
                setSelectedCategory("all");
                setSelectedSubCategory("all");
                setSortBy("newest");
              }}
              className="bg-blue-600 text-white px-10 py-4 rounded-xl font-bold hover:shadow-lg hover:bg-blue-700 transition-all duration-300 hover:scale-105 active:scale-95 inline-flex items-center gap-3"
            >
              <Sparkles size={20} />
              View All Products
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
