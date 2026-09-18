import React, { useState, useEffect } from "react";
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
import SectionLabel from "../common/SectionLabel";
import SectionTitle from "../common/SectionTitle";

const DIACRITICS_REGEX = /[\u0300-\u036f]/g;

const ICON_RULES = [
  { match: ["tesis", "sustentacion"], icon: GraduationCap },
  { match: ["articulo", "paper", "publicacion", "revista"], icon: BookOpen },
  { match: ["informe", "reporte"], icon: FileCheck2 },
  { match: ["patente", "prototipo"], icon: Lightbulb },
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
  if (!dateStr || typeof dateStr !== "string") return "Fecha pendiente";
  const parts = dateStr.trim().split("/");
  if (parts.length === 2) {
    return `${parts[0].padStart(2, "0")}/${parts[1]}`;
  }
  if (parts.length === 3) {
    return `${parts[0].padStart(2, "0")}/${parts[1].padStart(2, "0")}/${parts[2]}`;
  }
  return dateStr;
};

const getGridColsClass = (count) => {
  if (count <= 2) return "md:grid-cols-2";
  if (count === 3) return "md:grid-cols-3";
  if (count === 4) return "md:grid-cols-4";
  if (count === 5) return "md:grid-cols-5";
  if (count === 6) return "md:grid-cols-3 lg:grid-cols-6";
  if (count >= 7 && count <= 8) return "md:grid-cols-4";
  return "md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5";
};

const useIsDesktop = () => {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const handler = () => setIsDesktop(mq.matches);
    handler();
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return isDesktop;
};

export default function ProjectPhysicalProgress({ deliverables = [] }) {
  const isDesktop = useIsDesktop();

  if (!deliverables.length) return null;

  const totalItems = deliverables.length;
  const completedItems = deliverables.reduce(
    (acc, item) =>
      item.estado?.trim().toLowerCase() === "terminado" ? acc + 1 : acc,
    0,
  );
  const progressPercentage = Math.round((completedItems / totalItems) * 100);
  const showStepper = totalItems <= 6;
  const gridColsClass = getGridColsClass(totalItems);

  return (
    <motion.section
      className="w-full py-12 sm:py-16 bg-slate-50/70 border-t border-slate-200/70"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <SectionLabel>SEGUIMIENTO TÉCNICO</SectionLabel>
            <SectionTitle>Avance Físico</SectionTitle>
          </div>

          <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-slate-700 bg-white border border-slate-200/80 shadow-xs py-2 px-4 rounded-full self-start md:self-auto">
            <Compass className="w-4 h-4 text-brand-primary animate-spin-slow" />
            <span>
              {completedItems} de {totalItems} entregables validados
            </span>
            <span className="ml-1 inline-flex items-center justify-center px-2 py-0.5 rounded-full text-xs font-bold bg-brand-primary/10 text-brand-primary">
              {progressPercentage}%
            </span>
          </div>
        </div>

        <div
          className={`relative grid grid-cols-1 sm:grid-cols-2 ${gridColsClass} gap-6 md:gap-4`}
        >
          {deliverables.map((item, index) => {
            const Icon = resolveIcon(item.entregable);
            const isFinished =
              item.estado?.trim().toLowerCase() === "terminado";
            const hasUrl = Boolean(item.enlace_url?.trim());

            const cardDelay = isDesktop
              ? showStepper
                ? index * 0.15 + 0.3
                : (index % 4) * 0.08
              : 0;

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
              <div key={item.id || index} className="relative flex flex-col">
                {showStepper && (
                  <div className="hidden md:flex items-center justify-end mb-4">
                    <motion.div
                      className={`h-0.5 w-full -mr-1 transition-colors origin-left ${
                        (index !== 0 &&
                          deliverables[index - 1]?.estado
                            ?.trim()
                            .toLowerCase() === "terminado") ||
                        (index === 0 && isFinished)
                          ? "bg-brand-primary/40"
                          : "bg-slate-200"
                      }`}
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.4,
                        delay: index * 0.15,
                        ease: "easeOut",
                      }}
                    />

                    <motion.div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-colors z-10 ${
                        isFinished
                          ? "bg-brand-primary text-white shadow-sm ring-4 ring-brand-primary/15"
                          : "bg-white text-slate-400 border-2 border-slate-300"
                      }`}
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.3,
                        delay: index * 0.15 + 0.15,
                        ease: "backOut",
                      }}
                    >
                      {isFinished ? (
                        <CheckCircle2 className="w-4 h-4" />
                      ) : (
                        <span>{index + 1}</span>
                      )}
                    </motion.div>
                  </div>
                )}

                <motion.div
                  className="flex-1 flex flex-col"
                  initial={{ scale: 0.9, opacity: 0, y: 16 }}
                  whileInView={{ scale: 1, opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: "some" }}
                  transition={{
                    duration: 0.4,
                    delay: cardDelay,
                    ease: "backOut",
                  }}
                >
                  <CardWrapper
                    {...cardProps}
                    className={`group flex-1 flex flex-col justify-between p-5 rounded-2xl border transition-all duration-300 bg-white ${
                      hasUrl
                        ? "border-slate-200/90 hover:border-brand-primary/50 hover:shadow-lg hover:-translate-y-1 cursor-pointer"
                        : "border-slate-200/60 shadow-xs"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="text-xs font-mono font-bold text-slate-500">
                          HITO #{String(index + 1).padStart(2, "0")}
                        </span>
                        {hasUrl && (
                          <div className="w-7 h-7 rounded-lg bg-slate-50 group-hover:bg-brand-primary/10 text-slate-400 group-hover:text-brand-primary flex items-center justify-center transition-colors">
                            <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                          </div>
                        )}
                      </div>

                      <div className="flex items-start gap-3.5 mb-4">
                        <div className="p-2.5 rounded-xl bg-slate-100 text-slate-700 group-hover:bg-brand-primary/10 group-hover:text-brand-primary transition-colors shrink-0">
                          <Icon className="w-4 h-4" />
                        </div>

                        <h4 className="text-sm font-semibold text-slate-900 group-hover:text-brand-primary transition-colors leading-snug line-clamp-2">
                          {item.entregable}
                        </h4>
                      </div>
                    </div>

                    <div className="pt-3.5 border-t border-slate-100 flex items-center justify-between gap-2">
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
                          <CheckCircle2 className="w-3 h-3" />
                        ) : (
                          <Clock className="w-3 h-3" />
                        )}
                        <span>{item.estado || "En proceso"}</span>
                      </span>
                    </div>
                  </CardWrapper>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}
