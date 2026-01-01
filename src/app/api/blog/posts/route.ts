import { NextResponse } from 'next/server';

import { getPublishedBlogPosts } from '@/lib/notion/api';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const pageSize = Number(searchParams.get('pageSize')) || 10;
  const cursor = searchParams.get('cursor') || undefined;

  try {
    const posts = await getPublishedBlogPosts({
      pageSize,
      startCursor: cursor,
    });

    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog posts' },
      { status: 500 },
    );
  }
}
