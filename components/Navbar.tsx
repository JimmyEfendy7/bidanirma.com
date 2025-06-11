'use client'

import React, { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { gsap } from 'gsap'

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)

  // Efek scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Animasi navbar
  useEffect(() => {
    if (navRef.current) {
      gsap.set(navRef.current, { y: -200, opacity: 0 });
      gsap.to(navRef.current, {
        y: 0,
        opacity: 1,
        delay: 0.6,
        duration: 0.8,
        ease: 'sine.inOut'
      });
    }
  }, [])

  // Smooth scroll untuk navigasi
  const scrollToSection = (id: string) => {
    setIsMenuOpen(false)
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav 
      ref={navRef}
      className={`fixed w-full z-[2000] flex items-center justify-between px-9 py-5 transition-all duration-300 ${
        isScrolled 
          ? 'bg-gray-900/90 backdrop-blur-md py-3 shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      <div className="promo-slider flex items-center gap-2.5 text-white uppercase text-sm">
        <div className="logo-bidan">
          <Image 
            src="/assets/img/Logo_Bidan_Irma_Putih.png" 
            alt="Logo Bidan Irma" 
            width={32} 
            height={32}
          />
        </div>
        <div>Bidan Irma</div>
      </div>
      
      <div className="nav-top hidden md:flex items-center gap-6 text-white">
        <button 
          onClick={() => scrollToSection('home')}
          className="uppercase text-sm hover:text-[var(--primary-pink)] transition-colors duration-300"
        >
          Beranda
        </button>
        <button 
          onClick={() => scrollToSection('about')}
          className="uppercase text-sm hover:text-[var(--primary-pink)] transition-colors duration-300"
        >
          Tentang
        </button>
        <button 
          onClick={() => scrollToSection('services')}
          className="uppercase text-sm hover:text-[var(--primary-pink)] transition-colors duration-300"
        >
          Layanan
        </button>
        <button 
          onClick={() => scrollToSection('buatjanji')}
          className="uppercase text-sm hover:text-[var(--primary-pink)] transition-colors duration-300"
        >
          Buat Janji
        </button>
        <button 
          onClick={() => scrollToSection('testimonial')}
          className="uppercase text-sm hover:text-[var(--primary-pink)] transition-colors duration-300"
        >
          Testimoni
        </button>
        <div className="available flex items-center border-2 border-[var(--primary-white)] rounded-[25px] py-1.5 px-4 text-xs w-[150px]">
          <i className="fas fa-circle text-[var(--primary-pink)] mr-2.5"></i>
          <div className="available-for-work w-full overflow-hidden">
            <div className="available-text flex whitespace-nowrap animate-[marquee_5s_linear_infinite]">
              <span>Persalinan 24 Jam</span>
              <span>Persalinan 24 Jam</span>
              <span>Persalinan 24 Jam</span>
              <span>Persalinan 24 Jam</span>
            </div>
          </div>
        </div>
        
        {/* Menu Mobile Toggle */}
        <button 
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-6 w-6" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Menu Mobile Toggle (visible only on mobile) */}
      <div className="md:hidden flex items-center">
        {/* Available for Work (Mobile) - Posisi di samping kiri tombol menu */}
        <div className="available flex items-center border-[1px] border-[var(--primary-white)] rounded-[15px] py-1 px-2 text-[10px] w-[85px] mr-2 overflow-hidden">
          <i className="fas fa-circle text-[var(--primary-pink)] mr-2.5 text-[6px]"></i>
          <div className="available-for-work w-full overflow-hidden">
            <div className="available-text flex whitespace-nowrap" style={{ animation: 'marquee-mobile 3s linear infinite' }}>
              <span className="text-[10px] mr-3">Persalinan 24 Jam</span>
              <span className="text-[10px] mr-3">Persalinan 24 Jam</span>
            </div>
          </div>
        </div>
        
        <button 
          className="text-white focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-6 w-6" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Menu Mobile */}
      <div 
        className={`md:hidden absolute top-full left-0 w-full transition-all duration-300 overflow-hidden bg-gray-900/90 backdrop-blur-md z-[1999] ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="flex flex-col space-y-4 py-4 px-9">
          <button 
            onClick={() => scrollToSection('home')}
            className="text-white hover:text-[var(--primary-pink)] transition-colors duration-300 uppercase text-sm font-medium text-left"
          >
            Beranda
          </button>
          <button 
            onClick={() => scrollToSection('about')}
            className="text-white hover:text-[var(--primary-pink)] transition-colors duration-300 uppercase text-sm font-medium text-left"
          >
            Tentang
          </button>
          <button 
            onClick={() => scrollToSection('services')}
            className="text-white hover:text-[var(--primary-pink)] transition-colors duration-300 uppercase text-sm font-medium text-left"
          >
            Layanan
          </button>
          <button 
            onClick={() => scrollToSection('buatjanji')}
            className="text-white hover:text-[var(--primary-pink)] transition-colors duration-300 uppercase text-sm font-medium text-left"
          >
            Buat Janji
          </button>
          <button 
            onClick={() => scrollToSection('testimonial')}
            className="text-white hover:text-[var(--primary-pink)] transition-colors duration-300 uppercase text-sm font-medium text-left"
          >
            Testimoni
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar 