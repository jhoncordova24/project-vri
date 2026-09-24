import {
  Calendar,
  Clock,
  MapPin,
  ExternalLink,
  Tag,
  FileText,
} from "lucide-react";
import { formatDate } from "../../utils/formatDate";

function getReadingTime(text = "") {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

function formatEventDates(inicio, fin) {
  if (!inicio) return null;
  const dInicio = new Date(`${inicio}T00:00:00`);
  if (!fin || inicio === fin) {
    return dInicio.toLocaleDateString("es-PE", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }
  const dFin = new Date(`${fin}T00:00:00`);
  const mismoMes =
    dInicio.getMonth() === dFin.getMonth() &&
    dInicio.getFullYear() === dFin.getFullYear();

  if (mismoMes) {
    return `${dInicio.getDate()} al ${dFin.getDate()} de ${dFin.toLocaleDateString("es-PE", { month: "short", year: "numeric" })}`;
  }
  const opts = { day: "numeric", month: "short" };
  return `${dInicio.toLocaleDateString("es-PE", opts)} al ${dFin.toLocaleDateString("es-PE", { ...opts, year: "numeric" })}`;
}

export default function NewsArticleContent({ newsItem }) {
  if (!newsItem) return null;

  const {
    categoria,
    creado_en,
    titulo,
    imagen_url,
    contenido,
    modalidad,
    fecha_inicio,
    fecha_fin,
    horario,
    lugar,
    enlace_registro,
  } = newsItem;

  const paragraphs = (contenido || "").split(/\n+/).filter((p) => p.trim());
  const readingTime = getReadingTime(contenido);
  const fechaEvento = formatEventDates(fecha_inicio, fecha_fin);
  const isVirtual = modalidad === "Virtual";

  return (
    <article className="lg:col-span-2 bg-white border border-slate-200">
      <div />

      <div className="p-6 sm:p-10 lg:p-12">
        <div className="flex flex-wrap items-center justify-between gap-y-3 mb-6 pb-4 border-b border-slate-200">
          <div>
            <span className="inline-flex items-center gap-2 px-3 py-1 border border-brand-primary text-brand-primary text-[11px] font-bold uppercase tracking-[0.14em]">
              <Tag className="w-3.5 h-3.5" />
              {categoria}
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs text-slate-500 font-medium">
            {modalidad && (
              <>
                <span>{modalidad}</span>
                <span className="text-slate-300">|</span>
              </>
            )}
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

        <div className="max-w-3xl mx-auto text-slate-800">
          {paragraphs.map((parrafo, index) => (
            <p
              key={index}
              className="text-sm md:text-base leading-relaxed mb-5 last:mb-0 text-justify"
            >
              {parrafo}
            </p>
          ))}
        </div>

        {fecha_inicio && (
          <section
            aria-label="Datos del evento"
            className="mt-8 border border-slate-200 bg-white"
          >
            <dl className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-slate-200">
              <div className="flex items-start gap-2.5 p-3.5">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-brand-icon-bg text-brand-primary mt-0.5">
                  <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <dt className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                    Fecha
                  </dt>
                  <dd className="text-xs font-bold text-slate-800 capitalize leading-tight mt-0.5">
                    {fechaEvento}
                  </dd>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3.5">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-brand-icon-bg text-brand-primary mt-0.5">
                  <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <dt className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                    Horario
                  </dt>
                  <dd className="text-xs font-bold text-slate-800 leading-tight mt-0.5 break-words">
                    {horario || "Por confirmar"}
                  </dd>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3.5">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-brand-icon-bg text-brand-primary mt-0.5">
                  <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
                <div className="min-w-0 flex-1">
                  <dt className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                    {isVirtual ? "Plataforma" : "Lugar"}
                  </dt>
                  <dd className="text-xs font-bold text-slate-800 leading-tight mt-0.5 break-words">
                    {lugar || "Campus UNP"}
                  </dd>
                </div>
              </div>
            </dl>

            {enlace_registro && (
              <div className="flex flex-col gap-2 border-t border-slate-200 bg-slate-50/70 px-4 py-2.5 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-[11px] text-slate-500">
                  Reserva tu cupo antes de que se agoten las vacantes.
                </p>
                <a
                  href={enlace_registro}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 bg-brand-primary px-3 py-1 text-[11px] font-bold text-white transition-colors hover:bg-brand-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
                >
                  Inscribirme al evento
                  <ExternalLink className="h-3 w-3" aria-hidden="true" />
                </a>
              </div>
            )}
          </section>
        )}

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
            <figcaption className="mt-2 text-[11px] text-slate-400 pt-2">
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
