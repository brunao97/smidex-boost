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
    } else if (diff > 0) {
      // Vídeos à direita (próximos) - atrás e menores
      return {
        transform: `translateZ(-${absDiff * 150}px) scale(${1 - absDiff * 0.15})`,
        opacity: Math.max(0.3, 1 - absDiff * 0.2),
        zIndex: 10 - absDiff,
      };
    } else {
      // Vídeos à esquerda (anteriores) - atrás e menores
      return {
        transform: `translateZ(-${absDiff * 150}px) scale(${1 - absDiff * 0.15})`,
        opacity: Math.max(0.3, 1 - absDiff * 0.2),
        zIndex: 10 - absDiff,
      };
    }
  };

  return (
    <section className="relative w-full py-20 px-4 sm:px-6 lg:px-8 bg-[#1A0F0F]">
      <div className="max-w-4xl mx-auto">
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
          <div className="flex justify-center items-center gap-4">
            {/* Seta esquerda minimalista */}
            {videos.length > 1 && (
              <button
                onClick={() => api?.scrollPrev()}
                className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 group z-50"
                aria-label="Vídeo anterior"
              >
                <ChevronLeft className="w-5 h-5 text-[#FF3333] group-hover:text-[#DC143C] transition-colors duration-300" />
              </button>
            )}
            
            <div 
              className="w-full max-w-sm relative overflow-hidden"
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
                    const transform = getTransform(index);
                    const diff = index - current;
                    // Vídeos à direita (próximos) devem ter blur
                    const isNextVideo = diff > 0 || (current === videos.length - 1 && index === 0);
                    return (
                      <CarouselItem key={video.id} className="pl-0 basis-full">
                        <div 
                          className="relative w-full transition-all duration-500 ease-out will-change-transform"
                          style={{
                            transform: transform.transform,
                            opacity: transform.opacity,
                            zIndex: transform.zIndex,
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
                          {/* Blur sutil para indicar próximo vídeo */}
                          {isNextVideo && (
                            <div className="absolute inset-0 z-40 pointer-events-none">
                              <div className="absolute right-0 top-0 bottom-0 w-24 bg-linear-to-l from-[#1A0F0F] via-[#1A0F0F]/40 to-transparent" />
                            </div>
                          )}
                        </div>
                      </CarouselItem>
                    );
                  })}
                </CarouselContent>
              </Carousel>
              {/* Dots indicadores estilo Instagram - esconder quando vídeo estiver tocando */}
              {videos.length > 1 && playingVideoIndex !== current && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-50 pointer-events-none transition-opacity duration-300">
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
                className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 group z-50"
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
