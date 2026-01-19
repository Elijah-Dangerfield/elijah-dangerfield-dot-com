'use client';

import { Briefcase, Code, Download, GraduationCap, Rocket } from 'lucide-react';
import Image from 'next/image';

import { Button } from '@/components/ui/button';

interface Experience {
  title: string;
  company: string;
  location: string;
  period: string;
  description: string[];
  technologies?: string[];
  logo?: {
    src: string;
    alt: string;
  };
}

interface Education {
  degree: string;
  school: string;
  location: string;
  period: string;
  details?: string;
}

interface PersonalProject {
  name: string;
  description: string;
  details: string[];
  technologies: string[];
  logo?: {
    src: string;
    alt: string;
  };
  link?: {
    href: string;
    label: string;
    badgeSrc?: string;
  };
}

const experiences: Experience[] = [
  {
    title: 'Senior Android Engineer',
    company: 'Hinge',
    location: 'Hybrid, NYC',
    period: '2023 - Current',
    description: [
      'Proposed and led domain model separation as a member of the Android Architecture Council, improving codebase maintainability and scalability',
      'Contributed to achieving a 0.1% crash rate by reducing the highest-impact error by 99%',
      'Led multiple 100% Compose features, managing cross-platform coordination, resource planning, and implementation',
      'Introduced OpenTelemetry and modern observability practices to the Android codebase, allowing for a 95% purchase success rate on the monetization team',
    ],
    technologies: ['Kotlin', 'Jetpack Compose', 'OpenTelemetry', 'MVI'],
    logo: {
      src: '/logos/hinge-logo.webp',
      alt: 'Hinge logo',
    },
  },
  {
    title: 'Senior Android Engineer',
    company: 'Disney+',
    location: 'Remote',
    period: '2021 - 2023',
    description: [
      'Spearheaded the introduction of Coroutines and Flow into the legacy RxJava codebase as part of the Architecture Guild',
      'Developed limited-time promotional offers for Google Play and Amazon stores',
      'Played a key role in modularizing and unifying the codebases of Hulu, Disney+, and Star+',
    ],
    technologies: ['Kotlin', 'Coroutines', 'Flow', 'RxJava'],
    logo: {
      src: '/logos/disney+-logo.webp',
      alt: 'Disney+ logo',
    },
  },
  {
    title: 'Android Engineer',
    company: 'Hulu',
    location: 'Remote',
    period: '2021 - 2023',
    description: [
      'Implemented Picture-in-Picture and offline content viewing capabilities for the Hulu player',
      'Led the account unification project, enabling a single identity across multiple streaming services',
      'Contributed to app modularization, improving codebase maintainability and developer efficiency',
    ],
    technologies: ['Kotlin', 'Android SDK', 'ExoPlayer'],
    logo: {
      src: '/logos/hulu-logo.webp',
      alt: 'Hulu logo',
    },
  },
  {
    title: 'Android Engineer',
    company: 'iHeartRadio',
    location: 'Remote',
    period: '2020 - 2021',
    description: [
      'Developed multiple features under the podcast feature set utilizing MVI & RxJava',
      'Drove innovation through a hackathon-winning feature that allowed for collaborative playlists',
      'Initiated transition to Groupie for optimized RecyclerView implementations',
    ],
    technologies: ['Kotlin', 'MVI', 'RxJava', 'Groupie'],
    logo: {
      src: '/logos/iheartRadio-logo.webp',
      alt: 'iHeartRadio logo',
    },
  },
  {
    title: 'Android Engineer',
    company: 'Takl Home Services (Startup)',
    location: 'Nashville, TN',
    period: '2019 - 2020',
    description: [
      'Worked across Android, iOS, and React web platforms in a fast-paced startup environment for a user base of ~500k monthly active users',
      'Contributed to a greenfield web project utilizing React and TypeScript',
      'Engineered transition from file storage to Room database using a custom migration strategy',
    ],
    technologies: ['Android', 'iOS', 'React', 'TypeScript', 'Room'],
    logo: {
      src: '/logos/takl-logo.webp',
      alt: 'Takl logo',
    },
  },
  {
    title: 'Junior Mobile Developer',
    company: 'MT Mobile',
    location: 'Tennessee',
    period: '2018 - 2020',
    description: [
      'Worked with a small team of Android and iOS developers to maintain and improve the MT Mobile application for 30,000+ users',
      'Led the redesign and re-architecting of the Android application to utilize modern Android tools, including LiveData, Room, and view models under an MVVM architecture',
    ],
    technologies: ['Android', 'Kotlin', 'MVVM', 'LiveData', 'Room'],
    logo: {
      src: '/logos/mt-logo.webp',
      alt: 'MT Mobile logo',
    },
  },
];

const education: Education[] = [
  {
    degree: 'B.S. Computer Science',
    school: 'Middle Tennessee State University',
    location: 'Tennessee',
    period: '',
    details: 'Minor: Mathematics',
  },
];

const personalProjects: PersonalProject[] = [
  {
    name: 'Odd One Out',
    description: 'Solo project with 50,000+ users',
    details: [
      '100% Compose Android family-friendly game utilizing Firebase backend, allowing for cross-platform communication with the iOS sibling application',
      'In-house CI/CD system leveraging GitHub actions to ensure code and product quality, and allow for click releases',
    ],
    technologies: [
      'Compose',
      'Kotlin',
      'Coroutines',
      'Flow',
      'Hilt',
      'Gradle convention plugins',
      'GitHub Actions',
      'MVI',
    ],
    logo: {
      src: '/logos/odd-one-out-logo.webp',
      alt: 'Odd One Out logo',
    },
    link: {
      href: 'https://play.google.com/store/apps/details?id=com.dangerfield.spyfall.free',
      label: 'View on Google Play',
      badgeSrc: '/badges/google-play-badge.png',
    },
  },
];

