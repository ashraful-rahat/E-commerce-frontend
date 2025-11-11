import { Plus, Tag, X } from "lucide-react";
import { useState } from "react";
import TiptapEditor from "../../../components/TiptapEditor";
import { ProductFormData } from "../../types/product.types";

interface DescriptionSectionProps {
  formData: ProductFormData;
  updateField: (field: string, value: unknown) => void;
}

const DescriptionSection = ({
  formData,
  updateField,
}: DescriptionSectionProps) => {
  const [tagInput, setTagInput] = useState("");

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      updateField("tags", [...formData.tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    updateField(
      "tags",
      formData.tags.filter((tag) => tag !== tagToRemove)
    );
  };

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="border-b border-gray-200 pb-5">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900">
            <svg
              className="h-4 w-4 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
              />
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900">
              Product Description
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              Add detailed description and tags for better discoverability
            </p>
          </div>
        </div>
      </div>

      {/* Description Editor */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="block text-sm font-medium text-gray-900">
            Product Description *
          </label>
          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
            Rich text editor
          </span>
        </div>
        <div className="border border-gray-300 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
          <TiptapEditor
            value={formData.description}
            onChange={(value) => updateField("description", value)}
          />
        </div>
        <p className="text-xs text-gray-500">
          Provide detailed information about your product features and benefits
        </p>
      </div>

      {/* Tags Section */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-3">
            Product Tags
          </label>

          {/* Tag Input */}
          <div className="flex gap-3 mb-4">
            <div className="flex-1 relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Tag className="h-4 w-4 text-gray-400 group-focus-within:text-gray-600 transition-colors" />
              </div>
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={(e) =>
                  e.key === "Enter" && (e.preventDefault(), addTag())
                }
                className="w-full border border-gray-300 rounded-xl pl-10 pr-4 py-3.5 text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/20 focus:border-slate-900 transition-all duration-200"
                placeholder="Enter tag name and press Enter to add"
              />
            </div>
            <button
              type="button"
              onClick={addTag}
              disabled={!tagInput.trim()}
              className="px-6 py-3.5 bg-gray-900 text-white rounded-xl hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-2 shadow-sm hover:shadow-md"
            >
              <Plus className="w-4 h-4" />
              <span className="text-sm font-medium">Add</span>
            </button>
          </div>

          {/* Tags Counter */}
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-gray-600">
              {formData.tags.length}{" "}
              {formData.tags.length === 1 ? "tag" : "tags"} added
            </span>
            {formData.tags.length > 0 && (
              <button
                type="button"
                onClick={() => updateField("tags", [])}
                className="text-xs text-gray-500 hover:text-gray-700 transition-colors"
              >
                Clear all
              </button>
            )}
          </div>

          {/* Tags Container */}
          <div className="min-h-[60px] border border-gray-200 rounded-xl bg-gray-50/50 p-4">
            {formData.tags.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="group px-4 py-2.5 bg-white text-gray-800 rounded-lg text-sm font-medium flex items-center gap-2 border border-gray-300 shadow-sm hover:shadow-md transition-all duration-200 hover:border-gray-400"
                  >
                    <Tag className="w-3.5 h-3.5 text-gray-500" />
                    <span className="max-w-[120px] truncate" title={tag}>
                      {tag}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="p-0.5 rounded-full hover:bg-gray-200 transition-colors group-hover:bg-gray-200"
                    >
                      <X className="w-3.5 h-3.5 text-gray-500 hover:text-gray-700" />
                    </button>
                  </span>
                ))}
              </div>
            ) : (
              <div className="text-center py-4">
                <Tag className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                <p className="text-sm text-gray-500">No tags added yet</p>
                <p className="text-xs text-gray-400 mt-1">
                  Add tags to help customers find your product
                </p>
              </div>
            )}
          </div>

          {/* Help Text */}
          <p className="text-xs text-gray-500 mt-3">
            Tags improve product discoverability. Use relevant keywords
            separated by pressing Enter.
          </p>
        </div>
      </div>

      {/* Preview Section */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 rounded-xl p-5">
        <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
          Quick Preview
        </h4>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-600">Description:</span>
            <p className="font-medium text-gray-900 mt-1">
              {formData.description
                ? `${formData.description.substring(0, 50)}${
                    formData.description.length > 50 ? "..." : ""
                  }`
                : "Not provided"}
            </p>
          </div>
          <div>
            <span className="text-gray-600">Tags count:</span>
            <p className="font-medium text-gray-900">{formData.tags.length}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DescriptionSection;
