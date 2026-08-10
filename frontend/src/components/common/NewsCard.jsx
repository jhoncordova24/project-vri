import { memo } from "react";
import { Calendar, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { formatDate } from "../../utils/formatDate";

function NewsCard({ item, index = 0 }) {
  return (
    <article
      data-aos="fade"
      data-aos-delay={index * 100}
      className="group bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm transition-all duration-300 flex flex-col justify-between"
    >
      <div>
        <div className="aspect-[4/3] overflow-hidden bg-slate-100 relative">
          <img
            src={item.imagen_url}
            alt={item.titulo}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
          />
          {item.categoria && (
            <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-brand-primary text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm">
              {item.categoria}
            </span>
          )}
        </div>

        <div className="p-5">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-2.5">
            <Calendar className="w-3.5 h-3.5" />
            <span>{formatDate(item.creado_en)}</span>
          </div>

          <h3 className="font-bold text-brand-dark text-base group-hover:text-brand-primary transition-colors line-clamp-2 leading-snug">
            {item.titulo}
          </h3>
        </div>
      </div>

      <div className="px-5 pb-5 pt-2">
        <Link
          to={`/noticias/${item.id}`}
          className="inline-flex items-center gap-1 text-xs font-semibold text-brand-primary group-hover:text-brand-hover transition-colors"
        >
          <span>Leer noticia</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  );
}

export default memo(NewsCard);
