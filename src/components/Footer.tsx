import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-warm-200 bg-warm-100">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-3">
          {/* Brand */}
          <div>
            <p className="font-serif text-lg text-warm-800">Os Sete Véus</p>
            <p className="mt-3 text-sm leading-relaxed text-warm-500">
              Histórias para quem está pronta para se escolher.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-warm-400">
              Explorar
            </p>
            <nav className="mt-4 flex flex-col gap-3">
              <Link href="/os-sete-veus" className="text-sm text-warm-600 hover:text-warm-900">
                A Colecção
              </Link>
              <Link href="/sobre" className="text-sm text-warm-600 hover:text-warm-900">
                A Vivianne
              </Link>
              <Link href="/recursos" className="text-sm text-warm-600 hover:text-warm-900">
                Recursos Gratuitos
              </Link>
              <Link href="/artigos" className="text-sm text-warm-600 hover:text-warm-900">
                Artigos
              </Link>
            </nav>
          </div>

          {/* Signature */}
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-warm-400">
              Da autora
            </p>
            <p className="mt-4 font-serif text-sm italic leading-relaxed text-warm-600">
              &ldquo;Escrevo para quem quer viver, não apenas funcionar.&rdquo;
            </p>
            <p className="mt-2 text-sm text-warm-500">— Vivianne dos Santos</p>
          </div>
        </div>

        <div className="mt-12 border-t border-warm-200 pt-8 text-center">
          <p className="text-xs text-warm-400">
            &copy; {new Date().getFullYear()} Vivianne dos Santos. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
