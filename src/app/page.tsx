'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Tweet } from 'react-tweet'
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
  ChevronDown,
  ChevronUp,
  X
} from 'lucide-react'
import Image from 'next/image'
import { toast } from '@/hooks/use-toast'

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
    color: 'hover:bg-gray-100'
  },
  { 
    name: 'YouTube', 
    icon: Youtube, 
    href: 'https://www.youtube.com/@TesIaCH',
    color: 'hover:bg-[#FF0000]/10'
  },
  { 
    name: 'Email', 
    icon: Mail, 
    href: '',
    email: 'marko.sarafijanovic@hotmail.com',
    color: 'hover:bg-[#E31937]/10'
  }
]

// Interests data
const interests = [
  {
    icon: Zap,
    title: 'Full Self-Driving',
    description: 'Advocating for Tesla FSD approval in Switzerland and Europe.',
    gradient: 'from-[#2AABEE] to-[#4DC4F2]'
  },
  {
    icon: Shield,
    title: 'Safety Statistics',
    description: 'Analyzing safety data to understand autonomous driving benefits.',
    gradient: 'from-[#10B981] to-[#34D399]'
  },
  {
    icon: Car,
    title: 'Tesla Vehicles',
    description: 'Passionate about Tesla\'s innovative electric vehicles.',
    gradient: 'from-[#E31937] to-[#FF6B6B]'
  },
  {
    icon: Palette,
    title: 'Tech Design',
    description: 'Appreciation for elegant design and safety in technology products.',
    gradient: 'from-[#8B5CF6] to-[#A78BFA]'
  },
  {
    icon: Lightbulb,
    title: 'Innovation',
    description: 'Exploring and promoting new technologies and sustainable transportation.',
    gradient: 'from-[#F59E0B] to-[#FBBF24]'
  },
  {
    icon: Trophy,
    title: 'Tennis',
    description: 'Member of Tennis Club Adliswil (TCA). Playing tennis since childhood.',
    gradient: 'from-[#EC4899] to-[#F472B6]'
  },
  {
    icon: Music,
    title: 'Music',
    description: 'Enjoy listening to music and singing. Beyond that, I play guitar since childhood.',
    gradient: 'from-[#06B6D4] to-[#22D3EE]'
  }
]

// Tweet titles mapping (for cards that should display a title)
const tweetTitles: Record<string, string> = {
  '2064192847574872534': "Increase safety by 3.5x",
  '1967307929444348158': "Prevent deaths",
  '2024470956811374598': "Prevent accidents and injuries",
};

// Main tweets list (updated order with new Tesla Europe post)
const mainTweetIds = [
  '1921978520722354217',
  '2064192847574872534',
  '1967307929444348158',
  '1962619410780430549',
  '1992349156778836201',
  '2006737864441393636',
  '2024470956811374598',
  '2064426772486128114',
];

