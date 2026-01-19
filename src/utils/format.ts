import { default as dayjs } from 'dayjs';

export const formatDate = (date: number) =>
  dayjs(date).format('MMMM D, YYYY h:mm A');

export const formatRating = (rating?: number | null) => {
  if (typeof rating !== 'number') {
    return null;
  }
  return Number.isInteger(rating) ? rating.toString() : rating.toFixed(1);
};
