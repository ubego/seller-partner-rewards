import Link from 'next/link';
import { User } from 'lucide-react';

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

      <div className="flex items-center space-x-4">
        <button className="bg-white/20 p-2 rounded-full hover:bg-white/30 transition-colors">
          <User className="text-white w-6 h-6" />
        </button>
      </div>
    </header>
  );
}
