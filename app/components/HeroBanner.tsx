"use client";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, Play } from "lucide-react";
import { useEffect, useState } from "react";

const HeroBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: "Elevate Your Style",
      subtitle: "New Collection",
      description:
        "Discover perfect blend of comfort and sophistication for modern lifestyle.",
      cta: "Explore Now",
      image: "/images/banner2.jpg",
      overlay: "bg-black/50",
    },
    {
      id: 2,
      title: "Summer Essentials",
      subtitle: "Fresh & Vibrant",
      description:
        "Lightweight fabrics and timeless designs for your summer wardrobe.",
      cta: "Shop Summer",
      image: "/images/banner.jpg",
      overlay: "bg-blue-900/40",
    },
    {
      id: 3,
      title: "Minimalist Elegance",
      subtitle: "Timeless Designs",
      description:
        "Clean lines, premium materials, and versatile pieces that last.",
      cta: "Discover More",
      image: "/images/banner1.jpg",
      overlay: "bg-gray-900/50",
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-[80vh] min-h-[600px] overflow-hidden">
      {/* Slides */}
      <div className="relative h-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            {/* Background Image with Overlay */}
            <div
              className={`absolute inset-0 ${slides[currentSlide].overlay} z-10`}
            />
            <img
              src={slides[currentSlide].image}
              alt={slides[currentSlide].title}
              className="w-full h-full object-cover"
            />

            {/* Content Container with Better Contrast */}
            <div className="relative z-20 h-full flex items-center justify-center">
              <div className="max-w-4xl mx-auto px-6 w-full text-center">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="bg-black/40 backdrop-blur-sm rounded-2xl p-8 border border-white/20"
                >
                  {/* Title */}
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-snug">
                    {slides[currentSlide].title}
                  </h1>

                  {/* Subtitle */}
                  <p className="text-xl text-white/95 font-medium mb-4">
                    {slides[currentSlide].subtitle}
                  </p>

                  {/* Description */}
                  <p className="text-lg text-white/85 mb-8 max-w-2xl mx-auto leading-relaxed">
                    {slides[currentSlide].description}
                  </p>

                  {/* CTA Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button className="group bg-white text-gray-900 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold text-base transition-all duration-300 hover:scale-105 flex items-center gap-2 justify-center">
                      {slides[currentSlide].cta}
                      <ArrowRight
                        size={18}
                        className="group-hover:translate-x-1 transition-transform duration-300"
                      />
                    </button>
                    <button className="group border-2 border-white text-white hover:bg-white/10 px-6 py-3 rounded-lg font-semibold text-base transition-all duration-300 hover:scale-105 flex items-center gap-2 justify-center">
                      <Play size={18} />
                      Watch Story
                    </button>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-30 bg-black/50 hover:bg-black/70 text-white w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30 transition-all duration-300 hover:scale-110"
        >
          <ChevronLeft size={20} />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-30 bg-black/50 hover:bg-black/70 text-white w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30 transition-all duration-300 hover:scale-110"
        >
          <ChevronRight size={20} />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-30 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "bg-white w-6"
                  : "bg-white/60 hover:bg-white/80"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
