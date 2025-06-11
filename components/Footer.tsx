'use client'

import React, { useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

const Footer: React.FC = () => {
  const footerRef = useRef<HTMLElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const linksRef = useRef<HTMLDivElement>(null)
  const contactRef = useRef<HTMLDivElement>(null)
  const subscribeRef = useRef<HTMLDivElement>(null)
  const copyrightRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    gsap.from([logoRef.current, linksRef.current, contactRef.current, subscribeRef.current], {
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      scrollTrigger: {
        trigger: footerRef.current,
        start: 'top 80%',
      }
    })

    gsap.from(copyrightRef.current, {
      opacity: 0,
      duration: 0.8,
      delay: 0.8,
      scrollTrigger: {
        trigger: footerRef.current,
        start: 'top 80%',
      }
    })
  }, [])

  return (
    <footer ref={footerRef} className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Logo dan Deskripsi */}
          <div ref={logoRef} className="space-y-4">
            <div className="flex items-center">
              <Image 
                src="/assets/img/Logo_Bidan_Irma_Putih.png" 
                alt="Bidan Irma Logo" 
                width={40} 
                height={40} 
              />
              <h3 className="text-xl font-bold ml-2">Bidan Irma</h3>
            </div>
            <p className="text-gray-400">
              Memberikan pelayanan kesehatan ibu dan anak dengan penuh kasih sayang dan profesionalisme.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-9 h-9 rounded-full bg-[var(--primary-pink)] flex items-center justify-center hover:bg-[var(--dark-pink)] transition-colors duration-300">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="https://instagram.com/irmassanti" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-[var(--primary-pink)] flex items-center justify-center hover:bg-[var(--dark-pink)] transition-colors duration-300">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://tiktok.com/@bidan_irmaa" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-[var(--primary-pink)] flex items-center justify-center hover:bg-[var(--dark-pink)] transition-colors duration-300">
                <i className="fab fa-tiktok"></i>
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-[var(--primary-pink)] flex items-center justify-center hover:bg-[var(--dark-pink)] transition-colors duration-300">
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div ref={linksRef}>
            <h4 className="text-lg font-bold mb-4 relative pb-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-16 after:h-1 after:bg-[var(--primary-pink)] after:rounded-full">
              Link Cepat
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="#home" className="text-gray-400 hover:text-[var(--primary-pink)] transition-colors duration-300 flex items-center">
                  <i className="fas fa-chevron-right text-xs mr-2"></i> Beranda
                </Link>
              </li>
              <li>
                <Link href="#about" className="text-gray-400 hover:text-[var(--primary-pink)] transition-colors duration-300 flex items-center">
                  <i className="fas fa-chevron-right text-xs mr-2"></i> Tentang Kami
                </Link>
              </li>
              <li>
                <Link href="#services" className="text-gray-400 hover:text-[var(--primary-pink)] transition-colors duration-300 flex items-center">
                  <i className="fas fa-chevron-right text-xs mr-2"></i> Layanan
                </Link>
              </li>
              <li>
                <Link href="#buatjanji" className="text-gray-400 hover:text-[var(--primary-pink)] transition-colors duration-300 flex items-center">
                  <i className="fas fa-chevron-right text-xs mr-2"></i> Buat Janji
                </Link>
              </li>
              <li>
                <Link href="#testimonial" className="text-gray-400 hover:text-[var(--primary-pink)] transition-colors duration-300 flex items-center">
                  <i className="fas fa-chevron-right text-xs mr-2"></i> Testimoni
                </Link>
              </li>
            </ul>
          </div>

          {/* Kontak */}
          <div ref={contactRef}>
            <h4 className="text-lg font-bold mb-4 relative pb-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-16 after:h-1 after:bg-[var(--primary-pink)] after:rounded-full">
              Kontak Kami
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <i className="fas fa-map-marker-alt mt-1 text-[var(--primary-pink)] mr-3"></i>
                <span className="text-gray-400">Cikarang Utara, Bekasi</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-phone-alt text-[var(--primary-pink)] mr-3"></i>
                <span className="text-gray-400">+62 823-7486-1715</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-envelope text-[var(--primary-pink)] mr-3"></i>
                <span className="text-gray-400">praktik.bidanirma@gmail.com</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-clock text-[var(--primary-pink)] mr-3"></i>
                <span className="text-gray-400">Senin - Sabtu: 08.00 - 17.00</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div ref={subscribeRef}>
            <h4 className="text-lg font-bold mb-4 relative pb-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-16 after:h-1 after:bg-[var(--primary-pink)] after:rounded-full">
              Langganan Berita
            </h4>
            <p className="text-gray-400 mb-4">
              Dapatkan informasi terbaru tentang kesehatan ibu dan anak.
            </p>
            <form className="space-y-3">
              <input 
                type="email" 
                placeholder="Email Anda" 
                className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:border-[var(--primary-pink)]" 
              />
              <button 
                type="submit" 
                className="w-full bg-[var(--primary-pink)] hover:bg-[var(--dark-pink)] text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300"
              >
                Berlangganan
              </button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div ref={copyrightRef} className="pt-8 mt-8 border-t border-gray-800 text-center text-gray-500">
          <p>
            &copy; {new Date().getFullYear()} Praktik Mandiri Bidan Irma. All Rights Reserved.
          </p>
          <p className="mt-2 sm:mt-0">Design and develop by <span className="text-[#FAAFBE]">♥</span> <a href="https://jimmyefendi.my.id" target="_blank" rel="noopener noreferrer" className="text-[#FAAFBE] hover:text-[#F08080] transition-colors duration-300">Jimmy Efendi</a></p>
        </div>
      </div>
    </footer>
  )
}

export default Footer 