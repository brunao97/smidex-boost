'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { VideoPlayer } from '@/components/ui/video-player';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel';
import { usePexelsVideos } from '@/hooks/use-pexels-videos';
import { useLocalVideos } from '@/hooks/use-local-videos';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 }
};

const VideosSection = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [playingVideoIndex, setPlayingVideoIndex] = useState<number | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { videos: localVideos, loading: localLoading } = useLocalVideos();
  const { videos: pexelsVideos, loading: pexelsLoading, error } = usePexelsVideos('technology gaming', 4);

  useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());

    api.on('select', () => {
      const newIndex = api.selectedScrollSnap();
      setCurrent(newIndex);
      // Resetar o estado de playing quando mudar de vídeo
      setPlayingVideoIndex(null);
    });
  }, [api]);

  useEffect(() => {
    const checkIsDesktop = () => {
      const width = window.innerWidth;
      setIsDesktop(width >= 640);
      setIsMobile(width < 640);
    };
    
    checkIsDesktop();
    window.addEventListener('resize', checkIsDesktop);
    
    return () => window.removeEventListener('resize', checkIsDesktop);
  }, []);

  // Transformar vídeos para o formato esperado
  // Prioridade: vídeos locais da pasta public/videos > vídeos do Pexels
  const videos = useMemo(() => {
    // Se houver vídeos locais, usar eles como padrão
    if (localVideos && localVideos.length > 0) {
      return localVideos.map((video) => ({
        id: video.id,
        src: video.src,
        thumbnail: undefined, // O player vai gerar thumbnail automaticamente
        title: video.title,
        author: video.author
      }));
    }

    // Se não houver vídeos locais, tentar usar vídeos do Pexels
    if (pexelsVideos && pexelsVideos.length > 0) {
      return pexelsVideos.map((video, index) => {
        // Encontrar o melhor arquivo de vídeo (preferir hd, depois sd, depois qualquer outro)
        const videoFile = video.video_files.find(f => f.quality === 'hd' && f.file_type === 'video/mp4')
          || video.video_files.find(f => f.quality === 'sd' && f.file_type === 'video/mp4')
          || video.video_files.find(f => f.file_type === 'video/mp4')
          || video.video_files[0];

        // Pegar a primeira imagem como thumbnail
        const thumbnail = video.video_pictures?.[0]?.picture || video.image;

        return {
          id: video.id,
          src: videoFile?.link || '',
          thumbnail: thumbnail,
          title: `Demonstração ${index + 1}`,
          author: 'Smidex Boost'
        };
      });
    }

    // Caso não tenha nenhum vídeo
    return [];
  }, [localVideos, pexelsVideos]);

  const loading = localLoading || pexelsLoading;

  const getTransform = (index: number) => {
    const diff = index - current;
    const absDiff = Math.abs(diff);
    
    if (diff === 0) {
      // Vídeo atual - centralizado e em frente
      return {
        transform: 'translateZ(0px) scale(1)',
        opacity: 1,
        zIndex: 10,
      };
    } else if (diff === 1 || (current === videos.length - 1 && index === 0)) {
      // Próximo vídeo - parcialmente visível à direita
      return {
        transform: 'translateZ(-50px) scale(0.55) translateX(35%)',
        opacity: 0.9,
        zIndex: 9,
      };
    } else if (diff === -1 || (current === 0 && index === videos.length - 1)) {
      // Vídeo anterior - parcialmente visível à esquerda
      return {
        transform: 'translateZ(-50px) scale(0.55) translateX(-35%)',
        opacity: 0.9,
        zIndex: 9,
      };
    } else {
      // Outros vídeos - mais atrás e menores
      return {
        transform: `translateZ(-${absDiff * 150}px) scale(${1 - absDiff * 0.15})`,
        opacity: Math.max(0.2, 1 - absDiff * 0.25),
        zIndex: 10 - absDiff,
      };
    }
  };

  return (
    <section className="relative w-full py-20 px-4 sm:px-6 lg:px-8 bg-[#1A0F0F] overflow-visible">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Nossos Vídeos
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Confira nossa coleção de vídeos demonstrativos
          </p>
        </motion.div>

        {(loading || videos.length === 0) ? (
          loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="text-white">Carregando vídeos...</div>
            </div>
          ) : null
        ) : (
          <div className="flex justify-center items-center gap-2 sm:gap-4 relative w-full px-12 sm:px-20">
            {/* Seta esquerda minimalista */}
            {videos.length > 1 && (
              <button
                onClick={() => api?.scrollPrev()}
                className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 group z-50 absolute left-0"
                aria-label="Vídeo anterior"
              >
                <ChevronLeft className="w-5 h-5 text-[#FF3333] group-hover:text-[#DC143C] transition-colors duration-300" />
              </button>
            )}
            
            <div 
              className="w-full max-w-2xl relative mx-auto"
              style={{
                perspective: '1000px',
                perspectiveOrigin: 'center center',
              }}
            >
              <Carousel
                setApi={setApi}
                opts={{
                  align: 'center',
                  loop: true,
                  axis: 'x',
                  dragFree: false,
                  containScroll: 'trimSnaps',
                  duration: 25,
                  startIndex: 0,
                }}
                orientation="horizontal"
                className="w-full relative"
              >
                <CarouselContent className="ml-0" style={{ transformStyle: 'preserve-3d' }}>
                  {videos.map((video, index) => {
                    const diff = index - current;
                    const isAdjacent = Math.abs(diff) === 1 || (current === 0 && index === videos.length - 1) || (current === videos.length - 1 && index === 0);
                    const isCurrent = diff === 0;
                    
                    // Calcular valores de animação
                    let scale = 1;
                    let translateX = 0;
                    let translateZ = 0;
                    let opacity = 1;
                    let zIndex = 10;
                    
                    if (isCurrent) {
                      // No mobile, fazer zoom in quando o vídeo estiver tocando
                      const isPlayingOnMobile = isMobile && playingVideoIndex === index;
                      scale = isPlayingOnMobile ? 1.1 : 1;
                      translateZ = 0;
                      opacity = 1;
                      zIndex = 10;
                    } else if (diff === 1 || (current === videos.length - 1 && index === 0)) {
                      // Próximo vídeo - à direita
                      scale = isDesktop ? 0.65 : 0.55;
                      translateX = 5;
                      translateZ = -30;
                      opacity = 0.9;
                      zIndex = 9;
                    } else if (diff === -1 || (current === 0 && index === videos.length - 1)) {
                      // Vídeo anterior - à esquerda
                      scale = isDesktop ? 0.65 : 0.55;
                      translateX = -5;
                      translateZ = -30;
                      opacity = 0.9;
                      zIndex = 9;
                    } else {
                      const absDiff = Math.abs(diff);
                      scale = 1 - absDiff * 0.15;
                      translateZ = -absDiff * 100;
                      opacity = Math.max(0.2, 1 - absDiff * 0.25);
                      zIndex = 10 - absDiff;
                    }
                    
                    return (
                      <CarouselItem key={video.id} className="pl-0 basis-[65%] sm:basis-[60%] pr-3">
                        <motion.div 
                          className={`relative w-full will-change-transform ${
                            !isCurrent ? 'blur-sm' : ''
                          }`}
                          initial={false}
                          animate={{
                            scale,
                            x: `${translateX}%`,
                            z: translateZ,
                            opacity,
                          }}
                          transition={{
                            duration: 0.6,
                            ease: [0.25, 0.1, 0.25, 1],
                            scale: {
                              duration: 0.6,
                              ease: [0.25, 0.1, 0.25, 1],
                            },
                          }}
                          style={{
                            zIndex,
                            transformStyle: 'preserve-3d',
                          }}
                        >
                          <VideoPlayer
                            src={video.src}
                            thumbnail={video.thumbnail}
                            title={video.title}
                            author={video.author}
                            className="w-full"
                            onPlayingChange={(isPlaying) => {
                              if (isPlaying) {
                                setPlayingVideoIndex(index);
                              } else {
                                // Só resetar se for o vídeo atual
                                if (playingVideoIndex === index) {
                                  setPlayingVideoIndex(null);
                                }
                              }
                            }}
                          />
                        </motion.div>
                      </CarouselItem>
                    );
                  })}
                </CarouselContent>
              </Carousel>
              {/* Dots indicadores estilo Instagram - esconder quando vídeo estiver tocando */}
              {videos.length > 1 && playingVideoIndex !== current && (
                <div className="absolute left-1/2 -translate-x-1/2 z-50 pointer-events-none transition-opacity duration-300" style={{ top: '698px' }}>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-sm">
                    {videos.map((_, index) => (
                      <div
                        key={index}
                        className={`transition-all duration-300 rounded-full ${
                          index === current
                            ? 'w-1.5 h-1.5 bg-[#FF3333]'
                            : 'w-1 h-1 bg-white/40'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {/* Seta direita minimalista */}
            {videos.length > 1 && (
              <button
                onClick={() => api?.scrollNext()}
                className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 group z-50 absolute right-0"
                aria-label="Próximo vídeo"
              >
                <ChevronRight className="w-5 h-5 text-[#FF3333] group-hover:text-[#DC143C] transition-colors duration-300" />
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default VideosSection;
