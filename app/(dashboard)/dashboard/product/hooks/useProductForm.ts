import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

import axiosInstance from "@/app/axios";
import { Product, ProductFormData } from "../types/product.types";

const initialFormData: ProductFormData = {
  name: "",
  slug: "",
  gender: "men",
  category: "",
  subCategory: "",
  tags: [],
  brand: "",
  fabric: "",
  description: "",
  price: "",
  compareAtPrice: "",
  costPrice: "",
  trackInventory: true,
  status: "draft",
  isFeatured: false,
  isFlashSale: false,
  isCombo: false,
  images: [],
  imagePreviews: [],
  variants: [
    {
      color: "",
      sizes: [{ size: "", sku: "", stock: 0, price: 0, isAvailable: true }],
    },
  ],
  seo: { title: "", description: "", keywords: [] },
};

export const useProductForm = (
  product: Product | null,
  onSuccess: () => void
) => {
  const [formData, setFormData] = useState<ProductFormData>(initialFormData);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        slug: product.slug,
        gender: product.gender,
        category: product.category,
        subCategory: product.subCategory,
        tags: product.tags,
        brand: product.brand || "",
        fabric: product.fabric || "",
        description: product.description,
        price: product.price,
        compareAtPrice: product.compareAtPrice || "",
        costPrice: product.costPrice || "",
        trackInventory: product.trackInventory,
        status: product.status,
        isFeatured: product.isFeatured,
        isFlashSale: product.isFlashSale,
        isCombo: product.isCombo,
        images: [],
        imagePreviews: product.images || [],
        variants: product.variants,
        seo: product.seo || { title: "", description: "", keywords: [] },
      });
    }
  }, [product]);

  const updateField = (field: string, value: unknown) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Step-by-step validation
  const validateStep = (step: string): string | null => {
    switch (step) {
      case "basic":
        if (!formData.name?.trim()) return "Product name is required";
        if (!formData.slug?.trim()) return "Product slug is required";
        if (!formData.category?.trim()) return "Category is required";
        return null;

      case "pricing":
        if (!formData.price || Number(formData.price) <= 0)
          return "Valid selling price is required";
        if (
          formData.compareAtPrice &&
          Number(formData.compareAtPrice) < Number(formData.price)
        )
          return "Compare price must be greater than selling price";
        return null;

      case "variants":
        if (!formData.variants || formData.variants.length === 0)
          return "At least one color variant is required";

        for (const variant of formData.variants) {
          if (!variant.color?.trim())
            return "Color name is required for all variants";

          if (!variant.sizes || variant.sizes.length === 0)
            return "At least one size is required for each color";

          for (const size of variant.sizes) {
            if (!size.size?.trim())
              return "Size is required for all size options";
            if (!size.sku?.trim()) return "SKU is required for all sizes";
            if (size.stock < 0) return "Stock cannot be negative";
          }
        }
        return null;

      case "media":
        // Media is optional for draft products
        if (
          formData.status === "published" &&
          formData.images.length === 0 &&
          formData.imagePreviews.length === 0
        )
          return "At least one image is required for published products";
        return null;

      default:
        return null;
    }
  };

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  };

  const handleSubmit = async () => {
    // Final validation before submit
    const steps = ["basic", "pricing", "variants"];
    for (const step of steps) {
      const error = validateStep(step);
      if (error) {
        toast.error(`Please fix errors in ${step} section: ${error}`);
        return;
      }
    }

    if (
      !formData.name ||
      !formData.slug ||
      !formData.price ||
      formData.variants.length === 0
    ) {
      return toast.error("Please fill all required fields");
    }

    const submitData = new FormData();

    // Append basic fields
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "images") {
        formData.images.forEach((file: File) =>
          submitData.append("images", file)
        );
      } else if (key === "tags") {
        formData.tags.forEach((tag: string) => submitData.append("tags", tag));
      } else if (key === "variants" || key === "seo") {
        submitData.append(key, JSON.stringify(value));
      } else if (value !== "" && value !== null && value !== undefined) {
        submitData.append(key, value.toString());
      }
    });

    try {
      setLoading(true);
      if (product) {
        await axiosInstance.patch(`/products/${product._id}`, submitData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Product updated successfully");
      } else {
        await axiosInstance.post("/products", submitData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Product created successfully");
      }
      onSuccess();
    } catch (err: unknown) {
      console.error(err);
      const errorMessage =
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (err as any)?.response?.data?.message ||
        (err instanceof Error ? err.message : "Operation failed");
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    updateField,
    handleSubmit,
    loading,
    generateSlug,
    validateStep,
  };
};
