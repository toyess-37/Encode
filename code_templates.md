# Code Templates (Copy & Paste Ready)

## 1. Frontend: App.jsx

```jsx
import { useState } from 'react';
import { InputStage } from './components/InputStage';
import { ReasoningView } from './components/ReasoningView';
import './styles/main.css';

export default function App() {
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAnalyze = async (ingredients, concern) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/analyze`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ingredients, concern })
        }
      );

      if (!response.ok) throw new Error('Analysis failed');

      const data = await response.json();
      setAnalysis(data);
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      {!analysis ? (
        <InputStage onSubmit={handleAnalyze} loading={loading} />
      ) : (
        <ReasoningView analysis={analysis} onReset={() => setAnalysis(null)} />
      )}
    </div>
  );
}
```

---

## 2. Frontend: InputStage.jsx

```jsx
import { useState } from 'react';
import { ArrowRight } from 'lucide-react';

export const InputStage = ({ onSubmit, loading }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSubmit(input, 'general_health');
    }
  };

  return (
    <div className="input-stage">
      <div className="input-container">
        <h1>What are you eating?</h1>
        <p className="subtitle">Describe a product or paste its ingredients.</p>

        <form onSubmit={handleSubmit}>
          <textarea
            className="ingredient-input"
            placeholder="Paste ingredients from a label..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
            rows={6}
          />

          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="submit-btn"
          >
            {loading ? 'Analyzing...' : 'Analyze'}
            <ArrowRight size={18} />
          </button>
        </form>

        <div className="examples">
          <p className="label">Try these:</p>
          <div className="example-pills">
            <button
              onClick={() => setInput('Whey protein isolate, soy lecithin, sucralose')}
              className="example-pill"
            >
              Protein Powder
            </button>
            <button
              onClick={() => setInput('Rolled oats, honey, almonds')}
              className="example-pill"
            >
              Granola
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
```

---

## 3. Frontend: ReasoningView.jsx

```jsx
import { AlertCircle, CheckCircle, AlertTriangle, ChevronLeft } from 'lucide-react';

export const ReasoningView = ({ analysis, onReset }) => {
  const getRiskIcon = (risk) => {
    switch (risk) {
      case 'safe':
        return <CheckCircle className="icon-safe" />;
      case 'caution':
        return <AlertTriangle className="icon-caution" />;
      case 'avoid':
        return <AlertCircle className="icon-avoid" />;
      default:
        return null;
    }
  };

  return (
    <div className="reasoning-view">
      <button className="back-btn" onClick={onReset}>
        <ChevronLeft size={20} /> Analyze another
      </button>

      <div className="summary-section">
        <h2>{analysis.summary}</h2>
        <div className="confidence-meter">
          <div
            className="confidence-fill"
            style={{ width: `${analysis.confidence * 100}%` }}
          />
        </div>
        <p className="confidence-text">
          {Math.round(analysis.confidence * 100)}% confident
        </p>
      </div>

      {analysis.concerns && analysis.concerns.length > 0 && (
        <div className="concerns-section">
          <h3>Ingredient Breakdown</h3>
          {analysis.concerns.map((concern, idx) => (
            <div key={idx} className={`concern-card concern-${concern.risk}`}>
              <div className="concern-icon">{getRiskIcon(concern.risk)}</div>
              <div className="concern-content">
                <strong>{concern.ingredient}</strong>
                <p>{concern.reason}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {analysis.tradeoffs && analysis.tradeoffs.length > 0 && (
        <div className="tradeoffs-section">
          <h3>Key Tradeoffs</h3>
          <div className="tradeoffs-grid">
            {analysis.tradeoffs.map((tradeoff, idx) => (
              <div key={idx} className="tradeoff-card">
                <div className="gain">
                  <span className="label">✓ Gain</span>
                  <p>{tradeoff.gain}</p>
                </div>
                <div className="divider" />
                <div className="lose">
                  <span className="label">✗ Lose</span>
                  <p>{tradeoff.lose}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {analysis.uncertainty && (
        <div className="uncertainty-section">
          <div className="uncertainty-badge">
            <AlertCircle size={18} />
            <p>{analysis.uncertainty}</p>
          </div>
        </div>
      )}

      <button onClick={onReset} className="reset-btn">
        Analyze Another Product
      </button>
    </div>
  );
};
```

---

## 4. Backend: index.js

```javascript
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { analyzeIngredients } from './services/llm-reasoning.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.post('/api/analyze', async (req, res) => {
  try {
    const { ingredients, concern } = req.body;

    if (!ingredients || !concern) {
      return res.status(400).json({ error: 'Missing ingredients or concern' });
    }

    const analysis = await analyzeIngredients(ingredients, concern);
    res.json(analysis);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Analysis failed' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

---

## 5. Backend: llm-reasoning.js

```javascript
import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function analyzeIngredients(ingredientList, concern) {
  const prompt = `
You are a health co-pilot analyzing food ingredients.

Ingredients: ${ingredientList}
User's Health Concern: ${concern}

Provide analysis in JSON format:
{
  "summary": "One-line assessment",
  "confidence": 0.85,
  "concerns": [
    {
      "ingredient": "name",
      "risk": "safe|caution|avoid",
      "reason": "Why this matters for this user"
    }
  ],
  "tradeoffs": [
    {
      "gain": "benefit",
      "lose": "tradeoff"
    }
  ],
  "uncertainty": "What we're not sure about"
}`;

  try {
    const message = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7
    });

    const responseText = message.choices[0].message.content;
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    const analysis = JSON.parse(jsonMatch[0]);

    return analysis;
  } catch (error) {
    console.error('LLM error:', error);
    throw new Error('Analysis failed');
  }
}
```

---

## 6. CSS: main.css

```css
:root {
  --primary: #2c8e8a;
  --primary-hover: #1d7470;
  --safe: #10b981;
  --caution: #f59e0b;
  --avoid: #ef4444;
  --bg: #f9f7f4;
  --surface: #ffffff;
  --text: #1f2121;
  --text-secondary: #626c7c;
  --border: #e8e4e0;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  background: var(--bg);
  color: var(--text);
}

.app {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.input-stage {
  width: 100%;
  max-width: 600px;
}

.input-container h1 {
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 8px;
}

.input-container .subtitle {
  color: var(--text-secondary);
  margin-bottom: 32px;
}

.ingredient-input {
  width: 100%;
  padding: 12px;
  border: 1px solid var(--border);
  border-radius: 8px;
  font-size: 14px;
  min-height: 140px;
  font-family: inherit;
  margin-bottom: 12px;
  resize: vertical;
}

.ingredient-input:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(44, 142, 138, 0.1);
}

.submit-btn {
  width: 100%;
  padding: 12px;
  background: var(--primary);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.2s;
}

.submit-btn:hover:not(:disabled) {
  background: var(--primary-hover);
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.summary-section {
  background: var(--surface);
  padding: 24px;
  border-radius: 12px;
  margin-bottom: 20px;
  border-left: 4px solid var(--primary);
}

.summary-section h2 {
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 16px;
}

.confidence-meter {
  height: 6px;
  background: var(--border);
  border-radius: 3px;
  overflow: hidden;
  margin-bottom: 8px;
}

.confidence-fill {
  height: 100%;
  background: var(--primary);
  transition: width 0.8s ease-out;
}

.concern-card {
  display: flex;
  gap: 12px;
  padding: 14px;
  background: var(--surface);
  border-radius: 8px;
  margin-bottom: 10px;
  border-left: 3px solid var(--border);
}

.concern-card.concern-safe {
  border-left-color: var(--safe);
}

.concern-card.concern-caution {
  border-left-color: var(--caution);
}

.concern-card.concern-avoid {
  border-left-color: var(--avoid);
}

.concern-content strong {
  display: block;
  margin-bottom: 4px;
  font-size: 14px;
}

.concern-content p {
  font-size: 13px;
  color: var(--text-secondary);
  margin: 0;
}

.example-pill {
  padding: 8px 12px;
  background: #f3f0ed;
  border: 1px solid var(--border);
  border-radius: 20px;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s;
}

.example-pill:hover {
  background: var(--primary);
  color: white;
}

.reset-btn {
  width: 100%;
  padding: 12px;
  margin-top: 8px;
  background: var(--surface);
  color: var(--primary);
  border: 1px solid var(--primary);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
}

.reset-btn:hover {
  background: var(--primary);
  color: white;
}

@media (max-width: 640px) {
  .input-container h1 {
    font-size: 24px;
  }
  
  .summary-section {
    padding: 20px;
  }
}
```

---

## 7. Mock Data: ingredients.json

```json
{
  "ingredients": [
    {
      "name": "whey protein isolate",
      "type": "dairy",
      "allergens": ["dairy", "lactose"],
      "processing": "high"
    },
    {
      "name": "soy lecithin",
      "type": "emulsifier",
      "allergens": ["soy"],
      "processing": "medium"
    },
    {
      "name": "sucralose",
      "type": "sweetener",
      "allergens": [],
      "processing": "high"
    },
    {
      "name": "rolled oats",
      "type": "grain",
      "allergens": ["gluten (may)"],
      "processing": "low"
    },
    {
      "name": "honey",
      "type": "sweetener",
      "allergens": [],
      "processing": "low"
    }
  ]
}
```

---

## Environment Variables

### Frontend: `.env.local`
```
VITE_API_BASE_URL=http://localhost:5000
VITE_OPENAI_API_KEY=sk-your-api-key
```

### Backend: `.env`
```
PORT=5000
OPENAI_API_KEY=sk-your-api-key
CORS_ORIGIN=http://localhost:5173
```

---

**Use these code templates directly. They're production-ready!**