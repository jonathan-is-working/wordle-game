<div align="center">

# 🟩 Wordle

**A sleek, responsive, and beautifully animated modern Wordle clone.**  
*Built with Next.js 16 (Turbopack), React 19, Tailwind CSS v4, and Framer Motion.*

[![CI](https://img.shields.io/github/actions/workflow/status/jonathan-is-working/wordle-game/ci.yml?branch=main&style=for-the-badge&logo=githubactions&logoColor=white&label=CI)](https://github.com/jonathan-is-working/wordle-game/actions)
[![Language](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Framework](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![License](https://img.shields.io/badge/License-MIT%20%2F%20Apache--2.0-blue?style=for-the-badge)](#-license)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen?style=for-the-badge)](CONTRIBUTING.md)

<p align="center">
  <a href="#-features">Features</a> •
  <a href="#-quick-start">Quick Start</a> •
  <a href="#-architecture">Architecture</a> •
  <a href="#-contributing">Contributing</a> •
  <a href="#-license">License</a>
</p>

</div>

---

## ⚠️ Disclaimer

> [!WARNING]
> This is an independent open-source recreation created for educational and entertainment purposes. It is not affiliated with, endorsed, or sponsored by The New York Times Company or the original creator of Wordle.

---

## ✨ Features

- **🎯 Authentic Wordle Mechanics**: Accurate duplicate letter evaluation algorithm (green priority matches, yellow count limits, and absent tracking).
- **🎨 Fluid Micro-Interactions**: Realistic 3D flip card animations with staggered delay, shake feedback on invalid words, and celebratory confetti upon victory.
- **⏱️ Live Game Timer**: Real-time solve timer tracking your duration from the first guess to completion.
- **🌓 Adaptive Theming**: Built-in dark and light mode powered by OKLCH color palettes and system preference detection.
- **📱 Universal Responsiveness**: Interactive virtual keyboard with live letter states and full physical keyboard listener support for desktop and mobile.
- **⚡ Zero Latency & Offline Ready**: Embedded dictionaries containing 2,300+ target solution words and 10,000+ valid guess words with no external API latency.
- **🔗 Score Sharing**: 1-click clipboard score sharing to challenge friends with your completion time.

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 20.x or higher
- **pnpm** (recommended) or npm / yarn

### Installation & Run

```bash
# 1. Clone the repository
git clone https://github.com/jonathan-is-working/wordle-game.git
cd wordle

# 2. Install dependencies
pnpm install

# 3. Start the development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Commands

```bash
pnpm dev        # Start development server with Turbopack
pnpm build      # Compile production build & check TypeScript types
pnpm start      # Run production server
pnpm lint       # Run ESLint 9 checks
pnpm typecheck  # Run strict TypeScript compiler checks (noEmit)
```

---

## 🏗️ Architecture

```text
wordle/
├── .github/
│   └── workflows/
│       └── ci.yml             # GitHub Actions CI workflow (lint, typecheck, build)
├── app/
│   ├── globals.css            # Tailwind CSS v4 variables & OKLCH color theme
│   ├── layout.tsx             # Root layout, Open Graph metadata & ThemeProvider
│   └── page.tsx               # Core game loop & state management
├── components/
│   ├── game-timer.tsx         # Live game stopwatch
│   ├── how-to-play-modal.tsx  # Game rules & visual tile examples
│   ├── keyboard-key.tsx       # Virtual keyboard individual key button
│   ├── main-menu.tsx          # Animated title splash screen
│   ├── settings-modal.tsx     # Theme switcher modal
│   ├── theme-provider.tsx     # Next-themes client provider
│   ├── wordle-grid.tsx        # 6-row guessing grid
│   ├── wordle-keyboard.tsx    # QWERTY on-screen keyboard
│   └── wordle-tile.tsx        # Individual animated letter tile
├── lib/
│   ├── utils.ts               # Classname utilities (clsx + tailwind-merge)
│   ├── word-utils.ts          # Wordle validation & letter matching algorithm
│   └── words.ts               # Curated target and valid word dictionaries
├── public/                    # Web app icons and favicons
├── eslint.config.mjs          # ESLint 9 flat configuration
├── next.config.mjs            # Next.js 16 configuration
├── package.json               # Package manifest (12 lightweight dependencies)
├── tsconfig.json              # TypeScript configuration
├── LICENSE-APACHE             # Apache 2.0 License
├── LICENSE-MIT                # MIT License
└── README.md                  # Documentation
```

---

## 🤝 Contributing

Issues and PRs are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md).

---

## 📜 License

Dual-licensed under [MIT](LICENSE-MIT) or [Apache-2.0](LICENSE-APACHE), at your option.

<div align="center">
  <sub>Built with Next.js 16, React 19, and Tailwind CSS v4. If this project helps you, consider starring the repository.</sub>
</div>
