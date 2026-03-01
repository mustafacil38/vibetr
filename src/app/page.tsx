
'use client';

import { useDoc, useFirestore } from "@/firebase";
import { AdSpace } from "@/components/AdSpace";
import { Layout, Instagram, Twitter, Shield, Info } from "lucide-react";
import Link from "next/link";
import { doc } from "firebase/firestore";
import { useMemoFirebase } from "@/firebase/use-memo-firebase";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { AudioPlayer } from "@/components/AudioPlayer";

export default function Home() {
  const firestore = useFirestore();

  const settingsDoc = useMemoFirebase(() => {
    if (!firestore) return null;
    return doc(firestore, 'settings', 'site');
  }, [firestore]);

  const { data: settings, isLoading } = useDoc<any>(settingsDoc);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  const siteName = settings?.siteName || 'VibeTR';
  const hero = {
    title: settings?.heroTitle || 'Modern Web Deneyimi',
    description: settings?.heroDescription || 'Profesyonel altyapı ile güçlendirilmiş platform.',
    showHero: settings?.showHero !== false,
    adCode: settings?.adCode || '',
    logoUrl: settings?.logoUrl || '',
    streamUrl: settings?.streamUrl || '',
    instagramUrl: settings?.instagramUrl || '#',
    xUrl: settings?.xUrl || '#',
    footerText: settings?.footerText || '© 2024 VibeTR',
    termsLabel: settings?.termsLabel || 'Kullanım Koşulları',
    termsUrl: settings?.termsUrl || '#',
    privacyLabel: settings?.privacyLabel || 'Gizlilik Politikası',
    privacyUrl: settings?.privacyUrl || '#'
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors">
      {hero.streamUrl && <AudioPlayer url={hero.streamUrl} />}
      
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {hero.logoUrl ? (
              <Link href="/" className="flex items-center">
                <img src={hero.logoUrl} alt={siteName} className="h-8 w-auto object-contain" />
              </Link>
            ) : (
              <h1 className="text-xl font-black tracking-tight text-primary uppercase">{siteName}</h1>
            )}
          </div>
          
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <div className="flex items-center gap-3">
              <Link href={hero.instagramUrl} target="_blank" className="text-muted-foreground hover:text-primary transition-all">
                <Instagram className="w-5 h-5" />
              </Link>
              <Link href={hero.xUrl} target="_blank" className="text-muted-foreground hover:text-primary transition-all">
                <Twitter className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-4xl mx-auto px-4 py-16 w-full space-y-12">
        {hero.showHero && (
          <div className="text-center space-y-6 py-12">
            <h2 className="text-5xl font-black tracking-tighter text-primary">{hero.title}</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {hero.description}
            </p>
            <div className="flex justify-center gap-4">
               <Button variant="outline" size="lg" className="rounded-full font-bold">Daha Fazla Bilgi</Button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-[2rem] bg-muted/30 border space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                    <Layout className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg">Modern Tasarım</h3>
                <p className="text-sm text-muted-foreground">Next.js 15 ve Tailwind CSS ile hazırlanan son teknoloji arayüz.</p>
            </div>
            <div className="p-8 rounded-[2rem] bg-muted/30 border space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                    <Shield className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg">Güvenli Altyapı</h3>
                <p className="text-sm text-muted-foreground">Firebase ile korunan veriler ve yönetici paneli şifreleme sistemi.</p>
            </div>
            <div className="p-8 rounded-[2rem] bg-muted/30 border space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                    <Info className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg">Esnek Yönetim</h3>
                <p className="text-sm text-muted-foreground">İstediğiniz an tüm metinleri ve ayarları kolayca güncelleyin.</p>
            </div>
        </div>

        <AdSpace adCode={hero.adCode} />
      </main>

      <footer className="border-t py-12 text-center mt-20">
        <div className="max-w-7xl mx-auto px-4 space-y-6">
          <p className="text-xs font-black text-muted-foreground tracking-[0.4em] uppercase">{hero.footerText}</p>
          <div className="flex justify-center gap-8 text-[10px] font-black text-muted-foreground/40 uppercase tracking-[0.2em]">
            <Link href={hero.termsUrl} className="hover:text-primary transition-all">{hero.termsLabel}</Link>
            <Link href={hero.privacyUrl} className="hover:text-primary transition-all">{hero.privacyLabel}</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
