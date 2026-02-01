import { useEffect, useMemo, useState } from 'react'
import Navbar from '@/components/Navbar'
import RocketAnimation from '@/components/RocketAnimation'

const tracks = [
  {
    title: 'Clean Air & Water',
    desc: 'Monitor pollution, restore ecosystems, and protect shared resources.',
  },
  {
    title: 'Climate Resilience',
    desc: 'Prepare communities for heat, floods, and extreme weather impacts.',
  },
  {
    title: 'Circular Economy',
    desc: 'Reduce waste through reuse, repair, recycling, and smart materials.',
  },
  {
    title: 'Green Energy',
    desc: 'Accelerate clean power adoption, storage, and efficiency at scale.',
  },
  {
    title: 'Precision Farming',
    desc: 'Use data and automation to boost yield and reduce input waste.',
  },
  {
    title: 'Agri Supply Chains',
    desc: 'Improve traceability, cold chains, and market access for farmers.',
  },
]

const timeline = [
  { t: '20 Feb', label: 'Round 1: Problem Statement Release' },
  { t: '3 Mar', label: 'Registration Closes' },
  { t: '3 Mar', label: 'Submission Deadline' },
  { t: '5 Mar', label: 'Round 1 Results Announcement' },
  { t: '12–13 Mar', label: 'Round 2: 24 hr Offline Hackathon' },
]

