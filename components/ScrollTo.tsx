'use client'

import { useState, useEffect, useRef } from 'react'

const ScrollTo: React.FC = () => {
  const [sections, setSections] = useState<HTMLElement[]>([])
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)
  const [isAtTop, setIsAtTop] = useState(true)
  const scrollToRef = useRef<HTMLDivElement>(null)

  // Mendapatkan semua section utama saat komponen dimount
  useEffect(() => {
    // Selector untuk section utama - sesuaikan jika diperlukan
    const mainSections = Array.from(
      document.querySelectorAll('section, #home, #about, #services, footer')
    ) as HTMLElement[]
    
    if (mainSections.length > 0) {
      setSections(mainSections)
    }

    // Inisialisasi status scroll awal
    setIsAtTop(window.scrollY < 100)
  }, [])

  // Memantau posisi scroll untuk menentukan section yang aktif
  useEffect(() => {
    const handleScroll = () => {
      if (sections.length === 0) return

      // Cek apakah berada di bagian atas halaman
      const scrollTop = window.scrollY < 100
      setIsAtTop(scrollTop)

      // Cek apakah sudah di footer (section terakhir)
      const isLastSection = sections.length > 0 && 
        window.scrollY + window.innerHeight >= 
        document.documentElement.scrollHeight - 150

      // Sembunyikan tombol jika sudah di footer
      setIsVisible(!isLastSection)
      
      // Tentukan section yang sedang aktif berdasarkan posisi scroll
      for (let i = 0; i < sections.length; i++) {
        const section = sections[i]
        const rect = section.getBoundingClientRect()
        
        if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 3) {
          setCurrentSectionIndex(i)
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    // Panggil sekali untuk menginisialisasi
    handleScroll()
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [sections])

  // Fungsi untuk scroll ke section berikutnya
  const scrollToNextSection = () => {
    if (sections.length === 0) return
    
    const nextIndex = Math.min(currentSectionIndex + 1, sections.length - 1)
    const nextSection = sections[nextIndex]
    
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' })
      setCurrentSectionIndex(nextIndex)
    }
  }

  return (
    <div 
      ref={scrollToRef}
      className={`scroll-to-button ${isVisible ? 'visible' : 'hidden'} ${isAtTop ? 'at-top' : ''}`}
      onClick={scrollToNextSection}
      aria-label="Scroll ke bagian berikutnya"
      title="Scroll ke bagian berikutnya"
    >
      <div className="arrow-container">
        <i className="fas fa-chevron-down arrow-icon"></i>
      </div>
      <style jsx>{`
        .scroll-to-button {
          position: fixed;
          bottom: 30px;
          left: 50%;
          transform: translateX(-50%);
          width: 45px;
          height: 45px;
          background-color: var(--primary-pink);
          color: white;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          z-index: 1000;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          box-shadow: 0 3px 12px rgba(0, 0, 0, 0.15);
          opacity: 0.9;
        }
        
        .scroll-to-button:hover {
          transform: translateX(-50%) translateY(-5px);
          box-shadow: 0 6px 18px rgba(0, 0, 0, 0.25);
          opacity: 1;
        }
        
        .scroll-to-button.hidden {
          opacity: 0;
          transform: translateX(-50%) translateY(20px);
          pointer-events: none;
        }

        .scroll-to-button.at-top {
          animation: pulse 2s infinite;
        }
        
        .arrow-container {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        
        .arrow-icon {
          animation: bounce 1.5s infinite;
          font-size: 18px;
        }
        
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-5px);
          }
          60% {
            transform: translateY(-3px);
          }
        }

        @keyframes pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(250, 175, 190, 0.7);
          }
          70% {
            box-shadow: 0 0 0 10px rgba(250, 175, 190, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(250, 175, 190, 0);
          }
        }

        @media (max-width: 768px) {
          .scroll-to-button {
            width: 40px;
            height: 40px;
            bottom: 20px;
          }
        }
      `}</style>
    </div>
  )
}

export default ScrollTo 