// Thread replies for the first tweet
const threadTweetIds = [
  '1921978520722354217',
  '1923646877305614662',
  '1923647213076467995',
  '1923647680221217093',
  '1924727727178879463',
  '1925287080822735349',
  '1925940454593368421',
  '1926340163988287637',
  '1927712713028804840',
  '1927719139570856396',
  '1928175508577042674',
  '1928731884365722059',
  '1928759225523610034',
  '1928818514019692662',
  '1929616989556801611',
  '1930285824622424404',
  '1930315902064468049',
  '1931693981533966692',
  '1931701160613695624',
  '1932186569428943156',
  '1933172585354952844',
  '1933432602989355219',
  '1935393043068100636',
  '1935401629122969897',
  '1936115099816935903',
  '1937941791418028225',
  '1937942276283764778',
  '1937942984483631450',
  '1937943312519835718',
  '1937944413101076893',
  '1938539191538745741',
  '1941479550862623217',
  '1941480008490598747',
  '1941480634431701306',
  '1941487126920692159',
  '1941487572179615945',
  '1941490929342480575',
  '1941493641505321206',
  '1941494950090375648',
  '1959541655956074546',
  '1959541844183777761',
  '1959541987629035581',
  '1959542147335565464',
  '1959542403087446196',
  '1959542600089641257',
  '1959542769107489185',
  '1959542936137310446',
  '1959543105658499372',
  '1959543248256458780',
  '1959543426740892013',
  '1959543617652986167',
  '1959543790508646545',
  '1959543922696356160',
  '1959544062660293110',
  '1959545506742296902',
  '1959545665115066634',
  '1959545831687643244',
  '1959546210622054833',
  '1959948724433457335',
  '1960326858605506864',
  '1960327551319941604',
  '1961827833426161840',
  '1961828012959125883',
  '1961828162020532445',
  '1961828452111188147',
  '1962170717119688722',
  '1963346843162780040',
  '1963578030065918241',
  '1963578159225340237',
  '1964427818588053650',
  '1967308813436080235',
  '1967309086837596661',
  '1967558107439288535',
  '1972441094379250142',
  '1972441417273454760',
  '1972441584785580379',
  '1972441743388967060',
  '1972441956568666213',
  '1972442480617369776',
  '1977010891473481731',
  '1977011047258378702',
  '1977039321028087819',
  '1977039568332607972',
  '1977039919387492500',
  '1977040241719754992',
  '1978194790547177521',
  '1978195208908001469',
  '1978195374796935353',
  '1981766395944739291',
  '1981767231617802629',
  '1981767502771433494',
  '1981767636456550404',
  '1981768099688067130',
  '1981768232483926290',
  '1981768415820836984',
  '1990395192986206468',
  '1990395354219462872',
  '1990395506179088440',
  '1990395692414578689',
  '1990395839936606294',
  '1990396050855674016',
  '1990396382960550319',
  '1994487384692723759',
  '1994488553955627029',
  '1994488712559038971',
  '1994488962153681153',
  '1994489151773970544',
  '1994489496243769433',
  '1994489704822313275',
  '1994490007458132214',
  '1994490319497564562',
  '1994490486925791651',
  '1994490820335214636',
  '1994491301723869606',
  '1995466001232662585',
  '1995466197345730890',
  '1999429340308660295',
  '1999429497679147129',
  '1999429650767040950',
  '1999429794975666409',
  '1999429930015424739',
  '1999430083241738436',
  '1999430245066375569',
  '1999430609312317735',
  '1999430761922130260',
  '1999430899834994735',
  '2000491677593780694',
  '2007153049639551373',
  '2007153236277637186',
  '2007153657490681970',
  '2007153819512422429',
  '2007153953503621525',
  '2007154087213838751',
  '2007154465607221708',
  '2007154661116231702',
  '2007154809326231667',
  '2007155025056018865',
  '2019762716177563986',
  '2019762886617317855',
  '2019763237852512501',
  '2019763370484768846',
  '2019763535555793258',
  '2019763696839348721',
  '2019763807917150587',
  '2019763938326413347',
  '2019764068928626933',
  '2024471814420771279',
  '2027091175568441598',
  '2028440637775708191',
  '2029654217183412398',
  '2029654332816122239',
  '2029654697208840622',
  '2030054487981740252',
  '2030953010281480214',
  '2031826251778765031',
  '2031826366258205094',
  '2031826476153147762',
  '2031826608764424482',
  '2031826753069429079',
  '2031827410396614756',
  '2035242405402759208',
  '2035242755174076539',
  '2035242901890859424',
  '2036484264510832926',
  '2036484564432879867',
  '2038937508994531810',
  '2041286452122705949',
  '2041286605168652776',
  '2044125703419945269',
  '2044127854753894742',
  '2044129919626514748',
  '2044130294488330398',
  '2046293058476765544',
  '2046293192065347944',
  '2047585976621342877',
  '2047586365718532583',
  '2047586504768159749',
  '2048390336481734775',
  '2048390499518583259',
  '2049542297310667041',
  '2049542557793694192',
  '2049542717504401524',
  '2049542844780540347',
  '2049543022774227289',
  '2049543185433563185',
  '2058918935731314937',
  '2058919153772212594',
  '2058919300333805812',
  '2058919467954970927',
  '2058919738911183230',
  '2059728201312592067',
  '2059728348574630013',
  '2061175649566331386',
  '2061175827568402913',
  '2061175950734250204',
  '2062104047507632603',
  '2063726358392443270',
  '2063726507202089084',
  '2063726722436960682',
  '2063726962393178527',
  '2063727109902635504',
  '2065439490651435393',
  '2065440014100512950',
];

