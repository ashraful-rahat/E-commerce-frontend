import { ProductFormData } from "../../types/product.types";

interface SettingsSectionProps {
  formData: ProductFormData;
  updateField: (field: string, value: unknown) => void;
}

const SettingsSection = ({ formData, updateField }: SettingsSectionProps) => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Product Settings</h3>

      <div className="grid grid-cols-2 gap-8">
        {/* Left Column - Basic Settings */}
        <div className="space-y-6">
          <div>
            <h4 className="font-medium mb-3">Product Status</h4>
            <select
              value={formData.status}
              onChange={(e) => updateField("status", e.target.value)}
              className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/20 focus:border-slate-900 transition"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="out_of_stock">Out of Stock</option>
              <option value="archived">Archived</option>
            </select>
          </div>

          <div className="space-y-3">
            <h4 className="font-medium">Product Features</h4>
            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.trackInventory}
                  onChange={(e) =>
                    updateField("trackInventory", e.target.checked)
                  }
                  className="rounded"
                />
                <span className="text-sm">Track Inventory</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.isFeatured}
                  onChange={(e) => updateField("isFeatured", e.target.checked)}
                  className="rounded"
                />
                <span className="text-sm">Featured Product</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.isFlashSale}
                  onChange={(e) => updateField("isFlashSale", e.target.checked)}
                  className="rounded"
                />
                <span className="text-sm">Flash Sale</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.isCombo}
                  onChange={(e) => updateField("isCombo", e.target.checked)}
                  className="rounded"
                />
                <span className="text-sm">Combo Product</span>
              </label>
            </div>
          </div>
        </div>

        {/* Right Column - SEO Settings */}
        <div className="space-y-6">
          <div>
            <h4 className="font-medium mb-3">SEO Settings</h4>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium mb-1">
                  SEO Title
                </label>
                <input
                  type="text"
                  value={formData.seo.title || ""}
                  onChange={(e) =>
                    updateField("seo", {
                      ...formData.seo,
                      title: e.target.value,
                    })
                  }
                  className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/20 focus:border-slate-900 transition"
                  placeholder="SEO title for search engines"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  SEO Description
                </label>
                <textarea
                  value={formData.seo.description || ""}
                  onChange={(e) =>
                    updateField("seo", {
                      ...formData.seo,
                      description: e.target.value,
                    })
                  }
                  rows={3}
                  className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/20 focus:border-slate-900 transition"
                  placeholder="SEO description for search engines"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  SEO Keywords
                </label>
                <input
                  type="text"
                  value={formData.seo.keywords?.join(", ") || ""}
                  onChange={(e) =>
                    updateField("seo", {
                      ...formData.seo,
                      keywords: e.target.value.split(",").map((k) => k.trim()),
                    })
                  }
                  className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/20 focus:border-slate-900 transition"
                  placeholder="keyword1, keyword2, keyword3"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsSection;
