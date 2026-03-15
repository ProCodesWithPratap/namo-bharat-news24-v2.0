import { runtimeEnv } from '@/lib/env'

export const siteConfig = {
  name: 'Namo Bharat News 24',
  description: 'Fast, production-ready digital news platform starter.',
  baseUrl: runtimeEnv.siteUrl,
  nav: [
    'National',
    'State',
    'Politics',
    'Business',
    'Sports',
    'Entertainment',
    'Technology',
    'Education'
  ]
}
