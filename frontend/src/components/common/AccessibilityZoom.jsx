import { useState, useEffect } from "react";
import { ZoomIn, ZoomOut, RotateCcw } from "lucide-react";

const SIZES = {
  sm: "90%",
  normal: "100%",
  lg: "115%",
  xl: "125%",
};

export default function AccessibilityZoom() {
  const [level, setLevel] = useState("normal");

  useEffect(() => {
    document.documentElement.style.fontSize = SIZES[level];
  }, [level]);

  const increase = () => {
    if (level === "sm") setLevel("normal");
    else if (level === "normal") setLevel("lg");
    else if (level === "lg") setLevel("xl");
  };

  const decrease = () => {
    if (level === "xl") setLevel("lg");
    else if (level === "lg") setLevel("normal");
    else if (level === "normal") setLevel("sm");
  };

  const reset = () => {
    setLevel("normal");
  };

  return (
    <div className="fixed bottom-20 right-6 z-40 flex flex-col gap-1.5 bg-white/90 backdrop-blur-xs p-1.5 rounded-2xl shadow-lg border border-slate-200/80">
      <button
        onClick={increase}
        disabled={level === "xl"}
        title="Aumentar texto"
        className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
      >
        <ZoomIn className="w-4 h-4" />
      </button>

      {level !== "normal" && (
        <button
          onClick={reset}
          title="Restablecer tamaño"
          className="p-2 rounded-xl text-brand-primary hover:bg-brand-icon-bg transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      )}

      <button
        onClick={decrease}
        disabled={level === "sm"}
        title="Disminuir texto"
        className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
      >
        <ZoomOut className="w-4 h-4" />
      </button>
    </div>
  );
}
