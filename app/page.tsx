'use client'

import React from 'react'
import HomeSlider from '@/components/HomeSlider'
import ServicesSection from '@/components/ServicesSection'
import AboutSection from '@/components/AboutSection'
import Footer from '@/components/Footer'
import ChatWidget from '@/components/ChatWidget'
import BackToTopButton from '@/components/BackToTopButton'
import Navbar from '@/components/Navbar'
import ScrollTo from '@/components/ScrollTo'
import BuatJanji from '@/components/BuatJanji'
import Testimonials from '@/components/Testimonials'

const Home: React.FC = () => {
  return (
    <main>
      {/* Navbar */}
      <Navbar />
      
      {/* Home Section */}
      <section className="home" id="home">
        <HomeSlider />
      </section>

      {/* About Section */}
      <AboutSection />

      {/* Services Section */}
      <ServicesSection />
      
      {/* Buat Janji Section */}
      <BuatJanji />
      
      {/* Testimonials Section */}
      <Testimonials />
      
      {/* Footer */}
      <Footer />
      
      {/* Chat Widget - fixed position */}
      <ChatWidget />
      
      {/* Back to Top Button */}
      <BackToTopButton />

      {/* Scroll To Next Section Button */}
      <ScrollTo />
    </main>
  )
}

export default Home
 