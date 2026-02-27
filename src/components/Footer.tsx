import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-brown-800 to-brown-900 text-brown-200">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-3">
              <Image
                src="/images/logo-espiral.png.jpeg"
                alt="Os Sete Véus"
                width={36}
                height={36}
                className="rounded-full opacity-80"
              />
              <p className="font-serif text-lg text-cream">Os Sete Véus</p>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-brown-300">
              Histórias para quem está pronta para se escolher.
            </p>
          </div>

          <div>
            <p className="font-sans text-[0.7rem] font-medium uppercase tracking-[0.2em] text-brown-400">
              Explorar
            </p>
            <nav className="mt-4 flex flex-col gap-3">
              <Link href="/os-sete-veus" className="text-sm text-brown-300 hover:text-cream">Colecção Espelhos</Link>
              <Link href="/coleccao-nos" className="text-sm text-brown-300 hover:text-cream">Colecção Nós</Link>
              <Link href="/comprar" className="text-sm text-brown-300 hover:text-cream">Comprar</Link>
              <Link href="/ecossistema" className="text-sm text-brown-300 hover:text-cream">Ecossistema</Link>
              <Link href="/sobre" className="text-sm text-brown-300 hover:text-cream">A Vivianne</Link>
              <Link href="/recursos" className="text-sm text-brown-300 hover:text-cream">Recursos Gratuitos</Link>
              <Link href="/livro-fisico" className="text-sm text-brown-300 hover:text-cream">Livro Físico</Link>
              <Link href="/pedir-codigo" className="text-sm text-brown-300 hover:text-cream">Pedir código de acesso</Link>
            </nav>
          </div>

          <div>
            <p className="font-sans text-[0.7rem] font-medium uppercase tracking-[0.2em] text-brown-400">
              Da autora
            </p>
            <p className="mt-4 font-serif text-[15px] italic leading-relaxed text-brown-200">
              &ldquo;Escrevo para quem quer viver, não apenas funcionar.&rdquo;
            </p>
            <p className="mt-2 text-sm text-brown-400">— Vivianne dos Santos</p>
            <div className="mt-6 flex flex-col gap-2">
              <a
                href="mailto:feedback@setecos.com"
                className="text-sm text-brown-300 transition-colors hover:text-cream"
              >
                feedback@setecos.com
              </a>
              <a
                href="https://t.me/viviannedossantos"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-brown-300 transition-colors hover:text-cream"
              >
                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                </svg>
                Telegram
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-brown-700 pt-8 text-center">
          <p className="font-sans text-xs text-brown-500">
            &copy; {new Date().getFullYear()} Vivianne dos Santos. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
