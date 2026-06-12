'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Car, 
  Zap, 
  Shield, 
  Palette, 
  Lightbulb, 
  Twitter, 
  Linkedin, 
  ExternalLink,
  Instagram,
  Music2,
  GraduationCap,
  Trophy,
  Heart,
  Mail,
  Youtube,
  Music,
  Check,
  X,
  ChevronDown,
  ChevronUp,
  Loader2
} from 'lucide-react'
import Image from 'next/image'
import { toast } from '@/hooks/use-toast'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Card, CardContent } from '@/components/ui/card'

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
}

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

// Social links data
const socialLinks = [
  { 
    name: 'X (Twitter)', 
    icon: Twitter, 
    href: 'https://x.com/MarkoSaraf2004',
    color: 'hover:bg-gray-100'
  },
  { 
    name: 'LinkedIn', 
    icon: Linkedin, 
    href: 'https://ch.linkedin.com/in/marko-sarafijanovic-60707923b',
    color: 'hover:bg-[#0077B5]/10'
  },
  { 
    name: 'Instagram', 
    icon: Instagram, 
    href: 'https://www.instagram.com/markosarafijanovic',
    color: 'hover:bg-[#E4405F]/10'
  },
  { 
    name: 'TikTok', 
    icon: Music2, 
    href: 'https://www.tiktok.com/@markosarafijanovic',
    color: 'hover:bg-black/5'
  },
  { 
    name: 'YouTube', 
    icon: Youtube, 
    href: 'https://www.youtube.com/@MarkoSarafijanovic',
    color: 'hover:bg-[#FF0000]/10'
  },
  { 
    name: 'Spotify', 
    icon: Music, 
    href: 'https://open.spotify.com/user/31j6dwxlvyohzfjxbnqwdqc5ymyq?si=3bc29055c1c24d8b',
    color: 'hover:bg-[#1DB954]/10'
  },
]

// Tesla FSD Tweet URLs
const mainTweetUrls = [
  'https://x.com/MarkoSaraf2004/status/1866970696095306138',
  'https://x.com/MarkoSaraf2004/status/1867317521761693926',
  'https://x.com/MarkoSaraf2004/status/1868020462312239547',
  'https://x.com/MarkoSaraf2004/status/1921978520722354217',
  'https://x.com/MarkoSaraf2004/status/2008929451087683867',
  'https://x.com/MarkoSaraf2004/status/2013680595098427591',
  'https://x.com/MarkoSaraf2004/status/2024470956811374598',
  'https://x.com/MarkoSaraf2004/status/2064426772486128114',
];

// Thread replies for the first tweet
const threadReplyUrls = [
  'https://x.com/MarkoSaraf2004/status/1921978520722354217',
  'https://x.com/MarkoSaraf2004/status/1923646877305614662',
  'https://x.com/MarkoSaraf2004/status/1923647213076467995',
  'https://x.com/MarkoSaraf2004/status/1923647680221217093',
  'https://x.com/MarkoSaraf2004/status/1924727727178879463',
  'https://x.com/MarkoSaraf2004/status/1925287080822735349',
  'https://x.com/MarkoSaraf2004/status/1925940454593368421',
  'https://x.com/MarkoSaraf2004/status/2063727109902635504',
];

