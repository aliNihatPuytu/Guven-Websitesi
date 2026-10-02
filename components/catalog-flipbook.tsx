'use client';

import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, animate, motion, useInView, useMotionValue, useTransform } from 'framer-motion';
import {
  ChevronLeft, ChevronRight, Download, Maximize2, Minimize2, Pause, Play, LayoutGrid, X,
} from 'lucide-react';
import { siteConfig } from '@/lib/site-config';

/* ──────────────────────────────────────────────────────────────────────────
 * Basılı kataloğun sayfa çevirme (flipbook) görüntüleyicisi.
 *
 *  - Geniş ekranda açık kitap (çift sayfa), dar ekranda tek sayfa.
 *  - Sayfalar 3B döner; ok tuşları, kaydırma (swipe), küçük resimler,
 *    tam ekran, otomatik oynatma ve PDF indirme desteklenir.
 *  - Sayfa görselleri: public/katalog/pages/page-01.jpg … (A4, 1241×1755)
 * ────────────────────────────────────────────────────────────────────────── */

const RATIO = 1755 / 1241; // yükseklik / genişlik
const FLIP_MS = 900;
const EASE = [0.4, 0.05, 0.2, 1] as const;

export type CatalogSection = { label: string; page: number };

type Props = {
  pageCount?: number;
  pagesDir?: string;
  thumbsDir?: string;
  sections?: CatalogSection[];
  /** İlk görünümde kapağı otomatik aç */
  autoOpen?: boolean;
};

const pageSrc = (dir: string, n: number) => `${dir}/page-${String(n).padStart(2, '0')}.jpg`;

/** Çift sayfa düzeninde sayfa çiftleri: [null,1] [2,3] … [N,null] */
function buildSpreads(n: number): Array<[number | null, number | null]> {
  const spreads: Array<[number | null, number | null]> = [[null, 1]];
  for (let p = 2; p <= n; p += 2) spreads.push([p, p + 1 <= n ? p + 1 : null]);
  return spreads;
}

/**
 * Tek yaprak: ön yüz ve arka yüz aynı düzlemde durur; dönüş 90°'yi geçince
 * ön görsel kaybolur, aynalanmış arka görsel belirir. backface-visibility
 * kullanılmadığı için tüm tarayıcılarda tutarlı çizilir.
 */
