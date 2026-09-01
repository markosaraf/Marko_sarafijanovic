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
      {/*
        Card — no overflow-hidden.
        overflow-hidden + rounded-2xl would clip the tweet avatar
        circle on mobile. The expand button below is a sibling of
        p-4 (not a child) with no negative margins, so clipping is
        unnecessary.
      */}
      <div
        className={`relative rounded-2xl bg-white border border-slate-200/80 shadow-lg hover:shadow-xl transition-all duration-300 ${
          isThreadCard ? 'border-l-4 border-l-[#E31937]' : ''
        }`}
      >
        <div className="p-4 pb-0">
          {/* Title for card */}
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
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs md:text-sm text-slate-500">Traffic deaths since VAF law (March 1, 2025):</span>
                    <span className="text-lg md:text-xl font-bold text-[#E31937] tabular-nums">{trafficDeathCount}</span>
                  </div>
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

          {/*
            Embedded Tweet
            Avatar overrides live in globals.css (outside @layer).
            react-tweet uses CSS Modules (.module.css) so class names
            like .react-tweet-avatar are HASHED at build time and
            don't exist in the DOM — that's why Tailwind arbitrary
            variants [&_.react-tweet-avatar] and plain CSS selectors
            targeting .react-tweet-avatar never matched anything.
            The fix uses .react-tweet-theme (the only non-hashed
            class) + structural selectors to reach the header div
            that has overflow:hidden.
          */}
          <div
            className="tweet-container cursor-pointer"
            onClick={onToggle}
          >
            <Tweet id={tweetId} />
          </div>
        </div>

        {/*
          Expand indicator for first card.
          Sibling of p-4 div — no negative margins, no overflow-hidden needed.
        */}
        {index === 0 && !isThreadCard && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onTitleClick?.();
            }}
            className="w-full flex items-start justify-center gap-2 mt-3 pt-3 border-t border-slate-100 cursor-pointer hover:bg-slate-50 transition-colors px-4 pb-4 rounded-b-2xl"
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

      {/* Header */}
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
          {/* Tesla-Conducted FSD Studies Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full"
          >
            <a
              href="https://www.tesla.com/fsd-evidence-dashboard"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex flex-col items-center justify-center w-full rounded-2xl bg-[#3E6AE1] px-6 py-5 text-center shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.01] active:scale-[0.99]"
            >
              <span className="text-base md:text-lg font-semibold text-white tracking-tight">
                Tesla-Conducted FSD Studies
              </span>
              <span className="mt-2 text-xs md:text-sm text-white/90 leading-relaxed max-w-2xl">
                In 2024 and 2025 the engineering fleet drove on FSD (Supervised) 1.6 million km across 18 european countries. To additionally test FSD (Supvervised), it was tested on fixed routes that concentrate challenging driving interactions (Amsterdam, Barcelona, Rome, Paris, Munich, Copenhagen). FSD (Supervised) achieved a pass rate of 92% across 230,000+ scenario tests.
              </span>
              <div className="absolute inset-0 rounded-2xl bg-white/0 group-hover:bg-white/10 transition-colors duration-300 pointer-events-none" />
            </a>
          </motion.div>

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
