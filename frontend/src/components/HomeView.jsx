// src/components/HomeView.jsx
import { useRef, useState, useEffect } from "react";
import { Icon } from "./Icon";

export function HomeView({ query, setQuery, file, setFile, onAnalyze }) {
  const fileInputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      // Cleanup function to avoid memory leaks
      return () => URL.revokeObjectURL(url);
    } else {
      setPreviewUrl(null);
    }
  }, [file]);

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <div className="min-h-[100dvh] flex flex-col items-center justify-center p-6 relative">
      <div className="w-full max-w-md animate-fade-in z-10">
        {/* Logo + title */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center"><img src="/src/assets/logo.png" alt="EatNeat Logo" className="w-20 h-20 object-contain"/></div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-3">
            EatNeat
          </h1>
          <p className="text-gray-500 text-lg font-medium">
            Know your Food!
          </p>
        </div>

        {/* Search container */}
        <div className="bg-white p-3 rounded-xl border border-gray-200 transition-transform duration-1000">
          {/* Image preview */}
          {file && (
            <div className="mx-2 mt-2 mb-3 px-4 py-3 bg-gray-50 rounded-2xl flex items-center justify-between border border-gray-100 animate-fade-in">
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center text-gray-400">
                  {/*<Icon name="Image" size={20} />*/}
                  <div className="flex items-center w-10 h-10 md:w-12 md:h-12 overflow-hidden shrink-0">
                   {previewUrl && (
                     <img 
                       src={previewUrl} 
                       alt="Preview" 
                       className="w-full h-full object-cover" 
                     />
                   )}
                </div>
                </div>
                <div className="flex flex-col min-w-0">
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
          <div className="flex items-center gap-2 pl-3 pr-2 pb-1">
            <input
              type="text"
              className="flex-1 py-2 text-base md:text-lg outline-none text-gray-900 placeholder:text-gray-300 font-medium bg-transparent min-w-0"
              placeholder={
                file
                  ? "Add context e.g. Is this vegan?"
                  : "Type a food or scan"
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
                className={`p-4 rounded-3xl transition-all duration-200 ${
                  file
                    ? "bg-black text-white"
                    : "bg-gray-50 text-gray-500 hover:bg-gray-200"
                }`}
                title="Upload Image"
              >
                <Icon name="Camera" size={18} />
              </button>
              <button
                onClick={onAnalyze}
                className="p-3.5 bg-black hover:bg-blue-700 text-white rounded-[2em] transition-all duration-400 active:scale-95"
              >
                <Icon name="ArrowRight" size={18} />
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
