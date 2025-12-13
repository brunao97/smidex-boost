import { NextResponse } from 'next/server';
import { readdir } from 'fs/promises';
import { join } from 'path';

export async function GET() {
  try {
    // Caminho para a pasta public/videos
    const videosDir = join(process.cwd(), 'public', 'videos');
    
    // Listar todos os arquivos da pasta
    const files = await readdir(videosDir);
    
    // Filtrar apenas arquivos de vídeo (extensões comuns)
    const videoExtensions = ['.mp4', '.webm', '.mov', '.avi', '.mkv'];
    const videoFiles = files
      .filter(file => {
        const lowerFile = file.toLowerCase();
        return videoExtensions.some(ext => lowerFile.endsWith(ext));
      })
      .sort(); // Ordenar alfabeticamente
    
    // Retornar lista de vídeos com caminhos relativos
    const videos = videoFiles.map((file, index) => ({
      id: index + 1,
      filename: file,
      src: `/videos/${file}`,
      title: `Demonstração ${index + 1}`,
      author: 'Smidex Boost'
    }));
    
    return NextResponse.json({ videos });
  } catch (error) {
    // Se a pasta não existir ou houver erro, retornar array vazio
    console.error('Error reading videos directory:', error);
    return NextResponse.json({ videos: [] }, { status: 200 });
  }
}
