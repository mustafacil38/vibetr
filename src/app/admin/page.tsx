'use client';

import { useState, useEffect, useMemo } from 'react';
import { useFirestore, useDoc } from '@/firebase';
import { doc, getDoc, setDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Lock, Settings, Layout, LogOut, ChevronRight, Music, Radio, Plus, Trash, GripVertical } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import Link from 'next/link';

interface PlaylistItem {
  id: string;
  url: string;
  title: string;
}

export default function AdminPage() {
  const firestore = useFirestore();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const [playlist, setPlaylist] = useState<PlaylistItem[]>([]);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem('vibe_admin') === 'true') {
      setIsAuthorized(true);
    }
  }, []);

  const settingsDocRef = useMemo(() => {
    if (!firestore) return null;
    return doc(firestore, 'settings', 'site');
  }, [firestore]);

  const { data: settings } = useDoc<any>(settingsDocRef);

  useEffect(() => {
    if (settings && settings.playlist) {
      setPlaylist(settings.playlist);
    }
  }, [settings]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firestore) return;
    try {
      const adminDoc = await getDoc(doc(firestore, 'secrets', 'admin'));
      const correctPass = adminDoc.exists() ? adminDoc.data().password : '12345';
      if (passwordInput === correctPass) {
        setIsAuthorized(true);
        sessionStorage.setItem('vibe_admin', 'true');
      } else {
        toast({ title: "Hata", description: "Hatalı şifre!", variant: "destructive" });
      }
    } catch (err) {
      toast({ title: "Hata", description: "Giriş yapılamadı.", variant: "destructive" });
    }
  };

  const handleAddUrl = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUrl || !settingsDocRef) return;
    setIsUpdating(true);

    try {
        const response = await fetch('/api/youtube', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url: newUrl, apiKey: 'AIzaSyBrQ-zWRyo0ejSRVn_e_-VszhZY1rwQIxQ' }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to fetch from YouTube API');
        }

        const items = await response.json();

        await updateDoc(settingsDocRef, {
            playlist: arrayUnion(...items)
        });

        setNewUrl('');
        toast({ title: "Başarılı", description: "Oynatma listesi güncellendi." });
    } catch (error: any) {
        toast({ title: "Hata", description: error.message, variant: "destructive" });
    }

    setIsUpdating(false);
  };

  const handleRemoveUrl = async (itemToRemove: PlaylistItem) => {
    if (!settingsDocRef) return;
    try {
      await updateDoc(settingsDocRef, { 
        playlist: arrayRemove(itemToRemove)
      });
      toast({ title: "Başarılı", description: "URL silindi." });
    } catch (error) {
      toast({ title: "Hata", description: "URL silinirken bir sorun oluştu.", variant: "destructive" });
    }
  };
  
  if (!isAuthorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="w-full max-w-md shadow-2xl">
          <CardHeader className="text-center">
            <Lock className="mx-auto w-12 h-12 text-primary mb-4" />
            <CardTitle>Yönetici Girişi</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <Input type="password" value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} placeholder="Şifre" />
              <Button type="submit" className="w-full">Giriş Yap</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Layout className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold uppercase tracking-tighter">Yönetim Masası</h1>
          </div>
          <Button variant="ghost" size="sm" onClick={() => { sessionStorage.removeItem('vibe_admin'); setIsAuthorized(false); }}>
            <LogOut className="w-4 h-4 mr-2" /> Çıkış
          </Button>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                  <Radio className="text-primary" /> Oynatma Listesi
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <form onSubmit={handleAddUrl} className="flex items-center gap-2">
                <Input 
                  value={newUrl} 
                  onChange={(e) => setNewUrl(e.target.value)} 
                  placeholder="YouTube Video veya Oynatma Listesi URL'si"
                />
                <Button type="submit" disabled={isUpdating}><Plus className="w-4 h-4" /></Button>
              </form>
              
              <div className="space-y-2 pt-4">
                {playlist.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-2 rounded-md bg-muted/50">
                    <div className="flex items-center gap-3">
                        <GripVertical className="w-5 h-5 text-muted-foreground cursor-grab"/>
                        <p className="text-sm font-medium line-clamp-1">{item.title}</p>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => handleRemoveUrl(item)}><Trash className="w-4 h-4 text-destructive" /></Button>
                  </div>
                ))}
                 {playlist.length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-4">Henüz bir URL eklenmemiş.</p>
                )}
              </div>

            </CardContent>
          </Card>

          <Card className="hover:border-primary transition-all group">
              <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                      <Settings className="text-primary" /> Uygulama Ayarları
                  </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">Site ismi, logo, tanıtım metinleri ve SEO ayarlarını buradan yönetin.</p>
                  <Link href="/admin/settings" className="block">
                      <Button className="w-full font-bold">Tüm Ayarları Düzenle <ChevronRight className="ml-2 w-4 h-4" /></Button>
                  </Link>
              </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
