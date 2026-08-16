import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import SectionLabel from "../common/SectionLabel";
import SectionTitle from "../common/SectionTitle";

export default function ProjectReview({ resenia }) {
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

  return (
    <section className="w-full py-12 sm:py-16 bg-white" data-aos="fade-up">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center mb-8">
          <SectionLabel>Introducción</SectionLabel>
          <SectionTitle>Reseña</SectionTitle>
        </div>

        <div className="relative">
          <div
            ref={contentRef}
            className="space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed text-justify sm:text-left overflow-hidden transition-all duration-500 ease-in-out"
            style={{
              maxHeight: !isExpanded && isLongContent ? "200px" : contentHeight,
            }}
          >
            {paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          {!isExpanded && isLongContent && (
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none transition-opacity duration-500 ease-in-out opacity-100" />
          )}

          {isExpanded && isLongContent && (
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none transition-opacity duration-500 ease-in-out opacity-0" />
          )}
        </div>

        {isLongContent && (
          <div className="mt-6 flex justify-center">
            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold text-brand-primary bg-brand-primary/10 hover:bg-brand-primary/20 transition-colors focus:outline-none"
            >
              <span>{isExpanded ? "Leer menos" : "Leer más"}</span>
              {isExpanded ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
