import { useState, useMemo } from "react";
import {
  ChevronDown,
  ChevronUp,
  FileText,
  FileEdit,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";
import SectionContainer from "../common/SectionContainer";

const isValid = (val) =>
  Boolean(
    val &&
    val.trim() !== "" &&
    val !== "--" &&
    val.toLowerCase() !== "no se sabe",
  );

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

  const paragraphs = useMemo(() => {
    if (!resenia) return [];
    return resenia
      .split(/\n+/)
      .map((p) => p.trim())
      .filter(Boolean);
  }, [resenia]);

  const isLongContent = useMemo(() => {
    if (!resenia) return false;
    return paragraphs.length > 1 || resenia.length > 350;
  }, [paragraphs, resenia]);

  const legalItems = useMemo(
    () =>
      [
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
      ].filter((item) => item.valid),
    [
      contract,
      contractUrl,
      modification,
      modificationUrl,
      culmination,
      culminationUrl,
    ],
  );

  if (!resenia) return null;

  const firstParagraph = paragraphs[0];
  const remainingParagraphs = paragraphs.slice(1);

  return (
    <SectionContainer
      label="Información Oficial"
      title="Marco Legal y Generalidades"
    >
      <div className="bg-white border border-slate-200/80 rounded-2xl shadow-xs overflow-hidden">
        <div className="p-6 sm:p-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-500">
              Reseña del Proyecto
            </h3>
            {isLongContent && (
              <button
                type="button"
                onClick={() => setIsExpanded((prev) => !prev)}
                className="hidden sm:inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-brand-primary hover:text-brand-primary/80 transition-colors cursor-pointer"
              >
                <span>{isExpanded ? "Contraer" : "Leer completa"}</span>
                {isExpanded ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </button>
            )}
          </div>

          <div className="relative">
            <div className="space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed text-justify">
              <p>{firstParagraph}</p>

              {remainingParagraphs.length > 0 && (
                <div
                  className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
                    isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden space-y-4">
                    {remainingParagraphs.map((paragraph, index) => (
                      <p key={index} className="pt-2">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {!isExpanded && isLongContent && (
              <div className="absolute bottom-0 left-0 right-0 h-14 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none" />
            )}
          </div>

          {isLongContent && (
            <div className="mt-4 flex sm:hidden justify-start">
              <button
                type="button"
                onClick={() => setIsExpanded((prev) => !prev)}
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
          <div className="relative overflow-hidden bg-brand-primary text-white p-4 sm:px-6 sm:py-5 border-t border-brand-primary/20">
            <div className="absolute inset-0 bg-gradient-to-r from-brand-primary via-slate-900/90 to-brand-primary/95 pointer-events-none" />

            <div className="relative z-10 flex flex-col xl:flex-row xl:items-center justify-between gap-4">
              <div className="flex items-center gap-2 shrink-0">
                <ShieldCheck className="w-5 h-5 text-white/80 shrink-0" />
                <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white">
                  Documentación
                </span>
              </div>

              <div className="grid grid-cols-3 sm:flex sm:flex-wrap items-center gap-2 sm:gap-3">
                {legalItems.map((item) => {
                  const Icon = item.icon;
                  const hasUrl = Boolean(item.url);
                  const Component = hasUrl ? "a" : "div";
                  const dynamicProps = hasUrl
                    ? {
                        href: item.url,
                        target: "_blank",
                        rel: "noopener noreferrer",
                        title: `Abrir documento de ${item.label}: ${item.value}`,
                      }
                    : {
                        title: `${item.label}: ${item.value}`,
                      };

                  return (
                    <Component
                      key={item.id}
                      {...dynamicProps}
                      className={`flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2.5 py-2 px-1.5 sm:px-4 rounded-xl border transition-all duration-200 select-none min-w-0 ${
                        hasUrl
                          ? "bg-white/10 hover:bg-white/20 border-white/25 text-white shadow-xs cursor-pointer group backdrop-blur-sm"
                          : "bg-white/5 border-white/15 text-white/90 cursor-default"
                      }`}
                    >
                      <div className="flex items-center gap-1.5 shrink-0">
                        <Icon className="w-4 h-4 text-white/90 shrink-0 transition-transform group-hover:scale-110" />
                        <span className="hidden sm:inline font-semibold text-white/75 uppercase text-xs tracking-wide">
                          {item.label}:
                        </span>
                      </div>

                      <span className="font-semibold text-white text-[11px] sm:text-sm truncate w-full text-center sm:text-left sm:w-auto">
                        {item.value}
                      </span>

                      {hasUrl && (
                        <ExternalLink className="w-3.5 h-3.5 text-white/60 group-hover:text-white transition-colors shrink-0 hidden sm:inline-block ml-0.5" />
                      )}
                    </Component>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </SectionContainer>
  );
}
