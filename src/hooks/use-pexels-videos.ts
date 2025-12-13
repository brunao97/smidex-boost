'use client';

import { useState, useEffect } from 'react';

export interface PexelsVideo {
  id: number;
  width: number;
  height: number;
  duration: number;
  image: string;
  video_files: Array<{
    id: number;
    quality: string;
    file_type: string;
    width: number;
    height: number;
    link: string;
  }>;
  video_pictures: Array<{
    id: number;
    picture: string;
    nr: number;
  }>;
}

export interface PexelsVideoResponse {
  page: number;
  per_page: number;
  total_results: number;
  videos: PexelsVideo[];
}

export function usePexelsVideos(query: string = 'technology', perPage: number = 4) {
  const [videos, setVideos] = useState<PexelsVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        // Usar API route do Next.js para evitar problemas de CORS
        const response = await fetch(
          `/api/pexels-videos?query=${encodeURIComponent(query)}&per_page=${perPage}`
        );

        const data = await response.json();

        // Se houver erro na resposta (mesmo com status 200), não tratar como erro fatal
        if (data.error && (!data.videos || data.videos.length === 0)) {
          setError(data.error);
          setVideos([]);
          setLoading(false);
          return;
        }

        if (!response.ok) {
          throw new Error(data.error || `Failed to fetch videos: ${response.statusText}`);
        }

        setVideos(data.videos || []);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch videos');
        setVideos([]);
        setLoading(false);
      }
    };

    fetchVideos();
  }, [query, perPage]);

  return { videos, loading, error };
}
