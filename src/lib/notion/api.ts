import { ExtendedRecordMap } from 'notion-types';

import { blogDatabaseId } from '@/lib/notion/config';
import {
  getStringProperty,
  getStringsProperty,
  getDateProperty,
  getUrlProperty,
  getNumberProperty,
} from '@/lib/notion/utils';

import { notionAPI, notionPrivateAPI } from './client';

// Blog Post types
export type BlogPostStatus = 'Draft' | 'Published';

export interface BlogPost {
  id: string;
  title: string;
  description: string;
  slug: string;
  tags: string[];
  status: BlogPostStatus;
  publishedDate?: string;
  updatedDate: string;
  readTime?: number | null;
  imageUrl: string;
  category?: string | null;
  rating?: number | null;
}

export interface BlogPostsResponse {
  items: BlogPost[];
  hasMore: boolean;
  nextCursor?: string;
}

export interface BlogPostResponse {
  post?: BlogPost;
  page?: ExtendedRecordMap;
  error?: string;
}

interface PageResponse {
  page?: ExtendedRecordMap;
  error?: string;
}

// Fetch a single page by ID
export const getPageByPageId = async (
  pageId: string,
): Promise<PageResponse> => {
  try {
    const recordMap = await notionPrivateAPI.getPage(pageId);
    return {
      page: recordMap,
    };
  } catch (error) {
    console.error(`Error fetching page with ID ${pageId}:`, error);
    return {
      error: 'Failed to fetch page',
    };
  }
};

// Get all published blog posts
export const getPublishedBlogPosts = async ({
  pageSize = 10,
  startCursor,
}: {
  pageSize?: number;
  startCursor?: string;
}): Promise<BlogPostsResponse> => {
  try {
    if (!blogDatabaseId) {
      console.warn('No blog database ID configured');
      return { items: [], hasMore: false };
    }

    const response = await notionAPI.databases.query({
      database_id: blogDatabaseId,
      start_cursor: startCursor,
      page_size: pageSize,
      filter: {
        property: 'Status',
        select: {
          equals: 'Published',
        },
      },
      sorts: [
        {
          property: 'Published Date',
          direction: 'descending',
        },
      ],
    });

    const posts = response.results
      .map((page) => {
        if (!('properties' in page)) return null;

        const rawPublishedDate = getDateProperty(page, 'Published Date');
        const publishedDate = Array.isArray(rawPublishedDate)
          ? rawPublishedDate[0]
          : rawPublishedDate;
        const rawUpdatedDate = getDateProperty(page, 'Updated Date');
        const updatedDate = Array.isArray(rawUpdatedDate)
          ? rawUpdatedDate[0]
          : rawUpdatedDate;

        return {
          id: page.id,
          title: getStringProperty(page, 'Title') || '',
          description: getStringProperty(page, 'Description') || '',
          slug: getStringProperty(page, 'Slug') || page.id,
          tags: getStringsProperty(page, 'Tags')?.split(', ') || [],
          status:
            (getStringProperty(page, 'Status') as BlogPostStatus) || 'Draft',
          ...(publishedDate && { publishedDate }),
          updatedDate: updatedDate || new Date().toISOString(),
          imageUrl: getUrlProperty(page, 'Image') || '',
          category: getStringProperty(page, 'Category'),
          rating: getNumberProperty(page, 'Rating (out of 5)'),
        } satisfies BlogPost;
      })
      .filter((post) => post !== null);

    return {
      items: posts,
      hasMore: response.has_more,
      nextCursor: response.next_cursor ?? undefined,
    };
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return { items: [], hasMore: false };
  }
};

// Get a blog post by slug
export const getBlogPostBySlug = async (
  slug: string,
): Promise<BlogPostResponse> => {
  try {
    if (!blogDatabaseId) {
      return { error: 'No blog database configured' };
    }

    // Query by slug - try rich_text first, then formula
    let response = await notionAPI.databases.query({
      database_id: blogDatabaseId,
      filter: {
        property: 'Slug',
        rich_text: {
          equals: slug,
        },
      },
      page_size: 1,
    });

    // If not found with rich_text, try formula type
    if (!response.results.length) {
      response = await notionAPI.databases.query({
        database_id: blogDatabaseId,
        filter: {
          property: 'Slug',
          formula: {
            string: {
              equals: slug,
            },
          },
        },
        page_size: 1,
      });
    }

    if (!response.results.length) {
      console.log(`[getBlogPostBySlug] No post found for slug: ${slug}`);
      return { error: 'Post not found' };
    }

    const result = response.results[0];
    if (!('properties' in result)) {
      return { error: 'Invalid post data' };
    }

    const post: BlogPost = {
      id: result.id,
      title: getStringProperty(result, 'Title') || '',
      description: getStringProperty(result, 'Description') || '',
      slug: getStringProperty(result, 'Slug') || result.id,
      tags: getStringsProperty(result, 'Tags')?.split(', ') || [],
      status:
        (getStringProperty(result, 'Status') as BlogPostStatus) || 'Draft',
      publishedDate: getDateProperty(result, 'Published Date') as
        | string
        | undefined,
      updatedDate:
        (getDateProperty(result, 'Updated Date') as string) ||
        new Date().toISOString(),
      imageUrl: getUrlProperty(result, 'Image') || '',
      category: getStringProperty(result, 'Category'),
      rating: getNumberProperty(result, 'Rating (out of 5)'),
    };

    const pageContent = await getPageByPageId(post.id);

    return {
      post,
      page: pageContent.page,
    };
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return {
      error: `Failed to fetch post: ${error instanceof Error ? error.message : 'Unknown error'}`,
    };
  }
};

// Get all blog post slugs for static generation
export async function getAllBlogSlugs(): Promise<string[]> {
  try {
    if (!blogDatabaseId) {
      return [];
    }

    const slugs: string[] = [];
    let hasMore = true;
    let startCursor: string | undefined = undefined;

    while (hasMore) {
      const response = await notionAPI.databases.query({
        database_id: blogDatabaseId,
        start_cursor: startCursor,
        filter: {
          and: [
            {
              property: 'Status',
              select: {
                equals: 'Published',
              },
            },
            {
              property: 'Slug',
              formula: {
                string: {
                  is_not_empty: true,
                },
              },
            },
          ],
        },
        page_size: 100,
      });

      const currentSlugs = response.results
        .map((page) => {
          if (!('properties' in page)) return null;
          return getStringProperty(page, 'Slug');
        })
        .filter((slug): slug is string => !!slug);

      slugs.push(...currentSlugs);
      hasMore = response.has_more;
      startCursor = response.next_cursor ?? undefined;
    }

    return slugs;
  } catch (error) {
    console.error('Error fetching blog slugs:', error);
    return [];
  }
}
