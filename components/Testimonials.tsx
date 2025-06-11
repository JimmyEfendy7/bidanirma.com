'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useState, useEffect, useCallback } from 'react';

interface Testimonial {
  name: string;
  role: string;
  content: string;
  avatar: string;
  image: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    name: 'Bunda Emma',
    role: 'Baby Massage',
    content: 'Alhamdulillah pulas bobo nya:) Trimakasi bu bidan irma, Seperti nya rambut jadwal potong nya di bulan ini.',
    avatar: '/assets/img/avatar/avatar-1.svg',
    image: '/assets/img/testimonials/testimonials-1.png',
    rating: 5,
  },
  {
    name: 'Bunda Adelisa',
    role: 'Konseling Laktasi',
    content: 'Allhamdulillah, setelah ketemu sama bu bid dan ngobol perihal menyusui  + cerita keluh kesah yg saya alami, sekarang jdi lebih tenang dlm menyusui, karna udh tau ilmunya sekarang sudah diterapin juga. penjelasannya sangat jelas + dibantu dipraktekan jdi sangat mudah dimengerti. Insyaallah kedepannya bisa lancar berikan asi buat debaynya. Terimakasih bu bid.',
    avatar: '/assets/img/avatar/avatar-2.svg',
    image: '/assets/img/testimonials/testimonials-2.png',
    rating: 5,
  },
  {
    name: 'Bunda Emma',
    role: 'Baby Massage',
    content: 'Alhamdulillah pulas bobo nya:) Trimakasi bu bidan irma, Seperti nya rambut jadwal potong nya di bulan ini.',
    avatar: '/assets/img/avatar/avatar-3.svg',
    image: '/assets/img/testimonials/testimonials-1.png',
    rating: 5,
  },
  {
    name: 'Bunda Adelisa',
    role: 'Konseling Laktasi',
    content: 'Allhamdulillah, setelah ketemu sama bu bid dan ngobol perihal menyusui  + cerita keluh kesah yg saya alami, sekarang jdi lebih tenang dlm menyusui, karna udh tau ilmunya sekarang sudah diterapin juga. penjelasannya sangat jelas + dibantu dipraktekan jdi sangat mudah dimengerti. Insyaallah kedepannya bisa lancar berikan asi buat debaynya. Terimakasih bu bid.',
    avatar: '/assets/img/avatar/avatar-4.svg',
    image: '/assets/img/testimonials/testimonials-2.png',
    rating: 5,
  },
];

