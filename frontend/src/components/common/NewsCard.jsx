import { memo } from "react";
import { Calendar, ArrowRight, Video, Users, Images } from "lucide-react";
import { Link } from "react-router-dom";
import { formatDate, formatEventDates } from "../../utils/formatDate";

const MODALITY_CONFIG = {
  Presencial: { icon: Users, label: "Presencial" },
  Virtual: { icon: Video, label: "Virtual" },
  Híbrido: { icon: Users, label: "Híbrido" },
};

export function NewsCardSkeleton() {
  return (
    <div className="py-4 md:py-0 border-b border-slate-200/80 md:border md:border-slate-200/80 md:rounded-2xl md:bg-white overflow-hidden flex flex-row md:flex-col gap-3.5 md:gap-0">
      <div className="w-28 h-20 sm:w-36 sm:h-24 md:w-full md:h-auto md:aspect-[16/10] shrink-0 rounded-lg md:rounded-none bg-slate-200/70 animate-pulse" />

      <div className="flex-1 min-w-0 md:p-5 space-y-2 md:space-y-3 flex flex-col justify-center md:justify-start">
        <div className="h-3 w-20 md:w-24 bg-slate-200/70 animate-pulse rounded-full" />
        <div className="h-4 md:h-5 w-full bg-slate-200/70 animate-pulse rounded-md" />
        <div className="h-4 md:h-5 w-3/4 bg-slate-200/70 animate-pulse rounded-md" />
        <div className="hidden md:block h-3.5 w-5/6 bg-slate-100 animate-pulse rounded-md" />
      </div>

      <div className="hidden md:flex p-5 pt-3 border-t border-slate-100 justify-between items-center">
        <div className="h-4 w-32 bg-slate-200/70 animate-pulse rounded-full" />
        <div className="w-7 h-7 rounded-full bg-slate-200/70 animate-pulse" />
      </div>
    </div>
  );
}

function NewsCard({ item }) {
  const modality = item.modalidad ? MODALITY_CONFIG[item.modalidad] : null;
  const ModalityIcon = modality?.icon;
  const galleryCount = item.noticia_imagenes?.length || 0;
  const displayDate =
    formatEventDates(item.fecha_inicio, item.fecha_fin) ||
    formatDate(item.creado_en);

  return (
    <article className="group relative bg-transparent md:bg-white md:rounded-2xl border-0 md:border md:border-slate-200/80 md:hover:border-brand-primary/40 overflow-hidden md:shadow-xs md:hover:shadow-md transition-[border-color,box-shadow] duration-300 flex flex-row md:flex-col justify-between py-3 md:py-0 gap-3 md:gap-0">
      <div className="relative w-24 h-16 sm:w-28 sm:h-20 md:w-full md:h-auto md:aspect-[16/10] shrink-0 rounded-lg md:rounded-none overflow-hidden bg-slate-100">
        <div className="hidden md:flex absolute top-3 inset-x-3 z-10 items-center justify-between gap-2 pointer-events-none">
          {item.categoria ? (
            <span className="bg-white/95 text-brand-primary text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-xs">
              {item.categoria}
            </span>
          ) : (
            <span />
          )}

          <div className="flex items-center gap-1.5">
            {modality && (
              <span className="inline-flex items-center gap-1 bg-slate-900/90 text-white text-[10px] font-semibold px-2.5 py-1 rounded-full shadow-xs">
                <ModalityIcon className="w-3 h-3" />
                {modality.label}
              </span>
            )}

            {galleryCount > 0 && (
              <span className="inline-flex items-center gap-1 bg-slate-900/90 text-white text-[10px] font-semibold px-2 py-1 rounded-full shadow-xs">
                <Images className="w-3 h-3" />+{galleryCount}
              </span>
            )}
          </div>
        </div>

        {galleryCount > 0 && (
          <span className="md:hidden absolute bottom-1 right-1 inline-flex items-center gap-0.5 bg-slate-900/80 text-white text-[9px] font-semibold px-1.5 py-0.5 rounded">
            <Images className="w-2.5 h-2.5" />+{galleryCount}
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

      <div className="flex-1 min-w-0 md:p-5 flex flex-col justify-center md:justify-start">
        {(item.categoria || modality) && (
          <div className="flex md:hidden items-center gap-2 mb-1 flex-wrap">
            {item.categoria && (
              <span className="text-[10px] font-bold text-brand-primary uppercase tracking-wide">
                {item.categoria}
              </span>
            )}
            {modality && (
              <span className="inline-flex items-center gap-1 text-[10px] text-slate-500 font-medium">
                <ModalityIcon className="w-2.5 h-2.5" />
                {modality.label}
              </span>
            )}
          </div>
        )}

        <h3 className="font-bold text-slate-900 text-sm md:text-base group-hover:text-brand-primary transition-colors line-clamp-2 leading-snug">
          <Link to={`/noticias/${item.id}`}>
            <span className="absolute inset-0 z-0" />
            {item.titulo}
          </Link>
        </h3>

        <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-1 md:mt-2.5">
          <Calendar className="w-3.5 h-3.5 shrink-0" />
          <time>{displayDate}</time>
        </div>

        {item.resumen && (
          <p className="hidden md:block mt-2 text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
            {item.resumen}
          </p>
        )}
      </div>

      <div className="hidden md:flex px-5 pb-5 pt-3 border-t border-slate-100/80 items-center justify-between">
        <span className="text-xs sm:text-sm font-bold text-brand-primary group-hover:text-brand-hover transition-colors">
          Leer noticia completa
        </span>
        <div className="w-7 h-7 rounded-full bg-slate-50 border border-slate-200/60 flex items-center justify-center text-brand-primary group-hover:bg-brand-primary group-hover:text-white group-hover:border-brand-primary transition-colors duration-200">
          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
        </div>
      </div>
    </article>
  );
}

const MemoizedNewsCard = memo(NewsCard);
MemoizedNewsCard.Skeleton = NewsCardSkeleton;

export default MemoizedNewsCard;
