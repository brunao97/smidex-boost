'use client';

import { Target, ShieldCheck, Settings } from 'lucide-react';
import { motion } from 'framer-motion';
import { BorderBeam } from '@/components/ui/border-beam';
import { SpeedIcon } from '@/components/icons/speed-icon';
import { useState, useEffect, useRef } from 'react';

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
  const [activeCard, setActiveCard] = useState(0);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  const cards = [
    {
      id: 1,
      icon: <SpeedIcon className="h-12 w-12 text-[#FF3333]" strokeWidth={1.5} />,
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
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear"
          }}
          className="inline-block"
        >
          <Settings className="h-12 w-12 text-[#FF3333]" strokeWidth={1.5} />
        </motion.div>
      ),
      title: "Suporte Pós-Serviço",
      description:
        "Nossa missão não termina no reboot. Oferecemos suporte para garantir que sua otimização permaneça estável e poderosa a longo prazo.",
    },
  ];

  useEffect(() => {
    const container = cardsContainerRef.current;
    if (!container) return;

    const updateActiveCard = () => {
      const cardElements = Array.from(container.querySelectorAll('[data-card-index]')) as HTMLElement[];
      if (cardElements.length === 0) return;

      // Para scroll horizontal, calcular baseado no scrollLeft e posição dos cards
      const containerWidth = container.clientWidth;
      const scrollLeft = container.scrollLeft;
      const containerCenter = scrollLeft + containerWidth / 2;

      let closestIndex = 0;
      let minDistance = Infinity;

      cardElements.forEach((card) => {
        // Obter posição absoluta do card
        const cardRect = card.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        
        // Calcular posição do card relativa ao container considerando o scroll
        const cardLeft = cardRect.left - containerRect.left + scrollLeft;
        const cardWidth = cardRect.width;
        const cardCenter = cardLeft + cardWidth / 2;
        
        const distance = Math.abs(cardCenter - containerCenter);

        if (distance < minDistance) {
          minDistance = distance;
          const index = parseInt(card.getAttribute('data-card-index') || '0');
          closestIndex = index;
        }
      });

      setActiveCard(closestIndex);
    };

    let rafId: number | null = null;
    let scrollTimeout: NodeJS.Timeout;
    let lastScrollLeft = container.scrollLeft;

    // Atualizar durante o scroll horizontal usando RAF
    const handleScroll = () => {
      const currentScrollLeft = container.scrollLeft;
      
      // Só atualizar se o scroll realmente mudou
      if (Math.abs(currentScrollLeft - lastScrollLeft) < 1) return;
      
      lastScrollLeft = currentScrollLeft;

      if (rafId) {
        cancelAnimationFrame(rafId);
      }

      rafId = requestAnimationFrame(() => {
        updateActiveCard();
        rafId = null;
      });

      // Atualizar quando scroll parar (importante para snap scroll horizontal)
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        updateActiveCard();
      }, 150);
    };

    // scrollend event (melhor para snap scroll horizontal)
    const handleScrollEnd = () => {
      updateActiveCard();
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    
    if ('onscrollend' in window) {
      container.addEventListener('scrollend', handleScrollEnd, { passive: true });
    }

    // IntersectionObserver otimizado para scroll horizontal
    const observerOptions = {
      root: container,
      rootMargin: '0px',
      threshold: [0.3, 0.5, 0.7]
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      let maxRatio = 0;
      let activeIndex = 0;

      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
          maxRatio = entry.intersectionRatio;
          activeIndex = parseInt(entry.target.getAttribute('data-card-index') || '0');
        }
      });

      if (maxRatio > 0.3) {
        setActiveCard(activeIndex);
      }
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const cardElements = container.querySelectorAll('[data-card-index]');
    cardElements.forEach((card) => observer.observe(card));

    // Inicializar
    updateActiveCard();

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      clearTimeout(scrollTimeout);
      container.removeEventListener('scroll', handleScroll);
      observer.disconnect();
      if ('onscrollend' in window) {
        container.removeEventListener('scrollend', handleScrollEnd);
      }
    };
  }, []);

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
            ref={cardsContainerRef}
            className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-12 -mx-4 px-4 md:mx-0 md:px-0 scrollbar-hide"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
          >
            {cards.map((card, index) => (
              <motion.div
                key={card.id}
                data-card-index={index}
                className="flex-shrink-0 w-[85%] md:w-[45%] lg:w-[23.5%] snap-start"
                variants={fadeInUp}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div 
                  className="h-full bg-[#2A1414] border border-[#FF3333]/30 rounded-xl p-8 flex flex-col gap-6 group relative overflow-hidden"
                >
                  <BorderBeam 
                    className="inset-0 top-0 left-0"
                    lightColor="#DC143C"
                    lightWidth={150}
                    duration={8}
                    borderWidth={3}
                  />
                  <div className="p-0 relative z-10">
                    {card.icon}
                  </div>
                  <div className="flex flex-col gap-4 relative z-10">
                    <h4 className="text-xl font-bold font-display text-white">
                      {card.title}
                    </h4>
                    <p className="text-[#B0B8D4] text-[15px] leading-relaxed font-body">
                      {card.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <div className="flex justify-center gap-2 mt-4 md:hidden">
            {cards.map((_, index) => (
              <span
                key={index}
                className={`h-2 w-2 rounded-full transition-colors duration-300 ${
                  index === activeCard ? 'bg-[#FF3333]' : 'bg-[#3A2020]'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}