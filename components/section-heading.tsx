import { Reveal } from '@/components/ui/reveal';

/**
 * Bölüm başlığı. Varsayılan sola hizalı; `align="center"` ile ortalanır.
 * Koyu zeminde `dark` kullanın.
 */
export function SectionHeading({
  kicker,
  title,
  description,
  align = 'left',
  dark = false,
  className = '',
  as: Tag = 'h2',
}: {
  kicker?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  dark?: boolean;
  className?: string;
  as?: 'h1' | 'h2';
}) {
  const center = align === 'center';
  return (
    <Reveal className={`${center ? 'text-center mx-auto' : ''} max-w-3xl ${className}`}>
      <div className={`rule ${center ? 'rule-center' : ''} ${dark ? 'rule-light' : ''}`}>
        {kicker && (
          <p className={`text-sm font-semibold mb-3 ${dark ? 'text-brand-light' : 'text-brand'}`}>{kicker}</p>
        )}
        <Tag
          className={`font-heading font-bold leading-[1.05] ${
            Tag === 'h1' ? 'text-4xl sm:text-5xl lg:text-6xl' : 'text-3xl sm:text-4xl lg:text-[2.75rem]'
          } ${dark ? 'text-white' : 'text-ink'}`}
        >
          {title}
        </Tag>
        {description && (
          <p className={`mt-5 text-base sm:text-lg leading-relaxed ${dark ? 'text-white/70' : 'text-steel'}`}>
            {description}
          </p>
        )}
      </div>
    </Reveal>
  );
}
