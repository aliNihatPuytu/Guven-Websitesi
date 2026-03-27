import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { teamMembers } from '@/lib/team-data';
import { TeamMemberClient } from './team-member-client';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return teamMembers.map((m) => ({ id: m.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const member = teamMembers.find((m) => m.id === id);
  if (!member) return {};
  return {
    title: `${member.name} - ${member.title} | Güven İş ve İstif Makinaları`,
    description: member.bio.slice(0, 160),
  };
}

export default async function TeamMemberPage({ params }: PageProps) {
  const { id } = await params;
  const member = teamMembers.find((m) => m.id === id);
  if (!member) notFound();

  const otherMembers = teamMembers.filter((m) => m.id !== member.id);

  return (
    <main className="min-h-screen">
      <Header />
      <TeamMemberClient member={member} otherMembers={otherMembers} />
      <Footer />
    </main>
  );
}
