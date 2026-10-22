import { useState, useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  Clock,
  ExternalLink,
  BookOpen,
  FileCheck2,
  GraduationCap,
  Lightbulb,
  FileText,
  Compass,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import SectionContainer from "../common/SectionContainer";

const DIACRITICS_REGEX = /[\u0300-\u036f]/g;

const ICON_RULES = [
  { match: ["tesis", "sustentacion"], icon: GraduationCap },
  { match: ["articulo", "paper", "publicacion", "revista"], icon: BookOpen },
  { match: ["informe", "reporte"], icon: FileCheck2 },
  { match: ["patente", "prototipo"], icon: Lightbulb },
  { match: ["libro"], icon: BookOpen },
];

const resolveIcon = (name = "") => {
  const clean = name
    .toLowerCase()
    .normalize("NFD")
    .replace(DIACRITICS_REGEX, "");
  const found = ICON_RULES.find((rule) =>
    rule.match.some((keyword) => clean.includes(keyword)),
  );
  return found ? found.icon : FileText;
};

const formatDateDisplay = (dateStr) => {
  if (!dateStr || typeof dateStr !== "string") return "Pendiente";
  const parts = dateStr.trim().split("/");
  if (parts.length === 2) {
    return `${parts[0].padStart(2, "0")}/${parts[1]}`;
  }
  if (parts.length === 3) {
    return `${parts[0].padStart(2, "0")}/${parts[1].padStart(2, "0")}/${parts[2]}`;
  }
  return dateStr;
};

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 50 : -50,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.3, ease: "easeOut" },
  },
  exit: (direction) => ({
    x: direction < 0 ? 50 : -50,
    opacity: 0,
    transition: { duration: 0.2, ease: "easeIn" },
  }),
};

