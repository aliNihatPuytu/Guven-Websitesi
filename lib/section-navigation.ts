export function scrollToPageSection(sectionId: string) {
  if (typeof window === 'undefined') return false;

  const section = document.getElementById(sectionId);

  if (!section) return false;

  section.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  });

  window.history.replaceState(null, '', `#${sectionId}`);
  return true;
}

export function scrollToHashAfterRender() {
  if (typeof window === 'undefined') return;

  const sectionId = window.location.hash.replace('#', '');
  if (!sectionId) return;

  window.requestAnimationFrame(() => {
    window.setTimeout(() => {
      scrollToPageSection(sectionId);
    }, 120);
  });
}
