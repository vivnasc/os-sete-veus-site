# Ícones do PWA - Os 7 Véus

## Como Gerar os Ícones

Os ícones PNG devem ser gerados a partir do ficheiro `icon.svg` incluído nesta pasta.

### Tamanhos Necessários
- icon-16.png (16x16)
- icon-32.png (32x32)
- icon-72.png (72x72)
- icon-96.png (96x96)
- icon-128.png (128x128)
- icon-144.png (144x144)
- icon-152.png (152x152)
- icon-192.png (192x192)
- icon-384.png (384x384)
- icon-512.png (512x512)

### Ferramenta Recomendada

Pode usar ferramentas online como:
- https://realfavicongenerator.net/
- https://maskable.app/editor
- https://www.pwabuilder.com/imageGenerator

Ou via linha de comando com ImageMagick:
```bash
for size in 16 32 72 96 128 144 152 192 384 512; do
  convert icon.svg -resize ${size}x${size} icon-${size}.png
done
```

### Screenshots

Para screenshots do manifest.json:
- screenshot-wide.png (1280x720) - Vista desktop
- screenshot-narrow.png (750x1334) - Vista mobile

## Cores da Marca

- Cor primária: #FF1A75
- Cor secundária: #9719ff
- Fundo escuro: #0a0a0f
