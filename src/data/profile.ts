import { siteConfig } from '@/config/site'

export const profile = {
  name: siteConfig.owner,
  title: siteConfig.title,
  tagline: siteConfig.tagline,
  location: siteConfig.location,
  roles: [
    'Final Year B.Tech Student',
    'Full Stack Developer',
    'Data Science Enthusiast',
    'AI & Machine Learning Explorer',
    'Research-Oriented Developer',
  ],
  about:
    'Final Year B.Tech student passionate about full stack development, data science, artificial intelligence, cybersecurity, and research.',
} as const
