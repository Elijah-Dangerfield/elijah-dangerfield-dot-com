// Notion configuration for blog posts
export const blogDatabaseId: string = process.env.NOTION_BLOG_DATABASE_ID || '';
export const notionKey: string = process.env.NOTION_TOKEN || '';

export const isDev: boolean =
  process.env.NODE_ENV === 'development' || !process.env.NODE_ENV;

export const port: number = Number(process.env.PORT) || 3000;

// Whether to use the official Notion API
export const useOfficialNotionAPI: boolean = !!process.env.NOTION_TOKEN;

// Preview images can be expensive to generate
export const previewImagesEnabled: boolean = false;
