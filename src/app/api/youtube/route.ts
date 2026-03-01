
import { google } from 'googleapis';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { url, apiKey } = await request.json();

  if (!apiKey || apiKey === 'YOUR_YOUTUBE_API_KEY') {
    console.error('YouTube API key is missing or is the default placeholder.');
    return NextResponse.json({ error: 'YouTube API anahtarı eksik veya ayarlanmamış.' }, { status: 400 });
  }

  const youtube = google.youtube({
    version: 'v3',
    auth: apiKey,
  });

  try {
    // Check if it's a playlist URL
    const playlistId = new URL(url).searchParams.get('list');
    if (playlistId) {
      const playlistResponse = await youtube.playlistItems.list({
        part: ['snippet'],
        playlistId: playlistId,
        maxResults: 50, // Fetches up to 50 items from the playlist
      });

      const items = playlistResponse.data.items?.map((item) => ({
        id: item.snippet?.resourceId?.videoId,
        url: `https://www.youtube.com/watch?v=${item.snippet?.resourceId?.videoId}`,
        title: item.snippet?.title || 'Başlıksız Video',
      }));

      return NextResponse.json(items || []);
    }

    // Check if it's a single video URL
    const videoId = new URL(url).searchParams.get('v');
    if (videoId) {
      const videoResponse = await youtube.videos.list({
        part: ['snippet'],
        id: [videoId],
      });

      const video = videoResponse.data.items?.[0];
      if (!video) {
        return NextResponse.json({ error: 'Video not found' }, { status: 404 });
      }

      return NextResponse.json([{
        id: video.id!,
        url: `https://www.youtube.com/watch?v=${video.id}`,
        title: video.snippet?.title || 'Başlıksız Video',
      }]);
    }

    return NextResponse.json({ error: 'Geçersiz YouTube URL'si. Lütfen tek bir video veya bir oynatma listesi URL'si girin.' }, { status: 400 });

  } catch (error: any) {
    // Log the detailed error to the server console
    console.error("--- YouTube API Error --- ");
    console.error("Request URL:", url);
    console.error("Error Status:", error.response?.status);
    console.error("Error Message:", error.message);
    console.error("Full Error Data:", JSON.stringify(error.response?.data, null, 2));
    console.error("--- End YouTube API Error ---");

    const errorMessage = error.response?.data?.error?.message || 'Failed to fetch from YouTube API';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