const skills = {
  languages: ['Kotlin', 'Swift', 'TypeScript', 'JavaScript', 'Java'],
  frameworks: ['Jetpack Compose', 'Android SDK', 'React', 'Next.js', 'iOS'],
  tools: ['Git', 'Firebase', 'CI/CD', 'GitHub Actions', 'OpenTelemetry'],
};

export default function ExperiencePage() {
  const handleDownloadResume = () => {
    window.open('/Elijah_Dangerfield_resume.pdf', '_blank');
  };

  return (
    <div className="min-h-screen bg-background px-4 py-12">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-12 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-3xl font-bold">Experience</h1>
            <p className="mt-2 text-muted-foreground">
              The places I&apos;ve worked and things I&apos;ve built
            </p>
          </div>
          <Button
            onClick={handleDownloadResume}
            icon={<Download className="size-4" />}
          >
            Download Resume
          </Button>
        </div>

        {/* Work Experience */}
        <section className="mb-12">
          <div className="mb-6 flex items-center gap-2">
            <Briefcase className="size-5" />
            <h2 className="text-xl font-semibold">Work Experience</h2>
          </div>
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className="relative border-l-2 border-muted pl-6"
              >
                <div className="absolute left-[-9px] top-0 size-4 rounded-full border-2 border-primary bg-background" />
                <div className="mb-1 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-3">
                    {exp.logo && (
                      <span className="flex size-12 items-center justify-center rounded-md border bg-card p-2">
                        <Image
                          src={exp.logo.src}
                          alt={exp.logo.alt}
                          width={40}
                          height={40}
                          className="object-contain"
                        />
                      </span>
                    )}
                    <div>
                      <h3 className="font-semibold">{exp.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {exp.company} • {exp.location}
                      </p>
                    </div>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {exp.period}
                  </span>
                </div>
                <ul className="mt-3 space-y-1">
                  {exp.description.map((item, i) => (
                    <li
                      key={i}
                      className="text-sm text-muted-foreground before:mr-2 before:content-['•']"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
                {exp.technologies && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full bg-muted px-2 py-1 text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Education */}
        <section className="mb-12">
          <div className="mb-6 flex items-center gap-2">
            <GraduationCap className="size-5" />
            <h2 className="text-xl font-semibold">Education</h2>
          </div>
          <div className="space-y-6">
            {education.map((edu, index) => (
              <div key={index} className="rounded-lg border bg-card p-4">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                  <h3 className="font-semibold">{edu.degree}</h3>
                  <span className="text-sm text-muted-foreground">
                    {edu.period}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {edu.school} • {edu.location}
                </p>
                {edu.details && (
                  <p className="mt-2 text-sm text-muted-foreground">
                    {edu.details}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Personal Projects */}
        <section className="mb-12">
          <div className="mb-6 flex items-center gap-2">
            <Rocket className="size-5" />
            <h2 className="text-xl font-semibold">Personal Projects</h2>
          </div>
          <div className="space-y-6">
            {personalProjects.map((project, index) => (
              <div key={index} className="rounded-lg border bg-card p-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-3">
                    {project.logo && (
                      <span className="flex size-12 items-center justify-center rounded-md border bg-background p-2">
                        <Image
                          src={project.logo.src}
                          alt={project.logo.alt}
                          width={40}
                          height={40}
                          className="object-contain"
                        />
                      </span>
                    )}
                    <div>
                      <h3 className="font-semibold">{project.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {project.description}
                      </p>
                    </div>
                  </div>
                </div>
                <ul className="mt-3 space-y-1">
                  {project.details.map((detail, i) => (
                    <li
                      key={i}
                      className="text-sm text-muted-foreground before:mr-2 before:content-['•']"
                    >
                      {detail}
                    </li>
                  ))}
                </ul>
                {project.link && project.link.badgeSrc && (
                  <a
                    href={project.link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex"
                  >
                    <Image
                      src={project.link.badgeSrc}
                      alt={project.link.label}
                      width={180}
                      height={60}
                      className="h-auto w-44"
                    />
                  </a>
                )}
                {project.link && !project.link.badgeSrc && (
                  <Button asChild variant="outline" size="sm" className="mt-4">
                    <a
                      href={project.link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {project.link.label}
                    </a>
                  </Button>
                )}
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full bg-muted px-2 py-1 text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section>
          <div className="mb-6 flex items-center gap-2">
            <Code className="size-5" />
            <h2 className="text-xl font-semibold">Skills</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-3">
            <div className="rounded-lg border bg-card p-4">
              <h3 className="mb-3 font-medium">Languages</h3>
              <div className="flex flex-wrap gap-2">
                {skills.languages.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full bg-primary/10 px-2 py-1 text-xs text-primary"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div className="rounded-lg border bg-card p-4">
              <h3 className="mb-3 font-medium">Frameworks</h3>
              <div className="flex flex-wrap gap-2">
                {skills.frameworks.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full bg-primary/10 px-2 py-1 text-xs text-primary"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div className="rounded-lg border bg-card p-4">
              <h3 className="mb-3 font-medium">Tools & Platforms</h3>
              <div className="flex flex-wrap gap-2">
                {skills.tools.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full bg-primary/10 px-2 py-1 text-xs text-primary"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
