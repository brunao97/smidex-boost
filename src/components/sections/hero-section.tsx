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
      <div className="absolute inset-0 z-[1] pointer-events-none bg-gradient-to-b from-transparent via-[#1A0F0F]/30 md:via-[#1A0F0F]/50 to-[#1A0F0F]/80 md:to-[#1A0F0F]"></div>

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
          <div className="relative w-[160px] h-[160px] md:w-[200px] md:h-[200px] group">
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
          className="font-display font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1] mb-8 max-w-5xl"
          variants={fadeInUp}
          transition={{ duration: 0.6 }}
        >
          <TextType 
            text={[
              "Liberte o verdadeiro poder do seu PC",
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
          className="font-body text-[#D4B0B0] text-base sm:text-lg md:text-xl leading-relaxed max-w-3xl mb-12"
          variants={fadeInUp}
          transition={{ duration: 0.6 }}
        >
          O único serviço de otimização com <span className="text-[#FF3333] font-bold">garantia real</span> e <span className="text-[#FF3333] font-bold">suporte especializado</span>. Acelere seus jogos, elimine travamentos e recupere o desempenho perdido.
        </motion.p>

        <motion.div 
          className="flex flex-col sm:flex-row items-center gap-5 mb-20 w-full justify-center"
          variants={fadeInUp}
          transition={{ duration: 0.6 }}
        >
          <RippleButton
            className="cursor-pointer group relative inline-flex items-center justify-center min-w-[220px] bg-[#DC143C] text-white font-body font-bold text-sm uppercase tracking-wider py-4 px-8 rounded-full overflow-hidden transition-all duration-300 border-none"
            rippleColor="#ffffff"
          >
            <span className="relative z-10">Otimizar agora</span>
          </RippleButton>

          <RippleButton
            className="cursor-pointer group relative inline-flex items-center justify-center min-w-[220px] bg-transparent border-2 border-[#DC143C] text-[#DC143C] font-body font-bold text-sm uppercase tracking-wider py-4 px-8 rounded-full overflow-hidden transition-all duration-300"
            rippleColor="#DC143C"
          >
            <span className="relative z-10">Falar com especialista</span>
          </RippleButton>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl"
          variants={staggerContainer}
        >
          {[
            { value: "5k+", label: "PCs otimizados" },
            { value: "+50%", label: "Aumento de FPS" },
            { value: "24/7", label: "Suporte especializado" }
          ].map((stat, index) => (
            <motion.div 
              key={index}
              className="relative bg-[#2A1414]/60 backdrop-blur-sm rounded-2xl p-8 overflow-hidden"
              variants={fadeInUp}
            >
              <BorderBeam 
                className="inset-0 top-0 left-0"
                lightColor="#DC143C"
                lightWidth={150}
                duration={8}
                borderWidth={3}
              />
              <div className="flex flex-col items-center justify-center relative z-10">
                <h2 className="font-display font-bold text-4xl lg:text-5xl text-white mb-2">
                  {stat.value}
                </h2>
                <span className="font-body text-[#D4B0B0] text-sm uppercase tracking-widest font-semibold">
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