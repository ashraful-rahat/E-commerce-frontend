import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, //
  timeout: 100000, // 100 seconds
});

// Request interceptor to add token automatically
axiosInstance.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      // make sure it's running in browser
      const token = localStorage.getItem("token");
      if (token && config.headers) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Optional: response interceptor for global error handling
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error("API Error:", error.response.data);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;

//  {/* Brand Story Section */}
//     <section className="px-8 md:px-16 py-20 md:py-32 bg-gray-50">
//       <motion.div
//         className="max-w-6xl mx-auto"
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ once: true, margin: "-100px" }}
//         variants={containerVariants}
//       >
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
//           <motion.div variants={slideVariants} className="space-y-8">
//             <motion.h2
//               variants={itemVariants}
//               className="text-4xl md:text-5xl font-light"
//             >
//               Our Philosophy
//             </motion.h2>
//             <motion.p
//               variants={itemVariants}
//               className="text-lg text-gray-600 leading-relaxed"
//             >
//               We believe that great fashion should be accessible, sustainable,
//               and make you feel confident. Every piece in our collection is
//               carefully curated to ensure the highest quality and timeless
//               design.
//             </motion.p>
//             <motion.div
//               variants={itemVariants}
//               className="grid grid-cols-2 gap-6"
//             >
//               <div>
//                 <h4 className="text-2xl font-light mb-2">100+</h4>
//                 <p className="text-gray-600 text-sm">Premium Products</p>
//               </div>
//               <div>
//                 <h4 className="text-2xl font-light mb-2">5K+</h4>
//                 <p className="text-gray-600 text-sm">Happy Customers</p>
//               </div>
//             </motion.div>
//           </motion.div>

//           <motion.div
//             className="relative h-96 md:h-full min-h-96 bg-gray-300 rounded-sm overflow-hidden"
//             variants={slideVariants}
//             whileHover={{ scale: 1.02 }}
//             transition={{ duration: 0.4 }}
//           >
//             <img
//               src="/images/brand-story.jpg"
//               alt="Brand philosophy"
//               className="w-full h-full object-cover"
//             />
//           </motion.div>
//         </div>
//       </motion.div>
//     </section>

// {/* CTA Section */}
//   <section className="px-8 md:px-16 py-20 md:py-32 bg-black text-white">
//     <motion.div
//       className="max-w-4xl mx-auto text-center"
//       initial="hidden"
//       whileInView="visible"
//       viewport={{ once: true }}
//       variants={containerVariants}
//     >
//       <motion.h2
//         variants={itemVariants}
//         className="text-4xl md:text-6xl font-light mb-8"
//       >
//         Join Our Style Community
//       </motion.h2>
//       <motion.p
//         variants={itemVariants}
//         className="text-lg text-gray-300 mb-12 max-w-2xl mx-auto"
//       >
//         Subscribe to our newsletter and get 15% off your first order. Be the
//         first to know about new collections and exclusive offers.
//       </motion.p>
//       <motion.div
//         variants={itemVariants}
//         className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
//       >
//         <input
//           type="email"
//           placeholder="Enter your email"
//           className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded text-white placeholder-gray-400 focus:outline-none focus:border-white"
//         />
//         <button className="px-8 py-3 bg-white text-black font-medium tracking-wider uppercase text-sm hover:bg-gray-100 transition-colors duration-300">
//           Subscribe
//         </button>
//       </motion.div>
//     </motion.div>
//   </section>