function getCountdown(target) {
  const now = new Date()
  const diff = target.getTime() - now.getTime()
  if (diff <= 0) return { done: true, days: 0, hours: 0, minutes: 0, seconds: 0 }
  const totalSeconds = Math.floor(diff / 1000)
  const days = Math.floor(totalSeconds / 86400)
  const hours = Math.floor((totalSeconds % 86400) / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60
  return { done: false, days, hours, minutes, seconds }
}

function Badge({ children, className = '' }) {
  return (
    <span
      className={
        'inline-flex items-center rounded-full border border-black/10 bg-white/70 px-3 py-1 text-xs font-semibold tracking-wide text-slate-900 backdrop-blur ' +
        className
      }
    >
      {children}
    </span>
  )
}

function Card({ children, className = '' }) {
  return (
    <div
      className={
        'rounded-2xl border border-black/10 bg-white/70 p-4 sm:p-5 shadow-[0_10px_30px_-20px_rgba(2,6,23,0.35)] backdrop-blur ' +
        className
      }
    >
      {children}
    </div>
  )
}

export default function App() {
  const releaseDate = useMemo(() => new Date(2026, 1, 20, 0, 0, 0), [])
  const [countdown, setCountdown] = useState(() => getCountdown(releaseDate))

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(getCountdown(releaseDate))
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const countdownLabel = useMemo(() => {
    if (countdown.done) return 'Problem Statements Released'
    return `${countdown.days}d ${countdown.hours}h ${countdown.minutes}m ${countdown.seconds}s`
  }, [countdown])

  return (
    <div className="relative min-h-screen">
      <RocketAnimation />
      <Navbar />

      <main className="relative z-10">
        <section className="pt-24 sm:pt-32">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
                <Badge className="border-orange-500/30">Embracing the environment</Badge>
                <Badge className="border-green-600/30">Green Innovation</Badge>
                <Badge className="border-black/10">24-hour sprint</Badge>
              </div>

              <div
                className="mt-3 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/80 px-4 py-2 text-xs font-semibold text-slate-900 shadow-sm backdrop-blur"
                role="status"
                aria-live="polite"
              >
                <span className="h-2.5 w-2.5 rounded-full bg-[var(--green)]" />
                {countdown.done ? (
                  <span>Problem Statements Released</span>
                ) : (
                  <span>Problem Statements release in {countdownLabel}</span>
                )}
              </div>

              <h1 className="mt-5 sm:mt-6 text-balance text-3xl font-black tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                Sankalp Bharat Hackathon
              </h1>
              <p className="mt-3 sm:mt-4 text-pretty text-sm leading-relaxed text-slate-700 sm:text-base lg:text-lg">
                A platform for engineering students across India—especially Vidarbha and Maharashtra—
                to solve high-impact problems. Through partnerships with organizations and industry,
                we bridge student innovation with real-world scientific challenges in social causes
                and environmental sustainability.
              </p>

              <div className="mt-6 sm:mt-8 flex flex-col items-center justify-center gap-2.5 sm:gap-3 sm:flex-row">
                <a
                  href="#register"
                  className="inline-flex w-full items-center justify-center rounded-full bg-[var(--orange)] px-6 py-3.5 sm:py-3 text-sm font-semibold text-white shadow-lg shadow-orange-500/25 transition hover:brightness-110 active:scale-[0.98] sm:w-auto"
                >
                  Register now
                </a>
                <a
                  href="#tracks"
                  className="inline-flex w-full items-center justify-center rounded-full border border-black/10 bg-white/70 px-6 py-3.5 sm:py-3 text-sm font-semibold text-slate-900 backdrop-blur transition hover:bg-white active:scale-[0.98] sm:w-auto"
                >
                  Explore themes
                </a>
              </div>

            </div>
          </div>
        </section>

        <section id="tracks" className="py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between gap-6">
              <div>
                <h2 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
                  Core Themes
                </h2>
                <p className="mt-2 text-slate-700">
                  Pick a theme or combine them. We judge on impact, feasibility, and execution.
                </p>
              </div>
              <div className="hidden sm:block">
                <Badge className="border-green-600/30">Open to all skill levels</Badge>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {tracks.map((x) => (
                <Card key={x.title}>
                  <div className="text-base font-bold text-slate-900">{x.title}</div>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{x.desc}</p>
                  <div className="mt-4 h-1 w-full overflow-hidden rounded-full bg-black/5">
                    <div
                      className="h-full w-full rounded-full"
                      style={{
                        background:
                          'linear-gradient(90deg, var(--saffron), var(--orange), var(--green))',
                      }}
                    />
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="schedule" className="pb-16 sm:pb-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <Card className="p-0">
              <div className="grid grid-cols-1 gap-8 p-6 sm:p-8 lg:grid-cols-2">
                <div>
                  <h2 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
                    Timeline
                  </h2>
                  <p className="mt-2 text-slate-700">
                    Designed for momentum: ideate → build → demo.
                  </p>
                  <div className="mt-6 space-y-0">
                    {timeline.map((x, idx) => (
                      <div key={idx} className="relative flex gap-4 pb-6 last:pb-0">
                        <div className="relative flex flex-col items-center">
                          <div className="h-3 w-3 rounded-full bg-[var(--orange)] shadow-[0_0_0_4px_rgba(255,153,51,0.15)]" />
                          {idx !== timeline.length - 1 ? (
                            <div className="mt-1 h-full w-px bg-gradient-to-b from-orange-500/60 via-black/10 to-green-600/60" />
                          ) : null}
                        </div>
                        <div className="flex-1">
                          <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                            {x.t}
                          </div>
                          <div className="mt-1 text-sm font-semibold text-slate-900">
                            {x.label}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-black/10 bg-white/80 p-6 shadow-[0_10px_30px_-20px_rgba(2,6,23,0.35)] backdrop-blur">
                  <div className="text-sm font-semibold text-slate-900">What to bring</div>
                  <ul className="mt-4 space-y-2 text-sm text-slate-700">
                    <li>• Laptop + charger</li>
                    <li>• A problem you care about</li>
                    <li>• A builder mindset</li>
                    <li>• Optional: slides for final demo</li>
                  </ul>
                  <div className="mt-6">
                    <a
                      id="register"
                      href="#"
                      className="inline-flex w-full items-center justify-center rounded-full bg-[var(--green)] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-green-600/25 transition hover:brightness-110 sm:w-auto"
                    >
                      Join the hackathon
                    </a>
                    <div className="mt-2 text-xs text-slate-600">
                      Replace this link with your registration form.
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </section>

        <section id="winners" className="pb-16 sm:pb-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <Card>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
                    Winners
                  </h2>
                  <p className="mt-2 text-slate-700">
                    Hackathon results aren’t out yet. Winners will be announced here after the event.
                  </p>
                </div>
                <Badge className="border-green-600/30">Not live yet</Badge>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 6 }).map((_, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between rounded-2xl border border-dashed border-black/10 bg-white/80 px-4 py-3"
                  >
                    <div className="text-sm font-semibold text-slate-800">
                      Team #{idx + 1}
                    </div>
                    <div className="text-xs font-semibold text-slate-700">TBD</div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </section>

        <footer className="pb-12">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-start justify-between gap-6 rounded-2xl border border-black/10 bg-white/70 p-6 backdrop-blur sm:flex-row sm:items-center">
              <div>
                <div className="text-base font-bold text-slate-900">Sankalp Bharat Hackathon</div>
                <div className="mt-2 inline-flex items-center rounded-full border border-black/10 bg-white/90 px-3 py-1 text-xs font-semibold tracking-wide text-slate-900 shadow-sm">
                  An event by Ascend Club, part of the Zenith Forum.
                </div>
              </div>
              <div className="text-sm text-slate-600">© {new Date().getFullYear()} Sankalp Bharat</div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  )
}
