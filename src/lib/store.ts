
import { 
  doc, 
  setDoc, 
  Firestore
} from 'firebase/firestore';
import { initializeFirebase } from '@/firebase/init';

async function getDb(): Promise<Firestore> {
  const { firestore } = initializeFirebase();
  return firestore;
}

/**
 * Site ayarlarını günceller.
 */
export async function setSiteSettings(data: any) {
  const db = await getDb();
  await setDoc(doc(db, 'settings', 'site'), data, { merge: true });
}
