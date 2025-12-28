# 🚀 START HERE: Your Hackathon Project Complete Guide

**Hackathon:** Code To Innovate - AI-Native Ingredient Co-Pilot  
**Deadline:** January 5, 2026 (8 days)  
**Your Tech Stack:** React + Node.js + OpenAI  
**Estimated Build Time:** 6-8 hours for MVP, 2-4 hours for polish

---

## 📋 What You're Building

An **AI-native experience** that turns confusing food labels into instant, personalized health insights.

**Key Difference from Traditional Apps:**
- ❌ No forms, no filters, no settings
- ✅ User inputs ingredients, system infers what they care about
- ✅ AI explains reasoning, not just gives verdicts
- ✅ Honest about uncertainty

---

## 🎯 Judging Weights (OPTIMIZE FOR THESE)

| Weight | Criterion | What Matters |
|--------|-----------|-------------|
| **50%** | AI-Native UX | Intent inference, low cognitive load, feels like a co-pilot |
| **30%** | Reasoning | Clear logic, honest uncertainty, good explanations |
| **20%** | Technical | Clean code, stable, appropriate tool use |

---

## ⚡ Quick Start (30 Minutes)

### 1. Create Folders
```bash
mkdir ingredient-copilot
cd ingredient-copilot

# Frontend
npm create vite@latest frontend -- --template react
cd frontend
npm install zustand axios recharts lucide-react clsx
cd ..

# Backend
mkdir backend
cd backend
npm init -y
npm install express cors dotenv openai axios
cd ..
```

### 2. Copy Code
Grab files from the documentation:
- Frontend: `App.jsx`, `InputStage.jsx`, `ReasoningView.jsx`
- Backend: `index.js`, `llm-reasoning.js`
- Styling: `main.css`

### 3. Set Environment Variables
**Frontend: `frontend/.env.local`**
```
VITE_API_BASE_URL=http://localhost:5000
VITE_OPENAI_API_KEY=sk-your-key-here
```

**Backend: `backend/.env`**
```
PORT=5000
OPENAI_API_KEY=sk-your-key-here
CORS_ORIGIN=http://localhost:5173
```

### 4. Run Locally
```bash
# Terminal 1: Frontend
cd frontend
npm run dev
# Opens on http://localhost:5173

# Terminal 2: Backend
cd backend
node src/index.js
# Runs on http://localhost:5000
```

---

## 🏆 Winning Formula

### 1. Intent-First (50% of score)
**Don't ask "What are you concerned about?"**  
**Infer it from context.**

### 2. Clear Reasoning (30% of score)
**Show the chain of thought:**
- "Whey is dairy-derived"
- "You avoid dairy"
- "This product isn't ideal for you"
- "We're 90% confident"

### 3. Technical Excellence (20% of score)
- Modular React components
- Clean API design
- Error handling
- No crashes

---

## 📱 Core User Flow

```
1. User: "What's in this product?"
   ↓
2. System infers: "I think you care about dairy. Right?"
   ↓
3. User: "Yes"
   ↓
4. Analysis appears:
   - Summary: "Not ideal for dairy-free diet"
   - Concerns: [ingredient details]
   - Tradeoffs: [what you gain/lose]
   - Uncertainty: [what we're unsure about]
```

---

## 🎬 Demo Video (2 Minutes)

- 0:00-0:20: Problem (confused at grocery shelf)
- 0:20-0:50: Solution in action
- 0:50-1:30: Reasoning clarity
- 1:30-2:00: Impact statement

---

## 📊 Timeline (Actual Hours)

| Phase | Hours | By Date |
|-------|-------|---------|
| Setup | 1 | Dec 28 |
| UI Components | 2 | Dec 29 |
| Backend | 2 | Dec 30 |
| LLM Integration | 2 | Dec 31 |
| Testing | 2 | Jan 1 |
| Polish | 2 | Jan 2 |
| Demo Video | 2 | Jan 3 |
| Documentation | 1 | Jan 4 |
| Review & Submit | 1 | Jan 5 |

**Total: 15-16 hours over 8 days = ~2 hours/day**

---

## ✅ Submission Checklist (Jan 5)

- [ ] GitHub repo with clean code
- [ ] Live prototype (Vercel + Railway)
- [ ] 2-minute demo video (YouTube link)
- [ ] README.md explaining project
- [ ] ARCHITECTURE.md explaining system design
- [ ] All working, no broken links

---

## 💡 Key Insights

From the hackathon brief:
- **"The experience matters more than the data pipeline"** → Fake the data, focus on UX
- **"Using less data well is often better"** → 200 hardcoded ingredients is fine
- **"OCR, scraping, and database scale are not evaluation criteria"** → Don't waste time on these

---

## 🎨 Tech Stack

| Component | Technology |
|-----------|-----------|
| Frontend | React + Vite |
| Backend | Node.js + Express |
| LLM | OpenAI GPT-4 |
| Data | Mock JSON (200 ingredients) |
| Deploy | Vercel (FE) + Railway (BE) |

---

## 🚀 Deployment (Quick)

**Frontend: Vercel**
1. Push to GitHub
2. vercel.com → Import repo
3. Add env vars
4. Done (auto-deploys)

**Backend: Railway**
1. Push to GitHub
2. railway.app → New project
3. Add env vars
4. Done (auto-deploys)

---

## 📚 Read Next

1. **SUMMARY.md** - Big picture strategy (15 min)
2. **quick_start_setup.md** - Setup guide (20 min)
3. **code_templates.md** - Copy-paste code (10 min)
4. **winning_tips.md** - Judge optimization (15 min)

All files are being created and shared with you.

---

## ✨ You've Got Everything You Need

- ✅ Clear strategy
- ✅ Code templates
- ✅ Realistic timeline
- ✅ Judge-focused tips
- ✅ Design system
- ✅ Demo guide

**Now stop reading and start building.** 🚀

Good luck! 🎉
