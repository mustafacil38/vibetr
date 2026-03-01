
'use client';

import { useState, useEffect } from 'react';
import { Smartphone, Download, Star } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function InstallButton() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    // Uygulama zaten kurulu mu?
    const standalone = window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone;
    setIsStandalone(standalone);

    // iOS tespiti
    const ios = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    setIsIOS(ios);

    // Android/Chrome kurulum tetikleyicisi
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowButton(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // iOS için buton her zaman gösterilebilir (eğer kurulu değilse)
    if (ios && !standalone) {
      setShowButton(true);
    }

    // Mobil cihaz tespiti (butonu göstermek için ek bir güven katmanı)
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (isMobile && !standalone) {
      setShowButton(true);
    }

    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  }, []);

  const handleInstallClick = async () => {
    if (isStandalone) {
      toast({ description: "Uygulama zaten kurulu." });
      return;
    }

    if (isIOS) {
      toast({
        title: "iPhone/iPad Kurulumu",
        description: "Safari'de alttaki 'Paylaş' ikonuna basıp 'Ana Ekrana Ekle' seçeneğini seçin.",
      });
      return;
    }

    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setDeferredPrompt(null);
        setShowButton(false);
      }
    } else {
      toast({
        title: "Uygulamayı Yükle",
        description: "Tarayıcı menüsündeki (üç nokta) 'Uygulamayı Yükle' veya 'Ana Ekrana Ekle' seçeneğini kullanabilirsiniz.",
      });
    }
  };

  if (isStandalone || !showButton) return null;

  return (
    <Card className="overflow-hidden border-2 border-primary/20 bg-gradient-to-r from-primary/10 to-accent/10 shadow-lg animate-in fade-in slide-in-from-top-4 duration-700">
      <div className="flex flex-col sm:flex-row items-center justify-between p-4 gap-4">
        <div className="flex items-center gap-4 text-center sm:text-left">
          <div className="bg-primary p-3 rounded-2xl text-white shadow-md">
            <Smartphone className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-lg text-primary flex items-center gap-2 justify-center sm:justify-start">
              VibeTR App <Star className="w-4 h-4 fill-primary" />
            </h3>
            <p className="text-sm text-muted-foreground">Kesintisiz müzik deneyimi için uygulamayı telefonuna kur!</p>
          </div>
        </div>
        <Button 
          onClick={handleInstallClick}
          className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white font-bold rounded-xl px-6 h-12 shadow-xl hover:scale-105 transition-all"
        >
          <Download className="w-5 h-5 mr-2" />
          Hemen Kur
        </Button>
      </div>
    </Card>
  );
}
