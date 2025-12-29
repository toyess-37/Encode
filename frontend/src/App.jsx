// src/App.jsx
import { useState } from "react";
import { HomeView } from "./components/HomeView";
import { ScanningView } from "./components/ScanningView";
import { ResultView } from "./components/ResultView";

const PRIVATE_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "";

export default function App() {
  const [query, setQuery] = useState("");
  const [file, setFile] = useState(null);
  const [view, setView] = useState("home");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!query && !file) {
      alert("Please enter text or upload an image to start.");
      return;
    }

    setLoading(true);
    setView("scanning");

    // For now, just simulate like index2.html
    const safeInput = (query || "").toLowerCase();
    const isHealthy =
      safeInput.includes("yogurt") ||
      safeInput.includes("salad") ||
      safeInput.includes("apple") ||
      safeInput.includes("vegan");

    setTimeout(() => {
      setResult({
        productname: file
          ? "Scanned Item"
          : query.length > 20
          ? "Complex Query"
          : query || "Unknown item",
        inferredintent: "General health",
        verdict: isHealthy ? "Healthy" : "Moderate",
        color: isHealthy ? "green" : "yellow",
        summary: isHealthy
          ? "This is a nutrient-dense choice that supports sustained energy levels."
          : "Processed ingredients detected. It is fine occasionally, but watch the sugar content.",
        positives: isHealthy
          ? ["High in vitamins", "Low glycemic index", "Natural ingredients"]
          : ["Quick energy source", "Convenient packaging"],
        negatives: isHealthy
          ? ["Short shelf life", "Can be expensive"]
          : ["High added sugar", "Contains preservatives", "Low satiety"],
        keyinsight:
          "Simulation mode. Add your API key to get real-time AI analysis.",
      });
      setLoading(false);
      setView("results");
    }, 2000);
  };

  if (view === "scanning" || loading) {
    return <ScanningView />;
  }

  if (view === "results") {
    return (
      <ResultView
        result={result}
        onBack={() => {
          setView("home");
          setFile(null);
          setQuery("");
        }}
      />
    );
  }

  return (
    <HomeView
      query={query}
      setQuery={setQuery}
      file={file}
      setFile={setFile}
      onAnalyze={handleAnalyze}
    />
  );
}
