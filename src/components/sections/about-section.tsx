'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 }
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0 }
};

const fadeInRight = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0 }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1
    }
  }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1 }
};

const AboutSection = () => {
  return (
    <section className="w-full grid grid-cols-1 lg:grid-cols-2 bg-[#1A0F0F] overflow-hidden">
      <motion.div 
        className="relative w-full h-[300px] sm:h-[350px] md:h-[400px] lg:h-auto bg-[#DC143C] flex items-center justify-center p-6 sm:p-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInLeft}
        transition={{ duration: 0.8 }}
      >
        <motion.div 
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/10 to-transparent pointer-events-none"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        />
        
        <motion.div 
          className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96"
          variants={scaleIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          whileHover={{ scale: 1.05, rotate: 2 }}
        >
          <Image
            src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/smidex-boost-logo-1765425227304.png?width=8000&height=8000&resize=contain"
            alt="Smidex Boost Logo"
            fill
            className="object-contain drop-shadow-xl rounded-full"
            sizes="(max-width: 640px) 192px, (max-width: 768px) 256px, (max-width: 1024px) 320px, 384px"
            priority
          />
        </motion.div>
      </motion.div>

      <motion.div 
        className="flex flex-col justify-center px-4 sm:px-6 md:px-12 py-12 sm:py-14 md:py-16 lg:p-24 bg-[#1A0F0F] text-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <motion.div 
          className="space-y-3 sm:space-y-4 mb-6 sm:mb-8"
          variants={fadeInUp}
        >
          <motion.h3 
            className="text-xs sm:text-sm md:text-base font-semibold tracking-wider text-[#D4B0B0] font-tertiary uppercase opacity-90"
            variants={fadeInUp}
            transition={{ duration: 0.5 }}
          >
            A Engenharia por Trás do Seu Máximo FPS
          </motion.h3>
          
          <motion.h2 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-display text-white leading-tight"
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
          >
            A Smidex Boost
          </motion.h2>
        </motion.div>

        <motion.div 
          className="space-y-4 sm:space-y-5 md:space-y-6 text-[#D4B0B0] font-body text-sm sm:text-base lg:text-lg leading-relaxed"
          variants={staggerContainer}
        >
          <motion.p variants={fadeInUp} transition={{ duration: 0.5 }}>
            Desde 2021, a <span className="text-[#FF3333] font-bold">Smidex Boost</span> é a referência em soluções de alta performance para <span className="text-[#FF3333] font-bold">PC Gamers</span>. Nossa equipe de especialistas dedica-se a desenvolver metodologias e ajustes exclusivos que extraem cada gota de poder do seu sistema.
          </motion.p>
          <motion.p variants={fadeInUp} transition={{ duration: 0.5 }}>
            Nosso compromisso é com a excelência técnica: eliminar gargalos, estabilizar sistemas e garantir que a única variável na sua performance seja a sua habilidade. Seu hardware é poderoso. Nós garantimos que ele se comporte como tal.
          </motion.p>
        </motion.div>

        <motion.div 
          className="mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-[#3A2020]"
          variants={fadeInUp}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <motion.p 
            className="text-xs sm:text-sm text-[#806060] font-medium leading-relaxed font-body"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            Sim, somos uma empresa oficial registrada sob o CNPJ <span className="text-[#FF3333] font-bold break-all sm:whitespace-nowrap">46.389.461/0001-07</span>. Com anos de experiência no mercado, garantimos a você a melhor experiência de jogo com total segurança.
          </motion.p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default AboutSection;