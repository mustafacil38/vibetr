
'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Smartphone } from 'lucide-react';

export default function LocalPlayerPage() {
  return (
    <div className="min-h-screen bg-background p-4 flex items-center justify-center text-center">
      <div className="max-w-md space-y-6">
        <div className="mx-auto bg-muted w-20 h-20 rounded-full flex items-center justify-center">
          <Smartphone className="w-10 h-10 text-muted-foreground" />
        </div>
        <h2 className="text-2xl font-black">Bu Sayfa Kaldırıldı</h2>
        <p className="text-muted-foreground">
          Oynatıcı özellikleri sistemden tamamen arındırılmıştır.
        </p>
        <Link href="/">
          <Button className="font-bold rounded-full px-8">Ana Sayfaya Dön</Button>
        </Link>
      </div>
    </div>
  );
}
