# Contributing to Hostel Room Allocation System

First off, thank you for considering contributing to this project! It's people like you that make it a great tool for the community. This guide will help you get started with your first contribution.

## 📚 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [What We're Building](#what-were-building)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Setting Up the Project](#setting-up-the-project)
- [How Can I Contribute?](#how-can-i-contribute)
  - [Reporting Bugs](#reporting-bugs)
  - [Suggesting Features](#suggesting-features)
  - [Your First Code Contribution](#your-first-code-contribution)
- [Development Workflow](#development-workflow)
  - [Branch Naming](#branch-naming)
  - [Making Changes](#making-changes)
  - [Commit Messages](#commit-messages)
- [Pull Request Process](#pull-request-process)
- [Coding Guidelines](#coding-guidelines)
  - [TypeScript](#typescript)
  - [React Components](#react-components)
  - [Styling](#styling)
- [Beginner-Friendly Issues](#beginner-friendly-issues)
- [Questions?](#questions)

---

## Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to the project maintainers.

---

## What We're Building

The **Hostel Room Allocation System** is a frontend-only application that helps manage hostel room inventory and automate room allocation. It features:

- ✅ Room management (add, view, delete)
- ✅ Smart allocation algorithm
- ✅ Search and filtering
- ✅ Dark/Light mode toggle
- ✅ Local storage persistence
- ✅ Student allocation tracking

**Tech Stack:** Next.js, TypeScript, Tailwind CSS, Lucide Icons

---

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 18 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Git** - [Download here](https://git-scm.com/)
- A code editor (we recommend [VS Code](https://code.visualstudio.com/))

### Setting Up the Project

1. **Fork the repository**
   - Click the "Fork" button at the top right of the repository page
   - This creates your own copy of the project

2. **Clone your fork locally**
   ```bash
   git clone https://github.com/YOUR-USERNAME/Hostel-Room-Allocation.git
   cd Hostel-Room-Allocation/frontend
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   - Navigate to [http://localhost:3000](http://localhost:3000)

6. **Create a branch** for your changes
   ```bash
   git checkout -b feature/your-feature-name
   ```

---

## How Can I Contribute?

### Reporting Bugs

Found a bug? Help us fix it by creating a detailed issue:

1. **Check existing issues** first to avoid duplicates
2. **Use the bug report template** (`.github/ISSUE_TEMPLATE.md`)
3. **Include:**
   - Clear description of the bug
   - Steps to reproduce
   - Expected behavior
   - Actual behavior
   - Screenshots (if applicable)
   - Browser and OS information

### Suggesting Features

Have an idea for improvement? We'd love to hear it!

1. **Check existing feature requests** to avoid duplicates
2. **Use the feature request template**
3. **Include:**
   - Clear description of the feature
   - Why it would be useful
   - Any examples or mockups

### Your First Code Contribution

Unsure where to start? Look for issues labeled:

- 🟢 `good first issue` - Perfect for beginners
- 🔵 `help wanted` - Need community help
- 🟡 `beginner-friendly` - Simple tasks

**Steps:**

1. Pick an issue that interests you
2. Comment on the issue to let others know you're working on it
3. Follow the development workflow below
4. Submit your pull request

---

## Development Workflow

### Branch Naming

Use clear, descriptive branch names:

```
feature/add-new-button          # New feature
fix/dark-mode-toggle            # Bug fix
docs/update-readme              # Documentation
refactor/cleanup-code           # Code refactoring
```

### Making Changes

1. **Make your changes** in your feature branch
2. **Test thoroughly** - make sure everything works
3. **Run the build** to check for errors:
   ```bash
   npm run build
   ```
4. **Stage your changes:**
   ```bash
   git add .
   ```
5. **Commit your changes** (see commit message guidelines below)
6. **Push to your fork:**
   ```bash
   git push origin feature/your-feature-name
   ```

### Commit Messages

Write clear, meaningful commit messages:

**Format:**
```
type: short description

Longer description (optional)
```

**Types:**
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Formatting, missing semicolons, etc.
- `refactor:` - Code refactoring
- `test:` - Adding tests
- `chore:` - Maintenance tasks

**Examples:**
```
feat: add dark mode toggle button

fix: resolve room allocation sorting issue

docs: update contributing guide with examples
```

---

## Pull Request Process

1. **Ensure your code follows** the coding guidelines
2. **Update documentation** if needed
3. **Test your changes** thoroughly
4. **Create a Pull Request:**
   - Go to your fork on GitHub
   - Click "New Pull Request"
   - Compare against the main repository's `main` branch
   - Fill out the PR template
5. **Wait for review** - maintainers will review and provide feedback
6. **Make requested changes** if needed
7. **Celebrate!** 🎉 Once approved, your PR will be merged

---

## Coding Guidelines

### TypeScript

- Use TypeScript for all new files
- Define proper types for all variables and functions
- Avoid using `any` - be specific with types
- Use interfaces for object shapes

**Example:**
```typescript
// ✅ Good
interface Room {
  id: string;
  roomNo: string;
  capacity: number;
  hasAC: boolean;
}

// ❌ Avoid
interface Room {
  id: any;
  roomNo: any;
}
```

### React Components

- Use functional components with hooks
- Keep components small and focused
- Use descriptive prop names
- Add TypeScript types for props

**Example:**
```typescript
interface RoomCardProps {
  room: Room;
  onDelete: (id: string) => void;
}

export const RoomCard: React.FC<RoomCardProps> = ({ room, onDelete }) => {
  return (
    <div>{room.roomNo}</div>
  );
};
```

### Styling

- Use Tailwind CSS utility classes
- Follow mobile-first approach
- Support both light and dark modes
- Use semantic color names

**Example:**
```tsx
// ✅ Good - supports dark mode
<div className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white">

// ❌ Avoid - hardcoded colors
<div className="bg-[#ffffff] text-[#000000]">
```

---

## Beginner-Friendly Issues

New to open source? Start with these types of issues:

1. **Documentation improvements** - Fix typos, add examples
2. **UI enhancements** - Improve button styles, spacing
3. **Bug fixes** - Small, well-defined bugs
4. **Testing** - Add test cases for existing features
5. **Accessibility** - Improve screen reader support

Look for the `good first issue` label in the Issues tab!

---

## Questions?

Need help? Here's how to reach out:

- **Open an issue** for project-related questions
- **Read existing issues** - your question might already be answered
- **Check the README.md** for general information

### Common Questions

**Q: I've never contributed to open source before. Where do I start?**

A: Start by reading this guide, then look for issues labeled `good first issue`. Don't be afraid to ask questions!

**Q: What if I make a mistake?**

A: That's totally okay! Everyone makes mistakes. The maintainers will help you fix any issues before merging.

**Q: How long does it take for a PR to be reviewed?**

A: Usually within a few days. Please be patient as maintainers are often volunteers.

---

## Thank You! 🙏

Every contribution, no matter how small, makes a difference. Thank you for being part of this project!

**Happy Coding! 💻**
