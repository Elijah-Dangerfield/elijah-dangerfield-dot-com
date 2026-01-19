'use client';

import dayjs from 'dayjs';
import { ArrowLeft, Calendar, Clock, Star } from 'lucide-react';
import Link from 'next/link';
import { ExtendedRecordMap } from 'notion-types';

import { ClientSideNotionRenderer } from '@/components/ui/notion-renderer';
import { paths } from '@/config/paths';
import { BlogPost } from '@/lib/notion/api';
import { formatRating } from '@/utils/format';

interface BlogPostPageProps {
  post: BlogPost;
  page?: ExtendedRecordMap;
}

export default function BlogPostPage({ post, page }: BlogPostPageProps) {
  const ratingLabel = formatRating(post.rating);

  return (
    <div className="min-h-screen bg-background">
      {/* Back link */}
      <div className="mx-auto max-w-4xl p-4">
        <Link
          href={paths.blog.getHref()}
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="mr-2 size-4" />
          Back to Blog
        </Link>
      </div>

      {/* Post header */}
      <header className="mx-auto max-w-4xl px-4 pb-4">
        {(post.category || ratingLabel) && (
          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            {post.category && (
              <span className="rounded-full bg-primary/10 px-3 py-1 text-primary">
                {post.category}
              </span>
            )}
            {ratingLabel && (
              <span className="inline-flex items-center gap-1 rounded-full bg-muted px-3 py-1 font-medium text-foreground">
                <Star className="size-4 text-amber-400" />
                {ratingLabel}/5
              </span>
            )}
          </div>
        )}
        {/* Meta info */}
        <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          {post.publishedDate && (
            <span className="flex items-center gap-1">
              <Calendar className="size-4" />
              {dayjs(post.publishedDate).format('MMMM D, YYYY')}
            </span>
          )}
          {post.readTime && (
            <span className="flex items-center gap-1">
              <Clock className="size-4" />
              {post.readTime} min read
            </span>
          )}
        </div>

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-muted px-3 py-1 text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>

      {/* Notion content */}
      {page ? (
        <ClientSideNotionRenderer recordMap={page} />
      ) : (
        <div className="mx-auto max-w-4xl px-4 py-8 text-center text-muted-foreground">
          Content not available
        </div>
      )}
    </div>
  );
}
