import {
  DollarSign,
  Edit,
  ImageIcon,
  Package,
  Trash2,
  Users,
} from "lucide-react";
import Image from "next/image";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";

import axiosInstance from "@/app/axios";
import { Product } from "../types/product.types";

interface ProductTableProps {
  products: Product[];
  loading: boolean;
  onEdit: (product: Product) => void;
  onDeleteSuccess: () => void;
}

const ProductTable = ({
  products,
  loading,
  onEdit,
  onDeleteSuccess,
}: ProductTableProps) => {
  const handleDelete = async (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosInstance.delete(`/products/${id}`);
          toast.success("Product deleted successfully");
          onDeleteSuccess();
        } catch (err) {
          console.error(err);
          toast.error("Delete failed");
        }
      }
    });
  };

  if (loading) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center text-slate-500">
        Loading products...
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <table className="w-full border-collapse text-left text-sm text-slate-700">
        <thead className="bg-slate-50 uppercase tracking-wider text-xs text-slate-500">
          <tr>
            <th className="px-5 py-4">Product</th>
            <th className="px-5 py-4">Category</th>
            <th className="px-5 py-4">Gender</th>
            <th className="px-5 py-4">Price</th>
            <th className="px-5 py-4">Stock</th>
            <th className="px-5 py-4">Status</th>
            <th className="px-5 py-4">Featured</th>
            <th className="px-5 py-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {products.map((product, i) => (
            <tr
              key={product._id}
              className={`transition duration-150 ${
                i % 2 === 0 ? "bg-white" : "bg-slate-50"
              } hover:bg-slate-100`}
            >
              <td className="flex items-center gap-3 px-5 py-4 font-medium text-slate-900">
                {product.images && product.images.length > 0 ? (
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    width={40}
                    height={40}
                    className="rounded-lg object-cover"
                  />
                ) : (
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-slate-100">
                    <ImageIcon className="h-5 w-5 text-slate-400" />
                  </div>
                )}
                <div>
                  <div className="font-semibold">{product.name}</div>
                  <div className="text-xs text-slate-500">{product.brand}</div>
                </div>
              </td>
              <td className="px-5 py-4 text-sm text-slate-600">
                <div>{product.category}</div>
                <div className="text-xs text-slate-500">
                  {product.subCategory}
                </div>
              </td>
              <td className="px-5 py-4 text-sm capitalize text-slate-600">
                <Users className="mr-1 inline h-4 w-4 text-slate-400" />
                {product.gender}
              </td>
              <td className="flex items-center gap-1 px-5 py-4 text-sm font-semibold text-slate-900">
                <DollarSign className="h-4 w-4 text-emerald-600" />
                <span>${product.price.toLocaleString()}</span>
                {product.compareAtPrice && (
                  <span className="text-xs text-red-500 line-through">
                    ${product.compareAtPrice.toLocaleString()}
                  </span>
                )}
              </td>
              <td className="px-5 py-4 text-sm text-slate-600">
                <Package className="mr-1 inline h-4 w-4 text-slate-400" />
                {product.totalStock || 0}
              </td>
              <td className="px-5 py-4 text-sm">
                <StatusBadge status={product.status} />
              </td>
              <td className="px-5 py-4 text-sm">
                <FeaturedBadge isFeatured={product.isFeatured} />
              </td>
              <td className="flex items-center justify-end gap-2 px-5 py-4">
                <button
                  onClick={() => onEdit(product)}
                  className="rounded-lg border border-slate-200 bg-white p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="rounded-lg border border-slate-200 bg-white p-2 text-red-500 transition hover:bg-rose-50 hover:text-red-600"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const StatusBadge = ({ status }: { status: string }) => {
  const getStatusConfig = (status: string) => {
    const config = {
      published: {
        bg: "bg-emerald-100",
        text: "text-emerald-700",
        label: "Published",
      },
      draft: { bg: "bg-amber-100", text: "text-amber-700", label: "Draft" },
      out_of_stock: {
        bg: "bg-rose-100",
        text: "text-rose-700",
        label: "Out of Stock",
      },
      archived: {
        bg: "bg-slate-100",
        text: "text-slate-600",
        label: "Archived",
      },
    };
    return config[status as keyof typeof config] || config.draft;
  };

  const { bg, text, label } = getStatusConfig(status);

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-medium ${bg} ${text}`}
    >
      {label}
    </span>
  );
};

const FeaturedBadge = ({ isFeatured }: { isFeatured: boolean }) => {
  return isFeatured ? (
    <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-medium text-sky-700">
      Featured
    </span>
  ) : (
    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
      Normal
    </span>
  );
};

export default ProductTable;
