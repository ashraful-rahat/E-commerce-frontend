import { ProductFormData } from "../../types/product.types";

interface BasicInfoSectionProps {
  formData: ProductFormData;
  updateField: (field: string, value: unknown) => void;
}

const BasicInfoSection = ({ formData, updateField }: BasicInfoSectionProps) => {
  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  };

  const fields = [
    {
      name: "name",
      label: "Product Name",
      value: formData.name,
      placeholder: "Enter product name",
      required: true,
      error: !formData.name?.trim() ? "Product name is required" : "",
      icon: (
        <svg
          className="w-5 h-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      ),
    },
    {
      name: "slug",
      label: "Slug",
      value: formData.slug,
      placeholder: "product-slug",
      required: true,
      error: !formData.slug?.trim() ? "Slug is required" : "",
      icon: (
        <svg
          className="w-5 h-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
          />
        </svg>
      ),
    },
    {
      name: "category",
      label: "Category",
      value: formData.category,
      placeholder: "e.g., Clothing, Electronics",
      required: true,
      error: !formData.category?.trim() ? "Category is required" : "",
      icon: (
        <svg
          className="w-5 h-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
          />
        </svg>
      ),
    },
  ];

  const hasErrors = fields.some((field) => field.error);

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-linear-to-br from-blue-500 to-purple-600 rounded-xl mb-2">
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-gray-900">Basic Information</h3>
        <p className="text-sm text-gray-600 max-w-md mx-auto leading-relaxed">
          Let&lsquo;s start with the essential details. Fill in the basic
          information about your product to get started.
        </p>
      </div>

      {/* Form Fields */}
      <div className="space-y-6">
        {/* Required Fields */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-6">
          <div className="flex items-center space-x-2">
            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
            <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
              Required Fields
            </h4>
          </div>

          <div className="space-y-5">
            {fields.map((field) => (
              <div key={field.name} className="space-y-2">
                <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                  <span>{field.label}</span>
                  {field.required && <span className="text-red-500">*</span>}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    {field.icon}
                  </div>
                  <input
                    type="text"
                    value={field.value}
                    onChange={(e) => {
                      const value = e.target.value;
                      updateField(field.name, value);

                      if (
                        field.name === "name" &&
                        (!formData.slug ||
                          formData.slug === generateSlug(formData.name))
                      ) {
                        updateField("slug", generateSlug(value));
                      }
                    }}
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border focus:ring-2 focus:ring-offset-1 transition-all duration-200 ${
                      field.error
                        ? "border-red-300 focus:border-red-500 focus:ring-red-100 bg-red-50"
                        : "border-gray-300 focus:border-blue-500 focus:ring-blue-100 hover:border-gray-400"
                    }`}
                    placeholder={field.placeholder}
                  />
                </div>
                {field.error && (
                  <div className="flex items-center space-x-1 text-red-600 text-sm">
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>{field.error}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Additional Details */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-6">
          <div className="flex items-center space-x-2">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
            <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
              Additional Details
            </h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                <span>Gender</span>
              </label>
              <select
                value={formData.gender}
                onChange={(e) => updateField("gender", e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200 hover:border-gray-400"
              >
                <option value="men">Men</option>
                <option value="women">Women</option>
                <option value="kids">Kids</option>
                <option value="unisex">Unisex</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
                <span>Sub Category</span>
              </label>
              <input
                type="text"
                value={formData.subCategory}
                onChange={(e) => updateField("subCategory", e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200 hover:border-gray-400"
                placeholder="e.g., T-Shirts, Shoes"
              />
            </div>

            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
                <span>Brand</span>
              </label>
              <input
                type="text"
                value={formData.brand}
                onChange={(e) => updateField("brand", e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200 hover:border-gray-400"
                placeholder="Brand name"
              />
            </div>

            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                  />
                </svg>
                <span>Fabric/Material</span>
              </label>
              <input
                type="text"
                value={formData.fabric}
                onChange={(e) => updateField("fabric", e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200 hover:border-gray-400"
                placeholder="e.g., Cotton, Polyester"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Validation Messages */}
      <div className="space-y-4">
        {hasErrors && (
          <div className="bg-linear-to-r from-red-50 to-orange-50 border border-red-200 rounded-2xl p-6 animate-pulse">
            <div className="flex items-start space-x-3">
              <div className="shrink-0 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center mt-0.5">
                <svg
                  className="w-3 h-3 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-red-800 mb-2">
                  Action Required
                </h3>
                <p className="text-sm text-red-700 mb-3">
                  Please fix the following errors to continue:
                </p>
                <ul className="space-y-1.5">
                  {fields.map(
                    (field) =>
                      field.error && (
                        <li
                          key={field.name}
                          className="flex items-center space-x-2 text-sm text-red-600"
                        >
                          <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                          <span>{field.error}</span>
                        </li>
                      )
                  )}
                </ul>
              </div>
            </div>
          </div>
        )}

        {!hasErrors && (
          <div className="bg-linear-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6">
            <div className="flex items-start space-x-3">
              <div className="shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-0.5">
                <svg
                  className="w-3 h-3 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-green-800 mb-1">
                  All Set!
                </h3>
                <p className="text-sm text-green-700">
                  All basic information looks perfect! You&apos;re ready to move
                  to the next step.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BasicInfoSection;
