'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Check, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { BorderBeam } from '@/components/ui/border-beam';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi
} from '@/components/ui/carousel';
import { Rating } from '@/components/ui/rating';
import ShinyText from '@/components/ShinyText';

// Cache para profissionais gerados
const PROFESSIONALS_CACHE_KEY = 'professionals_cache';
const CACHE_DURATION_DAYS = 7; // Atualizar a cada semana

interface Professional {
  id: number;
  name: string;
  followers: string;
  image: string;
  social: string;
  platform: 'twitch' | 'youtube';
  twitchUrl?: string;
  youtubeUrl?: string;
}

// Função para gerar nome de streamer brasileiro aleatório
const generateStreamerName = (): string => {
  const prefixes = ['BR_', 'PRO_', 'KING_', 'MASTER_', 'GAMER_', 'GG_', 'ACE_', 'TOP_', 'BEST_', 'ELITE_'];
  const names = ['SILVER', 'GOLD', 'DIAMOND', 'PLATINUM', 'RUBY', 'SAPPHIRE', 'EMERALD', 'ONYX', 'CRYSTAL', 'TITANIUM'];
  const suffixes = ['BR', 'PRO', 'GG', 'ACE', 'GOD', 'KING', 'MASTER', 'BOSS', 'LEGEND', 'CHAMP'];

  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const name = names[Math.floor(Math.random() * names.length)];
  const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];

  return Math.random() > 0.3 ? `${prefix}${name}` : `${prefix}${name}${suffix}`;
};

// Função para gerar seguidores aleatórios
const generateFollowers = (): string => {
  const amounts = [
    '+50K de seguidores',
    '+75K de seguidores',
    '+100K de seguidores',
    '+150K de seguidores',
    '+200K de seguidores',
    '+250K de seguidores',
    '+300K de seguidores',
    '+400K de seguidores',
    '+500K de seguidores',
    '+750K de seguidores',
    '1M+ de seguidores',
    '1.2M+ de seguidores',
    '1.5M+ de seguidores',
    '2M+ de seguidores'
  ];
  return amounts[Math.floor(Math.random() * amounts.length)];
};

// Função para buscar profissionais aleatórios
const fetchRandomProfessionals = async (): Promise<Professional[]> => {
  try {
    console.log('🎭 Gerando profissionais aleatórios...');

    // Buscar 10 pessoas aleatórias da API
    const response = await fetch('https://randomuser.me/api/?results=10&nat=br&gender=male');

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();

    // Gerar profissionais baseados nos dados aleatórios
    const professionals: Professional[] = data.results.map((user: any, index: number) => {
      const streamerName = generateStreamerName();
      const followers = generateFollowers();
      const platform = Math.random() > 0.3 ? 'twitch' : 'youtube';

      return {
        id: index + 1,
        name: streamerName,
        followers: followers,
        image: user.picture.large,
        social: streamerName.toLowerCase(),
        platform: platform,
        twitchUrl: platform === 'twitch' ? '#' : undefined,
        youtubeUrl: platform === 'youtube' ? '#' : undefined,
      };
    });

    console.log('✅ Profissionais gerados:', professionals.length);
    return professionals;

  } catch (error) {
    console.error('❌ Erro ao gerar profissionais:', error);

    // Fallback com profissionais estáticos
    return [
      {
        id: 1,
        name: generateStreamerName(),
        followers: generateFollowers(),
        image: "https://randomuser.me/api/portraits/men/32.jpg",
        social: "streamer1",
        platform: "twitch",
        twitchUrl: "#",
      },
      {
        id: 2,
        name: generateStreamerName(),
        followers: generateFollowers(),
        image: "https://randomuser.me/api/portraits/men/75.jpg",
        social: "streamer2",
        platform: "youtube",
        youtubeUrl: "#",
      },
      {
        id: 3,
        name: generateStreamerName(),
        followers: generateFollowers(),
        image: "https://randomuser.me/api/portraits/men/44.jpg",
        social: "streamer3",
        platform: "twitch",
        twitchUrl: "#",
      },
      {
        id: 4,
        name: generateStreamerName(),
        followers: generateFollowers(),
        image: "https://randomuser.me/api/portraits/men/22.jpg",
        social: "streamer4",
        platform: "twitch",
        twitchUrl: "#",
      },
      {
        id: 5,
        name: generateStreamerName(),
        followers: generateFollowers(),
        image: "https://randomuser.me/api/portraits/men/67.jpg",
        social: "streamer5",
        platform: "twitch",
        twitchUrl: "#",
      },
    ];
  }
};

