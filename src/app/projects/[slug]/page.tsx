import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllProjects, getProjectBySlug, getAllProjectSlugs } from "@/data/projects";
import { ProjectDetail } from "@/components/project/ProjectShared";

export async function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  const title = `${project.title} — Case Study`;

  return {
    title,
    description: project.shortDescription,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title: `${title} | MD Mannan Sarder`,
      description: project.shortDescription,
      url: `/projects/${project.slug}`,
      type: "article",
      images: [{ url: project.coverImage, width: 1200, height: 630, alt: project.title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: project.shortDescription,
      images: [project.coverImage],
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.shortDescription,
    image: project.coverImage,
    author: { "@type": "Person", name: "MD Mannan Sarder" },
    url: `https://mannansarder.vercel.app/projects/${project.slug}`,
    keywords: project.techStack.map((t) => t.name).join(", "),
  };

  return (
    <main className="relative min-h-screen bg-bg-main overflow-x-hidden pt-[120px] pb-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="mx-auto w-full max-w-[1280px] px-6 sm:px-8">
        <ProjectDetail project={project} allProjects={getAllProjects()} backHref="/projects" backLabel="Back to Projects" />
      </div>
    </main>
  );
}
