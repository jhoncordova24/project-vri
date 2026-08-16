import React from "react";
import { Loader2 } from "lucide-react";

export default function LoadingSpinner({
  message = "Cargando información...",
  minHeight = "min-h-[400px]",
}) {
  return (
    <div
      className={`w-full ${minHeight} flex flex-col items-center justify-center gap-3 py-12`}
    >
      <Loader2 className="w-8 h-8 text-brand-primary animate-spin" />
      {message && (
        <p className="text-sm font-medium text-slate-500 animate-pulse">
          {message}
        </p>
      )}
    </div>
  );
}
