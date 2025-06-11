'use client'

import { useEffect, useRef } from 'react'
import Script from 'next/script'
import Image from 'next/image'
import React from 'react'
import { FaCalendarCheck, FaList, FaArrowRight } from 'react-icons/fa'

// Extend Window interface to include gsap
declare global {
  interface Window {
    gsap: any;
  }
}

const HomeSlider: React.FC = () => {
  const demoRef = useRef<HTMLDivElement>(null)
  const slideNumbersRef = useRef<HTMLDivElement>(null)
  const detailsEvenRef = useRef<HTMLDivElement>(null)
  const detailsOddRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const loadGSAP = async () => {
      if (typeof window !== 'undefined' && window.gsap) {
        const data = [
          {
            place: "Paktik",
            title: "BIDAN",
            title2: "IRMA",
            description:
              "Bidan Praktisi , Konselor laktasi dan melayani Homecare di Cikarang Utara dan daerah terdekat disekitarnya.",
            image: "/assets/img/slider/slider-1.jpg",
          },
          {
            place: "Promo Lauching",
            title: "KB",
            title2: "GRATIS",
            description:
              "Bissmillah.. Mohon Do'a untuk dan dukungannya untuk dapat segera launching tempat praktik mandiri bidan yaa.",
            image: "/assets/img/slider/slider-2.jpg",
          },
          {
            place: "Layanan",
            title: "HOMECARE",
            title2: "KONS. LAKTASI",
            description:
              "Mommy Treatment, Baby & Toddler Care, Kelas Laktasi Online & Offline, dan Kunjungan Rumah",
            image: "/assets/img/slider/slider-3.jpg",
          },
          {
            place: "Fasilitas",
            title: "BERSIH",
            title2: "DAN NYAMAN",
            description:
              "On Proggress yaa. ditunggu aja untuk di daerah Cikarang atau daerah terdekat di sekitarnya",
            image: "/assets/img/slider/slider-4.jpg",
          },
          {
            place: "Asuransi",
            title: "UMUM",
            title2: "DAN SWASTA",
            description:
              "Asuransi swasta akan tersedia setelah Grand launching tempat praktik mandiri bidan yaa",
            image: "/assets/img/slider/slider-5.jpg",
          },
          {
            place: "Kerjasama",
            title: "PARTNET",
            title2: "DAN SPONSOR",
            description:
              "Terimakasih atas kerjasama dan dukungan dari berbagai pihak terutama partner dan sponsorship yang sudah menjalin kerjasama dengan kami.",
            image: "/assets/img/slider/slider-6.jpg",
          },
        ];

        const cards = data
          .map(
            (i, index) =>
              `<div class="card" id="card${index}" style="background-image:url(${i.image})"  ></div>`
          )
          .join("");

        const cardContents = data
          .map(
            (i, index) => `<div class="card-content" id="card-content-${index}">
        <div class="content-start"></div>
        <div class="content-place">${i.place}</div>
        <div class="content-title-1">${i.title}</div>
        <div class="content-title-2">${i.title2}</div>
        </div>`
          )
          .join("");

        const sildeNumbers = data
          .map(
            (_, index) =>
              `<div class="item" id="slide-item-${index}" >${index + 1}</div>`
          )
          .join("");

        if (demoRef.current) demoRef.current.innerHTML = cards + cardContents;
        if (slideNumbersRef.current) slideNumbersRef.current.innerHTML = sildeNumbers;

        const gsap = window.gsap;
        
        // Fungsi-fungsi untuk animasi slider
        const getCard = (index: number): string => {
          return `#card${index}`;
        };
        
        const getCardContent = (index: number): string => {
          return `#card-content-${index}`;
        };
        
        const getSliderItem = (index: number): string => {
          return `#slide-item-${index}`;
        };

        const animate = (target: string, duration: number, properties: any): Promise<void> => {
          return new Promise((resolve) => {
            gsap.to(target, {
              ...properties,
              duration: duration,
              onComplete: resolve,
            });
          });
        };

        let order = [0, 1, 2, 3, 4, 5];
        let detailsEven = true;
        let clicks = 0;

        // Nilai awal untuk desktop
        let offsetTop = 200;
        let offsetLeft = 700;
        let cardWidth = 150;
        let cardHeight = 225;
        let gap = 25;
        let numberSize = 50;
        const ease = "sine.inOut";

        // Fungsi untuk menentukan apakah layar berukuran mobile
        const isMobile = (): boolean => {
          return window.innerWidth < 768;
        };

        // Fungsi untuk memeriksa apakah thumbnail harus disembunyikan pada mobile
        // Pada mobile, kita hanya ingin menampilkan 4 thumbnail
        const shouldHideThumbnail = (index: number, totalThumbnails: number): boolean => {
          // Tidak menyembunyikan thumbnail apapun, semua tetap ditampilkan
          return false;
        };

        // Fungsi untuk mengatur nilai berdasarkan ukuran layar
        const setResponsiveValues = (): void => {
          const { innerHeight: height, innerWidth: width } = window;
          
          if (isMobile()) {
            // Nilai untuk mobile - sesuaikan agar semua thumbnail terlihat dan rata tengah
            offsetTop = height - 150; // Posisikan thumbnail lebih tinggi
            cardWidth = 50; // Ukuran thumbnail lebih kecil
            cardHeight = 75; // Ukuran thumbnail lebih kecil
            gap = 8; // Jarak antar thumbnail lebih rapi
            numberSize = 30;
            
            // Hitung posisi kiri untuk rata tengah (centered)
            const totalWidth = (cardWidth * 5) + (gap * 4); // 5 thumbnail dengan 4 gap
            offsetLeft = Math.max(10, (width - totalWidth) / 2); // Minimal 10px dari kiri
          } else {
            // Nilai untuk desktop
            offsetTop = height - 300;
            offsetLeft = width > 1200 ? width - 600 : width - 400;
            cardWidth = 150;
            cardHeight = 225;
            gap = 25;
            numberSize = 50;
          }
        };

        const init = (): void => {
          setResponsiveValues();
          
          const [active, ...rest] = order;
          const detailsActive = detailsEven ? "#details-even" : "#details-odd";
          const detailsInactive = detailsEven ? "#details-odd" : "#details-even";
          const { innerHeight: height, innerWidth: width } = window;

          // Posisi pagination - disesuaikan untuk mobile
          if (isMobile()) {
            // Sembunyikan pagination sepenuhnya di mobile
            gsap.set("#pagination", {
              opacity: 0,
              visibility: "hidden",
              display: "none"
            });
            
            // Sembunyikan slide numbers di mobile
            gsap.set(".slide-numbers", {
              opacity: 0,
              visibility: "hidden",
              display: "none"
            });
          } else {
            gsap.set(".slide-numbers", {
              opacity: 1,
              visibility: "visible",
              display: "block"
            });
            
            gsap.set("#pagination", {
              opacity: 1,
              visibility: "visible",
              display: "flex",
              top: offsetTop + 230,
              left: offsetLeft
            });
          }
          
          gsap.set("nav", { y: -200, opacity: 0 });

          gsap.set(getCard(active), {
            x: 0,
            y: 0,
            width: window.innerWidth,
            height: window.innerHeight,
          });
          
          // Pada inisialisasi, tampilkan konten untuk kartu aktif
          if (isMobile()) {
            // Untuk mobile, sembunyikan teks pada kartu aktif saat inisialisasi,
            // teks akan ditampilkan melalui animasi detail, bukan card-content
            gsap.set(getCardContent(active), { opacity: 0 });
          } else {
            // Untuk desktop, tampilkan teks pada kartu aktif
            gsap.set(getCardContent(active), { x: 0, y: 0, opacity: 0 });
          }
          
          // Menyesuaikan posisi detail berdasarkan ukuran layar
          if (isMobile()) {
            gsap.set(detailsActive, { opacity: 0, zIndex: 22, x: 0, y: -100 });
          } else {
            gsap.set(detailsActive, { opacity: 0, zIndex: 22, x: -200 });
          }
          
          gsap.set(detailsInactive, { opacity: 0, zIndex: 12 });
          gsap.set(`${detailsInactive} .text`, { y: 100 });
          gsap.set(`${detailsInactive} .title-1`, { y: 100 });
          gsap.set(`${detailsInactive} .title-2`, { y: 100 });
          gsap.set(`${detailsInactive} .desc`, { y: 50 });
          gsap.set(`${detailsInactive} .cta`, { y: 60 });

          // Menyesuaikan progress bar untuk mobile
          if (isMobile()) {
            gsap.set(".progress-sub-foreground", {
              width: (width - 80) * (1 / order.length) * (active + 1),
            });
          } else {
            gsap.set(".progress-sub-foreground", {
              width: 450 * (1 / order.length) * (active + 1),
            });
          }

          rest.forEach((i, index) => {
            // Semua thumbnail ditampilkan
            gsap.set(getCard(i), {
              x: offsetLeft + index * (cardWidth + gap),
              y: offsetTop,
              width: cardWidth,
              height: cardHeight,
              zIndex: 30,
              borderRadius: 10,
              opacity: 1,
              visibility: 'visible'
            });
            
            // Sembunyikan teks pada kartu kecil di mobile
            gsap.set(getCardContent(i), {
              x: offsetLeft + index * (cardWidth + gap),
              zIndex: 40,
              y: offsetTop + cardHeight - (isMobile() ? 50 : 100),
              opacity: isMobile() ? 0 : 1, // Sembunyikan teks pada mobile
              visibility: isMobile() ? 'hidden' : 'visible'
            });
            
            gsap.set(getSliderItem(i), { x: (index + 1) * numberSize });
          });

          gsap.set(".indicator", { x: -window.innerWidth });

          const startDelay = 0.6;

          gsap.to(".cover", {
            x: width + 400,
            delay: 0.5,
            ease,
            onComplete: () => {
              setTimeout(() => {
                loop();
              }, 500);
            },
          });
          
          rest.forEach((i, index) => {
            // Jangan animasikan thumbnail yang disembunyikan
            gsap.to(getCard(i), {
              x: offsetLeft + index * (cardWidth + gap),
              zIndex: 30,
              opacity: 1,
              visibility: 'visible',
              delay: 0.05 * index + startDelay,
              ease,
            });
            gsap.to(getCardContent(i), {
              x: offsetLeft + index * (cardWidth + gap),
              zIndex: 40,
              delay: 0.05 * index + startDelay,
              ease,
              opacity: isMobile() ? 0 : 1, // Sembunyikan teks pada mobile
              visibility: isMobile() ? 'hidden' : 'visible',
            });
          });
          
          gsap.to("nav", { y: 0, opacity: 1, delay: startDelay, ease });
          gsap.to("#pagination", {
            y: 0,
            opacity: 1,
            delay: startDelay,
            ease,
          });
          
          // Animasi yang berbeda untuk details pada mobile
          if (isMobile()) {
            gsap.to(detailsActive, { opacity: 1, y: 0, delay: startDelay, ease });
          } else {
            gsap.to(detailsActive, { opacity: 1, x: 0, delay: startDelay, ease });
          }
        };

        const step = (): Promise<void> => {
          return new Promise((resolve) => {
            setResponsiveValues();
            
            order.push(order.shift() as number);
            detailsEven = !detailsEven;
  
            const detailsActive = detailsEven ? "#details-even" : "#details-odd";
            const detailsInactive = detailsEven ? "#details-odd" : "#details-even";
            const { innerWidth: width } = window;
  
            // Update teks pada detailsActive
            if (detailsEvenRef.current && detailsOddRef.current) {
              const activeElement = detailsEven ? detailsEvenRef.current : detailsOddRef.current;
              const placeText = activeElement.querySelector('.text');
              const title1 = activeElement.querySelector('.title-1');
              const title2 = activeElement.querySelector('.title-2');
              const descEl = activeElement.querySelector('.desc');
              
              if (placeText) placeText.textContent = data[order[0]].place;
              if (title1) title1.textContent = data[order[0]].title;
              if (title2) title2.textContent = data[order[0]].title2;
              if (descEl) descEl.textContent = data[order[0]].description;
            }
  
            gsap.set(detailsActive, { zIndex: 22 });
            gsap.to(detailsActive, { opacity: 1, delay: 0.4, ease });
            gsap.to(`${detailsActive} .text`, {
              y: 0,
              delay: 0.1,
              duration: 0.7,
              ease,
            });
            gsap.to(`${detailsActive} .title-1`, {
              y: 0,
              delay: 0.15,
              duration: 0.7,
              ease,
            });
            gsap.to(`${detailsActive} .title-2`, {
              y: 0,
              delay: 0.15,
              duration: 0.7,
              ease,
            });
            gsap.to(`${detailsActive} .desc`, {
              y: 0,
              delay: 0.3,
              duration: 0.4,
              ease,
            });
            gsap.to(`${detailsActive} .cta`, {
              y: 0,
              delay: 0.35,
              duration: 0.4,
              onComplete: resolve,
              ease,
            });
            gsap.set(detailsInactive, { zIndex: 12 });
  
            const [active, ...rest] = order;
            const prv = rest[rest.length - 1];
  
            gsap.set(getCard(prv), { zIndex: 10 });
            gsap.set(getCard(active), { zIndex: 20 });
            gsap.to(getCard(prv), { scale: 1.5, ease });
  
            gsap.to(getCardContent(active), {
              y: offsetTop + cardHeight - (isMobile() ? 10 : 10),
              opacity: 0,
              duration: 0.3,
              ease,
            });
            gsap.to(getSliderItem(active), { x: 0, ease });
            gsap.to(getSliderItem(prv), { x: -numberSize, ease });
            
            // Update tampilan pagination berdasarkan ukuran layar
            if (isMobile()) {
              gsap.set(".slide-numbers", {
                opacity: 0,
                visibility: "hidden",
                display: "none"
              });
              
              // Progress bar tidak terlihat lagi di mobile
            } else {
              gsap.set(".slide-numbers", {
                opacity: 1,
                visibility: "visible",
                display: "block"
              });
              
              gsap.set("#pagination", {
                opacity: 1,
                visibility: "visible",
                display: "flex"
              });
              
              // Progress bar untuk desktop
              gsap.to(".progress-sub-foreground", {
                width: 450 * (1 / order.length) * (active + 1),
                ease,
              });
            }
  
            gsap.to(getCard(active), {
              x: 0,
              y: 0,
              ease,
              width: window.innerWidth,
              height: window.innerHeight,
              borderRadius: 0,
              onComplete: () => {
                const xNew = offsetLeft + (rest.length - 1) * (cardWidth + gap);
                
                // Selalu tampilkan semua thumbnail, tidak perlu sembunyikan
                gsap.set(getCard(prv), {
                  x: xNew,
                  y: offsetTop,
                  width: cardWidth,
                  height: cardHeight,
                  zIndex: 30,
                  borderRadius: 10,
                  scale: 1,
                  opacity: 1,
                  visibility: 'visible'
                });

                gsap.set(getCardContent(prv), {
                  x: xNew,
                  y: offsetTop + cardHeight - (isMobile() ? 50 : 100),
                  opacity: isMobile() ? 0 : 1,
                  zIndex: 40,
                  visibility: isMobile() ? 'hidden' : 'visible'
                });
                
                gsap.set(getSliderItem(prv), { x: rest.length * numberSize });

                gsap.set(detailsInactive, { opacity: 0 });
                gsap.set(`${detailsInactive} .text`, { y: 100 });
                gsap.set(`${detailsInactive} .title-1`, { y: 100 });
                gsap.set(`${detailsInactive} .title-2`, { y: 100 });
                gsap.set(`${detailsInactive} .desc`, { y: 50 });
                gsap.set(`${detailsInactive} .cta`, { y: 60 });
                clicks -= 1;
                if (clicks > 0) {
                  step();
                }
              },
            });
  
            rest.forEach((i, index) => {
              if (i !== prv) {
                const xNew = offsetLeft + index * (cardWidth + gap);
                
                // Selalu tampilkan semua thumbnail
                gsap.set(getCard(i), { zIndex: 30 });
                gsap.to(getCard(i), {
                  x: xNew,
                  y: offsetTop,
                  width: cardWidth,
                  height: cardHeight,
                  opacity: 1,
                  visibility: 'visible',
                  ease,
                  delay: 0.1 * (index + 1),
                });

                gsap.to(getCardContent(i), {
                  x: xNew,
                  y: offsetTop + cardHeight - (isMobile() ? 50 : 100),
                  opacity: isMobile() ? 0 : 1, // Sembunyikan teks pada mobile
                  visibility: isMobile() ? 'hidden' : 'visible',
                  zIndex: 40,
                  ease,
                  delay: 0.1 * (index + 1),
                });
                gsap.to(getSliderItem(i), { x: (index + 1) * numberSize, ease });
              }
            });
          });
        };

        const loop = async (): Promise<void> => {
          await animate(".indicator", 2, { x: 0 });
          await animate(".indicator", 0.8, { x: window.innerWidth, delay: 0.3 });
          gsap.set(".indicator", { x: -window.innerWidth });
          await step();
          loop();
        };

        async function loadImage(src: string): Promise<HTMLImageElement> {
          return new Promise((resolve, reject) => {
            const img = document.createElement('img');
            img.onload = () => resolve(img);
            img.onerror = reject;
            img.src = src;
          });
        }

        async function loadImages() {
          const promises = data.map(({ image }) => loadImage(image));
          return Promise.all(promises);
        }

        async function start() {
          try {
            await loadImages();
            init();
            
            // Tambahkan event listener untuk resize window
            window.addEventListener('resize', () => {
              // Setelah resize, atur ulang nilai-nilai yang responsif
              setResponsiveValues();
              
              // Update tampilan pagination berdasarkan ukuran layar
              if (isMobile()) {
                // Sembunyikan pagination sepenuhnya di mobile
                gsap.set("#pagination", {
                  opacity: 0,
                  visibility: "hidden",
                  display: "none"
                });
                
                gsap.set(".slide-numbers", {
                  opacity: 0,
                  visibility: "hidden",
                  display: "none"
                });
                
                // Sesuaikan ulang posisi thumbnail saat resize
                const [active, ...rest] = order;
                rest.forEach((i, index) => {
                  const xNew = offsetLeft + index * (cardWidth + gap);
                  gsap.to(getCard(i), {
                    x: xNew,
                    y: offsetTop,
                    width: cardWidth,
                    height: cardHeight,
                  });
                });
              } else {
                gsap.set(".slide-numbers", {
                  opacity: 1,
                  visibility: "visible",
                  display: "block"
                });
                
                gsap.set("#pagination", {
                  opacity: 1,
                  visibility: "visible",
                  display: "flex",
                  top: offsetTop + 230,
                  left: offsetLeft
                });
              }
            });
          } catch (error) {
            console.error("One or more images failed to load", error);
          }
        }

        start();
      }
    };

    loadGSAP();
  }, []);

  return (
    <div className="wrapper">
      <div className="indicator"></div>

      <div id="demo" ref={demoRef}></div>

      <div className="details" id="details-even" ref={detailsEvenRef}>
        <div className="place-box">
          <div className="text">Selamat Datang</div>
        </div>
        <div className="title-box-1"><div className="title-1">PRAKTIK</div></div>
        <div className="title-box-2"><div className="title-2">BIDAN IRMA</div></div>
        <div className="desc">
          Melayani berbagai perawatan profesional untuk ibu dan anak. <br className="hidden sm:inline" />
          Mommy Treatment, Baby & Toddler Care, dan Persalinan.
        </div>
        <div className="cta">
          <a href="/buat-janji" className="discover bg-[var(--primary-pink)] hover:bg-[var(--dark-pink)] text-white border-0 transition-all duration-300 flex items-center justify-center gap-2 py-2.5">
            <FaCalendarCheck className="text-base" />
            <span>Buat Janji</span>
            <FaArrowRight className="text-xs ml-1 transform group-hover:translate-x-1 transition-transform" />
          </a>
          <a href="#services" className="discover hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2 py-2.5">
            <FaList className="text-base" />
            <span>Lihat Layanan</span>
          </a>
        </div>
      </div>

      <div className="details" id="details-odd" ref={detailsOddRef}>
        <div className="place-box">
          <div className="text">Selamat Datang</div>
        </div>
        <div className="title-box-1"><div className="title-1">PRAKTIK</div></div>
        <div className="title-box-2"><div className="title-2">BIDAN IRMA</div></div>
        <div className="desc">
          Melayani berbagai perawatan profesional untuk ibu dan anak. <br className="hidden sm:inline" />
          Mommy Treatment, Baby & Toddler Care, dan Persalinan.
        </div>
        <div className="cta">
          <a href="/buat-janji" className="discover bg-[var(--primary-pink)] hover:bg-[var(--dark-pink)] text-white border-0 transition-all duration-300 flex items-center justify-center gap-2 py-2.5 group">
            <FaCalendarCheck className="text-base" />
            <span>Buat Janji</span>
            <FaArrowRight className="text-xs ml-1 transform group-hover:translate-x-1 transition-transform" />
          </a>
          <a href="#services" className="discover hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2 py-2.5">
            <FaList className="text-base" />
            <span>Lihat Layanan</span>
          </a>
        </div>
      </div>

      <div className="pagination" id="pagination">
        <div className="progress-sub-container">
          <div className="progress-sub-background">
            <div className="progress-sub-foreground"></div>
          </div>
        </div>
        <div className="slide-numbers" id="slide-numbers" ref={slideNumbersRef}></div>
      </div>

      <div className="cover"></div>
    </div>
  )
}

export default HomeSlider 