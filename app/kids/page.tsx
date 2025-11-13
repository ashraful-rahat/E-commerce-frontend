"use client";

import { useEffect, useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import ProductCard from "../components/ProductCard";
import { getProductsByGender, Product } from "../lib/productService";

export default function KidsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchKidsProducts();
  }, []);

  const fetchKidsProducts = async () => {
    try {
      const kidsProducts = await getProductsByGender("kids");
      setProducts(kidsProducts);
    } catch (error) {
      console.error("Error fetching kids products:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white py-12 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Kids Collection
        </h1>
        <p className="text-gray-600 text-lg">Cute and comfortable for kids</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product._id || product.slug} product={product} />
          ))}
        </div>

        {products.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">No products found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
