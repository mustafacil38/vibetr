
# 🎨 VibeTR Tasarım Sistemi (Design System)

Bu döküman, VibeTR platformunun görsel kimliğini, kullanılan renk paletini, tipografiyi ve UI bileşenlerini detaylandırır. Tasarım, modern, dinamik ve "Glassmorphism" (cam efekti) etkileri taşıyan bir yapıya sahiptir.

## 🌈 Renk Paleti (HSL)

Uygulama, Tailwind CSS ve CSS Değişkenleri (`globals.css`) üzerinden yönetilen dinamik bir tema kullanır.

### 🔵 Birincil Renkler (Primary)
- **Primary:** `217 59% 44%` (Derin Safir Mavisi) - Ana etkileşimler ve marka kimliği.
- **Accent:** `190 73% 54%` (Turkuaz/Açık Mavi) - Enerji ve vurgu noktaları.

### ⚪ Nötr Renkler (Light Mode)
- **Background:** `218 24% 95%` (Çok Açık Gri/Mavi)
- **Foreground:** `217 59% 15%` (Koyu Lacivert Metin)
- **Card:** `0 0% 100%` (Saf Beyaz)

### 🌙 Nötr Renkler (Dark Mode)
- **Background:** `217 59% 10%` (Gece Mavisi/Siyah)
- **Foreground:** `218 24% 95%` (Açık Gri Metin)
- **Card:** `217 59% 12%` (Koyu Kart Rengi)

---

## 🔡 Tipografi

- **Ana Font:** `Inter` (Google Fonts)
- **Ağırlıklar:** 
  - `400` (Regular): Gövde metinleri.
  - `600` (Semi-bold): Alt başlıklar.
  - `800/900` (Extra-bold/Black): Başlıklar ve marka ismi.
- **Karakter:** Okunabilirliği yüksek, modern sans-serif.

---

## 🧩 UI Bileşenleri (ShadCN & Tailwind)

### 1. Kartlar (Cards)
- **Radius:** `0.75rem` (Normal) / `2.5rem` (Player/Hero)
- **Gölge:** `shadow-xl` veya `shadow-2xl` ile derinlik hissi.
- **Efekt:** `backdrop-blur-md` ile cam efekti kullanımı.

### 2. Oynatıcı (Stream Player)
- **Görsel:** `maxresdefault.jpg` YouTube kapakları.
- **Animasyon:** Müzik çalarken aktifleşen `animate-bounce` görselleştiriciler (visualizers).
- **Kontroller:** Büyük, dokunmatik dostu yuvarlak butonlar.

### 3. İkonlar
- **Kütüphane:** `lucide-react`
- **Stil:** İnce hatlı (stroke), modern ikon seti.

---

## 📱 Duyarlılık (Responsiveness)

- **Mobile-First:** Tasarım önce mobil cihazlar için optimize edilmiştir.
- **Breakpoint:** `768px` (md) sonrası genişletilmiş görünüm.
- **PWA:** Uygulama, telefona yüklendiğinde tam ekran (standalone) çalışacak şekilde tasarlanmıştır.

---

## 🛠️ UI Prensipleri
- **Yuvarlak Köşeler:** Sert köşelerden kaçınılıp, dost canlısı bir deneyim için oval formlar tercih edilmiştir.
- **Hiyerarşi:** Önemli bilgiler (Çalan şarkı) büyük puntolarla, ikincil bilgiler (Sıradaki) daha küçük ve gri tonlarla sunulur.
- **Durum Geri Bildirimi:** `animate-pulse` ve `Loader2` ile yükleme durumları görselleştirilir.
