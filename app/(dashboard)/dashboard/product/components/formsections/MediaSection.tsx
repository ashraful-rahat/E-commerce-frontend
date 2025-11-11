import Image from "next/image";
import { ProductFormData } from "../../types/product.types";

interface MediaSectionProps {
  formData: ProductFormData;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updateField: (field: string, value: any) => void;
}

const MediaSection = ({ formData, updateField }: MediaSectionProps) => {
  const handleImageChange = (files: FileList | null) => {
    if (!files) return;
    const newFiles = Array.from(files);
    const updatedImages = [...formData.images, ...newFiles];
    updateField("images", updatedImages);

    const newPreviews = newFiles.map((f) => URL.createObjectURL(f));
    const updatedPreviews = [...formData.imagePreviews, ...newPreviews];
    updateField("imagePreviews", updatedPreviews);
  };

  const removeImage = (index: number) => {
    const updatedImages = formData.images.filter((_, idx) => idx !== index);
    const updatedPreviews = formData.imagePreviews.filter(
      (_, idx) => idx !== index
    );
    updateField("images", updatedImages);
    updateField("imagePreviews", updatedPreviews);
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Product Media</h3>

      <div>
        <label className="block text-sm font-medium mb-1">
          Product Images *
        </label>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => handleImageChange(e.target.files)}
          className="w-full text-sm border-2 border-dashed border-slate-300 rounded-lg px-4 py-3 text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/20 focus:border-slate-900 transition cursor-pointer hover:border-slate-400"
        />
        <p className="text-xs text-gray-500 mt-1">
          Upload product images. First image will be used as main image.
        </p>
      </div>

      {formData.imagePreviews.length > 0 && (
        <div>
          <label className="block text-sm font-medium mb-2">
            Image Previews
          </label>
          <div className="grid grid-cols-4 gap-3">
            {formData.imagePreviews.map((src, i) => (
              <div key={i} className="relative aspect-square group">
                <Image
                  src={src}
                  alt={`Preview ${i + 1}`}
                  fill
                  className="object-cover rounded-lg border"
                />
                <button
                  type="button"
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => removeImage(i)}
                >
                  ×
                </button>
                {i === 0 && (
                  <span className="absolute top-1 left-1 bg-blue-500 text-white text-xs px-2 py-1 rounded">
                    Main
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MediaSection;
