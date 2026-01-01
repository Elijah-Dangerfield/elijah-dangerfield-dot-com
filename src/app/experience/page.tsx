import { Metadata } from 'next';

import ExperiencePage from '@/features/experience/components/experience-page';

export const metadata: Metadata = {
  title: 'Experience - Elijah Dangerfield',
  description: 'The places I have worked and things I have built',
  openGraph: {
    title: 'Experience - Elijah Dangerfield',
    description: 'The places I have worked and things I have built',
    type: 'website',
  },
};

export default function Experience() {
  return <ExperiencePage />;
}
