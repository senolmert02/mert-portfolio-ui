import ScrollReveal from "./ScrollReveal";

export default function Projects() {
  return (
    <section id="projeler" className="min-h-screen flex flex-col items-center justify-center px-6">
      <ScrollReveal>
        <h2 className="text-4xl font-bold mb-12 text-center">Projelerim</h2>
      </ScrollReveal>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full">
        <ScrollReveal>
          <div className="border border-gray-800 rounded-xl overflow-hidden hover:border-gray-600 transition group">
            <div className="h-48 bg-gradient-to-br from-blue-900/50 to-blue-600/30 flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
              <span className="text-5xl">📱</span>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">Kapsül Mobil Uygulama</h3>
              <p className="text-gray-400 mb-4">
                React Native ile geliştirilen kurumsal mobil uygulama. Revizyonlar, yeni özellikler ve yayına çıkma süreçleri.
              </p>
              <div className="flex gap-2">
                <span className="text-sm bg-gray-800 px-3 py-1 rounded-full">React Native</span>
                <span className="text-sm bg-gray-800 px-3 py-1 rounded-full">JavaScript</span>
              </div>
            </div>
          </div>
        </ScrollReveal>
        <ScrollReveal>
          <div className="border border-gray-800 rounded-xl overflow-hidden hover:border-gray-600 transition group">
            <div className="h-48 bg-gradient-to-br from-green-900/50 to-green-600/30 flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
              <span className="text-5xl">⚙️</span>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">Google Workspace Otomasyonları</h3>
              <p className="text-gray-400 mb-4">
                Apps Script ile ~18 otomasyon projesi. Google Sites entegrasyonları ve iş süreçlerinin dijitalleştirilmesi.
              </p>
              <div className="flex gap-2">
                <span className="text-sm bg-gray-800 px-3 py-1 rounded-full">Apps Script</span>
                <span className="text-sm bg-gray-800 px-3 py-1 rounded-full">Google Sites</span>
              </div>
            </div>
          </div>
        </ScrollReveal>
        <ScrollReveal>
          <div className="border border-gray-800 rounded-xl overflow-hidden hover:border-gray-600 transition group">
            <div className="h-48 bg-gradient-to-br from-yellow-900/50 to-yellow-600/30 flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
              <span className="text-5xl">🖥️</span>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">Backend API Geliştirme</h3>
              <p className="text-gray-400 mb-4">
                Mobil ve web uygulamaların ortak Node.js backend projesi. API revizyonları ve deploy süreçleri.
              </p>
              <div className="flex gap-2">
                <span className="text-sm bg-gray-800 px-3 py-1 rounded-full">Node.js</span>
                <span className="text-sm bg-gray-800 px-3 py-1 rounded-full">API</span>
              </div>
            </div>
          </div>
        </ScrollReveal>
        <ScrollReveal>
          <div className="border border-gray-800 rounded-xl overflow-hidden hover:border-gray-600 transition group">
            <div className="h-48 bg-gradient-to-br from-purple-900/50 to-purple-600/30 flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
              <span className="text-5xl">▲</span>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">Portfolyo Sitesi</h3>
              <p className="text-gray-400 mb-4">
                Next.js ve Tailwind CSS ile geliştirdiğim kişisel portfolyo web sitesi. Framer Motion animasyonları.
              </p>
              <div className="flex gap-2">
                <span className="text-sm bg-gray-800 px-3 py-1 rounded-full">Next.js</span>
                <span className="text-sm bg-gray-800 px-3 py-1 rounded-full">Tailwind</span>
              </div>
              <a
                href="https://github.com/senolmert02"
                target="_blank"
                className="mt-4 inline-block text-sm text-gray-500 border border-gray-700 px-4 py-2 rounded-full hover:text-white hover:border-white transition"
              >
                Kodu Gör →
              </a>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
