"use client";

import { useEffect, useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import ProductCard from "../components/ProductCard";
import { getProductsByGender, Product } from "../lib/productService";

export default function MenPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMenProducts();
  }, []);

  const fetchMenProducts = async () => {
    try {
      const menProducts = await getProductsByGender("men");

      // ✅ DEBUG LOGS
      console.log("🔍 API Response:", menProducts);
      console.log("✅ Is Array:", Array.isArray(menProducts));

      // ✅ যদি array না হয়, try to extract from object
      if (!Array.isArray(menProducts)) {
        if (menProducts?.products && Array.isArray(menProducts.products)) {
          setProducts(menProducts.products);
        } else {
          console.error("❌ Products data is not an array!", menProducts);
          setProducts([]); // fallback
        }
      } else {
        setProducts(menProducts);
      }
    } catch (error) {
      console.error("❌ Error fetching men products:", error);
      setProducts([]); // avoid crash
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white py-12 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Men's Collection
        </h1>
        <p className="text-gray-600 text-lg">
          Discover premium fashion for men
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {/* ✅ SAFE MAP */}
          {Array.isArray(products) &&
            products.length > 0 &&
            products.map((product) => (
              <ProductCard
                key={product._id || product.slug}
                product={product}
              />
            ))}
        </div>

        {/* ✅ empty state */}
        {(!products || products.length === 0) && (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">No products found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
