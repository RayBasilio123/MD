# MineDebug Design System

> Identidade visual e diretrizes de design para a **MineDebug Technology** — empresa de tecnologia aplicada à mineração focada em descarbonização, eficiência operacional e monitoramento inteligente de equipamentos pesados.

---

## 1 · Sobre a empresa

**MineDebug** é uma empresa brasileira de tecnologia industrial que desenvolve soluções para o setor de mineração. Áreas de atuação:

- **Descarbonização** — redução de consumo de diesel e emissões em equipamentos pesados (caminhões fora-de-estrada, escavadeiras, pás-carregadeiras).
- **Eficiência operacional** — sensores embarcados, sistemas de dosagem e controle automático.
- **Monitoramento inteligente** — IoT, telemetria, sistemas embarcados em campo.
- **Sistemas embarcados** — gabinetes industriais instalados diretamente nos equipamentos da mina.

O produto vive **em ambiente hostil**: poeira vermelha, vibração, calor, lama, óleo. O design precisa refletir isso — robusto, técnico, legível em qualquer condição.

---

## 2 · Fontes (sources fornecidas)

| Asset | Origem | Uso na DS |
| --- | --- | --- |
| `assets/logo.jpeg` (raster) + `assets/logo.svg` (recriado) | Upload do usuário | Logo principal — marca circular preta + verde neon |
| `assets/equipamento.jpeg` | Foto de campo | Gabinete instalado em caminhão, mostra produto físico |
| `assets/instalacao-simples.jpeg` | Foto de campo | Equipe técnica em instalação — referência humana / EPI |
| `assets/vista-equipamento.jpeg` | Foto de campo | Gabinete branco em caminhão Iveco com lama |
| `assets/robson-csn.jpeg` | Foto institucional | CEO/técnico em campo (CSN) — referência de personagem |

> ⚠️ **Observação:** não havia codebase, Figma ou website público disponíveis. O sistema visual foi derivado **do logotipo + fotografias de campo** + descrição da empresa. Diversas decisões (tipografia, escala de cinzas, motion) são propostas iniciais e devem ser validadas com o cliente.

---

## 3 · Index — onde está o quê

```
/
├── README.md                       ← você está aqui
├── SKILL.md                        ← contrato de skill (Claude Code compatível)
├── colors_and_type.css             ← tokens (cores, tipografia, spacing, shadows)
│
├── assets/
│   ├── logo.svg                    ← logotipo vetorial (recriado a partir do JPEG)
│   ├── logo.jpeg                   ← logo original (raster)
│   ├── equipamento.jpeg            ← fotos de campo
│   ├── instalacao-simples.jpeg
│   ├── vista-equipamento.jpeg
│   └── robson-csn.jpeg
│
├── preview/                        ← cards do Design System (registrados via assets)
│   ├── colors-*.html
│   ├── type-*.html
│   ├── components-*.html
│   └── ...
│
└── ui_kits/
    └── operations/                 ← Painel de operações (mock — sem código-fonte do cliente)
        ├── README.md
        ├── index.html
        └── *.jsx
```

---

## 4 · CONTENT FUNDAMENTALS

> Como a MineDebug **fala**. Tom de voz, copy, casing.

### 4.1 — Idioma
**Português brasileiro técnico** é o idioma primário. Mercado-alvo: mineradoras brasileiras (Vale, CSN, Anglo American, MRN, Samarco, Gerdau). Uso secundário em inglês para documentação de engenharia (firmware, datasheets, APIs). **Nunca** usar inglês "marketing-ês" (ex: "unleash", "empower") — soa estranho para engenheiro de manutenção em mina.

### 4.2 — Pessoa
- Em comunicação institucional / website: **3ª pessoa** ("a MineDebug desenvolve…", "a tecnologia reduz…").
- Em interface de produto: **imperativo direto** ("Instale o sensor", "Verifique a dosagem", "Confirme a calibração"). Como manual técnico — não amigável, **claro**.
- Em dashboards: **descritivo neutro** ("Consumo médio: 47.2 L/h", "Sensor offline há 12 min").

