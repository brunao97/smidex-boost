'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 }
};

const HeroSection = () => {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-[#1A0F0F]">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[#1A0F0F]"></div>
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#DC143C]/30 via-[#1A0F0F]/90 to-[#1A0F0F]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#DC143C]/15 via-transparent to-transparent"></div>
        <motion.div 
          className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-[#DC143C]/25 blur-[100px] rounded-full opacity-50"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 0.5, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      </div>

      <motion.div 
        className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col items-center text-center"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.div 
          className="mb-10"
          variants={scaleIn}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="relative w-[160px] h-[160px] md:w-[200px] md:h-[200px]">
            <Image 
              src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/image-1765420995505.png?width=8000&height=8000&resize=contain"
              alt="Smidex Boost Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
        </motion.div>

        <motion.h1 
          className="font-display font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1] mb-8 max-w-5xl"
          variants={fadeInUp}
          transition={{ duration: 0.6 }}
        >
          <span className="text-white">
            Desperte o poder real do seu PC
          </span>
        </motion.h1>

        <motion.p 
          className="font-body text-[#D4B0B0] text-base sm:text-lg md:text-xl leading-relaxed max-w-3xl mb-12"
          variants={fadeInUp}
          transition={{ duration: 0.6 }}
        >
          O único serviço de otimização com <span className="text-[#FF3333] font-bold">garantia real</span> e <span className="text-[#FF3333] font-bold">suporte especializado</span>. Acelere jogos, reduza travamentos e recupere desempenho.
        </motion.p>

        <motion.div 
          className="flex flex-col sm:flex-row items-center gap-5 mb-20 w-full justify-center"
          variants={fadeInUp}
          transition={{ duration: 0.6 }}
        >
          <motion.a 
            href="#planos"
            className="group relative inline-flex items-center justify-center min-w-[220px] bg-[#DC143C] text-white font-body font-bold text-sm uppercase tracking-wider py-4 px-8 rounded-full overflow-hidden transition-all duration-300 hover:shadow-[0_0_20px_rgba(220,20,60,0.6)] hover:bg-[#ff1f4b] hover:-translate-y-1"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10">Otimizar agora</span>
          </motion.a>
          
          <motion.a 
            href="https://api.whatsapp.com/send/?phone=5566999236481"
            className="group relative inline-flex items-center justify-center min-w-[220px] bg-transparent border-2 border-[#DC143C] text-[#DC143C] font-body font-bold text-sm uppercase tracking-wider py-4 px-8 rounded-full overflow-hidden transition-all duration-300 hover:bg-[#DC143C] hover:text-white hover:shadow-[0_0_20px_rgba(220,20,60,0.4)] hover:-translate-y-1"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10">Falar com especialista</span>
          </motion.a>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl"
          variants={staggerContainer}
        >
          {[
            { value: "5k+", label: "PCs otimizados" },
            { value: "+50%", label: "FPS médio" },
            { value: "Suporte", label: "Garantido" }
          ].map((stat, index) => (
            <motion.div 
              key={index}
              className="relative group bg-[#2A1414]/60 backdrop-blur-sm border border-[#3A2020] rounded-2xl p-8 transition-all duration-300 hover:border-[#DC143C]/50 hover:bg-[#2A1414]/80"
              variants={fadeInUp}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="flex flex-col items-center justify-center">
                <h2 className="font-display font-bold text-4xl lg:text-5xl text-white mb-2 group-hover:scale-105 transition-transform duration-300">
                  {stat.value}
                </h2>
                <span className="font-body text-[#D4B0B0] text-sm uppercase tracking-widest font-semibold group-hover:text-white transition-colors duration-300">
                  {stat.label}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;