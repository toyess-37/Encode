// src/components/Icon.jsx
import { useEffect } from "react";
import * as lucide from "lucide-react";

export function Icon({ name, size = 20, strokeWidth = 3, className = "" }) {
  useEffect(() => {
    // no-op in lucide-react version, but kept for API similarity
  }, [name]);

  const LucideIcon = lucide[name];
  if (!LucideIcon) return null;

  return <LucideIcon size={size} strokeWidth={strokeWidth} className={className} />;
}
