'use client';

import { Gauge, Target, ShieldCheck, Settings } from 'lucide-react';
import { motion } from 'framer-motion';
import { BorderBeam } from '@/components/ui/border-beam';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12
    }
  }
};

export default function LagProblemSection() {
  const cards = [
    {
      id: 1,
      icon: <Gauge className="h-12 w-12 text-[#FF3333]" strokeWidth={1.5} />,
      title: "FPS no Máximo",
      description:
        "Aumente seus frames por segundo e alcance jogos mais suaves, rápidos e competitivos.",
    },
    {
      id: 2,
      icon: <Target className="h-12 w-12 text-[#FF3333]" strokeWidth={1.5} />,
      title: "Menos Inputlag",
      description:
        "Sinta a diferença no tempo de resposta. Cada clique, comando e movimento acontece na hora — sem atraso.",
    },
    {
      id: 3,
      icon: (
        <ShieldCheck className="h-12 w-12 text-[#FF3333]" strokeWidth={1.5} />
      ),
      title: "Acesso Remoto Seguro e Rápido",
      description:
        "Soluções implementadas em minutos. Você nos acompanha ao vivo, sem sair de casa, e vê a diferença de performance acontecer diante dos seus olhos.",
    },
    {
      id: 4,
      icon: (
        <Settings className="h-12 w-12 text-[#FF3333]" strokeWidth={1.5} />
      ),
      title: "Suporte Pós-Serviço",
      description:
        "Nossa missão não termina no reboot. Oferecemos suporte para garantir que sua otimização permaneça estável e poderosa a longo prazo.",
    },
  ];

  return (
    <section className="bg-[#1A0F0F] text-white py-20 px-4 md:px-8 overflow-hidden font-body">
      <div className="max-w-[1200px] mx-auto">
        <motion.div 
          className="flex flex-col gap-6 mb-16 px-4 md:px-0"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.h3 
            className="text-3xl md:text-4xl lg:text-5xl font-display font-bold leading-tight text-white max-w-4xl"
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
          >
            Cansado de Perder por causa do LAG?
          </motion.h3>
          <motion.p 
            className="text-gray-300 text-base md:text-lg leading-relaxed max-w-5xl font-normal"
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
          >
            Cada detalhe do seu PC é ajustado com precisão para entregar{' '}
            <span className="text-[#FF3333] font-bold">
              máximo desempenho, FPS estável e resposta imediata
            </span>
            . Somos o único serviço com otimização profunda, suporte dedicado e
            garantia de resultado real.
          </motion.p>
        </motion.div>

        <div className="relative w-full">
          <motion.div 
            className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-12 -mx-4 px-4 md:mx-0 md:px-0 scrollbar-hide"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
          >
            {cards.map((card, index) => (
              <motion.div
                key={card.id}
                className="flex-shrink-0 w-[85%] md:w-[45%] lg:w-[23.5%] snap-start"
                variants={fadeInUp}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <motion.div 
                  className="h-full bg-[#2A1414] border border-[#FF3333]/30 rounded-xl p-8 flex flex-col gap-6 hover:border-[#FF3333] transition-colors duration-300 group relative overflow-hidden"
                  whileHover={{ y: -8, transition: { duration: 0.25 } }}
                >
                  <BorderBeam 
                    className="inset-0 top-0 left-0"
                    lightColor="#DC143C"
                    lightWidth={150}
                    duration={8}
                    borderWidth={3}
                  />
                  <motion.div 
                    className="p-0 transition-transform duration-300 group-hover:-translate-y-1 relative z-10"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    {card.icon}
                  </motion.div>
                  <div className="flex flex-col gap-4 relative z-10">
                    <h4 className="text-xl font-bold font-display text-white">
                      {card.title}
                    </h4>
                    <p className="text-[#B0B8D4] text-[15px] leading-relaxed font-body">
                      {card.description}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          <div className="flex justify-center gap-2 mt-4 md:hidden">
            <span className="h-2 w-2 rounded-full bg-[#FF3333]"></span>
            <span className="h-2 w-2 rounded-full bg-[#3A2020]"></span>
            <span className="h-2 w-2 rounded-full bg-[#3A2020]"></span>
            <span className="h-2 w-2 rounded-full bg-[#3A2020]"></span>
          </div>
        </div>
      </div>
    </section>
  );
}