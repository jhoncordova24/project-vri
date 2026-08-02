import React from "react";
import { Link } from "react-router-dom";
import { formatDate } from "../../utils/formatDate";

export default function NewsSidebarWidget({ newsList }) {
  return (
    <aside className="lg:col-span-1 w-full lg:sticky lg:top-28">
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6">
        <h3 className="text-lg font-bold text-brand-dark mb-4 pb-3 border-b border-slate-100">
          Noticias recientes
        </h3>

        <div className="flex flex-col gap-5">
          {newsList && newsList.length > 0 ? (
            newsList.map((item) => (
              <Link
                key={item.id}
                to={`/noticias/${item.id}`}
                className="group flex gap-4 items-start p-3 -mx-3 rounded-xl hover:bg-slate-50 transition-colors"
              >
                {item.imagen_url && (
                  <div className="w-28 h-20 flex-shrink-0 overflow-hidden rounded-lg bg-slate-100 border border-slate-200">
                    <img
                      src={item.imagen_url}
                      alt={item.titulo}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <span className="text-[11px] font-bold text-brand-primary uppercase tracking-wider block mb-1.5">
                    {item.categoria}
                  </span>
                  <h4 className="text-sm font-semibold text-slate-800 line-clamp-2 leading-snug group-hover:text-brand-primary transition-colors">
                    {item.titulo}
                  </h4>
                  <span className="text-xs text-slate-400 block mt-1.5">
                    {formatDate(item.creado_en)}
                  </span>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-xs text-slate-400">
              No hay más noticias disponibles.
            </p>
          )}
        </div>
      </div>
    </aside>
  );
}