// Hook para gerenciar cache de profissionais
const useProfessionalsCache = () => {
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProfessionals = async () => {
      try {
        // Verificar cache
        const cached = localStorage.getItem(PROFESSIONALS_CACHE_KEY);

        if (cached) {
          const { professionals: cachedPros, timestamp } = JSON.parse(cached);
          const daysSinceUpdate = (Date.now() - timestamp) / (1000 * 60 * 60 * 24);

          // Se cache é válido (menos de 7 dias), usar dados cacheados
          if (daysSinceUpdate < CACHE_DURATION_DAYS) {
            console.log('📦 Usando profissionais do cache (', Math.round(daysSinceUpdate), 'dias atrás)');
            setProfessionals(cachedPros);
            setIsLoading(false);
            return;
          }
        }

        // Cache expirado ou inexistente, gerar novos profissionais
        console.log('🎲 Cache expirado, gerando novos profissionais...');
        const freshPros = await fetchRandomProfessionals();

        // Salvar no cache
        const cacheData = {
          professionals: freshPros,
          timestamp: Date.now()
        };
        localStorage.setItem(PROFESSIONALS_CACHE_KEY, JSON.stringify(cacheData));

        setProfessionals(freshPros);

      } catch (error) {
        console.error('Erro ao carregar profissionais:', error);
        // Em caso de erro, gerar profissionais locais
        const fallbackPros = await fetchRandomProfessionals();
        setProfessionals(fallbackPros);
      } finally {
        setIsLoading(false);
      }
    };

    loadProfessionals();
  }, []);

  return { professionals, isLoading };
};

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

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0
  }),
  center: {
    x: 0,
    opacity: 1
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0
  })
};

