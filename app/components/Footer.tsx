export default function Footer() {
    return (
      <footer className="border-t border-gray-800 py-12 px-6">
        <div className="max-w-4xl mx-auto flex flex-row justify-between items-center">
          <div>
            <p className="text-white text-xl font-bold">Şenol Mert Şar</p>
            <p className="text-gray-500 mt-1">Software Developer</p>
          </div>
          <div className="flex gap-6">
            <a
              href="https://github.com/senolmert02"
              target="_blank"
              className="text-gray-400 hover:text-white transition"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/%C5%9Fenol-mert-%C5%9Far-86140a261"
              target="_blank"
              className="text-gray-400 hover:text-white transition"
            >
              LinkedIn
            </a>
            <a
              href="mailto:sarsenolmert@gmail.com"
              className="text-gray-400 hover:text-white transition"
            >
              E-posta
            </a>
          </div>
          <p className="text-gray-600 text-sm">© 2026 Şenol Mert Şar</p>
        </div>
      </footer>
    );
  }
  