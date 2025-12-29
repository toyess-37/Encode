// src/components/ScanningView.jsx
export function ScanningView() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-gray-800 via-black to-black opacity-50" />
      <div className="relative z-10 text-center px-6">
        <div className="relative w-24 h-24 mx-auto mb-10">
          <div className="absolute inset-0 border-t-4 border-white rounded-full animate-spin" />
          <div
            className="absolute inset-2 border-r-4 border-gray-600 rounded-full animate-spin"
            style={{ animationDuration: "1.5s" }}
          />
          <div
            className="absolute inset-4 border-b-4 border-gray-800 rounded-full animate-spin"
            style={{ animationDuration: "2s" }}
          />
        </div>
        <h2 className="text-3xl font-bold animate-pulse tracking-tight">
          Analyzing Composition
        </h2>
        <p className="text-gray-400 mt-4 text-sm font-mono uppercase tracking-widest">
          Inferring Health Context...
        </p>
      </div>
    </div>
  );
}
