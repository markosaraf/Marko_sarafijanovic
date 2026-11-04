import { tweetTitles as originalTitles } from '../Why-allow-Tesla-FSD-Supervised/fsd-data'
export { mainTweetIds, threadTweetIds, trafficDeathCount } from '../Why-allow-Tesla-FSD-Supervised/fsd-data'

export const tweetTitles: Record<string, string> = Object.fromEntries(
  Object.entries(originalTitles).map(([id, title]) => [id,
    title.replaceAll('Tesla FSD (Supervised)', 'Tesla Assisted Driving (TAD)')
      .replaceAll('Tesla (FSD Supervised)', 'Tesla Assisted Driving (TAD)')
  ])
)
