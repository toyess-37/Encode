// src/components/HomeView.jsx
import { useRef } from "react";
import { Icon } from "./Icon";

export function HomeView({ query, setQuery, file, setFile, onAnalyze }) {
  const fileInputRef = useRef(null);

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative bg-[#FAFAFA]">
      <div className="w-full max-w-lg animate-fade-in z-10">
        {/* Logo + title */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-[2rem] bg-black text-white shadow-2xl shadow-gray-200 mb-6 rotate-3 hover:rotate-0 transition-transform duration-500">
            <Icon name="ScanLine" size={36} />
          </div>
          <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight mb-3">
            Nutri-Mind
          </h1>
          <p className="text-gray-500 text-lg font-medium">
            Privacy-First Contextual AI
          </p>
        </div>

        {/* Search container */}
        <div className="bg-white p-3 rounded-[2rem] shadow-xl shadow-gray-100 border border-gray-100 transition-transform hover:scale-[1.01] duration-300">
          {/* Image preview */}
          {file && (
            <div className="mx-2 mt-2 mb-3 px-4 py-3 bg-gray-50 rounded-2xl flex items-center justify-between border border-gray-100 animate-fade-in">
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center text-gray-400">
                  <Icon name="Image" size={20} />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                    Attached
                  </span>
                  <span className="text-sm font-semibold text-gray-800 truncate max-w-[150px]">
                    {file.name}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setFile(null)}
                className="w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-sm text-gray-400 hover:text-red-500 transition-colors"
              >
                <Icon name="X" size={16} />
              </button>
            </div>
          )}

          {/* Input */}
          <div className="flex items-center gap-3 pl-4 pr-2 pb-1">
            <input
              type="text"
              className="flex-1 py-4 text-lg outline-none text-gray-900 placeholder:text-gray-300 font-medium bg-transparent"
              placeholder={
                file
                  ? "Add context e.g. Is this keto?"
                  : "Type a food or scan..."
              }
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") onAnalyze();
              }}
            />
            {/* Controls */}
            <div className="flex gap-2">
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileSelect}
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className={`p-4 rounded-2xl transition-all duration-200 ${
                  file
                    ? "bg-black text-white"
                    : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                }`}
                title="Upload Image"
              >
                <Icon name="Camera" size={24} />
              </button>
              <button
                onClick={onAnalyze}
                className="p-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl shadow-lg shadow-blue-200 transition-all duration-200 active:scale-95"
              >
                <Icon name="ArrowRight" size={24} />
              </button>
            </div>
          </div>
        </div>

        {/* Footer badges */}
        <div className="mt-12 flex justify-center gap-8 text-xs font-bold tracking-widest text-gray-300 uppercase">
          <span
            className="flex items-center gap-2 hover:text-gray-400 transition-colors cursor-help"
            title="We do not store images or text"
          >
            <Icon name="Shield" size={14} />
            Zero Data Stored
          </span>
          <span
            className="flex items-center gap-2 hover:text-gray-400 transition-colors cursor-help"
            title="AI infers intent from the product itself"
          >
            <Icon name="BrainCircuit" size={14} />
            Context Aware
          </span>
        </div>
      </div>
    </div>
  );
}
