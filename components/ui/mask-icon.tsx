/**
 * PNG siluet ikonunu metin rengiyle (currentColor) boyayan ikon.
 * YouTube ve Sahibinden logoları için kullanılır — koyu zeminde beyaz,
 * açık zeminde koyu görünür; hover renk geçişleri otomatik çalışır.
 */
export function MaskIcon({
  src,
  className = 'w-5 h-5',
  label,
}: {
  src: string;
  className?: string;
  label?: string;
}) {
  return (
    <span
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className={`mask-icon shrink-0 ${className}`}
      style={{ WebkitMaskImage: `url(${src})`, maskImage: `url(${src})` }}
    />
  );
}
