/**
 * Makine grupları için özgün çizgi ikonlar (24×24, stroke tabanlı).
 * Emoji yerine kullanılır; renk currentColor ile metinden gelir.
 */
const base = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
};

export function MachineGlyph({ id, className = 'w-6 h-6' }: { id: string; className?: string }) {
  switch (id) {
    case 'ekskavator-grubu':
    case 'ekskavator':
      return (
        <svg {...base} className={className}>
          {/* palet */}
          <rect x="3" y="16" width="11" height="4" rx="2" />
          {/* kabin */}
          <path d="M5 16v-4h5l1.5 2.5V16" />
          {/* bom + kol */}
          <path d="M10 12l4-6 5 2" />
          <path d="M19 8l-1 6" />
          {/* kova */}
          <path d="M18 14h3v3l-3 1z" />
        </svg>
      );
    case 'mini-ekskavator-grubu':
    case 'mini-ekskavator':
      return (
        <svg {...base} className={className}>
          <rect x="4" y="17" width="9" height="3" rx="1.5" />
          <path d="M6 17v-3h4l1 2v1" />
          <path d="M10 14l3-5 4 1.5" />
          <path d="M17 10.5l-.5 5" />
          <path d="M16 15.5h2.5v2.5l-2.5.5z" />
          {/* bıçak */}
          <path d="M2.5 18.5h1.5" />
        </svg>
      );
    case 'toprak-silindir-grubu':
    case 'toprak-silindiri':
      return (
        <svg {...base} className={className}>
          {/* tambur */}
          <circle cx="7" cy="16" r="4" />
          <circle cx="7" cy="16" r="1" />
          {/* gövde & kabin */}
          <path d="M11 15h4V9h3l2 3v3h-1" />
          <path d="M12 9h3" />
          {/* arka teker */}
          <circle cx="18" cy="17" r="2.5" />
          <path d="M7 12h5" />
        </svg>
      );
    case 'lastikli-yukleyici-grubu':
    case 'lastikli-yukleyici':
      return (
        <svg {...base} className={className}>
          <circle cx="8" cy="17" r="2.5" />
          <circle cx="17" cy="17" r="2.5" />
          {/* gövde */}
          <path d="M10.5 17h4M5.5 17H4v-4h3l1-4h5v8" />
          {/* kabin camı */}
          <path d="M9 11h3v3" />
          {/* kova kolu & kova */}
          <path d="M13 11l6 1v5h-1.5" />
          <path d="M19 12l2-1v4l-2 2" />
        </svg>
      );
    case 'greyder-grubu':
    case 'greyder':
      return (
        <svg {...base} className={className}>
          <circle cx="5" cy="17" r="2.5" />
          <circle cx="16" cy="17" r="2.5" />
          <circle cx="20.5" cy="17" r="2" />
          {/* şasi */}
          <path d="M7.5 17H13" />
          <path d="M5 14.5V12h6l1.5-3h4v5.5" />
          <path d="M13.5 9v3h3" />
          {/* bıçak */}
          <path d="M7 15.5l5-1.5" />
        </svg>
      );
    case 'forklift-grubu':
    case 'forklift':
      return (
        <svg {...base} className={className}>
          <circle cx="7" cy="18" r="2" />
          <circle cx="14" cy="18" r="2" />
          <path d="M9 18h3" />
          {/* gövde & kabin */}
          <path d="M5 18v-5h3V8h4l2 5v5" />
          {/* direk */}
          <path d="M17 5v13" />
          {/* çatal */}
          <path d="M17 15h4" />
          <path d="M17 12h2.5" />
        </svg>
      );
    case 'istif-grubu':
    case 'istif':
      return (
        <svg {...base} className={className}>
          {/* direk */}
          <path d="M9 4v14" />
          <path d="M12 4v14" />
          {/* çatal */}
          <path d="M12 16h7M12 12h5" />
          {/* şasi & teker */}
          <path d="M5 18h7" />
          <circle cx="6.5" cy="19.5" r="1.5" />
          <circle cx="13" cy="19.5" r="1.5" />
          {/* kol */}
          <path d="M9 9H6l-1.5 4" />
          <path d="M19 14v4" />
        </svg>
      );
    default:
      return (
        <svg {...base} className={className}>
          <rect x="4" y="12" width="12" height="6" rx="1.5" />
          <circle cx="7" cy="19" r="1.5" />
          <circle cx="13" cy="19" r="1.5" />
          <path d="M16 15h4v3" />
        </svg>
      );
  }
}
