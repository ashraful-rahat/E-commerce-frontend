"use client";
import { AnimatePresence, motion, Variants } from "framer-motion";
import {
  Heart,
  Mail,
  Menu,
  Phone,
  Search,
  ShoppingBag,
  User,
  X,
} from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("NEW ARRIVALS");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const navItems = [
    "NEW ARRIVALS",
    "MEN",
    "WOMEN",
    "ACCESSORIES",
    "COLLECTIONS",
    "SALE",
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
      },
    },
  };

  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
      },
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        staggerChildren: 0.1,
      },
    },
  };

  const mobileItemVariants = {
    closed: { x: -50, opacity: 0 },
    open: { x: 0, opacity: 1 },
  };

  const searchVariants: Variants = {
    closed: {
      width: "0px",
      opacity: 0,
      scale: 0.8,
    },
    open: {
      width: "300px",
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
      },
    },
  };

  return (
    <>
      {/* Discount Marquee - Modern Design */}
      <motion.div
        className="bg-slate-50 border-b border-slate-200 py-3"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, type: "spring" }}
      >
        <div className="overflow-hidden">
          <motion.div
            className="animate-marquee whitespace-nowrap text-slate-800 text-[15px] font-semibold"
            initial={{ x: "100%" }}
            animate={{ x: "-100%" }}
            transition={{
              repeat: Infinity,
              duration: 25,
              ease: "linear",
            }}
          >
            <span className="mx-12">
              🎉 SPECIAL OFFER! GET 20% OFF ON YOUR FIRST ORDER - USE CODE:
              WELCOME20
            </span>
            <span className="mx-12">🚚 FREE SHIPPING ON ORDERS OVER $50</span>
            <span className="mx-12">⭐ 5-STAR RATED PREMIUM QUALITY</span>
          </motion.div>
        </div>
      </motion.div>

      {/* Top Info Bar - Minimal Design */}
      <motion.div
        className="bg-white border-b border-slate-100 py-3"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center text-[14px] text-slate-700">
            <motion.div
              className="flex items-center space-x-6 mb-2 md:mb-0"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div
                variants={itemVariants}
                className="flex items-center space-x-2"
              >
                <Phone size={16} className="text-slate-600" />
                <span className="font-medium">+1 (555) 123-4567</span>
              </motion.div>
              <motion.div
                variants={itemVariants}
                className="flex items-center space-x-2"
              >
                <Mail size={16} className="text-slate-600" />
                <span className="font-medium">hello@elevate.com</span>
              </motion.div>
            </motion.div>
            <motion.div
              className="flex items-center space-x-5 text-slate-700 font-medium"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.span variants={itemVariants}>
                Free Shipping Worldwide
              </motion.span>
              <motion.span variants={itemVariants} className="text-slate-400">
                •
              </motion.span>
              <motion.span variants={itemVariants}>30-Day Returns</motion.span>
              <motion.span variants={itemVariants} className="text-slate-400">
                •
              </motion.span>
              <motion.span variants={itemVariants}>Secure Checkout</motion.span>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Main Navbar - Premium Design */}
      <motion.nav
        className="bg-white sticky top-0 z-50 border-b border-slate-200"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, type: "spring" }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <motion.div
              className="flex items-center"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <div className="text-3xl font-bold text-slate-900 tracking-tight">
                ELEVATE
              </div>
            </motion.div>

            {/* Desktop Navigation - Clean & Modern */}
            <div className="hidden lg:flex items-center space-x-2">
              {navItems.map((item) => (
                <motion.div
                  key={item}
                  className="relative"
                  whileHover="hover"
                  initial="rest"
                  animate={activeNav === item ? "active" : "rest"}
                >
                  <motion.button
                    className={`px-6 py-3 font-semibold text-[16px] transition-all duration-300 relative rounded-none ${
                      activeNav === item
                        ? "text-slate-900"
                        : "text-slate-700 hover:text-slate-900"
                    }`}
                    onClick={() => setActiveNav(item)}
                    variants={{
                      rest: { scale: 1 },
                      hover: { scale: 1.05 },
                      active: { scale: 1.02 },
                    }}
                  >
                    {item}

                    {/* Active Indicator - Bottom Border Only */}
                    {activeNav === item && (
                      <motion.div
                        className="absolute bottom-0 left-0 w-full h-1 bg-slate-900"
                        layoutId="activeIndicator"
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 35,
                        }}
                      />
                    )}
                  </motion.button>
                </motion.div>
              ))}
            </div>

            {/* Right Side Icons - Minimal Design */}
            <motion.div
              className="flex items-center space-x-3"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Animated Search Bar */}
              <div className="flex items-center space-x-2">
                <motion.div
                  className="relative"
                  initial="closed"
                  animate={isSearchOpen ? "open" : "closed"}
                  variants={searchVariants}
                >
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="w-full px-4 py-2.5 bg-slate-100 border border-slate-300 rounded-lg text-slate-800 text-[15px] placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent"
                  />
                </motion.div>

                <motion.button
                  className="p-3 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all duration-200 relative group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                >
                  <Search size={22} />

                  {/* Tooltip */}
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                    {isSearchOpen ? "Close search" : "Search"}
                  </div>
                </motion.button>
              </div>

              {/* Other Icons */}
              {[
                { icon: Heart, label: "Wishlist", badge: 5, color: "red" },
                { icon: User, label: "Account" },
                { icon: ShoppingBag, label: "Cart", badge: 3, color: "slate" },
              ].map(({ icon: Icon, label, badge, color }, index) => (
                <motion.button
                  key={label}
                  className="p-3 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all duration-200 relative group"
                  whileHover={{
                    scale: 1.05,
                  }}
                  whileTap={{ scale: 0.95 }}
                  variants={itemVariants}
                >
                  <Icon size={22} />

                  {/* Badge */}
                  {badge && (
                    <motion.span
                      className={`absolute -top-1 -right-1 ${
                        color === "red" ? "bg-red-500" : "bg-slate-600"
                      } text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold`}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        delay: 0.5 + index * 0.1,
                      }}
                    >
                      {badge}
                    </motion.span>
                  )}

                  {/* Tooltip */}
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                    {label}
                  </div>
                </motion.button>
              ))}

              {/* Mobile Menu Button */}
              <motion.button
                className="lg:hidden p-3 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <AnimatePresence mode="wait">
                  {isMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X size={22} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu size={22} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </motion.div>
          </div>

          {/* Mobile Navigation - Clean Design */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                className="lg:hidden bg-white py-4 overflow-hidden border-t border-slate-200"
                variants={mobileMenuVariants}
                initial="closed"
                animate="open"
                exit="closed"
              >
                <div className="flex flex-col space-y-1">
                  {navItems.map((item) => (
                    <motion.button
                      key={item}
                      className={`py-4 px-6 font-semibold text-[17px] text-left transition-all duration-200 ${
                        activeNav === item
                          ? "text-slate-900 bg-slate-50 border-r-4 border-slate-900"
                          : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                      }`}
                      onClick={() => {
                        setActiveNav(item);
                        setIsMenuOpen(false);
                      }}
                      variants={mobileItemVariants}
                      whileHover={{ x: 4 }}
                    >
                      {item}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>

      {/* Additional CSS for marquee */}
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </>
  );
};

export default Navbar;

// //"use client";
// import { motion, AnimatePresence } from "framer-motion";
// import { ChevronLeft, ChevronRight, ShoppingBag, ArrowRight, Star, Shield, Truck, Clock } from "lucide-react";
// import { useState, useEffect } from "react";

// const HeroBanner = () => {
//   const [currentSlide, setCurrentSlide] = useState(0);

//   const slides = [
//     {
//       id: 1,
//       title: "Elevate Your Style",
//       subtitle: "Premium Collection",
//       description: "Discover timeless elegance with our curated fashion pieces. Crafted for the modern individual who values quality and sophistication.",
//       price: "Starting at $49.99",
//       image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=700&h=700&fit=crop&crop=center",
//       buttonText: "Shop Collection",
//       badge: "NEW",
//       features: ["Premium Quality", "Free Shipping", "30-Day Returns"]
//     },
//     {
//       id: 2,
//       title: "Summer Essentials",
//       subtitle: "Fresh Arrivals",
//       description: "Embrace the warmth with our lightweight and breathable summer collection. Perfect for sunny days and warm evenings.",
//       price: "From $39.99",
//       image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=700&h=700&fit=crop&crop=center",
//       buttonText: "Explore Summer",
//       badge: "TRENDING",
//       features: ["Lightweight Fabric", "UV Protection", "Quick Dry"]
//     },
//     {
//       id: 3,
//       title: "Winter Collection",
//       subtitle: "Stay Cozy & Chic",
//       description: "Experience ultimate comfort with our premium winter wear. Designed to keep you warm without compromising on style.",
//       price: "From $59.99",
//       image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=700&h=700&fit=crop&crop=center",
//       buttonText: "Shop Winter",
//       badge: "BESTSELLER",
//       features: ["Warm & Cozy", "Water Resistant", "Premium Materials"]
//     }
//   ];

//   const nextSlide = () => {
//     setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
//   };

//   const prevSlide = () => {
//     setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
//   };

//   useEffect(() => {
//     const interval = setInterval(nextSlide, 6000);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <section className="relative bg-gradient-to-br from-slate-50 via-white to-slate-100 py-16 lg:py-24 overflow-hidden">
//       {/* Background Patterns */}
//       <div className="absolute inset-0">
//         <div className="absolute top-10 left-10 w-72 h-72 bg-blue-50 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float"></div>
//         <div className="absolute top-40 right-20 w-96 h-96 bg-amber-50 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float-delayed"></div>
//         <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-slate-50 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float-slow"></div>
//       </div>

//       <div className="max-w-7xl mx-auto px-4 relative z-10">
//         {/* Main Banner Container */}
//         <div className="relative">
//           {/* Navigation Arrows */}
//           <button
//             onClick={prevSlide}
//             className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/80 hover:bg-white text-slate-600 hover:text-slate-900 w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg border border-slate-200 transition-all duration-300 hover:scale-110 hover:shadow-xl backdrop-blur-sm"
//           >
//             <ChevronLeft size={24} />
//           </button>

//           <button
//             onClick={nextSlide}
//             className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/80 hover:bg-white text-slate-600 hover:text-slate-900 w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg border border-slate-200 transition-all duration-300 hover:scale-110 hover:shadow-xl backdrop-blur-sm"
//           >
//             <ChevronRight size={24} />
//           </button>

//           {/* Slides */}
//           <div className="relative h-[600px] lg:h-[700px] rounded-[2.5rem] overflow-hidden shadow-2xl">
//             <AnimatePresence mode="wait">
//               <motion.div
//                 key={currentSlide}
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 exit={{ opacity: 0 }}
//                 transition={{ duration: 0.8, ease: "easeInOut" }}
//                 className="absolute inset-0"
//               >
//                 <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
//                   {/* Left Side - Text Content */}
//                   <div className="flex flex-col justify-center p-8 lg:p-16 relative">
//                     <motion.div
//                       initial={{ opacity: 0, y: 40 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ delay: 0.3, duration: 0.8 }}
//                       className="max-w-2xl"
//                     >
//                       {/* Badge */}
//                       <motion.div
//                         initial={{ opacity: 0, scale: 0.8 }}
//                         animate={{ opacity: 1, scale: 1 }}
//                         transition={{ delay: 0.4, duration: 0.6 }}
//                         className="inline-flex items-center px-4 py-2 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-700 text-white text-sm font-semibold mb-6 shadow-lg"
//                       >
//                         <Star size={16} className="mr-2" />
//                         {slides[currentSlide].badge}
//                       </motion.div>

//                       {/* Title */}
//                       <motion.h1
//                         initial={{ opacity: 0, y: 30 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ delay: 0.5, duration: 0.8 }}
//                         className="text-5xl lg:text-6xl xl:text-7xl font-bold text-slate-900 mb-6 leading-tight"
//                       >
//                         {slides[currentSlide].title}
//                       </motion.h1>

//                       {/* Subtitle */}
//                       <motion.p
//                         initial={{ opacity: 0, y: 20 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ delay: 0.6, duration: 0.8 }}
//                         className="text-xl lg:text-2xl text-slate-600 font-light mb-6"
//                       >
//                         {slides[currentSlide].subtitle}
//                       </motion.p>

//                       {/* Description */}
//                       <motion.p
//                         initial={{ opacity: 0, y: 20 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ delay: 0.7, duration: 0.8 }}
//                         className="text-lg text-slate-500 mb-8 leading-relaxed max-w-lg"
//                       >
//                         {slides[currentSlide].description}
//                       </motion.p>

//                       {/* Price */}
//                       <motion.div
//                         initial={{ opacity: 0, y: 20 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ delay: 0.8, duration: 0.8 }}
//                         className="flex items-center gap-4 mb-8"
//                       >
//                         <span className="text-3xl font-bold text-slate-900">
//                           {slides[currentSlide].price}
//                         </span>
//                         <div className="flex items-center gap-1 bg-amber-50 px-3 py-1 rounded-full">
//                           {[1, 2, 3, 4, 5].map((star) => (
//                             <Star
//                               key={star}
//                               size={16}
//                               className="fill-amber-400 text-amber-400"
//                             />
//                           ))}
//                           <span className="text-sm font-medium text-amber-700 ml-1">4.9</span>
//                         </div>
//                       </motion.div>

//                       {/* Features */}
//                       <motion.div
//                         initial={{ opacity: 0, y: 20 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ delay: 0.9, duration: 0.8 }}
//                         className="flex flex-wrap gap-4 mb-8"
//                       >
//                         {slides[currentSlide].features.map((feature, index) => (
//                           <div key={index} className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-2xl border border-slate-200 shadow-sm">
//                             <Shield size={16} className="text-green-500" />
//                             <span className="text-sm font-medium text-slate-700">{feature}</span>
//                           </div>
//                         ))}
//                       </motion.div>

//                       {/* CTA Buttons */}
//                       <motion.div
//                         initial={{ opacity: 0, y: 20 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ delay: 1.0, duration: 0.8 }}
//                         className="flex flex-col sm:flex-row gap-4"
//                       >
//                         <button className="group bg-slate-900 hover:bg-slate-800 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl flex items-center justify-center gap-3 shadow-lg">
//                           <ShoppingBag size={20} />
//                           {slides[currentSlide].buttonText}
//                           <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
//                         </button>
//                         <button className="group border-2 border-slate-300 hover:border-slate-900 text-slate-700 hover:text-slate-900 px-8 py-4 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg backdrop-blur-sm">
//                           View Lookbook
//                         </button>
//                       </motion.div>

//                       {/* Trust Badges */}
//                       <motion.div
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         transition={{ delay: 1.2, duration: 0.8 }}
//                         className="flex items-center gap-6 mt-8 pt-8 border-t border-slate-200"
//                       >
//                         <div className="flex items-center gap-2 text-slate-600">
//                           <Truck size={18} className="text-green-500" />
//                           <span className="text-sm font-medium">Free Shipping</span>
//                         </div>
//                         <div className="flex items-center gap-2 text-slate-600">
//                           <Shield size={18} className="text-blue-500" />
//                           <span className="text-sm font-medium">Secure Payment</span>
//                         </div>
//                         <div className="flex items-center gap-2 text-slate-600">
//                           <Clock size={18} className="text-purple-500" />
//                           <span className="text-sm font-medium">24/7 Support</span>
//                         </div>
//                       </motion.div>
//                     </motion.div>
//                   </div>

//                   {/* Right Side - Image */}
//                   <div className="relative hidden lg:block">
//                     <motion.div
//                       initial={{ opacity: 0, scale: 1.1 }}
//                       animate={{ opacity: 1, scale: 1 }}
//                       transition={{ delay: 0.5, duration: 1.2 }}
//                       className="absolute inset-0 bg-gradient-to-l from-white/40 to-transparent z-10"
//                     />
//                     <motion.img
//                       src={slides[currentSlide].image}
//                       alt={slides[currentSlide].title}
//                       className="w-full h-full object-cover"
//                       initial={{ scale: 1.1 }}
//                       animate={{ scale: 1 }}
//                       transition={{ duration: 1.2, ease: "easeOut" }}
//                     />

//                     {/* Floating Card */}
//                     <motion.div
//                       initial={{ opacity: 0, y: 30, scale: 0.9 }}
//                       animate={{ opacity: 1, y: 0, scale: 1 }}
//                       transition={{ delay: 1, duration: 0.8 }}
//                       className="absolute top-8 right-8 bg-white/90 backdrop-blur-md rounded-3xl p-6 shadow-2xl border border-white/20"
//                     >
//                       <div className="text-center">
//                         <div className="text-3xl font-bold text-slate-900 mb-1">2.4K+</div>
//                         <div className="text-sm text-slate-600 font-medium">Happy Customers</div>
//                       </div>
//                     </motion.div>
//                   </div>

//                   {/* Mobile Image */}
//                   <div className="lg:hidden relative h-80 mt-8 rounded-3xl overflow-hidden mx-4 shadow-xl">
//                     <img
//                       src={slides[currentSlide].image}
//                       alt={slides[currentSlide].title}
//                       className="w-full h-full object-cover"
//                     />
//                   </div>
//                 </div>
//               </motion.div>
//             </AnimatePresence>
//           </div>

//           {/* Slide Indicators */}
//           <div className="flex justify-center gap-3 mt-8">
//             {slides.map((_, index) => (
//               <button
//                 key={index}
//                 onClick={() => setCurrentSlide(index)}
//                 className={`w-3 h-3 rounded-full transition-all duration-500 ${
//                   index === currentSlide
//                     ? "bg-slate-900 w-12 scale-110 shadow-lg"
//                     : "bg-slate-300 hover:bg-slate-400 hover:scale-110"
//                 }`}
//               />
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Custom Animations */}
//       <style jsx>{`
//         @keyframes float {
//           0%, 100% { transform: translateY(0px) rotate(0deg); }
//           50% { transform: translateY(-20px) rotate(180deg); }
//         }
//         @keyframes float-delayed {
//           0%, 100% { transform: translateY(0px) rotate(0deg); }
//           50% { transform: translateY(-30px) rotate(-180deg); }
//         }
//         @keyframes float-slow {
//           0%, 100% { transform: translateY(0px); }
//           50% { transform: translateY(-15px); }
//         }
//         .animate-float {
//           animation: float 15s ease-in-out infinite;
//         }
//         .animate-float-delayed {
//           animation: float-delayed 20s ease-in-out infinite;
//         }
//         .animate-float-slow {
//           animation: float-slow 25s ease-in-out infinite;
//         }
//       `}</style>
//     </section>
//   );
// };

// export default HeroBanner;
