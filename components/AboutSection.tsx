'use client'

import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { FaWhatsapp, FaInstagram, FaTiktok } from 'react-icons/fa'

const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const statRefs = useRef<Array<HTMLDivElement | null>>([])
  
  // State untuk angka yang akan dianimasikan
  const [experienceCount, setExperienceCount] = useState(0);
  const [birthCount, setBirthCount] = useState(0);
  const [patientCount, setPatientCount] = useState(0);
  const [serviceHours, setServiceHours] = useState(0);
  
  // Nilai target untuk masing-masing counter
  const targetExperience = 5;
  const targetBirth = 500;
  const targetPatient = 1000;
  const targetHours = 24;
  
  // Fungsi untuk menganimasikan counter
  const animateCounter = (setter: React.Dispatch<React.SetStateAction<number>>, target: number, duration: number) => {
    let startTime: number;
    let currentTime = 0;
    const startValue = 0;
    
    const updateCounter = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      currentTime = timestamp - startTime;
      
      const progress = Math.min(currentTime / duration, 1);
      const currentValue = Math.floor(progress * (target - startValue) + startValue);
      
      setter(currentValue);
      
      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        setter(target);
      }
    };
    
    requestAnimationFrame(updateCounter);
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    // Animasi image
    gsap.from(imageRef.current, {
      x: -50,
      opacity: 0,
      duration: 1,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
      }
    })

    // Animasi konten
    gsap.from(contentRef.current, {
      x: 50,
      opacity: 0,
      duration: 1,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
      }
    })

    // Animasi statistik
    statRefs.current.forEach((ref, index) => {
      gsap.from(ref, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.2 * index,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
          onEnter: () => {
            // Mulai animasi counter ketika statistik terlihat
            switch(index) {
              case 0:
                animateCounter(setExperienceCount, targetExperience, 1500);
                break;
              case 1:
                animateCounter(setBirthCount, targetBirth, 2000);
                break;
              case 2:
                animateCounter(setPatientCount, targetPatient, 2500);
                break;
              case 3:
                animateCounter(setServiceHours, targetHours, 1200);
                break;
            }
          }
        }
      })
    })
  }, [])

  // Function untuk menyimpan referensi stat items
  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !statRefs.current.includes(el)) {
      statRefs.current.push(el)
    }
  }

  return (
    <div ref={sectionRef} className="py-20 bg-white" id="about">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center">
          {/* Gambar klinik */}
          <div ref={imageRef} className="w-full lg:w-1/2 mb-10 lg:mb-0 lg:pr-10">
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-32 h-32 bg-[var(--primary-pink)] opacity-20 rounded-lg"></div>
              <div className="relative overflow-hidden rounded-lg shadow-xl">
                <Image
                  src="/assets/img/about.jpg"
                  alt="Bidan Irma"
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-[var(--primary-pink)] opacity-20 rounded-lg"></div>
            </div>
          </div>

          {/* Konten tentang Bidan Irma */}
          <div ref={contentRef} className="w-full lg:w-1/2 lg:pl-10">
            <h2 className="text-4xl font-bold mb-6 text-gray-800">
              Tentang <span className="text-[var(--primary-pink)]">Bidan Irma Susanti, S.Keb</span>
            </h2>
            
            <p className="text-gray-600 mb-6">
              Praktik Bidan Irma adalah pelayanan kesehatan yang didedikasikan untuk memberikan 
              layanan kesehatan ibu dan anak dengan standar tertinggi. Dengan pengalaman lebih dari 5 tahun 
              dalam bidang kebidanan, Bidan Irma berkomitmen untuk memberikan perawatan yang komprehensif dan 
              personal bagi setiap pasien.
            </p>
            
            <p className="text-gray-600 mb-8">
              Layanan Homecare dan Konsultasi laktasi menyusui via online dan offline yang diantara nya meliputi Mommy treatment, Baby & Todler treatment, Paket kelas pelatihan dan Paket home visit.
            </p>

            {/* Statistik */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              <div 
                ref={addToRefs} 
                className="text-center p-4 bg-pink-50 rounded-lg"
              >
                <h3 className="text-3xl font-bold text-[var(--primary-pink)]">{experienceCount}+</h3>
                <p className="text-gray-600">Tahun Pengalaman</p>
              </div>
              <div 
                ref={addToRefs} 
                className="text-center p-4 bg-pink-50 rounded-lg"
              >
                <h3 className="text-3xl font-bold text-[var(--primary-pink)]">{birthCount}+</h3>
                <p className="text-gray-600">Persalinan Sukses</p>
              </div>
              <div 
                ref={addToRefs} 
                className="text-center p-4 bg-pink-50 rounded-lg"
              >
                <h3 className="text-3xl font-bold text-[var(--primary-pink)]">{patientCount}+</h3>
                <p className="text-gray-600">Pasien Puas</p>
              </div>
              <div 
                ref={addToRefs} 
                className="text-center p-4 bg-pink-50 rounded-lg"
              >
                <h3 className="text-3xl font-bold text-[var(--primary-pink)]">{serviceHours}/7</h3>
                <p className="text-gray-600">Layanan Siaga</p>
              </div>
            </div>
            
            {/* Tombol sosial media menggantikan tombol Kontak Kami */}
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="https://wa.me/6282374861715" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white font-medium py-2.5 sm:py-3 px-5 sm:px-6 rounded-full transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg w-full sm:w-auto text-center"
              >
                <FaWhatsapp className="text-lg sm:text-xl" />
                <span>WhatsApp</span>
              </a>
              
              <a
                href="https://instagram.com/irmassanti" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#FCAF45] hover:from-[#6A2E99] hover:via-[#E41A1A] hover:to-[#E09B3D] text-white font-medium py-2.5 sm:py-3 px-5 sm:px-6 rounded-full transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg w-full sm:w-auto text-center"
              >
                <FaInstagram className="text-lg sm:text-xl" />
                <span>Instagram</span>
              </a>
              
              <a
                href="https://tiktok.com/@bidan_irmaa" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-black hover:bg-gray-800 text-white font-medium py-2.5 sm:py-3 px-5 sm:px-6 rounded-full transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg w-full sm:w-auto text-center"
              >
                <FaTiktok className="text-lg sm:text-xl" />
                <span>TikTok</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutSection 