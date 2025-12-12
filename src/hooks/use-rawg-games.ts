'use client';

import { useState, useEffect } from 'react';

export interface GameAsset {
  id: number;
  name: string;
  background_image: string;
  width: number;
  height: number;
}

const POPULAR_GAME_IDS = [
  41494, // Cyberpunk 2077
  3328,  // The Witcher 3: Wild Hunt
  73619, // Counter-Strike 2
  570,   // Valorant
  326668,// EA FC 24
  73619, // Call of Duty: Modern Warfare II
  3498,  // Grand Theft Auto V
  5687,  // Tom Clancy's Rainbow Six Siege
  7679,  // Apex Legends
  52399, // Fortnite
  22509, // Minecraft
  4459,  // League of Legends
];

export function useRawgGames() {
  const [games, setGames] = useState<GameAsset[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGames = async () => {
      const apiKey = process.env.NEXT_PUBLIC_RAWG_API_KEY;

      if (!apiKey) {
        setError('RAWG API key not configured');
        setLoading(false);
        return;
      }

      try {
        const gamePromises = POPULAR_GAME_IDS.map(async (gameId) => {
          const response = await fetch(
            `https://api.rawg.io/api/games/${gameId}?key=${apiKey}`
          );

          if (!response.ok) {
            throw new Error(`Failed to fetch game ${gameId}`);
          }

          const data = await response.json();

          return {
            id: data.id,
            name: data.name,
            background_image: data.background_image,
            width: 300,
            height: 400,
          };
        });

        const gameResults = await Promise.all(gamePromises);
        setGames(gameResults);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch games');
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  return { games, loading, error };
}