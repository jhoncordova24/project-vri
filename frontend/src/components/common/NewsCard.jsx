import { memo } from "react";
import {
  Calendar,
  ArrowRight,
  MapPin,
  Video,
  Users,
  Images,
} from "lucide-react";
import { Link } from "react-router-dom";
import { formatEventDates } from "../../utils/formatDate";

const MODALITY_CONFIG = {
  Presencial: { icon: Users, label: "Presencial" },
  Virtual: { icon: Video, label: "Virtual" },
  Híbrido: { icon: Users, label: "Híbrido" },
};

function NewsCard({ item }) {
  const modality = item.modalidad ? MODALITY_CONFIG[item.modalidad] : null;
  const ModalityIcon = modality?.icon;
  const galleryCount = item.noticia_imagenes?.length || 0;
  const displayDate = formatEventDates(
    item.fecha_inicio,
    item.fecha_fin,
    item.creado_en,
  );

  return (
    <article className="group relative bg-white rounded-2xl border border-slate-200/80 hover:border-brand-primary/40 overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between">
      <div>
        <div className="aspect-[16/10] overflow-hidden bg-slate-100 relative">
          <div className="absolute top-3 inset-x-3 z-10 flex items-center justify-between gap-2 pointer-events-none">
            {item.categoria ? (
              <span className="bg-white/95 backdrop-blur-xs text-brand-primary text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-xs">
                {item.categoria}
              </span>
            ) : (
              <span />
            )}

            <div className="flex items-center gap-1.5">
              {modality && (
                <span className="inline-flex items-center gap-1 bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-semibold px-2.5 py-1 rounded-full shadow-xs">
                  <ModalityIcon className="w-3 h-3" />
                  {modality.label}
                </span>
              )}

              {galleryCount > 0 && (
                <span className="inline-flex items-center gap-1 bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-semibold px-2 py-1 rounded-full shadow-xs">
                  <Images className="w-3 h-3" />+{galleryCount}
                </span>
              )}
            </div>
          </div>

          <img
            src={item.imagen_url || "/placeholder-news.jpg"}
            alt={item.titulo}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
          />
        </div>

        <div className="p-5">
          <div className="flex items-center justify-between gap-2 text-xs text-slate-400 mb-2.5">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 shrink-0" />
              <time>{displayDate}</time>
            </div>

            {item.lugar && (
              <div className="flex items-center gap-1 text-slate-500 max-w-[50%] truncate">
                <MapPin className="w-3 h-3 shrink-0 text-slate-400" />
                <span className="truncate text-[11px]">{item.lugar}</span>
              </div>
            )}
          </div>

          <h3 className="font-bold text-slate-900 text-base group-hover:text-brand-primary transition-colors line-clamp-2 leading-snug">
            <Link to={`/noticias/${item.id}`}>
              <span className="absolute inset-0 z-0" />
              {item.titulo}
            </Link>
          </h3>

          {item.resumen && (
            <p className="mt-2 text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
              {item.resumen}
            </p>
          )}
        </div>
      </div>

      <div className="px-5 pb-5 pt-3 border-t border-slate-100/80 flex items-center justify-between">
        <span className="text-xs sm:text-sm font-bold text-brand-primary group-hover:text-brand-hover transition-colors">
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
