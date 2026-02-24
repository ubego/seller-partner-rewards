export default function Footer() {
  return (
    <footer className="w-full bg-slate-800 text-slate-300 py-8 mt-12">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Ubego - квест-экскурсии в реальной жизни. Все права защищены.
        </p>
      </div>
    </footer>
  );
}
