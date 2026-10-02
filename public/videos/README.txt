TANITIM VİDEOSU — KURULUM TALİMATI
====================================

Bu klasöre "tanitim.mp4" adıyla tanıtım videonuzu yükleyin.

Önerilen format:
  - Dosya adı: tanitim.mp4
  - Format: MP4 (H.264 codec)
  - Çözünürlük: 1920x1080 (Full HD)
  - Boyut: 50 MB'tan küçük tutun
  - Süre: 30 saniye - 3 dakika arası ideal

YOUTUBE KULLANMAK İSTERSENİZ:
components/video-intro.tsx dosyasını açın ve
video elementini şu iframe ile değiştirin:

  <iframe
    src="https://www.youtube.com/embed/VIDEO_ID?autoplay=1&mute=1&controls=1&rel=0"
    className="absolute inset-0 w-full h-full"
    allow="autoplay; fullscreen"
    allowFullScreen
  />

VIDEO_ID yerine YouTube video ID'nizi yazın
(URL'deki "watch?v=" sonrasındaki kısım).
