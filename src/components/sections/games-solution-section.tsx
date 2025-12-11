'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
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

const GAME_ASSETS = [
  { 
    name: "DayZ", 
    src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/c1e29c8d-fe18-432f-91cc-e817f8ee3f8d-bravoboost-com-br/assets/images/dz-8.webp",
    width: 300,
    height: 400
  },
  { 
    name: "Counter-Strike 2", 
    src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/c1e29c8d-fe18-432f-91cc-e817f8ee3f8d-bravoboost-com-br/assets/images/cs2-9.jpg",
    width: 300,
    height: 400
  },
  { 
    name: "Valorant", 
    src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/c1e29c8d-fe18-432f-91cc-e817f8ee3f8d-bravoboost-com-br/assets/images/val-10.jpg",
    width: 300,
    height: 400
  },
  { 
    name: "FC 24", 
    src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/c1e29c8d-fe18-432f-91cc-e817f8ee3f8d-bravoboost-com-br/assets/images/fc24-11.jpg",
    width: 300,
    height: 400
  },
  { 
    name: "Call of Duty MW", 
    src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/c1e29c8d-fe18-432f-91cc-e817f8ee3f8d-bravoboost-com-br/assets/images/COD-MW-19.webp",
    width: 300,
    height: 400
  },
  { 
    name: "GTA V", 
    src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/c1e29c8d-fe18-432f-91cc-e817f8ee3f8d-bravoboost-com-br/assets/images/gtav-15.png",
    width: 300,
    height: 400
  },
  { 
    name: "Rainbow Six", 
    src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/c1e29c8d-fe18-432f-91cc-e817f8ee3f8d-bravoboost-com-br/assets/images/r6-13.webp",
    width: 300,
    height: 400
  },
  { 
    name: "Apex Legends", 
    src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/c1e29c8d-fe18-432f-91cc-e817f8ee3f8d-bravoboost-com-br/assets/images/apex-2.jpg",
    width: 300,
    height: 400
  },
  { 
    name: "Fortnite", 
    src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/c1e29c8d-fe18-432f-91cc-e817f8ee3f8d-bravoboost-com-br/assets/images/fn-14.jpg",
    width: 300,
    height: 400
  },
];

export default function GamesSolutionSection() {
  return (
    <section className="relative w-full overflow-hidden bg-[#1A0F0F] py-20 lg:py-24 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-16">
          
          <motion.div 
            className="w-full lg:w-5/12 mb-12 lg:mb-0"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <div className="flex flex-col items-start text-left">
              <motion.p 
                className="text-[#B0B8D4] font-body text-base lg:text-lg mb-2"
                variants={fadeInLeft}
                transition={{ duration: 0.5 }}
              >
                A solução para todos os jogos!
              </motion.p>
              
              <motion.div 
                className="h-[3px] w-24 bg-[#FF3333] mb-6 rounded-full"
                variants={fadeInLeft}
                transition={{ duration: 0.5 }}
                initial={{ width: 0 }}
                whileInView={{ width: 96 }}
                viewport={{ once: true }}
              />
              
              <motion.h2 
                className="font-display font-bold text-4xl lg:text-[2.75rem] leading-[1.2] text-white mb-6"
                variants={fadeInUp}
                transition={{ duration: 0.6 }}
              >
                Deixe o lag no passado
              </motion.h2>
              
              <motion.p 
                className="font-body text-[#B0B8D4] text-base leading-relaxed mb-6"
                variants={fadeInUp}
                transition={{ duration: 0.6 }}
              >
                Feito por gamers para gamers. Aumente FPS, reduza micro-stutters e ganhe resposta nos inputs — tudo com técnica profissional.
              </motion.p>
              
              <motion.div 
                className="mb-8"
                variants={fadeInUp}
                transition={{ duration: 0.6 }}
              >
                <span className="font-body italic text-white text-lg font-medium">
                  Lag não é desculpa. É escolha.
                </span>
              </motion.div>
              
              <motion.a 
                href="#otimizar" 
                className="inline-flex items-center justify-center bg-[#FF3333] hover:bg-[#d62b2b] text-white font-semibold rounded-full px-8 py-4 transition-all duration-300 transform hover:scale-105 shadow-[0_4px_12px_rgba(255,51,51,0.3)] text-base"
                variants={fadeInUp}
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.98 }}
              >
                Otimize seu PC agora
              </motion.a>
            </div>
          </motion.div>
          
          <motion.div 
            className="w-full lg:w-7/12 relative"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeInRight}
            transition={{ duration: 0.8 }}
          >
            <div className="absolute left-0 top-0 bottom-0 w-16 lg:w-32 bg-gradient-to-r from-[#1A0F0F] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-16 lg:w-32 bg-gradient-to-l from-[#1A0F0F] to-transparent z-10 pointer-events-none" />
            
            <div className="flex overflow-hidden group select-none mask-linear-fade">
              <div className="flex animate-scroll hover:pause-scroll gap-6 pl-6">
                {GAME_ASSETS.map((game, index) => (
                    <motion.div 
                      key={`game-1-${index}`} 
                      className="relative flex-none w-[180px] sm:w-[220px] aspect-[3/4] rounded-xl overflow-hidden border border-[#3A2020] shadow-lg"
                    >
                      <BorderBeam 
                        className="inset-0 top-0 left-0"
                        lightColor="#DC143C"
                        lightWidth={150}
                        duration={8}
                        borderWidth={3}
                      />
                      <Image
                        src={game.src}
                        alt={game.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 180px, 220px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <span className="text-white font-display font-bold text-sm tracking-wide opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden">
                          {game.name}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                  
                  {GAME_ASSETS.map((game, index) => (
                    <motion.div 
                      key={`game-2-${index}`} 
                      className="relative flex-none w-[180px] sm:w-[220px] aspect-[3/4] rounded-xl overflow-hidden border border-[#3A2020] shadow-lg"
                    >
                      <BorderBeam 
                        className="inset-0 top-0 left-0"
                        lightColor="#DC143C"
                        lightWidth={150}
                        duration={8}
                        borderWidth={3}
                      />
                      <Image
                        src={game.src}
                        alt={game.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 180px, 220px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                    </motion.div>
                  ))}
              </div>
            </div>
          </motion.div>
          
        </div>
      </div>

      <style jsx global>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
        .hover\\:pause-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}