import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/site-config';
import { machines } from '@/lib/machine-data';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages: MetadataRoute.Sitemap = [
    { url: `${siteConfig.url}/`, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${siteConfig.url}/hizmetler`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${siteConfig.url}/makineler`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${siteConfig.url}/katalog`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${siteConfig.url}/referanslar`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${siteConfig.url}/hakkimizda`, lastModified: now, changeFrequency: 'yearly', priority: 0.7 },
    { url: `${siteConfig.url}/iletisim`, lastModified: now, changeFrequency: 'yearly', priority: 0.8 },
  ];
  const machinePages: MetadataRoute.Sitemap = machines.map((m) => ({
    url: `${siteConfig.url}/makineler/${m.id}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));
  return [...pages, ...machinePages];
}
