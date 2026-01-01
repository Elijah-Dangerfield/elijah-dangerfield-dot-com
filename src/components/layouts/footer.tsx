import Link from 'next/link';

import { paths } from '@/config/paths';

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Elijah Dangerfield. All rights
            reserved.
          </p>
          <nav className="flex gap-4">
            <Link
              href={paths.home.getHref()}
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Home
            </Link>
            <Link
              href={paths.experience.getHref()}
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Experience
            </Link>
            <Link
              href={paths.blog.getHref()}
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Blog
            </Link>
            <Link
              href={paths.contact.getHref()}
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Contact
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
