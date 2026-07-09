# 📊 MOMENTUM-TRACKER

A modern React + Vite application for tracking momentum, progress, and key metrics in real-time. Built with performance and developer experience in mind.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Project Setup](#project-setup)
- [Development](#development)
- [Building for Production](#building-for-production)
- [Project Structure](#project-structure)
- [Configuration](#configuration)
- [Available Scripts](#available-scripts)
- [Performance Optimization](#performance-optimization)
- [ESLint Rules](#eslint-rules)
- [Contributing](#contributing)
- [License](#license)
- [Support](#support)

## Features

✨ **Core Features:**
- ⚡ Lightning-fast development with Vite HMR (Hot Module Replacement)
- 🎨 Modern React with the latest React Compiler
- 📈 Real-time momentum and progress tracking
- 🔍 Type-safe development (TypeScript-ready)
- ✅ Built-in ESLint rules for code quality
- 📱 Responsive design
- 🎯 Performance-optimized builds

## Tech Stack

**Frontend:**
- **React 18+** - UI library
- **Vite** - Next-generation frontend build tool
- **Vite Plugins:**
  - [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react) - Uses [Oxc](https://oxc.rs) for fast JavaScript/TypeScript parsing (default)
  - [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) - Uses [SWC](https://swc.rs/) for ultra-fast compilation (alternative)

**Development Tools:**
- **ESLint** - Code linting and quality enforcement
- **React Compiler** - Automatic optimization of React components
- **HMR** - Hot Module Replacement for seamless development

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** v16.0.0 or higher
- **npm** v8.0.0 or higher (or **yarn** v3.0.0+)
- **Git**

Check your versions:
```bash
node --version
npm --version
```

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/Yash-Tummala/MOMENTUM-TRACKER.git
cd MOMENTUM-TRACKER
```

### 2. Install Dependencies

Using npm:
```bash
npm install
```

Or using yarn:
```bash
yarn install
```

Or using pnpm:
```bash
pnpm install
```

## Project Setup

### Environment Variables

Create a `.env` file in the root directory (if needed):

```env
# Development
VITE_API_URL=http://localhost:3000
VITE_ENV=development

# Production
# VITE_API_URL=https://your-api-domain.com
# VITE_ENV=production
```

### Directory Structure

```
MOMENTUM-TRACKER/
├── src/
│   ├── components/        # React components
│   ├── pages/            # Page components
│   ├── hooks/            # Custom React hooks
│   ├── utils/            # Utility functions
│   ├── styles/           # CSS/SCSS files
│   ├── App.jsx           # Main App component
│   └── main.jsx          # Entry point
├── public/               # Static assets
├── .eslintrc.cjs         # ESLint configuration
├── vite.config.js        # Vite configuration
├── package.json          # Project dependencies
└── README.md             # This file
```

## Development

### Start Development Server

```bash
npm run dev
```

This will start the Vite development server with HMR enabled. The application will be available at `http://localhost:5173`.

**Key Development Features:**
- 🔄 Instant module hot replacement (HMR)
- 🚀 Lightning-fast compilation
- 🐛 Built-in debugging capabilities
- 📝 Real-time code changes without page reload

### Development Workflow

1. Edit files in the `src` directory
2. Changes will be instantly reflected in your browser
3. Lint errors will be shown in the console and browser

## Building for Production

### Create Optimized Build

```bash
npm run build
```

This creates a production-ready build in the `dist` directory with:
- ✅ Minified code
- ✅ Tree-shaken dependencies
- ✅ Optimized assets
- ✅ Source maps (optional)

### Preview Production Build

```bash
npm run preview
```

This serves the production build locally for testing.

## Project Structure

### Key Directories

**`src/components/`**
- Reusable React components
- Each component in its own folder with JSX and styles

**`src/pages/`**
- Full page components
- Usually wrapped by a router

**`src/hooks/`**
- Custom React hooks for shared logic
- Example: `useLocalStorage`, `useApi`, etc.

**`src/utils/`**
- Utility functions and helpers
- API calls, formatters, validators, etc.

**`src/styles/`**
- Global CSS/SCSS
- Component-specific styles (co-located with components preferred)

## Configuration

### Vite Configuration

Edit `vite.config.js` to customize the build:

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    strictPort: false,
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
})
```

### ESLint Configuration

The project includes ESLint with recommended rules. Edit `.eslintrc.cjs` to customize:

```javascript
module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
  ],
  rules: {
    // Custom rules here
  },
}
```

## Available Scripts

| Script | Command | Description |
|--------|---------|-------------|
| **dev** | `npm run dev` | Start development server with HMR |
| **build** | `npm run build` | Create production build |
| **preview** | `npm run preview` | Preview production build |
| **lint** | `npm run lint` | Run ESLint to check code quality |

## Performance Optimization

### React Compiler

The React Compiler is **enabled by default** in this template. It automatically optimizes your React components.

**Benefits:**
- Reduced re-renders
- Improved performance
- Automatic memoization

**Note:** The React Compiler may impact Vite dev & build performance slightly but provides better runtime performance.

**Learn More:** [React Compiler Documentation](https://react.dev/learn/react-compiler)

### Build Optimization Tips

1. **Code Splitting** - Vite automatically splits code chunks
2. **Lazy Loading** - Use React.lazy() for route-based code splitting
3. **Asset Optimization** - Vite compresses and optimizes all assets
4. **Tree Shaking** - Remove unused code automatically

### Vite Plugin Options

#### Using Oxc (Default - Recommended)
```bash
npm install @vitejs/plugin-react
```

#### Using SWC (Alternative)
```bash
npm install @vitejs/plugin-react-swc
```

Switch in `vite.config.js`:
```javascript
import reactSWC from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [reactSWC()],
})
```

## ESLint Rules

### Expanding ESLint Configuration

For **production applications**, we recommend using **TypeScript** with type-aware linting:

```javascript
// .eslintrc.cjs
module.exports = {
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json'],
  },
}
```

**TypeScript Template:** Check out the [Vite TypeScript template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts)

### Running ESLint

```bash
npm run lint              # Check for linting errors
npm run lint -- --fix    # Fix auto-fixable errors
```

## Contributing

We welcome contributions! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Contribution Guidelines

- Follow the existing code style (enforced by ESLint)
- Write meaningful commit messages
- Update documentation as needed
- Test your changes thoroughly

## Troubleshooting

### Common Issues

**Issue: Port 5173 already in use**
```bash
npm run dev -- --port 3000
```

**Issue: ESLint errors on start**
```bash
npm run lint -- --fix
```

**Issue: Slow build time**
- Ensure Node.js is up to date
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Consider using SWC plugin for faster builds

## Resources

- 📚 [Vite Documentation](https://vitejs.dev/)
- ⚛️ [React Documentation](https://react.dev/)
- 🔍 [ESLint Documentation](https://eslint.org/)
- ⚙️ [Oxc Parser](https://oxc.rs/)
- 🚀 [SWC Documentation](https://swc.rs/)

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

If you encounter issues or have questions:

1. Check the [Troubleshooting](#troubleshooting) section
2. Review the [Resources](#resources) section
3. Open an [Issue](https://github.com/Yash-Tummala/MOMENTUM-TRACKER/issues)
4. Submit a [Pull Request](https://github.com/Yash-Tummala/MOMENTUM-TRACKER/pulls)

---

**Happy coding! 🚀** Keep tracking that momentum!
