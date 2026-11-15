import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Case } from "@/components/case/Case";
import { View } from "@/components/View";
import { PROJECTS, projectBySlug, type Track } from "@/lib/content";

// Every project is prerendered, so navigation is instant in practice. The
// address is read before anything streams so that a mistyped one gets a real
// 404 status, which means this page is allowed to block.
export const instant = false;

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const project = projectBySlug((await params).slug);
  return project ? { title: project.name, description: `${project.what}. ${project.role}.` } : {};
}

export default async function CasePage({ params }: PageProps<"/work/[slug]">) {
  const project = projectBySlug((await params).slug);
  if (!project) notFound();

  // "Next" stays inside the version of the site the visitor is reading.
  const nexts: Partial<Record<Track, { slug: string; name: string }>> = {};
  for (const track of project.tracks) {
    const group = PROJECTS.filter((p) => p.tracks.includes(track));
    const next = group[(group.indexOf(project) + 1) % group.length];
    nexts[track] = { slug: next.slug, name: next.name };
  }

  return (
    <View className="mid">
      <Case project={project} nexts={nexts} />
    </View>
  );
}