### 4.3 — Tom (vibe)
- **Engenheiro experiente, não vendedor.** Confiança técnica vem antes de entusiasmo.
- **Mensurável > adjetivado.** Em vez de "ótima eficiência", dizer "redução de 8–14% no consumo de diesel".
- **Direto.** Frases curtas. Verbos no presente. Sem jargão de startup.
- **Respeitoso com o operador.** O usuário final é técnico de campo — chama-se ele de **"operador"** ou **"técnico"**, nunca "user".

### 4.4 — Casing
- **Títulos H1/H2:** Sentence case ("Monitoramento de frota", não "Monitoramento De Frota").
- **Botões:** Sentence case curto ("Iniciar diagnóstico", "Exportar relatório").
- **Labels de telemetria / status:** **UPPERCASE + mono** ("ONLINE", "ALERTA", "CONSUMO 24H"). Evoca painel industrial.
- **Códigos de equipamento:** mono, exatamente como cliente registra ("CAM-407", "PC-1250-A").

### 4.5 — Emoji
**Não usar emoji** em interface de produto, comunicação institucional ou documentação. O contexto é industrial. Substituir por:
- Ícones SVG monocromáticos (estilo Lucide / fluentes, ver §ICONOGRAPHY).
- Pastilhas coloridas de status (verde / âmbar / vermelho).
- Numerais com unidade (`47.2 L/h`).

Em redes sociais (Instagram, LinkedIn): **uso moderado** permitido para humanizar — mas evitar o "🚀✨" de tech brand. Preferir 🛢️ ⛏️ 📊 quando contextual.

### 4.6 — Exemplos concretos

✅ **Bom**
- "Reduza o consumo de diesel em até 14% nos seus caminhões fora-de-estrada."
- "Sensor MD-220 instalado. Última leitura há 4s."
- "Dosagem fora da faixa. Verifique a linha de aditivo."
- "47.2 L/h" (com unidade, mono)

❌ **Evitar**
- "🚀 Revolucione sua operação com nossa plataforma!" (marketing-ês + emoji)
- "Oi! Tudo bem? Que tal começar?" (informal demais para B2B industrial)
- "Awesome insights" (inglês desnecessário)
- "47,2" sem unidade — sempre acompanhar de unidade SI.

---

## 5 · VISUAL FOUNDATIONS

### 5.1 — Cores
A paleta nasce do **logo: preto + verde neon**. O verde é um *signal color* — usado com parcimônia, sempre indicando **ação, ativo, ok**. O resto do sistema é uma escala fria de cinzas (slate ligeiramente azulado) — neutro industrial.

| Token | Uso |
|---|---|
| `--md-green-500` `#19E27A` | Marca, CTA primário, status OK, focus ring |
| `--md-black` `#0A0A0A` | Fundo do logo, modo escuro full-bleed |
| `--md-ink-900..050` | Escala neutra (texto, fundos, borders) |
| `--md-warning` `#F5B73A` | Alerta âmbar (combustível, calor) |
| `--md-danger` `#F25C54` | Falha / parada de emergência |
| `--md-info` `#4DA3FF` | Telemetria informativa |
| `--md-hi-vis` `#E5F03A` | Callout de segurança (vest amarelo) |
| `--md-rust` `#B25A2E` | Tinta quente — referência minério/lama |

**Modo escuro é primário** para dashboards de operação (sala de controle, telão de mina). Modo claro para documentos, relatórios, marketing.

### 5.2 — Tipografia
- **Display / H1:** `Inter 800` ou `JetBrains Mono 700 UPPERCASE` para evocar painel digital.
- **Body:** `Inter 400/500`. Industrial, neutro, ótima legibilidade em telas pequenas e em campo.
- **Mono / dados / código:** `JetBrains Mono` — tabular, símbolos lindos, identidade "debug" alinhada ao nome.
- **Substituição flagada:** sem font-files do cliente, ambas vêm do Google Fonts. **Pedimos ao usuário:** se houver fonte oficial, substituir.

