import * as z from 'zod';
import 'dotenv/config';

const createEnv = () => {
  const EnvSchema = z.object({
    APP_URL: z.string().optional().default('http://localhost:3000'),
    API_URL: z.string().optional().default('http://localhost:3000/api'),
    ENABLE_API_MOCKING: z.coerce.boolean().optional().default(false),
    // Notion configuration
    NOTION_TOKEN: z.string().optional(),
    NOTION_BLOG_DATABASE_ID: z.string().optional(),
  });

  const envVars = {
    APP_URL: process.env.NEXT_PUBLIC_URL,
    API_URL: process.env.NEXT_PUBLIC_API_URL,
    ENABLE_API_MOCKING: process.env.NEXT_PUBLIC_ENABLE_API_MOCKING,
    NOTION_TOKEN: process.env.NOTION_TOKEN,
    NOTION_BLOG_DATABASE_ID: process.env.NOTION_BLOG_DATABASE_ID,
  };

  const parsedEnv = EnvSchema.safeParse(envVars);

  if (!parsedEnv.success) {
    throw new Error(
      `Invalid env provided.
  The following variables are missing or invalid:
  ${Object.entries(parsedEnv.error.flatten().fieldErrors)
    .map(([k, v]) => `- ${k}: ${v}`)
    .join('\n')}
  `,
    );
  }

  return parsedEnv.data ?? {};
};

export const env = createEnv();
