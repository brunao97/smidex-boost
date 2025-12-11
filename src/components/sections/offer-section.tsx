'use client';

import { useState, useEffect } from 'react';
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
      staggerChildren: 0.08,
      delayChildren: 0.1
    }
  }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 }
};

export default function OfferSection() {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 30, seconds: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        const totalSeconds = prev.hours * 3600 + prev.minutes * 60 + prev.seconds - 1;
        
        if (totalSeconds <= 0) {
          clearInterval(timer);
          return { hours: 0, minutes: 0, seconds: 0 };
        }

        return {
          hours: Math.floor(totalSeconds / 3600),
          minutes: Math.floor((totalSeconds % 3600) / 60),
          seconds: totalSeconds % 60
        };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (num: number) => num.toString().padStart(2, '0');

  return (
    <section className="relative w-full py-20 px-6 bg-[#120505] overflow-hidden">
      <motion.div 
        className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-950/40 via-[#0e0404] to-[#0A0202] pointer-events-none"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      />
      
      <div className="relative z-10 container mx-auto max-w-7xl">
        
        <motion.div 
          className="text-center mb-16 lg:mb-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          transition={{ duration: 0.7 }}
        >
          <motion.h2 
            className="font-display font-bold text-4xl md:text-5xl lg:text-7xl text-white uppercase leading-[1.1] tracking-tight"
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            DESTRAVE SEU DESEMPENHO <br className="hidden md:block" />
            COM <motion.span 
              className="text-[#FF3333] drop-shadow-[0_0_25px_rgba(255,51,51,0.25)]"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >30% OFF!</motion.span>
          </motion.h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          <motion.div 
            className="lg:col-span-5 flex flex-col space-y-10 pt-4 items-center text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            
            <motion.div 
              className="space-y-2"
              variants={fadeInLeft}
              transition={{ duration: 0.6 }}
            >
              <h3 className="font-display font-bold text-2xl md:text-3xl text-white leading-tight">
                Por Que Aproveitar Agora?
              </h3>
              <p className="font-display font-bold text-2xl md:text-3xl text-[#FF3333]">
                (Seu PC Precisa Disso)
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} transition={{ duration: 0.6 }}>
              <p className="font-body text-gray-400 text-sm font-medium uppercase tracking-wider mb-4">
                Oferta expira em:
              </p>
              
              <div className="flex items-center justify-center gap-3 md:gap-4">
                <TimerBlock value={formatTime(timeLeft.hours)} label="horas" delay={0} />
                <TimerBlock value={formatTime(timeLeft.minutes)} label="min" delay={0.1} />
                <TimerBlock value={formatTime(timeLeft.seconds)} label="seg" delay={0.2} />
              </div>

              <motion.div 
                className="mt-8"
                variants={fadeInUp}
                transition={{ duration: 0.6 }}
              >
                 <p className="font-body text-white text-base leading-relaxed opacity-90 max-w-lg">
                    Esta é a sua chance de aplicar a otimização de alta precisão da <span className="text-[#FF3333] font-semibold">Smidex Boost</span> com um desconto imperdível. Garanta a estabilidade, fluidez e FPS que você sempre quis, antes que o tempo acabe!
                  </p>
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div 
            className="lg:col-span-7 w-full"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={scaleIn}
            transition={{ duration: 0.7 }}
          >
            <motion.div 
              className="bg-[#1A1A1A] border border-[#331111] rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-hidden"
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
               <motion.div 
                 className="absolute top-0 right-0 w-64 h-64 bg-red-900/10 blur-[80px] rounded-full pointer-events-none"
                 initial={{ opacity: 0, scale: 0.5 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 viewport={{ once: true }}
                 transition={{ duration: 1 }}
               />

               <div className="relative z-10">
                 <motion.h3 
                   className="font-display font-bold text-2xl md:text-3xl text-white mb-8"
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ duration: 0.5 }}
                 >
                   Otimização Smidex Boost
                 </motion.h3>

                 <motion.ul 
                   className="space-y-5 mb-10"
                   initial="hidden"
                   whileInView="visible"
                   viewport={{ once: true }}
                   variants={staggerContainer}
                 >
                   <BenefitItem title="FPS e Estabilidade MÁXIMA:" description="Seu jogo sem quedas ou travamentos." />
                   <BenefitItem title="Menos Input Lag:" description="Resposta instantânea no jogo." />
                   <BenefitItem title="Formatação Opcional / Windows Ativado:" description="Base limpa e legalizada." />
                   <BenefitItem title="Resposta de Sistema Aprimorada:" description="PC mais rápido para jogos e uso geral." />
                   <BenefitItem title="Otimização de BIOS:" description="Mais vida útil e melhor resposta do hardware." />
                   <BenefitItem title="Overclock Seguro (CPU/RAM/GPU):" description="Máximo desempenho garantido." />
                   <BenefitItem title="Suporte especializado" description="" />
                 </motion.ul>

                 <motion.button 
                   className="w-full bg-[#FF3333] hover:bg-[#d62626] text-white font-display font-bold text-lg py-5 px-8 rounded-xl shadow-[0_4px_20px_rgba(255,51,51,0.3)] hover:shadow-[0_6px_25px_rgba(255,51,51,0.4)] transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 uppercase"
                   whileHover={{ scale: 1.02, y: -3 }}
                   whileTap={{ scale: 0.98 }}
                 >
                   QUERO 30% OFF E FPS MÁXIMO
                 </motion.button>
               </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

const TimerBlock = ({ value, label, delay = 0 }: { value: string; label: string; delay?: number }) => (
  <motion.div 
    className="flex flex-col items-center justify-center gap-2"
    initial={{ opacity: 0, y: 20, scale: 0.9 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
  >
    <motion.div 
      className="w-20 h-20 md:w-28 md:h-28 bg-[#0D0505] border border-[#2A1111] rounded-xl flex items-center justify-center shadow-inner relative overflow-hidden group"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
    >
      <BorderBeam 
        className="inset-0 top-0 left-0"
        lightColor="#DC143C"
        lightWidth={80}
        duration={6}
        borderWidth={2}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
      <span className="font-display font-bold text-4xl md:text-6xl text-[#FF3333] tabular-nums tracking-tight drop-shadow-sm relative z-10">
        {value}
      </span>
    </motion.div>
    <span className="text-xs md:text-sm font-body text-gray-500 font-medium uppercase tracking-wide">
      {label}
    </span>
  </motion.div>
);

const BenefitItem = ({ title, description }: { title: string; description: string }) => (
  <motion.li 
    className="flex items-start gap-4 group"
    variants={fadeInUp}
    transition={{ duration: 0.4 }}
  >
    <div className="mt-1 flex-shrink-0">
      <motion.div 
        className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-[#FF3333] flex items-center justify-center shadow-[0_0_10px_rgba(255,51,51,0.3)]"
        whileHover={{ scale: 1.2 }}
        transition={{ duration: 0.2 }}
      >
        <CheckIcon className="w-3 h-3 md:w-4 md:h-4 text-white stroke-[4]" />
      </motion.div>
    </div>
    <div className="flex-1">
      <p className="font-body text-sm md:text-[15px] leading-relaxed text-gray-300">
        <span className="text-white font-bold">{title}</span> <span>{description}</span>
      </p>
    </div>
  </motion.li>
);

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      {...props}
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}