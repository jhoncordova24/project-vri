import React from "react";
import { Calendar, Tag, Clock } from "lucide-react";
import { formatDate } from "../../utils/formatDate";

function getReadingTime(text = "") {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export default function NewsArticleContent({ newsItem }) {
  if (!newsItem) return null;

  const { categoria, creado_en, titulo, imagen_url, contenido } = newsItem;
  const paragraphs = (contenido || "").split(/\n+/).filter((p) => p.trim());
  const readingTime = getReadingTime(contenido);

  return (
    <article className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-10 lg:p-12">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mb-5">
        <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-brand-primary">
          <Tag className="w-3 h-3" />
          {categoria}
        </span>
        <span className="text-slate-300">•</span>
        <div className="flex items-center gap-1.5 text-xs text-slate-500">
          <Calendar className="w-3.5 h-3.5" />
          <span>{formatDate(creado_en)}</span>
        </div>
        <span className="text-slate-300">•</span>
        <div className="flex items-center gap-1.5 text-xs text-slate-500">
          <Clock className="w-3.5 h-3.5" />
          <span>{readingTime} min de lectura</span>
        </div>
      </div>

      <h1 className="text-base sm:text-2xl lg:text-3xl font-bold text-brand-dark tracking-tight leading-[1.2] mb-6">
        {titulo}
      </h1>

      {imagen_url && (
        <figure className="mb-10">
          <div className="w-full rounded-xl overflow-hidden bg-slate-100 border border-slate-100 shadow-sm">
            <img
              src={imagen_url}
              alt={titulo}
              className="w-full h-auto object-cover"
            />
          </div>
        </figure>
      )}

      <div className="max-w-[68ch] text-slate-700">
        {paragraphs.map((parrafo, index) => (
          <p
            key={index}
            className="text-sm md:text-base text-slate-700 leading-relaxed mb-4 last:mb-0"
          >
            {parrafo}
          </p>
        ))}
      </div>
    </article>
  );
}
