import { ArrowLeft } from 'lucide-react';

export default function BlogPostLoading() {
  return (
    <div className="min-h-screen bg-background">
      {/* Back link */}
      <div className="mx-auto max-w-4xl px-4 py-8">
        <div className="inline-flex items-center text-sm text-muted-foreground">
          <ArrowLeft className="mr-2 size-4" />
          Back to Blog
        </div>
      </div>

      {/* Post header skeleton */}
      <header className="mx-auto max-w-4xl px-4 pb-8">
        <div className="h-10 w-3/4 animate-pulse rounded bg-muted" />
        <div className="mt-4 h-6 w-full animate-pulse rounded bg-muted" />
        <div className="mt-2 h-6 w-2/3 animate-pulse rounded bg-muted" />

        {/* Meta info skeleton */}
        <div className="mt-6 flex gap-4">
          <div className="h-4 w-32 animate-pulse rounded bg-muted" />
          <div className="h-4 w-24 animate-pulse rounded bg-muted" />
        </div>

        {/* Tags skeleton */}
        <div className="mt-4 flex gap-2">
          <div className="h-6 w-16 animate-pulse rounded-full bg-muted" />
          <div className="h-6 w-20 animate-pulse rounded-full bg-muted" />
          <div className="h-6 w-14 animate-pulse rounded-full bg-muted" />
        </div>
      </header>

      {/* Content skeleton */}
      <div className="mx-auto max-w-4xl px-4 py-8">
        <div className="space-y-4">
          <div className="h-4 w-full animate-pulse rounded bg-muted" />
          <div className="h-4 w-full animate-pulse rounded bg-muted" />
          <div className="h-4 w-5/6 animate-pulse rounded bg-muted" />
          <div className="h-4 w-full animate-pulse rounded bg-muted" />
          <div className="h-4 w-4/5 animate-pulse rounded bg-muted" />
          <div className="mt-6 h-64 w-full animate-pulse rounded bg-muted" />
          <div className="h-4 w-full animate-pulse rounded bg-muted" />
          <div className="h-4 w-full animate-pulse rounded bg-muted" />
          <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
        </div>
      </div>
    </div>
  );
}
