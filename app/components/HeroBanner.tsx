"use client";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, Play } from "lucide-react";
import { useEffect, useState } from "react";

const HeroBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: "Elevate Your Everyday Style",
      subtitle: "New Season Collection",
      description:
        "Discover the perfect blend of comfort and sophistication. Our latest collection is designed for the modern individual who values both style and substance.",
      cta: "Explore Collection",
      image:
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=800&fit=crop",
      overlay: "bg-gradient-to-r from-black/60 to-transparent",
      badge: "Just Launched",
    },
    {
      id: 2,
      title: "Summer Essentials 2024",
      subtitle: "Fresh & Vibrant",
      description:
        "Embrace the warmth with our curated summer collection. Lightweight fabrics, vibrant colors, and timeless designs for your perfect summer wardrobe.",
      cta: "Shop Summer",
      image:
        "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=1200&h=800&fit=crop",
      overlay: "bg-gradient-to-r from-blue-900/50 to-transparent",
      badge: "Trending",
    },
    {
      id: 3,
      title: "Minimalist Elegance",
      subtitle: "Timeless Designs",
      description:
        "Where simplicity meets sophistication. Our minimalist collection focuses on clean lines, premium materials, and versatile pieces that last.",
      cta: "Discover More",
      image:
        "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1200&h=800&fit=crop",
      overlay: "bg-gradient-to-r from-gray-900/60 to-transparent",
      badge: "Editor's Pick",
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
    <section className="relative h-screen min-h-[800px] overflow-hidden">
      {/* Slides */}
      <div className="relative h-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
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

            {/* Content */}
            <div className="relative z-20 h-full flex items-center">
              <div className="max-w-7xl mx-auto px-4 w-full">
                <div className="max-w-2xl">
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                  >
                    {/* Badge */}
                    <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/30 mb-6">
                      <span className="text-white text-sm font-semibold">
                        {slides[currentSlide].badge}
                      </span>
                    </div>

                    {/* Title */}
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight">
                      {slides[currentSlide].title}
                    </h1>

                    {/* Subtitle */}
                    <p className="text-xl md:text-2xl text-white/90 font-light mb-6">
                      {slides[currentSlide].subtitle}
                    </p>

                    {/* Description */}
                    <p className="text-lg text-white/80 mb-8 max-w-lg leading-relaxed">
                      {slides[currentSlide].description}
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4">
                      <button className="group bg-white text-gray-900 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105 flex items-center gap-3">
                        {slides[currentSlide].cta}
                        <ArrowRight
                          size={20}
                          className="group-hover:translate-x-1 transition-transform duration-300"
                        />
                      </button>
                      <button className="group border-2 border-white text-white hover:bg-white/10 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105 flex items-center gap-3 backdrop-blur-sm">
                        <Play size={20} />
                        Watch Story
                      </button>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-30 bg-white/10 hover:bg-white/20 text-white w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20 transition-all duration-300 hover:scale-110"
        >
          <ChevronLeft size={24} />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-30 bg-white/10 hover:bg-white/20 text-white w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20 transition-all duration-300 hover:scale-110"
        >
          <ChevronRight size={24} />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "bg-white w-8"
                  : "bg-white/50 hover:bg-white/80"
              }`}
            />
          ))}
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 right-8 z-30">
          <div className="flex flex-col items-center gap-2">
            <span className="text-white/70 text-sm font-light">Scroll</span>
            <div className="w-px h-12 bg-white/30">
              <div className="w-px h-6 bg-white animate-bounce" />
            </div>
          </div>
        </div>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 bg-linear-to-b from-transparent to-black/20 z-0" />
    </section>
  );
};

export default HeroBanner;
