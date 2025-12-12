'use client';

'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { BorderBeam } from '@/components/ui/border-beam';

// Cache key para armazenar jogos da Steam
const STEAM_GAMES_CACHE_KEY = 'steam_top_games_cache';
const CACHE_DURATION_DAYS = 30; // Atualizar a cada 30 dias

interface SteamGame {
  name: string;
  src: string;
  width: number;
  height: number;
}

// Função para buscar jogos mais jogados da Steam API
const fetchTopSteamGames = async (): Promise<SteamGame[]> => {
  try {
    console.log('🔄 Buscando jogos mais jogados da Steam...');
    const response = await fetch('https://steamapi.xpaw.me/api/mostplayed');

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();

    // Filtrar apenas jogos (remover ferramentas como Wallpaper Engine)
    const gamesOnly = data.filter((game: any) =>
      game.name &&
      !game.name.toLowerCase().includes('engine') &&
      !game.name.toLowerCase().includes('tool') &&
      game.appid
    );

    const topGames = gamesOnly.slice(0, 12).map((game: any) => ({
      name: game.name,
      src: `https://cdn.cloudflare.steamstatic.com/steam/apps/${game.appid}/header.jpg`,
      width: 460,
      height: 215
    }));

    console.log('✅ Jogos atualizados:', topGames.length);
    return topGames;

  } catch (error) {
    console.error('❌ Erro ao buscar jogos da Steam:', error);
    // Em caso de erro, o hook vai usar o cache ou a lista estática
    throw error;
  }
};

// Hook para gerenciar cache e atualização automática
const useSteamGamesCache = () => {
  const [games, setGames] = useState<SteamGame[]>(GAME_ASSETS);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadGames = async () => {
      try {
        // Verificar cache
        const cached = localStorage.getItem(STEAM_GAMES_CACHE_KEY);

        if (cached) {
          const { games: cachedGames, timestamp } = JSON.parse(cached);
          const daysSinceUpdate = (Date.now() - timestamp) / (1000 * 60 * 60 * 24);

          // Se cache é válido (menos de 30 dias), usar dados cacheados
          if (daysSinceUpdate < CACHE_DURATION_DAYS) {
            console.log('📦 Usando jogos do cache (', Math.round(daysSinceUpdate), 'dias atrás)');
            setGames(cachedGames);
            setIsLoading(false);
            return;
          }
        }

        // Cache expirado ou inexistente, buscar novos dados
        console.log('⏰ Cache expirado, buscando jogos atualizados...');
        const freshGames = await fetchTopSteamGames();

        // Salvar no cache
        const cacheData = {
          games: freshGames,
          timestamp: Date.now()
        };
        localStorage.setItem(STEAM_GAMES_CACHE_KEY, JSON.stringify(cacheData));

        setGames(freshGames);

      } catch (error) {
        console.error('Erro ao carregar jogos da API:', error);
        console.log('🔄 Usando lista estática como fallback');

        // Se não há cache válido e API falhou, usar lista estática
        // Mas ainda salvar no cache para tentar novamente na próxima vez
        const cacheData = {
          games: GAME_ASSETS,
          timestamp: Date.now() // Não esperar 30 dias para tentar API novamente
        };
        localStorage.setItem(STEAM_GAMES_CACHE_KEY, JSON.stringify(cacheData));

        setGames(GAME_ASSETS);
      } finally {
        setIsLoading(false);
      }
    };

    loadGames();
  }, []);

  return { games, isLoading };
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

// Lista diversificada de jogos evergreen e atuais
// Por que não usar ranking dinâmico dos mais jogados?
// - Rankings mudam constantemente (novos lançamentos, eventos sazonais)
// - Jogos evergreen garantem consistência visual
// - Evita que imagens quebrem se jogos saírem do top
// - Melhor experiência do usuário com jogos reconhecíveis
const GAME_ASSETS = [
  // Jogos evergreen (sempre populares)
  {
    name: "Counter-Strike 2",
    src: "https://cdn.cloudflare.steamstatic.com/steam/apps/730/header.jpg",
    width: 460,
    height: 215
  },
  {
    name: "Dota 2",
    src: "https://cdn.cloudflare.steamstatic.com/steam/apps/570/header.jpg",
    width: 460,
    height: 215
  },
  {
    name: "Grand Theft Auto V",
    src: "https://cdn.cloudflare.steamstatic.com/steam/apps/271590/header.jpg",
    width: 460,
    height: 215
  },
  {
    name: "Team Fortress 2",
    src: "https://cdn.cloudflare.steamstatic.com/steam/apps/440/header.jpg",
    width: 460,
    height: 215
  },

  // Jogos atuais populares
  {
    name: "Apex Legends",
    src: "https://cdn.cloudflare.steamstatic.com/steam/apps/1172470/header.jpg",
    width: 460,
    height: 215
  },
  {
    name: "ELDEN RING",
    src: "https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/header.jpg",
    width: 460,
    height: 215
  },
  {
    name: "Rust",
    src: "https://cdn.cloudflare.steamstatic.com/steam/apps/252490/header.jpg",
    width: 460,
    height: 215
  },
  {
    name: "PUBG: BATTLEGROUNDS",
    src: "https://cdn.cloudflare.steamstatic.com/steam/apps/578080/header.jpg",
    width: 460,
    height: 215
  },

  // Jogos clássicos icônicos
  {
    name: "Portal 2",
    src: "https://cdn.cloudflare.steamstatic.com/steam/apps/620/header.jpg",
    width: 460,
    height: 215
  },
  {
    name: "The Witcher 3",
    src: "https://cdn.cloudflare.steamstatic.com/steam/apps/292030/header.jpg",
    width: 460,
    height: 215
  },
  {
    name: "Sid Meier's Civilization VI",
    src: "https://cdn.cloudflare.steamstatic.com/steam/apps/289070/header.jpg",
    width: 460,
    height: 215
  },
  {
    name: "Euro Truck Simulator 2",
    src: "https://cdn.cloudflare.steamstatic.com/steam/apps/227300/header.jpg",
    width: 460,
    height: 215
  },
];

