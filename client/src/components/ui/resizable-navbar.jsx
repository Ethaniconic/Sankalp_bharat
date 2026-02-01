import { cn } from '@/lib/utils'
import { IconMenu2, IconX } from '@tabler/icons-react'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'

export function Navbar({ children, className }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className={cn('fixed inset-x-0 top-0 z-50', className)}
    >
      <div
        className={cn(
          'mx-auto max-w-7xl transition-all duration-300',
          scrolled
            ? 'mx-2 sm:mx-4 lg:mx-auto mt-2 sm:mt-3 px-3 sm:px-4 rounded-2xl bg-gradient-to-r from-orange-50/90 via-white/90 to-green-50/90 shadow-[0_8px_24px_-12px_rgba(2,6,23,0.35)] backdrop-blur-md navbar-surface outline-none'
            : 'mt-3 sm:mt-4 px-3 sm:px-6 lg:px-8'
        )}
      >
        {children}
      </div>
    </motion.nav>
  )
}

export function NavBody({ children, className }) {
  return (
    <div className={cn('hidden md:flex items-center justify-between py-2.5 sm:py-3', className)}>
      {children}
    </div>
  )
}

export function NavItems({ items, className, onItemClick }) {
  return (
    <div className={cn('flex items-center gap-7', className)}>
      {items.map((item) => (
        <a
          key={item.link}
          href={item.link}
          onClick={onItemClick}
          className="text-sm font-semibold text-slate-700 transition hover:text-slate-950"
        >
          {item.name}
        </a>
      ))}
    </div>
  )
}

export function NavbarLogo({ className, imgSrc = '/logo.png', title }) {
  return (
    <a href="#top" className={cn('flex items-center gap-2.5 sm:gap-3', className)}>
      <img
        src={imgSrc}
        alt="Sankalp Bharat Hackathon"
        className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl object-contain"
        draggable={false}
      />
      <div className="leading-tight">
        <div className="text-sm sm:text-base font-extrabold tracking-tight text-slate-950">
          {title}
        </div>
        <div className="text-[11px] sm:text-xs font-semibold text-slate-600">Hackathon</div>
      </div>
    </a>
  )
}

export function NavbarButton({ children, variant = 'primary', className, ...props }) {
  const variants = {
    primary:
      'bg-[var(--orange)] text-white shadow-lg shadow-orange-500/25 hover:brightness-110',
    secondary:
      'bg-white/70 text-slate-900 border border-black/10 hover:bg-white backdrop-blur',
  }

  return (
    <a
      className={cn(
        'inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold transition',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </a>
  )
}

export function MobileNav({ children, className }) {
  return <div className={cn('md:hidden', className)}>{children}</div>
}

export function MobileNavHeader({ children, className }) {
  return (
    <div className={cn('flex items-center justify-between py-2.5', className)}>
      {children}
    </div>
  )
}

export function MobileNavToggle({ isOpen, onClick, className }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={isOpen ? 'Close menu' : 'Open menu'}
      className={cn(
        'inline-flex items-center justify-center rounded-xl border border-black/10 bg-white/70 p-2.5 text-slate-800 backdrop-blur transition hover:bg-white active:scale-95',
        className
      )}
    >
      {isOpen ? <IconX size={24} /> : <IconMenu2 size={24} />}
    </button>
  )
}

export function MobileNavMenu({ isOpen, children, className }) {
  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
          className={cn('overflow-hidden', className)}
        >
          <div className="mt-2 space-y-1 rounded-2xl border border-black/10 bg-white/90 p-4 backdrop-blur">
            {children}
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
