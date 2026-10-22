import { useState, useEffect, useMemo, memo } from "react";
import { motion } from "framer-motion";
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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const cardItemVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: "easeOut" },
  },
};

export default function ProjectPhysicalProgress({ deliverables = [] }) {
  if (!deliverables || deliverables.length === 0) return null;

  const { totalItems, completedItems, progressPercentage, isCompactMode } =
    useMemo(() => {
      const total = deliverables.length;
      const completed = deliverables.reduce(
        (acc, item) =>
          item.estado?.trim().toLowerCase() === "terminado" ? acc + 1 : acc,
        0,
      );
      return {
        totalItems: total,
        completedItems: completed,
        progressPercentage:
          total > 0 ? Math.round((completed / total) * 100) : 0,
        isCompactMode: total >= 6,
      };
    }, [deliverables]);

  return (
    <SectionContainer
      label="SEGUIMIENTO TÉCNICO"
      title="Avance Físico"
      dataAos={null}
      action={
        <div className="inline-flex w-fit items-center gap-2.5 text-xs sm:text-sm font-semibold text-slate-700 bg-white border border-slate-200/80 shadow-xs py-2 px-4 rounded-full">
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
      <div className="w-full overflow-x-auto pb-4 pt-1 scrollbar-thin">
        <motion.div
          className={`relative flex items-stretch gap-2.5 ${
            isCompactMode
              ? "min-w-[880px] xl:min-w-0 xl:grid xl:grid-flow-col xl:auto-cols-fr"
              : "min-w-[1000px] xl:min-w-0 xl:grid xl:grid-flow-col xl:auto-cols-fr"
          }`}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {deliverables.map((item, index) => {
            const Icon = resolveIcon(item.entregable);
            const isFinished =
              item.estado?.trim().toLowerCase() === "terminado";
            const hasUrl = Boolean(item.enlace_url?.trim());

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
              <motion.div
                key={item.id || index}
                variants={cardItemVariants}
                className="relative flex flex-col flex-1 min-w-[125px]"
              >
                <div className="flex items-center justify-end mb-3">
                  <div
                    className={`h-0.5 w-full -mr-1 transition-colors ${
                      (index !== 0 &&
                        deliverables[index - 1]?.estado
                          ?.trim()
                          ?.toLowerCase() === "terminado") ||
                      (index === 0 && isFinished)
                        ? "bg-brand-primary/40"
                        : "bg-slate-200"
                    }`}
                  />

                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 z-10 transition-colors ${
                      isFinished
                        ? "bg-brand-primary text-white shadow-xs ring-4 ring-brand-primary/15"
                        : "bg-white text-slate-400 border-2 border-slate-300"
                    }`}
                  >
                    {isFinished ? (
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    ) : (
                      <span>{index + 1}</span>
                    )}
                  </div>
                </div>

                <CardWrapper
                  {...cardProps}
                  className={`group flex-1 flex flex-col justify-between p-2.5 sm:p-3 rounded-2xl border bg-white transition-[border-color,box-shadow] duration-200 ${
                    hasUrl
                      ? "border-slate-200/90 hover:border-brand-primary/50 hover:shadow-md cursor-pointer"
                      : "border-slate-200/60 shadow-xs"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-1 mb-2">
                      <span className="text-[10px] font-mono font-bold text-slate-400">
                        HITO #{String(index + 1).padStart(2, "0")}
                      </span>
                      {hasUrl && (
                        <div className="w-5 h-5 rounded-md bg-slate-50 group-hover:bg-brand-primary/10 text-slate-400 group-hover:text-brand-primary flex items-center justify-center transition-colors duration-150">
                          <ExternalLink className="w-3 h-3 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </div>
                      )}
                    </div>

                    <div className="flex items-start gap-2 mb-2.5">
                      <div className="p-1.5 rounded-lg bg-slate-100 text-slate-700 group-hover:bg-brand-primary/10 group-hover:text-brand-primary transition-colors duration-150 shrink-0">
                        <Icon className="w-3.5 h-3.5" />
                      </div>

                      <h4
                        className={`font-semibold text-slate-900 group-hover:text-brand-primary transition-colors duration-150 leading-snug line-clamp-2 ${
                          isCompactMode ? "text-[11px]" : "text-xs sm:text-sm"
                        }`}
                        title={item.entregable}
                      >
                        {item.entregable}
                      </h4>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-1">
                    <span className="text-[10px] text-slate-400 font-medium whitespace-nowrap">
                      {formatDateDisplay(item.fecha)}
                    </span>

                    <span
                      title={
                        item.estado || (isFinished ? "Terminado" : "En proceso")
                      }
                      className={`inline-flex items-center justify-center font-bold shrink-0 ${
                        isCompactMode
                          ? "p-1 rounded-full"
                          : "px-2 py-0.5 rounded-full text-[10px] gap-1"
                      } ${
                        isFinished
                          ? "bg-brand-primary/10 text-brand-primary border border-brand-primary/20"
                          : "bg-amber-50 text-amber-700 border border-amber-200/60"
                      }`}
                    >
                      {isFinished ? (
                        <CheckCircle2 className="w-3 h-3" />
                      ) : (
                        <Clock className="w-3 h-3" />
                      )}
                      {!isCompactMode && (
                        <span>{item.estado || "En proceso"}</span>
                      )}
                    </span>
                  </div>
                </CardWrapper>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </SectionContainer>
  );
}
