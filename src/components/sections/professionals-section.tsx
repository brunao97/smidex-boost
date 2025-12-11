'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Check, MessageSquare, Quote } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { BorderBeam } from '@/components/ui/border-beam';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 }
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0 }
};

const fadeInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0 }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 }
};

export default function ProfessionalsSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [testimonialSlide, setTestimonialSlide] = useState(0);

  const professionals = [
    {
      id: 1,
      name: "FROGMANI",
      followers: "+200K de seguidores",
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/c1e29c8d-fe18-432f-91cc-e817f8ee3f8d-bravoboost-com-br/assets/images/frog-copiar-24.webp",
      social: "/Frogman1",
      platform: "twitch",
      twitchUrl: "#",
    },
    {
      id: 2,
      name: "SKIPNHO",
      followers: "1.3M+ de seguidores",
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/c1e29c8d-fe18-432f-91cc-e817f8ee3f8d-bravoboost-com-br/assets/images/SKPINHO-25.webp",
      social: "skipnho",
      platform: "youtube",
      youtubeUrl: "#",
    },
    {
      id: 3,
      name: "DILERA",
      followers: "+500K de seguidores",
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/c1e29c8d-fe18-432f-91cc-e817f8ee3f8d-bravoboost-com-br/assets/images/DILERA-23.webp",
      social: "dilera",
      platform: "twitch",
      twitchUrl: "#",
    },
    {
      id: 4,
      name: "LAND1N",
      followers: "+400K de seguidores",
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/c1e29c8d-fe18-432f-91cc-e817f8ee3f8d-bravoboost-com-br/assets/images/land1n-copiar-22.webp",
      social: "land1n",
      platform: "twitch",
      twitchUrl: "#",
    },
    {
      id: 5,
      name: "SHAPP2K",
      followers: "+300K de seguidores",
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/c1e29c8d-fe18-432f-91cc-e817f8ee3f8d-bravoboost-com-br/assets/images/shapp2k-copiar-21.webp",
      social: "shapp2k",
      platform: "twitch",
      twitchUrl: "#",
    },
  ];

  const testimonials = [
    {
      user: "Cliente Bravo",
      msg: "Incrível mano o jogo tá mais rápido e o FPS tá batendo no piko de 300",
      metric: "300 FPS",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      role: "Gamer Competitivo",
    },
    {
      user: "Gamer Pro",
      msg: "Com os gráficos no médio e a resolução nativa. Só baixei e fui jogar. N mexi em nada.",
      metric: "Zero Config",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      role: "Streamer",
    },
    {
      user: "Cliente Smidex",
      msg: "Vim opinar sobre o Smidex Boost!! 10/10, excelente, eu tava jogando com fps cravado.",
      metric: "10/10",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      role: "Jogador Casual",
    },
    {
      user: "Streamer",
      msg: "O delay realmente diminuiu e a fluidez aumentou e muito. Salvou pra kct.",
      metric: "Menos Input Lag",
      avatar: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=150&h=150&fit=crop&crop=face",
      role: "Pro Player",
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % professionals.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + professionals.length) % professionals.length);
  };

  const nextTestimonial = () => {
    setTestimonialSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setTestimonialSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const getVisiblePros = () => {
    // Show 2 cards on desktop (looping)
    const card1 = professionals[currentSlide];
    const card2 = professionals[(currentSlide + 1) % professionals.length];
    return [card1, card2];
  };

  return (
    <div className="bg-[#1A0F0F] text-white font-body selection:bg-[#FF3333] selection:text-white pb-32">
      {/* PROFESSIONAL SECTION */}
      <section className="relative overflow-hidden py-16 md:py-24">
        <motion.div 
          className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#FF3333] opacity-5 blur-[150px] rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2"
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 0.05, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
        />

        <div className="container mx-auto px-6 md:px-12 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            <motion.div 
              className="relative"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInLeft}
              transition={{ duration: 0.7 }}
            >
              {/* Controls */}
              <div className="flex gap-2 text-white mb-4">
                <motion.button 
                  onClick={prevSlide}
                  className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#2A1414] border border-[#3A2020] hover:bg-[#FF3333] hover:border-[#FF3333] transition-all duration-300 group"
                  aria-label="Previous slide"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ChevronLeft className="w-5 h-5 group-hover:text-black transition-colors" />
                </motion.button>
                <motion.button 
                  onClick={nextSlide}
                  className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#2A1414] border border-[#3A2020] hover:bg-[#FF3333] hover:border-[#FF3333] transition-all duration-300 group"
                  aria-label="Next slide"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ChevronRight className="w-5 h-5 group-hover:text-black transition-colors" />
                </motion.button>
              </div>

              {/* Cards Container */}
              <div className="flex gap-4 overflow-hidden">
                {getVisiblePros().map((pro, index) => (
                  <motion.div 
                    key={`${pro.id}-${index}`} 
                    className="relative w-full md:w-1/2 flex-shrink-0 group cursor-default"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    {/* Card Body */}
                    <motion.div 
                      className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-[#2A1414] group-hover:border-[#FF3333]/50 transition-colors duration-500"
                      whileHover={{ y: -5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <BorderBeam 
                        className="inset-0 top-0 left-0"
                        lightColor="#DC143C"
                        lightWidth={150}
                        duration={8}
                        borderWidth={3}
                      />
                      <Image
                        src={pro.image}
                        alt={pro.name}
                        fill
                        className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 300px"
                      />
                      
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90"></div>

                      {/* Content Overlay */}
                      <div className="absolute bottom-0 left-0 w-full p-6">
                        <div className="text-[#FF3333] text-sm font-semibold mb-1">
                          {pro.followers}
                        </div>
                        <h3 className="font-display font-black text-3xl md:text-3xl tracking-wider text-white italic uppercase mb-2">
                          {pro.name}
                        </h3>
                        
                        <div className="flex items-center gap-2 text-gray-300 text-sm">
                           {pro.platform === 'twitch' ? (
                              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-[#FF3333]"> 
                                <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z"/>
                              </svg>
                           ) : (
                              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-[#FF3333]">
                                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                              </svg>
                           )}
                           <span>{pro.social}</span>
                        </div>
                        
                        {/* Pagination Dots visual for card */}
                        <div className="flex gap-1 mt-4">
                           <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                           <div className="w-1.5 h-1.5 rounded-full bg-gray-600"></div>
                           <div className="w-1.5 h-1.5 rounded-full bg-gray-600"></div>
                           <div className="w-1.5 h-1.5 rounded-full bg-gray-600"></div>
                           <div className="w-1.5 h-1.5 rounded-full bg-gray-600"></div>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              className="flex flex-col justify-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              <motion.h2 
                className="font-display font-bold text-4xl md:text-5xl leading-tight mb-6"
                variants={fadeInUp}
                transition={{ duration: 0.6 }}
              >
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B6B] to-[#FF3333]">Profissionais</span> que já otimizaram com Smidex Boost
              </motion.h2>
              
              <motion.p 
                className="text-[#D4B0B0] text-base md:text-lg leading-relaxed mb-8"
                variants={fadeInUp}
                transition={{ duration: 0.6 }}
              >
                A mesma otimização de alta precisão usada por Jogadores Profissionais e Criadores de Conteúdo para garantir 100% de estabilidade e FPS máximo. Sua máquina no nível Pro, sem travamentos ou falhas.
              </motion.p>

              <motion.ul 
                className="space-y-4 mb-8"
                variants={staggerContainer}
              >
                {[
                  { title: "FPS no Máximo", desc: "Mais quadros, mais fluidez." },
                  { title: "Estabilidade Profissional", desc: "Zero lag em momentos críticos." },
                  { title: "Foco Total no Jogo", desc: "Seu PC funcionando com a dedicação de um Pro Player." }
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-[#FF3333] flex items-center justify-center text-black">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                    <div>
                      <strong className="text-white block">{item.title}:</strong>
                      <span className="text-sm text-[#D4B0B0]">{item.desc}</span>
                    </div>
                  </li>
                ))}
              </motion.ul>

              <motion.p 
                className="font-semibold text-white text-lg"
                variants={fadeInUp}
              >
                Pronto para o seu Smidex Boost?
              </motion.p>
            </motion.div>

          </div>
        </div>
      </section>

      {/* TESTIMONIALS SLIDER SECTION */}
      <section className="relative py-16 md:py-24">
        <div className="container mx-auto px-6 md:px-12 max-w-5xl">
          <motion.div
            className="relative"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div 
              className="text-center mb-12"
              variants={fadeInUp}
            >
              <span className="text-[#FF3333] text-sm uppercase tracking-widest font-semibold mb-2 block">Depoimentos</span>
              <h2 className="font-display font-bold text-4xl md:text-5xl leading-tight">
                O que nossos clientes dizem
              </h2>
            </motion.div>

            <div className="relative bg-gradient-to-br from-[#2A1414] to-[#1A0F0F] rounded-3xl p-8 md:p-16 border border-[#3A2020] overflow-hidden">
              <BorderBeam 
                className="inset-0 top-0 left-0"
                lightColor="#DC143C"
                lightWidth={200}
                duration={10}
                borderWidth={2}
              />
              
              <div className="absolute top-8 left-8 md:top-12 md:left-12">
                <Quote className="w-16 h-16 md:w-24 md:h-24 text-[#FF3333]/20" />
              </div>

              <div className="relative z-10 min-h-[280px] flex flex-col justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={testimonialSlide}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.4 }}
                    className="text-center"
                  >
                    <p className="text-xl md:text-3xl lg:text-4xl font-light text-white leading-relaxed mb-10 max-w-3xl mx-auto">
                      "{testimonials[testimonialSlide].msg}"
                    </p>

                    <div className="flex flex-col items-center gap-4">
                      <div className="relative w-20 h-20 rounded-full overflow-hidden border-4 border-[#FF3333]/50">
                        <Image
                          src={testimonials[testimonialSlide].avatar}
                          alt={testimonials[testimonialSlide].user}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="text-center">
                        <h4 className="font-display font-bold text-lg text-white">
                          {testimonials[testimonialSlide].user}
                        </h4>
                        <p className="text-[#D4B0B0] text-sm">
                          {testimonials[testimonialSlide].role}
                        </p>
                        <span className="inline-block mt-2 text-xs font-bold text-[#FF3333] bg-[#FF3333]/10 px-3 py-1 rounded-full">
                          {testimonials[testimonialSlide].metric}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="flex items-center justify-center gap-6 mt-10 relative z-10">
                <motion.button
                  onClick={prevTestimonial}
                  className="w-12 h-12 flex items-center justify-center rounded-full bg-[#3A2020] border border-[#FF3333]/30 hover:bg-[#FF3333] hover:border-[#FF3333] transition-all duration-300 group"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-5 h-5 text-white group-hover:text-black transition-colors" />
                </motion.button>

                <div className="flex gap-2">
                  {testimonials.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setTestimonialSlide(idx)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        idx === testimonialSlide
                          ? 'bg-[#FF3333] w-8'
                          : 'bg-[#3A2020] hover:bg-[#FF3333]/50'
                      }`}
                      aria-label={`Go to testimonial ${idx + 1}`}
                    />
                  ))}
                </div>

                <motion.button
                  onClick={nextTestimonial}
                  className="w-12 h-12 flex items-center justify-center rounded-full bg-[#3A2020] border border-[#FF3333]/30 hover:bg-[#FF3333] hover:border-[#FF3333] transition-all duration-300 group"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-5 h-5 text-white group-hover:text-black transition-colors" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}