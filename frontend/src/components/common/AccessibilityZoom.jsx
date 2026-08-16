import { useState, useEffect, useRef } from "react";
import { ZoomIn, ZoomOut, RotateCcw, Eye, X } from "lucide-react";

const SIZES = {
  sm: "90%",
  normal: "100%",
  lg: "115%",
  xl: "125%",
};

export default function AccessibilityZoom() {
  const [isOpen, setIsOpen] = useState(false);
  const [level, setLevel] = useState("normal");
  const containerRef = useRef(null);

  useEffect(() => {
    document.documentElement.style.fontSize = SIZES[level];
  }, [level]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
    <div
      ref={containerRef}
      className="fixed bottom-20 right-6 z-40 flex flex-col items-end gap-2"
    >
      {isOpen && (
        <div className="flex flex-col gap-1 bg-white/95 backdrop-blur-sm p-1.5 rounded-2xl shadow-xl border border-slate-200">
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
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        title="Accesibilidad visual"
        aria-label="Opciones de tamaño de texto"
        className={`p-3 rounded-full shadow-lg border transition-all duration-200 ${
          isOpen
            ? "bg-brand-primary text-white border-brand-primary"
            : "bg-white/90 backdrop-blur-sm text-brand-primary border-slate-200 hover:bg-brand-icon-bg"
        }`}
      >
        {isOpen ? <X className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
      </button>
    </div>
  );
}