// Traffic death counter - automatically calculated from thread tweets
// Formula: 51 + (threadTweetIds.length - 1) = 51 + (203 - 1) = 51 + 202 = 253
// Each new tweet ID added will increase the counter by 1
const TRAFFIC_DEATH_BASE = 51;
const trafficDeathCount = TRAFFIC_DEATH_BASE + (threadTweetIds.length - 1);

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

  // Determine if this is the first card (index 0 and not a thread card)
  const isFirstCard = index === 0 && !isThreadCard;

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
          {/* Title for first card - clickable, always visible with counter */}
          {title && isFirstCard && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onTitleClick?.();
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
              </div>
            </button>
          )}

          {/* Title for other cards (not first) - simple display inside card */}
          {title && !isFirstCard && !isThreadCard && (
            <div className="w-full mb-3 p-3 rounded-xl bg-gradient-to-r from-[#2AABEE]/10 to-[#4DC4F2]/10 border border-[#2AABEE]/30">
              <div className="flex items-center justify-center">
                <span className="text-base md:text-lg font-bold text-[#2AABEE]">
                  {title}
                </span>
              </div>
            </div>
          )}
          
          {/* Embedded Tweet */}
          <div 
            className="tweet-container [&_article]:!bg-transparent [&_article]:!shadow-none [&_article]:!border-0 cursor-pointer"
            onClick={onToggle}
          >
            <Tweet id={tweetId} />
          </div>
          
          {/* Expand indicator for first card - always visible */}
          {isFirstCard && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onTitleClick?.();
              }}
              className="w-full flex items-start justify-center gap-2 mt-3 pt-3 border-t border-slate-100 cursor-pointer hover:bg-slate-50 transition-colors rounded-b-xl -mb-4 -mx-4 px-4 pb-4"
            >
              <div className="text-xs text-[#E31937] font-semibold text-center">
                <p className="mb-1">Click to see full traffic death thread.</p>
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
  )
}

