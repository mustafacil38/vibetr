
'use client';

import { useDoc, useFirestore } from '@/firebase';
import { doc } from 'firebase/firestore';
import { useMemoFirebase } from '@/firebase/use-memo-firebase';
import { useEffect } from 'react';

export function CustomScripts() {
  const firestore = useFirestore();

  const settingsDoc = useMemoFirebase(() => {
    if (!firestore) return null;
    return doc(firestore, 'settings', 'site');
  }, [firestore]);

  const { data: settings } = useDoc<any>(settingsDoc);

  useEffect(() => {
    if (settings?.customScripts) {
      // Scriptleri güvenli bir şekilde başlığa veya gövdeye eklemek için
      // basit bir yöntem: İlgili HTML'i bir div içine basıp head'e taşımak yerine
      // sayfa yüklendiğinde mevcut içeriği koruyarak çalışmasını sağlıyoruz.
    }
  }, [settings?.customScripts]);

  if (!settings?.customScripts) return null;

  return (
    <div 
      className="hidden" 
      dangerouslySetInnerHTML={{ __html: settings.customScripts }} 
    />
  );
}
