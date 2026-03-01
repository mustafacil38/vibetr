
import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'VibeTR: Canlı Radyo',
    short_name: 'VibeTR',
    description: 'Kesintisiz Canlı Müzik ve Radyo Platformu',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#1e40af',
    icons: [
      {
        src: 'https://picsum.photos/seed/vibetr/192/192',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: 'https://picsum.photos/seed/vibetr/512/512',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