const Testimonials: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [showImageOverlay, setShowImageOverlay] = useState<boolean>(false);
  const [isAutoSliding, setIsAutoSliding] = useState<boolean>(true);
  const slideDuration = 5000; // durasi slide dalam milidetik (5 detik)

  // Membuat nextTestimonial sebagai useCallback agar dapat digunakan dalam useEffect
  const nextTestimonial = useCallback((): void => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  }, []);

  const prevTestimonial = (): void => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  const toggleImageOverlay = (): void => {
    setShowImageOverlay(!showImageOverlay);
    // Menghentikan auto slide saat overlay gambar ditampilkan
    setIsAutoSliding(!showImageOverlay ? false : true);
  };

  // Menangani klik manual pada tombol navigasi
  const handleManualNavigation = (direction: 'prev' | 'next' | number) => {
    // Hentikan sementara auto slide ketika pengguna melakukan navigasi manual
    setIsAutoSliding(false);
    
    if (direction === 'prev') {
      prevTestimonial();
    } else if (direction === 'next') {
      nextTestimonial();
    } else {
      setActiveIndex(direction);
    }
    
    // Mulai kembali auto slide setelah 5 detik tanpa interaksi pengguna
    setTimeout(() => {
      setIsAutoSliding(true);
    }, 5000);
  };

  // Effect untuk auto slide carousel
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isAutoSliding && !showImageOverlay) {
      interval = setInterval(() => {
        nextTestimonial();
      }, slideDuration);
    }
    
    // Cleanup interval saat komponen unmount atau isAutoSliding berubah
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isAutoSliding, showImageOverlay, nextTestimonial]);

  return (
    <section id="testimonial" className="section py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block px-4 py-1.5 bg-pink-50 text-[#FAAFBE] rounded-full text-sm font-medium mb-4">Testimoni Pasien</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
            Apa Kata <span className="text-[#FAAFBE]">Pasien Bidan Irma</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Kami bangga dengan kepuasan pasien kami. Berikut adalah beberapa testimoni dari mereka yang telah menggunakan layanan Bidan Irma.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center pt-4">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex justify-center items-center px-4 md:px-8"
          >
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                transition: { duration: 0.5 }
              }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative w-full max-w-sm h-72 md:h-80 cursor-pointer"
              onClick={toggleImageOverlay}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#FAAFBE]/30 to-pink-300/30 rounded-2xl -rotate-6 scale-105 z-0"></div>
              <Image
                src={testimonials[activeIndex].image}
                alt={`Testimonial dari ${testimonials[activeIndex].name}`}
                className="rounded-2xl shadow-xl relative z-10"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                loading="eager"
                quality={90}
                style={{
                  objectFit: 'cover',
                  objectPosition: 'center'
                }}
              />
              <div className="absolute inset-0 bg-black/10 hover:bg-black/20 transition-colors duration-300 rounded-2xl flex items-center justify-center opacity-0 hover:opacity-100 z-20">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 10h.01M15 10h.01M12 10h.01" />
                </svg>
              </div>
            </motion.div>
          </motion.div>

          <div className="px-4 md:px-0">
            <div className="relative p-6 md:p-8 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100">
              <svg 
                className="absolute -top-6 left-10 w-12 h-12 text-[#FAAFBE] opacity-20"
                xmlns="http://www.w3.org/2000/svg" 
                fill="currentColor" 
                viewBox="0 0 32 32"
              >
                <path d="M10 8c-3.3 0-6 2.7-6 6v10h10V14H7c0-1.7 1.3-3 3-3V8zm12 0c-3.3 0-6 2.7-6 6v10h10V14h-7c0-1.7 1.3-3 3-3V8z"/>
              </svg>

              <div className="relative">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5 }}
                  className="mb-6"
                >
                  <p className="text-lg text-gray-700 italic mb-6">
                    "{testimonials[activeIndex].content}"
                  </p>
                  
                  <div className="flex items-center">
                    <div className="relative w-14 h-14 mr-4 rounded-full overflow-hidden shadow-md border-2 border-pink-200">
                      <Image
                        src={testimonials[activeIndex].avatar}
                        alt={testimonials[activeIndex].name}
                        fill
                        sizes="56px"
                        style={{
                          objectFit: 'cover'
                        }}
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg text-gray-900">{testimonials[activeIndex].name}</h4>
                      <p className="text-gray-600">{testimonials[activeIndex].role}</p>
                      <div className="flex mt-1">
                        {[...Array(5)].map((_, i) => (
                          <svg 
                            key={i}
                            className={`w-5 h-5 ${i < testimonials[activeIndex].rating ? 'text-[#FAAFBE]' : 'text-gray-300'}`}
                            fill="currentColor" 
                            viewBox="0 0 20 20" 
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>

                <div className="flex justify-between mt-8">
                  <motion.button
                    onClick={() => handleManualNavigation('prev')}
                    className="p-2 rounded-full bg-[#FAAFBE] text-white shadow-md"
                    whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -10px rgba(250, 175, 190, 0.7)" }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </motion.button>
                  <div className="flex space-x-2">
                    {testimonials.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => handleManualNavigation(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${activeIndex === index ? 'bg-[#FAAFBE] w-6' : 'bg-gray-300'}`}
                      />
                    ))}
                  </div>
                  <motion.button
                    onClick={() => handleManualNavigation('next')}
                    className="p-2 rounded-full bg-[#FAAFBE] text-white shadow-md"
                    whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -10px rgba(250, 175, 190, 0.7)" }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Image Overlay */}
      <AnimatePresence>
        {showImageOverlay && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 cursor-pointer"
            onClick={toggleImageOverlay}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-4xl max-h-[80vh] w-full h-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-full aspect-video bg-black/50 rounded-lg overflow-hidden">
                <Image
                  src={testimonials[activeIndex].image}
                  alt={`Testimonial dari ${testimonials[activeIndex].name}`}
                  fill
                  sizes="90vw"
                  className="object-contain"
                  quality={100}
                  priority
                />
              </div>
              
              <button 
                onClick={toggleImageOverlay}
                className="absolute -top-4 -right-4 w-10 h-10 rounded-full bg-[#FAAFBE] text-white shadow-lg flex items-center justify-center hover:bg-[#F08080] transition-all duration-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Testimonials; 