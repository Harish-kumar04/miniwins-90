# 🚀 Quick Start Guide - MiniWins 90

## Step 1: Open VS Code

1. Open **Visual Studio Code**
2. Click `File` → `Open Folder`
3. Navigate to: `C:\Users\Admin\Documents\Claude\miniwins-90`
4. Click "Select Folder"

## Step 2: Install Dependencies

Open the integrated terminal in VS Code (`Ctrl + ~` or `Terminal` → `New Terminal`)

Run this command:
```bash
npm install
```

Wait for the installation to complete (this may take 2-3 minutes).

## Step 3: Start the Application

In the same terminal, run:
```bash
npm run dev
```

You should see output like:
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
```

## Step 4: Open in Browser

1. **Hold `Ctrl`** and **click** on `http://localhost:5173/`
2. Or manually open your browser and visit: `http://localhost:5173`

## Step 5: Complete Onboarding

1. You'll see a welcome screen with 3 slides
2. Click "Next" through the slides
3. Enter your name
4. Click "Start My Journey"

## Step 6: Create Your First Goal

1. Click the **"Add New Goal"** button (green button in the header)
2. Fill in the form:
   - **Goal Title**: e.g., "Master React Development"
   - **Category**: Choose Professional Goal / Personal Discipline / Food & Lifestyle
   - **Duration**: Select 30, 60, or 90 days
   - **Daily Target**: e.g., "Code for 2 hours on React projects"
   - **Time Target**: e.g., 120 minutes
   - **Reward Name**: e.g., "New Mechanical Keyboard"
   - **Success Threshold**: Adjust slider (default 80%)
3. Click **"Create Goal"**

## Step 7: Start Using Daily

### Mark Task Status
- Click **✅ Done** when you complete the task
- Click **🟡 Partial** if you did some of it
- Click **🔴 Missed** if you skipped it

### Use Session Timer
1. Click **"Start Session"** button
2. Timer will start counting
3. Add notes about what you're doing
4. Log any distractions
5. When done, click **"Complete"**
6. Rate your focus (1-5 stars)

## 🎯 Daily Workflow

```
1. Open app → See today's tasks
2. Click "Start Session" → Work focused
3. Log notes & disturbances → Track progress
4. Complete session → Rate focus
5. Mark status → Build streak 🔥
```

## 📊 Features You'll See

- **Header**: Shows current date, streak counter 🔥, and daily score
- **Daily Quote**: Motivational quote that changes daily
- **Task Cards**: One card per goal, organized by category
- **Status Buttons**: ✅ Done, 🟡 Partial, 🔴 Missed
- **Session Timer**: Full-featured timer with HH:MM:SS display

## ⌨️ Keyboard Shortcuts

- `Ctrl + ~` - Toggle terminal in VS Code
- `Ctrl + C` - Stop the dev server (in terminal)
- `Enter` - Submit forms / add notes

## 🛑 To Stop the App

In the VS Code terminal:
1. Press `Ctrl + C`
2. Type `Y` when asked "Terminate batch job?"

## 🔄 To Restart the App

```bash
npm run dev
```

## 💾 Your Data

All your data is saved automatically in your browser's localStorage. Your goals, tasks, sessions, and progress are preserved even if you close the browser.

## 🐛 Troubleshooting

### Port Already in Use
If you see "Port 5173 is already in use":
```bash
# Stop all Node processes and restart
npm run dev
```

### Missing Dependencies
If you see errors about missing packages:
```bash
npm install
```

### Clear Data (Reset App)
To start fresh:
1. Open browser DevTools (`F12`)
2. Go to `Application` tab
3. Click `Local Storage` → `http://localhost:5173`
4. Right-click → `Clear`
5. Refresh the page

## 📝 Tips for Success

1. **Set Realistic Goals** - Start with one goal, then add more
2. **Use the Timer** - The session timer helps maintain focus
3. **Track Distractions** - Understanding interruptions helps you improve
4. **Build Streaks** - Consistency is more important than perfection
5. **Celebrate Wins** - Each completed task is progress!

## 🎉 You're All Set!

Start tracking your goals and building your winning streak! 🚀

---

**Need Help?** Check the full README.md for detailed documentation.