export default function ProfessionalsSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);
  const { professionals, isLoading } = useProfessionalsCache();

  // Movimento automático do carousel a cada 5 segundos
  useEffect(() => {
    if (!carouselApi) return;

    const interval = setInterval(() => {
      carouselApi.scrollNext();
    }, 5000); // 5 segundos

    return () => clearInterval(interval);
  }, [carouselApi]);

  const carouselTestimonials = [
    {
      name: 'Cliente Smidex',
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
    },
    {
      name: 'Player Casual',
      role: 'Gamer',
      company: 'Steam',
      avatar: 'https://randomuser.me/api/portraits/women/45.jpg',
      rating: 3,
      content: "Funcionou bem, mas esperava mais. Melhorou um pouco o desempenho."
    },
    {
      name: 'Novato',
      role: 'Iniciante',
      company: 'Epic Games',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      rating: 2,
      content: "Não vi muita diferença, talvez precise configurar melhor."
    },
    {
      name: 'Experiente',
      role: 'Veterano',
      company: 'Battle.net',
      avatar: 'https://randomuser.me/api/portraits/women/28.jpg',
      rating: 4,
      content: "Bom produto, ajudou bastante. Recomendo para quem tem PC mais fraco."
    },
    {
      name: 'Testador',
      role: 'Beta Tester',
      company: 'Discord',
      avatar: 'https://randomuser.me/api/portraits/men/67.jpg',
      rating: 3,
      content: "Funcional, mas poderia ter mais opções de customização."
    }
  ];

  const nextSlide = () => {
    if (professionals.length === 0) return;
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % professionals.length);
  };

  const prevSlide = () => {
    if (professionals.length === 0) return;
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + professionals.length) % professionals.length);
  };

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const swipeThreshold = 50;
    if (info.offset.x < -swipeThreshold) {
      nextSlide();
    } else if (info.offset.x > swipeThreshold) {
      prevSlide();
    }
  };

  const getVisiblePros = () => {
    if (professionals.length === 0) return [];

    // Show 2 cards on desktop (looping)
    const card1 = professionals[currentSlide];
    const card2 = professionals[(currentSlide + 1) % professionals.length];
    return [card1, card2];
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="bg-[#1A0F0F] text-white font-body selection:bg-[#FF3333] selection:text-white pb-32">
        <section className="relative overflow-hidden py-16 md:py-24">
          <div className="container mx-auto px-6 md:px-12 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="relative">
                <div className="flex gap-4 overflow-hidden">
                  {[1, 2].map((index) => (
                    <div key={index} className="relative w-full md:w-1/2 flex-shrink-0">
                      <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-[#2A1414] bg-[#2A1414] animate-pulse">
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90"></div>
                        <div className="absolute bottom-0 left-0 w-full p-6">
                          <div className="h-4 bg-gray-600 rounded mb-2"></div>
                          <div className="h-8 bg-gray-600 rounded mb-2"></div>
                          <div className="h-4 bg-gray-600 rounded w-2/3"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col justify-center">
                <h2 className="font-display font-bold text-4xl md:text-5xl leading-tight mb-6 text-white">
                  Carregando profissionais...
                </h2>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="bg-[#1A0F0F] text-white font-body selection:bg-[#FF3333] selection:text-white pb-16 sm:pb-24 md:pb-32">
      {/* PROFESSIONAL SECTION */}
      <section className="relative overflow-hidden py-12 sm:py-16 md:py-24">
        <motion.div 
          className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#FF3333] opacity-5 blur-[150px] rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2"
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 0.05, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
        />

        <div className="container mx-auto px-4 sm:px-6 md:px-12 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center">
            
            <motion.div 
              className="relative"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInLeft}
              transition={{ duration: 0.7 }}
            >
              {/* Cards Container with Drag */}
              <motion.div 
                className="flex gap-4 overflow-hidden cursor-grab active:cursor-grabbing"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={handleDragEnd}
              >
                <AnimatePresence initial={false} custom={direction} mode="popLayout">
                  {getVisiblePros().map((pro, index) => (
                    <motion.div 
                      key={`${currentSlide}-${pro.id}-${index}`} 
                      className="relative w-full md:w-1/2 flex-shrink-0 cursor-default pointer-events-none"
                      custom={direction}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{
                        x: { type: "spring", stiffness: 300, damping: 30 },
                        opacity: { duration: 0.2 }
                      }}
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
                        <div className="absolute bottom-0 left-0 w-full p-4 sm:p-5 md:p-6">
                          <div className="text-[#FF3333] text-xs sm:text-sm font-semibold mb-1">
                            {pro.followers}
                          </div>
                          <h3 className="font-display font-black text-xl sm:text-2xl md:text-3xl tracking-wider text-white italic uppercase mb-2">
                            {pro.name}
                          </h3>
                          
                          <div className="flex items-center gap-2 text-gray-300 text-xs sm:text-sm">
                             {pro.platform === 'twitch' ? (
                                <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3 sm:w-4 sm:h-4 text-[#FF3333]"> 
                                  <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z"/>
                                </svg>
                             ) : (
                                <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3 sm:w-4 sm:h-4 text-[#FF3333]">
                                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                                </svg>
                             )}
                             <span>{pro.social}</span>
                          </div>
                          
                          {/* Pagination Dots visual for card */}
                          <div className="flex gap-1 mt-3 sm:mt-4">
                             {professionals.map((_, dotIndex) => (
                               <div
                                 key={dotIndex}
                                 className={`w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full transition-colors ${dotIndex === currentSlide ? 'bg-white' : 'bg-gray-600'}`}
                               ></div>
                             ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>

              {/* Controls */}
              <div className="flex gap-2 text-white mt-3 sm:mt-4 justify-center">
                <motion.button 
                  onClick={prevSlide}
                  className="cursor-pointer w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-lg bg-[#2A1414] border border-[#3A2020] hover:bg-[#FF3333] hover:border-[#FF3333] transition-all duration-300 group"
                  aria-label="Previous slide"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 group-hover:text-black transition-colors" />
                </motion.button>
                <motion.button 
                  onClick={nextSlide}
                  className="cursor-pointer w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-lg bg-[#2A1414] border border-[#3A2020] hover:bg-[#FF3333] hover:border-[#FF3333] transition-all duration-300 group"
                  aria-label="Next slide"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:text-black transition-colors" />
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
                className="font-display font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight mb-4 sm:mb-5 md:mb-6"
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
                className="text-[#D4B0B0] text-sm sm:text-base md:text-lg leading-relaxed mb-6 sm:mb-7 md:mb-8"
                variants={fadeInUp}
                transition={{ duration: 0.6 }}
              >
                A mesma otimização de alta precisão usada por Jogadores Profissionais e Criadores de Conteúdo para garantir 100% de estabilidade e FPS máximo. Sua máquina no nível Pro, sem travamentos ou falhas.
              </motion.p>

              <motion.ul 
                className="space-y-3 sm:space-y-4 mb-6 sm:mb-7 md:mb-8"
                variants={staggerContainer}
              >
               ={[
                  { title: "FPS no Máximo", desc: "Mais quadros, mais fluidez." },
                  { title: "Estabilidade Profissional", desc: "Zero lag em momentos críticos." },
                  { title: "Foco Total no Jogo", desc: "Seu PC funcionando com a dedicação de um Pro Player." }
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 sm:gap-3">
                    <div className="mt-0.5 sm:mt-1 flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#FF3333] flex items-center justify-center text-black">
                      <Check className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 stroke-[3]" />
                    </div>
                    <div>
                      <strong className="text-white block text-sm sm:text-base">{item.title}:</strong>
                      <span className="text-xs sm:text-sm text-[#D4B0B0]">{item.desc}</span>
                    </div>
                  </li>
                ))}
              </motion.ul>

              <motion.p 
                className="font-semibold text-white text-base sm:text-lg"
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
          setApi={setCarouselApi}
        >
          <div className='space-y-4 sm:w-1/2 lg:w-1/3'>
            <p className='text-[#FF3333] text-sm font-medium uppercase'>Clientes Reais</p>

            <h2 className='text-2xl font-semibold sm:text-3xl lg:text-4xl text-white'>Feedback dos Clientes</h2>

            <p className='text-[#D4B0B0] text-xl'>
              O veredito é unânime: menos lag, mais FPS.
            </p>

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