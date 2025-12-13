'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, Heart } from 'lucide-react';
import { BorderBeam } from './border-beam';

interface VideoPlayerProps {
  src: string;
  thumbnail?: string;
  className?: string;
  title?: string;
  author?: string;
  onPlayingChange?: (isPlaying: boolean) => void;
}

export function VideoPlayer({ src, thumbnail, className = '', title, author, onPlayingChange }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [showThumbnail, setShowThumbnail] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [generatedThumbnail, setGeneratedThumbnail] = useState<string | null>(null);
  const [currentFrameThumbnail, setCurrentFrameThumbnail] = useState<string | null>(null);
  const [isPausing, setIsPausing] = useState(false);

  // Motion value para progresso - apenas no cliente
  const progressValue = useMotionValue(0);
  
  // Spring animation para progresso suave - apenas no cliente
  const progress = useSpring(progressValue, {
    stiffness: 80,
    damping: 30,
    mass: 0.2
  });

  const scaleX = useTransform(progress, (value) => Math.max(0, Math.min(1, value)));

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !isMounted) return;

    let rafId: number | null = null;

    const updateTime = () => {
      const time = video.currentTime;
      setCurrentTime(time);
      const dur = video.duration;
      if (dur > 0) {
        const newProgress = time / dur;
        // Usa requestAnimationFrame para suavizar as atualizações
        if (rafId === null) {
          rafId = requestAnimationFrame(() => {
            progressValue.set(newProgress);
            rafId = null;
          });
        }
      }
    };
    const updateDuration = () => {
      const dur = video.duration;
      setDuration(dur);
      if (dur > 0 && video.currentTime > 0) {
        progressValue.set(video.currentTime / dur);
      }
      
      // Gerar thumbnail do primeiro frame se não houver thumbnail fornecida
      if (!thumbnail && !generatedThumbnail && dur > 0 && video.videoWidth > 0) {
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          // Capturar o primeiro frame (0.1 segundos)
          const originalTime = video.currentTime;
          video.currentTime = 0.1;
          
          const captureFrame = () => {
            try {
              ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
              const thumbnailUrl = canvas.toDataURL('image/jpeg', 0.8);
              setGeneratedThumbnail(thumbnailUrl);
              video.currentTime = originalTime;
            } catch (error) {
              console.error('Error generating thumbnail:', error);
            }
          };
          
          video.addEventListener('seeked', captureFrame, { once: true });
        }
      }
    };
    const handlePlay = () => {
      setIsPlaying(true);
      // Esconder thumbnail imediatamente quando começar a reproduzir
      setShowThumbnail(false);
      // Limpar o frame atual quando começar a reproduzir novamente
      setCurrentFrameThumbnail(null);
      // Notificar componente pai
      onPlayingChange?.(true);
    };
    const handlePause = () => {
      setIsPlaying(false);
      // Notificar componente pai primeiro
      onPlayingChange?.(false);
      
      // Capturar o frame atual do vídeo quando pausar (síncrono, sem delay)
      if (video && video.videoWidth > 0 && video.videoHeight > 0) {
        try {
          const canvas = document.createElement('canvas');
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            const currentFrameUrl = canvas.toDataURL('image/jpeg', 0.9);
            setCurrentFrameThumbnail(currentFrameUrl);
          }
        } catch (error) {
          console.error('Error capturing current frame:', error);
        }
      }
      
      // Mostrar thumbnail imediatamente (sem delay e sem animação)
      setShowThumbnail(true);
    };
    const handleEnded = () => {
      setIsPlaying(false);
      // Capturar o último frame quando terminar
      if (video && video.videoWidth > 0 && video.videoHeight > 0) {
        try {
          const canvas = document.createElement('canvas');
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            const finalFrameUrl = canvas.toDataURL('image/jpeg', 0.9);
            setCurrentFrameThumbnail(finalFrameUrl);
          }
        } catch (error) {
          console.error('Error capturing final frame:', error);
        }
      }
      // Mostrar thumbnail quando terminar
      setShowThumbnail(true);
      // Reset para o início quando terminar
      if (video) {
        video.currentTime = 0;
      }
      // Notificar componente pai
      onPlayingChange?.(false);
    };
    
    // Garantir que a thumbnail apareça quando o vídeo carregar
    const handleLoadedData = () => {
      if (!isPlaying) {
        setShowThumbnail(true);
      }
    };

    video.addEventListener('timeupdate', updateTime);
    video.addEventListener('loadedmetadata', updateDuration);
    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('ended', handleEnded);

    return () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
      video.removeEventListener('timeupdate', updateTime);
      video.removeEventListener('loadedmetadata', updateDuration);
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('ended', handleEnded);
    };
  }, [isMounted, progressValue, onPlayingChange]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
  };

  const skipBackward = () => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = Math.max(0, video.currentTime - 10);
  };

  const skipForward = () => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = Math.min(duration, video.currentTime + 10);
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const video = videoRef.current;
    if (!video || !duration || !isMounted) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    const newTime = percentage * duration;
    video.currentTime = newTime;
    progressValue.set(percentage);
  };

  return (
    <div
      className={`group/video relative aspect-[9/16] w-full overflow-hidden rounded-lg bg-[#1A0F0F] transition-all duration-300 ${className}`}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      {/* Border Beam - aparece quando o vídeo está reproduzindo */}
      {isPlaying && !showThumbnail && (
        <BorderBeam 
          className="inset-0 top-0 left-0"
          lightColor="#DC143C"
          lightWidth={150}
          duration={8}
          borderWidth={3}
        />
      )}
      {/* Thumbnail overlay - sempre visível quando showThumbnail é true */}
      {showThumbnail && (
        <div className="group absolute inset-0 z-30 cursor-pointer rounded-[inherit]">
          {(currentFrameThumbnail || thumbnail || generatedThumbnail) ? (
            <img
              src={currentFrameThumbnail || generatedThumbnail || thumbnail}
              alt="Video thumbnail"
              className="size-full object-cover rounded-[inherit]"
              onError={(e) => {
                // Se a thumbnail falhar ao carregar, mostrar placeholder
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
          ) : (
            <div className="size-full bg-linear-to-br from-gray-800 to-gray-900 rounded-[inherit]" />
          )}
          {/* Large centered play button */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <button
              onClick={togglePlay}
              className="flex size-20 sm:size-24 items-center justify-center rounded-full bg-[#FF3333] transition-all duration-200 ease-linear hover:scale-110 hover:bg-[#d62626] shadow-lg shadow-[#FF3333]/50 z-10 pointer-events-auto"
            >
              <Play className="size-8 sm:size-10 text-white ml-1" fill="currentColor" />
            </button>
          </div>
        </div>
      )}

      {/* Video element */}
      <div
        style={{ 
          display: showThumbnail ? 'none' : 'block',
          pointerEvents: showThumbnail ? 'none' : 'auto',
        }}
        className="h-full w-full"
      >
        <video
          ref={videoRef}
          tabIndex={0}
          className="h-full w-full cursor-pointer rounded-[inherit] bg-black"
          onClick={togglePlay}
          preload="metadata"
          poster={generatedThumbnail || thumbnail || undefined}
          playsInline
        >
          <source src={src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Title and Author overlay (when playing) */}
      {!showThumbnail && (title || author) && (
        <div className="absolute top-0 left-0 right-0 z-20 p-4 bg-linear-to-b from-black/60 to-transparent">
          {title && (
            <h3 className="text-white text-lg sm:text-xl font-bold mb-1">{title}</h3>
          )}
          {author && (
            <p className="text-gray-300 text-sm">{author}</p>
          )}
        </div>
      )}

      {/* Large centered play/pause button (when playing) - só aparece no hover quando reproduzindo */}
      {!showThumbnail && (
        <motion.div
          className={`absolute inset-0 flex items-center justify-center z-10 transition-opacity duration-500 ease-in-out ${
            isPlaying 
              ? 'opacity-0 group-hover/video:opacity-100' 
              : 'opacity-100'
          }`}
          animate={isPausing ? {
            scale: [1, 1.05, 1],
          } : {}}
          transition={{
            duration: 0.4,
            ease: [0.4, 0, 0.2, 1],
          }}
        >
          <motion.button
            onClick={togglePlay}
            className={`flex size-20 sm:size-24 items-center justify-center rounded-full transition-all duration-300 ease-out hover:scale-110 shadow-lg ${
              isPlaying
                ? 'bg-white/20 backdrop-blur-sm hover:bg-white/30'
                : 'bg-[#FF3333] hover:bg-[#d62626] shadow-[#FF3333]/50'
            }`}
            animate={isPausing ? {
              scale: [1, 1.1, 1],
              rotate: [0, -3, 3, 0],
            } : {}}
            transition={{
              duration: 0.4,
              ease: [0.4, 0, 0.2, 1],
            }}
          >
            {isPlaying ? (
              <Pause className="size-8 sm:size-10 text-white" fill="currentColor" />
            ) : (
              <Play className="size-8 sm:size-10 text-white ml-1" fill="currentColor" />
            )}
          </motion.button>
        </motion.div>
      )}

      {/* Bottom controls bar */}
      <div
        className={`absolute bottom-0 left-0 right-0 z-20 bg-linear-to-t from-black/80 to-transparent transition-all duration-500 ease-in-out ${
          showControls ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        } px-4 sm:px-6 py-4 sm:py-6`}
      >
        {/* Controls row */}
        <div className="flex items-center justify-between gap-3 sm:gap-4 mb-3">
          {/* Skip backward */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              skipBackward();
            }}
            className="text-white hover:text-[#FF3333] transition-colors"
            aria-label="Skip backward"
          >
            <SkipBack className="size-5 sm:size-6" />
          </button>

          {/* Heart/Like button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsLiked(!isLiked);
            }}
            className={`transition-colors ${
              isLiked ? 'text-[#FF3333]' : 'text-white hover:text-[#FF3333]'
            }`}
            aria-label={isLiked ? 'Unlike' : 'Like'}
          >
            <Heart className={`size-5 sm:size-6 ${isLiked ? 'fill-current' : ''}`} />
          </button>

          {/* Skip forward */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              skipForward();
            }}
            className="text-white hover:text-[#FF3333] transition-colors"
            aria-label="Skip forward"
          >
            <SkipForward className="size-5 sm:size-6" />
          </button>
        </div>

        {/* Progress bar and time */}
        <div className="flex items-center gap-3 sm:gap-4">
          <span className="text-white text-xs sm:text-sm font-semibold min-w-12 sm:min-w-16">
            {formatTime(currentTime)}
          </span>
          <div
            className="group/progress flex-1 cursor-pointer py-2"
            onClick={(e) => {
              e.stopPropagation();
              handleProgressClick(e);
            }}
          >
            <div className="relative h-1.5 sm:h-2 rounded-full bg-white/30 overflow-hidden">
              {isMounted ? (
                <motion.div
                  className="absolute h-full w-full rounded-full bg-[#FF3333] origin-left"
                  style={{ 
                    scaleX,
                    willChange: 'transform'
                  }}
                />
              ) : (
                <div
                  className="absolute h-full rounded-full bg-[#FF3333] origin-left"
                  style={{ 
                    width: `${duration ? (currentTime / duration) * 100 : 0}%`
                  }}
                />
              )}
            </div>
          </div>
          <span className="text-white text-xs sm:text-sm font-semibold min-w-12 sm:min-w-16 text-right">
            {formatTime(duration)}
          </span>
        </div>
      </div>
    </div>
  );
}
