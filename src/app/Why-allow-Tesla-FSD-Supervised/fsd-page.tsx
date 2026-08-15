'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Tweet } from 'react-tweet'
import { 
  ChevronDown, 
  ChevronUp, 
  X
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import {
  mainTweetIds,
  tweetTitles,
  threadTweetIds,
  trafficDeathCount,
} from './fsd-data'

// Tweet Card Component using react-tweet
function TweetCard({ 
  tweetId, 
  index, 
  isExpanded, 
  onToggle,
  onTitleClick,
  isThreadCard = false,
  title,
  isScrollTarget = false
}: { 
  tweetId: string; 
  index: number; 
  isExpanded: boolean; 
  onToggle: () => void;
  onTitleClick?: () => void;
  isThreadCard?: boolean;
  title?: string;
  isScrollTarget?: boolean;
}) {
  const scrollTargetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isScrollTarget && scrollTargetRef.current) {
      scrollTargetRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [isScrollTarget]);

  return (
    <motion.div
      ref={scrollTargetRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="w-full"
    >
      <div 
        className={`relative rounded-2xl overflow-hidden bg-white border border-slate-200/80 shadow-lg hover:shadow-xl transition-all duration-300 ${
          isThreadCard ? 'border-l-4 border-l-[#E31937]' : ''
        }`}
      >
        <div className="p-4">
          {/* Title for card - clickable only if onTitleClick is provided */}
          {title && (
            onTitleClick ? (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onTitleClick();
                }}
                className="w-full mb-3 p-3 rounded-xl bg-red-50 border border-red-200 hover:bg-red-100 hover:border-red-300 transition-all duration-200 cursor-pointer group"
              >
                <div className="flex flex-col items-center justify-center gap-2">
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-base md:text-lg font-bold text-[#E31937] group-hover:underline underline-offset-2">
                      {title}
                    </span>
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5 text-[#E31937] group-hover:-translate-y-0.5 transition-transform" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-[#E31937] group-hover:translate-y-0.5 transition-transform" />
                    )}
                  </div>
                  {/* Traffic Death Counter */}
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs md:text-sm text-slate-500">Traffic deaths since VAF law (March 1, 2025):</span>
                    <span className="text-lg md:text-xl font-bold text-[#E31937] tabular-nums">{trafficDeathCount}</span>
                  </div>
                  {/* FSD Delay Clock Link */}
                  <a 
                    href="https://fsddelay.org" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm font-semibold text-green-600 hover:text-green-700 hover:underline mt-1"
                    onClick={(e) => e.stopPropagation()}
                  >
                    FSD Delay Clock
                  </a>
                </div>
              </button>
            ) : (
              <div className="w-full mb-3 p-3 rounded-xl bg-red-50 border border-red-200">
                <div className="flex flex-col items-center justify-center gap-2">
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-base md:text-lg font-bold text-[#E31937]">
                      {title}
                    </span>
                  </div>
                </div>
              </div>
            )
          )}
          
          {/* Embedded Tweet
              — [&_article]:!m-0 resets react-tweet's responsive negative margins
              — [&_article]:!p-4 md:[&_article]:!p-5 forces consistent inner padding
                so the tweet avatar (poster's circular profile pic) always has
                enough clearance from the card's rounded corners. Without this,
                react-tweet shrinks the article padding on mobile, pushing the
                avatar into the card's overflow-hidden + rounded-2xl clip zone,
                which cuts off the top-left of the circle. */}
          <div 
            className="tweet-container [&_article]:!bg-transparent [&_article]:!shadow-none [&_article]:!border-0 [&_article]:!m-0 [&_article]:!p-4 md:[&_article]:!p-5 cursor-pointer"
            onClick={onToggle}
          >
            <Tweet id={tweetId} />
          </div>
          
          {/* Expand indicator for first card - always visible */}
          {index === 0 && !isThreadCard && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onTitleClick?.();
              }}
              className="w-full flex items-start justify-center gap-2 mt-3 pt-3 border-t border-slate-100 cursor-pointer hover:bg-slate-50 transition-colors rounded-b-xl -mb-4 -mx-4 px-4 pb-4"
            >
              <div className="text-xs text-[#E31937] font-semibold text-center">
                <p className="mb-1">Click to see full traffic death thread.</p>
                <p className="mb-1">Counter: <span className="text-lg md:text-xl font-bold text-[#E31937] tabular-nums">{trafficDeathCount}</span></p>
                <p className="text-slate-600 font-normal">Thread started when the catastrophic VAF (Verordnung über das automatisierte Fahren) law came into effect on March 1, 2025.</p>
                <p className="text-[#E31937] font-semibold">This law keeps preventing FSD (Supervised).</p>
              </div>
              <div className="flex items-center h-full pt-1">
                {isExpanded ? (
                  <ChevronUp className="w-4 h-4 text-[#E31937] flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-[#E31937] flex-shrink-0" />
                )}
              </div>
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function FSDPage() {
  const router = useRouter();
  const [isFirstCardExpanded, setIsFirstCardExpanded] = useState(false);
  const [scrollToFirstReply, setScrollToFirstReply] = useState(false);

  const handleClose = () => {
    router.push('/');
  };

  const handleFirstCardToggle = () => {
    setIsFirstCardExpanded(!isFirstCardExpanded);
  };

  const handleTitleClick = () => {
    if (!isFirstCardExpanded) {
      setIsFirstCardExpanded(true);
      setTimeout(() => {
        setScrollToFirstReply(true);
      }, 100);
    } else {
      setIsFirstCardExpanded(false);
      setScrollToFirstReply(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Background blur effect */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-[#E31937]/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-[#E31937]/5 to-transparent rounded-full blur-3xl" />
      </div>

      {/* Header — two-layer structure like vugolaai.com:
          Outer <header> = sticky positioning only, transparent background
          Inner <div> = backdrop-filter blur via INLINE STYLE + blue glass background via CSS class */}
      <header className="sticky top-0 z-50">
        <div
          className="header-glass-blue p-4 md:p-6"
          style={{
            backdropFilter: 'blur(3px)',
            WebkitBackdropFilter: 'blur(3px)',
          }}
        >
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h1 className="text-xl md:text-2xl font-bold text-white">Why approve Tesla FSD (Supervised)?</h1>
            </div>
            <button
              onClick={handleClose}
              className="p-2 rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>
          <div className="max-w-4xl mx-auto">
            <p className="text-white/80 text-sm font-medium mt-2">Learn more</p>
          </div>
        </div>
      </header>

      {/* Scrollable Content */}
      <main className="relative z-10 max-w-4xl mx-auto p-4 md:p-6">
        <div className="space-y-4">
          {/* Main Tweets */}
          {mainTweetIds.map((tweetId, index) => (
            <div key={tweetId}>
              <TweetCard
                tweetId={tweetId}
                index={index}
                isExpanded={index === 0 && isFirstCardExpanded}
                onToggle={index === 0 ? handleFirstCardToggle : () => {}}
                onTitleClick={index === 0 ? handleTitleClick : undefined}
                title={tweetTitles[tweetId]}
              />
              
              {/* Thread expansion for first card */}
              {index === 0 && isFirstCardExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-4 ml-4 md:ml-8 border-l-2 border-[#E31937]/30 pl-4 space-y-4"
                >
                  <p className="text-sm font-semibold text-[#E31937] mb-2">Traffic deaths thread:</p>
                  {threadTweetIds.map((threadTweetId, threadIndex) => (
                    <TweetCard
                      key={threadTweetId}
                      tweetId={threadTweetId}
                      index={threadIndex}
                      isExpanded={false}
                      onToggle={() => {}}
                      isThreadCard
                      isScrollTarget={scrollToFirstReply && threadIndex === 0}
                    />
                  ))}
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-8 mt-8 border-t border-slate-200 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-slate-400 text-sm">
            © {new Date().getFullYear()} Marko Sarafijanovic. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
