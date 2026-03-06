'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Car, 
  Zap, 
  Shield, 
  Palette, 
  Lightbulb, 
  Twitter, 
  Linkedin, 
  ExternalLink,
  Instagram,
  Music2,
  GraduationCap,
  Trophy,
  Heart,
  Mail,
  Youtube,
  Music
} from 'lucide-react'
import Image from 'next/image'

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
}

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

// Social links data
const socialLinks = [
  { 
    name: 'X (Twitter)', 
    icon: Twitter, 
    href: 'https://x.com/MarkoSaraf2004',
    color: 'hover:bg-gray-100'
  },
  { 
    name: 'LinkedIn', 
    icon: Linkedin, 
    href: 'https://ch.linkedin.com/in/marko-sarafijanovic-60707923b',
    color: 'hover:bg-[#0077B5]/10'
  },
  { 
    name: 'Instagram', 
    icon: Instagram, 
    href: 'https://www.instagram.com/markosarafijanovic',
    color: 'hover:bg-[#E4405F]/10'
  },
  { 
    name: 'TikTok', 
    icon: Music2, 
    href: 'https://www.tiktok.com/@markosarafijanovic',
    color: 'hover:bg-gray-100'
  },
  { 
    name: 'YouTube', 
    icon: Youtube, 
    href: 'https://www.youtube.com/@TesIaCH',
    color: 'hover:bg-[#FF0000]/10'
  },
  { 
    name: 'E-mail', 
    icon: Mail, 
    href: 'mailto:marko.sarafijanovic@gmail.com',
    color: 'hover:bg-[#E31937]/10'
  }
]

// Interest card data
const interests = [
  {
    icon: Heart,
    title: 'Teaching Children',
    description: 'Passionate about educating and inspiring young minds.',
    gradient: 'from-[#F43F5E] to-[#FB7185]'
  },
  {
    icon: Zap,
    title: 'Full Self-Driving',
    description: 'Excited about FSD technology transforming transportation.',
    gradient: 'from-[#3B82F6] to-[#60A5FA]'
  },
  {
    icon: Shield,
    title: 'Safety Statistics',
    description: 'Analyzing safety data to understand autonomous driving benefits.',
    gradient: 'from-[#10B981] to-[#34D399]'
  },
  {
    icon: Car,
    title: 'Tesla Vehicles',
    description: 'Passionate about Tesla\'s innovative electric vehicles.',
    gradient: 'from-[#E31937] to-[#FF6B6B]'
  },
  {
    icon: Palette,
    title: 'Tech Design',
    description: 'Appreciation for elegant design and safety in technology products.',
    gradient: 'from-[#8B5CF6] to-[#A78BFA]'
  },
  {
    icon: Lightbulb,
    title: 'Innovation',
    description: 'Exploring and promoting new technologies and sustainable transportation.',
    gradient: 'from-[#F59E0B] to-[#FBBF24]'
  },
  {
    icon: Trophy,
    title: 'Tennis',
    description: 'Member of Tennis Club Adliswil (TCA). Playing tennis since childhood.',
    gradient: 'from-[#EC4899] to-[#F472B6]'
  },
  {
    icon: Music,
    title: 'Music',
    description: 'Enjoy listening to music and singing. Beyond that, I play guitar since childhood.',
    gradient: 'from-[#06B6D4] to-[#22D3EE]'
  }
]

