import Link from 'next/link';
import { Paytone_One } from 'next/font/google';

const paytoneOne = Paytone_One({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
});

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 min-h-[80px] bg-[var(--ubego-primary)] px-4 py-3 md:px-8 flex items-center justify-between gap-6 shadow-md">
      <div className={`${paytoneOne.className} text-2xl text-white tracking-wide shrink-0`}>
        Ubego
      </div>

      <div className="flex-1 flex justify-center" aria-label="Воронка продаж">
        <div className="flex sm:hidden items-center gap-1 text-[9px] font-bold uppercase tracking-tight text-white">
          <span>Встречи</span>
          <span className="text-white/60" aria-hidden="true">→</span>
          <span>Пилотные</span>
          <span className="text-white/60" aria-hidden="true">→</span>
          <span>Полные</span>
        </div>
        <div className="hidden sm:flex items-center gap-2 md:gap-4 text-[10px] md:text-xs font-bold uppercase tracking-wider text-white">
          <span>Квалифицированные встречи</span>
          <span className="text-white/60" aria-hidden="true">→</span>
          <span>Пилотные договоры</span>
          <span className="text-white/60" aria-hidden="true">→</span>
          <span>Полные договоры</span>
        </div>
      </div>

      <nav className="hidden md:flex space-x-6 shrink-0">
        <Link 
          href="https://ubego.quest" 
          className="text-white font-medium hover:scale-105 transition-transform duration-200"
        >
          ubego.quest
        </Link>
      </nav>
    </header>
  );
}
