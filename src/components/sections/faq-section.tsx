'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
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

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const faqData = [
  {
    question: "O processo é seguro?",
    answer: "Sim, somos uma empresa oficial registrada sob o CNPJ 46.389.461/0001-07. Com anos de experiência no mercado, garantimos a você a melhor experiência de jogo com total segurança."
  },
  {
    question: "Como é realizado o serviço?",
    answer: "O serviço é realizado remotamente, utilizando ferramentas como AnyDesk para acesso ao seu PC e chamadas de vídeo via Discord ou WhatsApp para suporte adicional."
  },
  {
    question: "O serviço é compatível com notebooks?",
    answer: "Sim, nosso serviço de otimização também é compatível com notebooks."
  },
  {
    question: "O serviço é compatível com consoles ou celulares?",
    answer: "Não, nosso serviço é exclusivamente para PCs e notebooks. Não oferecemos suporte para consoles ou celulares."
  },
  {
    question: "O serviço pode causar banimentos em jogos?",
    answer: "Não, nosso serviço de otimização não causa banimentos em jogos."
  },
  {
    question: "O serviço pode causar danos ao PC?",
    answer: "Não, nosso processo de otimização é seguro e não causa danos ao seu PC. Trabalhamos para melhorar a performance e a segurança do seu sistema."
  }
];

export default function FaqSection() {
  const [openItem, setOpenItem] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenItem(openItem === index ? null : index);
  };

  return (
    <section className="bg-[#1A0F0F] py-20 px-4 md:px-8 overflow-hidden relative font-sans text-white border-t border-[#2A1414]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <motion.div 
            className="lg:col-span-4 flex flex-col gap-8 lg:pt-0"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInLeft}
            transition={{ duration: 0.7 }}
          >
            <div className="flex flex-col gap-6 items-start">
              <motion.div
                className="bg-[#2A1414] border border-[#3A2020] text-white font-semibold py-6 px-8 rounded-xl w-full text-center lg:text-left shadow-lg"
              >
                <h3 className="text-lg tracking-wide">Perguntas Frequentes</h3>
              </motion.div>
              
              <Link 
                href="https://api.whatsapp.com/send/?phone=5566999236481&text&type=phone_number&app_absent=0" 
                target="_blank"
                className="w-full group"
              >
                <motion.button 
                  className="cursor-pointer w-full bg-[#FF3333] hover:bg-[#d62626] text-white font-bold text-base py-4 px-8 rounded-full flex items-center justify-center gap-3 transition-all duration-300 shadow-[0_4px_12px_rgba(255,51,51,0.2)]"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <WhatsAppIcon className="w-6 h-6" />
                  <span>Entrar em contato</span>
                </motion.button>
              </Link>
            </div>
          </motion.div>

          <motion.div 
            className="lg:col-span-8 flex flex-col gap-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
          >
            {faqData.map((item, index) => (
              <motion.div 
                key={index}
                className={cn(
                  "bg-[#251010] border rounded-xl overflow-hidden transition-all duration-300 group relative",
                  openItem === index 
                    ? "border-red-500/50 shadow-[0_0_15px_rgba(220,38,38,0.15)] bg-[#2F1414]" 
                    : "border-[#3A2020] hover:border-red-500/30"
                )}
                variants={fadeInUp}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ y: -2 }}
              >
                <BorderBeam 
                  className="inset-0 top-0 left-0"
                  lightColor="#DC143C"
                  lightWidth={150}
                  duration={8}
                  borderWidth={3}
                />
                <button
                  onClick={() => toggleItem(index)}
                  className="cursor-pointer w-full flex items-center justify-between p-6 text-left focus:outline-none relative z-10"
                >
                  <span className={cn(
                    "text-lg font-medium pr-8 transition-colors duration-200",
                    openItem === index ? "text-white" : "text-gray-100 group-hover:text-white"
                  )}>
                    {item.question}
                  </span>
                  <motion.div 
                    className={cn(
                      "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300",
                      openItem === index ? "bg-red-600/20 text-red-500" : "bg-[#1A0F0F] text-gray-400 group-hover:text-red-400"
                    )}
                    animate={{ rotate: openItem === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="w-5 h-5" />
                  </motion.div>
                </button>
                
                <AnimatePresence>
                  {openItem === index && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 pt-0 text-[#D4B0B0] leading-relaxed border-t border-[#3A2020]/50 mt-2">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}