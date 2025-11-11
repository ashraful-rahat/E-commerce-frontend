import { ProductFormData } from "../../types/product.types";

interface PricingSectionProps {
  formData: ProductFormData;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updateField: (field: string, value: any) => void;
}

const PricingSection = ({ formData, updateField }: PricingSectionProps) => {
  const priceError =
    !formData.price || Number(formData.price) <= 0
      ? "Valid selling price is required"
      : "";

  const comparePriceError =
    formData.compareAtPrice &&
    Number(formData.compareAtPrice) < Number(formData.price)
      ? "Compare price must be greater than selling price"
      : "";

  const hasErrors = priceError || comparePriceError;

  const calculateDiscount = () => {
    if (formData.compareAtPrice && formData.price) {
      const compare = Number(formData.compareAtPrice);
      const selling = Number(formData.price);
      if (compare > selling) {
        return Math.round(((compare - selling) / compare) * 100);
      }
    }
    return 0;
  };

  const discount = calculateDiscount();

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
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
              />
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900">
              Pricing Information
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              Set your product pricing and profit margins
            </p>
          </div>
        </div>
      </div>

      {/* Pricing Inputs Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Selling Price */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-900">
            Selling Price *
          </label>
          <div className="relative group">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500 transition-colors group-focus-within:text-gray-700">
              ৳
            </span>
            <input
              type="number"
              value={formData.price}
              onChange={(e) => updateField("price", Number(e.target.value))}
              className={`w-full border rounded-lg pl-8 pr-4 py-3 text-slate-900 bg-white focus:outline-none focus:ring-2 transition-all duration-200 ${
                priceError
                  ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                  : "border-gray-300 focus:border-slate-900 focus:ring-slate-100"
              }`}
              placeholder="0.00"
              min="0"
              step="0.01"
            />
          </div>
          {priceError && (
            <p className="text-red-600 text-sm font-medium flex items-center gap-1 mt-1">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              {priceError}
            </p>
          )}
        </div>

        {/* Compare Price */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-900">
            Compare Price
          </label>
          <div className="relative group">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500 transition-colors group-focus-within:text-gray-700">
              ৳
            </span>
            <input
              type="number"
              value={formData.compareAtPrice}
              onChange={(e) =>
                updateField("compareAtPrice", Number(e.target.value))
              }
              className={`w-full border rounded-lg pl-8 pr-4 py-3 text-slate-900 bg-white focus:outline-none focus:ring-2 transition-all duration-200 ${
                comparePriceError
                  ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                  : "border-gray-300 focus:border-slate-900 focus:ring-slate-100"
              }`}
              placeholder="0.00"
              min="0"
              step="0.01"
            />
          </div>
          {comparePriceError ? (
            <p className="text-red-600 text-sm font-medium flex items-center gap-1 mt-1">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              {comparePriceError}
            </p>
          ) : (
            <p className="text-xs text-gray-500 mt-1">
              Original price for discount display
            </p>
          )}
        </div>

        {/* Cost Price */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-900">
            Cost Price
          </label>
          <div className="relative group">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500 transition-colors group-focus-within:text-gray-700">
              ৳
            </span>
            <input
              type="number"
              value={formData.costPrice}
              onChange={(e) => updateField("costPrice", Number(e.target.value))}
              className="w-full border border-gray-300 rounded-lg pl-8 pr-4 py-3 text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-slate-100 focus:border-slate-900 transition-all duration-200"
              placeholder="0.00"
              min="0"
              step="0.01"
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Your cost for profit calculation
          </p>
        </div>
      </div>

      {/* Information Cards */}
      <div className="space-y-4">
        {/* Discount Card */}
        {discount > 0 && (
          <div className="bg-linear-to-r from-gray-50 to-gray-100 border border-gray-200 rounded-xl p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-semibold text-gray-900">
                  {discount}% Discount Applied
                </p>
                <p className="text-xs text-gray-600">
                  Customers will see this discount on your product
                </p>
              </div>
              <div className="bg-white border border-gray-300 px-4 py-2 rounded-lg shadow-sm">
                <span className="text-sm font-bold text-gray-900">
                  SAVE {discount}%
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Profit Calculation */}
        {formData.price &&
          formData.costPrice &&
          Number(formData.costPrice) > 0 && (
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 rounded-xl p-5 shadow-sm">
              <h4 className="text-sm font-semibold text-gray-900 mb-3">
                Profit Analysis
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      Profit per item:
                    </span>
                    <span className="text-lg font-bold text-gray-900">
                      ৳
                      {(
                        Number(formData.price) - Number(formData.costPrice)
                      ).toFixed(2)}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gray-600 h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${Math.min(
                          100,
                          ((Number(formData.price) -
                            Number(formData.costPrice)) /
                            Number(formData.price)) *
                            100
                        )}%`,
                      }}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      Profit margin:
                    </span>
                    <span className="text-lg font-bold text-gray-900">
                      {(
                        ((Number(formData.price) - Number(formData.costPrice)) /
                          Number(formData.price)) *
                        100
                      ).toFixed(1)}
                      %
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gray-800 h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${Math.min(
                          100,
                          ((Number(formData.price) -
                            Number(formData.costPrice)) /
                            Number(formData.price)) *
                            100
                        )}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
      </div>

      {/* Validation Messages */}
      <div className="space-y-4">
        {/* Error Summary */}
        {hasErrors && (
          <div className="border-l-4 border-red-500 bg-red-50 p-4 rounded-r-lg">
            <div className="flex items-start gap-3">
              <svg
                className="h-5 w-5 text-red-500 mt-0.5 shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-red-800 mb-1">
                  Pricing errors need attention
                </h4>
                <ul className="text-sm text-red-700 space-y-1">
                  {priceError && (
                    <li className="flex items-center gap-2">• {priceError}</li>
                  )}
                  {comparePriceError && (
                    <li className="flex items-center gap-2">
                      • {comparePriceError}
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Success Message */}
        {!hasErrors && formData.price && (
          <div className="border-l-4 border-green-500 bg-green-50 p-4 rounded-r-lg">
            <div className="flex items-start gap-3">
              <svg
                className="h-5 w-5 text-green-500 mt-0.5 shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <div>
                <h4 className="text-sm font-semibold text-green-800 mb-1">
                  Pricing information verified
                </h4>
                <p className="text-sm text-green-700">
                  All pricing details are correctly configured. You can proceed
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

export default PricingSection;
