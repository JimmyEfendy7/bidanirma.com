# Website Praktik Mandiri Bidan Irma

Website modern untuk Praktik Mandiri Bidan Irma yang dibangun dengan Next.js, Tailwind CSS, TypeScript, dan animasi GSAP.

## Fitur

- Desain responsif untuk semua ukuran perangkat
- Animasi modern dengan GSAP
- UI/UX yang profesional dan menarik
- Navigasi yang intuitif
- Halaman beranda dengan slider interaktif
- Bagian layanan yang informatif
- Bagian tentang dengan statistik
- Testimonial dari pasien
- Formulir kontak yang responsif
- Widget WhatsApp untuk komunikasi cepat

## Teknologi yang Digunakan

- [Next.js](https://nextjs.org/) - Framework React dengan App Router
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [TypeScript](https://www.typescriptlang.org/) - JavaScript dengan tipe data statis
- [GSAP](https://greensock.com/gsap/) - Library animasi profesional
- [Font Awesome](https://fontawesome.com/) - Ikon vektor
- [Vercel](https://vercel.com/) - Platform deployment

## Persyaratan

- Node.js 18.x atau lebih baru
- pnpm 8.x atau lebih baru

## Cara Instalasi

1. Kloning repositori ini:
   ```bash
   git clone https://github.com/username/bidanirma-website.git
   cd bidanirma-website/frontend
   ```

2. Instal dependensi:
   ```bash
   pnpm install
   ```

3. Jalankan server pengembangan:
   ```bash
   pnpm dev
   ```

4. Buka [http://localhost:3000](http://localhost:3000) di browser Anda.

## Struktur Proyek

```
frontend/
├── app/                  # App Router Next.js
│   ├── globals.css       # Style global
│   ├── layout.tsx        # Layout utama
│   └── page.tsx          # Halaman utama
├── components/           # Komponen React
│   ├── AboutSection.tsx
│   ├── ContactSection.tsx
│   ├── Footer.tsx
│   ├── HomeSlider.tsx
│   ├── Navbar.tsx
│   ├── ServicesSection.tsx
│   ├── TestimonialsSection.tsx
│   └── WhatsAppWidget.tsx
├── public/               # Aset statis
│   └── assets/
│       └── img/          # Gambar
├── types/                # Tipe TypeScript
│   └── global.d.ts       # Deklarasi tipe global
└── ...
```

## Deployment

Website ini dapat dengan mudah di-deploy ke Vercel:

```bash
pnpm build
vercel --prod
```

## Pemeliharaan dan Kontribusi

Untuk pemeliharaan dan kontribusi, silakan ikuti langkah-langkah berikut:

1. Fork repositori
2. Buat branch fitur (`git checkout -b feature/nama-fitur`)
3. Commit perubahan Anda (`git commit -m 'Menambahkan fitur baru'`)
4. Push ke branch (`git push origin feature/nama-fitur`)
5. Buat Pull Request

## Lisensi

Hak Cipta © 2024 Praktik Mandiri Bidan Irma. Semua hak dilindungi.

## Kontak

Untuk pertanyaan atau dukungan, silakan hubungi:

- Email: info@bidanirma.com
- Website: [www.bidanirma.com](https://www.bidanirma.com)
 