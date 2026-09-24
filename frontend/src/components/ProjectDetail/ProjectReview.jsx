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
      label: "Modif.",
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
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
        <div
          className={`${
            legalItems.length > 0 ? "lg:col-span-8" : "lg:col-span-12"
          } bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-xs`}
        >
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4">
            RESEÑA
          </h3>

          <div className="relative">
            <div
              ref={contentRef}
              className="space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed text-justify overflow-hidden transition-all duration-500 ease-in-out"
              style={{
                maxHeight:
                  !isExpanded && isLongContent ? "220px" : contentHeight,
              }}
            >
              {paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            {!isExpanded && isLongContent && (
              <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none" />
            )}
          </div>

          {isLongContent && (
            <div className="mt-6 flex justify-start border-t border-slate-100 pt-4">
              <button
                type="button"
                onClick={() => setIsExpanded(!isExpanded)}
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold text-brand-primary bg-brand-icon-bg hover:bg-brand-primary/20 transition-colors focus:outline-none cursor-pointer"
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
          <div className="lg:col-span-4 grid grid-cols-3 lg:flex lg:flex-col gap-2 sm:gap-3 lg:gap-5 w-full">
            {legalItems.map((item) => {
              const Icon = item.icon;
              const hasUrl = Boolean(item.url);
              const Component = hasUrl ? "a" : "div";
              const dynamicProps = hasUrl
                ? {
                    href: item.url,
                    target: "_blank",
                    rel: "noopener noreferrer",
                    title: `Ver documento oficial de ${item.label}`,
                  }
                : {};

              return (
                <Component
                  key={item.id}
                  {...dynamicProps}
                  className={`group relative flex flex-col sm:flex-row sm:items-center sm:justify-between p-2.5 sm:p-4 rounded-xl sm:rounded-2xl border border-slate-200/80 bg-white transition-all duration-200 gap-1.5 sm:gap-2 min-w-0 ${
                    hasUrl
                      ? "hover:shadow-md hover:-translate-y-0.5 hover:border-brand-primary/40 cursor-pointer"
                      : "cursor-default"
                  }`}
                >
                  <div className="flex flex-col sm:flex-row items-center sm:items-center gap-2 sm:gap-3.5 min-w-0 pr-0 sm:pr-2 w-full">
                    <div
                      className={`p-1.5 sm:p-2.5 rounded-lg sm:rounded-xl bg-brand-icon-bg text-brand-primary shrink-0 transition-all duration-200 ${
                        hasUrl ? "group-hover:scale-105" : ""
                      }`}
                    >
                      <Icon className="w-4 h-4 sm:w-4 sm:h-4" />
                    </div>

                    <div className="min-w-0 text-center sm:text-left flex-1 w-full">
                      <span className="block text-[9px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-0.5 truncate">
                        {item.label}
                      </span>
                      <span className="block text-[10px] sm:text-sm font-bold text-slate-800 truncate group-hover:text-slate-900 w-full px-0.5">
                        {item.value}
                      </span>
                    </div>
                  </div>

                  {hasUrl && (
                    <div className="absolute top-2 right-2 sm:relative sm:top-0 sm:right-0 shrink-0 p-0.5 sm:p-1.5 rounded-md text-slate-300 group-hover:text-brand-primary group-hover:bg-brand-primary/5 transition-all duration-200">
                      <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
                    </div>
                  )}
                </Component>
              );
            })}
          </div>
        )}
      </div>
    </SectionContainer>
  );
}
