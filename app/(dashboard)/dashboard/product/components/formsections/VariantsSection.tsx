import { ProductFormData } from "../../types/product.types";

interface VariantsSectionProps {
  formData: ProductFormData;
  updateField: (field: string, value: unknown) => void;
}

const VariantsSection = ({ formData, updateField }: VariantsSectionProps) => {
  const addVariant = () => {
    const newVariants = [
      ...formData.variants,
      {
        color: "",
        sizes: [{ size: "", sku: "", stock: 0, price: 0, isAvailable: true }],
      },
    ];
    updateField("variants", newVariants);
  };

  const removeVariant = (index: number) => {
    const newVariants = formData.variants.filter((_, i) => i !== index);
    updateField("variants", newVariants);
  };

  const updateVariant = (index: number, field: string, value: unknown) => {
    const newVariants = [...formData.variants];
    newVariants[index] = { ...newVariants[index], [field]: value };
    updateField("variants", newVariants);
  };

  const addSize = (variantIndex: number) => {
    const newVariants = [...formData.variants];
    newVariants[variantIndex].sizes.push({
      size: "",
      sku: "",
      stock: 0,
      price: 0,
      isAvailable: true,
    });
    updateField("variants", newVariants);
  };

  const removeSize = (variantIndex: number, sizeIndex: number) => {
    const newVariants = [...formData.variants];
    newVariants[variantIndex].sizes = newVariants[variantIndex].sizes.filter(
      (_, i) => i !== sizeIndex
    );
    updateField("variants", newVariants);
  };

  const updateSize = (
    variantIndex: number,
    sizeIndex: number,
    field: string,
    value: unknown
  ) => {
    const newVariants = [...formData.variants];
    newVariants[variantIndex].sizes[sizeIndex] = {
      ...newVariants[variantIndex].sizes[sizeIndex],
      [field]: value,
    };
    updateField("variants", newVariants);
  };

  const generateSKU = (color: string, size: string) => {
    return `${formData.name
      .toLowerCase()
      .replace(/\s+/g, "-")}-${color.toLowerCase()}-${size}`;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Product Variants</h3>
        <button
          type="button"
          onClick={addVariant}
          className="px-4 py-2 bg-slate-900 text-white rounded-lg text-sm hover:bg-slate-800 transition shadow-sm font-medium"
        >
          + Add Variant
        </button>
      </div>

      {formData.variants.map((variant, variantIndex) => (
        <div key={variantIndex} className="border rounded-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <h4 className="font-medium">Variant {variantIndex + 1}</h4>
            {formData.variants.length > 1 && (
              <button
                type="button"
                onClick={() => removeVariant(variantIndex)}
                className="text-red-500 hover:text-red-700 text-sm"
              >
                Remove Variant
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-1">Color *</label>
              <input
                type="text"
                value={variant.color}
                onChange={(e) => {
                  updateVariant(variantIndex, "color", e.target.value);
                  // Auto-generate SKU for all sizes
                  variant.sizes.forEach((size, sizeIndex) => {
                    if (size.size) {
                      updateSize(
                        variantIndex,
                        sizeIndex,
                        "sku",
                        generateSKU(e.target.value, size.size)
                      );
                    }
                  });
                }}
                className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/20 focus:border-slate-900 transition"
                placeholder="e.g., Black, Red, Blue"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Variant SKU
              </label>
              <input
                type="text"
                value={variant.sku || ""}
                onChange={(e) =>
                  updateVariant(variantIndex, "sku", e.target.value)
                }
                className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/20 focus:border-slate-900 transition"
                placeholder="Auto-generated"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-3">
              <label className="block text-sm font-medium">Sizes</label>
              <button
                type="button"
                onClick={() => addSize(variantIndex)}
                className="px-3 py-1.5 bg-slate-900 text-white rounded-lg text-xs hover:bg-slate-800 transition font-medium"
              >
                + Add Size
              </button>
            </div>

            {variant.sizes.map((size, sizeIndex) => (
              <div
                key={sizeIndex}
                className="grid grid-cols-5 gap-2 mb-3 items-end"
              >
                <div>
                  <label className="block text-xs font-medium mb-1">Size</label>
                  <input
                    type="text"
                    value={size.size}
                    onChange={(e) => {
                      updateSize(
                        variantIndex,
                        sizeIndex,
                        "size",
                        e.target.value
                      );
                      if (variant.color) {
                        updateSize(
                          variantIndex,
                          sizeIndex,
                          "sku",
                          generateSKU(variant.color, e.target.value)
                        );
                      }
                    }}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/20 focus:border-slate-900 transition"
                    placeholder="S, M, L"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1">SKU</label>
                  <input
                    type="text"
                    value={size.sku}
                    onChange={(e) =>
                      updateSize(variantIndex, sizeIndex, "sku", e.target.value)
                    }
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/20 focus:border-slate-900 transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1">
                    Stock
                  </label>
                  <input
                    type="number"
                    value={size.stock}
                    onChange={(e) =>
                      updateSize(
                        variantIndex,
                        sizeIndex,
                        "stock",
                        Number(e.target.value)
                      )
                    }
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/20 focus:border-slate-900 transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1">
                    Price
                  </label>
                  <input
                    type="number"
                    value={size.price || ""}
                    onChange={(e) =>
                      updateSize(
                        variantIndex,
                        sizeIndex,
                        "price",
                        Number(e.target.value)
                      )
                    }
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/20 focus:border-slate-900 transition"
                  />
                </div>
                <div>
                  {variant.sizes.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeSize(variantIndex, sizeIndex)}
                      className="w-full py-1.5 bg-red-500 text-white rounded-lg text-xs hover:bg-red-600 transition font-medium"
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default VariantsSection;
