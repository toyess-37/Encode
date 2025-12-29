import { useState } from "react";
import { HomeView } from "./components/HomeView";
import { ScanningView } from "./components/ScanningView";
import { ResultView } from "./components/ResultView";
import { analyzeWithGemini } from "./services/gemini";

export default function App() {
  const [query, setQuery] = useState("");
  const [file, setFile] = useState(null);
  const [view, setView] = useState("home");
  const [result, setResult] = useState(null);

  const handleAnalyze = async () => {
    if (!query && !file) {
      alert("Please enter text or upload an image to start.");
      return;
    }

    setView("scanning");

    let base64Data = null;
    let mimeType = null;

    // Convert file to base64 if present
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      
      await new Promise((resolve) => {
        reader.onloadend = () => {
          base64Data = reader.result.split(",")[1];
          mimeType = file.type;
          resolve();
        };
      });
    }

    // Try Gemini API
    const apiResult = await analyzeWithGemini(base64Data, mimeType, query);

    if (apiResult) {
      setResult(apiResult);
    } else {
      // Fallback simulation
      const safeInput = (query || "").toLowerCase();
      const isHealthy =
        safeInput.includes("yogurt") ||
        safeInput.includes("salad") ||
        safeInput.includes("apple") ||
        safeInput.includes("vegan");

      setResult({
        productname: file
          ? "Scanned Item"
          : query.length > 20
          ? "Complex Query"
          : query || "Demo Product",
        inferredintent: "General health",
        verdict: isHealthy ? "Healthy" : "Moderate",
        color: isHealthy ? "green" : "yellow",
        summary: isHealthy
          ? "This is a nutrient-dense choice that supports sustained energy levels."
          : "Processed ingredients detected. It's fine occasionally, but watch the sugar content.",
        positives: isHealthy
          ? ["High in vitamins", "Low glycemic index", "Natural ingredients"]
          : ["Quick energy source", "Convenient packaging"],
        negatives: isHealthy
          ? ["Short shelf life", "Can be expensive"]
          : ["High added sugar", "Contains preservatives", "Low satiety"],
        keyinsight:
          "Simulation mode active. Add your Gemini API key in .env.local to get real AI analysis.",
      });
    }

    setView("results");
  };

  if (view === "scanning") {
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