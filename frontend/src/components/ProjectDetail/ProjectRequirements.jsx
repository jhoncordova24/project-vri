import React from "react";
import { motion } from "framer-motion";
import {
  Briefcase,
  GraduationCap,
  Laptop,
  CheckCircle2,
  Boxes,
} from "lucide-react";
import SectionLabel from "../common/SectionLabel";
import SectionTitle from "../common/SectionTitle";

const getCategoryConfig = (unit = "") => {
  const normalized = unit.toLowerCase().trim();

  if (normalized.includes("subven")) {
    return {
      icon: GraduationCap,
      label: "Subvención",
      badgeStyle: "bg-emerald-50/90 text-emerald-700 border-emerald-200/70",
      iconColor: "text-emerald-600",
    };
  }

  if (normalized.includes("servici")) {
    return {
      icon: Briefcase,
      label: "Servicio",
      badgeStyle: "bg-indigo-50/90 text-indigo-700 border-indigo-200/70",
      iconColor: "text-indigo-600",
    };
  }

  return {
    icon: Laptop,
    label: "Bienes / Activos",
    badgeStyle: "bg-sky-50/90 text-sky-700 border-sky-200/70",
    iconColor: "text-sky-600",
  };
};

export default function ProjectRequirements({ requirements = [] }) {
  if (!requirements || requirements.length === 0) return null;

  const totalUnidades = requirements.reduce(
    (acc, curr) => acc + (Number(curr.cantidad) || 0),
    0,
  );

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
            <SectionLabel>LOGÍSTICA Y RECURSOS</SectionLabel>
            <SectionTitle>Requerimientos Atendidos</SectionTitle>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 self-start md:self-auto">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 bg-white border border-slate-200/80 shadow-xs py-1.5 px-3.5 rounded-full">
              <Boxes className="w-4 h-4 text-slate-400" />
              <span>Tipos de requerimiento:</span>
              <span className="font-bold text-slate-800 font-mono">
                {requirements.length}
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200/80 shadow-xs py-1.5 px-3.5 rounded-full">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Total provisto:</span>
              <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/10 text-emerald-700 font-mono">
                {totalUnidades} {totalUnidades === 1 ? "ítem" : "ítems"}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs divide-y divide-slate-100 overflow-hidden">
          {requirements.map((item, idx) => {
            const config = getCategoryConfig(item.unidad_medida);
            const Icon = config.icon;
            const correlativo = String(item.numero || idx + 1).padStart(2, "0");

            return (
              <div
                key={item.id || idx}
                className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/70 transition-colors group"
              >
                <div className="flex items-start sm:items-center gap-3.5 min-w-0 flex-1">
                  <span className="font-mono text-xs font-black text-slate-500 bg-slate-100 group-hover:bg-brand-primary group-hover:text-white transition-colors duration-200 px-2 py-1 rounded-md border border-slate-200/70 shrink-0">
                    {correlativo}
                  </span>

                  <div className="p-2 rounded-xl bg-slate-100/90 shrink-0 hidden sm:flex items-center justify-center">
                    <Icon className={`w-4 h-4 ${config.iconColor}`} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-slate-800 leading-snug">
                      {item.descripcion}
                    </p>
                    <div className="sm:hidden mt-2 flex items-center gap-2">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold border ${config.badgeStyle}`}
                      >
                        <Icon className="w-3 h-3" />
                        {item.unidad_medida}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-3.5 shrink-0 pl-9 sm:pl-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                  <span
                    className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-[11px] font-bold border ${config.badgeStyle}`}
                  >
                    <Icon className="w-3.5 h-3.5 shrink-0" />
                    {item.unidad_medida}
                  </span>

                  <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200/80 px-3.5 py-1 rounded-xl shadow-2xs">
                    <span className="text-[11px] uppercase tracking-wider font-semibold text-slate-400">
                      Cantidad:
                    </span>
                    <span className="font-mono font-black text-sm text-slate-900">
                      {item.cantidad}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}
