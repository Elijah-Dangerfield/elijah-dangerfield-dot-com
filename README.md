# Elijah Dangerfield - Personal Website

A personal website built with Next.js, featuring a blog powered by Notion as a CMS.

## Features

- **Landing Page** - Simple, clean introduction
- **Experience** - Professional resume with downloadable PDF option
- **Blog** - Articles powered by Notion as a headless CMS
- **Contact** - Social links and contact information

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **CMS**: Notion API
- **Deployment**: Vercel (recommended)

## Getting Started

### Prerequisites

- Node.js 20+
- npm, yarn, or pnpm
- A Notion account with an integration

### Setup

1. Clone the repository:

```bash
git clone https://github.com/yourusername/elijah-dangerfield-dot-com.git
cd elijah-dangerfield-dot-com
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Set up environment variables:

```bash
cp .env.example .env
```

4. Configure your Notion integration:
   - Go to [Notion Integrations](https://www.notion.so/my-integrations)
   - Create a new integration
   - Copy the token to `NOTION_TOKEN` in your `.env` file
   - Create a database for blog posts with these properties:
     - Title (title)
     - Description (rich text)
     - Slug (formula or text)
     - Status (select: Draft, Published)
     - Published Date (date)
     - Tags (multi-select)
     - Image (url)
   - Share the database with your integration
   - Copy the database ID to `NOTION_BLOG_DATABASE_ID`

5. Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── blog/              # Blog pages
│   ├── contact/           # Contact page
│   ├── experience/        # Experience/Resume page
│   └── api/               # API routes
├── components/            # Reusable UI components
│   ├── layouts/          # Header, Footer
│   └── ui/               # UI primitives
├── features/             # Feature-based modules
│   ├── blog/
│   ├── contact/
│   └── experience/
├── lib/                  # Utilities and integrations
│   └── notion/           # Notion API integration
└── styles/               # Global styles
```

## Customization

### Update Your Information

1. **Landing Page** (`src/app/page.tsx`): Update your bio and social links
2. **Experience** (`src/features/experience/components/experience-page.tsx`): Add your work history
3. **Contact** (`src/features/contact/components/contact-page.tsx`): Update social links and email

### Add Your Resume

Place your resume PDF at `public/resume.pdf` for the download button to work.

## Deployment

Deploy to Vercel with one click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

Remember to set your environment variables in the Vercel dashboard.

## License

MIT
