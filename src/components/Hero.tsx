'use client';

import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="relative h-[60vh] w-full bg-[var(--ubego-bg)] flex flex-col justify-center items-center overflow-hidden">
      {/* Background Illustrations Placeholder - Using CSS shapes for cartoonish vibe */}
      <motion.div 
        className="absolute top-10 left-10 w-32 h-32 bg-white/30 rounded-full blur-xl"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div 
        className="absolute bottom-20 right-20 w-48 h-48 bg-yellow-300/30 rounded-full blur-xl"
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-4xl md:text-6xl font-extrabold uppercase text-[var(--ubego-accent)] mb-4 tracking-tight drop-shadow-sm"
        >
          Калькулятор Премии
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-lg md:text-2xl text-[var(--ubego-text-primary)] font-medium max-w-2xl mx-auto leading-relaxed"
        >
          Рассчитайте своё вознаграждение за подключение музеев и квестов
        </motion.p>
      </div>

      {/* Decorative Cloud-like shapes */}
      <div className="absolute bottom-0 w-full h-24 bg-gradient-to-t from-white/20 to-transparent pointer-events-none" />
    </section>
  );
}
