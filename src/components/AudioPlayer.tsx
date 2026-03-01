
'use client';

import { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import { useFirestore, useDoc } from '@/firebase';
import { doc } from 'firebase/firestore';
import { Volume2, VolumeX, Play, Pause, Music, SkipForward, SkipBack } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

interface PlaylistItem {
  id: string;
  url: string;
  title: string;
}

export function AudioPlayer() {
  const firestore = useFirestore();
  const [playlist, setPlaylist] = useState<PlaylistItem[]>([]);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [muted, setMuted] = useState(false);
  const [mounted, setMounted] = useState(false);

  const settingsDocRef = doc(firestore, 'settings', 'site');
  const { data: settings } = useDoc<any>(settingsDocRef);

  useEffect(() => {
    if (settings && settings.playlist) {
      setPlaylist(settings.playlist);
    }
  }, [settings]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleNext = () => {
    setCurrentTrack((prev) => (prev + 1) % playlist.length);
  };

  const handlePrevious = () => {
    setCurrentTrack((prev) => (prev - 1 + playlist.length) % playlist.length);
  };

  if (!mounted || playlist.length === 0) return null;

  const currentUrl = playlist[currentTrack]?.url;
  const currentTitle = playlist[currentTrack]?.title;

  return (
    <div className="w-full bg-primary/5 border-b border-primary/10 backdrop-blur-sm sticky top-0 z-[100]">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3 w-1/3">
            <div className="bg-primary/10 p-2 rounded-full">
                <Music className="w-4 h-4 text-primary" />
            </div>
            <div>
                <p className="text-xs text-primary/80 font-bold uppercase tracking-widest">Now Playing</p>
                <p className="text-sm font-semibold text-foreground line-clamp-1">{currentTitle}</p>
            </div>
        </div>

        <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={handlePrevious} className="rounded-full hover:bg-primary/10 text-primary">
                <SkipBack className="w-5 h-5 fill-current" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setPlaying(!playing)} className="rounded-full w-12 h-12 bg-primary/10 hover:bg-primary/20 text-primary">
                {playing ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current" />}
            </Button>
            <Button variant="ghost" size="icon" onClick={handleNext} className="rounded-full hover:bg-primary/10 text-primary">
                <SkipForward className="w-5 h-5 fill-current" />
            </Button>
        </div>

        <div className="flex items-center gap-2 w-1/3 justify-end">
          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary shrink-0" onClick={() => setMuted(!muted)}>
            {muted || volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </Button>
          <Slider
            value={[muted ? 0 : volume]}
            max={1}
            step={0.01}
            onValueChange={(vals) => {
              setVolume(vals[0]);
              setMuted(false);
            }}
            className="cursor-pointer max-w-[120px]"
          />
        </div>

        <div className="hidden">
          <ReactPlayer
            url={currentUrl}
            playing={playing}
            volume={volume}
            muted={muted}
            width="0"
            height="0"
            onEnded={handleNext}
            config={{
                youtube: {
                    playerVars: { 
                        controls: 0,
                        modestbranding: 1
                    }
                }
            }}
          />
        </div>
      </div>
    </div>
  );
}
