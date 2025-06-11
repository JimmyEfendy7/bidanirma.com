'use client'

import React, { useState, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { useRouter } from 'next/navigation'
import ChatWidget from '@/components/ChatWidget'
import BackToTopButton from '@/components/BackToTopButton'
import ScrollTo from '@/components/ScrollTo'

// Data kategori layanan
const serviceCategories = [
  {
    id: "category-mommy",
    icon: 'fa-user-nurse',
    title: 'Mommy Treatment (Ibu Menyusui)',
    description: 'Layanan lengkap untuk ibu menyusui, termasuk pijat, konsultasi, dan terapi.',
    category: "mommy",
    subServices: [
      {
        id: "mommy-pijat-akuprelaktasi",
        title: 'Pijat Akuprelaktasi',
        description: 'Perawatan pijat khusus di area payudara dan punggung untuk merangsang aliran ASI.'
      },
      {
        id: "mommy-konsultasi-laktasi",
        title: 'Konsultasi Laktasi (Offline & Online)',
        description: 'Sesi tanya-jawab dan pembimbingan teknik menyusui dan posisi pelekatan.'
      },
      {
        id: "mommy-prolaktin-accupressure",
        title: 'Prolaktin Accupressure',
        description: 'Terapi tekanan ringan pada titik refleksi prolaktin untuk meningkatkan produksi ASI.'
      },
      {
        id: "mommy-oksitosin-accupressure",
        title: 'Oksitosin Accupressure',
        description: 'Tekanan pada titik oksitosin untuk membantu keluarnya ASI lebih lancar.'
      },
      {
        id: "mommy-breast-accupressure",
        title: 'Breast Accupressure',
        description: 'Pijat lembut untuk melancarkan aliran ASI dan mencegah sumbatan saluran.'
      },
      {
        id: "mommy-relaktasi",
        title: 'Relaktasi',
        description: 'Program untuk ibu yang sempat berhenti menyusui agar kembali lancar.'
      },
      {
        id: "mommy-terapi-bingung-puting",
        title: 'Terapi Bingung Puting',
        description: 'Bimbingan untuk bayi yang kesulitan beradaptasi antara puting dan dot.'
      }
    ],
  },
  {
    id: "category-baby",
    icon: 'fa-baby',
    title: 'Baby Treatment (Usia 0–12 Bulan)',
    description: 'Perawatan dan terapi khusus untuk bayi usia 0-12 bulan.',
    category: "baby",
    subServices: [
      {
        id: "baby-pijat-bayi",
        title: 'Pijat Bayi',
        description: 'Pijat lembut sesuai usia untuk stimulasi saraf, relaksasi, dan meredakan kolik.'
      },
      {
        id: "baby-oral-care",
        title: 'Oral Care',
        description: 'Perawatan mulut bayi untuk mencegah infeksi dan menyiapkan pola makan.'
      },
      {
        id: "baby-brain-gym",
        title: 'Baby Brain Gym',
        description: 'Latihan sensorik dan motorik ringan untuk mendukung perkembangan otak.'
      },
      {
        id: "baby-pijat-terapi",
        title: 'Pijat Terapi (Diare/Sembelit/Kolik)',
        description: 'Teknik pijat fokus area perut untuk membantu meredakan masalah pencernaan.'
      },
      {
        id: "baby-tindik-telinga",
        title: 'Tindik Telinga Manual',
        description: 'Layanan tindik telinga bayi dengan metode steril dan aman.'
      },
      {
        id: "baby-cukur-rambut",
        title: 'Cukur Rambut & Potong Kuku',
        description: 'Perawatan kebersihan rambut dan kuku bayi oleh tenaga profesional.'
      }
    ],
  },
  {
    id: "category-toddler",
    icon: 'fa-child',
    title: 'Toddler Treatment (Usia 13–60 Bulan)',
    description: 'Layanan perawatan dan terapi untuk anak usia 13-60 bulan.',
    category: "toddler",
    subServices: [
      {
        id: "toddler-pijat",
        title: 'Pijat Toddler',
        description: 'Pijat ringan sesuai usia untuk relaksasi otot dan memperbaiki kualitas tidur.'
      },
      {
        id: "toddler-oral-care",
        title: 'Oral Care',
        description: 'Edukasi & perawatan kebersihan gigi susu untuk mencegah karies dini.'
      },
      {
        id: "toddler-brain-gym",
        title: 'Baby Brain Gym',
        description: 'Latihan motorik halus dan kasar untuk mendukung tumbuh kembang aktif anak.'
      },
      {
        id: "toddler-pijat-terapi",
        title: 'Pijat Terapi (Diare/Sembelit/Kolik)',
        description: 'Terapi pijat area perut untuk menenangkan gangguan pencernaan.'
      },
      {
        id: "toddler-paket-gtm",
        title: 'Paket GTM (Geredukasi Terapi Makan)',
        description: 'Kombinasi pijat oromotor dan konsultasi pola makan.'
      }
    ],
  },
  {
    id: "category-kelas",
    icon: 'fa-chalkboard-teacher',
    title: 'Kelas & Pelatihan',
    description: 'Program edukasi intensif untuk ibu hamil dan ibu baru.',
    category: "kelas",
    subServices: [
      {
        id: "kelas-persiapan-menyusui",
        title: 'Kelas Persiapan Menyusui Private',
        description: 'Workshop satu-satu membahas teori dan praktik menyusui sebelum melahirkan.'
      },
      {
        id: "kelas-manajemen-laktasi",
        title: 'Kelas Manajemen Laktasi untuk Ibu Bekerja',
        description: 'Strategi menyusui, pumping, dan penyimpanan ASI bagi ibu yang bekerja.'
      },
      {
        id: "kelas-newborn",
        title: 'Kelas Newborn',
        description: 'Pelatihan perawatan bayi baru lahir: memandikan, memijat, dan mengganti popok.'
      }
    ],
  },
  {
    id: "category-homevisit",
    icon: 'fa-home',
    title: 'Paket Home Visit',
    description: 'Layanan kunjungan rumah dengan berbagai pilihan durasi.',
    category: "homevisit",
    subServices: [
      {
        id: "homevisit-1hari",
        title: 'Paket 1 Hari Bersama Bidan Irma',
        description: 'Pendampingan penuh satu hari mencakup pijat, konsultasi, dan perawatan dasar.'
      },
      {
        id: "homevisit-3hari",
        title: 'Paket 3 Hari Bersama Bidan Irma',
        description: 'Kunjungan berurutan selama tiga hari untuk pemantauan menyeluruh.'
      },
      {
        id: "homevisit-7hari",
        title: 'Paket 7 Hari Bersama Bidan Irma',
        description: 'Program satu minggu lengkap: daily check-up, pijat, dan bimbingan pola asuh.'
      }
    ],
  },
  {
    id: "category-persalinan",
    icon: 'fa-baby-carriage',
    title: 'Persalinan Normal',
    description: 'Pendampingan persalinan normal dengan fasilitas yang nyaman.',
    category: "persalinan",
    subServices: [
      {
        id: "persalinan-persiapan",
        title: 'Persiapan Persalinan',
        description: 'Persiapan persalinan dengan fasilitas lengkap dan pemeriksaan pra-persalinan.'
      },
      {
        id: "persalinan-monitoring",
        title: 'Monitoring Selama Persalinan',
        description: 'Monitoring kesehatan ibu dan bayi selama seluruh proses persalinan.'
      },
      {
        id: "persalinan-postpartum",
        title: 'Perawatan Postpartum',
        description: 'Perawatan postpartum untuk ibu dan bayi baru lahir setelah persalinan.'
      },
      {
        id: "persalinan-imd",
        title: 'Inisiasi Menyusu Dini (IMD)',
        description: 'Pendampingan proses IMD setelah persalinan.'
      }
    ],
  },
];

// Step-by-step form
const AppointmentPage: React.FC = () => {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(true);
  
  // Efek untuk memastikan navbar selalu memiliki background
  useEffect(() => {
    // Menambahkan class pada body untuk styling navbar
    document.body.classList.add('page-with-bg');
    
    // Cleanup function
    return () => {
      document.body.classList.remove('page-with-bg');
    };
  }, []);
  
  // Step management - multi-step form
  const [currentStep, setCurrentStep] = useState(1);
  
  // Form state - dasar
  const [name, setName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [notes, setNotes] = useState('');
  
  // State untuk layanan
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [selectedServices, setSelectedServices] = useState<Array<{
    id: string;
    title: string;
    category: string;
  }>>([]);
  
  // Validasi nomor WhatsApp
  const validateWhatsApp = (number: string) => {
    const regex = /^(08|\+628)[0-9]{8,13}$/
    return regex.test(number);
  };

  // Step 1 validation
  const isStep1Valid = () => {
    return name.trim() !== '' && 
           validateWhatsApp(whatsapp) && 
           date !== '' && 
           time !== '';
  };
  
  // Step 2 validation
  const isStep2Valid = () => {
    return selectedServices.length > 0;
  };
  
  // Handler untuk layanan
  const handleToggleCategory = (categoryId: string) => {
    setExpandedCategory(prev => prev === categoryId ? null : categoryId);
  };
  
  const handleToggleService = (serviceId: string, serviceTitle: string, categoryTitle: string) => {
    setSelectedServices(prev => {
      const isSelected = prev.some(s => s.id === serviceId);
      
      if (isSelected) {
        return prev.filter(s => s.id !== serviceId);
      } else {
        return [...prev, {
          id: serviceId,
          title: serviceTitle,
          category: categoryTitle
        }];
      }
    });
  };
  
  // Navigation handlers
  const goToNextStep = () => {
    if (currentStep === 1 && isStep1Valid()) {
      setCurrentStep(2);
    } else if (currentStep === 2 && isStep2Valid()) {
      setCurrentStep(3);
    }
  };
  
  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  // Submit form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isStep1Valid() && isStep2Valid()) {
      alert('Janji berhasil dibuat! Kami akan menghubungi Anda melalui WhatsApp untuk konfirmasi.');
      router.push('/');
    }
  };
  
  return (
    <>
      <Navbar />
      
      <div className="bg-gray-100 py-12 min-h-screen">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 border border-gray-200">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Buat Janji dengan Bidan Irma</h1>
              <p className="text-gray-600">Isi formulir di bawah ini untuk membuat janji layanan di Praktik Bidan Irma</p>
            </div>
            
            {/* Step indicator */}
            <div className="flex mb-8 justify-center">
              <div className="w-full max-w-xs">
                <div className="relative">
                  <div className="flex justify-between mb-1">
                    <div className={`flex flex-col items-center ${currentStep >= 1 ? 'text-[#FAAFBE]' : 'text-gray-400'}`}>
                      <div className={`rounded-full h-8 w-8 flex items-center justify-center ${currentStep >= 1 ? 'bg-[#FAAFBE] text-white' : 'bg-gray-200'}`}>
                        1
                      </div>
                      <span className="text-xs mt-1">Informasi</span>
                    </div>
                    <div className={`flex flex-col items-center ${currentStep >= 2 ? 'text-[#FAAFBE]' : 'text-gray-400'}`}>
                      <div className={`rounded-full h-8 w-8 flex items-center justify-center ${currentStep >= 2 ? 'bg-[#FAAFBE] text-white' : 'bg-gray-200'}`}>
                        2
                      </div>
                      <span className="text-xs mt-1">Layanan</span>
                    </div>
                    <div className={`flex flex-col items-center ${currentStep >= 3 ? 'text-[#FAAFBE]' : 'text-gray-400'}`}>
                      <div className={`rounded-full h-8 w-8 flex items-center justify-center ${currentStep >= 3 ? 'bg-[#FAAFBE] text-white' : 'bg-gray-200'}`}>
                        3
                      </div>
                      <span className="text-xs mt-1">Konfirmasi</span>
                    </div>
                  </div>
                  <div className="relative flex items-center justify-between">
                    <div className="absolute left-0 right-0 h-1 top-1/2 -translate-y-1/2 bg-gray-200">
                      <div 
                        className="h-full bg-[#FAAFBE] transition-all duration-300" 
                        style={{ width: `${(currentStep - 1) * 50}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Step 1: Informasi Pribadi dan Jadwal */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  {/* Nama Lengkap */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Nama Lengkap
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FAAFBE] focus:border-transparent text-gray-900 font-medium placeholder-gray-500"
                      placeholder="Masukkan nama lengkap Anda"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>

                  {/* Nomor WhatsApp */}
                  <div>
                    <label htmlFor="whatsapp" className="block text-sm font-medium text-gray-700 mb-1">
                      Nomor WhatsApp (Aktif)
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        id="whatsapp"
                        className={`w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:border-transparent text-gray-900 font-medium placeholder-gray-500 ${
                          whatsapp && !validateWhatsApp(whatsapp) 
                            ? 'border-red-500 focus:ring-red-500' 
                            : 'border-gray-300 focus:ring-[#FAAFBE]'
                        }`}
                        placeholder="Contoh: 08123456789 atau +6281234567890"
                        value={whatsapp}
                        onChange={(e) => setWhatsapp(e.target.value)}
                        required
                      />
                      {whatsapp && !validateWhatsApp(whatsapp) && (
                        <p className="text-red-500 text-xs mt-1">
                          Format nomor tidak valid. Gunakan format 08... atau +628...
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Tanggal dan Waktu */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                        Pilih Tanggal
                      </label>
                      <input
                        type="date"
                        id="date"
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FAAFBE] focus:border-transparent text-gray-900 font-medium"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
                        Pilih Waktu
                      </label>
                      <select
                        id="time"
                        className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FAAFBE] focus:border-transparent text-gray-900 font-medium"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        required
                      >
                        <option value="" className="text-gray-500">Pilih waktu</option>
                        <option value="08:00">08:00 WIB</option>
                        <option value="09:00">09:00 WIB</option>
                        <option value="10:00">10:00 WIB</option>
                        <option value="11:00">11:00 WIB</option>
                        <option value="13:00">13:00 WIB</option>
                        <option value="14:00">14:00 WIB</option>
                        <option value="15:00">15:00 WIB</option>
                        <option value="16:00">16:00 WIB</option>
                        <option value="17:00">17:00 WIB</option>
                        <option value="18:00">18:00 WIB</option>
                        <option value="19:00">19:00 WIB</option>
                      </select>
                    </div>
                  </div>
                  
                  {/* Catatan / Keluhan */}
                  <div>
                    <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                      Catatan / Keluhan (Opsional)
                    </label>
                    <textarea
                      id="notes"
                      className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FAAFBE] focus:border-transparent text-gray-900 font-medium placeholder-gray-500"
                      placeholder="Tuliskan catatan atau keluhan Anda (opsional)"
                      rows={4}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                    ></textarea>
                  </div>
                </div>
              )}
              
              {/* Step 2: Pilih Layanan */}
              {currentStep === 2 && (
                <div className="space-y-4">
                  <p className="text-sm text-gray-700 mb-4">
                    Pilih layanan yang Anda butuhkan (bisa lebih dari satu):
                  </p>
                  
                  {serviceCategories.map(category => (
                    <div key={category.id} className="border rounded-lg shadow-sm overflow-hidden">
                      <div 
                        className="p-4 bg-white cursor-pointer flex items-center justify-between"
                        onClick={() => handleToggleCategory(category.id)}
                      >
                        <div className="flex items-center">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                            expandedCategory === category.id ? 'bg-[#FAAFBE]' : 'bg-gray-100'
                          }`}>
                            <i 
                              className={`fas ${category.icon}`}
                              style={{ color: expandedCategory === category.id ? '#000000' : '#FAAFBE' }}
                            ></i>
                          </div>
                          <div>
                            <h3 className="font-medium">{category.title}</h3>
                            <p className="text-sm text-gray-500">{category.description}</p>
                          </div>
                        </div>
                        <i className={`fas fa-chevron-${expandedCategory === category.id ? 'up' : 'down'} text-gray-400`}></i>
                      </div>
                      
                      {expandedCategory === category.id && (
                        <div className="border-t p-4 bg-gray-50">
                          <div className="space-y-2">
                            {category.subServices.map(service => {
                              const isSelected = selectedServices.some(s => s.id === service.id);
                              
                              return (
                                <div 
                                  key={service.id}
                                  className={`p-3 rounded border ${
                                    isSelected 
                                      ? 'border-[#FAAFBE] bg-pink-50' 
                                      : 'border-gray-200 bg-white'
                                  } cursor-pointer`}
                                  onClick={() => handleToggleService(
                                    service.id, 
                                    service.title, 
                                    category.title
                                  )}
                                >
                                  <div className="flex items-center justify-between">
                                    <div>
                                      <h4 className="font-medium text-sm">{service.title}</h4>
                                      <p className="text-xs text-gray-500 mt-1">{service.description}</p>
                                    </div>
                                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                                      isSelected 
                                        ? 'border-[#FAAFBE] bg-[#FAAFBE]' 
                                        : 'border-gray-300'
                                    }`}>
                                      {isSelected && <i className="fas fa-check text-black text-xs"></i>}
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                  
                  {/* Selected services summary */}
                  {selectedServices.length > 0 && (
                    <div className="mt-6 p-4 bg-gray-50 rounded-lg border">
                      <h3 className="text-sm font-medium text-gray-700 mb-2">Layanan terpilih:</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedServices.map(service => (
                          <span 
                            key={service.id}
                            className="inline-flex bg-pink-50 text-[#FAAFBE] text-xs py-1 px-3 rounded-full"
                          >
                            {service.title}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
              
              {/* Step 3: Konfirmasi */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <h3 className="text-lg font-medium text-gray-900">Konfirmasi Janji</h3>
                  <p className="text-sm text-gray-600">Silakan periksa kembali detail janji Anda:</p>
                  
                  <div className="bg-gray-50 p-4 rounded-lg border space-y-4">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="text-gray-500">Nama Lengkap:</div>
                      <div className="font-medium">{name}</div>
                      
                      <div className="text-gray-500">Nomor WhatsApp:</div>
                      <div className="font-medium">{whatsapp}</div>
                      
                      <div className="text-gray-500">Tanggal & Waktu:</div>
                      <div className="font-medium">
                        {date && new Date(date).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} - {time} WIB (Waktu Indonesia Barat)
                      </div>
                      
                      {notes && (
                        <>
                          <div className="text-gray-500">Catatan:</div>
                          <div className="font-medium">{notes}</div>
                        </>
                      )}
                    </div>
                    
                    <div>
                      <div className="text-gray-500 text-sm mb-2">Layanan:</div>
                      <div className="flex flex-wrap gap-2">
                        {selectedServices.map(service => (
                          <span 
                            key={service.id}
                            className="inline-flex bg-pink-50 text-[#FAAFBE] text-xs py-1 px-3 rounded-full"
                          >
                            {service.title} ({service.category})
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Navigation buttons */}
              <div className="flex justify-between pt-4">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={goToPreviousStep}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Kembali
                  </button>
                ) : (
                  <div></div> // Placeholder for layout
                )}
                
                {currentStep < 3 ? (
                  <button
                    type="button"
                    onClick={goToNextStep}
                    className={`px-4 py-2 rounded-md text-white ${
                      (currentStep === 1 && isStep1Valid()) || (currentStep === 2 && isStep2Valid())
                        ? 'bg-[#FAAFBE] hover:bg-[#F08080]'
                        : 'bg-gray-300 cursor-not-allowed'
                    }`}
                    disabled={
                      (currentStep === 1 && !isStep1Valid()) || 
                      (currentStep === 2 && !isStep2Valid())
                    }
                  >
                    Lanjutkan
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#FAAFBE] text-white rounded-md hover:bg-[#F08080]"
                  >
                    Buat Janji
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>

      <Footer />
      <ChatWidget />
      <BackToTopButton />
      <ScrollTo />
    </>
  );
};

export default AppointmentPage; 