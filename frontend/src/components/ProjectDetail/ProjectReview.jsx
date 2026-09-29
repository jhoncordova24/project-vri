import { useState, useRef, useEffect } from "react";
import {
  ChevronDown,
  ChevronUp,
  FileText,
  FileEdit,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";
import SectionContainer from "../common/SectionContainer";

export default function ProjectReview({
  resenia,
  contract,
  contractUrl,
  modification,
  modificationUrl,
  culmination,
  culminationUrl,
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [contentHeight, setContentHeight] = useState("auto");
  const contentRef = useRef(null);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(`${contentRef.current.scrollHeight}px`);
    }
  }, [resenia]);

  if (!resenia) return null;

  const paragraphs = resenia
    .split(/\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

  const isLongContent = paragraphs.length > 1 || resenia.length > 350;

  const isValid = (val) =>
    Boolean(
      val &&
      val.trim() !== "" &&
      val !== "--" &&
      val.toLowerCase() !== "no se sabe",
    );

  const legalItems = [
    {
      id: "contract",
      label: "Contrato",
      value: contract,
      url: contractUrl,
      valid: isValid(contract),
      icon: FileText,
    },
    {
      id: "modification",
      label: "Modificación",
      value: modification,
      url: modificationUrl,
      valid: isValid(modification),
      icon: FileEdit,
    },
    {
      id: "culmination",
      label: "Culminación",
      value: culmination,
      url: culminationUrl,
      valid: isValid(culmination),
      icon: CheckCircle2,
    },
  ].filter((item) => item.valid);

  return (
    <SectionContainer
      label="Información Oficial"
      title="Marco Legal y Generalidades"
    >
      <div className="bg-white border border-slate-200/80 rounded-2xl shadow-xs overflow-hidden">
        <div className="p-6 sm:p-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Reseña del Proyecto
            </h3>
            {isLongContent && (
              <button
                type="button"
                onClick={() => setIsExpanded(!isExpanded)}
                className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-brand-primary hover:text-brand-primary/80 transition-colors cursor-pointer"
              >
                <span>{isExpanded ? "Contraer" : "Leer completa"}</span>
                {isExpanded ? (
                  <ChevronUp className="w-3.5 h-3.5" />
                ) : (
                  <ChevronDown className="w-3.5 h-3.5" />
                )}
              </button>
            )}
          </div>

          <div className="relative">
            <div
              ref={contentRef}
              className="space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed text-justify overflow-hidden transition-all duration-500 ease-in-out"
              style={{
                maxHeight:
                  !isExpanded && isLongContent ? "180px" : contentHeight,
              }}
            >
              {paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            {!isExpanded && isLongContent && (
              <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none" />
            )}
          </div>

          {isLongContent && (
            <div className="mt-4 flex sm:hidden justify-start">
              <button
                type="button"
                onClick={() => setIsExpanded(!isExpanded)}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold text-brand-primary bg-brand-primary/10 hover:bg-brand-primary/15 transition-colors cursor-pointer"
              >
                <span>{isExpanded ? "Leer menos" : "Leer más"}</span>
                {isExpanded ? (
                  <ChevronUp className="w-3.5 h-3.5" />
                ) : (
                  <ChevronDown className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
          )}
        </div>

        {legalItems.length > 0 && (
          <div className="border-t border-slate-100 bg-slate-50/70 px-6 py-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 shrink-0">
              Expedientes y Resoluciones
            </span>

            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
              {legalItems.map((item) => {
                const Icon = item.icon;
                const hasUrl = Boolean(item.url);
                const Component = hasUrl ? "a" : "div";
                const dynamicProps = hasUrl
                  ? {
                      href: item.url,
                      target: "_blank",
                      rel: "noopener noreferrer",
                      title: `Abrir documento de ${item.label}`,
                    }
                  : {};

                return (
                  <Component
                    key={item.id}
                    {...dynamicProps}
                    className={`inline-flex items-center gap-2.5 py-1.5 px-3 rounded-lg border text-xs transition-all duration-200 select-none ${
                      hasUrl
                        ? "bg-white border-slate-200/90 text-slate-700 shadow-xs hover:border-brand-primary/40 hover:text-brand-primary hover:shadow-sm cursor-pointer group"
                        : "bg-white/80 border-slate-200/60 text-slate-600 cursor-default"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5 text-brand-primary shrink-0" />

                    <span className="font-semibold text-slate-400 uppercase text-[11px] tracking-wide">
                      {item.label}:
                    </span>

                    <span className="font-mono font-medium text-slate-800">
                      {item.value}
                    </span>

                    {hasUrl && (
                      <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-brand-primary transition-colors ml-0.5" />
                    )}
                  </Component>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </SectionContainer>
  );
}