export default function Home() {
  const currentYear = new Date().getFullYear()
  const [isLoading, setIsLoading] = useState(true)
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    // After loading animation completes, start the reveal
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500) // Wait for intro animation

    const contentTimer = setTimeout(() => {
      setShowContent(true)
    }, 1600) // Start reveal slightly after loading hides

    return () => {
      clearTimeout(timer)
      clearTimeout(contentTimer)
    }
  }, [])

  return (
    <>
      {/* JSON-LD Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Marko Sarafijanovic",
            "image": "https://marko-sarafijanovic.space.z.ai/marko-profile.png",
            "jobTitle": "Primary School Teacher",
            "worksFor": {
              "@type": "EducationalOrganization",
              "name": "Pädagogische Hochschule Zürich (PHZH)"
            },
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Zurich",
              "addressCountry": "Switzerland"
            },
            "description": "Substitute teacher in primary school passionate about teaching maths and languages. Tesla enthusiast and Full Self-Driving advocate studying at PHZH Zurich.",
            "sameAs": [
              "https://x.com/MarkoSaraf2004",
              "https://ch.linkedin.com/in/marko-sarafijanovic-60707923b",
              "https://www.instagram.com/markosarafijanovic",
              "https://www.tiktok.com/@markosarafijanovic",
              "https://www.youtube.com/@TesIaCH"
            ],
            "knowsAbout": [
              "Primary Education",
              "Teaching Maths",
              "Teaching Languages",
              "Tesla Vehicles",
              "Full Self-Driving Technology",
              "Electric Vehicles",
              "Technology Design",
              "Tennis",
              "Tennis Club Adliswil",
              "TCA"
            ],
            "homeLocation": {
              "@type": "Place",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Adliswil",
                "addressRegion": "Zurich",
                "addressCountry": "Switzerland"
              }
            }
          })
        }}
      />
      
      {/* Intro screen with centered profile - fades out */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            className="fixed inset-0 z-[100] bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col items-center"
            >
              <div className="w-24 h-24 md:w-28 md:h-28 rounded-2xl overflow-hidden border-4 border-white shadow-2xl shadow-slate-300/50 mb-5">
                <Image
                  src="/marko-profile.png"
                  alt="Marko Sarafijanovic"
                  width={112}
                  height={112}
                  className="object-cover w-full h-full"
                  priority
                />
              </div>
              <motion.h1
                initial={{ y: 15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-2xl md:text-3xl font-bold text-slate-800 mb-3"
              >
                Marko Sarafijanovic
              </motion.h1>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="h-1 w-28 bg-gradient-to-r from-[#E31937] to-[#FF6B6B] rounded-full"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Main content with circle reveal animation */}
      <div 
        className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 text-slate-900 overflow-x-hidden transition-all duration-[2000ms] ease-out"
        style={{
          clipPath: showContent ? 'circle(150% at 50vw 50vh)' : 'circle(0% at 50vw 50vh)'
        }}
      >
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-[#E31937]/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-[#E31937]/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-slate-200/50 to-slate-100/30 rounded-full blur-3xl" />
      </div>

      {/* Main Content */}
      <main className="relative z-10 max-w-6xl mx-auto px-4 py-8 md:py-16">
        
        {/* Hero Section - Bento Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12">
          
          {/* Profile Card - Large */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="md:col-span-2 relative rounded-3xl overflow-hidden bg-white/80 border border-slate-200/80 shadow-xl shadow-slate-200/50 p-6 md:p-10"
          >
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-10">
              {/* Profile Image */}
              <div className="relative flex-shrink-0">
                <div className="absolute inset-0 bg-gradient-to-br from-[#E31937] to-[#FF6B6B] rounded-2xl blur-xl opacity-30" />
                <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden border-4 border-white shadow-xl shadow-[#E31937]/20">
                  <Image
                    src="/marko-profile.png"
                    alt="Marko Sarafijanovic"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
              
              {/* Name & Tagline */}
              <div className="text-center md:text-left flex-1">
                <motion.h1 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight"
                >
                  <span className="bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 bg-clip-text text-transparent">
                    Marko Sarafijanovic
                  </span>
                </motion.h1>
                
                <motion.p 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="text-xl md:text-2xl text-[#E31937] font-semibold mb-4"
                >
                  Primary School Teacher in Zurich
                </motion.p>
              </div>
            </div>
          </motion.div>

          {/* Education Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative rounded-3xl overflow-hidden bg-white/80 border border-slate-200/80 shadow-lg shadow-slate-200/50 p-6 flex flex-col justify-center hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center gap-4 mb-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#10B981] to-[#34D399] flex items-center justify-center shadow-lg shadow-emerald-500/20">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-800">Education</h3>
            </div>
            <p className="text-slate-500 text-sm mb-2">Pädagogische Hochschule Zürich (PHZH)</p>
            <p className="text-[#10B981] font-medium text-sm">Primary Teacher Education Degree Program 2024-2029</p>
          </motion.div>
        </section>

        {/* About & Socials Section - Bento Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-8 md:mb-12">
          
          {/* About Card */}
          <motion.div 
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="relative rounded-3xl overflow-hidden bg-white/80 border border-slate-200/80 shadow-lg shadow-slate-200/50 p-6 md:p-8 hover:shadow-xl transition-shadow"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              <span className="bg-gradient-to-r from-[#E31937] to-[#FF6B6B] bg-clip-text text-transparent">
                About Me
              </span>
            </h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              I&apos;m a <span className="text-[#E31937] font-semibold">substitute teacher</span> in primary school. I love teaching <span className="text-slate-800 font-semibold">maths</span> and <span className="text-slate-800 font-semibold">languages</span> the most. Besides German, I teach <span className="text-slate-800 font-semibold">English</span> and <span className="text-slate-800 font-semibold">French</span>. I have a C1 diploma in English and a C1 diploma in French is pending.
            </p>
            <p className="text-slate-600 leading-relaxed">
              I&apos;m also a passionate advocate for <span className="text-slate-800 font-semibold">Tesla</span> and{' '}
              <span className="text-[#E31937] font-semibold">Full Self-Driving technology</span>. My enthusiasm lies in analyzing safety statistics and debunking media myths about emerging technologies, 
              while following the expansion of FSD to Europe.
            </p>
          </motion.div>

          {/* Social Links Card */}
          <motion.div 
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="relative rounded-3xl overflow-hidden bg-white/80 border border-slate-200/80 shadow-lg shadow-slate-200/50 p-6 md:p-8 hover:shadow-xl transition-shadow"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              <span className="bg-gradient-to-r from-slate-800 to-slate-500 bg-clip-text text-transparent">
                Socials
              </span>
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 ${social.color} transition-all duration-300 group`}
                >
                  <social.icon className="w-5 h-5 text-slate-400 group-hover:text-[#E31937] transition-colors" />
                  <span className="text-sm font-medium text-slate-600 group-hover:text-slate-800 transition-colors">
                    {social.name}
                  </span>
                  <ExternalLink className="w-3 h-3 text-slate-400 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Interests Section - Bento Grid */}
        <section className="mb-8 md:mb-12">
          <motion.div 
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-2">
              <span className="bg-gradient-to-r from-slate-800 to-slate-500 bg-clip-text text-transparent">
                Interests & Passions
              </span>
            </h2>
            <p className="text-slate-500 text-lg">
              Exploring technology, design, and innovation
            </p>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6"
          >
            {interests.map((interest, index) => (
              <motion.div
                key={interest.title}
                variants={fadeInUp}
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
                className={`relative rounded-2xl overflow-hidden bg-white/80 border border-slate-200/80 shadow-lg shadow-slate-200/50 p-5 md:p-6 cursor-pointer group hover:shadow-xl transition-all ${
                  index === 0 ? 'md:col-span-2 md:row-span-1' : ''
                }`}
              >
                <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br ${interest.gradient} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <interest.icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
                </div>
                <h3 className="text-base md:text-lg font-bold text-slate-800 mb-1 md:mb-2">{interest.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed hidden md:block">{interest.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="relative py-8 border-t border-slate-200">
          <div className="text-center">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-slate-400 text-sm"
            >
              &copy; {currentYear} Marko Sarafijanovic. All rights reserved.
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-slate-400 text-xs mt-2"
            >
              Primary School Teacher | Tesla Enthusiast | Tech & Design
            </motion.p>
          </div>
        </footer>
      </main>
      </div>
    </>
  )
}
