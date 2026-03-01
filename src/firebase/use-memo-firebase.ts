'use client';

import { useRef } from 'react';

/**
 * Firebase referansları ve sorguları için özelleştirilmiş bir memoization kancası.
 * useMemo'nun aksine, bağımlılıklar değişene kadar renderlar arasında sabit bir referans sağlar.
 * Bu, Firestore dinleyicilerinin (listeners) gereksiz yere tetiklenmesini önler.
 */
export function useMemoFirebase<T>(factory: () => T, deps: any[]): T {
  const ref = useRef<T | null>(null);
  const lastDeps = useRef<any[]>([]);

  const changed = 
    lastDeps.current.length === 0 || 
    deps.length !== lastDeps.current.length ||
    deps.some((dep, i) => dep !== lastDeps.current[i]);

  if (changed) {
    const memoized = factory();
    
    if (typeof memoized === 'object' && memoized !== null) {
      // useCollection ve useDoc kancaları tarafından kontrol edilen güvenlik bayrağını ekle
      Object.defineProperty(memoized, '__memo', {
        value: true,
        enumerable: false,
        configurable: true,
      });
    }
    
    ref.current = memoized;
    lastDeps.current = deps;
  }

  return ref.current as T;
}
