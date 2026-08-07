import React from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useNewsDetail } from "../../hooks/useNewsDetail";

import NewsDetailSkeleton from "./NewsDetailSkeleton";
import NewsArticleContent from "./NewsArticleContent";
import NewsSidebarWidget from "./NewsSidebarWidget";

export default function NewsDetailSection() {
  const { id } = useParams();
  const { newsItem, otherNews, loading, error } = useNewsDetail(id);

  if (loading) return <NewsDetailSkeleton />;

  if (error || !newsItem) {
    return (
      <section className="pt-36 pb-16 bg-slate-50/60 min-h-screen flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-2xl border border-slate-200/80 shadow-sm max-w-md mx-auto">
          <h2 className="text-xl font-bold text-brand-dark mb-2">
            Noticia no encontrada
          </h2>
          <p className="text-sm text-slate-500 mb-6">
            La noticia que buscas no existe o fue eliminada.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-primary hover:text-brand-hover transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver al inicio</span>
          </Link>
        </div>
      </section>
    );
  }

  return (
    <article className="pt-10 md:pt-16 pb-16 bg-slate-50/60 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <NewsArticleContent newsItem={newsItem} />
          <NewsSidebarWidget newsList={otherNews} />
        </div>
      </div>
    </article>
  );
}
