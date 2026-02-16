// Ícone da Colecção Nós — 7 fios que convergem num ponto central
// Extraído de icone-coleccao.html (design original da autora)

export default function NosCollectionIcon({ size = 120, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      className={className}
    >
      <circle cx="100" cy="100" r="92" fill="none" stroke="#c9b99a" strokeWidth="0.4" opacity="0.2" />
      <circle cx="100" cy="100" r="86" fill="none" stroke="#c9b99a" strokeWidth="0.25" opacity="0.12" />
      {/* 7 fios — cada um a cor de um Nó */}
      <path d="M 100 12 Q 60 45, 85 78 Q 95 93, 100 100 Q 105 107, 120 82 Q 140 55, 100 12" fill="none" stroke="#c9956a" strokeWidth="1.3" opacity="0.65" strokeLinecap="round" />
      <path d="M 36 42 Q 55 52, 80 80 Q 93 93, 100 100 Q 107 107, 125 88 Q 150 65, 164 42" fill="none" stroke="#6a9dbe" strokeWidth="1.3" opacity="0.65" strokeLinecap="round" />
      <path d="M 16 88 Q 45 78, 78 86 Q 92 93, 100 100 Q 108 107, 122 114 Q 155 122, 184 88" fill="none" stroke="#d06a6a" strokeWidth="1.3" opacity="0.65" strokeLinecap="round" />
      <path d="M 28 142 Q 50 118, 82 104 Q 93 100, 100 100 Q 107 100, 118 96 Q 150 78, 172 142" fill="none" stroke="#aa7abb" strokeWidth="1.3" opacity="0.65" strokeLinecap="round" />
      <path d="M 52 178 Q 62 145, 86 112 Q 94 103, 100 100 Q 106 97, 114 88 Q 138 55, 148 178" fill="none" stroke="#6a9e9e" strokeWidth="1.3" opacity="0.65" strokeLinecap="round" />
      <path d="M 82 190 Q 80 155, 92 118 Q 97 106, 100 100 Q 103 94, 108 82 Q 120 45, 118 190" fill="none" stroke="#c4905a" strokeWidth="1.3" opacity="0.55" strokeLinecap="round" />
      <path d="M 100 192 Q 95 155, 97 120 Q 99 108, 100 100 Q 101 92, 103 80 Q 105 45, 100 8" fill="none" stroke="#5aaa7a" strokeWidth="1.1" opacity="0.45" strokeLinecap="round" />
      {/* Centro */}
      <circle cx="100" cy="100" r="14" fill="none" stroke="#c9b99a" strokeWidth="0.7" opacity="0.4" />
      <circle cx="100" cy="100" r="7" fill="none" stroke="#c9b99a" strokeWidth="0.45" opacity="0.28" />
      <circle cx="100" cy="100" r="3" fill="#c9b99a" opacity="0.4" />
      {/* 7 pontos — um por Nó */}
      <circle cx="100" cy="80" r="2.5" fill="#c9956a" opacity="0.7" />
      <circle cx="118" cy="86" r="2.5" fill="#6a9dbe" opacity="0.7" />
      <circle cx="120" cy="106" r="2.5" fill="#d06a6a" opacity="0.7" />
      <circle cx="110" cy="120" r="2.5" fill="#aa7abb" opacity="0.7" />
      <circle cx="90" cy="120" r="2.5" fill="#6a9e9e" opacity="0.7" />
      <circle cx="80" cy="106" r="2.5" fill="#c4905a" opacity="0.7" />
      <circle cx="82" cy="86" r="2.5" fill="#5aaa7a" opacity="0.7" />
    </svg>
  );
}
