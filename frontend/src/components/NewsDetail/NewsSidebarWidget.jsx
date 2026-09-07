import React from "react";
import { Link } from "react-router-dom";
import { formatDate } from "../../utils/formatDate";

export default function NewsSidebarWidget({ newsList }) {
  return (
    <aside className="lg:col-span-1 w-full lg:sticky lg:top-28">
      <div className="bg-white border border-slate-300">
        <div className="h-1 bg-brand-primary" />

        <div className="p-5 sm:p-6">
          <h3 className="text-sm font-bold uppercase tracking-wider text-brand-dark mb-4 pb-3 border-b border-slate-200">
            Noticias recientes
          </h3>

          <div className="flex flex-col divide-y divide-slate-100">
            {newsList && newsList.length > 0 ? (
              newsList.map((item) => (
                <Link
                  key={item.id}
                  to={`/noticias/${item.id}`}
                  className="group flex gap-3.5 items-start py-3.5 first:pt-0 last:pb-0 hover:bg-slate-50/80 -mx-2 px-2 transition-colors"
                >
                  {item.imagen_url && (
                    <div className="w-24 h-16 flex-shrink-0 overflow-hidden bg-slate-100 border border-slate-200">
                      <img
                        src={item.imagen_url}
                        alt={item.titulo}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-bold text-brand-primary uppercase tracking-wider block mb-1">
                      {item.categoria}
                    </span>
                    <h4 className="text-xs sm:text-sm font-semibold text-slate-800 line-clamp-2 leading-snug group-hover:text-brand-primary transition-colors">
                      {item.titulo}
                    </h4>
                    <span className="text-[11px] text-slate-400 block mt-1">
                      {formatDate(item.creado_en)}
                    </span>
                  </div>
                </Link>
              ))
            ) : (
              <p className="text-xs text-slate-400 py-2">
                No hay más noticias disponibles.
              </p>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
}
