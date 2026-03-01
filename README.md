
# 🎵 VibeTR: Profesyonel Radyo & Müzik Platformu

VibeTR, Next.js 15 ve Firebase altyapısı ile güçlendirilmiş, gerçek zamanlı senkronizasyon yeteneğine sahip modern bir radyo platformudur.

## 🎨 Tasarım Sistemi
Uygulamanın renk paleti, tipografisi ve UI bileşenleri hakkında detaylı bilgiye [Tasarım Rehberi](./docs/design-system.md) dosyasından ulaşabilirsiniz.

## 🚀 Vercel ile Ücretsiz Yayına Alma (Kartsız & Kolay)

GitHub deponuz (`mustafacil38/vibetr`) hazırsa, şu adımları takip ederek sitenizi canlıya alabilirsiniz:

1.  **Vercel'e Giriş Yap:** [Vercel.com](https://vercel.com) adresine gidin ve GitHub hesabınızla giriş yapın.
2.  **Projeyi İçeri Aktar:** "Add New" -> "Project" butonuna basın. GitHub depolarınız listelenecek, `vibetr` deponuzu bulun ve "Import" deyin.
3.  **Çevre Değişkenlerini (Environment Variables) Ekle:** "Environment Variables" bölümüne şu iki kritik bilgiyi ekleyin:
    - `NEXT_PUBLIC_FIREBASE_PROJECT_ID`: **`studio-2347257907-bf93f`**
    - `GOOGLE_GENAI_API_KEY`: (Google AI'dan aldığınız API anahtarı)
4.  **Deploy:** "Deploy" butonuna basın. Siteniz saniyeler içinde yayına girecektir!

---

## 🔑 Gemini API Anahtarı Nasıl Alınır?

Şarkı başlıklarının otomatik temizlenmesi için bir API anahtarına ihtiyacınız var:
1. [Google AI Studio](https://aistudio.google.com/) adresine gidin.
2. **"Get API key"** butonuna tıklayın.
3. Oluşturduğunuz anahtarı kopyalayın ve Vercel'deki `GOOGLE_GENAI_API_KEY` alanına yapıştırın.

---

## 🛠️ Teknik Bilgiler

- **Proje ID:** `studio-2347257907-bf93f`
- **Veritabanı:** Firebase Firestore (Real-time)
- **Framework:** Next.js 15 (App Router)

## 💻 Bilgisayarınızdan Güncelleme Yapma

Eğer kodlarda değişiklik yaparsanız, şu komutlarla GitHub'a gönderebilirsiniz:

```bash
git add .
git commit -m "Güncelleme yapıldı"
git push origin main
```

*VibeTR ile kesintisiz yayının keyfini çıkarın!*
