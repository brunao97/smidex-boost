import { useState, useEffect } from 'react';

interface LocalVideo {
  id: number;
  filename: string;
  src: string;
  title: string;
  author: string;
}

export const useLocalVideos = () => {
  const [videos, setVideos] = useState<LocalVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/local-videos');
        
        if (!response.ok) {
          throw new Error('Failed to fetch local videos');
        }
        
        const data = await response.json();
        setVideos(data.videos || []);
        setError(null);
      } catch (err) {
        console.error('Error fetching local videos:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch local videos');
        setVideos([]);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  return { videos, loading, error };
};
