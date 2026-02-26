# Smart Hostel Room Allocation System

A modern, responsive single-page application for managing hostel room inventory and automating room allocation. Built with **Next.js**, **TypeScript**, and **Tailwind CSS**.

![License](https://img.shields.io/badge/license-MIT-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8?logo=tailwind-css)
![Contributions Welcome](https://img.shields.io/badge/contributions-welcome-green)
![Beginner Friendly](https://img.shields.io/badge/beginner--friendly-yes-brightgreen)

[![Features](https://img.shields.io/badge/features-dark%2Flight%20mode%20%7C%20allocation%20%7C%20filters-blue)](./README.md)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](./CONTRIBUTING.md)

## 🌟 Features

### Core Functionality
- **Add Room** - Create new rooms with capacity, AC, and attached washroom options
- **View All Rooms** - Display rooms in a responsive card grid with status indicators
- **Search & Filter** - Filter rooms by capacity, AC, washroom, and allocation status
- **Allocate Room** - Smart allocation algorithm that finds the best matching room
- **Allocate to Students** - Assign specific students to allocated rooms (optional)
- **Deallocate Rooms** - Free up allocated rooms with one click

### Additional Features
- **🌓 Dark/Light Mode** - Toggle between themes with system preference detection
- **💾 Local Storage** - Data persists across page refreshes (no backend required)
- **📦 Sample Data** - Load pre-populated rooms for quick demo
- **🔔 Toast Notifications** - Success/error feedback for all actions
- **📱 Responsive Design** - Mobile-first design for all screen sizes
- **🏷️ Room Status Tracking** - Visual indicators (Available/Allocated/Full)

## 🎨 Color Scheme

| Status | Color | Badge |
|--------|-------|-------|
| Available | Green | 🟢 |
| Allocated | Blue | 🔵 |
| Full | Orange | 🟠 |

## 🏗️ Architecture

This is a **frontend-only application** with no backend server. All data is stored in the browser's `localStorage`.

| Component | Technology |
|-----------|------------|
| Framework | Next.js 16 |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Icons | Lucide React |
| Data Persistence | localStorage API |
| Deployment | Vercel / Netlify |

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Hostel-Room-Allocation/frontend
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## 📖 How to Use

### Adding a Room
1. Fill in the Room Number (must be unique)
2. Enter the Capacity (positive number)
3. Check AC and/or Attached Washroom if needed
4. Click "Add Room"

### Allocating a Room (Auto-Find)
1. Enter the number of students
2. Select preferences (AC, Washroom) if needed
3. Click "Allocate Room"
4. View the allocated room details
5. Optionally click "Allocate to Student(s)" to assign specific students

### Allocating a Room to Students
1. After auto-allocation, click "Allocate to Student(s)"
2. Enter student names (optional - can be left blank)
3. Click "Confirm Allocation"
4. Room status changes to "Allocated" with student names displayed

### Deallocating a Room
1. Find an allocated room in the room list
2. Click the "Deallocate" button on the room card
3. Room status changes back to "Available"

### Filtering Rooms
1. Set minimum capacity requirement
2. Choose AC preference (Any/Required/Not Required)
3. Choose Washroom preference
4. Choose allocation status (All/Allocated/Unallocated)
5. View filtered results

### Loading Sample Data
Click the "Load Sample Data" button in the header to populate 6 sample rooms for demonstration.

### Switching Themes
Click the Sun/Moon icon in the header to toggle between light and dark modes. Your preference is saved automatically.

## 🎨 UI Components

| Component | Description |
|-----------|-------------|
| **Header** | App title with gradient, theme toggle, seed data button |
| **AddRoomForm** | Form for creating new rooms |
| **AllocationForm** | Form for room allocation requests |
| **AllocationResult** | Display allocation outcome with "Allocate to Students" option |
| **AllocateToForm** | Modal for assigning students to allocated rooms |
| **FilterPanel** | Search and filter controls (including allocation status) |
| **RoomCard** | Individual room display with features and allocation status |
| **RoomList** | Grid layout for room cards |
| **Toast** | Notification system |

## 📁 Project Structure

```
frontend/
├── app/
│   ├── types/
│   │   └── index.ts          # TypeScript interfaces
│   ├── globals.css           # Global styles & theme
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Main application page
├── components/
│   ├── AddRoomForm.tsx
│   ├── AllocateToForm.tsx    # Student allocation modal
│   ├── AllocationForm.tsx
│   ├── AllocationResult.tsx
│   ├── FilterPanel.tsx
│   ├── Header.tsx
│   ├── RoomCard.tsx
│   ├── RoomList.tsx
│   └── Toast.tsx
├── hooks/
│   └── useTheme.ts           # Theme management hook
├── utils/
│   └── storage.ts            # localStorage helpers
└── package.json
```

## 🔧 Configuration

### Tailwind Dark Mode
Dark mode is enabled via the `dark` class on the `html` element. Theme preference is stored in localStorage under `theme_preference`.

### Data Storage
- **Rooms**: `hostel_rooms` key in localStorage
- **Theme**: `theme_preference` key in localStorage

## ⚠️ Important Notes

- **Data is browser-specific** - Clearing browser data will remove all rooms
- **No backend** - This is a client-side only application
- **Single user** - Data is not shared across devices or browsers
- **Demo purpose** - Use "Load Sample Data" for quick testing

## 📦 Deployment

### Deploy to Vercel

1. Push code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your repository
4. Build settings:
   - Framework: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`
5. Click Deploy

### Deploy to Netlify

1. Push code to GitHub
2. Go to [Netlify](https://netlify.com)
3. Connect your repository
4. Build settings:
   - Build Command: `npm run build`
   - Publish Directory: `.next`
5. Deploy

## 🎯 Allocation Algorithm

The room allocation follows this logic:

1. Filter rooms matching AC and Washroom requirements
2. Filter rooms with sufficient capacity
3. Sort by capacity (ascending) - smallest suitable room first
4. If tied, prefer rooms with fewer features
5. Return the first matching room
6. Optionally assign specific students to the allocated room

## 🏷️ Room Status

| Status | Description | Color |
|--------|-------------|-------|
| **Available** | Room is unallocated and ready for assignment | Green 🟢 |
| **Allocated** | Room is assigned to specific student(s) | Blue 🔵 |
| **Full** | Room capacity is 0 | Orange 🟠 |

## 🤝 Contributing

We welcome contributions from everyone! This project is beginner-friendly.

### Quick Start for Contributors

1. **Read our guides:**
   - [CONTRIBUTING.md](./CONTRIBUTING.md) - How to contribute
   - [DEVELOPMENT.md](./DEVELOPMENT.md) - Development setup
   - [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md) - Community guidelines

2. **Find an issue:**
   - Look for `good first issue` labels
   - Check `help wanted` issues
   - Create a new issue for bugs or features

3. **Fork & Submit:**
   - Fork the repository
   - Create a branch (`git checkout -b feature/your-feature`)
   - Make your changes
   - Submit a Pull Request

### Why Contribute?

- 🌱 Great for learning open source
- 💼 Build your portfolio
- 🎯 Practice React, TypeScript, and Tailwind CSS
- 🤝 Join a welcoming community

**First time contributing?** Check out [CONTRIBUTING.md](./CONTRIBUTING.md) for a step-by-step guide!

## 📝 License

This project is created for educational purposes. See the [MIT License](./LICENSE) for details.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons from [Lucide React](https://lucide.dev/)

---

<div align="center">

**Made with ❤️ by Contributors**

[Star this repo](https://github.com/your-username/Hostel-Room-Allocation) if you find it helpful!

</div>
