"use client";

import React, { useEffect, useRef, useCallback, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { FadeUp, FadeIn, StaggerGrid, staggerItem, motion } from "@/utils/animations";

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

const cultureGallery = [
  {
    title: "Blister Strip Sealing Line",
    description: "Our skilled technician operates the automated blister strip sealing machine, ensuring every tablet batch is hermetically packed and export-ready under GMP standards.",
    image: "/working/with_machine1.jpeg",
  },
  {
    title: "Capsule Filling & Dosing",
    description: "Hands-on operation of the capsule filling machine — precision-dosing active pharmaceutical ingredients at our Baddi manufacturing facility.",
    image: "/working/with_machine2.jpeg",
  },
  {
    title: "Tablet Strip Packaging",
    description: "Experienced operator managing the D-3130 strip packaging line, maintaining speed and sterility across high-volume production batches.",
    image: "/working/with_machine3.jpeg",
  },
  {
    title: "Operations & Admin Team",
    description: "Our dedicated operations and administrative staff managing orders, documentation, and client coordination from our modern Baddi office.",
    image: "/working/seating_area.jpeg",
  },
];

interface EventPhoto {
  src: string;
  title: string;
  caption: string;
}

interface EventItem {
  id: string;
  title: string;
  badge: string;
  category: "Exhibition" | "Award" | "Corporate";
  date: string;
  city: string;
  venue: string;
  stall?: string;
  icon: string;
  coverImage: string;
  photos: EventPhoto[];
  overview: string;
  keyHighlights: string[];
  productsShowcased: string[];
  delegation: string[];
}

const pastEvents: EventItem[] = [
  {
    id: "award-himachal-2024",
    title: "Himachal Pradesh Pharmaceutical Excellence & Leadership Award",
    badge: "State Felicitation",
    category: "Award",
    date: "October 2024",
    city: "Shimla, HP",
    venue: "State Industry Felicitation Conclave, Shimla",
    stall: "Dignitary Honors Stage",
    icon: "emoji_events",
    coverImage: "/event/himachal_pharma_excellence_award.jpg",
    photos: [
      {
        src: "/event/himachal_pharma_excellence_award.jpg",
        title: "Felicitation Ceremony with Senior Dignitaries",
        caption: "Managing Director Naveen Kandpal and senior executive team receiving the state excellence award for pharmaceutical manufacturing standards."
      }
    ],
    overview: "Fortschritt Healthcare Limited was formally conferred the prestigious Pharmaceutical Manufacturing Excellence Award at the state-level industry felicitation ceremony in Himachal Pradesh. The honor recognizes our relentless adherence to WHO-GMP benchmarks, robust quality management systems across solid orals, and our pivotal contribution to reliable healthcare supply chains and contract manufacturing across India.",
    keyHighlights: [
      "Felicitated in the presence of distinguished state leadership and pharmaceutical regulatory heads.",
      "Recognized for zero-compromise quality assurance and WHO-GMP compliant facility operations in Baddi.",
      "Acknowledged for advancing indigenous third-party and contract manufacturing capabilities across 1000+ formulations.",
      "Commended for continuous investments in advanced testing instrumentation, HPLC systems, and cleanroom technologies."
    ],
    productsShowcased: [
      "WHO-GMP Solid Orals (Tablets & Capsules)",
      "Critical Hormonal Therapy Formulations",
      "High-Bioavailability Extended Release Tablets",
      "Nutraceutical Sachet & Protein Powder Lines"
    ],
    delegation: [
      "Mr. Naveen Kandpal (Managing Director)",
      "Senior Plant Operations & Regulatory Affairs Heads",
      "Quality Assurance & Analytical Chemistry Leads"
    ]
  },
  {
    id: "team-baddi-2024",
    title: "Annual Plant Team Felicitation & Safety Milestone Celebration",
    badge: "Workforce Milestone",
    category: "Corporate",
    date: "December 2024",
    city: "Baddi, HP",
    venue: "Fortschritt Manufacturing Facility & Campus, DIC Industrial Area, Baddi",
    stall: "Baddi Plant Central Assembly",
    icon: "celebration",
    coverImage: "/event/baddi_plant_team_annual_celebration.jpg",
    photos: [
      {
        src: "/event/baddi_plant_team_annual_celebration.jpg",
        title: "All-Staff Safety & Quality Assembly",
        caption: "Operations, engineering, QC/QA, and packaging staff gathered at our Baddi manufacturing facility celebrating safe production milestones."
      }
    ],
    overview: "Fortschritt Healthcare celebrated its annual workforce milestone assembly at our Baddi manufacturing facility, honoring over 100 technical operators, formulation scientists, packaging specialists, and QA personnel. The gathering celebrated over 1,200 consecutive safe production days without lost-time incidents and recognized individual staff members for outstanding dedication to cGMP hygiene, precision dosing, and zero-defect packaging.",
    keyHighlights: [
      "Over 100+ team members felicitated across Quality, Production, Engineering, and Logistics divisions.",
      "Celebrated 1,200+ consecutive days of zero lost-time incidents under stringent EHS protocols.",
      "Outstanding Operator and Best Maintenance Team awards presented by the executive leadership.",
      "Annual review of plant automation upgrades and operator skill enhancement programs."
    ],
    productsShowcased: [
      "Quality Culture in High-Speed Blister Sealing",
      "Precision Dosing in Automatic Capsule Filling",
      "Standard Operating Procedures (SOP) Compliance",
      "Cross-Contamination Prevention & Cleanroom Protocols"
    ],
    delegation: [
      "Leadership Team, Plant Heads & Quality Control Managers",
      "Entire Baddi Manufacturing & Operations Family"
    ]
  },
  {
    id: "expo-bangalore-2025",
    title: "Bangalore International Pharma Expo & B2B Conclave",
    badge: "South India Expo",
    category: "Exhibition",
    date: "November 2025",
    city: "Bengaluru, Karnataka",
    venue: "Bangalore International Exhibition Centre (BIEC), Bengaluru",
    stall: "Pavilion 2 — Booth B-14 & B-15",
    icon: "store",
    coverImage: "/event/BangaloreExhibitionPhotos/bangalore_booth_overview.webp",
    photos: [
      {
        src: "/event/BangaloreExhibitionPhotos/bangalore_booth_overview.webp",
        title: "Fortschritt Pavilion Overview",
        caption: "Custom-designed exhibition pavilion showcasing our diversified 1000+ formulation capabilities."
      },
      {
        src: "/event/BangaloreExhibitionPhotos/bangalore_team_at_stall.webp",
        title: "Director & Technical Delegation at Booth",
        caption: "Director Chander Mohan Negi and commercial leads engaging with South Indian pharmaceutical distributors."
      },
      {
        src: "/event/BangaloreExhibitionPhotos/bangalore_product_display.webp",
        title: "Formulations & Sample Showcase",
        caption: "Display of finished dosage forms: tablets, softgel capsules, hormonal therapies, and sachets."
      },
      {
        src: "/event/BangaloreExhibitionPhotos/bangalore_visitor_interaction.webp",
        title: "B2B Buyer & Formulary Discussions",
        caption: "Strategic discussions with hospital pharmacy procurement directors and pharma brand owners."
      },
      {
        src: "/event/BangaloreExhibitionPhotos/bangalore_exhibition_hall.webp",
        title: "Central Exhibition Concourse",
        caption: "Pan-India presence at one of Asia's most prominent pharmaceutical trade gatherings."
      },
      {
        src: "/event/BangaloreExhibitionPhotos/bangalore_stall_setup_1.webp",
        title: "Branded Showcase & Packaging Display",
        caption: "Detailing strip packaging standards, alu-alu blisters, and export-grade finished goods."
      },
      {
        src: "/event/BangaloreExhibitionPhotos/bangalore_stall_setup_2.webp",
        title: "Contract Manufacturing Consultation Zone",
        caption: "Dedicated area for prospective pharma franchise partners and contract manufacturing inquiries."
      },
      {
        src: "/event/BangaloreExhibitionPhotos/bangalore_team_group.webp",
        title: "South India Regional Delegation",
        caption: "Commercial representatives and field technical support leads at the Bangalore summit."
      },
      {
        src: "/event/BangaloreExhibitionPhotos/bangalore_brochure_display.webp",
        title: "Product Compendium & Literature Desk",
        caption: "Comprehensive product catalogues and dossier summaries distributed to 400+ verified trade delegates."
      }
    ],
    overview: "At the Bangalore International Pharma Expo held at the BIEC complex, Fortschritt Healthcare presented its comprehensive contract manufacturing and formulation capabilities to healthcare distributors, hospital purchase executives, and brand marketers from Karnataka, Tamil Nadu, Andhra Pradesh, and Telangana. The summit served as a springboard for expanding the company's third-party manufacturing footprint in South India, generating strong buyer engagement for our high-capacity hormonal lines and specialized 4G/9G softgel capsules.",
    keyHighlights: [
      "450+ verified business inquiries recorded across 3 intensive trade exhibition days.",
      "18 preliminary contract manufacturing memoranda initiated with regional pharmaceutical marketers.",
      "South India launch of specialized Progesterone Sustained Release & Thyroxine product dossiers.",
      "Direct technical consultations conducted on batch scale-up, stability studies, and packaging customizations."
    ],
    productsShowcased: [
      "Hormonal Care (Progesterone SR 100/200/300/400mg, Thyroxine Sodium)",
      "4G & 9G Botanical Extract + Omega-3 Softgels",
      "General Pharma Tablets (Antibiotics, Antifungals, Pain Management)",
      "Nutraceutical Sachets & High-Protein Formulations"
    ],
    delegation: [
      "Mr. Chander Mohan Negi (Director, Commercial & Strategic Marketing)",
      "Regional Institutional Sales Managers (South India)",
      "Senior Technical Formulation Liaison Officers"
    ]
  },
  {
    id: "expo-kochi-2025",
    title: "Kochi Healthcare & Pharmaceutical Trade Expo",
    badge: "Kerala Trade Expo",
    category: "Exhibition",
    date: "September 2025",
    city: "Kochi, Kerala",
    venue: "Cochin International Expo Centre, Nedumbassery, Kochi",
    stall: "Hall A — Stall No. C-08",
    icon: "store",
    coverImage: "/event/KochiExhibitionPhotos/kochi_exhibition_stall.webp",
    photos: [
      {
        src: "/event/KochiExhibitionPhotos/kochi_exhibition_stall.webp",
        title: "Fortschritt Exhibition Stall — Kochi",
        caption: "Branded pavilion welcoming trade visitors, pharmacy proprietors, and hospital buyers across Kerala."
      },
      {
        src: "/event/KochiExhibitionPhotos/kochi_team_display.webp",
        title: "Leadership & Commercial Team",
        caption: "Executive delegation showcasing third-party manufacturing solutions tailored for coastal distribution."
      },
      {
        src: "/event/KochiExhibitionPhotos/kochi_product_showcase.webp",
        title: "Pharmaceutical Formulations Showcase",
        caption: "Display of moisture-resistant alu-alu packaging ideal for tropical climatic conditions."
      },
      {
        src: "/event/KochiExhibitionPhotos/kochi_visitor_engagement.webp",
        title: "Distributor & Stockist Partnerships",
        caption: "In-depth one-on-one sessions discussing distribution logistics, margin structures, and delivery timelines."
      },
      {
        src: "/event/KochiExhibitionPhotos/kochi_team_photo.webp",
        title: "Kerala Market Launch Team",
        caption: "Commemorating successful network expansion and client onboarding across the state."
      }
    ],
    overview: "Fortschritt Healthcare established a notable presence at the Kochi Healthcare & Pharma Expo, focusing on the retail pharmacy chain networks and hospital procurement groups across Kerala. Our showcase centered on moisture-resistant Alu-Alu strip packaging optimized for tropical humidity, certified stability-tested solid orals, and flexible contract manufacturing batch sizes that empower regional marketers to launch high-quality formulations swiftly.",
    keyHighlights: [
      "Connected with 280+ retail pharmacy chain operators and ethical pharma distributors.",
      "Formulated specialized packaging solutions tailored for tropical and coastal climate storage.",
      "Onboarded 12 new PCD franchise partners across Kochi, Thiruvananthapuram, and Kozhikode.",
      "Received strong response for pediatric, gynecological, and wellness nutraceutical portfolios."
    ],
    productsShowcased: [
      "Gynecological Therapeutics & Progesterone Range",
      "Calcitriol, Calcium Citrate Malate & Vitamin D3 Softgels",
      "Prebiotic & Probiotic Digestive Formulations",
      "Gastrointestinal & Anti-Ulcerant Tablets"
    ],
    delegation: [
      "Commercial Operations Directorate",
      "Regional Supply Chain & Business Development Executives"
    ]
  },
  {
    id: "expo-kolkata-2025",
    title: "Kolkata National Pharmaceutical & Trade Expo",
    badge: "East India Expo",
    category: "Exhibition",
    date: "August 2025",
    city: "Kolkata, West Bengal",
    venue: "Biswa Bangla Mela Prangan (Milan Mela Complex), Kolkata",
    stall: "Central Concourse — Stall B-14 / Directory C-9",
    icon: "store",
    coverImage: "/event/KolkataExhibitionPhotos/kolkata_exhibition_stall.jpg",
    photos: [
      {
        src: "/event/KolkataExhibitionPhotos/kolkata_exhibition_stall.jpg",
        title: "Fortschritt Eastern India Exhibition Booth",
        caption: "The corporate pavilion highlighting our 1000+ formulations and state-of-the-art Baddi plant."
      },
      {
        src: "/event/KolkataExhibitionPhotos/kolkata_team_at_booth.jpg",
        title: "Director Chander Mohan Negi at Kolkata Expo",
        caption: "Director Chander Mohan Negi representing Fortschritt Healthcare at the official exhibition directory."
      },
      {
        src: "/event/KolkataExhibitionPhotos/kolkata_product_display.jpg",
        title: "Formulation Portfolio Display",
        caption: "Detailed presentation of General Pharma, Hormones, and Nutraceutical samples."
      },
      {
        src: "/event/KolkataExhibitionPhotos/kolkata_visitor_interaction.jpg",
        title: "Regional Distributor Negotiations",
        caption: "Engaging discussions with senior pharma distributors from West Bengal, Bihar, and Assam."
      },
      {
        src: "/event/KolkataExhibitionPhotos/kolkata_pharma_expo_hall.jpg",
        title: "Exhibition Concourse & Partner Network",
        caption: "Fostering strategic cross-border and regional pharmaceutical distribution alliances."
      }
    ],
    overview: "Marking an important strategic expansion into Eastern India and neighboring supply corridors, Fortschritt Healthcare actively participated in the Kolkata National Pharmaceutical Expo. The event brought together major stockists, institutional buyers, and pharmaceutical marketers from West Bengal, Odisha, Bihar, Jharkhand, and the Northeastern states. Our delegation presented our scalable production capabilities, rapid delivery timelines, and full analytical dossier support.",
    keyHighlights: [
      "Expanded distributor presence across 5 Eastern states (West Bengal, Odisha, Bihar, Jharkhand, Assam).",
      "Concluded 15 strategic third-party manufacturing supplier agreements for high-volume solid orals.",
      "Showcased high-capacity automated production lines: 1000+ active commercial formulation dossiers.",
      "High interest generated for cardiovascular, anti-diabetic, and gynecological sustained-release formulations."
    ],
    productsShowcased: [
      "Cardiovascular & Anti-Hypertensive Tablets (Telmisartan, Amlodipine combinations)",
      "Anti-Diabetic Bilayered Tablets (Metformin SR + Glimepiride)",
      "Hormonal Tablets (Natural Micronized Progesterone SR)",
      "Specialty Multivitamin & Mineral Nutritional Supplements"
    ],
    delegation: [
      "Mr. Chander Mohan Negi (Director, Commercial & Strategic Marketing)",
      "Eastern Regional Institutional Sales Team"
    ]
  }
];

export default function AboutPage() {
  // ── Event Gallery Modal & Filter State ──────────────────────────
  const [activeEvent, setActiveEvent] = useState<EventItem | null>(null);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeTab, setActiveTab] = useState<"overview" | "highlights" | "products" | "delegation">("overview");
  const [filterCategory, setFilterCategory] = useState<"All" | "Exhibition" | "Award" | "Corporate">("All");
  const autoSlideRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const openEvent = useCallback((evt: EventItem) => {
    setActiveEvent(evt);
    setActivePhotoIndex(0);
    setActiveTab("overview");
    setIsPlaying(true);
  }, []);

  const closeEvent = useCallback(() => {
    setActiveEvent(null);
    setActivePhotoIndex(0);
    setIsPlaying(false);
  }, []);

  const goToPhoto = useCallback((idx: number) => {
    if (!activeEvent) return;
    const total = activeEvent.photos.length;
    setActivePhotoIndex((idx + total) % total);
  }, [activeEvent]);

  // Auto-advance photos every 4s while modal is open & playing
  useEffect(() => {
    if (!activeEvent || activeEvent.photos.length <= 1 || !isPlaying) return;
    autoSlideRef.current = setInterval(() => {
      setActivePhotoIndex((prev) => (prev + 1) % activeEvent.photos.length);
    }, 4000);
    return () => {
      if (autoSlideRef.current) clearInterval(autoSlideRef.current);
    };
  }, [activeEvent, isPlaying]);

  // Lock body scroll when modal open
  useEffect(() => {
    if (activeEvent) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeEvent]);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeEvent();
      if (!activeEvent) return;
      if (e.key === "ArrowRight") goToPhoto(activePhotoIndex + 1);
      if (e.key === "ArrowLeft") goToPhoto(activePhotoIndex - 1);
      if (e.key === " ") {
        e.preventDefault();
        setIsPlaying((p) => !p);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeEvent, activePhotoIndex, closeEvent, goToPhoto]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const scrollTarget = params.get("scroll");
    if (scrollTarget) {
      setTimeout(() => {
        const element = document.getElementById(scrollTarget);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
          window.history.replaceState(null, "", "/about");
        }
      }, 200);
    }
  }, []);