### 5.3 — Layout & spacing
- **Grade de 4px.** Tokens `--s-1` (4) até `--s-9` (96).
- **Densidade alta** em dashboards (linhas de 36–40px), **densidade confortável** em marketing (containers 1280px max, padding 64–96px).
- **Linhas de hairline** (`var(--hairline)`, 1px) para separar dados — não cards excessivamente "fofos".
- **Elementos fixos:** topbar 56px, sidebar 240px, footer status 28px (em dashboards).

### 5.4 — Backgrounds & imagery
- **Fotografia de campo é o herói.** Fotos cruas de equipamento na mina — lama, sol forte, EPI amarelo, poeira vermelha. **Não tratar com filtros artísticos.** Preferir alto contraste, cor real.
- **Não** usar gradientes coloridos elaborados, não usar ilustrações stock corporate, não usar 3D brilhante.
- **Permitido:** background preto liso, grid técnico sutil (linhas 1px em `rgba(255,255,255,.04)`), foto full-bleed escurecida com overlay preto 40–60%.
- **Evitar:** gradientes blue→purple, glassmorphism exagerado, blobs orgânicos coloridos.

### 5.5 — Borders & cards
- **Cards:** fundo `--surface`, border 1px `--border`, radius `--r-3` (8px). Sem sombra na maioria dos casos — apenas em modais e menus flutuantes.
- **Elementos críticos** (alertas, comando de emergência) ganham `border-width: 2px` na cor semântica.
- **Dashboards densos:** preferir hairline divider em vez de cards aninhados.

### 5.6 — Radii
**Pequenos.** O hardware é industrial (gabinetes retangulares, parafusos). Reflito isso:
- Buttons / inputs: `--r-2` (4px)
- Cards: `--r-3` (8px)
- Cards grandes / modais: `--r-4` (12px) máximo
- Pills de status: `--r-pill`
- **Não usar `border-radius: 24px+`** — destoa do produto físico.

### 5.7 — Shadows / elevação
- **Subtle.** Sombras quase sempre 1–3 níveis (`--shadow-1`, `-2`, `-3`).
- **Glow verde** (`--shadow-glow`) reservado para focus ring e estados ativos (`box-shadow: 0 0 0 4px var(--md-green-glow)`).
- **Inset shadow** (`--shadow-inset`) em superfícies escuras pressionadas.
- Modo escuro: sombras pretas mais opacas (até `.55` alpha).

### 5.8 — Hover & press states
- **Hover (botão primário):** `--md-green-400` (mais claro), sem mudança de tamanho.
- **Hover (botão secundário / link):** background ganha 4–8% de overlay (`rgba(0,0,0,.04)` claro / `rgba(255,255,255,.06)` escuro).
- **Hover (card clicável):** border passa de `--border` para `--border-strong`, sombra sobe 1 nível.
- **Press / active:** `--md-green-600` (mais escuro) + `transform: translateY(1px)` (1px só, sutil).
- **Disabled:** opacity 0.4, cursor not-allowed, sem hover.
- **Focus ring:** SEMPRE 4px de `--md-green-glow` em volta. Acessibilidade não é negociável.

### 5.9 — Transparência e blur
- **Overlay modal:** `rgba(10,10,10,0.6)` + `backdrop-filter: blur(8px)` (modo claro) / `rgba(10,10,10,0.8)` + blur 12px (modo escuro).
- **Topbar fixa em scroll:** background `rgba(10,10,10,0.85)` + blur 12px no modo escuro. Fica "premium" sem ser pretensioso.
- **Não** usar glass em cards normais — só em chrome (top, side).

