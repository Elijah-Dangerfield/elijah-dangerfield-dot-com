'use client';

import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import { paths } from '@/config/paths';
import { BlogPost } from '@/lib/notion/api';

// Fetch function for blog posts
async function fetchBlogPosts(): Promise<{ items: BlogPost[] }> {
  const response = await fetch('/api/blog/posts');
  if (!response.ok) {
    throw new Error('Failed to fetch posts');
  }
  return response.json();
}

export default function BlogPageClient() {
  const [searchQuery, setSearchQuery] = useState('');

  const { data, isLoading, error } = useQuery({
    queryKey: ['blog-posts'],
    queryFn: fetchBlogPosts,
  });

  const posts = data?.items || [];
  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
  );

  return (
    <div className="min-h-screen bg-background px-4 py-12">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Blog</h1>
          <p className="mt-2 text-muted-foreground">
            Thoughts on software engineering, development, and technology
          </p>
        </div>

        {/* Search */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search posts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border bg-background px-4 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        {/* Posts */}
        {isLoading ? (
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="animate-pulse rounded-lg border bg-card p-6"
              >
                <div className="mb-4 h-6 w-3/4 rounded bg-muted" />
                <div className="mb-2 h-4 w-full rounded bg-muted" />
                <div className="h-4 w-2/3 rounded bg-muted" />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-6 text-center">
            <p className="text-destructive">
              Failed to load posts. Please try again later.
            </p>
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="rounded-lg border bg-card p-12 text-center">
            <p className="text-muted-foreground">
              {searchQuery
                ? 'No posts found matching your search.'
                : 'No blog posts yet. Check back soon!'}
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredPosts.map((post) => (
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
                        {post.readTime && (
                          <span className="flex items-center gap-1">
                            <Clock className="size-3" />
                            {post.readTime} min read
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