return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navbar />

      {/* Hero Section (Full Screen Viewport Layout - Zero White Space at Bottom) */}
      <section className="relative min-h-screen flex flex-col justify-center bg-[#101b3b] pt-28 pb-16 overflow-hidden border-b border-slate-800">
        <div className="absolute -top-32 -right-32 w-[600px] h-[600px] bg-secondary/20 rounded-full blur-[140px]" />
        <div className="absolute -bottom-32 -left-32 w-[600px] h-[600px] bg-primary-accent/20 rounded-full blur-[140px]" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center my-auto py-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-sky-300 text-xs font-bold uppercase tracking-widest mb-4"
          >
            Corporate Overview
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.1] mb-6 tracking-tight"
          >
            About <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-blue-200 to-indigo-100">
              Fortschritt Healthcare
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-300 text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed font-medium mb-8"
          >
            Delivering quality formulations, building trusted B2B relationships, and improving patient outcomes worldwide.
          </motion.p>

          {/* About Highlights Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 max-w-4xl mx-auto pt-6 border-t border-white/10">
            <div className="flex items-center gap-3 bg-white/5 border border-white/10 p-3 rounded-2xl text-left backdrop-blur-md">
              <span className="material-icons text-sky-400 text-xl">domain</span>
              <div>
                <div className="text-white text-xs font-bold">State-of-Art Facility</div>
                <div className="text-slate-400 text-[11px]">Baddi, Himachal Pradesh</div>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white/5 border border-white/10 p-3 rounded-2xl text-left backdrop-blur-md">
              <span className="material-icons text-sky-400 text-xl">military_tech</span>
              <div>
                <div className="text-white text-xs font-bold">WHO-GMP Compliant</div>
                <div className="text-slate-400 text-[11px]">International Standards</div>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white/5 border border-white/10 p-3 rounded-2xl text-left backdrop-blur-md">
              <span className="material-icons text-sky-400 text-xl">groups</span>
              <div>
                <div className="text-white text-xs font-bold">100+ Skilled Staff</div>
                <div className="text-slate-400 text-[11px]">Pharma Experts</div>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white/5 border border-white/10 p-3 rounded-2xl text-left backdrop-blur-md">
              <span className="material-icons text-sky-400 text-xl">local_shipping</span>
              <div>
                <div className="text-white text-xs font-bold">Pan-India &amp; Global</div>
                <div className="text-slate-400 text-[11px]">B2B Partner Network</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CEO's Message Section ─────────────────────────────── */}
      <section id="ceo" className="py-24 bg-white scroll-mt-20 overflow-hidden border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20">
            
            {/* CEO Portrait */}
            <FadeIn direction="left" className="w-full lg:w-5/12 max-w-md lg:max-w-none">
              <div className="relative group">
                <div className="absolute -inset-4 rounded-[40px] bg-gradient-to-tr from-primary/20 to-secondary/20 blur-xl opacity-80 group-hover:opacity-100 transition-opacity" />
                <div className="relative overflow-hidden rounded-[36px] border-[12px] border-white shadow-[0_32px_64px_-16px_rgba(30,58,138,0.2)] bg-slate-100 aspect-[3/4]">
                  <img
                    src="/team/CEOImage.png"
                    alt="Naveen Kandpal - Managing Director, Fortschritt Healthcare"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-60" />
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <p className="text-xs font-bold uppercase tracking-widest text-slate-200 mb-1">Managing Director</p>
                    <h4 className="text-xl font-bold text-white">Naveen Kandpal</h4>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* CEO Message Content */}
            <FadeIn direction="right" className="w-full lg:w-7/12">
              <div className="text-secondary font-extrabold text-xs uppercase tracking-widest mb-3">
                Managing Director's Message
              </div>
              <div className="relative">
                <span className="absolute -top-12 -left-8 text-[120px] font-serif text-primary/5 pointer-events-none select-none">“</span>
                <h3 className="text-2xl md:text-3xl font-extrabold text-primary mb-8 relative z-10">
                  Delivering Quality Healthcare with Trust &amp; Precision
                </h3>
              </div>

              <div className="space-y-5 text-slate-600 text-base leading-relaxed font-medium">
                <p>
                  {"Mr. Naveen Kandpal is a seasoned pharmaceutical industry professional with nearly three decades of experience in business leadership, operations, and strategic management."}
                </p>
                <p>
                  {"He began his career in 1998 with "}
                  <strong className="text-primary">Rhydburg Pharmaceuticals</strong>
                  {", where he built a strong foundation in industry operations and business development. In 2000, he joined "}
                  <strong className="text-primary">Maiden Pharmaceuticals Ltd.</strong>
                  {" (Maiden Group of Companies), contributing significantly to the company's growth and expansion, and building extensive expertise in pharmaceutical manufacturing, marketing, and corporate management."}
                </p>
                <p>
                  {"In 2010, Mr. Kandpal moved to "}
                  <strong className="text-primary">Salus Pharmaceuticals</strong>
                  {", where he further strengthened his leadership credentials and played an important role in driving organizational development and business excellence."}
                </p>
                <p>
                  {"Since "}
                  <strong className="text-primary">2014</strong>
                  {", he has been associated with Fortschritt Ltd. as "}
                  <strong className="text-primary">Managing Director</strong>
                  {". Under his leadership, the company has focused on innovation, quality, operational efficiency, and sustainable growth. His strategic vision and commitment to excellence have been instrumental in advancing the organization's position in the pharmaceutical sector."}
                </p>
              </div>

              {/* Career timeline pills */}
              <div className="flex flex-wrap gap-3 mt-8">
                {[
                  { year: "1998", org: "Rhydburg Pharmaceuticals" },
                  { year: "2000", org: "Maiden Pharmaceuticals" },
                  { year: "2010", org: "Salus Pharmaceuticals" },
                  { year: "2014", org: "Fortschritt Ltd." },
                ].map((step) => (
                  <div key={step.year} className="flex items-center gap-2 bg-primary/5 border border-primary/10 rounded-full px-4 py-1.5">
                    <span className="text-xs font-extrabold text-primary">{step.year}</span>
                    <span className="text-[11px] text-slate-500 font-semibold">{step.org}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-8 border-t border-slate-200">
                <div className="text-xl font-extrabold text-primary">Naveen Kandpal</div>
                <div className="text-sm font-bold text-primary-accent uppercase tracking-wider mt-1">Managing Director</div>
                <div className="text-xs text-slate-400 mt-1">Fortschritt Healthcare Limited &nbsp;·&nbsp; Est. 2014</div>
              </div>
            </FadeIn>

          </div>
        </div>
      </section>

      {/* ── Director's Message Section ────────────────────────── */}
      <section id="director" className="py-24 bg-white scroll-mt-20 overflow-hidden border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row-reverse items-center gap-16 lg:gap-20">

            {/* Director Portrait */}
            <FadeIn direction="right" className="w-full lg:w-5/12 max-w-md lg:max-w-none">
              <div className="relative group">
                <div className="absolute -inset-4 rounded-[40px] bg-gradient-to-tr from-secondary/20 to-primary/20 blur-xl opacity-80 group-hover:opacity-100 transition-opacity" />
                <div className="relative overflow-hidden rounded-[36px] border-[12px] border-white shadow-[0_32px_64px_-16px_rgba(30,58,138,0.2)] bg-gradient-to-br from-slate-100 to-slate-200 aspect-[3/4] flex items-center justify-center">
                  <img
                    src="/team/OperationalDirectorImage.png"
                    alt="Chander Mohan Negi - Director, Fortschritt Healthcare"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-60" />
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <p className="text-xs font-bold uppercase tracking-widest text-slate-200 mb-1">Director</p>
                    <h4 className="text-xl font-bold text-white">Chander Mohan Negi</h4>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Director Message Content */}
            <FadeIn direction="left" className="w-full lg:w-7/12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 text-secondary text-[10px] font-bold uppercase tracking-widest mb-6">
                {"Director's Message"}
              </div>
              <div className="relative">
                <span className="absolute -top-12 -left-8 text-[120px] font-serif text-secondary/5 pointer-events-none select-none">"</span>
                <h3 className="text-2xl md:text-3xl font-extrabold text-primary mb-8 relative z-10">
                  {"Building Brands, Shaping Healthcare Markets with Integrity"}
                </h3>
              </div>

              <div className="space-y-5 text-slate-600 text-base leading-relaxed font-medium">
                <p>
                  {"Mr. Chander Mohan Negi is a distinguished pharmaceutical professional with over 26 years of experience in pharmaceutical marketing, business development, and strategic brand management. He holds an "}
                  <strong className="text-primary">MBA</strong>
                  {" and "}
                  <strong className="text-primary">MCA</strong>
                  {", bringing together strong business leadership and technical expertise."}
                </p>
                <p>
                  {"Mr. Negi began his pharmaceutical career with "}
                  <strong className="text-primary">Wander Pharmaceuticals</strong>
                  {", where he established a solid foundation in pharmaceutical sales and marketing. In 2010, he joined "}
                  <strong className="text-primary">Akumentis Healthcare</strong>
                  {", where he gained extensive experience in product promotion, market development, and customer relationship management."}
                </p>
                <p>
                  {"In 2016, he joined "}
                  <strong className="text-primary">Fortschritt Healthcare Ltd.</strong>
                  {", contributing to the company's growth through strategic marketing initiatives and business expansion. Since 2017, he has been associated with both Fortschritt Healthcare Ltd. and "}
                  <strong className="text-primary">Menschlich Healthcare</strong>
                  {", playing a key role in driving business growth, strengthening market presence, and developing innovative healthcare solutions."}
                </p>
                <p>
                  {"Under his guidance, Menschlich Healthcare continues to focus on delivering high-quality, affordable, and innovative pharmaceutical products while building lasting relationships with healthcare professionals and improving patient outcomes."}
                </p>
              </div>

              {/* Career timeline pills */}
              <div className="flex flex-wrap gap-3 mt-8">
                {[
                  { year: "Early Career", org: "Wander Pharmaceuticals" },
                  { year: "2010", org: "Akumentis Healthcare" },
                  { year: "2016", org: "Fortschritt Healthcare" },
                  { year: "2017", org: "Menschlich Healthcare" },
                ].map((step) => (
                  <div key={step.year} className="flex items-center gap-2 bg-secondary/5 border border-secondary/15 rounded-full px-4 py-1.5">
                    <span className="text-xs font-extrabold text-secondary">{step.year}</span>
                    <span className="text-[11px] text-slate-500 font-semibold">{step.org}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-8 border-t border-slate-200">
                <div className="text-xl font-extrabold text-primary">Chander Mohan Negi</div>
                <div className="text-sm font-bold text-secondary uppercase tracking-wider mt-1">Director</div>
                <div className="text-xs text-slate-400 mt-1">Fortschritt Healthcare Limited &nbsp;·&nbsp; Menschlich Healthcare</div>
              </div>
            </FadeIn>

          </div>
        </div>
      </section>

      {/* ── Our Team & Culture Section ────────────────────────── */}
      <section id="team" className="py-24 bg-white scroll-mt-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <FadeUp className="text-center max-w-3xl mx-auto mb-20">
            <div className="text-secondary font-extrabold text-xs uppercase tracking-widest mb-3">
              Our Culture & Team
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-primary mb-4">
              Our Workforce in Action
            </h2>
            <p className="text-slate-500 text-lg leading-relaxed font-medium">
              A glimpse into the daily focus, research collaboration, sterile packing, and dispatch operations at our Baddi plant.
            </p>
          </FadeUp>

          {/* Workforce Gallery Grid */}
          <StaggerGrid className="grid grid-cols-1 sm:grid-cols-2 gap-10 max-w-5xl mx-auto">
            {cultureGallery.map((item) => (
              <motion.div
                key={item.title}
                variants={staggerItem}
                className="group relative rounded-[32px] overflow-hidden border border-slate-100 bg-white shadow-md hover:shadow-xl transition-all duration-500"
              >
                {/* Visual */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/15 to-transparent opacity-65" />
                </div>
                
                {/* Overlay Text info */}
                <div className="p-6 md:p-8 bg-white relative z-10 border-t border-slate-50">
                  <h4 className="text-lg font-bold text-primary group-hover:text-primary-accent transition-colors mb-2">
                    {item.title}
                  </h4>
                  <p className="text-slate-500 text-sm leading-relaxed font-medium">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </StaggerGrid>

        </div>
      </section>


      
      {/* ── Past Events Section ────────────────────────────────── */}
      <section id="events" className="py-24 bg-slate-50 scroll-mt-20 overflow-hidden border-t border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <FadeUp className="text-center max-w-3xl mx-auto">
            <div className="text-secondary font-extrabold text-xs uppercase tracking-widest mb-3">
              Events &amp; Industry Highlights
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-primary mb-4 tracking-tight">
              Company Highlights &amp; Trade Activities
            </h2>
            <p className="text-slate-500 text-base sm:text-lg leading-relaxed font-medium mb-8">
              Explore our pan-India trade exhibitions, state pharmaceutical leadership honors, and manufacturing team milestone assemblies.
            </p>

            {/* Category Filter Pills */}
            <div className="inline-flex items-center gap-1.5 p-1.5 bg-white rounded-2xl border border-slate-200/80 shadow-xs">
              {[
                { id: "All", label: "All Events (5)" },
                { id: "Exhibition", label: "Trade Exhibitions (3)" },
                { id: "Award", label: "Excellence Awards (1)" },
                { id: "Corporate", label: "Workforce & Culture (1)" },
              ].map((tab) => {
                const isSelected = filterCategory === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setFilterCategory(tab.id as any)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      isSelected
                        ? "bg-primary text-white shadow-sm"
                        : "text-slate-600 hover:text-primary hover:bg-slate-50"
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </FadeUp>
        </div>

        {/* 5-Event Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
          <StaggerGrid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {pastEvents
              .filter((evt) => filterCategory === "All" || evt.category === filterCategory)
              .map((evt) => (
                <motion.button
                  key={evt.id}
                  variants={staggerItem}
                  onClick={() => openEvent(evt)}
                  className="group relative rounded-[32px] overflow-hidden border border-slate-200/70 bg-white hover:-translate-y-2 hover:shadow-2xl hover:border-primary/30 transition-all duration-300 shadow-sm text-left cursor-pointer w-full flex flex-col justify-between"
                >
                  <div>
                    {/* Cover Image Container */}
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900">
                      <img
                        src={evt.coverImage}
                        alt={evt.title}
                        draggable={false}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 pointer-events-none"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent" />

                      {/* Photo count badge */}
                      <div className="absolute top-3.5 right-3.5 flex items-center gap-1.5 bg-black/60 text-white text-[11px] font-bold px-3 py-1.5 rounded-full backdrop-blur-md border border-white/10 shadow-sm">
                        <span className="material-icons text-xs text-sky-400">photo_library</span>
                        <span>{evt.photos.length} {evt.photos.length === 1 ? "Photo" : "Photos"}</span>
                      </div>

                      {/* Badge / Category */}
                      <div className="absolute top-3.5 left-3.5 flex items-center gap-1.5">
                        <span className="bg-primary/90 text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full backdrop-blur-md shadow-sm">
                          {evt.badge}
                        </span>
                      </div>

                      {/* City & Venue info floating at bottom of image */}
                      <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-center justify-between text-white text-xs font-semibold">
                        <span className="flex items-center gap-1 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-lg">
                          <span className="material-icons text-sm text-sky-400">location_on</span>
                          {evt.city}
                        </span>
                        <span className="text-[11px] text-slate-300 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-lg">
                          {evt.date}
                        </span>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-6 sm:p-7">
                      <div className="flex items-start gap-3.5 mb-3">
                        <div className="w-10 h-10 rounded-2xl bg-primary/5 flex items-center justify-center text-primary flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                          <span className="material-icons text-lg">{evt.icon}</span>
                        </div>
                        <h4 className="text-base sm:text-lg font-bold text-primary group-hover:text-secondary transition-colors pt-1 leading-snug">
                          {evt.title}
                        </h4>
                      </div>

                      <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-medium line-clamp-3 mb-4">
                        {evt.overview}
                      </p>

                      {/* Venue highlight snippet */}
                      <div className="py-2.5 px-3 rounded-xl bg-slate-50 border border-slate-100 text-[11px] font-semibold text-slate-600 flex items-center gap-2">
                        <span className="material-icons text-xs text-secondary flex-shrink-0">apartment</span>
                        <span className="truncate">{evt.venue}</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="px-6 sm:px-7 pb-6 pt-0">
                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-secondary group-hover:text-primary transition-colors">
                      <span className="flex items-center gap-1.5">
                        <span className="material-icons text-sm">visibility</span>
                        View Gallery &amp; Full Dossier
                      </span>
                      <span className="material-icons text-sm group-hover:translate-x-1.5 transition-transform">arrow_forward</span>
                    </div>
                  </div>
                </motion.button>
              ))}
          </StaggerGrid>
        </div>
      </section>

      {/* ── Event Photo Gallery & Full Dossier Modal ───────────────── */}
      {activeEvent && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-hidden"
          onClick={closeEvent}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md" />

          {/* Master Modal Box */}
          <div
            className="relative z-10 w-full max-w-7xl h-[94vh] max-h-[920px] bg-slate-900 rounded-[28px] sm:rounded-[36px] overflow-hidden shadow-2xl border border-white/10 flex flex-col lg:grid lg:grid-cols-12"
            onClick={(e) => e.stopPropagation()}
          >
            {/* ── LEFT COLUMN: ZERO-CROP THEATER (lg:col-span-7 xl:col-span-8) ── */}
            <div className="lg:col-span-7 xl:col-span-8 flex flex-col h-full bg-slate-950 border-b lg:border-b-0 lg:border-r border-white/10 relative overflow-hidden select-none">
              
              {/* Top Theater Controls */}
              <div className="flex items-center justify-between px-4 sm:px-6 py-3 bg-slate-950 border-b border-white/10 z-20">
                <div className="flex items-center gap-2.5">
                  <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-bold tracking-wide">
                    <span className="material-icons text-xs text-sky-400">photo_library</span>
                    Photo {activePhotoIndex + 1} of {activeEvent.photos.length}
                  </span>
                  {activeEvent.photos.length > 1 && (
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 hover:bg-white/15 text-slate-300 text-xs font-semibold transition-colors cursor-pointer border border-white/10"
                      title={isPlaying ? "Pause auto-slideshow" : "Resume auto-slideshow"}
                    >
                      <span className="material-icons text-xs text-sky-400">{isPlaying ? "pause" : "play_arrow"}</span>
                      <span className="hidden sm:inline">{isPlaying ? "Auto: Active" : "Auto: Paused"}</span>
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-[11px] text-slate-400 font-medium hidden sm:inline">Use ← → arrow keys to flip</span>
                  {/* Close button on mobile theater view */}
                  <button
                    onClick={closeEvent}
                    className="lg:hidden w-8 h-8 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer"
                    title="Close"
                  >
                    <span className="material-icons text-base">close</span>
                  </button>
                </div>
              </div>

              {/* Main Viewport: ZERO-CROP OBJECT-CONTAIN FIT IMAGE */}
              <div className="relative flex-1 flex items-center justify-center p-3 sm:p-6 overflow-hidden min-h-[300px] sm:min-h-[380px] lg:min-h-0 bg-slate-950">
                {/* Ambient glow reflection */}
                <div
                  className="absolute inset-0 bg-cover bg-center blur-3xl opacity-25 scale-110 pointer-events-none transition-all duration-700"
                  style={{ backgroundImage: `url(${activeEvent.photos[activePhotoIndex].src})` }}
                />

                {/* The Photo: OBJECT-CONTAIN guarantees COMPLETE VISIBILITY */}
                <img
                  key={activeEvent.photos[activePhotoIndex].src}
                  src={activeEvent.photos[activePhotoIndex].src}
                  alt={activeEvent.photos[activePhotoIndex].title}
                  className="relative z-10 max-w-full max-h-full object-contain mx-auto drop-shadow-2xl rounded-xl transition-all duration-300 select-none"
                />

                {/* Left Navigation Arrow */}
                {activeEvent.photos.length > 1 && (
                  <button
                    onClick={() => goToPhoto(activePhotoIndex - 1)}
                    className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-black/85 text-white flex items-center justify-center backdrop-blur-md border border-white/15 shadow-xl transition-all hover:scale-110 cursor-pointer"
                    title="Previous photo (←)"
                  >
                    <span className="material-icons text-xl sm:text-2xl">chevron_left</span>
                  </button>
                )}

                {/* Right Navigation Arrow */}
                {activeEvent.photos.length > 1 && (
                  <button
                    onClick={() => goToPhoto(activePhotoIndex + 1)}
                    className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-black/85 text-white flex items-center justify-center backdrop-blur-md border border-white/15 shadow-xl transition-all hover:scale-110 cursor-pointer"
                    title="Next photo (→)"
                  >
                    <span className="material-icons text-xl sm:text-2xl">chevron_right</span>
                  </button>
                )}
              </div>

              {/* Photo Caption Strip */}
              <div className="px-4 sm:px-6 py-2.5 bg-slate-950/95 border-t border-white/10 z-20">
                <div className="text-white text-xs sm:text-sm font-bold truncate">
                  {activeEvent.photos[activePhotoIndex].title}
                </div>
                <div className="text-slate-400 text-[11px] sm:text-xs truncate font-medium mt-0.5">
                  {activeEvent.photos[activePhotoIndex].caption}
                </div>
              </div>

              {/* Thumbnails Row */}
              {activeEvent.photos.length > 1 && (
                <div className="px-4 sm:px-6 py-3 bg-black/90 border-t border-white/10 z-20 overflow-x-auto no-scrollbar flex items-center gap-2.5">
                  {activeEvent.photos.map((p, idx) => {
                    const isActive = idx === activePhotoIndex;
                    return (
                      <button
                        key={p.src}
                        onClick={() => setActivePhotoIndex(idx)}
                        className={`relative flex-shrink-0 w-16 h-12 sm:w-20 sm:h-14 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                          isActive
                            ? "border-sky-400 scale-105 shadow-md shadow-sky-400/30 ring-2 ring-sky-400/40"
                            : "border-white/20 opacity-50 hover:opacity-90 hover:border-white/50"
                        }`}
                      >
                        <img src={p.src} alt={p.title} className="w-full h-full object-cover" />
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* ── RIGHT COLUMN: EVENT DOSSIER (lg:col-span-5 xl:col-span-4) ── */}
            <div className="lg:col-span-5 xl:col-span-4 flex flex-col h-full bg-white overflow-hidden">
              
              {/* Header Box */}
              <div className="p-6 pb-4 border-b border-slate-100 flex items-start justify-between gap-4">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-primary/10 text-primary">
                      {activeEvent.category}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-sky-50 text-secondary border border-sky-100">
                      {activeEvent.badge}
                    </span>
                    <span className="text-xs font-semibold text-slate-400">
                      {activeEvent.date}
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-primary leading-tight">
                    {activeEvent.title}
                  </h3>
                </div>

                <button
                  onClick={closeEvent}
                  className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors flex-shrink-0 cursor-pointer"
                  title="Close (Esc)"
                >
                  <span className="material-icons text-lg">close</span>
                </button>
              </div>

              {/* Location & Stall Cards */}
              <div className="px-6 py-3 bg-slate-50 border-b border-slate-100 grid grid-cols-1 gap-1.5 text-xs font-semibold text-slate-700">
                <div className="flex items-center gap-2">
                  <span className="material-icons text-sm text-secondary flex-shrink-0">place</span>
                  <span className="truncate">{activeEvent.venue}</span>
                </div>
                {activeEvent.stall && (
                  <div className="flex items-center gap-2">
                    <span className="material-icons text-sm text-emerald-600 flex-shrink-0">storefront</span>
                    <span className="truncate font-bold text-slate-900">{activeEvent.stall}</span>
                  </div>
                )}
              </div>

              {/* Navigation Tabs */}
              <div className="flex items-center border-b border-slate-100 px-6 bg-white overflow-x-auto no-scrollbar">
                {[
                  { id: "overview", label: "Overview", icon: "article" },
                  { id: "highlights", label: "Highlights", icon: "verified" },
                  { id: "products", label: "Products", icon: "medication" },
                  { id: "delegation", label: "Delegation", icon: "groups" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-1.5 py-3 px-3 text-xs font-bold border-b-2 transition-all flex-shrink-0 cursor-pointer ${
                      activeTab === tab.id
                        ? "border-primary text-primary"
                        : "border-transparent text-slate-400 hover:text-slate-700"
                    }`}
                  >
                    <span className="material-icons text-sm">{tab.icon}</span>
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>

              {/* Tab Content Body (Scrollable) */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {activeTab === "overview" && (
                  <div className="space-y-4">
                    <h4 className="text-xs font-black uppercase tracking-wider text-slate-400">
                      Executive Summary &amp; Scope
                    </h4>
                    <p className="text-slate-600 text-sm leading-relaxed font-medium">
                      {activeEvent.overview}
                    </p>
                    <div className="pt-3 border-t border-slate-100">
                      <div className="text-xs font-bold text-slate-700 mb-2">Event Scope Metrics:</div>
                      <div className="grid grid-cols-2 gap-2 text-center">
                        <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
                          <div className="text-lg font-black text-primary">1000+</div>
                          <div className="text-[10px] font-bold text-slate-400 uppercase">Formulations Presented</div>
                        </div>
                        <div className="p-3 rounded-2xl bg-sky-50 border border-sky-100">
                          <div className="text-lg font-black text-secondary">Pan-India</div>
                          <div className="text-[10px] font-bold text-slate-400 uppercase">Trade Reach</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "highlights" && (
                  <div className="space-y-3">
                    <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-2">
                      Outcomes &amp; Milestone Achievements
                    </h4>
                    {activeEvent.keyHighlights.map((hl, i) => (
                      <div key={i} className="flex items-start gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-100">
                        <span className="material-icons text-emerald-600 text-base mt-0.5 flex-shrink-0">check_circle</span>
                        <span className="text-xs font-semibold text-slate-700 leading-relaxed">{hl}</span>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === "products" && (
                  <div className="space-y-3">
                    <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-2">
                      Formulations Showcased to Buyers
                    </h4>
                    <div className="grid grid-cols-1 gap-2.5">
                      {activeEvent.productsShowcased.map((p, i) => (
                        <div key={i} className="flex items-center gap-3 p-3 rounded-2xl bg-primary/5 border border-primary/10">
                          <span className="material-icons text-primary text-base flex-shrink-0">vaccines</span>
                          <span className="text-xs font-bold text-primary">{p}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === "delegation" && (
                  <div className="space-y-3">
                    <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-2">
                      Official Company Representatives
                    </h4>
                    <div className="space-y-2">
                      {activeEvent.delegation.map((del, i) => (
                        <div key={i} className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-100">
                          <div className="w-8 h-8 rounded-full bg-secondary/10 text-secondary flex items-center justify-center font-bold text-xs flex-shrink-0">
                            <span className="material-icons text-sm">person</span>
                          </div>
                          <span className="text-xs font-bold text-slate-800">{del}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Modal Footer CTA */}
              <div className="p-4 sm:p-6 border-t border-slate-100 bg-slate-50 flex flex-col sm:flex-row items-center gap-3">
                <a
                  href={`/contact?subject=${encodeURIComponent(`Inquiry regarding ${activeEvent.title}`)}`}
                  className="w-full sm:flex-1 py-3 px-4 bg-primary hover:bg-primary-accent text-white font-bold text-xs rounded-xl shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer text-center"
                >
                  <span className="material-icons text-sm">mail</span>
                  <span>Inquire About Formulations</span>
                </a>
                <button
                  onClick={closeEvent}
                  className="w-full sm:w-auto py-3 px-5 bg-white hover:bg-slate-100 text-slate-700 font-bold text-xs rounded-xl border border-slate-200 transition-colors cursor-pointer text-center"
                >
                  Close
                </button>
              </div>

            </div>
          </div>
        </div>
      )}
<Footer />
    </div>
  );
}
