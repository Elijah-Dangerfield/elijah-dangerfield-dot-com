import { Metadata } from 'next';

import ContactPage from '@/features/contact/components/contact-page';

export const metadata: Metadata = {
  title: 'Contact - Elijah Dangerfield',
  description: 'Get in touch with Elijah Dangerfield',
  openGraph: {
    title: 'Contact - Elijah Dangerfield',
    description: 'Get in touch with Elijah Dangerfield',
    type: 'website',
  },
};

export default function Contact() {
  return <ContactPage />;
}
