import React from "react";
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

const resolveIcon = (name = "") => {
  const clean = name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  if (clean.includes("tesis") || clean.includes("sustentacion")) {
    return GraduationCap;
  }
  if (
    clean.includes("articulo") ||
    clean.includes("paper") ||
    clean.includes("publicacion") ||
    clean.includes("revista")
  ) {
    return BookOpen;
  }
  if (clean.includes("informe") || clean.includes("reporte")) {
    return FileCheck2;
  }
  if (clean.includes("patente") || clean.includes("prototipo")) {
    return Lightbulb;
  }
  return FileText;
};

export default function ProjectPhysicalProgress({ deliverables = [] }) {
  if (!deliverables || deliverables.length === 0) return null;

  const totalItems = deliverables.length;
  const completedItems = deliverables.filter(
    (item) => item.estado?.trim().toLowerCase() === "terminado",
  ).length;
  const progressPercentage = Math.round((completedItems / totalItems) * 100);

  return (
    <section
      className="w-full py-12 sm:py-16 bg-slate-50/60 border-t border-slate-200/70"
      data-aos="fade-up"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-6">
          <div>
            <SectionLabel>SEGUIMIENTO TÉCNICO</SectionLabel>
            <SectionTitle>Avance Físico</SectionTitle>
          </div>

          <div className="flex items-center gap-4 bg-white border border-slate-200/80 p-3.5 px-5 rounded-2xl shadow-xs">
            <div className="text-right">
              <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Cumplimiento de Metas
              </span>
              <span className="text-xs font-medium text-slate-600">
                {completedItems} de {totalItems} entregables validados
              </span>
            </div>
            <div className="h-9 w-px bg-slate-200" />
            <div className="flex items-center gap-2.5">
              <span className="text-2xl font-black text-slate-900 tracking-tight">
                {progressPercentage}%
              </span>
              <div className="p-1.5 rounded-xl bg-brand-primary/10 text-brand-primary">
                <Target className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>

        <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200/60 mb-8">
          <div
            className="h-full bg-gradient-to-r from-brand-primary to-brand-secondary rounded-full transition-all duration-700 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {deliverables.map((item, index) => {
            const Icon = resolveIcon(item.entregable);
            const isFinished =
              item.estado?.trim().toLowerCase() === "terminado";
            const hasUrl = Boolean(
              item.enlace_url && item.enlace_url.trim() !== "",
            );

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
                    : "border-slate-200/60 shadow-xs cursor-default"
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
    </section>
  );
}
