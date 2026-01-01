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

    // Resize and Convert
    if (file) {
      try {
        const resizedDataUrl = await resizeImage(file);
        base64Data = resizedDataUrl.split(",")[1];
        mimeType = "image/jpeg";
      } catch(err) {
        console.error("Image processing failed", err);
      }
      // const reader = new FileReader();
      // reader.readAsDataURL(file);
      
      // await new Promise((resolve) => {
      //   reader.onloadend = () => {
      //     base64Data = reader.result.split(",")[1];
      //     mimeType = file.type;
      //     resolve();
      //   };
      // });
    }

    // Try Gemini API
    const apiResult = await analyzeWithGemini(base64Data, mimeType, query);

    if (apiResult) {
      setResult(apiResult);
    } else {
      // --- FALLBACK: SYSTEM CHECK / API MISSING ---
      setResult({
        product_name: "API Setup Required",
        inferred_intent: "System Diagnosis",
        verdict: "Configuration Missing",
        color: "gray",
        summary: "Server side error: The app could not connect to the AI.",
        positives: [],
        negatives: [],
        key_insight: "Technical Note: Ensure your .env file contains a valid VITE_GEMINI_API_KEY and restart the server."
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

const resizeImage = (file, maxWidth = 800) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        // If image is smaller than maxWidth, don't upscale it
        const finalWidth = Math.min(img.width, maxWidth);
        const finalHeight = img.height * (finalWidth / img.width);

        const canvas = document.createElement("canvas");
        canvas.width = finalWidth;
        canvas.height = finalHeight;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, finalWidth, finalHeight);

        // Compress to JPEG at 0.7 quality
        resolve(canvas.toDataURL("image/jpeg", 0.7));
      };
    };
  });
};