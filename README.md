# Ubuntu 2025 Events Dashboard

A modern, real-time college fest events management dashboard built with Next.js, TypeScript, Supabase, and cutting-edge UI technologies.

## 🎉 Latest Updates

- ✅ **29 Events** organized by Day 1 & Day 2
- ✅ **History Tab** for complete audit trail
- ✅ **Reason Field** for transparent point deductions
- ✅ **Real-time Sync** across all devices
- ✅ **5 Event Categories** (Performing Arts, Fine Arts, Online Games, Sports, Creative Challenges)

## 🚀 New Features & Enhancements

### ✨ **Enhanced UI/UX**
- **Framer Motion Animations**: Smooth, professional animations throughout the app
- **shadcn/ui Components**: Modern, accessible UI components with consistent design
- **Glass Morphism Design**: Updated with better visual hierarchy and depth
- **Responsive Animations**: Optimized for all screen sizes with fluid transitions
- **Interactive Elements**: Hover effects, loading states, and micro-interactions

### 🎯 **Performance Improvements**
- **Next.js 14**: Latest App Router with server-side rendering
- **Optimized Bundle**: Tree-shaking and code splitting for faster load times
- **Image Optimization**: Next.js Image component for better performance
- **TypeScript**: Enhanced type safety and developer experience

### 🎨 **Design System**
- **Custom Ubuntu Theme**: Enhanced color palette with CSS variables
- **Consistent Spacing**: Standardized design tokens
- **Accessibility**: WCAG compliant components and keyboard navigation
- **Dark Mode Ready**: CSS variables setup for future dark mode support

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Animations**: Framer Motion
- **State Management**: Zustand with persistence
- **Icons**: Lucide React
- **Notifications**: Sonner (toast notifications)
- **Data Storage**: Local Storage (demo) / Supabase ready

## 📦 Quick Start

### First Time Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Setup Supabase** (if not already done)
   - See `UPDATE_GUIDE.md` for detailed steps
   - Or use `QUICK_UPDATE_STEPS.md` for 5-minute setup

3. **Run Development Server**
   ```bash
   npm run dev
   ```

4. **Open Browser**
   Navigate to `http://localhost:3000`

### Updating Existing Setup

If you already have Supabase configured:
1. Run `populate-events-supabase.sql` in Supabase SQL Editor
2. Restart your app: `npm run dev`
3. See `QUICK_UPDATE_STEPS.md` for details

## 🎮 Demo Credentials

### Student Access
- **Email**: `CollegeCl@ubuntu.com`
- **Password**: `Ubuntuparti@123`

### Admin Access
- **Email**: `ajayadmin90@ubuntu.com`
- **Password**: `Ajay.padmin@123`

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles with CSS variables
│   ├── layout.tsx         # Root layout with providers
│   └── page.tsx           # Main page component
├── components/
│   ├── ui/                # shadcn/ui components
│   │   ├── button.tsx     # Enhanced button variants
│   │   ├── card.tsx       # Card components
│   │   ├── input.tsx      # Form inputs
│   │   ├── tabs.tsx       # Tab navigation
│   │   └── select.tsx     # Select dropdowns
│   ├── auth/              # Authentication components
│   │   └── LoginForm.tsx  # Enhanced login with animations
│   ├── dashboard/         # Dashboard components
│   │   ├── UserDashboard.tsx    # Student dashboard
│   │   └── AdminDashboard.tsx   # Admin dashboard
│   ├── events/            # Event components
│   │   ├── EventCard.tsx        # Enhanced event cards
│   │   └── EventFilters.tsx     # Animated filters
│   ├── leaderboard/       # Ranking components
│   │   └── Leaderboard.tsx      # Real-time leaderboard
│   ├── admin/             # Admin components
│   │   ├── PointsAwardForm.tsx  # Points awarding
│   │   └── CollegeManagement.tsx # College CRUD
│   └── layout/            # Layout components
│       ├── Header.tsx     # Navigation header
│       └── Footer.tsx     # Site footer
├── data/                  # Static data
│   └── events.ts          # Event definitions
├── store/                 # State management
│   ├── authStore.ts       # Authentication state
│   └── collegeStore.ts    # College & points state
├── types/                 # TypeScript definitions
│   └── index.ts           # Type definitions
└── lib/                   # Utilities
    └── utils.ts           # Helper functions
```

## 🎯 Key Features

### 🔐 **Authentication**
- Role-based access (Student/Admin)
- Persistent session management
- Animated login with loading states

### 📊 **User Dashboard**
- Browse 29 events with advanced filtering
- Filter by Day, Type, Category
- Real-time leaderboard updates
- Responsive event cards with animations

### ⚙️ **Admin Dashboard**
- **Overview**: Analytics and recent activity
- **Award Points**: Participation and winner points
- **Deduct Points**: With required reason field
- **Manage Colleges**: Add/remove colleges
- **History**: Complete audit trail (NEW)
- **Events**: View all 29 events
- **Leaderboard**: Live rankings

### 🏆 **Real-time Features**
- Instant leaderboard updates across all devices
- Live history tracking
- WebSocket-based synchronization
- No manual refresh needed

### 📜 **History & Transparency**
- Complete transaction audit trail
- Reasons for all point deductions
- Filter by additions/deductions
- Search by college/event
- Real-time statistics

## 🎨 Animation Features

### **Page Transitions**
- Smooth enter/exit animations
- Staggered component loading
- Loading states with spinners

### **Interactive Elements**
- Hover effects on cards and buttons
- Click animations with scale effects
- Form validation with smooth feedback

### **Data Visualization**
- Animated counters for statistics
- Progress bars with smooth fills
- Chart-like visualizations for rankings

## 🚀 Performance Optimizations

- **Code Splitting**: Automatic route-based splitting
- **Image Optimization**: Next.js Image component
- **Bundle Analysis**: Optimized imports and tree-shaking
- **Caching**: Static generation where possible
- **Lazy Loading**: Components loaded on demand

## 📱 Responsive Design

- **Mobile First**: Optimized for mobile devices
- **Tablet Support**: Enhanced layouts for tablets
- **Desktop Experience**: Full-featured desktop interface
- **Touch Interactions**: Optimized for touch devices

## 🔧 Development

### **Available Scripts**
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

### **Adding New Components**
```bash
npx shadcn-ui@latest add [component-name]
```

## 📊 Events Overview

**Total: 29 Events**

### Day 1 (16 Events)
- 2 Flagship (250 pts participation)
- 8 Large (150 pts participation)
- 6 Small (50 pts participation)

### Day 2 (13 Events)
- 7 Flagship (250 pts participation)
- 3 Large (150 pts participation)
- 3 Small (50 pts participation)

### Categories
- Performing Arts (7 events)
- Fine Arts (8 events)
- Online Games (7 events)
- Sports (4 events)
- Creative Challenges (7 events)

## 📚 Documentation

- **`UPDATE_GUIDE.md`** - Complete update guide for existing setup
- **`QUICK_UPDATE_STEPS.md`** - 5-minute quick update steps
- **`VERCEL_DEPLOYMENT_GUIDE.md`** - Deploy to Vercel
- **`populate-events-supabase.sql`** - SQL to populate events
- **`verify-database.sql`** - Verify database setup

## 📄 License

Created for Ubuntu 2025 College Fest event management.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

---

**Ubuntu 2025 Events Dashboard** - Next.js Edition
*Bringing college fest management into the modern web era!* ✨🎉
