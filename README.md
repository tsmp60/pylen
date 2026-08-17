# Pylen - Learn Python for Free

**Pylen** is a completely free, open-source Python learning platform built for anyone who wants to learn programming without paying subscription fees. Learn Python fundamentals through interactive lessons, challenges, and hands-on exercises—all in your browser.

## Why Pylen?

I built Pylen because I was tired of learning platforms charging money for knowledge. Python is a powerful language that should be accessible to everyone. Whether you're a complete beginner or looking to brush up on your skills, Pylen offers:

- **Completely Free** — No subscriptions, no paywalls, no hidden costs
- **19 Units & 76 Exercises** — Comprehensive curriculum covering Python fundamentals
- **Interactive Learning** — Write and run Python code directly in your browser
- **Progress Tracking** — Track your learning journey with streaks and XP rewards
- **No Account Required** — All progress saved locally on your device
- **Open Source** — Use the code for your own projects or learning

---

## Quick Start

### Prerequisites

- **Node.js** (v16 or higher recommended)
- **npm** (comes with Node.js)
- A modern web browser (Chrome, Firefox, Safari, Edge)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/tsmp60/pylen.git
   cd pylen
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

### Configuration

The project is pre-configured and ready to run. No additional setup is needed. All configuration files are included:

- `vite.config.ts` — Build and dev server configuration
- `tailwind.config.js` — Styling configuration
- `tsconfig.json` — TypeScript configuration

### Running the Project

#### Development Mode
Start the development server with hot module replacement:

```bash
npm run dev
```

The application will open at `http://localhost:5173` (or the next available port).

#### Production Build
Create an optimized production build:

```bash
npm run build
```

The build output will be in the `dist/` directory.

#### Preview Build
Preview the production build locally:

```bash
npm run preview
```

#### Linting
Check code quality:

```bash
npm run lint
```

---

## How It Works

Pylen uses **Pyodide** to run Python code directly in your browser—no server needed. Each exercise lets you:

1. Read the lesson and story challenge
2. Write Python code in the editor
3. Run and test your code instantly
4. Get instant feedback and hints
5. Earn XP as you progress

All your progress is saved locally in your browser.

---

## Project Structure

```
pylen/
├── src/
│   ├── components/        # React UI components
│   ├── data/              # Curriculum and exercise data
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Python runtime utilities
│   ├── workers/           # Web Workers for Python execution
│   ├── App.tsx            # Main application
│   └── index.css           # Global styles
├── public/                # Static assets
├── vite.config.ts         # Vite configuration
├── tailwind.config.js     # Tailwind CSS configuration
└── tsconfig.json          # TypeScript configuration
```

---

## Using Pylen's Code

I encourage you to use this code for your own projects! Whether you want to:

- **Build Your Own Learning Platform** — Fork the code and create your own Python course
- **Contribute** — Help improve Pylen for everyone
- **Learn from It** — Study how we built an interactive learning platform
- **Extend It** — Add new features, exercises, or languages

You can use this code freely for **any purpose** (commercial, personal, educational). Just remember to give credit by mentioning **Duxy** or linking back to the original repository.

---

## Tech Stack

- **React 19** — UI library
- **TypeScript** — Type-safe JavaScript
- **Vite** — Ultra-fast build tool
- **Tailwind CSS** — Utility-first styling
- **Pyodide** — Python runtime in the browser
- **Monaco Editor** — Code editor
- **Web Workers** — Isolated Python execution

---

## Contributing

I'd love contributions! If you have ideas for new exercises, bug fixes, or improvements:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

## License

This project is free to use under the **Duxy License**. See [LICENSE](./LICENSE) for details.

---

## Support

Have questions or ideas? You can:

- Open an issue on [GitHub](https://github.com/tsmp60/pylen/issues)
- Share feedback and suggestions
- Contribute new exercises or features

---

**Built with ❤️ by [Duxy](https://github.com/tsmp60)**

Learn Python for free. No subscriptions. No limits.
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```
