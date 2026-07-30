import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getStoryBySlug, getAllStorySlugs } from "@/data/stories";
import { StoryDetail } from "@/components/story/StoryShared";

export async function generateStaticParams() {
  return getAllStorySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const story = getStoryBySlug(slug);
  if (!story) return {};

  return {
    title: story.title,
    description: story.summary,
    alternates: { canonical: `/stories/${story.slug}` },
    openGraph: {
      title: `${story.title} | MD Mannan Sarder`,
      description: story.summary,
      url: `/stories/${story.slug}`,
      type: "article",
      images: [{ url: story.coverImage, width: 1200, height: 630, alt: story.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: story.title,
      description: story.summary,
      images: [story.coverImage],
    },
  };
}

export default async function StoryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const story = getStoryBySlug(slug);

  if (!story) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: story.title,
    description: story.summary,
    image: story.coverImage,
    datePublished: story.date,
    author: { "@type": "Person", name: "MD Mannan Sarder" },
    url: `https://mannansarder.vercel.app/stories/${story.slug}`,
  };

  return (
    <main className="relative min-h-screen bg-bg-main overflow-x-hidden pt-[120px] pb-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="mx-auto w-full max-w-[1280px] px-6 sm:px-8 lg:px-[100px]">
        <StoryDetail story={story} backHref="/stories" backLabel="Back to Stories" />
      </div>
    </main>
  );
}
