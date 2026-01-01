'use client';

import {
  Github,
  Linkedin,
  Mail,
  Twitter,
  MapPin,
  ExternalLink,
  Coffee,
} from 'lucide-react';

import { Button } from '@/components/ui/button';

interface SocialLink {
  name: string;
  href: string;
  icon: React.ReactNode;
  username: string;
}

const socialLinks: SocialLink[] = [
  {
    name: 'Email',
    href: 'mailto:elijahdangerfield111@gmail.com',
    icon: <Mail className="size-5" />,
    username: 'elijahdangerfield111@gmail.com',
  },
  {
    name: 'GitHub',
    href: 'https://github.com/elijah-dangerfield',
    icon: <Github className="size-5" />,
    username: '@elijah-dangerfield',
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/in/elijahdangerfield',
    icon: <Linkedin className="size-5" />,
    username: 'elijahdangerfield',
  },
  {
    name: 'Twitter',
    href: '#',
    icon: <Twitter className="size-5" />,
    username: "JK. I don't have one of those.",
  },
  {
    name: 'Buy Me a Coffee',
    href: 'https://www.buymeacoffee.com/elidangerfield',
    icon: <Coffee className="size-5" />,
    username: 'Support future experiments',
  },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background px-4 py-12">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-3xl font-bold">Get in Touch</h1>
          <p className="mt-4 text-muted-foreground">
            Want to chat about a project, an idea, or just say hi? I&apos;m
            happy to hear from you.
          </p>
        </div>

        {/* Contact Methods */}
        <div className="space-y-4">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target={link.href.startsWith('mailto') ? undefined : '_blank'}
              rel={
                link.href.startsWith('mailto')
                  ? undefined
                  : 'noopener noreferrer'
              }
              className="group flex items-center justify-between rounded-lg border bg-card p-4 transition-colors hover:border-primary/50 hover:bg-muted/50"
            >
              <div className="flex items-center gap-4">
                <div className="flex size-10 items-center justify-center rounded-full bg-muted">
                  {link.icon}
                </div>
                <div>
                  <h3 className="font-medium">{link.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {link.username}
                  </p>
                </div>
              </div>
              <ExternalLink className="size-4 text-muted-foreground transition-colors group-hover:text-foreground" />
            </a>
          ))}
        </div>

        {/* Location */}
        <div className="mt-12 rounded-lg border bg-card p-6 text-center">
          <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-muted">
            <MapPin className="size-6" />
          </div>
          <h3 className="font-medium">Location</h3>
          <p className="mt-1 text-muted-foreground">Currently: New York City</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Open to remote work
          </p>
        </div>

        {/* Direct Email CTA */}
        <div className="mt-12 text-center">
          <p className="mb-4 text-muted-foreground">Email works best:</p>
          <a href="mailto:elijahdangerfield111@gmail.com">
            <Button size="lg">
              <span className="inline-flex items-center gap-2">
                <Mail className="size-4" />
                <span>Send Email</span>
              </span>
            </Button>
          </a>
        </div>
        {/* Response Time Note */}
        <p className="mt-8 text-center text-sm text-muted-foreground">
          I usually get back within a day or two.
        </p>
      </div>
    </div>
  );
}
