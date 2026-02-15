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
              <Link href="/ecossistema" className="text-sm text-brown-300 hover:text-cream">Ecossistema</Link>
              <Link href="/os-sete-veus" className="text-sm text-brown-300 hover:text-cream">A Colecção</Link>
              <Link href="/para-quem" className="text-sm text-brown-300 hover:text-cream">Para Quem</Link>
              <Link href="/sobre" className="text-sm text-brown-300 hover:text-cream">A Vivianne</Link>
              <Link href="/recursos" className="text-sm text-brown-300 hover:text-cream">Recursos Gratuitos</Link>
              <Link href="/experiencias" className="text-sm text-brown-300 hover:text-cream">Experiências</Link>
              <Link href="/artigos" className="text-sm text-brown-300 hover:text-cream">Artigos</Link>
              <Link href="/livro-fisico" className="text-sm text-brown-300 hover:text-cream">Livro Físico</Link>
              <Link href="/semente" className="text-sm text-brown-300 hover:text-cream">Plantar Semente &#127793;</Link>
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
