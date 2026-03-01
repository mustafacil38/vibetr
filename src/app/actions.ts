
'use server';

import { revalidatePath } from "next/cache";

/**
 * Bu dosya müzik ve oynatıcı işlemlerinden arındırılmıştır.
 * Sadece temel server-side fonksiyonlar için bırakılmıştır.
 */
export async function refreshApp() {
  revalidatePath('/');
}
