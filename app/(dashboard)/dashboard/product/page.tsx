"use client";

import axiosInstance from "@/app/axios";
import { Plus, RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import ProductForm from "./components/ProductForm";
import ProductTable from "./components/ProductTable";
import type { Product } from "./types/product.types";

const ProductPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get<{ data: Product[] }>("/products");
      setProducts(res.data.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  const openAddForm = () => {
    setEditingProduct(null);
    setIsFormOpen(true);
  };

  const openEditForm = (product: Product) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setEditingProduct(null);
  };

  const handleFormSuccess = () => {
    handleFormClose();
    fetchProducts();
  };

  const publishedProducts = products.filter(
    ({ status }) => status === "published"
  ).length;
  const draftProducts = products.filter(
    ({ status }) => status === "draft"
  ).length;
  const inventoryUnits = products.reduce((acc, product) => {
    if (typeof product.totalStock === "number") {
      return acc + product.totalStock;
    }
    const variantStock = product.variants.reduce((variantAcc, variant) => {
      const sizeStock = variant.sizes.reduce(
        (sizeAcc, size) => sizeAcc + (size.stock ?? 0),
        0
      );
      return variantAcc + sizeStock;
    }, 0);
    return acc + variantStock;
  }, 0);

  const inventoryValue = products.reduce((acc, product) => {
    const stock =
      typeof product.totalStock === "number"
        ? product.totalStock
        : product.variants.reduce((variantAcc, variant) => {
            const sizeStock = variant.sizes.reduce(
              (sizeAcc, size) => sizeAcc + (size.stock ?? 0),
              0
            );
            return variantAcc + sizeStock;
          }, 0);

    return acc + product.price * stock;
  }, 0);

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex-1">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
              Catalog Engine
            </p>
            <h1 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">
              Products Control Center
            </h1>
            <p className="mt-2 max-w-xl text-sm text-slate-600">
              Manage listings, pricing, availability, and merchandising rules
              with real-time synchronization to every channel.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-shrink-0">
            <button
              onClick={fetchProducts}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-slate-900"
              type="button"
            >
              <RefreshCw className="h-4 w-4" />
              Refresh
            </button>
            <button
              onClick={openAddForm}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-emerald-700"
            >
              <Plus className="h-4 w-4" />
              Add Product
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <CardStat
            label="Published SKUs"
            value={publishedProducts}
            badge="+6 new this week"
            tone="emerald"
          />
          <CardStat
            label="Drafts Waiting"
            value={draftProducts}
            badge="Clean up backlog"
            tone="amber"
          />
          <CardStat
            label="Inventory Units"
            value={inventoryUnits}
            badge="Live stock across variants"
            tone="emerald"
          />
          <CardStat
            label="Inventory Value"
            value={
              inventoryValue > 0 ? `$${inventoryValue.toLocaleString()}` : "$0"
            }
            badge="Retail value"
            tone="emerald"
          />
        </div>
      </section>

      {/* Products Section */}
      <section className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              Catalog Overview
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Search, filter, and orchestrate inventory performance.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50">
              Bulk Actions
            </button>
            <button className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50">
              Export Catalog
            </button>
          </div>
        </div>

        {/* Table */}
        <ProductTable
          products={products}
          loading={loading}
          onEdit={openEditForm}
          onDeleteSuccess={fetchProducts}
        />

        {/* Footer Info */}
        <div className="text-xs font-medium text-slate-600">
          Showing {products.length} products · Last sync moments ago
        </div>
      </section>

      {/* Form Modal */}
      {isFormOpen && (
        <ProductForm
          product={editingProduct}
          onClose={handleFormClose}
          onSuccess={handleFormSuccess}
        />
      )}
    </div>
  );
};

export default ProductPage;

type CardStatProps = {
  label: string;
  value: number | string;
  badge: string;
  tone?: "emerald" | "amber";
};

const CardStat = ({ label, value, badge, tone = "emerald" }: CardStatProps) => {
  const toneStyles =
    tone === "amber"
      ? "bg-amber-100 text-amber-700"
      : "bg-emerald-100 text-emerald-700";

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
        {label}
      </p>
      <p className="mt-3 text-2xl font-bold text-slate-900">{value}</p>
      <span
        className={`mt-3 inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${toneStyles}`}
      >
        {badge}
      </span>
    </div>
  );
};
