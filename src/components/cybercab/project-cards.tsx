import styles from './project-cards.module.css'
import { UserCounter } from './user-counter'

type Design = 'gold' | 'pale'

function SwarmSymbol() {
  return <svg viewBox="0 0 100 70" aria-hidden="true">
    <g fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="32" y="18" width="47" height="34" rx="5" opacity=".35"/><path d="M38 28h24M38 35h33M38 42h17" opacity=".45"/></g>
    <g fill="currentColor"><path d="M12 7v24l6-6 5 11 5-2-5-10h9z"/><path d="M70 41v18l5-4 4 8 4-2-4-8h7z"/><path d="M49 2v14l4-3 3 6 3-1-3-7h5z" opacity=".55"/></g>
  </svg>
}

export function SwarmInterestCard({ design }: { design: Design }) {
  return <a href="/ai-agent-swarm" data-design={design} className={`${styles.card} ${styles.swarm}`}>
    <span className={styles.symbol}><SwarmSymbol /></span>
    <h3>AI agent swarm</h3>
    <p>Your sites, rebuilt by an AI agent swarm.</p>
    <span className={styles.action}>Start swarm</span>
  </a>
}

export function QuizletGravityCard({ design }: { design: Design }) {
  return <a href="https://www.quizletgravity.com/" data-design={design} className={`${styles.card} ${styles.gravity}`}>
    <span className={styles.quizletSymbol} aria-hidden="true" />
    <div className={styles.copy}><h2>I made Quizlet Gravity</h2><p>Learn by playing games. Challenge friends on the leaderboard.</p></div>
    <UserCounter />
  </a>
}
