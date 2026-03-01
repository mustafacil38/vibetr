#!/bin/bash

# VibeTR Otomatik GitHub Yükleme Scripti
# Senin depon: https://github.com/mustafacil38/vibetr.git

REPO_URL="https://github.com/mustafacil38/vibetr.git"

echo "🚀 VibeTR GitHub yükleme işlemi başlatılıyor..."

# Git'i temizle ve başlat
rm -rf .git
git init

# Dosyaları ekle
git add .

# İlk commit
git commit -m "VibeTR: İlk Kurulum"

# Main branch oluştur
git branch -M main

# Uzak depoyu bağla
git remote add origin $REPO_URL

# Gönder
echo "📤 Kodlar GitHub'a (mustafacil38/vibetr) gönderiliyor..."
git push -u origin main --force

echo "✅ İşlem tamamlandı! Artık Firebase App Hosting'e bağlanabilirsin."