### 5.10 — Motion
- **Easings:** `--ease-out` para entrada, `--ease-in-out` para mudanças de estado.
- **Durations:** rápido (120ms) para hover/focus, base (200ms) para abrir/fechar, slow (320ms) reservado para transições maiores.
- **Não bouncy.** Sem spring exagerado, sem pulsação. O contexto é industrial — animação serve para feedback funcional, não para entreter.
- **Permitido:** fade + slide curto (8–12px), telemetria que "tick" como medidor, sparklines animados em mount.
- **Evitar:** parallax, scroll-jacking, micro-animações decorativas, lottie elaborados.

### 5.11 — Iconografia
Ver seção dedicada abaixo (§6).

---

## 6 · ICONOGRAPHY

### Abordagem
- **SVG monocromático, stroke-based, 1.5–2px.** Estilo "técnico" — alinhado ao logo (que é stroke).
- **Não usar emoji** em produto.
- **Não usar ícone bitmap (PNG)** exceto para o próprio logo em redes sociais.

### Sistema recomendado
**[Lucide](https://lucide.dev)** via CDN é a escolha base. Razões:
1. Stroke 2px, geometria limpa — match visual com o logo.
2. Cobertura completa: `truck`, `gauge`, `fuel`, `cpu`, `radio`, `activity`, `alert-triangle`, `wrench`, `map-pin`, `zap`.
3. SVG inline, recolorível via `currentColor`.
4. Open source MIT.

```html
<!-- via CDN -->
<script src="https://unpkg.com/lucide@latest/dist/umd/lucide.js"></script>
<i data-lucide="gauge" style="color: var(--accent); width:20px; height:20px;"></i>
<script>lucide.createIcons();</script>
```

> ⚠️ **Substituição flagada:** sem icon-set proprietário do cliente, **adotamos Lucide como padrão**. Se a MineDebug tiver biblioteca própria, substituir aqui.

### Tamanhos canônicos
| Token | Px | Uso |
|---|---|---|
| `icon-xs` | 14 | inline em texto pequeno |
| `icon-sm` | 16 | inline em body |
| `icon-md` | 20 | botões, listas, default |
| `icon-lg` | 24 | headers de card, navegação |
| `icon-xl` | 32+ | empty states, hero |

### Ícones-chave do domínio
A MineDebug deve ter um set curado para o domínio mineração:
`truck` `gauge` `fuel` `activity` `cpu` `radio` `signal` `alert-triangle` `shield-check` `wrench` `map-pin` `factory` `battery-charging` `leaf` (descarbonização) `zap` (energia).

### Logotipo — quando usar
- **Logo completo (círculo + texto):** redes sociais, capa de relatório, splash.
- **Glyph apenas (gear+bug central):** favicon, app icon, watermark em footer.
- **Wordmark "MINEDEBUG":** topo de website, header de e-mail.
- **Nunca:** distorcer, mudar cor do verde para outra (apenas preto/branco/verde brand).

---

## 7 · UI Kits

| Kit | Caminho | Status |
|---|---|---|
| **Operations Dashboard** | `ui_kits/operations/` | Mock baseado em descrição (sem código-fonte do cliente — flagado) |

---

## 8 · Caveats & Iterações

Coisas que **podem precisar de ajuste** com input do cliente:

1. **Tipografia** — Inter + JetBrains Mono são propostas. Se houver fonte corporativa, substituir.
2. **Ícones** — Lucide via CDN. Se há set proprietário, substituir.
3. **Modo escuro vs claro** — assumimos dashboards em dark, marketing em light. Validar.
4. **Voz / copy em PT-BR** — exemplos derivados de inferência sobre setor B2B industrial. Validar com time de marketing.
5. **Logo SVG** — recriado a partir do JPEG. Pixel-perfect só com vetor original do cliente.
6. **UI Kit** — não há produto/Figma para copiar; o que está em `ui_kits/` é uma **proposta de identidade aplicada**, não recriação.
