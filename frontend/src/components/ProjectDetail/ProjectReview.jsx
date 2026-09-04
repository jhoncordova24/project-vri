import React, { useState, useRef, useEffect } from "react";
import {
  ChevronDown,
  ChevronUp,
  FileText,
  FileEdit,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";
import SectionLabel from "../common/SectionLabel";
import SectionTitle from "../common/SectionTitle";

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
      label: "Modificaciones",
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
    <section
      className="w-full pt-16 sm:pt-24 pb-12 sm:pb-16 bg-white"
      data-aos="fade-up"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <SectionLabel>Información Oficial</SectionLabel>
          <SectionTitle>Marco Legal y Generalidades</SectionTitle>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-xs">
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
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold text-brand-primary bg-brand-icon-bg hover:bg-brand-primary/20 transition-colors focus:outline-none"
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
            <div className="lg:col-span-4 flex flex-col gap-3.5">
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
                    className={`group relative flex items-center justify-between p-4 sm:p-5 rounded-2xl border border-slate-200/80 bg-slate-50/50 transition-all duration-200 ${
                      hasUrl
                        ? "hover:bg-white hover:shadow-md hover:-translate-y-0.5 hover:border-brand-primary/40 cursor-pointer"
                        : "cursor-default"
                    }`}
                  >
                    <div className="flex items-center gap-3.5 min-w-0 pr-2">
                      <div
                        className={`p-2.5 rounded-xl bg-brand-icon-bg text-brand-primary shrink-0 transition-transform duration-200 ${
                          hasUrl ? "group-hover:scale-105" : ""
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>

                      <div className="min-w-0">
                        <span className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-0.5">
                          {item.label}
                        </span>
                        <span className="block text-xs sm:text-sm font-bold text-slate-800 truncate group-hover:text-slate-900">
                          {item.value}
                        </span>
                      </div>
                    </div>

                    {hasUrl && (
                      <div className="shrink-0 p-1.5 rounded-lg text-slate-300 group-hover:text-brand-primary group-hover:bg-brand-primary/5 transition-all duration-200">
                        <ExternalLink className="w-4 h-4" />
                      </div>
                    )}
                  </Component>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
