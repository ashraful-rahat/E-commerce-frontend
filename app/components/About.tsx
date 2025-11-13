"use client";

import { motion, Variants } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import Image from "next/image";

export default function FashionBrand() {
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

  return (
    <div className="bg-white text-gray-900">
      {/* About Section - Top Heading */}
      <section className="px-6 md:px-12 lg:px-20 py-14 bg-white">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants}>
            <h2 className="text-2xl font-bold md:text-5xl lg:text-6xl -6">
              Elevating Fashion Since 2020
            </h2>
            <p className="text-lg mt-5 md:text-xl text-gray-600 leading-relaxed">
              We believe in creating timeless pieces that blend contemporary
              design with exceptional craftsmanship. Our commitment to quality
              and sustainable practices defines every collection we create.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* Hero Section - Balanced Size */}
      <section className="min-h-[85vh] flex items-center justify-center px-6 md:px-12 lg:px-20 py-10 md:py-0">
        <div className="w-full max-w-7xl flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
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
              <button className="text-white px-8 py-4 font-medium tracking-wider uppercase text-sm hover:bg-gray-100 hover:scale-105 transform transition-all duration-300 flex items-center gap-2 justify-center border border-black shadow-lg hover:shadow-xl">
                <ShoppingBag size={18} />
                Shop Collection
              </button>
              <button className="bg-white text-black px-8 py-4 font-medium tracking-wider uppercase text-sm hover:bg-gray-100 hover:scale-105 transform transition-all duration-300 flex items-center gap-2 justify-center border border-black shadow-lg hover:shadow-xl">
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
    </div>
  );
}
