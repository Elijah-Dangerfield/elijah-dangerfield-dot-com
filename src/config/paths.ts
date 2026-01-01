export const paths = {
  home: {
    getHref: () => '/',
  },

  experience: {
    getHref: () => '/experience',
  },

  blog: {
    getHref: () => '/blog',
    post: {
      getHref: (slug: string) => `/blog/${slug}`,
    },
  },

  contact: {
    getHref: () => '/contact',
  },
} as const;
