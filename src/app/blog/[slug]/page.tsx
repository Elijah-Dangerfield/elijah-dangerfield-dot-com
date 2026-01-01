import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import BlogPostPage from '@/features/blog/components/blog-post-page';
import { getBlogPostBySlug, getAllBlogSlugs } from '@/lib/notion';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Revalidate individual posts once per day
export const revalidate = 86400;

// Allow dynamic params for posts not generated at build time
export const dynamicParams = true;

// Generate all blog post pages at build time
export async function generateStaticParams() {
  const slugs = await getAllBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const { post } = await getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post Not Found - Elijah Dangerfield',
    };
  }

  return {
    title: `${post.title} - Elijah Dangerfield`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      images: post.imageUrl ? [post.imageUrl] : undefined,
    },
  };
}

export default async function BlogPost({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const { post, page, error } = await getBlogPostBySlug(slug);

  if (error || !post) {
    notFound();
  }

  return <BlogPostPage post={post} page={page} />;
}
