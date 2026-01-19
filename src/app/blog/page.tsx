import dayjs from 'dayjs';
import { ArrowRight, Calendar } from 'lucide-react';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { paths } from '@/config/paths';
import { getPublishedBlogPosts } from '@/lib/notion';

export const metadata: Metadata = {
  title: 'Blog - Elijah Dangerfield',
  description: 'Stuff I write about. Mostly tech, sometimes not.',
  openGraph: {
    title: 'Blog - Elijah Dangerfield',
    description: 'Stuff I write about. Mostly tech, sometimes not.',
    type: 'website',
  },
};

// Revalidate the blog list once per day (86400 seconds)
// This means the page is statically generated and cached,
// then regenerated in the background at most once per day
export const revalidate = 86400;

export default async function BlogPage() {
  const { items: posts } = await getPublishedBlogPosts({ pageSize: 50 });

  return (
    <div className="min-h-screen bg-background px-4 py-12">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Blog</h1>
          <p className="mt-2 text-muted-foreground">
            Stuff I think about. Mostly tech, sometimes not.
          </p>
        </div>

        {/* Posts */}
        {posts.length === 0 ? (
          <div className="rounded-lg border bg-card p-12 text-center">
            <p className="text-muted-foreground">
              Nothing here yet. Still figuring out what to write about.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={paths.blog.post.getHref(post.slug)}
                className="group block"
              >
                <article className="rounded-lg border bg-card p-6 transition-colors hover:border-primary/50">
                  <div className="flex flex-col gap-4 sm:flex-row">
                    {post.imageUrl && (
                      <div className="relative aspect-video w-full shrink-0 overflow-hidden rounded-md sm:w-48">
                        <Image
                          src={post.imageUrl}
                          alt={post.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <h2 className="text-xl font-semibold group-hover:text-primary">
                        {post.title}
                      </h2>
                      <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                        {post.description}
                      </p>

                      {/* Meta info */}
                      <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                        {post.publishedDate && (
                          <span className="flex items-center gap-1">
                            <Calendar className="size-3" />
                            {dayjs(post.publishedDate).format('MMM D, YYYY')}
                          </span>
                        )}
                      </div>

                      {/* Tags */}
                      {post.tags.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {post.tags.map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full bg-muted px-2 py-0.5 text-xs"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="mt-4 flex items-center text-sm font-medium text-primary">
                        Read more
                        <ArrowRight className="ml-1 size-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
