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
  Linkedin, 
  ExternalLink,
  GraduationCap,
  Trophy,
  Heart,
  Mail,
  Music,
  Check,
  ChevronDown,
  ChevronUp,
  X
} from 'lucide-react'
import Image from 'next/image'
import { toast } from '@/hooks/use-toast'

// Custom X (Twitter) brand icon
const XTwitterIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M18.244 2.25h3.308l-7.347 8.388L22.5 21.75h-6.727l-5.376-6.939-6.163 6.939H2.25l7.84-8.958L2.25 2.25h6.727l4.91 6.347 5.357-6.347zm-1.143 17.39h1.836L7.17 4.36H5.17l11.931 15.28z"/>
  </svg>
)

// Custom Instagram brand icon
const InstagramIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-10.405a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
  </svg>
)

// Custom TikTok brand icon
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15.2a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.71a8.16 8.16 0 0 0 3.76.93V6.19a4.81 4.81 0 0 1-0-.5z"/>
  </svg>
)

// Custom YouTube brand icon
const YouTubeIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
)

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
    icon: XTwitterIcon, 
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
    icon: InstagramIcon, 
    href: 'https://www.instagram.com/markosarafijanovic',
    color: 'hover:bg-[#E4405F]/10'
  },
  { 
    name: 'TikTok', 
    icon: TikTokIcon, 
    href: 'https://www.tiktok.com/@markosarafijanovic',
    color: 'hover:bg-gray-100'
  },
  { 
    name: 'YouTube', 
    icon: YouTubeIcon, 
    href: 'https://www.youtube.com/@TesIaCH',
    color: 'hover:bg-[#FF0000]/10'
  },
  { 
    name: 'Email', 
    icon: Mail, 
    href: '',
    email: 'marko.sarafijanovic@gmail.com',
    color: 'hover:bg-[#E31937]/10'
  }
]

// Interests data
const interests = [
  {
  icon: Heart,
  title: 'Teaching Children',
  description: 'Passionate about educating and inspiring young minds.',
  gradient: 'from-[#F43F5E] to-[#FB7185]'
  },
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
    description: 'Exploring and promoting new technologies such as sustainable transportation and autonomous transport.',
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
    description: 'I enjoy listening and singing to popular music. Beyond that, I play guitar since childhood.',
    gradient: 'from-[#06B6D4] to-[#22D3EE]'
  }
]

// Main tweets list (extract IDs from URLs)
const mainTweetIds = [
  '1921978520722354217',           // first tweet (existing)
  '2064192847574872534',           // Tesla Europe - increase safety by 3.5x (NEW)
  '1967307929444348158',           // prevent deaths
  '2024470956811374598',           // prevent accidents and injuries
  '2065524907551735922',           // Stop state favorism and regulatory capture
  '2065459025186025718',           // Stop state favorism and regulatory capture2
  '1962619410780430549',           // existing
  '1992349156778836201',           // existing
  '2006737864441393636',           // existing
  '2064426772486128114',           // existing
];

