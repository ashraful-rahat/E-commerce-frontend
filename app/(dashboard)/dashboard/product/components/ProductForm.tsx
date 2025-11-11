"use client";

import { X } from "lucide-react";
import { useState } from "react";
import { toast } from "react-hot-toast";

import { useProductForm } from "../hooks/useProductForm";
import { Product } from "../types/product.types";
import BasicInfoSection from "./formsections/BasicInfoSection";
import DescriptionSection from "./formsections/DescriptionSection";
import MediaSection from "./formsections/MediaSection";
import PricingSection from "./formsections/PricingSection";
import SettingsSection from "./formsections/SettingsSection";
import VariantsSection from "./formsections/VariantsSection";

interface ProductFormProps {
  product?: Product | null;
  onClose: () => void;
  onSuccess: () => void;
}

const ProductForm = ({ product, onClose, onSuccess }: ProductFormProps) => {
  const { formData, updateField, handleSubmit, loading, validateStep } =
    useProductForm(product ?? null, onSuccess);

  const [activeSection, setActiveSection] = useState("basic");

  const sections = [
    { id: "basic", label: "Basic Info", required: true },
    { id: "pricing", label: "Pricing", required: true },
    { id: "description", label: "Description", required: false },
    { id: "variants", label: "Variants", required: true },
    { id: "media", label: "Media", required: false },
    { id: "settings", label: "Settings", required: false },
  ];

  const handleNext = () => {
    const currentIndex = sections.findIndex((s) => s.id === activeSection);
    if (currentIndex < sections.length - 1) {
      // Validate current step before moving next
      const validationError = validateStep(activeSection);
      if (validationError) {
        toast.error(validationError);
        return;
      }
      setActiveSection(sections[currentIndex + 1].id);
    }
  };

  const handlePrevious = () => {
    const currentIndex = sections.findIndex((s) => s.id === activeSection);
    if (currentIndex > 0) {
      setActiveSection(sections[currentIndex - 1].id);
    }
  };

  const handleSectionClick = (sectionId: string) => {
    const currentIndex = sections.findIndex((s) => s.id === activeSection);
    const targetIndex = sections.findIndex((s) => s.id === sectionId);

    // Only allow going to previous sections or validated next sections
    if (targetIndex <= currentIndex) {
      setActiveSection(sectionId);
    } else {
      // Validate all previous steps before allowing to jump
      for (let i = 0; i < targetIndex; i++) {
        const validationError = validateStep(sections[i].id);
        if (validationError) {
          toast.error(`Please complete "${sections[i].label}" section first`);
          return;
        }
      }
      setActiveSection(sectionId);
    }
  };

  const renderSection = () => {
    switch (activeSection) {
      case "basic":
        return (
          <BasicInfoSection formData={formData} updateField={updateField} />
        );
      case "pricing":
        return <PricingSection formData={formData} updateField={updateField} />;
      case "description":
        return (
          <DescriptionSection formData={formData} updateField={updateField} />
        );
      case "variants":
        return (
          <VariantsSection formData={formData} updateField={updateField} />
        );
      case "media":
        return <MediaSection formData={formData} updateField={updateField} />;
      case "settings":
        return (
          <SettingsSection formData={formData} updateField={updateField} />
        );
      default:
        return (
          <BasicInfoSection formData={formData} updateField={updateField} />
        );
    }
  };

  const currentSectionIndex = sections.findIndex((s) => s.id === activeSection);
  const isFirstSection = currentSectionIndex === 0;
  const isLastSection = currentSectionIndex === sections.length - 1;

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="fixed inset-0 bg-black/40" onClick={onClose} />
      <div className="relative w-full max-w-5xl bg-white shadow-2xl p-6 ml-auto flex flex-col h-screen overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold">
              {product ? "Edit Product" : "Add New Product"}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Step {currentSectionIndex + 1} of {sections.length}:{" "}
              {sections[currentSectionIndex].label}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between mb-2">
            {sections.map((section, index) => (
              <div
                key={section.id}
                className="flex flex-col items-center flex-1"
              >
                <button
                  onClick={() => handleSectionClick(section.id)}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium mb-1 transition ${
                    index <= currentSectionIndex
                      ? "bg-white text-white shadow-md"
                      : "bg-slate-200 text-slate-600"
                  } ${
                    index < currentSectionIndex
                      ? "cursor-pointer hover:bg-slate-800"
                      : "cursor-default"
                  }`}
                >
                  {index + 1}
                </button>
                <span
                  className={`text-xs text-center ${
                    index <= currentSectionIndex
                      ? "text-slate-900 font-semibold"
                      : "text-slate-500"
                  }`}
                >
                  {section.label}
                </span>
              </div>
            ))}
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2">
            <div
              className="bg-slate-900 h-2 rounded-full transition-all duration-300"
              style={{
                width: `${
                  ((currentSectionIndex + 1) / sections.length) * 100
                }%`,
              }}
            ></div>
          </div>
        </div>

        {/* Form Content */}
        <div className="flex-1 overflow-y-auto pb-6 border border-slate-200 rounded-xl p-6 bg-white">
          {renderSection()}
        </div>

        {/* Footer Buttons */}
        <div className="flex justify-between items-center pt-4 border-t">
          <div className="text-sm text-gray-500">
            {sections[currentSectionIndex].required
              ? "* Required section"
              : "Optional section"}
          </div>
          <div className="flex space-x-3">
            {!isFirstSection && (
              <button
                onClick={handlePrevious}
                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Previous
              </button>
            )}

            {!isLastSection ? (
              <button
                onClick={handleNext}
                className="px-6 py-2.5 bg-white text-white rounded-lg hover:bg-gray transition-colors font-medium shadow-sm"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="px-6 py-2.5 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium shadow-sm"
              >
                {loading
                  ? "Saving..."
                  : product
                  ? "Update Product"
                  : "Create Product"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;
