import { useEffect, useMemo, useState } from 'react'
import {
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
  NavBody,
  NavItems,
  Navbar,
  NavbarButton,
  NavbarLogo,
} from '@/components/ui/resizable-navbar'
import { IconMoon, IconSun } from '@tabler/icons-react'

export default function SiteNavbar() {
  const items = useMemo(
    () => [
      { name: 'Themes', link: '#tracks' },
      { name: 'Schedule', link: '#schedule' },
      { name: 'Winners', link: '#winners' },
      { name: 'Register', link: '#register' },
    ],
    []
  )

  const [isOpen, setIsOpen] = useState(false)
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    const stored = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const nextTheme = stored || (prefersDark ? 'dark' : 'light')
    setTheme(nextTheme)
    document.documentElement.dataset.theme = nextTheme
  }, [])

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    document.documentElement.dataset.theme = next
    localStorage.setItem('theme', next)
  }

  return (
    <Navbar>
      <NavBody>
        <NavbarLogo title="Sankalp Bharat" />
        <NavItems items={items} />
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle color mode"
            className="theme-toggle relative inline-flex h-9 w-16 items-center rounded-full border border-black/10 bg-white/70 px-1 backdrop-blur transition"
          >
            <span className="theme-toggle-icon absolute left-2 text-slate-500">
              <IconMoon size={14} />
            </span>
            <span className="theme-toggle-sun absolute right-2 text-amber-500">
              <IconSun size={14} />
            </span>
            <span
              className={
                'inline-flex h-7 w-7 items-center justify-center rounded-full bg-white shadow transition-transform ' +
                (theme === 'dark' ? 'translate-x-7' : 'translate-x-0')
              }
            />
          </button>
          <NavbarButton variant="secondary" href="#tracks">
            View themes
          </NavbarButton>
          <NavbarButton href="#register">Register</NavbarButton>
        </div>
      </NavBody>

      <MobileNav>
        <MobileNavHeader>
          <NavbarLogo title="Sankalp Bharat" />
          <MobileNavToggle isOpen={isOpen} onClick={() => setIsOpen((v) => !v)} />
        </MobileNavHeader>
        <MobileNavMenu isOpen={isOpen}>
          <div className="space-y-1">
            {items.map((it) => (
              <a
                key={it.link}
                href={it.link}
                className="block rounded-xl px-4 py-3 text-base font-semibold text-slate-800 hover:bg-black/5 active:bg-black/10 transition"
                onClick={() => setIsOpen(false)}
              >
                {it.name}
              </a>
            ))}
          </div>
          <div className="mt-3 flex items-center justify-between rounded-xl border border-black/10 bg-white/70 px-3 py-2 backdrop-blur">
            <div className="text-sm font-semibold text-slate-800">Theme</div>
            <button
              type="button"
              onClick={toggleTheme}
              aria-label="Toggle color mode"
              className="theme-toggle relative inline-flex h-9 w-16 items-center rounded-full border border-black/10 bg-white/70 px-1 backdrop-blur transition"
            >
              <span className="theme-toggle-icon absolute left-2 text-slate-500">
                <IconMoon size={14} />
              </span>
              <span className="theme-toggle-sun absolute right-2 text-amber-500">
                <IconSun size={14} />
              </span>
              <span
                className={
                  'inline-flex h-7 w-7 items-center justify-center rounded-full bg-white shadow transition-transform ' +
                  (theme === 'dark' ? 'translate-x-7' : 'translate-x-0')
                }
              />
            </button>
          </div>
          <div className="mt-3 flex gap-2">
            <NavbarButton className="w-full py-3 text-base" href="#register" onClick={() => setIsOpen(false)}>
              Register
            </NavbarButton>
          </div>
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  )
}
