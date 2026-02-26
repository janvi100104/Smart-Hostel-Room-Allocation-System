# Development Guide

This guide will help you set up your development environment and understand the project structure.

## 📋 Table of Contents

- [Prerequisites](#prerequisites)
- [Setting Up Your Development Environment](#setting-up-your-development-environment)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)
- [Development Tips](#development-tips)
- [Debugging](#debugging)
- [Testing](#testing)
- [Building for Production](#building-for-production)

---

## Prerequisites

Before you begin, ensure you have the following installed:

| Tool | Version | Purpose | Download Link |
|------|---------|---------|---------------|
| **Node.js** | 18+ | JavaScript runtime | [nodejs.org](https://nodejs.org/) |
| **npm** | 9+ | Package manager | Comes with Node.js |
| **Git** | Latest | Version control | [git-scm.com](https://git-scm.com/) |
| **VS Code** | Latest | Code editor (recommended) | [code.visualstudio.com](https://code.visualstudio.com/) |

### Verify Installation

Open your terminal and run:

```bash
node --version  # Should show v18.x.x or higher
npm --version   # Should show 9.x.x or higher
git --version   # Should show git version
```

---

## Setting Up Your Development Environment

### Step 1: Fork the Repository

1. Go to the repository on GitHub
2. Click the "Fork" button in the top-right corner
3. This creates a copy of the project under your GitHub account

### Step 2: Clone Your Fork

```bash
git clone https://github.com/YOUR-USERNAME/Hostel-Room-Allocation.git
cd Hostel-Room-Allocation/frontend
```

### Step 3: Install Dependencies

```bash
npm install
```

This will install all required packages including:
- Next.js (framework)
- React (UI library)
- TypeScript (type safety)
- Tailwind CSS (styling)
- Lucide React (icons)

### Step 4: Start Development Server

```bash
npm run dev
```

The application will start at [http://localhost:3000](http://localhost:3000)

### Step 5: Create a Branch

```bash
git checkout -b feature/your-feature-name
```

---

## Project Structure

```
Hostel-Room-Allocation/
├── .github/                    # GitHub templates and configs
│   ├── ISSUE_TEMPLATE.md       # Bug report template
│   ├── FEATURE_REQUEST.md      # Feature request template
│   └── PULL_REQUEST_TEMPLATE.md # PR template
├── frontend/                   # Main application folder
│   ├── app/                    # Next.js app directory
│   │   ├── types/
│   │   │   └── index.ts        # TypeScript interfaces
│   │   ├── globals.css         # Global styles
│   │   ├── layout.tsx          # Root layout
│   │   └── page.tsx            # Main page
│   ├── components/             # React components
│   │   ├── AddRoomForm.tsx     # Add room form
│   │   ├── AllocateToForm.tsx  # Student allocation modal
│   │   ├── AllocationForm.tsx  # Auto-allocation form
│   │   ├── AllocationResult.tsx # Allocation result display
│   │   ├── FilterPanel.tsx     # Search & filters
│   │   ├── Header.tsx          # App header
│   │   ├── RoomCard.tsx        # Room card component
│   │   ├── RoomList.tsx        # Room grid
│   │   └── Toast.tsx           # Notifications
│   ├── hooks/                  # Custom React hooks
│   │   └── useTheme.ts         # Dark/light mode hook
│   ├── utils/                  # Utility functions
│   │   └── storage.ts          # localStorage helpers
│   ├── public/                 # Static assets
│   ├── package.json            # Dependencies & scripts
│   ├── tsconfig.json           # TypeScript config
│   └── README.md               # Project documentation
├── CONTRIBUTING.md             # Contribution guidelines
├── CODE_OF_CONDUCT.md          # Community guidelines
├── LICENSE                     # MIT License
└── README.md                   # Main documentation
```

---

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server (http://localhost:3000) |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint for code quality |

---

## Development Tips

### 1. Hot Reload

Next.js automatically reloads when you save changes. No need to restart the server!

### 2. TypeScript Types

Always use proper TypeScript types. Check `app/types/index.ts` for available interfaces:

```typescript
import { Room, FilterState } from '@/app/types';
```

### 3. Component Structure

Follow this pattern for new components:

```typescript
'use client';

import { } from 'lucide-react';

interface ComponentProps {
  // Define props here
}

export const ComponentName: React.FC<ComponentProps> = ({ prop1, prop2 }) => {
  return (
    <div>Component JSX</div>
  );
};
```

### 4. Styling with Tailwind

Use Tailwind utility classes. Support dark mode:

```tsx
<div className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white">
```

### 5. localStorage Functions

Use utility functions from `utils/storage.ts`:

```typescript
import { getRooms, addRoom, updateRoom } from '@/utils/storage';
```

---

## Debugging

### Browser DevTools

1. Open Chrome DevTools (F12 or Right-click → Inspect)
2. Use Console for logs
3. Use React DevTools extension for component inspection

### VS Code Debugger

Create `.vscode/launch.json`:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Chrome",
      "type": "chrome",
      "request": "launch",
      "url": "http://localhost:3000",
      "webRoot": "${workspaceFolder}"
    }
  ]
}
```

### Common Issues

| Issue | Solution |
|-------|----------|
| Port 3000 already in use | Run `npm run dev -- -p 3001` |
| Module not found | Run `npm install` |
| TypeScript errors | Run `npm run build` to see all errors |
| Styles not loading | Clear browser cache (Ctrl+Shift+R) |

---

## Testing

### Manual Testing Checklist

Before submitting your changes, test:

- [ ] Feature works as expected
- [ ] No console errors
- [ ] Works in light mode
- [ ] Works in dark mode
- [ ] Responsive on mobile
- [ ] Responsive on desktop
- [ ] localStorage persists data

### Testing Different Screen Sizes

Use Chrome DevTools Device Mode:
1. Open DevTools (F12)
2. Click device icon (Ctrl+Shift+M)
3. Test on different screen sizes

---

## Building for Production

### Step 1: Build

```bash
npm run build
```

This creates an optimized production build in the `.next` folder.

### Step 2: Test Production Build

```bash
npm start
```

Open http://localhost:3000 to verify everything works.

### Step 3: Deploy

#### Deploy to Vercel (Recommended)

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Deploy!

Build settings:
- Framework: Next.js
- Build Command: `npm run build`
- Output Directory: `.next`

---

## Making Your First Contribution

1. **Find an issue** labeled `good first issue`
2. **Comment** to let others know you're working on it
3. **Create a branch**: `git checkout -b fix/issue-123`
4. **Make changes** following the guidelines
5. **Test thoroughly**
6. **Commit**: `git commit -m "fix: resolve issue #123"`
7. **Push**: `git push origin fix/issue-123`
8. **Create Pull Request** on GitHub

---

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Lucide Icons](https://lucide.dev/icons/)

---

## Need Help?

- Check existing [Issues](https://github.com/your-repo/issues)
- Read [CONTRIBUTING.md](./CONTRIBUTING.md)
- Ask in the issue comments

**Happy Coding! 🚀**
