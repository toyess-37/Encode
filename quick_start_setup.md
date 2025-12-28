# QUICK START SETUP GUIDE

**Time to read:** 15 minutes  
**Time to code:** 30 minutes to MVP

---

## 📦 Step 1: Create Project Folders

```bash
mkdir ingredient-copilot
cd ingredient-copilot

# Create frontend with Vite
npm create vite@latest frontend -- --template react
cd frontend
npm install zustand axios recharts lucide-react clsx dotenv
cd ..

# Create backend folder
mkdir backend
cd backend
npm init -y
npm install express cors dotenv openai axios
npm install --save-dev nodemon
cd ..
```

---

## 📂 Folder Structure After Setup

```
ingredient-copilot/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── InputStage.jsx
│   │   │   ├── ReasoningView.jsx
│   │   │   └── TradeoffCard.jsx
│   │   ├── styles/
│   │   │   └── main.css
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env.local
│   ├── vite.config.js
│   └── package.json
│
├── backend/
│   ├── src/
│   │   ├── index.js
│   │   ├── services/
│   │   │   └── llm-reasoning.js
│   │   └── data/
│   │       └── ingredients.json
│   ├── .env
│   └── package.json
│
└── README.md
```

---

## 🔧 Step 2: Copy Code Files

### Frontend: `src/App.jsx`
Copy from code_templates.md → section "1. Frontend: App.jsx"

### Frontend: `src/components/InputStage.jsx`
Copy from code_templates.md → section "2. Frontend: InputStage.jsx"

### Frontend: `src/components/ReasoningView.jsx`
Copy from code_templates.md → section "3. Frontend: ReasoningView.jsx"

### Frontend: `src/styles/main.css`
Copy from code_templates.md → section "6. CSS: main.css"

### Backend: `src/index.js`
Copy from code_templates.md → section "4. Backend: index.js"

### Backend: `src/services/llm-reasoning.js`
Copy from code_templates.md → section "5. Backend: llm-reasoning.js"

### Backend: `src/data/ingredients.json`
Copy from code_templates.md → section "7. Mock Data: ingredients.json"

---

## 🔑 Step 3: Set Environment Variables

### Frontend: Create `frontend/.env.local`

```env
VITE_API_BASE_URL=http://localhost:5000
VITE_OPENAI_API_KEY=sk-your-openai-key-here
```

**Get your OpenAI API key:**
1. Go to https://platform.openai.com/api-keys
2. Create new secret key
3. Copy it to .env.local
4. Cost: ~$5 for hackathon usage

### Backend: Create `backend/.env`

```env
PORT=5000
NODE_ENV=development
OPENAI_API_KEY=sk-your-openai-key-here
CORS_ORIGIN=http://localhost:5173
```

---

## ⚡ Step 4: Update package.json Scripts

### Frontend: `frontend/package.json`
Already set up by Vite. Just use:
```bash
npm run dev
```

### Backend: `backend/package.json`
Update scripts section:
```json
"scripts": {
  "dev": "nodemon src/index.js",
  "start": "node src/index.js"
}
```

---

## 🚀 Step 5: Run Locally

### Terminal 1: Start Frontend
```bash
cd frontend
npm run dev
```
✅ Opens on http://localhost:5173

### Terminal 2: Start Backend
```bash
cd backend
npm run dev
```
✅ Runs on http://localhost:5000

---

## ✅ Step 6: Test Manually

1. Open http://localhost:5173 in browser
2. Type: `whey protein, soy lecithin, sucralose`
3. Click "Analyze"
4. Wait <5 seconds for response
5. Should see:
   - Summary statement
   - Confidence meter
   - Ingredient concerns
   - Tradeoffs
   - Uncertainty section

**If it works → MVP is done!** 🎉

---

## 🐛 Troubleshooting

### "Cannot find module 'express'"
```bash
cd backend
npm install express cors dotenv openai
```

### "OPENAI_API_KEY is undefined"
- Check `.env` file exists with correct key
- Restart backend server
- Verify key format starts with `sk-`

### "Cannot GET /api/analyze"
- Backend is not running
- Check terminal 2 shows "Server running on port 5000"

### "Vite plugin not found"
```bash
cd frontend
npm install
npm run dev
```

---

## 📋 Next: Add Polish (Days 3-4)

1. **Error handling:** Catch API failures
2. **Animations:** Fade in responses
3. **Mobile responsive:** Test on phone
4. **Example buttons:** Pre-filled ingredients

See `code_templates.md` for complete component code with these features already included.

---

## 🎬 Then: Create Demo Video (Day 4)

Record a 2-minute video showing:
- Problem: Confused at grocery shelf
- Solution: Type ingredients → get instant insight
- Reasoning: Show why conclusions matter
- Impact: User is now confident

Upload to YouTube (unlisted is fine).

---

## 📤 Finally: Deploy (Days 5-7)

### Frontend to Vercel (1 click)
1. Push code to GitHub
2. Go to vercel.com
3. Import your GitHub repo
4. Add .env.local as environment variables
5. Deploy (auto-deploys on push)

### Backend to Railway (1 click)
1. Push code to GitHub
2. Go to railway.app
3. Create new project
4. Add .env as environment variables
5. Deploy (auto-deploys on push)

---

## ✨ Done!

You now have:
- ✅ Working MVP
- ✅ Real LLM integration
- ✅ Deployed to live URLs
- ✅ Ready for demo video
- ✅ Ready for submission

**Total time: ~4-6 focused hours**

---

## 📞 Reference Files

- **README_START_HERE.md** → Overview & timeline
- **SUMMARY.md** → Complete strategy
- **code_templates.md** → All code (copy-paste)
- **winning_tips.md** → Judge optimization
- **quick_start_setup.md** → This file

---

**Ready to build? Start with Step 1 above. You've got this! 🚀**