// Titles for specific tweets (by ID)
const tweetTitles: Record<string, string> = {
  '1921978520722354217': 'Prevent traffic accidents and traffic deaths.',
  '2064192847574872534': 'Increase safety by 3.5x',
  '1967307929444348158': 'Prevent deaths',
  '2024470956811374598': 'Prevent accidents and injuries',
  '2065524907551735922': 'Stop state favorism and regulatory capture in Switzerland.🇨🇭',
  '2065459025186025718': 'Revert Article 34c of VAF (Verordnung über das automatisierte Fahren). Article 34c is leading to state favorism by ASTRA. ASTRA is excempting state projects like "AmiGo" by PostAuto AG from Article 34c.🇨🇭 Current ASTRA Director: Jürg Röthlisberger. '
};

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
  '1990395839966606294',
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
  '2058919738911188230',
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
          
          {/* Embedded Tweet */}
          <div 
            className="tweet-container [&_article]:!bg-transparent [&_article]:!shadow-none [&_article]:!border-0 cursor-pointer"
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
  window.location.href = '/Why-allow-Tesla-FSD-Supervised'
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
      {/* JSON-LD Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Marko Sarafijanovic",
            "image": "https://marko-sarafijanovic.com/marko-profile.png",
            "jobTitle": "Primary School Teacher",
            "worksFor": {
              "@type": "EducationalOrganization",
              "name": "Pädagogische Hochschule Zürich (PHZH)"
            },
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Zurich",
              "addressCountry": "Switzerland"
            },
            "description": "Substitute teacher in primary school passionate about teaching maths and languages. Tesla enthusiast and Full Self-Driving advocate studying at PHZH Zurich.",
            "sameAs": [
              "https://x.com/MarkoSaraf2004",
              "https://ch.linkedin.com/in/marko-sarafijanovic-60707923b",
              "https://www.instagram.com/markosarafijanovic",
              "https://www.tiktok.com/@markosarafijanovic",
              "https://www.youtube.com/@TesIaCH"
            ],
            "knowsAbout": [
              "Primary Education",
              "Teaching Maths",
              "Teaching Languages",
              "Tesla Vehicles",
              "Full Self-Driving Technology",
              "Electric Vehicles",
              "Technology Design",
              "Tennis",
              "Tennis Club Adliswil",
              "TCA"
            ],
            "homeLocation": {
              "@type": "Place",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Adliswil",
                "addressRegion": "Zurich",
                "addressCountry": "Switzerland"
              }
            }
          })
        }}
      />
      
      {/* Intro screen with centered profile - fades out */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            className="fixed inset-0 z-[100] bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col items-center"
            >
              <div className="w-24 h-24 md:w-28 md:h-28 rounded-2xl overflow-hidden border-4 border-white shadow-2xl shadow-slate-300/50 mb-5">
                <Image
                  src="/marko-profile.png"
                  alt="Marko Sarafijanovic"
                  width={112}
                  height={112}
                  className="object-cover w-full h-full"
                  priority
                />
              </div>
              <motion.h1
                initial={{ y: 15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-2xl md:text-3xl font-bold text-slate-800 mb-3"
              >
                Marko Sarafijanovic
              </motion.h1>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="h-1 w-28 bg-gradient-to-r from-[#E31937] to-[#FF6B6B] rounded-full"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Main content with circle reveal animation */}
      <div 
        className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 text-slate-900 overflow-x-hidden transition-all duration-[2000ms] ease-out"
        style={{
          clipPath: showContent ? 'circle(150% at 50vw 50vh)' : 'circle(0% at 50vw 50vh)'
        }}
      >
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-[#E31937]/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-[#E31937]/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-1/2 left:1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-slate-200/50 to-slate-100/30 rounded-full blur-3xl" />
      </div>

      {/* Main Content */}
      <main className="relative z-10 max-w-6xl mx-auto px-4 py-8 md:py-16">
        
        {/* FSD Banner */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6"
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

        {/* Hero Section - Bento Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12">
          
          {/* Profile Card - Large */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="md:col-span-2 relative rounded-3xl overflow-hidden bg-white/80 border border-slate-200/80 shadow-xl shadow-slate-200/50 p-6 md:p-10"
          >
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-10">
              {/* Profile Image */}
              <div className="relative flex-shrink-0">
                <div className="absolute inset-0 bg-gradient-to-br from-[#E31937] to-[#FF6B6B] rounded-2xl blur-xl opacity-30" />
                <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden border-4 border-white shadow-xl shadow-[#E31937]/20">
                  <Image
                    src="/marko-profile.png"
                    alt="Marko Sarafijanovic"
                    fill
                    sizes="(max-width: 768px) 128px, 160px"
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
              
              {/* Name & Tagline */}
              <div className="text-center md:text-left flex-1">
                <motion.h2 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight"
                >
                  <span className="bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 bg-clip-text text-transparent">
                    Marko Sarafijanovic
                  </span>
                </motion.h2>
                
                <motion.p 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="text-xl md:text-2xl text-[#E31937] font-semibold mb-4"
                >
                  Primary School Teacher in Zurich
                </motion.p>
              </div>
            </div>
          </motion.div>

          {/* Education Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative rounded-3xl overflow-hidden bg-white/80 border border-slate-200/80 shadow-lg shadow-slate-200/50 p-6 flex flex-col justify-center hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center gap-4 mb-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#10B981] to-[#34D399] flex items-center justify-center shadow-lg shadow-emerald-500/20">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-800">Education</h3>
            </div>
            <p className="text-slate-500 text-sm mb-2">Pädagogische Hochschule Zürich (PHZH)</p>
            <p className="text-[#10B981] font-medium text-sm">Primary Teacher Education Degree Program 2024-2029</p>
          </motion.div>
        </section>

        {/* About & Socials Section - Bento Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-8 md:mb-12">
          
          {/* About Card */}
          <motion.div 
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="relative rounded-3xl overflow-hidden bg-white/80 border border-slate-200/80 shadow-lg shadow-slate-200/50 p-6 md:p-8 hover:shadow-xl transition-shadow"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              <span className="bg-gradient-to-r from-[#E31937] to-[#FF6B6B] bg-clip-text text-transparent">
                About Me
              </span>
            </h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              I&apos;m a <span className="text-[#E31937] font-semibold">substitute teacher</span> in primary school. I love teaching <span className="text-slate-800 font-semibold">maths</span> and <span className="text-slate-800 font-semibold">languages</span> the most. Besides German, I teach <span className="text-slate-800 font-semibold">English</span> and <span className="text-slate-800 font-semibold">French</span>. I have a C1 diploma in English and a C1 diploma in French is pending.
            </p>
            <p className="text-slate-600 leading-relaxed">
              I&apos;m also a passionate advocate for <span className="text-slate-800 font-semibold">Tesla</span> and{' '}
              <span className="text-[#E31937] font-semibold">Full Self-Driving technology</span>. My enthusiasm lies in analyzing safety statistics and debunking media myths about emerging technologies, 
              while following the expansion of FSD to Europe.
            </p>
          </motion.div>

          {/* Social Links Card */}
          <motion.div 
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="relative rounded-3xl overflow-hidden bg-white/80 border border-slate-200/80 shadow-lg shadow-slate-200/50 p-6 md:p-8 hover:shadow-xl transition-shadow"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              <span className="bg-gradient-to-r from-slate-800 to-slate-500 bg-clip-text text-transparent">
                Socials
              </span>
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.email ? '#' : social.href}
                  target={social.email ? undefined : '_blank'}
                  rel={social.email ? undefined : 'noopener noreferrer'}
                  onClick={social.email ? (e) => handleEmailClick(e, social.email!) : undefined}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 ${social.color} transition-all duration-300 group cursor-pointer`}
                >
                  <social.icon className="w-5 h-5 text-slate-400 group-hover:text-[#E31937] transition-colors" />
                  <span className="text-sm font-medium text-slate-600 group-hover:text-slate-800 transition-colors">
                    {social.name}
                  </span>
                  {social.email ? (
                    <Check className="w-3 h-3 text-slate-400 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                  ) : (
                    <ExternalLink className="w-3 h-3 text-slate-400 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                  )}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Interests Section - Bento Grid */}
        <section className="mb-8 md:mb-12">
          <motion.div 
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-2">
              <span className="bg-gradient-to-r from-slate-800 to-slate-500 bg-clip-text text-transparent">
                Interests & Passions
              </span>
            </h2>
            <p className="text-slate-500 text-lg">
              Exploring technology, design, and innovation
            </p>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6"
          >
            {interests.map((interest, index) => (
              <motion.div
                key={interest.title}
                variants={fadeInUp}
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
                className={`relative rounded-2xl overflow-hidden bg-white/80 border border-slate-200/80 shadow-lg shadow-slate-200/50 p-5 md:p-6 cursor-pointer group hover:shadow-xl transition-all ${
                  index === 0 ? 'md:col-span-2 md:row-span-1' : ''
                }`}
              >
                <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br ${interest.gradient} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <interest.icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
                </div>
                <h3 className="text-base md:text-lg font-bold text-slate-800 mb-1 md:mb-2">{interest.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed hidden md:block">{interest.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="relative py-8 border-t border-slate-200">
          <div className="text-center">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-slate-400 text-sm"
            >
              &copy; {currentYear} Marko Sarafijanovic. All rights reserved.
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-slate-400 text-xs mt-2"
            >
              Primary School Teacher | Tesla Enthusiast | Tech & Design
            </motion.p>
          </div>
        </footer>
      </main>
      </div>

      {/* Tweets Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={() => setIsModalOpen(false)}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            
            {/* Modal Content */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
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
    </>
  )
}
