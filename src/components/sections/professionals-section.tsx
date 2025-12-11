'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Check, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';
import { BorderBeam } from '@/components/ui/border-beam';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';
import { Rating } from '@/components/ui/rating';
import ShinyText from '@/components/ShinyText';

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

  const professionals = [
    {
      id: 1,
      name: "FROGMANI",
      followers: "+200K de seguidores",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      social: "/Frogman1",
      platform: "twitch",
      twitchUrl: "#",
    },
    {
      id: 2,
      name: "SKIPNHO",
      followers: "1.3M+ de seguidores",
      image: "https://randomuser.me/api/portraits/men/75.jpg",
      social: "skipnho",
      platform: "youtube",
      youtubeUrl: "#",
    },
    {
      id: 3,
      name: "DILERA",
      followers: "+500K de seguidores",
      image: "https://randomuser.me/api/portraits/men/44.jpg",
      social: "dilera",
      platform: "twitch",
      twitchUrl: "#",
    },
    {
      id: 4,
      name: "LAND1N",
      followers: "+400K de seguidores",
      image: "https://randomuser.me/api/portraits/men/22.jpg",
      social: "land1n",
      platform: "twitch",
      twitchUrl: "#",
    },
    {
      id: 5,
      name: "SHAPP2K",
      followers: "+300K de seguidores",
      image: "https://randomuser.me/api/portraits/men/67.jpg",
      social: "shapp2k",
      platform: "twitch",
      twitchUrl: "#",
    },
  ];

  const carouselTestimonials = [
    {
      name: 'Cliente Bravo',
      role: 'Gamer',
      company: 'Smidex',
      avatar: 'https://randomuser.me/api/portraits/men/11.jpg',
      rating: 5,
      content: "Incrível mano o jogo tá mais rápido e o FPS tá batendo no piko de 300"
    },
    {
      name: 'Gamer Pro',
      role: 'Streamer',
      company: 'Twitch',
      avatar: 'https://randomuser.me/api/portraits/men/28.jpg',
      rating: 5,
      content: "Com os gráficos no médio e a resolução nativa. Só baixei e fui jogar. N mexi em nada."
    },
    {
      name: 'Cliente Smidex',
      role: 'Pro Player',
      company: 'eSports',
      avatar: 'https://randomuser.me/api/portraits/men/53.jpg',
      rating: 5,
      content: "Vim opinar sobre o Smidex Boost!! 10/10, excelente, eu tava jogando com fps cravado."
    },
    {
      name: 'Streamer',
      role: 'Content Creator',
      company: 'YouTube',
      avatar: 'https://randomuser.me/api/portraits/men/91.jpg',
      rating: 5,
      content: "O delay realmente diminuiu e a fluidez aumentou e muito. Salvou pra kct."
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % professionals.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + professionals.length) % professionals.length);
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
              {/* Cards Container */}
              <div className="flex gap-4 overflow-hidden">
                {getVisiblePros().map((pro, index) => (
                  <motion.div 
                    key={`${pro.id}-${index}`} 
                    className="relative w-full md:w-1/2 flex-shrink-0 cursor-default"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    {/* Card Body */}
                    <div 
                      className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-[#2A1414]"
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
                        className="object-cover object-top"
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
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Controls */}
              <div className="flex gap-2 text-white mt-4">
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
                <ShinyText 
                  text="Profissionais" 
                  speed={3} 
                  className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B6B] to-[#FF3333] font-display font-bold"
                />{" "}
                <span className="text-white">que já otimizaram com Smidex Boost</span>
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

      {/* TESTIMONIALS CAROUSEL SECTION */}
      <section className='py-8 sm:py-16 lg:py-24'>
        <Carousel
          className='mx-auto flex max-w-7xl gap-12 px-4 max-sm:flex-col sm:items-center sm:gap-16 sm:px-6 lg:gap-24 lg:px-8'
          opts={{
            align: 'start',
            slidesToScroll: 1
          }}
        >
          <div className='space-y-4 sm:w-1/2 lg:w-1/3'>
            <p className='text-[#FF3333] text-sm font-medium uppercase'>Clientes Reais</p>

            <h2 className='text-2xl font-semibold sm:text-3xl lg:text-4xl text-white'>Feedback dos Clientes</h2>

            <p className='text-[#D4B0B0] text-xl'>
              O veredito é unânime: menos lag, mais FPS.
            </p>

            <div className='flex items-center gap-4'>
              <CarouselPrevious
                variant='default'
                className='disabled:bg-[#FF3333]/10 disabled:text-[#FF3333] static translate-y-0 rounded-md disabled:opacity-100 bg-[#FF3333] hover:bg-[#D42222] text-black'
              />
              <CarouselNext
                variant='default'
                className='disabled:bg-[#FF3333]/10 disabled:text-[#FF3333] static translate-y-0 rounded-md disabled:opacity-100 bg-[#FF3333] hover:bg-[#D42222] text-black'
              />
            </div>
          </div>

          <div className='relative max-w-196 sm:w-1/2 lg:w-2/3'>
            <CarouselContent className='sm:-ml-6'>
              {carouselTestimonials.map((testimonial, index) => (
                <CarouselItem key={index} className='sm:pl-6 lg:basis-1/2'>
                  <Card className='hover:border-[#FF3333] h-full transition-colors duration-300 bg-[#2A1414] border-[#3A2020]'>
                    <CardContent className='space-y-5'>
                      <div className='flex items-center gap-3'>
                        <Avatar className='size-10 rounded-full'>
                          <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                          <AvatarFallback className='rounded-full text-sm bg-[#3A2020] text-white'>
                            {testimonial.name
                              .split(' ', 2)
                              .map(n => n[0])
                              .join('')}
                          </AvatarFallback>
                        </Avatar>

                        <div className='flex-1'>
                          <h4 className='font-medium text-white'>{testimonial.name}</h4>
                          <p className='text-[#D4B0B0] text-sm'>
                            {testimonial.role} at{' '}
                            <span className='text-[#FF3333] font-semibold'>{testimonial.company}</span>
                          </p>
                        </div>
                      </div>

                      <Rating readOnly variant='yellow' size={24} value={testimonial.rating} precision={0.5} />
                      <p className='text-gray-200'>{testimonial.content}</p>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
          </div>
        </Carousel>
      </section>
    </div>
  );
}