export default function ProjectPhysicalProgress({ deliverables = [] }) {
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState(0);
  const mobileScrollRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  if (!deliverables || deliverables.length === 0) return null;

  const pageSize = 4;
  const totalPages = Math.ceil(deliverables.length / pageSize);

  const { totalItems, completedItems, progressPercentage } = useMemo(() => {
    const total = deliverables.length;
    const completed = deliverables.reduce(
      (acc, item) =>
        item.estado?.trim().toLowerCase() === "terminado" ? acc + 1 : acc,
      0,
    );
    return {
      totalItems: total,
      completedItems: completed,
      progressPercentage: total > 0 ? Math.round((completed / total) * 100) : 0,
    };
  }, [deliverables]);

  const displayedDeliverables = useMemo(() => {
    const start = currentPage * pageSize;
    return deliverables.slice(start, start + pageSize);
  }, [deliverables, currentPage]);

  const paginate = (newDirection) => {
    const targetPage = currentPage + newDirection;
    if (targetPage >= 0 && targetPage < totalPages) {
      setDirection(newDirection);
      setCurrentPage(targetPage);
    }
  };

  const handleMobileScroll = () => {
    if (mobileScrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = mobileScrollRef.current;
      const totalScrollable = scrollWidth - clientWidth;
      if (totalScrollable > 0) {
        setScrollProgress((scrollLeft / totalScrollable) * 100);
      }
    }
  };

  useEffect(() => {
    handleMobileScroll();
  }, [deliverables]);

  const navButtonBaseClass =
    "absolute top-1/2 -translate-y-1/2 z-20 w-9 h-9 flex items-center justify-center rounded-full bg-brand-primary text-white shadow-md active:scale-95 transition-opacity duration-200";

  const renderCardContent = (item, globalIndex) => {
    const Icon = resolveIcon(item.entregable);
    const isFinished = item.estado?.trim().toLowerCase() === "terminado";
    const hasUrl = Boolean(item.enlace_url?.trim());
    const isAcademicProduct =
      item.entregable?.toLowerCase().includes("artículo") ||
      item.entregable?.toLowerCase().includes("articulo") ||
      item.entregable?.toLowerCase().includes("libro");

    const CardWrapper = hasUrl ? "a" : "div";
    const cardProps = hasUrl
      ? {
          href: item.enlace_url,
          target: "_blank",
          rel: "noopener noreferrer",
          title: `Consultar ${item.entregable}`,
        }
      : {};

    return (
      <div className="flex flex-col h-full w-full">
        <div className="flex items-center justify-end mb-3.5 pt-2">
          <div
            className={`h-0.5 w-full -mr-1 transition-colors ${
              (globalIndex !== 0 &&
                deliverables[globalIndex - 1]?.estado?.trim()?.toLowerCase() ===
                  "terminado") ||
              (globalIndex === 0 && isFinished)
                ? "bg-brand-primary/40"
                : "bg-slate-200"
            }`}
          />

          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 z-10 transition-colors ${
              isFinished
                ? "bg-brand-primary text-white shadow-xs ring-4 ring-brand-primary/15"
                : "bg-white text-slate-400 border-2 border-slate-300"
            }`}
          >
            {isFinished ? (
              <CheckCircle2 className="w-4 h-4" />
            ) : (
              <span>{globalIndex + 1}</span>
            )}
          </div>
        </div>

        <CardWrapper
          {...cardProps}
          className={`group flex-1 flex flex-col justify-between p-4 sm:p-5 rounded-2xl border transition-all duration-200 ${
            isAcademicProduct
              ? "bg-gradient-to-b from-white to-slate-50/50 border-slate-200 shadow-xs"
              : "bg-white border-slate-200/70 shadow-xs"
          } ${
            hasUrl
              ? "hover:border-brand-primary hover:shadow-md cursor-pointer"
              : ""
          }`}
        >
          <div>
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="text-xs font-mono font-bold tracking-wider text-slate-400">
                HITO #{String(globalIndex + 1).padStart(2, "0")}
              </span>

              {hasUrl ? (
                <div className="inline-flex items-center gap-1 text-[11px] font-semibold text-brand-primary bg-brand-primary/10 hover:bg-brand-primary/15 px-2 py-1 rounded-lg transition-colors">
                  <span>Publicación</span>
                  <ExternalLink className="w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              ) : (
                <span className="text-[10px] font-semibold text-slate-400 tracking-wide bg-slate-100 px-2 py-0.5 rounded-md">
                  Entregable
                </span>
              )}
            </div>

            <div className="flex items-start gap-3 my-2">
              <div
                className={`p-2.5 rounded-xl transition-colors duration-150 shrink-0 ${
                  isAcademicProduct
                    ? "bg-brand-primary/10 text-brand-primary group-hover:bg-brand-primary group-hover:text-white"
                    : "bg-slate-100 text-slate-700 group-hover:bg-brand-primary/10 group-hover:text-brand-primary"
                }`}
              >
                <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>

              <div className="space-y-1">
                <h4 className="text-sm font-bold text-slate-900 group-hover:text-brand-primary transition-colors leading-snug line-clamp-2">
                  {item.entregable}
                </h4>
                {isAcademicProduct && (
                  <p className="text-[11px] text-slate-500 font-medium">
                    Producto académico verificado
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="pt-3.5 mt-3 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-500 font-medium">
              {formatDateDisplay(item.fecha)}
            </span>

            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold shrink-0 ${
                isFinished
                  ? "bg-brand-primary/10 text-brand-primary border border-brand-primary/20"
                  : "bg-amber-50 text-amber-700 border border-amber-200/60"
              }`}
            >
              {isFinished ? (
                <>
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Terminado</span>
                </>
              ) : (
                <>
                  <Clock className="w-3 h-3" />
                  <span>Pendiente</span>
                </>
              )}
            </span>
          </div>
        </CardWrapper>
      </div>
    );
  };

  return (
    <SectionContainer
      label="SEGUIMIENTO TÉCNICO"
      title="Avance Físico"
      dataAos={null}
      action={
        <div className="inline-flex w-fit items-center gap-2 text-xs sm:text-sm font-semibold text-slate-700 bg-white border border-slate-200/80 shadow-xs py-2 px-3.5 sm:px-4 rounded-full">
          <Compass className="w-4 h-4 text-brand-primary will-change-transform animate-spin-slow shrink-0" />
          <span className="whitespace-nowrap">
            {completedItems} de {totalItems} entregables validados
          </span>
          <span className="ml-1 inline-flex items-center justify-center px-2 py-0.5 rounded-full text-xs font-bold bg-brand-primary/10 text-brand-primary shrink-0">
            {progressPercentage}%
          </span>
        </div>
      }
    >
      <div className="md:hidden w-full">
        <div
          ref={mobileScrollRef}
          onScroll={handleMobileScroll}
          className="w-full overflow-x-auto pb-4 pt-2 -mx-4 px-4 snap-x snap-mandatory flex gap-3.5 scrollbar-none"
        >
          {deliverables.map((item, index) => (
            <div
              key={item.id || index}
              className="snap-center shrink-0 w-[82vw] max-w-[310px]"
            >
              {renderCardContent(item, index)}
            </div>
          ))}
        </div>

        {deliverables.length > 1 && (
          <div className="flex justify-center pt-2 px-6">
            <div className="w-28 h-1 bg-slate-200/80 rounded-full overflow-hidden">
              <div
                className="h-full bg-brand-primary rounded-full transition-all duration-150"
                style={{
                  width: `${Math.max(25, 100 / deliverables.length)}%`,
                  transform: `translateX(${(scrollProgress * (100 - Math.max(25, 100 / deliverables.length))) / 100}%)`,
                }}
              />
            </div>
          </div>
        )}
      </div>

      <div className="hidden md:block relative w-full">
        {totalPages > 1 && (
          <>
            {currentPage > 0 && (
              <button
                type="button"
                onClick={() => paginate(-1)}
                className={`${navButtonBaseClass} -left-3 sm:-left-4 lg:-left-5`}
                aria-label="Anterior"
              >
                <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
              </button>
            )}

            {currentPage < totalPages - 1 && (
              <button
                type="button"
                onClick={() => paginate(1)}
                className={`${navButtonBaseClass} -right-3 sm:-right-4 lg:-right-5`}
                aria-label="Siguiente"
              >
                <ChevronRight className="w-5 h-5 stroke-[2.5]" />
              </button>
            )}
          </>
        )}

        <div className="overflow-hidden pt-3 pb-3 px-1">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentPage}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="grid grid-cols-4 gap-4"
            >
              {displayedDeliverables.map((item, localIndex) => {
                const globalIndex = currentPage * pageSize + localIndex;
                return (
                  <div key={item.id || globalIndex} className="h-full">
                    {renderCardContent(item, globalIndex)}
                  </div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-4">
            {Array.from({ length: totalPages }).map((_, dotIndex) => (
              <button
                key={dotIndex}
                onClick={() => {
                  setDirection(dotIndex > currentPage ? 1 : -1);
                  setCurrentPage(dotIndex);
                }}
                className={`h-2 rounded-full transition-all duration-200 ${
                  dotIndex === currentPage
                    ? "w-6 bg-brand-primary"
                    : "w-2 bg-slate-200 hover:bg-slate-300"
                }`}
                aria-label={`Ir al bloque ${dotIndex + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </SectionContainer>
  );
}
