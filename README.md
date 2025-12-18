# MiniWins 90 - Personal Goal Tracking & Performance Optimization App

A powerful, private goal-tracking application designed for long-term personal development over 30, 60, or 90-day periods.

## 🚀 Features

- ✅ **Goal Management** - Create and track goals across three categories: Professional, Personal Discipline, and Food & Lifestyle
- ⏱️ **Session Timer** - Built-in focus timer with pause/resume functionality
- 📝 **Notes & Disturbances** - Log what you accomplished and what interrupted you
- ⭐ **Focus Rating** - Rate your focus level (1-5 stars) after each session
- 🔥 **Streak Tracking** - Visualize your consistency with an animated streak counter
- 💬 **Daily Motivational Quotes** - Get inspired with rotating daily quotes
- 🏆 **Reward System** - Unlock personalized rewards upon goal completion
- 📊 **Progress Tracking** - Track daily scores and overall goal progress
- 💾 **Data Persistence** - All data saved locally using Zustand with localStorage

## 📋 Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

## 🛠️ Installation

1. **Navigate to the project directory:**
   ```bash
   cd C:\Users\Admin\Documents\Claude\miniwins-90
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser and visit:**
   ```
   http://localhost:5173
   ```

## 📁 Project Structure

```
miniwins-90/
├── src/
│   ├── components/
│   │   ├── goals/
│   │   │   ├── CreateGoalForm.tsx
│   │   │   └── DailyTaskCard.tsx
│   │   ├── layout/
│   │   │   └── Dashboard.tsx
│   │   ├── onboarding/
│   │   │   └── Onboarding.tsx
│   │   ├── sessions/
│   │   │   ├── SessionScreen.tsx
│   │   │   └── SessionTimer.tsx
│   │   └── shared/
│   │       ├── Badge.tsx
│   │       ├── Button.tsx
│   │       ├── Card.tsx
│   │       ├── DailyQuote.tsx
│   │       ├── Modal.tsx
│   │       ├── ProgressBar.tsx
│   │       └── StreakDisplay.tsx
│   ├── data/
│   │   └── quotes.ts
│   ├── stores/
│   │   └── useAppStore.ts
│   ├── types/
│   │   └── index.ts
│   ├── utils/
│   │   └── calculations.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

## 🎯 How to Use

### First Time Setup
1. **Onboarding** - Complete the 3-slide welcome tour and enter your name
2. **Create Your First Goal** - Click "Add New Goal" button

### Creating a Goal
1. Enter goal title (e.g., "Master SD-WAN Technology")
2. Select category: Professional, Personal Discipline, or Food & Lifestyle
3. Choose duration: 30, 60, or 90 days
4. Describe your daily target
5. Set daily time target (optional)
6. Name your reward
7. Upload reward image (optional)
8. Set success threshold (default: 80%)

### Daily Workflow
1. **View Dashboard** - See all today's tasks organized by category
2. **Mark Status** - Click ✅ Done, 🟡 Partial, or 🔴 Missed
3. **Start Session** - Use the built-in timer for focused work
4. **Log Notes** - Add timestamped notes during your session
5. **Log Disturbances** - Track interruptions
6. **Rate Focus** - Give yourself a 1-5 star rating after completion

### Tracking Progress
- **Daily Score** - Displayed in the header (0-100%)
- **Streak Counter** - Animated flame icon showing consecutive days
- **Task Status** - Visual indicators for completed, partial, and missed tasks

## 🧰 Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **State Management**: Zustand with persistence
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Date Handling**: date-fns
- **Build Tool**: Vite
- **Language**: TypeScript

## 🎨 Color Palette

- **Primary** (Focus): #3F51B5 (Deep Indigo)
- **Success** (Achievement): #2ECC71 (Emerald Green)
- **Warning** (Partial): #F39C12 (Amber)
- **Danger** (Missed): #E74C3C (Soft Red)
- **Accent**: #9B59B6 (Purple)

## 📦 Build for Production

```bash
npm run build
```

This will create an optimized production build in the `dist/` folder.

## 🔮 Future Enhancements

- Weekly Review Summary
- Goal Progress Calendar View
- Analytics & Insights Dashboard
- Rewards Gallery
- Data Export/Import
- Dark Mode
- Mobile App (React Native)

## 📝 License

This is a personal project for goal tracking and self-improvement.

## 🙏 Credits

Built with ❤️ using modern web technologies.

---

**Start your journey to consistent improvement today!** 🚀
