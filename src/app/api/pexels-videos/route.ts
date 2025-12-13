import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query') || 'technology';
  const perPage = searchParams.get('per_page') || '4';

  const apiKey = process.env.NEXT_PUBLIC_PEXELS_API_KEY;

  if (!apiKey || apiKey === 'your_pexels_api_key_here') {
    return NextResponse.json(
      { error: 'Pexels API key not configured', videos: [] },
      { status: 200 } // Retorna 200 mas com erro para o hook tratar
    );
  }

  try {
    // Buscar vídeos sem restrição de orientação para ter mais opções
    const response = await fetch(
      `https://api.pexels.com/videos/search?query=${encodeURIComponent(query)}&per_page=${Math.min(parseInt(perPage) * 2, 20)}&size=medium`,
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: `Failed to fetch videos: ${response.statusText}`, details: errorText },
        { status: response.status }
      );
    }

    const data = await response.json();
    
    // Filtrar vídeos verticais (altura > largura) ou que sejam portrait
    const verticalVideos = (data.videos || []).filter((video: any) => {
      return video.height > video.width || video.height / video.width >= 1.2;
    }).slice(0, parseInt(perPage));

    return NextResponse.json({
      ...data,
      videos: verticalVideos,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch videos' },
      { status: 500 }
    );
  }
}