function FlipSheet({
  forward,
  width,
  height,
  front,
  back,
  onDone,
}: {
  forward: boolean;
  width: number;
  height: number;
  front: string | null;
  back: string | null;
  onDone: () => void;
}) {
  const rot = useMotionValue(0);
  const target = forward ? -180 : 180;
  const abs = useTransform(rot, (v) => Math.abs(v));
  const frontOpacity = useTransform(abs, [89, 91], [1, 0]);
  const backOpacity = useTransform(abs, [89, 91], [0, 1]);
  // Dönüş sırasında yaprağın üzerine düşen gölge: 90° civarında en koyu
  const shade = useTransform(abs, [0, 90, 180], [0, 0.45, 0]);
  const shadeBg = useTransform(abs, (v) =>
    (v < 90) === forward
      ? 'linear-gradient(to right, rgba(0,0,0,0) 40%, rgba(0,0,0,1))'
      : 'linear-gradient(to left, rgba(0,0,0,0) 40%, rgba(0,0,0,1))',
  );

  useEffect(() => {
    const controls = animate(rot, target, { duration: FLIP_MS / 1000, ease: EASE, onComplete: onDone });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.div
      className="absolute top-0 z-10 overflow-hidden rounded-md bg-white"
      style={{
        width,
        height,
        left: forward ? width : 0,
        transformOrigin: forward ? 'left center' : 'right center',
        rotateY: rot,
        willChange: 'transform',
      }}
    >
      {front && (
        <motion.img
          src={front}
          alt=""
          width={1241}
          height={1755}
          draggable={false}
          decoding="sync"
          className="absolute inset-0 w-full h-full object-cover select-none"
          style={{ opacity: frontOpacity }}
        />
      )}
      {back && (
        <motion.img
          src={back}
          alt=""
          width={1241}
          height={1755}
          draggable={false}
          decoding="sync"
          className="absolute inset-0 w-full h-full object-cover select-none"
          style={{ opacity: backOpacity, scaleX: -1 }}
        />
      )}
      <motion.span className="pointer-events-none absolute inset-0" style={{ opacity: shade, backgroundImage: shadeBg }} />
    </motion.div>
  );
}

export function CatalogFlipbook({
  pageCount = siteConfig.catalogPages,
  pagesDir = '/katalog/pages',
  thumbsDir = '/katalog/thumbs',
  sections = [],
  autoOpen = true,
}: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef, { amount: 0.4, once: true });

  const [spreadMode, setSpreadMode] = useState(true);
  const [pageW, setPageW] = useState(360);
  const [index, setIndex] = useState(0); // spread index ya da tek sayfa index (0-based)
  const [flip, setFlip] = useState<{ dir: 1 | -1; from: number; to: number } | null>(null);
  const [fullscreen, setFullscreen] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [showThumbs, setShowThumbs] = useState(false);
  const interacted = useRef(false);

  const spreads = useMemo(() => buildSpreads(pageCount), [pageCount]);
  const total = spreadMode ? spreads.length : pageCount;
  const pageH = pageW * RATIO;

  /* ── Boyutlandırma ─────────────────────────────────────────────────────── */
  useLayoutEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const measure = () => {
      const w = el.clientWidth;
      const h = el.clientHeight;
      const spread = w >= 720;
      setSpreadMode(spread);
      const maxByH = (h - 24) / RATIO;
      const maxByW = spread ? (w - 32) / 2 : w - 80;
      setPageW(Math.max(160, Math.floor(Math.min(maxByW, maxByH))));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [fullscreen]);

  /* Mod değişince indeksi karşılık gelen sayfaya taşı */
  const prevMode = useRef(spreadMode);
  useEffect(() => {
    if (prevMode.current === spreadMode) return;
    prevMode.current = spreadMode;
    setFlip(null);
    setIndex((i) => {
      if (spreadMode) {
        const page = i + 1;
        return spreads.findIndex(([l, r]) => l === page || r === page);
      }
      const [l, r] = spreads[i] ?? [1, null];
      return ((l ?? r ?? 1) as number) - 1;
    });
  }, [spreadMode, spreads]);

  /* ── Sayfa geçişleri ───────────────────────────────────────────────────── */
  const goTo = useCallback(
    (target: number, byUser = true) => {
      if (byUser) interacted.current = true;
      if (flip) return;
      const t = Math.max(0, Math.min(total - 1, target));
      if (t === index) return;
      setFlip({ dir: t > index ? 1 : -1, from: index, to: t });
    },
    [flip, index, total],
  );
  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  const finishFlip = useCallback(() => {
    if (!flip) return;
    setIndex(flip.to);
    setFlip(null);
  }, [flip]);

  /** Basılı sayfa numarasına git */
  const goToPage = useCallback(
    (page: number) => {
      const p = Math.max(1, Math.min(pageCount, page));
      if (spreadMode) goTo(spreads.findIndex(([l, r]) => l === p || r === p));
      else goTo(p - 1);
    },
    [goTo, pageCount, spreadMode, spreads],
  );

  /* Sayfa dışından gelen "sayfaya git" istekleri (katalog içindekiler) */
  useEffect(() => {
    const onGoto = (e: Event) => {
      const page = (e as CustomEvent<number>).detail;
      if (typeof page === 'number') {
        interacted.current = true;
        rootRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setTimeout(() => goToPage(page), 350);
      }
    };
    window.addEventListener('catalog:goto', onGoto);
    return () => window.removeEventListener('catalog:goto', onGoto);
  }, [goToPage]);

  /* Klavye */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!rootRef.current) return;
      const active = fullscreen || rootRef.current.matches(':hover') || rootRef.current.contains(document.activeElement);
      if (!active) return;
      if (e.key === 'ArrowRight') { e.preventDefault(); next(); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); prev(); }
      if (e.key === 'Escape' && showThumbs) setShowThumbs(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [next, prev, fullscreen, showThumbs]);

  /* Kaydırma (swipe) */
  const pointer = useRef<{ x: number; y: number } | null>(null);
  const onPointerDown = (e: React.PointerEvent) => { pointer.current = { x: e.clientX, y: e.clientY }; };
  const onPointerUp = (e: React.PointerEvent) => {
    if (!pointer.current) return;
    const dx = e.clientX - pointer.current.x;
    const dy = e.clientY - pointer.current.y;
    pointer.current = null;
    if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy) * 1.5) (dx < 0 ? next : prev)();
  };

  /* Otomatik açılış: görünür olunca kapağı çevir */
  useEffect(() => {
    if (!autoOpen || !inView || interacted.current || index !== 0) return;
    const t = setTimeout(() => { if (!interacted.current) goTo(1, false); }, 1300);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, autoOpen]);

  /* Otomatik oynatma */
  useEffect(() => {
    if (!playing) return;
    if (index >= total - 1) { setPlaying(false); return; }
    const t = setTimeout(() => goTo(index + 1, false), 2600);
    return () => clearTimeout(t);
  }, [playing, index, total, goTo]);

  /* Tam ekran */
  useEffect(() => {
    const onChange = () => setFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener('fullscreenchange', onChange);
    return () => document.removeEventListener('fullscreenchange', onChange);
  }, []);
  const toggleFullscreen = async () => {
    interacted.current = true;
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else await rootRef.current?.requestFullscreen();
    } catch {
      setFullscreen((f) => !f); // Fullscreen API yoksa CSS tam ekran
    }
  };

  /* Komşu sayfaları önden yükle */
  useEffect(() => {
    const around = spreadMode
      ? [index - 1, index + 1, index + 2].flatMap((i) => spreads[i] ?? [])
      : [index, index + 1, index + 2, index + 3].map((i) => i + 1);
    around.forEach((p) => { if (p && p >= 1 && p <= pageCount) { const im = new window.Image(); im.src = pageSrc(pagesDir, p); } });
  }, [index, spreadMode, spreads, pageCount, pagesDir]);

  /* ── Görünüm hesapları ─────────────────────────────────────────────────── */
  const currentPagesLabel = spreadMode
    ? (() => { const [l, r] = spreads[index]; return l && r ? `${l}–${r}` : String(l ?? r); })()
    : String(index + 1);

  const Page = ({ n, className = '', priority = false }: { n: number | null; className?: string; priority?: boolean }) =>
    n ? (
      <img
        src={pageSrc(pagesDir, n)}
        alt={`Katalog sayfa ${n}`}
        width={1241}
        height={1755}
        draggable={false}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        className={`block w-full h-full object-cover select-none bg-white ${className}`}
      />
    ) : (
      <div className={`w-full h-full ${className}`} aria-hidden />
    );

  /* Çift sayfa: statik sol/sağ ve dönen yaprak */
  const renderSpread = () => {
    const cur = spreads[index];
    const tgt = flip ? spreads[flip.to] : null;
    const forward = flip?.dir === 1;
    // Altta kalan statik sayfalar
    const staticL = flip ? (forward ? cur[0] : tgt![0]) : cur[0];
    const staticR = flip ? (forward ? tgt![1] : cur[1]) : cur[1];
    // Dönen yaprağın ön/arka yüzü
    const sheetFront = flip ? (forward ? cur[1] : cur[0]) : null;
    const sheetBack = flip ? (forward ? tgt![0] : tgt![1]) : null;

    const pageStyle = { width: pageW, height: pageH };

    return (
      <div
        className="relative flex"
        style={{ width: pageW * 2, height: pageH, perspective: pageW * 3.2 }}
      >
        {/* Sol sayfa */}
        <div className="relative shrink-0 overflow-hidden rounded-l-md" style={pageStyle}>
          <Page n={staticL} priority />
          {staticL && <span className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-black/15 to-transparent" />}
        </div>
        {/* Sağ sayfa */}
        <div className="relative shrink-0 overflow-hidden rounded-r-md" style={pageStyle}>
          <Page n={staticR} priority />
          {staticR && <span className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-black/15 to-transparent" />}
        </div>

        {/* Dönen yaprak */}
        {flip && (
          <FlipSheet
            key={`${flip.from}-${flip.to}`}
            forward={Boolean(forward)}
            width={pageW}
            height={pageH}
            front={sheetFront ? pageSrc(pagesDir, sheetFront) : null}
            back={sheetBack ? pageSrc(pagesDir, sheetBack) : null}
            onDone={finishFlip}
          />
        )}

        {/* Sırt gölgesi */}
        <span className="pointer-events-none absolute inset-y-0 left-1/2 -translate-x-1/2 w-6 bg-gradient-to-r from-black/0 via-black/25 to-black/0 z-20" aria-hidden />
      </div>
    );
  };

  /* Tek sayfa (mobil): kaydırmalı geçiş */
  const renderSingle = () => {
    const shown = flip ? flip.to : index;
    const dir = flip?.dir ?? 1;
    return (
      <div className="relative" style={{ width: pageW, height: pageH, perspective: pageW * 3 }}>
        <AnimatePresence initial={false} custom={dir} mode="popLayout">
          <motion.div
            key={shown}
            custom={dir}
            className="absolute inset-0 overflow-hidden rounded-md shadow-2xl"
            initial={{ x: dir * pageW * 0.6, rotateY: dir * -35, opacity: 0 }}
            animate={{ x: 0, rotateY: 0, opacity: 1 }}
            exit={{ x: dir * -pageW * 0.6, rotateY: dir * 35, opacity: 0 }}
            transition={{ duration: 0.55, ease: EASE }}
            onAnimationComplete={() => flip && finishFlip()}
            style={{ transformOrigin: dir > 0 ? 'left center' : 'right center' }}
          >
            <Page n={shown + 1} priority />
          </motion.div>
        </AnimatePresence>
      </div>
    );
  };

  const stageHeightClass = fullscreen ? 'h-[calc(100vh-8.5rem)]' : 'h-[62vh] min-h-[380px] max-h-[760px]';

  return (
    <div
      ref={rootRef}
      tabIndex={0}
      className={`relative bg-ink text-white outline-none select-none ${fullscreen ? 'fixed inset-0 z-[120] flex flex-col' : 'rounded-2xl overflow-hidden border border-white/10'}`}
      aria-label="Katalog görüntüleyici"
    >
      <div className="absolute inset-0 grid-texture pointer-events-none" aria-hidden />
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[70%] h-80 rounded-full bg-brand/30 blur-3xl pointer-events-none" aria-hidden />

      {/* Üst bilgi şeridi */}
      <div className="relative flex items-center justify-between gap-3 px-4 sm:px-6 h-14 border-b border-white/10 bg-ink/60 backdrop-blur-sm">
        <div className="min-w-0">
          <p className="font-heading font-semibold text-sm sm:text-base truncate">Güven Makine Kataloğu</p>
          <p className="text-[0.6875rem] text-white/50 hidden sm:block">Sayfaları çevirmek için okları, klavyeyi veya kaydırmayı kullanın</p>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => { interacted.current = true; setPlaying((p) => !p); }}
            className="inline-flex items-center justify-center w-9 h-9 rounded-md text-white/80 hover:bg-white/10 hover:text-white transition-colors"
            aria-label={playing ? 'Otomatik oynatmayı durdur' : 'Otomatik oynat'}
            title={playing ? 'Durdur' : 'Otomatik oynat'}
          >
            {playing ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>
          <button
            onClick={() => { interacted.current = true; setShowThumbs((s) => !s); }}
            className={`inline-flex items-center justify-center w-9 h-9 rounded-md transition-colors ${showThumbs ? 'bg-white text-ink' : 'text-white/80 hover:bg-white/10 hover:text-white'}`}
            aria-label="Sayfa seç"
            title="Sayfalar"
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
          <a
            href={siteConfig.catalogPdf}
            download
            className="inline-flex items-center justify-center w-9 h-9 rounded-md text-white/80 hover:bg-white/10 hover:text-white transition-colors"
            aria-label="PDF indir"
            title="PDF indir"
          >
            <Download className="w-4 h-4" />
          </a>
          <button
            onClick={toggleFullscreen}
            className="inline-flex items-center justify-center w-9 h-9 rounded-md text-white/80 hover:bg-white/10 hover:text-white transition-colors"
            aria-label={fullscreen ? 'Tam ekrandan çık' : 'Tam ekran'}
            title={fullscreen ? 'Tam ekrandan çık' : 'Tam ekran'}
          >
            {fullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Sahne */}
      <div
        ref={stageRef}
        className={`relative flex items-center justify-center ${stageHeightClass} ${fullscreen ? 'flex-1' : ''} px-4 touch-pan-y`}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
      >
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : undefined}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative drop-shadow-[0_40px_60px_rgba(0,0,0,.55)]"
        >
          {spreadMode ? renderSpread() : renderSingle()}
        </motion.div>

        {/* Yan oklar */}
        <button
          onClick={prev}
          disabled={index === 0 || Boolean(flip)}
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 inline-flex items-center justify-center w-11 h-11 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 text-white hover:bg-white hover:text-ink transition-colors disabled:opacity-25 disabled:hover:bg-white/10 disabled:hover:text-white"
          aria-label="Önceki sayfa"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={next}
          disabled={index >= total - 1 || Boolean(flip)}
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 inline-flex items-center justify-center w-11 h-11 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 text-white hover:bg-white hover:text-ink transition-colors disabled:opacity-25 disabled:hover:bg-white/10 disabled:hover:text-white"
          aria-label="Sonraki sayfa"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Küçük resim paneli */}
        <AnimatePresence>
          {showThumbs && (
            <motion.div
              key="thumbs"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.25 }}
              className="absolute inset-x-0 bottom-0 top-0 z-30 bg-ink/95 backdrop-blur-md p-4 sm:p-6 overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-4">
                <p className="font-heading font-semibold">Sayfalar</p>
                <button onClick={() => setShowThumbs(false)} className="w-9 h-9 rounded-md hover:bg-white/10 inline-flex items-center justify-center" aria-label="Kapat">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="grid grid-cols-3 xs:grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-3">
                {Array.from({ length: pageCount }, (_, i) => i + 1).map((p) => {
                  const active = spreadMode ? spreads[index].includes(p) : index + 1 === p;
                  return (
                    <button
                      key={p}
                      onClick={() => { goToPage(p); setShowThumbs(false); }}
                      className={`group relative rounded-md overflow-hidden border-2 transition-colors ${active ? 'border-brand-light' : 'border-white/10 hover:border-white/50'}`}
                      aria-label={`Sayfa ${p}`}
                    >
                      <img src={pageSrc(thumbsDir, p)} alt="" width={240} height={340} loading="lazy" className="block w-full h-auto" />
                      <span className="absolute bottom-1 right-1 text-[0.625rem] font-semibold px-1.5 py-0.5 rounded bg-ink/80">{p}</span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Alt şerit: bölümler + sayfa sayacı */}
      <div className="relative border-t border-white/10 bg-ink/60 backdrop-blur-sm px-4 sm:px-6 py-3 flex flex-col sm:flex-row sm:items-center gap-3">
        <div className="flex items-center gap-1 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:flex-1">
          {sections.map((s) => {
            const active = spreadMode ? spreads[index].includes(s.page) : index + 1 === s.page;
            return (
              <button
                key={s.label}
                onClick={() => goToPage(s.page)}
                className={`shrink-0 h-8 px-3 rounded-md text-xs font-medium whitespace-nowrap transition-colors ${
                  active ? 'bg-white text-ink' : 'text-white/70 hover:bg-white/10 hover:text-white'
                }`}
              >
                {s.label}
              </button>
            );
          })}
        </div>
        <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0">
          <div className="hidden sm:block h-1 w-40 rounded-full bg-white/10 overflow-hidden">
            <motion.span
              className="block h-full bg-brand-light"
              animate={{ width: `${((index + 1) / total) * 100}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>
          <p className="text-xs text-white/70 tabular-nums">
            Sayfa <span className="text-white font-semibold">{currentPagesLabel}</span> / {pageCount}
          </p>
        </div>
      </div>
    </div>
  );
}
