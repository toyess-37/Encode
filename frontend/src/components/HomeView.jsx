// src/components/HomeView.jsx
import { useRef, useState, useEffect } from "react";
import { Icon } from "./Icon";

export function HomeView({ query, setQuery, file, setFile, onAnalyze }) {
  const fileInputRef = useRef(null);
  const textareaRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto'; // Reset height to shrink if text is deleted
      textarea.style.height = `${textarea.scrollHeight}px`; // Set to scrollHeight
    }
  }, [query]);

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

  const startListening = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-IN';
      recognition.continuous = false;

      recognition.onstart = () => {
        console.log("Listening...");
      };

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setQuery(transcript); // puts the text into search box
      };

      recognition.start();
    } else {
      alert("Voice search is not supported in this browser.");
    }
  };

  const [placeholder, setPlaceholder] = useState("Type a food or scan to know more");
  const [isFading, setIsFading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const prompts = [
    "Check these ingredients for gluten...",
    "Is this meal keto-friendly?",
    "Scan this chocolate bar...",
    "Ye kaun sa fruit hai?",
    "Good season to eat ice-cream"
  ];

  useEffect(() => {
    if (isFocused || query) return;

    const interval = setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * prompts.length);
        setPlaceholder(prompts[randomIndex]);
        setIsFading(false);
      }, 500);
    }, 4000);
    return () => clearInterval(interval);
  }, [isFocused, query]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative">
      <div 
        className="absolute top-6 left-6 z-50 flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
        onClick={() => window.location.reload()}
      >
        <div className="flex items-center justify-center"><img src="/src/assets/logo_eatneat.svg" alt="EatNeat Logo" className="w-9 h-9 object-contain"/></div>
        <span className="text-xl font-bold tracking-tight text-slate-900">EatNeat</span>
      </div>

      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-[-50%] w-[200%] h-[200%] bg-food-pattern rotate-12"></div>
      </div>

      <div className="w-full max-w-xl animate-fade-in relative z-10">
        {/* Logo + title */}
        <div class="text-center mb-10">
            <h1 class="text-4xl font-extrabold text-slate-900 mb-3 leading-tight">
                What are we <span class="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-blue-600">eating today?</span>
            </h1>
            <p class="text-slate-500 text-lg">Your AI-powered nutrition co-pilot.</p>
        </div>

        {/* Search container */}
        <div className="bg-white p-3 rounded-[2em] border border-gray-300">
          {/* Image preview */}
          {file && (
            <div className="mx-2 mt-2 mb-3 px-4 py-3 bg-gray-50 rounded-2xl flex items-center justify-between border border-gray-100 animate-fade-in">
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center text-gray-400">
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
          <div className="flex flex-col items-center gap-2 pl-0 pr-0 pb-1">
            <textarea
              ref={textareaRef}
              rows={1}
              maxLength={100}
              onFocus={() => { setIsFocused(true); }}
              onBlur={() => { setIsFocused(false); }}
              className={`w-full py-4 text-base md:text-lg outline-none text-gray-900 placeholder:text-gray-300 font-medium bg-transparent min-w-0 resize-none overflow-hidden transition-opacity ${isFading && !isFocused ? 'opacity-0' : 'opacity-100'}`}
              placeholder={file ? "Add context e.g. Is this vegan?" : placeholder}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault(); // Prevent new line
                  onAnalyze();
                }
              }}
              style={{ maxHeight: '200px', overflowY: query.length > 100 ? 'auto' : 'hidden' }}
            />
            {/* Controls */}
            <div className="w-full flex gap-3 justify-end pt-2 border-t border-transparent">
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileSelect}
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className={`p-4 rounded-3xl transition-all duration-200 ${file
                  ? "bg-black text-white"
                  : "bg-gray-50 text-gray-500 hover:bg-gray-200"
                  }`}
                title="Upload Image"
              >
                <Icon name="Camera" size={18} strokeWidth={2} />
              </button>

              <button
                onClick={startListening}
                className="p-4 rounded-3xl bg-gray-50 text-gray-500 hover:bg-gray-200 transition-all duration-200"
                title="Voice Search">
                <Icon name="Mic" size={18} strokeWidth={2} />
              </button>

              <button
                onClick={onAnalyze}
                className="p-4 bg-black hover:bg-gray-700 text-white rounded-[2em] transition-all duration-200 active:scale-95"
                title="Send query"
              >
                <Icon name="ArrowRight" size={18} strokeWidth={3} />
              </button>
            </div>
          </div>
        </div>

        {/* Footer badges */}
        <div className="mt-8 flex flex-col justify-center gap-2 text-md font-bold text-gray-300">
          <span
            className="flex items-center gap-2 hover:text-gray-400 transition-colors duration-500"
          >
            <Icon name="Shield" size={14} />
            We do not store any images or query.
          </span>
          <span
            className="flex items-center gap-2 hover:text-gray-400 transition-colors duration-500 cursor-help"
            title="AI infers intent from the product itself"
          >
            <Icon name="BrainCircuit" size={14} strokeWidth={2} />
            Context Aware.
          </span>
        </div>
      </div>
    </div>
  );
}