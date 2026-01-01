import { Client } from '@notionhq/client';
import { NotionAPI } from 'notion-client';
import { NotionCompatAPI } from 'notion-compat';

import { notionKey } from '@/lib/notion/config';

const notionClient = new NotionAPI({
  activeUser: process.env.NOTION_ACTIVE_USER,
  authToken: process.env.NOTION_TOKEN_V2,
});

const notionCompatClient = new NotionCompatAPI(new Client({ auth: notionKey }));

// Use the compat client by default for better API support
export const notionPrivateAPI = notionKey ? notionCompatClient : notionClient;

export const notionAPI: Client = new Client({ auth: notionKey });
