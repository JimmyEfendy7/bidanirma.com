"use client";

import { useState, useEffect } from "react";
import { FaChevronUp } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Fungsi untuk mendeteksi scroll
    const toggleVisibility = () => {
      // Tombol akan muncul setelah scroll 500px dari atas
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // Fungsi untuk mendeteksi ukuran layar
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Event listener untuk scroll dan resize
    window.addEventListener("scroll", toggleVisibility);
    window.addEventListener("resize", handleResize);

    // Inisialisasi state
    toggleVisibility();
    handleResize();

    // Cleanup event listener saat komponen unmount
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Fungsi untuk scroll ke atas dengan animasi
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            duration: 0.3,
          }}
          onClick={scrollToTop}
          onMouseEnter={() => !isMobile && setIsHovered(true)}
          onMouseLeave={() => !isMobile && setIsHovered(false)}
          className={`back-to-top-button fixed z-50 bg-[#FAAFBE] text-white rounded-full shadow-lg flex items-center justify-center hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-[#FAAFBE] focus:ring-opacity-50 transition-all group
            ${
              isMobile
                ? "left-5 bottom-5 w-12 h-12"
                : "left-6 bottom-6 w-12 h-12"
            }`}
          aria-label="Kembali ke atas"
        >
          <motion.div
            animate={{
              y: isHovered ? [0, -3, 0] : 0,
            }}
            transition={{
              duration: 0.6,
              repeat: isHovered ? Infinity : 0,
              repeatType: "reverse",
            }}
          >
            <FaChevronUp className={`${isMobile ? "text-base" : "text-xl"}`} />
          </motion.div>
          <span className="sr-only">Kembali ke atas halaman</span>

          {/* Tooltip - hanya ditampilkan di desktop */}
          {!isMobile && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: isHovered ? 1 : 0,
                scale: isHovered ? 1 : 0.8,
                x: isHovered ? 0 : -5,
              }}
              transition={{ duration: 0.2 }}
              className="absolute left-full ml-3 px-3 py-1.5 bg-[#0A0A0A] text-white text-xs rounded-md whitespace-nowrap"
            >
              Kembali ke atas
              {/* Panah tooltip */}
              <div className="absolute top-1/2 -left-1.5 transform -translate-y-1/2 w-0 h-0 border-y-4 border-y-transparent border-r-4 border-r-[#0A0A0A]"></div>
            </motion.div>
          )}

          {/* Efek lingkaran ripple */}
          {isHovered && !isMobile && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0.5 }}
              animate={{ scale: 1.2, opacity: 0 }}
              transition={{ duration: 1, repeat: Infinity }}
              className="absolute inset-0 rounded-full bg-[#FAAFBE]"
            ></motion.div>
          )}
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default BackToTopButton;
