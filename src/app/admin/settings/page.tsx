
'use client';

import { useState, useEffect, useMemo } from 'react';
import { useFirestore, useDoc } from '@/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Lock, Layout, Megaphone, Info, ShieldCheck, ChevronLeft, Instagram, Twitter, Settings, Code, FileText } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import Link from 'next/link';

export default function AdminSettingsPage() {
  const firestore = useFirestore();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  
  const settingsDocRef = useMemo(() => {
    if (!firestore) return null;
    return doc(firestore, 'settings', 'site');
  }, [firestore]);

  const { data: settings } = useDoc<any>(settingsDocRef);
  
  const [formData, setFormData] = useState<any>({
    siteName: '', 
    logoUrl: '', 
    heroTitle: '', 
    heroDescription: '',
    showHero: true, 
    adCode: '', 
    customScripts: '', 
    footerText: '',
    termsLabel: '', 
    termsUrl: '', 
    privacyLabel: '', 
    privacyUrl: '',
    instagramUrl: '', 
    xUrl: ''
  });

  const [isUpdating, setIsUpdating] = useState(false);
  const [oldPass, setOldPass] = useState('');
  const [newPass, setNewPass] = useState('');

  useEffect(() => {
    if (sessionStorage.getItem('vibe_admin') === 'true') {
      setIsAuthorized(true);
    }
  }, []);

  useEffect(() => {
    if (settings) {
      setFormData({
        siteName: settings.siteName || '',
        logoUrl: settings.logoUrl || '',
        heroTitle: settings.heroTitle || '',
        heroDescription: settings.heroDescription || '',
        showHero: settings.showHero !== false,
        adCode: settings.adCode || '',
        customScripts: settings.customScripts || '',
        footerText: settings.footerText || '',
        termsLabel: settings.termsLabel || '',
        termsUrl: settings.termsUrl || '',
        privacyLabel: settings.privacyLabel || '',
        privacyUrl: settings.privacyUrl || '',
        instagramUrl: settings.instagramUrl || '',
        xUrl: settings.xUrl || ''
      });
    }
  }, [settings]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firestore) return;
    const adminSnap = await getDoc(doc(firestore, 'secrets', 'admin'));
    const pass = adminSnap.exists() ? adminSnap.data().password : '12345';
    if (passwordInput === pass) {
      setIsAuthorized(true);
      sessionStorage.setItem('vibe_admin', 'true');
    } else {
      toast({ title: "Hata", description: "Yanlış şifre!", variant: "destructive" });
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firestore || !settingsDocRef) return;
    setIsUpdating(true);
    try {
      await setDoc(settingsDocRef, formData, { merge: true });
      toast({ title: "Başarılı", description: "Ayarlar kaydedildi." });
    } catch (err) {
      toast({ title: "Hata", description: "Güncelleme başarısız.", variant: "destructive" });
    } finally {
      setIsUpdating(false);
    }
  };

  const handlePassChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firestore) return;
    const adminRef = doc(firestore, 'secrets', 'admin');
    const adminSnap = await getDoc(adminRef);
    const current = adminSnap.exists() ? adminSnap.data().password : '12345';
    
    if (oldPass !== current) {
      toast({ title: "Hata", description: "Mevcut şifre yanlış.", variant: "destructive" });
      return;
    }

    await setDoc(adminRef, { password: newPass }, { merge: true });
    toast({ title: "Başarılı", description: "Şifre güncellendi." });
    setOldPass(''); setNewPass('');
  };

  if (!isAuthorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="w-full max-w-md shadow-2xl">
          <CardHeader className="text-center">
            <Lock className="mx-auto w-12 h-12 text-primary mb-2" />
            <CardTitle>Yönetici Girişi</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <Input type="password" value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} placeholder="Şifre" />
              <Button type="submit" className="w-full">Giriş</Button>
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
          <Link href="/admin"><Button variant="ghost"><ChevronLeft className="mr-2" /> Geri</Button></Link>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Settings className="w-8 h-8 text-primary" />
            Uygulama Ayarları
          </h1>
        </div>

        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-4 h-auto p-1 mb-8">
            <TabsTrigger value="general" className="py-3"><Layout className="w-4 h-4 mr-2" /> Genel</TabsTrigger>
            <TabsTrigger value="hero" className="py-3"><Info className="w-4 h-4 mr-2" /> Tanıtım</TabsTrigger>
            <TabsTrigger value="social" className="py-3"><Instagram className="w-4 h-4 mr-2" /> Sosyal</TabsTrigger>
            <TabsTrigger value="advanced" className="py-3"><Code className="w-4 h-4 mr-2" /> Gelişmiş</TabsTrigger>
          </TabsList>

          <form onSubmit={handleUpdate} className="space-y-6">
            <TabsContent value="general" className="space-y-6">
              <Card>
                <CardHeader><CardTitle className="text-lg">Site Kimliği</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Site İsmi</Label>
                    <Input value={formData.siteName} onChange={(e) => setFormData({...formData, siteName: e.target.value})} placeholder="VibeTR" />
                  </div>
                  <div className="space-y-2">
                    <Label>Logo Görsel URL</Label>
                    <Input value={formData.logoUrl} onChange={(e) => setFormData({...formData, logoUrl: e.target.value})} placeholder="https://..." />
                  </div>
                  <div className="space-y-2">
                    <Label>Alt Bilgi (Footer) Metni</Label>
                    <Input value={formData.footerText} onChange={(e) => setFormData({...formData, footerText: e.target.value})} placeholder="© 2024 VibeTR" />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="hero" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Tanıtım Metin Alanı (Hero)</CardTitle>
                    <Switch checked={formData.showHero} onCheckedChange={(val) => setFormData({...formData, showHero: val})} />
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Başlık</Label>
                    <Input value={formData.heroTitle} onChange={(e) => setFormData({...formData, heroTitle: e.target.value})} placeholder="Kesintisiz Müzik Keyfi" />
                  </div>
                  <div className="space-y-2">
                    <Label>Açıklama</Label>
                    <Textarea rows={4} value={formData.heroDescription} onChange={(e) => setFormData({...formData, heroDescription: e.target.value})} placeholder="En sevdiğiniz parçalar 7/24 sizinle." />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="social" className="space-y-6">
              <Card>
                <CardHeader><CardTitle className="text-lg">Sosyal Medya & Hukuki Bağlantılar</CardTitle></CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="flex items-center gap-2"><Instagram className="w-4 h-4" /> Instagram</Label>
                      <Input value={formData.instagramUrl} onChange={(e) => setFormData({...formData, instagramUrl: e.target.value})} placeholder="https://instagram.com/..." />
                    </div>
                    <div className="space-y-2">
                      <Label className="flex items-center gap-2"><Twitter className="w-4 h-4" /> X (Twitter)</Label>
                      <Input value={formData.xUrl} onChange={(e) => setFormData({...formData, xUrl: e.target.value})} placeholder="https://x.com/..." />
                    </div>
                  </div>
                  <Separator />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="flex items-center gap-2"><FileText className="w-4 h-4" /> Kullanım Koşulları Etiketi</Label>
                      <Input value={formData.termsLabel} onChange={(e) => setFormData({...formData, termsLabel: e.target.value})} placeholder="Kullanım Koşulları" />
                    </div>
                    <div className="space-y-2">
                      <Label>Kullanım Koşulları URL</Label>
                      <Input value={formData.termsUrl} onChange={(e) => setFormData({...formData, termsUrl: e.target.value})} placeholder="#" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="flex items-center gap-2"><ShieldCheck className="w-4 h-4" /> Gizlilik Politikası Etiketi</Label>
                      <Input value={formData.privacyLabel} onChange={(e) => setFormData({...formData, privacyLabel: e.target.value})} placeholder="Gizlilik Politikası" />
                    </div>
                    <div className="space-y-2">
                      <Label>Gizlilik Politikası URL</Label>
                      <Input value={formData.privacyUrl} onChange={(e) => setFormData({...formData, privacyUrl: e.target.value})} placeholder="#" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="advanced" className="space-y-6">
              <Card>
                <CardHeader><CardTitle className="text-lg">Reklam & Kodlar</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2"><Megaphone className="w-4 h-4" /> Reklam Kodu (HTML)</Label>
                    <Textarea rows={4} value={formData.adCode} onChange={(e) => setFormData({...formData, adCode: e.target.value})} className="font-mono text-xs" />
                  </div>
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2"><Code className="w-4 h-4" /> Özel Script Kodları (Analytics vb.)</Label>
                    <Textarea rows={4} value={formData.customScripts} onChange={(e) => setFormData({...formData, customScripts: e.target.value})} className="font-mono text-xs" />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <Button disabled={isUpdating} type="submit" className="w-full h-12 text-lg font-bold">
              {isUpdating ? 'Kaydediliyor...' : 'Tüm Ayarları Kaydet'}
            </Button>
          </form>

          <Separator className="my-8" />
          
          <Card className="border-destructive/20 bg-destructive/5">
            <CardHeader><CardTitle className="text-lg text-destructive">Yönetici Şifresini Değiştir</CardTitle></CardHeader>
            <CardContent>
              <form onSubmit={handlePassChange} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input type="password" placeholder="Mevcut Şifre" value={oldPass} onChange={(e) => setOldPass(e.target.value)} />
                  <Input type="password" placeholder="Yeni Şifre" value={newPass} onChange={(e) => setNewPass(e.target.value)} />
                </div>
                <Button variant="outline" type="submit" className="w-full">Şifreyi Güncelle</Button>
              </form>
            </CardContent>
          </Card>
        </Tabs>
      </div>
    </div>
  );
}
