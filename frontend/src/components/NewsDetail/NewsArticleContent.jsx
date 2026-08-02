import React from "react";
import { Calendar, Tag } from "lucide-react";
import { formatDate } from "../../utils/formatDate";

export default function NewsArticleContent({ newsItem }) {
  if (!newsItem) return null;

  const { categoria, creado_en, titulo, imagen_url, contenido } = newsItem;

  return (
    <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-10 ">
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <span className="inline-flex items-center gap-1.5 bg-brand-primary/10 text-brand-primary text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
          <Tag className="w-3 h-3" />
          {categoria}
        </span>
        <div className="flex items-center gap-1.5 text-xs text-slate-400">
          <Calendar className="w-3.5 h-3.5" />
          <span>{formatDate(creado_en)}</span>
        </div>
      </div>

      <h1 className="text-2xl sm:text-3xl font-bold text-brand-dark tracking-tight leading-snug mb-6">
        {titulo}
      </h1>

      {imagen_url && (
        <div className="w-full rounded-xl mb-8 bg-slate-100 border border-slate-100 overflow-hidden">
          <img src={imagen_url} alt={titulo} className="w-full h-auto" />
        </div>
      )}

      <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed whitespace-pre-line text-base sm:text-lg">
        {contenido}
      </div>
    </div>
  );
}
