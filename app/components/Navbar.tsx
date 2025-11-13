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
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { label: "NEW ARRIVALS", href: "/new-arrivals" },
    { label: "MEN", href: "/men" },
    { label: "WOMEN", href: "/women" },
    { label: "KIDS", href: "/kids" },
    { label: "ALL PRODUCTS", href: "/products" },
    { label: "SALE", href: "/sale" },
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

  const isActive = (href: string) => {
    return pathname === href;
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
              <Link
                href="/"
                className="text-3xl font-bold text-slate-900 tracking-tight"
              >
                ELEVATE
              </Link>
            </motion.div>

            {/* Desktop Navigation - Clean & Modern */}
            <div className="hidden lg:flex items-center space-x-2">
              {navItems.map((item) => (
                <motion.div
                  key={item.label}
                  className="relative"
                  whileHover="hover"
                  initial="rest"
                  animate={isActive(item.href) ? "active" : "rest"}
                >
                  <Link href={item.href}>
                    <motion.button
                      className={`px-6 py-3 font-semibold text-[16px] transition-all duration-300 relative rounded-none ${
                        isActive(item.href)
                          ? "text-slate-900"
                          : "text-slate-700 hover:text-slate-900"
                      }`}
                      variants={{
                        rest: { scale: 1 },
                        hover: { scale: 1.05 },
                        active: { scale: 1.02 },
                      }}
                    >
                      {item.label}

                      {/* Active Indicator - Bottom Border Only */}
                      {isActive(item.href) && (
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
                  </Link>
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
                {
                  icon: Heart,
                  label: "Wishlist",
                  badge: 5,
                  color: "red",
                  href: "/wishlist",
                },
                { icon: User, label: "Account", href: "/account" },
                {
                  icon: ShoppingBag,
                  label: "Cart",
                  badge: 3,
                  color: "slate",
                  href: "/cart",
                },
              ].map(({ icon: Icon, label, badge, color, href }, index) => (
                <motion.div key={label}>
                  <Link href={href}>
                    <motion.button
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
                  </Link>
                </motion.div>
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
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <motion.button
                        className={`w-full text-left py-4 px-6 font-semibold text-[17px] transition-all duration-200 ${
                          isActive(item.href)
                            ? "text-slate-900 bg-slate-50 border-r-4 border-slate-900"
                            : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                        }`}
                        variants={mobileItemVariants}
                        whileHover={{ x: 4 }}
                      >
                        {item.label}
                      </motion.button>
                    </Link>
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
