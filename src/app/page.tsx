import { ArrowRight, Github, Linkedin, Mail, Twitter } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { paths } from '@/config/paths';

const HomePage = () => {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="flex flex-1 flex-col items-center justify-center px-4 py-20 text-center">
        <div className="mx-auto max-w-3xl space-y-6">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            Hey, I&apos;m{' '}
            <span className="text-primary">Elijah Dangerfield</span>
          </h1>
          <p className="text-lg text-muted-foreground sm:text-xl">
            I like to make things. Android apps, iOS apps, websites, the
            occasional short story. Sometimes I fall down rabbit holes and who
            knows what comes out the other side.
          </p>

          <div className="rounded-2xl border bg-background/80 p-6 shadow-sm">
            <div className="flex flex-col items-center gap-4 sm:flex-row">
              <Image
                src="/picture-of-me.webp"
                alt="Hand drawn portrait of Elijah Dangerfield"
                width={240}
                height={240}
                className="h-auto w-40 rounded-xl border bg-muted object-cover sm:w-48"
                priority
              />
              <p className="text-left text-base text-muted-foreground">
                In lieu of a photo I think actually captures my vibe,
                here&apos;s some hand drawn art.
              </p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <Link href={paths.experience.getHref()}>
              <Button size="lg">
                <span className="inline-flex items-center gap-2">
                  <span>View Experience</span>
                  <ArrowRight className="size-4" />
                </span>
              </Button>
            </Link>
            <Link href={paths.blog.getHref()}>
              <Button variant="outline" size="lg">
                See What I Write About
              </Button>
            </Link>
          </div>

          {/* Social Links */}
          <div className="flex justify-center gap-6 pt-8">
            <a
              href="https://github.com/elijah-dangerfield"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              <Github className="size-6" />
              <span className="sr-only">GitHub</span>
            </a>
            <a
              href="https://linkedin.com/in/elijahdangerfield"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              <Linkedin className="size-6" />
              <span className="sr-only">LinkedIn</span>
            </a>
            <span
              className="relative cursor-not-allowed text-muted-foreground/50"
              title="JK. I don't have one of those."
            >
              <Twitter className="size-6" />
              <span className="sr-only">
                Twitter (JK. I don&apos;t have one)
              </span>
            </span>
            <a
              href="mailto:elijahdangerfield111@gmail.com"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              <Mail className="size-6" />
              <span className="sr-only">Email</span>
            </a>
          </div>
        </div>
      </section>

      {/* Quick About Section */}
      <section className="border-t bg-muted/30 px-4 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-semibold">What I Build</h2>
          <p className="mt-4 text-muted-foreground">
            I spend most of my days making apps that people actually use. Been
            doing this professionally for a while now across mobile and web.
            When I&apos;m not coding, I&apos;m probably trying to write
            something or learning about whatever caught my attention that week.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-lg border bg-background p-4">
              <h3 className="font-medium">Mobile Apps</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Android and iOS, from scratch to store
              </p>
            </div>
            <div className="rounded-lg border bg-background p-4">
              <h3 className="font-medium">Web Stuff</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                React, Next.js, TypeScript
              </p>
            </div>
            <div className="rounded-lg border bg-background p-4">
              <h3 className="font-medium">Other Things</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Writing, learning, rabbit holes
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