export default function Home() {
  const currentYear = new Date().getFullYear()
  const [isLoading, setIsLoading] = useState(true)
  const [showContent, setShowContent] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isFirstCardExpanded, setIsFirstCardExpanded] = useState(false)
  const [scrollToFirstReply, setScrollToFirstReply] = useState(false)

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

  const handleBannerClick = () => {
    setIsModalOpen(true)
  }

  const handleFirstCardToggle = () => {
    setIsFirstCardExpanded(!isFirstCardExpanded)
  }

  const handleTitleClick = () => {
    if (!isFirstCardExpanded) {
      // Expanding: open and scroll to first reply
      setIsFirstCardExpanded(true);
      setTimeout(() => {
        setScrollToFirstReply(true);
      }, 100);
    } else {
      // Collapsing: just close
      setIsFirstCardExpanded(false);
      setScrollToFirstReply(false);
    }
  }

  // Reset scroll target when modal closes
  useEffect(() => {
    if (!isModalOpen) {
      setScrollToFirstReply(false);
      setIsFirstCardExpanded(false);
    }
  }, [isModalOpen]);

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
      textArea.focus()
      textArea.select()
      
      try {
        document.execCommand('copy')
        toast({
          title: 'Email copied!',
          description: `${email} has been copied to your clipboard.`,
          duration: 3000,
        })
      } catch {
        toast({
          title: 'Could not copy email',
          description: `Please manually copy: ${email}`,
          duration: 5000,
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
            className="fixed inset-0 z-50 bg-gradient-to-br from-[#E31937] via-[#CC1830] to-[#B01428] flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="text-6xl md:text-8xl font-bold text-white mb-4"
              >
                MS
              </motion.div>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-white/80 text-lg md:text-xl font-light tracking-wider"
              >
                MARKO SARAFIJANOVIC
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center px-4 py-20">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#E31937]/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#2AABEE]/10 rounded-full blur-3xl" />
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 30 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 text-center max-w-4xl mx-auto"
          >
            {/* Profile Image */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: showContent ? 1 : 0, opacity: showContent ? 1 : 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="mb-8"
            >
              <div className="relative inline-block">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white shadow-2xl mx-auto">
                  <Image
                    src="/profile.jpg"
                    alt="Marko Sarafijanovic"
                    width={160}
                    height={160}
                    className="object-cover w-full h-full"
                    priority
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-[#E31937] rounded-full flex items-center justify-center shadow-lg">
                  <Car className="w-5 h-5 text-white" />
                </div>
              </div>
            </motion.div>

            {/* Name & Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 20 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-6xl font-bold text-slate-900 mb-4"
            >
              Marko Sarafijanovic
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 20 }}
              transition={{ delay: 0.4 }}
              className="text-lg md:text-xl text-slate-600 mb-6"
            >
              FSD Advocate • Technology Enthusiast • Content Creator
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 20 }}
              transition={{ delay: 0.5 }}
              className="text-base md:text-lg text-slate-500 mb-8 max-w-2xl mx-auto"
            >
              Advocating for Tesla Full Self-Driving (Supervised) approval in Switzerland and Europe. 
              Passionate about autonomous driving safety and innovation.
            </motion.p>

            {/* FSD Banner Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 20 }}
              transition={{ delay: 0.6 }}
              className="mb-8"
            >
              <button
                onClick={handleBannerClick}
                className="w-full bg-gradient-to-r from-[#2AABEE] via-[#3498db] to-[#4DC4F2] text-white py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer"
              >
                <div className="flex items-center justify-center gap-3">
                  <span className="text-lg md:text-xl font-semibold group-hover:text-white/90 transition-colors">
                    Why approve Tesla FSD (Supervised)?
                  </span>
                  <ChevronDown className="w-5 h-5 text-white/80 group-hover:text-white transition-colors" />
                </div>
              </button>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 20 }}
              transition={{ delay: 0.7 }}
              className="flex flex-wrap justify-center gap-3"
            >
              {socialLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.email ? '#' : link.href}
                  onClick={(e) => link.email && handleEmailClick(e, link.email)}
                  target={link.email ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl bg-white shadow-md border border-slate-200/50 transition-all duration-200 ${link.color}`}
                >
                  <link.icon className="w-4 h-4 text-slate-700" />
                  <span className="text-sm font-medium text-slate-700">{link.name}</span>
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* Interests Section */}
        <section className="py-20 px-4 bg-white/50">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-6xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 text-center mb-12">
              Interests & Focus
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {interests.map((interest, index) => (
                <motion.div
                  key={interest.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${interest.gradient} flex items-center justify-center mb-4`}>
                    <interest.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">{interest.title}</h3>
                  <p className="text-slate-600">{interest.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* FSD Modal */}
        <AnimatePresence>
          {isModalOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
              onClick={() => setIsModalOpen(false)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.3 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-2xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden"
              >
                {/* Header */}
                <div className="sticky top-0 z-10 bg-gradient-to-r from-[#2AABEE] to-[#4DC4F2] p-4 md:p-6 border-b border-[#2AABEE]/50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <h2 className="text-xl md:text-2xl font-bold text-white">Why approve Tesla FSD (Supervised)?</h2>
                    </div>
                    <button
                      onClick={() => setIsModalOpen(false)}
                      className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                    >
                      <X className="w-5 h-5 text-white" />
                    </button>
                  </div>
                  <p className="text-white/80 text-sm font-medium mt-2">Learn more</p>
                </div>
                
                {/* Scrollable Content */}
                <div className="overflow-y-auto max-h-[calc(90vh-100px)] p-4 md:p-6">
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
                          title={index === 0 ? "Prevent traffic accidents and traffic deaths." : tweetTitles[tweetId]}
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
                            <p className="text-sm font-semibold text-[#E31937] mb-2">Thread Replies:</p>
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
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-8 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-slate-400">
            © {currentYear} Marko Sarafijanovic. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  )
}
