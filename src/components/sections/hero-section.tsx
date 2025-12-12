'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Hyperspeed from '@/components/Hyperspeed';
import { hyperspeedPresets } from '@/components/HyperSpeedPresets';
import TextType from '@/components/TextType';
import { BorderBeam } from '@/components/ui/border-beam';
import { RippleButton } from '@/components/ui/ripple-button';

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
      <div className="absolute inset-0 z-0">
        <Hyperspeed effectOptions={hyperspeedPresets.akira} />
      </div>
      <div className="absolute inset-0 z-[1] pointer-events-none bg-gradient-to-b from-transparent via-[#1A0F0F]/50 to-[#1A0F0F]"></div>

      <motion.div 
        className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-20 flex flex-col items-center text-center justify-center min-h-screen"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.div 
          className="mb-6 sm:mb-8 md:mb-10"
          variants={scaleIn}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="relative w-[120px] h-[120px] sm:w-[140px] sm:h-[140px] md:w-[160px] md:h-[160px] lg:w-[200px] lg:h-[200px] group mx-auto">
            <Image 
              src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/smidex-boost-logo-1765425227304.png?width=8000&height=8000&resize=contain"
              alt="Smidex Boost Logo"
              fill
              className="object-contain rounded-full"
              priority
            />
            <div className="absolute inset-0 rounded-full overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full animate-[shine_3s_ease-in-out_infinite]" 
                style={{ transform: 'skewX(-20deg)' }}
              />
            </div>
          </div>
        </motion.div>

        <motion.h1 
          className="font-display font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl leading-[1.1] mb-4 sm:mb-6 md:mb-8 max-w-5xl px-2"
          variants={fadeInUp}
          transition={{ duration: 0.6 }}
        >
          <TextType 
            text={[
              "Liberte o verdadeiro poder do seu",
              "Diga adeus aos travamentos",
              "Aumente seus FPS drasticamente",
              "Performance máxima garantida",
              "Seu PC em outro nível"
            ]}
            typingSpeed={50}
            deletingSpeed={30}
            pauseDuration={2500}
            loop={true}
            className="text-white"
            showCursor={true}
            cursorCharacter="_"
            cursorClassName="text-[#DC143C]"
          />
        </motion.h1>

        <motion.p
          className="font-body text-[#D4B0B0] text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed max-w-3xl mb-6 sm:mb-8 md:mb-12 py-2 sm:py-4 px-4 sm:px-6"
          variants={fadeInUp}
          transition={{ duration: 0.6 }}
        >
          O único serviço de otimização com <span className="text-[#FF3333] font-bold">garantia real</span> e <span className="text-[#FF3333] font-bold">suporte especializado</span>. Acelere seus jogos, elimine travamentos e recupere o desempenho perdido.
        </motion.p>

        <motion.div 
          className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 md:gap-5 mb-8 sm:mb-12 md:mb-20 w-full justify-center px-4"
          variants={fadeInUp}
          transition={{ duration: 0.6 }}
        >
          <RippleButton
            className="cursor-pointer group relative inline-flex items-center justify-center w-full sm:w-auto min-w-[200px] sm:min-w-[220px] bg-[#DC143C] text-white font-body font-bold text-xs sm:text-sm uppercase tracking-wider py-3 sm:py-4 px-6 sm:px-8 rounded-full overflow-hidden transition-all duration-300 border-none"
            rippleColor="#ffffff"
          >
            <span className="relative z-10">OTIMIZAR AGORA</span>
          </RippleButton>

          <RippleButton
            className="cursor-pointer group relative inline-flex items-center justify-center w-full sm:w-auto min-w-[200px] sm:min-w-[220px] bg-transparent border-2 border-[#DC143C] text-[#DC143C] font-body font-bold text-xs sm:text-sm uppercase tracking-wider py-3 sm:py-4 px-6 sm:px-8 rounded-full overflow-hidden transition-all duration-300"
            rippleColor="#DC143C"
          >
            <span className="relative z-10">Falar com especialista</span>
          </RippleButton>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6 w-full max-w-5xl px-4"
          variants={staggerContainer}
        >
          {[
            { value: "5k+", label: "PCs otimizados" },
            { value: "+50%", label: "Mais FPS" },
            { value: "Suporte", label: "Garantido" }
          ].map((stat, index) => (
            <motion.div 
              key={index}
              className="relative group bg-[#2A1414]/60 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 transition-all duration-300 hover:bg-[#2A1414]/80 overflow-hidden"
              variants={fadeInUp}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <BorderBeam 
                className="inset-0 top-0 left-0"
                lightColor="#DC143C"
                lightWidth={150}
                duration={8}
                borderWidth={3}
              />
              <div className="flex flex-col items-center justify-center relative z-10">
                <h2 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white mb-1 sm:mb-2 group-hover:scale-105 transition-transform duration-300">
                  {stat.value}
                </h2>
                <span className="font-body text-[#D4B0B0] text-xs sm:text-sm uppercase tracking-widest font-semibold group-hover:text-white transition-colors duration-300">
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