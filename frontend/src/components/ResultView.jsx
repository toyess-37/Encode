// src/components/ResultView.jsx
import { Icon } from "./Icon";

const THEMES = {
  green: {
    header: "bg-[#10B981]",
    text: "text-[#064E3B]",
    accent: "bg-[#D1FAE5]",
    icon: "CheckCircle2",
  },
  yellow: {
    header: "bg-[#F59E0B]",
    text: "text-[#78350F]",
    accent: "bg-[#FEF3C7]",
    icon: "AlertCircle",
  },
  red: {
    header: "bg-[#EF4444]",
    text: "text-[#7F1D1D]",
    accent: "bg-[#FEE2E2]",
    icon: "XCircle",
  },
  gray: {
    header: "bg-slate-500",
    text: "text-slate-800",
    bg: "bg-slate-50",
    icon: "Settings",
    proBorder: "border-slate-200",
    conBorder: "border-slate-200"
  }
};

export function ResultView({ result, onBack }) {
  if (!result) return null;

  const theme = THEMES[result.color] || THEMES.gray;

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Header */}
      <div
        className={`${theme.header} min-h-[30vh] relative flex flex-col p-6 transition-colors duration-500`}
      >
        <button
          onClick={onBack}
          className="absolute top-6 right-6 p-2 bg-black/10 hover:bg-black/20 text-white rounded-full backdrop-blur-md transition-colors"
        >
          <Icon name="ArrowLeft" size={24} />
        </button>

        <div className="mt-auto mb-16 max-w-2xl mx-auto w-full text-white">
          <div className="flex items-center gap-2 mb-3 opacity-90">
            <span className="text-xs font-bold uppercase tracking-widest bg-black/20 px-2 py-1 rounded-md backdrop-blur-sm">
              Detected
            </span>
            <span className="text-sm opacity-80">
              {result.inferredintent || "Contextual analysis"}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
            {result.productname}
          </h1>
        </div>
      </div>

      {/* Body card */}
      <div className="-mt-12 px-4 pb-12 max-w-2xl mx-auto relative z-10 animate-slide-up">
        <div className="bg-white rounded-[2rem] shadow-xl shadow-gray-200/50 overflow-hidden">
          {/* Verdict header */}
          <div className="p-8 border-b border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                <Icon name="Sparkles" size={12} />
                <span>Context</span>
                <span className="text-gray-500">
                  {result.inferredintent || "General health"}
                </span>
              </div>
              <span
                className={`${theme.text} ${theme.accent} bg-opacity-20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-2`}
              >
                <Icon name={theme.icon} size={16} />
                <span>{result.verdict}</span>
              </span>
            </div>

            <p className="text-xl text-gray-800 leading-relaxed font-medium">
              {result.summary}
            </p>
          </div>

          {/* Pros / Cons */}
          <div className="grid grid-cols-1 md:grid-cols-2 border-b border-gray-100">
            <div className="p-6 bg-emerald-50/50 border-b md:border-b-0 md:border-r border-emerald-100">
              <div className="flex items-center gap-2 mb-4 text-emerald-800">
                <Icon name="ThumbsUp" size={18} />
                <h3 className="text-sm font-bold uppercase tracking-wider">
                  The Good
                </h3>
              </div>
              <ul className="space-y-3">
                {result.positives?.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm text-emerald-900/80 leading-snug"
                  >
                    <span className="mt-1 w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-6 bg-rose-50/50 border-rose-100">
              <div className="flex items-center gap-2 mb-4 text-rose-800">
                <Icon name="AlertTriangle" size={18} />
                <h3 className="text-sm font-bold uppercase tracking-wider">
                  Watch Out
                </h3>
              </div>
              <ul className="space-y-3">
                {result.negatives?.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm text-rose-900/80 leading-snug"
                  >
                    <span className="mt-1 w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Science box */}
          <div className="p-8">
            <div className="bg-gray-900 rounded-2xl p-6 text-white relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-5 transform group-hover:scale-110 transition-transform duration-700">
                <Icon name="Microscope" size={100} />
              </div>

              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-3 text-blue-400">
                  <Icon name="FlaskConical" size={18} />
                  <span className="text-xs font-bold uppercase tracking-widest">
                    Scientific Insight
                  </span>
                </div>
                <p className="text-gray-300 leading-relaxed text-sm">
                  {result.keyinsight}
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={onBack}
            className="w-full mt-6 py-4 rounded-2xl bg-white border border-slate-200 text-slate-600 font-bold shadow-sm hover:bg-slate-50 hover:text-slate-900 transition-all active:scale-95 flex items-center justify-center gap-2 group"
          >
            <Icon name="Search" size={20} className="text-slate-400 group-hover:text-slate-700 transition-colors" />
            <span>Search Again</span>
          </button>
        </div>
      </div>
    </div>
  );
}
