import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
dayjs.extend(timezone);

interface NotionProperty {
  type: string;
  [key: string]: any;
}

interface NotionDatabaseEntry {
  properties: Record<string, NotionProperty>;
}

export const getStringsProperty = (
  databaseEntry: NotionDatabaseEntry | null,
  key: string,
): string | null => {
  if (!databaseEntry?.properties || !key) {
    return null;
  }

  const value = databaseEntry.properties[key];
  if (!value) {
    return null;
  }

  switch (value.type) {
    case 'multi_select':
      return (
        value.multi_select
          ?.map((opt: { name: string }) => opt.name)
          .join(', ') || null
      );
    default:
      return null;
  }
};

export const getStringProperty = (
  databaseEntry: NotionDatabaseEntry | null,
  key: string,
): string | null => {
  if (!databaseEntry?.properties || !key) {
    return null;
  }

  const value = databaseEntry.properties[key];
  if (!value) {
    return null;
  }

  switch (value.type) {
    case 'number':
      return value.number?.toString() || null;
    case 'url':
      return value.url || null;
    case 'select':
      return value.select?.name || null;
    case 'multi_select':
      return (
        value.multi_select
          ?.map((opt: { name: string }) => opt.name)
          .join(', ') || null
      );
    case 'date':
      return value.date?.start || null;
    case 'formula':
      return value.formula?.string || null;
    case 'title':
      return value.title?.[0]?.plain_text || null;
    case 'rich_text':
      return value.rich_text?.[0]?.plain_text || null;
    default:
      return null;
  }
};

export const getUrlProperty = (
  databaseEntry: NotionDatabaseEntry | null,
  key: string,
): string | null => {
  if (!databaseEntry?.properties || !key) {
    return null;
  }

  const value = databaseEntry.properties[key];
  if (!value) {
    return null;
  }

  return value.url || null;
};

export const getNumberProperty = (
  databaseEntry: NotionDatabaseEntry | null,
  key: string,
): number | null => {
  if (!databaseEntry?.properties || !key) {
    return null;
  }

  const value = databaseEntry.properties[key];
  if (!value || value.type !== 'number') {
    return null;
  }

  return value.number;
};

export const getDateProperty = (
  databaseEntry: NotionDatabaseEntry,
  key: string,
): string | [string, string] | undefined => {
  if (!('properties' in databaseEntry)) {
    return undefined;
  }

  const value = databaseEntry.properties[key];

  switch (value.type) {
    case 'date':
      if (!value.date) return undefined;
      if (!value.date.end)
        return dayjs
          .tz(value.date.start, value.date.time_zone || 'UTC')
          .toString();
      return [
        dayjs.tz(value.date.start, value.date.time_zone || 'UTC').toString(),
        dayjs.tz(value.date.end, value.date.time_zone || 'UTC').toString(),
      ];
    case 'last_edited_time':
      return dayjs.tz(value.last_edited_time, 'UTC').toString();
    case 'created_time':
      return dayjs.tz(value.created_time, 'UTC').toString();
    default:
      return undefined;
  }
};

export const getBooleanProperty = (
  databaseEntry: NotionDatabaseEntry,
  key: string,
): boolean | undefined => {
  if (!('properties' in databaseEntry)) {
    return undefined;
  }

  const value = databaseEntry.properties[key];

  switch (value.type) {
    case 'checkbox':
      return value.checkbox;
    default:
      return undefined;
  }
};
