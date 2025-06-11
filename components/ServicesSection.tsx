'use client'

import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { FaTimes, FaDownload } from 'react-icons/fa'
import { motion } from 'framer-motion'

const ServicesSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>("semua")
  const [activePage, setActivePage] = useState<number>(0)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const imagesContainerRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  
  // Definisi data pricelist
  const pricelistPages = [
    {
      id: "pricelist-1",
      image: "/assets/img/pricelist-1.png",
      category: "mommy"
    },
    {
      id: "pricelist-2",
      image: "/assets/img/pricelist-2.png",
      category: "mommy"
    },
    {
      id: "pricelist-3",
      image: "/assets/img/pricelist-3.png",
      category: "baby"
    },
    {
      id: "pricelist-4",
      image: "/assets/img/pricelist-4.png",
      category: "baby"
    },
    {
      id: "pricelist-5",
      image: "/assets/img/pricelist-5.png",
      category: "kelas"
    },
    {
      id: "pricelist-6",
      image: "/assets/img/pricelist-6.png",
      category: "homevisit"
    }
  ]

  const serviceCategories = [
    { id: "semua", name: "Semua Layanan" },
    { id: "mommy", name: "Mommy Treatment" },
    { id: "baby", name: "Baby & Toddler Treatment" },
    { id: "kelas", name: "Kelas & Pelatihan" },
    { id: "homevisit", name: "Paket Home Visit" }
  ]

  // Filter halaman berdasarkan kategori
  const filteredPages = activeCategory === "semua" 
    ? pricelistPages 
    : pricelistPages.filter(page => page.category === activeCategory)
    
  // Untuk mengatur styling container berdasarkan jumlah gambar
  const containerClasses = filteredPages.length === 1 
    ? "flex justify-center items-center mb-8" 
    : "flex flex-wrap justify-center items-center gap-6 mb-8";
    
  // Semua gambar menggunakan class yang sama untuk konsistensi ukuran
  const itemClasses = "pricelist-image-container w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)] max-w-md";
  
  // Fungsi untuk menampilkan gambar dalam mode fullscreen
  const openFullscreen = (imageSrc: string) => {
    setSelectedImage(imageSrc);
    // Mencegah scrolling pada body ketika overlay terbuka
    document.body.style.overflow = 'hidden';
    
    // Menambahkan kelas pada body untuk menyembunyikan tombol scroll
    document.body.classList.add('overlay-active');
    
    // Animasi untuk overlay
    if (overlayRef.current) {
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3 }
      );
      
      // Animasi untuk gambar
      const imageElement = overlayRef.current.querySelector('.fullscreen-image');
      if (imageElement) {
        gsap.fromTo(
          imageElement,
          { scale: 0.9, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.4, delay: 0.1 }
        );
      }
      
      // Animasi untuk tombol
      const buttons = overlayRef.current.querySelectorAll('button');
      if (buttons.length) {
        gsap.fromTo(
          buttons,
          { y: -20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.3, delay: 0.2, stagger: 0.1 }
        );
      }
    }
  };
  
  // Fungsi untuk menutup overlay
  const closeFullscreen = () => {
    // Animasi untuk overlay
    if (overlayRef.current) {
      gsap.to(
        overlayRef.current,
        { 
          opacity: 0, 
          duration: 0.3,
          onComplete: () => {
            setSelectedImage(null);
            // Mengembalikan scrolling pada body
            document.body.style.overflow = 'auto';
            // Menghapus kelas pada body
            document.body.classList.remove('overlay-active');
          }
        }
      );
    } else {
      setSelectedImage(null);
      document.body.style.overflow = 'auto';
      document.body.classList.remove('overlay-active');
    }
  };
  
  // Fungsi untuk mendownload gambar
  const downloadImage = (imageSrc: string) => {
    const link = document.createElement('a');
    link.href = imageSrc;
    link.download = imageSrc.split('/').pop() || 'pricelist.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  // Event handler untuk menutup overlay saat klik di luar gambar
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Menutup overlay jika klik tepat pada overlay background
    if (e.target === e.currentTarget) {
      closeFullscreen();
    }
  };
  
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    if (imagesContainerRef.current) {
      // Sederhana fadeIn animasi untuk container gambar
      gsap.fromTo(
        imagesContainerRef.current.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1, 
          y: 0, 
          duration: 0.6,
          stagger: 0.15,
          scrollTrigger: {
            trigger: imagesContainerRef.current,
            start: "top bottom-=100",
          }
        }
      );
    }
    
    // Menambahkan event listener untuk escape key
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedImage) {
        closeFullscreen();
      }
    };
    
    window.addEventListener('keydown', handleEscKey);
    
    return () => {
      window.removeEventListener('keydown', handleEscKey);
    };
  }, [activeCategory, selectedImage]);

  return (
    <section id="services" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block px-4 py-1.5 bg-pink-50 text-[#FAAFBE] rounded-full text-sm font-medium mb-4">Layanan Profesional</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
            Layanan <span className="text-[#FAAFBE]">Bidan Irma</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Bidan Irma menyediakan berbagai layanan kesehatan ibu dan anak dengan standar pelayanan profesional, 
            termasuk layanan khusus konseling laktasi dan pendampingan menyusui
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-3 mb-10 pt-4">
          {serviceCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-full transition-all duration-300 text-sm font-medium ${
                activeCategory === category.id
                  ? 'bg-[var(--primary-pink)] text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Gambar Pricelist */}
        <div 
          ref={imagesContainerRef} 
          className={containerClasses}
        >
          {filteredPages.map((page, index) => (
            <div 
              key={page.id} 
              className={itemClasses}
            >
              <div 
                className="cursor-pointer relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() => openFullscreen(page.image)}
              >
                <Image
                  src={page.image}
                  alt={`Pricelist ${index + 1}`}
                  width={1200}
                  height={800}
                  className="w-full h-auto transition-transform duration-500 group-hover:scale-105"
                  priority={index === 0}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <span className="text-white bg-black/50 px-4 py-2 rounded-full text-sm font-medium">Klik untuk memperbesar</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Fullscreen Overlay */}
        {selectedImage && (
          <div 
            ref={overlayRef}
            className="fixed inset-0 bg-black/90 z-[3000] flex items-center justify-center p-4 md:p-8"
            onClick={closeFullscreen}
          >
            <div 
              className="relative max-w-7xl w-full max-h-full flex flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Tombol Close */}
              <button 
                className="absolute top-0 right-0 -mt-12 -mr-2 md:right-4 md:top-4 md:m-0 text-white bg-black/50 hover:bg-black/70 rounded-full p-2 transition-all z-10"
                onClick={closeFullscreen}
                aria-label="Close fullscreen"
              >
                <FaTimes className="text-2xl" />
              </button>
              
              {/* Tombol Download */}
              <button 
                className="absolute top-0 right-12 -mt-12 -mr-2 md:right-16 md:top-4 md:m-0 text-white bg-black/50 hover:bg-black/70 rounded-full p-2 transition-all z-10"
                onClick={() => downloadImage(selectedImage)}
                aria-label="Download image"
              >
                <FaDownload className="text-2xl" />
              </button>
              
              {/* Gambar Fullscreen - Dibungkus dengan div yang mencegah klik pada gambar menutup overlay */}
              <div className="fullscreen-image overflow-hidden rounded-lg">
                <Image
                  src={selectedImage}
                  alt="Pricelist fullscreen view"
                  width={2000}
                  height={1500}
                  className="w-auto h-auto max-h-[80vh] max-w-[90vw] object-contain"
                  priority
                />
              </div>
              
              {/* Teks petunjuk */}
              <p className="text-white/70 text-center mt-4 text-sm">
                Klik di luar gambar atau tekan ESC untuk menutup
              </p>
            </div>
            
            {/* Style untuk menyembunyikan tombol scrollTo dan backToTop saat overlay aktif */}
            <style jsx global>{`
              body.overlay-active .scroll-to-button,
              body.overlay-active .back-to-top-button {
                opacity: 0 !important;
                visibility: hidden !important;
                pointer-events: none !important;
              }
            `}</style>
          </div>
        )}
      </div>
    </section>
  )
}

export default ServicesSection 