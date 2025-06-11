"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { FaWhatsapp, FaComments, FaTimes, FaUserCircle, FaPaperPlane } from "react-icons/fa";

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [message, setMessage] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([
    { text: "Halo! Saya Bidan Irma. Ada yang bisa saya bantu?", isUser: false }
  ]);

  useEffect(() => {
    setIsMounted(true);
    
    // Deteksi perangkat mobile
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener("resize", handleResize);
    handleResize(); // Initialize on mount
    
    // Jika ingin menambahkan pesan welcome setelah beberapa detik chat dibuka
    const welcomeTimer = setTimeout(() => {
      if (isOpen && messages.length === 1) {
        setMessages(prev => [
          ...prev,
          {
            text: "Silakan tanyakan informasi seputar layanan konsultasi laktasi atau buat janji konsultasi.",
            isUser: false
          }
        ]);
      }
    }, 3000);

    return () => {
      clearTimeout(welcomeTimer);
      window.removeEventListener("resize", handleResize);
    };
  }, [isOpen, messages]);

  const toggleWidget = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    // Add user message
    setMessages([...messages, { text: message, isUser: true }]);
    setMessage("");

    // Simulate reply after 1 second
    setTimeout(() => {
      setMessages(prev => [
        ...prev, 
        { 
          text: "Terima kasih atas pesannya. Untuk konsultasi lebih lanjut, silakan hubungi saya melalui WhatsApp.", 
          isUser: false 
        }
      ]);
    }, 1000);
  };

  if (!isMounted) return null;

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="chat-widget fixed bottom-24 right-5 z-50 bg-white rounded-xl shadow-xl w-80 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-[#FAAFBE] text-white p-4 flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <FaUserCircle className="text-2xl" />
                </div>
                <div className="ml-3">
                  <h3 className="font-bold">Bidan Irma</h3>
                  <div className="flex items-center text-xs">
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                    <span>Online & Siap Membantu</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Chat body */}
            <div className="p-4 h-72 overflow-y-auto bg-gray-50 flex flex-col space-y-3">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`${
                    msg.isUser
                      ? "ml-auto bg-[#FAAFBE] text-white"
                      : "mr-auto bg-gray-200 text-gray-800"
                  } rounded-lg p-3 max-w-[80%] shadow-sm`}
                >
                  {msg.text}
                </div>
              ))}
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-3 border-t flex items-center">
              <input
                type="text"
                placeholder="Ketik pesan Anda di sini..."
                className="flex-1 border rounded-full px-4 py-2 text-sm focus:outline-none focus:border-[#FAAFBE]"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                autoFocus
              />
              <button
                type="submit"
                className="ml-2 text-[#FAAFBE] hover:text-[#C48793] transition-colors"
                title="Kirim pesan"
              >
                <FaPaperPlane />
              </button>
            </form>

            {/* WhatsApp button */}
            <Link
              href="https://wa.me/6282374861715?text=Halo%20Bu%20Irma%2C%20saya%20ingin%20konsultasi"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 text-white p-3 w-full flex items-center justify-center hover:bg-green-600 transition-colors"
            >
              <FaWhatsapp className="mr-2" />
              <span>Lanjutkan di WhatsApp</span>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button with animation - selalu di posisi fixed */}
      <motion.button
        onClick={toggleWidget}
        onMouseEnter={() => !isMobile && setIsHovered(true)}
        onMouseLeave={() => !isMobile && setIsHovered(false)}
        className={`chat-widget fixed bottom-5 right-5 z-50 rounded-full shadow-lg flex items-center justify-center w-12 h-12 ${
          isOpen ? "bg-red-500" : "bg-[#FAAFBE]"
        } hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-[#FAAFBE] focus:ring-opacity-50 transition-all group`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ 
          scale: 1, 
          opacity: 1,
          rotate: isOpen ? [0, 90, 180] : 0
        }}
        transition={{ 
          type: "spring",
          stiffness: 260,
          damping: 20,
          rotate: { duration: 0.5 }
        }}
      >
        {/* Icon dengan animasi bounce saat hover */}
        <motion.div
          animate={{
            y: isHovered && !isOpen ? [0, -3, 0] : 0,
          }}
          transition={{
            duration: 0.6,
            repeat: isHovered && !isOpen ? Infinity : 0,
            repeatType: "reverse",
          }}
        >
          {isOpen ? 
            <FaTimes className={`text-white ${isMobile ? "text-base" : "text-xl"}`} /> : 
            <FaComments className={`text-white ${isMobile ? "text-base" : "text-xl"}`} />}
        </motion.div>
        
        {/* Tooltip - hanya ditampilkan di desktop */}
        {!isMobile && !isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: isHovered ? 1 : 0,
              scale: isHovered ? 1 : 0.8,
              x: isHovered ? -5 : 0,
            }}
            transition={{ duration: 0.2 }}
            className="absolute right-full mr-3 px-3 py-1.5 bg-[#0A0A0A] text-white text-xs rounded-md whitespace-nowrap"
          >
            Konsultasi Sekarang
            {/* Panah tooltip */}
            <div className="absolute top-1/2 -right-1.5 transform -translate-y-1/2 w-0 h-0 border-y-4 border-y-transparent border-l-4 border-l-[#0A0A0A]"></div>
          </motion.div>
        )}

        {/* Efek lingkaran ripple */}
        {isHovered && !isMobile && !isOpen && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0.5 }}
            animate={{ scale: 1.2, opacity: 0 }}
            transition={{ duration: 1, repeat: Infinity }}
            className="absolute inset-0 rounded-full bg-[#FAAFBE]"
          ></motion.div>
        )}
      </motion.button>
    </>
  );
};

export default ChatWidget; 