export default function GamesSolutionSection() {
  const { games, isLoading } = useSteamGamesCache();

  // Mostrar loading state se necessário
  if (isLoading) {
    return (
      <section className="relative w-full overflow-hidden bg-[#1A0F0F] py-20 lg:py-24 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:gap-16">
            <div className="w-full lg:w-5/12 mb-12 lg:mb-0">
              <div className="flex flex-col items-start text-left">
                <p className="text-[#B0B8D4] font-body text-base lg:text-lg mb-2">
                  Carregando jogos...
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative w-full overflow-hidden bg-[#1A0F0F] py-12 sm:py-16 md:py-20 lg:py-24 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-16">
          
          <motion.div 
            className="w-full lg:w-5/12 mb-8 sm:mb-10 md:mb-12 lg:mb-0"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <div className="flex flex-col items-start text-left">
              <motion.p 
                className="text-[#B0B8D4] font-body text-sm sm:text-base lg:text-lg mb-2"
                variants={fadeInLeft}
                transition={{ duration: 0.5 }}
              >
                A solução para todos os jogos!
              </motion.p>
              
              <motion.div 
                className="h-[3px] w-20 sm:w-24 bg-[#FF3333] mb-4 sm:mb-6 rounded-full"
                variants={fadeInLeft}
                transition={{ duration: 0.5 }}
                initial={{ width: 0 }}
                whileInView={{ width: 96 }}
                viewport={{ once: true }}
              />
              
              <motion.h2 
                className="font-display font-bold text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] leading-[1.2] text-white mb-4 sm:mb-5 md:mb-6"
                variants={fadeInUp}
                transition={{ duration: 0.6 }}
              >
                Deixe o lag no passado
              </motion.h2>
              
              <motion.p 
                className="font-body text-[#B0B8D4] text-sm sm:text-base leading-relaxed mb-4 sm:mb-5 md:mb-6"
                variants={fadeInUp}
                transition={{ duration: 0.6 }}
              >
                Feito por gamers para gamers. Aumente FPS, reduza micro-stutters e ganhe resposta nos inputs — tudo com técnica profissional.
              </motion.p>
              
              <motion.div 
                className="mb-6 sm:mb-8"
                variants={fadeInUp}
                transition={{ duration: 0.6 }}
              >
                <span className="font-body italic text-white text-base sm:text-lg font-medium">
                  Lag não é desculpa. É escolha.
                </span>
              </motion.div>
              
              <motion.a
                className="inline-flex items-center justify-center bg-[#FF3333] hover:bg-[#d62b2b] text-white font-semibold rounded-full px-6 sm:px-8 py-3 sm:py-4 transition-all duration-300 transform hover:scale-105 shadow-[0_4px_12px_rgba(255,51,51,0.3)] text-sm sm:text-base"
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
                {games.map((game, index) => (
                    <motion.div
                      key={`game-1-${index}`}
                      className="relative flex-none w-[180px] sm:w-[220px] aspect-[460/215] rounded-xl overflow-hidden border border-[#3A2020] shadow-lg"
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
                        sizes="(max-width: 640px) 140px, (max-width: 768px) 180px, 220px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <span className="text-white font-display font-bold text-sm tracking-wide opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden">
                          {game.name}
                        </span>
                      </div>
                    </motion.div>
                  ))}

                  {games.map((game, index) => (
                    <motion.div
                      key={`game-2-${index}`}
                      className="relative flex-none w-[140px] sm:w-[180px] md:w-[220px] aspect-[460/215] rounded-lg sm:rounded-xl overflow-hidden border border-[#3A2020] shadow-lg"
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
                        sizes="(max-width: 640px) 140px, (max-width: 768px) 180px, 220px"
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