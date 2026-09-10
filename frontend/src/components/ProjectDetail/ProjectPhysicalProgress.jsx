import React from "react";
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
  Target,
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

export default function ProjectPhysicalProgress({ deliverables = [] }) {
  if (!deliverables.length) return null;

  const totalItems = deliverables.length;
  const completedItems = deliverables.reduce(
    (acc, item) =>
      item.estado?.trim().toLowerCase() === "terminado" ? acc + 1 : acc,
    0,
  );
  const progressPercentage = Math.round((completedItems / totalItems) * 100);
  const progressScale = Math.max(progressPercentage / 100, 0.12);

  return (
    <motion.section
      className="w-full py-12 sm:py-16 bg-slate-50/70 border-t border-slate-200/70"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <SectionLabel>SEGUIMIENTO TÉCNICO</SectionLabel>
            <SectionTitle>Avance Físico</SectionTitle>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 bg-slate-200/60 py-1.5 px-3 rounded-xl self-start md:self-auto">
            <Target className="w-4 h-4 text-brand-primary" />
            <span>
              {completedItems} de {totalItems} entregables validados
            </span>
          </div>
        </div>

        <div className="relative w-full h-8 bg-slate-200/70 rounded-2xl overflow-hidden p-1 border border-slate-300/60 shadow-inner mb-8">
          <motion.div
            className="h-full bg-gradient-to-r from-brand-primary via-brand-primary to-brand-secondary rounded-xl flex items-center justify-end px-3 shadow-sm relative overflow-hidden origin-left will-change-transform"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: progressScale }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 2.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="relative z-10 text-xs font-black tracking-wider text-white select-none whitespace-nowrap">
              {progressPercentage}%
            </span>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {deliverables.map((item, index) => {
            const Icon = resolveIcon(item.entregable);
            const isFinished =
              item.estado?.trim().toLowerCase() === "terminado";
            const hasUrl = Boolean(item.enlace_url?.trim());

            const Component = hasUrl ? "a" : "div";
            const dynamicProps = hasUrl
              ? {
                  href: item.enlace_url,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  title: `Ver entregable oficial: ${item.entregable}`,
                }
              : {};

            return (
              <Component
                key={item.id || index}
                {...dynamicProps}
                className={`group relative flex flex-col justify-between p-5 rounded-2xl border transition-all duration-200 bg-white ${
                  hasUrl
                    ? "border-slate-200/90 hover:border-brand-primary/40 hover:shadow-lg hover:-translate-y-1 cursor-pointer"
                    : "border-slate-200/60 shadow-sm cursor-default"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="text-[11px] font-mono font-bold text-slate-400">
                      HITO #{String(index + 1).padStart(2, "0")}
                    </span>

                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                        isFinished
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200/50"
                          : "bg-amber-50 text-amber-700 border border-amber-200/50"
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

                  <div className="flex items-start gap-3.5 mb-3">
                    <div
                      className={`p-2.5 rounded-xl bg-brand-primary/10 text-brand-primary shrink-0 transition-transform duration-200 ${
                        hasUrl
                          ? "group-hover:scale-105 group-hover:bg-brand-primary group-hover:text-white"
                          : ""
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>

                    <div className="min-w-0">
                      <h4 className="text-sm font-bold text-slate-900 group-hover:text-brand-primary transition-colors leading-snug line-clamp-2">
                        {item.entregable}
                      </h4>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-medium">
                    {item.fecha ? `Emitido: ${item.fecha}` : "Fecha pendiente"}
                  </span>

                  {hasUrl ? (
                    <span className="inline-flex items-center gap-1 font-semibold text-brand-primary group-hover:underline">
                      Consultar
                      <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </span>
                  ) : (
                    <span className="text-slate-300 font-medium italic">
                      Sin enlace público
                    </span>
                  )}
                </div>
              </Component>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}
