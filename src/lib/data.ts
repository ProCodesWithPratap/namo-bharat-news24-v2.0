export const featuredStory = {
  headline: 'Lead headline placeholder for top national story',
  deck: 'Use this area for a strong summary that makes the homepage feel like a real newsroom front page.',
  category: 'National',
  author: 'Editorial Desk',
  publishedAt: 'March 14, 2026',
  slug: 'lead-headline-placeholder'
}

export const latestStories = Array.from({ length: 8 }).map((_, index) => ({
  id: index + 1,
  headline: `Latest news item ${index + 1}`,
  category: ['Politics', 'Business', 'Sports', 'Technology'][index % 4],
  time: `${index + 1}h ago`,
  slug: `latest-news-item-${index + 1}`
}))

export const trendingTopics = ['Breaking News', 'West Bengal', 'Election', 'Jobs', 'Cricket', 'Education']
