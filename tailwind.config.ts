import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/app/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          red: '#B31217',
          gold: '#D4AF37',
          ink: '#111827',
          soft: '#F8F5F0'
        }
      }
    }
  },
  plugins: []
}

export default config
