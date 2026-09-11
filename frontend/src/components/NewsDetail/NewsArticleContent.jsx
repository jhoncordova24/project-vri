import React from "react";
import { Calendar, Tag, Clock, FileText } from "lucide-react";
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
    <article className="lg:col-span-2 bg-white border border-slate-200">
      <div />

      <div className="p-6 sm:p-10 lg:p-12">
        <div className="flex flex-wrap items-center justify-between gap-y-3 mb-6 pb-4 border-b border-slate-200">
          <span className="inline-flex items-center gap-2 px-3 py-1 border border-brand-primary text-brand-primary text-[11px] font-bold uppercase tracking-[0.14em]">
            <Tag className="w-3.5 h-3.5" />
            {categoria}
          </span>

          <div className="flex items-center gap-4 text-xs text-slate-500 font-medium">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              <span>{formatDate(creado_en)}</span>
            </div>
            <span className="text-slate-300">|</span>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              <span>{readingTime} min de lectura</span>
            </div>
          </div>
        </div>

        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-brand-dark tracking-tight leading-[1.25] mb-2">
          {titulo}
        </h1>

        <div className="flex items-center gap-2 text-[11px] text-slate-400 uppercase tracking-wide mb-8">
          <FileText className="w-3 h-3" />
          <span>Comunicado oficial</span>
        </div>

        <div className="max-w-[68ch] text-slate-800 font-serif">
          {paragraphs.map((parrafo, index) => (
            <p
              key={index}
              className="text-sm md:text-base leading-loose mb-5 last:mb-0 text-justify"
            >
              {parrafo}
            </p>
          ))}
        </div>

        {imagen_url && (
          <figure className="mt-2 pt-8">
            <div className="w-full flex justify-center bg-slate-50 border border-slate-300 p-2">
              <img
                src={imagen_url}
                alt={titulo}
                loading="lazy"
                decoding="async"
                className="max-h-[550px] w-auto max-w-full object-contain"
              />
            </div>
            <figcaption className="mt-2 text-[11px] text-slate-400 border-t border-slate-100 pt-2">
              Anexo visual: {titulo}
            </figcaption>
          </figure>
        )}

        <div className="mt-10 pt-4 border-t border-slate-200 text-[11px] text-slate-400">
          Publicado el {formatDate(creado_en)} — Categoría: {categoria}
        </div>
      </div>
    </article>
  );
}
