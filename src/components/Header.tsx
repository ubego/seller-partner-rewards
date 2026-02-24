import Link from 'next/link';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 h-[80px] bg-[var(--ubego-primary)] px-8 flex items-center justify-between shadow-md">
      <div className="text-2xl font-bold text-white tracking-wider">
        Ubego
      </div>
      
      <nav className="hidden md:flex space-x-6">
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
