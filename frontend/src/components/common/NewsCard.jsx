import { memo } from "react";
import { Calendar, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { formatDate } from "../../utils/formatDate";

function NewsCard({ item, index = 0 }) {
  return (
    <article
      data-aos="fade-up"
      data-aos-delay={index * 100}
      className="group relative bg-white rounded-2xl border border-slate-200/80 hover:border-slate-300 overflow-hidden shadow-xs transition-colors duration-200 flex flex-col justify-between"
    >
      <div>
        <div className="aspect-[16/10] overflow-hidden bg-slate-100 relative">
          {item.categoria && (
            <span className="absolute top-3 left-3 z-10 bg-white/95 text-brand-primary text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-xs">
              {item.categoria}
            </span>
          )}
          <img
            src={item.imagen_url || "/placeholder-news.jpg"}
            alt={item.titulo}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
          />
        </div>

        <div className="p-5">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-2.5">
            <Calendar className="w-3.5 h-3.5" />
            <time>{formatDate(item.creado_en)}</time>
          </div>

          <h3 className="font-bold text-brand-dark text-base group-hover:text-brand-primary transition-colors line-clamp-2 leading-snug">
            <Link to={`/noticias/${item.id}`}>
              <span className="absolute inset-0 z-0" />
              {item.titulo}
            </Link>
          </h3>
        </div>
      </div>

      <div className="px-5 pb-5 pt-3 border-t border-slate-100/80 flex items-center justify-between">
        <span className="text-[13px] sm:text-sm font-bold text-brand-primary group-hover:text-brand-hover transition-colors">
          Leer noticia completa
        </span>
        <div className="w-7 h-7 rounded-full bg-slate-50 border border-slate-200/60 flex items-center justify-center text-brand-primary group-hover:bg-brand-primary group-hover:text-white group-hover:border-brand-primary transition-all duration-200">
          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
        </div>
      </div>
    </article>
  );
}

export default memo(NewsCard);
