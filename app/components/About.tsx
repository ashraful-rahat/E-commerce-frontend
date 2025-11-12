"use client";

import { motion, Variants } from "framer-motion";
import { Heart, ShoppingBag, Star } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function FashionBrand() {
  const [activeTab, setActiveTab] = useState("new");

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const slideVariants: Variants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 1, ease: "easeOut" },
    },
  };

  const products = [
    {
      id: 1,
      name: "Premium Cotton T-Shirt",
      price: "$45.00",
      category: "new",
      image: "/images/banner.jpg",
      rating: 4.8,
    },
    {
      id: 2,
      name: "Designer Denim Jacket",
      price: "$129.00",
      category: "bestsellers",
      image: "/images/banner.jpg",
      rating: 4.9,
    },
    {
      id: 3,
      name: "Silk Evening Dress",
      price: "$189.00",
      category: "new",
      image: "/images/banner.jpg",
      rating: 4.7,
    },
    {
      id: 4,
      name: "Classic Wool Sweater",
      price: "$89.00",
      category: "bestsellers",
      image: "/images/banner.jpg",
      rating: 4.6,
    },
    {
      id: 5,
      name: "Linen Summer Shirt",
      price: "$65.00",
      category: "new",
      image: "/images/banner.jpg",
      rating: 4.5,
    },
  ];

  return (
    <div className="bg-white text-gray-900">
      {/* Hero Section - Balanced Size */}
      <section className="min-h-screen flex items-center justify-center px-6 md:px-12 lg:px-20 py-16 md:py-0">
        <div className="w-full max-w-7xl flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16">
          {/* Left Content - Slightly Larger */}
          <motion.div
            className="flex-1 max-w-xl"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="mb-8">
              <p className="text-sm md:text-base tracking-widest text-gray-600 uppercase mb-4">
                New Collection 2024
              </p>
              <h1 className="text-4xl md:text-7xl lg:text-8xl leading-tight font-light">
                <span className="block">Elevate Your</span>
                <span className="block">Everyday Style</span>
              </h1>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-base md:text-lg text-gray-600 leading-relaxed mb-8 max-w-lg"
            >
              Discover our curated collection of premium clothing designed for
              the modern individual who values quality and style.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4"
            >
              <button className="  text-white px-8 py-4 font-medium tracking-wider uppercase text-sm hover:text-white transition-all duration-300 flex items-center gap-2 justify-center border ">
                <ShoppingBag size={18} />
                Shop Collection
              </button>
              <button className="  text-white px-8 py-4 font-medium tracking-wider uppercase text-sm hover:text-white transition-all duration-300 flex items-center gap-2 justify-center border ">
                <ShoppingBag size={18} />
                View Lookbook
              </button>
            </motion.div>
          </motion.div>

          {/* Right Images - Balanced Size */}
          <motion.div
            className="flex-1 w-full max-w-md lg:max-w-xl"
            variants={slideVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="grid grid-cols-2 gap-5">
              <motion.div
                className="relative h-72 md:h-80 lg:h-96 rounded-lg overflow-hidden col-span-2"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src="/images/banner.jpg"
                  alt="Modern fashion collection"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded">
                  <p className="text-sm font-medium">New Arrivals</p>
                </div>
              </motion.div>

              <motion.div
                className="relative h-40 md:h-44 lg:h-48 rounded-lg overflow-hidden"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src="/images/banner2.jpg"
                  alt="Premium fabrics"
                  fill
                  className="object-cover"
                />
              </motion.div>

              <motion.div
                className="relative h-40 md:h-44 lg:h-48 rounded-lg overflow-hidden"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src="/images/banner1.jpg"
                  alt="Fashion style"
                  fill
                  className="object-cover"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Products Section - Balanced Size */}
      <section className="px-6 md:px-12 lg:px-20 py-20 lg:py-24 bg-white">
        <motion.div
          className="max-w-7xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-6">
            <motion.h2
              variants={itemVariants}
              className="text-3xl md:text-4xl lg:text-5xl font-light"
            >
              Featured Products
            </motion.h2>

            <motion.div
              variants={itemVariants}
              className="flex gap-3 border-b border-gray-200"
            >
              {["new", "bestsellers", "accessories"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 text-sm font-medium capitalize transition-all duration-300 ${
                    activeTab === tab
                      ? "text-black border-b-2 border-black"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </motion.div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {products
              .filter((product) => product.category === activeTab)
              .map((product, idx) => (
                <motion.div
                  key={product.id}
                  variants={itemVariants}
                  className="group cursor-pointer bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
                  whileHover={{ y: -4 }}
                >
                  <div className="relative h-64 md:h-72 bg-gray-100 overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <button className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors duration-300 shadow-sm">
                      <Heart size={16} className="text-gray-700" />
                    </button>
                    <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                      <Star
                        size={14}
                        className="fill-yellow-400 text-yellow-400"
                      />
                      <span className="text-sm font-medium">
                        {product.rating}
                      </span>
                    </div>
                  </div>
                  <div className="p-4 md:p-5">
                    <div className="flex justify-between items-start gap-3">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-base md:text-lg mb-2 line-clamp-2">
                          {product.name}
                        </h3>
                        <p className="text-gray-600 text-base md:text-lg font-medium">
                          {product.price}
                        </p>
                      </div>
                      <button className="flex-shrink-0 p-2 border border-gray-300 rounded-lg hover:bg-black hover:text-white hover:border-black transition-all duration-300 shadow-sm">
                        <ShoppingBag size={16} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
          </div>
        </motion.div>
      </section>
    </div>
  );
}