// Tweet Card Component
function TweetCard({ 
  tweet, 
  index, 
  isExpanded, 
  onToggle,
  isThreadCard = false 
}: { 
  tweet: TweetData; 
  index: number; 
  isExpanded: boolean; 
  onToggle: () => void;
  isThreadCard?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="w-full"
    >
      <Card 
        className={`overflow-hidden border border-slate-200 hover:border-[#1DA1F2]/50 transition-all duration-300 cursor-pointer bg-white ${
          isThreadCard ? 'shadow-sm' : 'shadow-md hover:shadow-lg'
        }`}
        onClick={!isThreadCard ? onToggle : undefined}
      >
        <CardContent className="p-0">
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#1DA1F2] to-[#0d8bd9] flex items-center justify-center">
                  <Twitter className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-sm text-slate-800">Marko Sarafijanovic</p>
                  <p className="text-xs text-slate-500">@MarkoSaraf2004</p>
                </div>
              </div>
              <span className="text-xs text-slate-400">Tesla FSD</span>
            </div>
            
            <p className="text-sm text-slate-600 mb-3 line-clamp-3">
              {tweet.title || 'Tesla FSD Related Tweet'}
            </p>
            
            {tweet.image && (
              <div className="relative w-full h-40 rounded-lg overflow-hidden mb-3">
                <Image 
                  src={tweet.image} 
                  alt="Tweet media" 
                  fill 
                  className="object-cover"
                />
              </div>
            )}
            
            <a 
              href={tweet.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-[#1DA1F2] hover:underline"
              onClick={(e) => e.stopPropagation()}
            >
              View on X <ExternalLink className="w-3 h-3" />
            </a>
            
            {/* Expand indicator for first card */}
            {index === 0 && !isThreadCard && (
              <div className="flex items-center justify-center mt-3 pt-3 border-t border-slate-100">
                <span className="text-xs text-red-500 font-medium mr-2">Click to see full thread</span>
                {isExpanded ? (
                  <ChevronUp className="w-4 h-4 text-red-500" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-red-500" />
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

// Tweet data type
interface TweetData {
  id: string
  url: string
  title?: string
  image?: string
}

export default function Home() {
  const currentYear = new Date().getFullYear()
  const [isLoading, setIsLoading] = useState(true)
  const [showContent, setShowContent] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [mainTweets, setMainTweets] = useState<TweetData[]>([])
  const [threadTweets, setThreadTweets] = useState<TweetData[]>([])
  const [isFirstCardExpanded, setIsFirstCardExpanded] = useState(false)
  const [isLoadingTweets, setIsLoadingTweets] = useState(false)
  const [isLoadingThread, setIsLoadingThread] = useState(false)

  useEffect(() => {
    // After loading animation completes, start the reveal
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    const contentTimer = setTimeout(() => {
      setShowContent(true)
    }, 1600)

    return () => {
      clearTimeout(timer)
      clearTimeout(contentTimer)
    }
  }, [])

  // Fetch main tweets when modal opens
  const fetchMainTweets = useCallback(async () => {
    if (mainTweets.length > 0) return
    
    setIsLoadingTweets(true)
    try {
      const response = await fetch('/api/tweets?type=main')
      const data = await response.json()
      setMainTweets(data.tweets || [])
    } catch (error) {
      console.error('Failed to fetch tweets:', error)
      // Create placeholder tweets from URLs
      setMainTweets(mainTweetUrls.map(url => ({
        id: url.split('/status/')[1]?.split('?')[0] || '',
        url,
        title: 'Click to view on X',
      })))
    } finally {
      setIsLoadingTweets(false)
    }
  }, [mainTweets.length])

  // Fetch thread tweets when first card is expanded
  const fetchThreadTweets = useCallback(async () => {
    if (threadTweets.length > 0) return
    
    setIsLoadingThread(true)
    try {
      const response = await fetch('/api/tweets?type=thread')
      const data = await response.json()
      setThreadTweets(data.tweets || [])
    } catch (error) {
      console.error('Failed to fetch thread:', error)
      // Create placeholder tweets
      setThreadTweets(threadReplyUrls.map(url => ({
        id: url.split('/status/')[1]?.split('?')[0] || '',
        url,
        title: 'Click to view on X',
      })))
    } finally {
      setIsLoadingThread(false)
    }
  }, [threadTweets.length])

  const handleBannerClick = () => {
    setIsModalOpen(true)
    fetchMainTweets()
  }

  const handleFirstCardToggle = () => {
    const newExpanded = !isFirstCardExpanded
    setIsFirstCardExpanded(newExpanded)
    if (newExpanded) {
      fetchThreadTweets()
    }
  }

  // Handle email button click - copy to clipboard
  const handleEmailClick = (e: React.MouseEvent<HTMLAnchorElement>, email: string) => {
    e.preventDefault()
    
    navigator.clipboard.writeText(email).then(() => {
      toast({
        title: 'Email copied!',
        description: `${email} has been copied to your clipboard.`,
        duration: 3000,
      })
    }).catch(() => {
      // Fallback for browsers that don't support clipboard API
      const textArea = document.createElement('textarea')
      textArea.value = email
      textArea.style.position = 'fixed'
      textArea.style.left = '-999999px'
      document.body.appendChild(textArea)
      textArea.select()
      try {
        document.execCommand('copy')
        toast({
          title: 'Email copied!',
          description: `${email} has been copied to your clipboard.`,
          duration: 3000,
        })
      } catch (err) {
        toast({
          title: 'Failed to copy',
          description: 'Please copy the email manually.',
          variant: 'destructive',
          duration: 3000,
        })
      }
      document.body.removeChild(textArea)
    })
  }

  return (
    <>
      {/* Loading Screen */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 bg-white z-50 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-slate-700 to-slate-900 mx-auto mb-4 flex items-center justify-center">
                <span className="text-white text-2xl font-bold">M</span>
              </div>
              <p className="text-slate-600 text-lg">Loading...</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="min-h-screen bg-white">
        {/* Banner */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full bg-gradient-to-r from-[#1DA1F2] to-[#0d8bd9] text-white py-3 px-4 cursor-pointer hover:from-[#1a91da] hover:to-[#0c7bc7] transition-all duration-300 shadow-md"
          onClick={handleBannerClick}
        >
          <div className="max-w-6xl mx-auto flex items-center justify-center gap-2">
            <span className="text-sm md:text-base font-medium">Why allow Tesla FSD (Supervised)?</span>
            <ChevronDown className="w-4 h-4" />
          </div>
        </motion.div>

        {/* Hero Section */}
        <section className="pt-16 pb-20 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              variants={stagger}
              initial="initial"
              animate={showContent ? "animate" : "initial"}
              className="text-center"
            >
              {/* Profile Image */}
              <motion.div
                variants={fadeInUp}
                className="mb-8"
              >
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-slate-200 to-slate-300 mx-auto overflow-hidden border-4 border-white shadow-lg">
                  <Image 
                    src="/profile.jpg" 
                    alt="Marko Sarafijanovic" 
                    width={128} 
                    height={128}
                    className="w-full h-full object-cover"
                    priority
                  />
                </div>
              </motion.div>

              {/* Name and Title */}
              <motion.div variants={fadeInUp} className="mb-6">
                <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-2">
                  Marko Sarafijanovic
                </h1>
                <p className="text-lg md:text-xl text-slate-600">
                  Software Developer | Problem Solver
                </p>
              </motion.div>

              {/* Social Links */}
              <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-3 mb-10">
                {socialLinks.map((link) => {
                  const Icon = link.icon
                  return (
                    <a
                      key={link.name}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 ${link.color} transition-all duration-300 hover:border-slate-300`}
                    >
                      <Icon className="w-4 h-4 text-slate-600" />
                      <span className="text-sm text-slate-600">{link.name}</span>
                    </a>
                  )
                })}
              </motion.div>

              {/* Email Button */}
              <motion.div variants={fadeInUp}>
                <a
                  href="mailto:marko@example.com"
                  onClick={(e) => handleEmailClick(e, 'marko.sarafijanovic@gmail.com')}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-slate-800 text-white rounded-full hover:bg-slate-700 transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  <Mail className="w-4 h-4" />
                  <span>Contact Me</span>
                </a>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-20 px-4 bg-slate-50">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-slate-800 mb-4">About Me</h2>
              <div className="w-20 h-1 bg-[#1DA1F2] mx-auto"></div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto text-center"
            >
              <p className="text-lg text-slate-600 leading-relaxed mb-6">
                I'm a passionate software developer with a keen interest in building innovative solutions. 
                I specialize in web development and love exploring new technologies.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed">
                When I'm not coding, you can find me exploring the latest in tech, contributing to open source, 
                or sharing knowledge with the developer community.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-slate-800 mb-4">Skills & Interests</h2>
              <div className="w-20 h-1 bg-[#1DA1F2] mx-auto"></div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6"
            >
              {[
                { icon: Car, title: 'Tesla FSD', desc: 'Autonomous Driving' },
                { icon: Zap, title: 'Web Dev', desc: 'Frontend & Backend' },
                { icon: Shield, title: 'Security', desc: 'Best Practices' },
                { icon: Palette, title: 'Design', desc: 'UI/UX' },
              ].map((skill, index) => {
                const Icon = skill.icon
                return (
                  <motion.div
                    key={skill.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="text-center p-6 rounded-xl bg-slate-50 hover:bg-slate-100 transition-all duration-300"
                  >
                    <div className="w-12 h-12 rounded-full bg-[#1DA1F2]/10 flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-6 h-6 text-[#1DA1F2]" />
                    </div>
                    <h3 className="font-semibold text-slate-800 mb-1">{skill.title}</h3>
                    <p className="text-sm text-slate-500">{skill.desc}</p>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-4 bg-slate-900 text-white">
          <div className="max-w-6xl mx-auto text-center">
            <p className="text-slate-400 text-sm">
              © {currentYear} Marko Sarafijanovic. All rights reserved.
            </p>
          </div>
        </footer>
      </div>

      {/* Tweet Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] p-0 overflow-hidden">
          <DialogHeader className="p-6 pb-0">
            <DialogTitle className="text-xl font-bold text-slate-800">
              Tesla FSD Advocacy
            </DialogTitle>
            <DialogDescription className="text-[#1DA1F2] text-sm mt-1">
              Learn more about Tesla Full Self-Driving
            </DialogDescription>
          </DialogHeader>
          
          <ScrollArea className="flex-1 h-[calc(90vh-120px)]">
            <div className="p-6">
              {isLoadingTweets ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="w-8 h-8 text-[#1DA1F2] animate-spin" />
                </div>
              ) : (
                <div className="space-y-4">
                  {mainTweets.map((tweet, index) => (
                    <div key={tweet.id}>
                      <TweetCard
                        tweet={tweet}
                        index={index}
                        isExpanded={index === 0 && isFirstCardExpanded}
                        onToggle={index === 0 ? handleFirstCardToggle : () => {}}
                      />
                      
                      {/* Expanded thread for first card */}
                      {index === 0 && isFirstCardExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="mt-4 ml-4 md:ml-8 border-l-2 border-[#1DA1F2]/30 pl-4 space-y-4"
                        >
                          <p className="text-sm font-semibold text-[#1DA1F2] mb-2">Thread Replies:</p>
                          {isLoadingThread ? (
                            <div className="flex items-center justify-center py-6">
                              <Loader2 className="w-6 h-6 text-[#1DA1F2] animate-spin" />
                            </div>
                          ) : (
                            <>
                              {threadTweets.map((threadTweet, threadIndex) => (
                                <>
                                  <TweetCard
                                    key={threadTweet.id}
                                    tweet={threadTweet}
                                    index={threadIndex}
                                    isExpanded={false}
                                    onToggle={() => {}}
                                    isThreadCard
                                  />
                                  {/* Add "..." indicator between second-last and last tweet */}
                                  {threadIndex === threadTweets.length - 2 && (
                                    <div className="flex items-center justify-center py-4">
                                      <div className="flex items-center gap-2 text-slate-400">
                                        <div className="w-2 h-2 rounded-full bg-slate-300"></div>
                                        <div className="w-2 h-2 rounded-full bg-slate-300"></div>
                                        <div className="w-2 h-2 rounded-full bg-slate-300"></div>
                                      </div>
                                      <span className="ml-3 text-sm text-slate-500 italic">
                                        hundreds more replies in thread...
                                      </span>
                                    </div>
                                  )}
                                </>
                              ))}
                            </>
                          )}
                        </motion.div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </>
  )
}
