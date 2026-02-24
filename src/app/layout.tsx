import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: "Ubego Children's Service Calculator",
  description: "Калькулятор премии для продавцов-партнеров Ubego",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
