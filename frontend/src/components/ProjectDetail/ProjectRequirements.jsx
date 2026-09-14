import React, { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Briefcase,
  GraduationCap,
  Laptop,
  CheckCircle2,
  Package,
} from "lucide-react";
import SectionLabel from "../common/SectionLabel";
import SectionTitle from "../common/SectionTitle";

const CATEGORY_ICONS = {
  Servicio: Briefcase,
  Subvención: GraduationCap,
  Unidad: Laptop,
};

const FILTER_DEFS = [
  { key: "Todos", label: "Todos" },
  { key: "Servicio", label: "Servicios" },
  { key: "Subvención", label: "Subvenciones" },
  { key: "Unidad", label: "Bienes / Unidades" },
];

function ProjectRequirements({ requirements = [] }) {
  const [selectedFilter, setSelectedFilter] = useState("Todos");

  const { totalUnidades, counts, filteredRequirements } = useMemo(() => {
    const baseCounts = { Todos: 0, Servicio: 0, Subvención: 0, Unidad: 0 };
    let total = 0;
    const filtered = [];

    for (const item of requirements) {
      total += Number(item.cantidad) || 0;
      baseCounts.Todos += 1;
      if (baseCounts[item.unidad_medida] !== undefined) {
        baseCounts[item.unidad_medida] += 1;
      }
      if (selectedFilter === "Todos" || item.unidad_medida === selectedFilter) {
        filtered.push(item);
      }
    }

    return {
      totalUnidades: total,
      counts: baseCounts,
      filteredRequirements: filtered,
    };
  }, [requirements, selectedFilter]);

  const filters = useMemo(
    () => FILTER_DEFS.map((f) => ({ ...f, count: counts[f.key] })),
    [counts],
  );

  const handleFilterClick = useCallback((e) => {
    const key = e.currentTarget.dataset.key;
    if (key) setSelectedFilter(key);
  }, []);

  if (!requirements || requirements.length === 0) return null;

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

          <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200/80 shadow-xs py-1.5 px-3.5 rounded-full self-start md:self-auto">
            <CheckCircle2 className="w-4 h-4 text-brand-primary" />
            <span>Total provisto:</span>
            <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-full text-[11px] font-bold bg-brand-icon-bg text-brand-primary font-mono">
              {totalUnidades} {totalUnidades === 1 ? "ítem" : "ítems"}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-6 scrollbar-none">
          {filters.map((tab) => {
            const isActive = selectedFilter === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                data-key={tab.key}
                onClick={handleFilterClick}
                className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-150 shrink-0 border cursor-pointer ${
                  isActive
                    ? "bg-brand-primary text-white border-brand-primary shadow-xs"
                    : "bg-white text-slate-600 border-slate-200/80 hover:bg-brand-icon-bg hover:text-brand-primary hover:border-brand-secondary/30"
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`px-1.5 py-0.2 rounded-md text-[10px] font-bold font-mono ${
                    isActive
                      ? "bg-white/20 text-white"
                      : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs divide-y divide-slate-100 overflow-hidden">
          <AnimatePresence mode="popLayout">
            {filteredRequirements.length === 0 ? (
              <div className="p-8 text-center text-slate-400 text-xs font-medium">
                No hay requerimientos en esta categoría.
              </div>
            ) : (
              filteredRequirements.map((item, idx) => {
                const Icon = CATEGORY_ICONS[item.unidad_medida] || Package;
                const correlativo = String(idx + 1).padStart(2, "0");
                const stableKey =
                  item.id ?? `${item.unidad_medida}-${item.descripcion}`;

                return (
                  <motion.div
                    key={stableKey}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-brand-icon-bg/30 transition-colors group"
                  >
                    <div className="flex items-start sm:items-center gap-3.5 min-w-0 flex-1">
                      <span className="font-mono text-xs font-black text-slate-500 bg-slate-100 group-hover:bg-brand-primary group-hover:text-white transition-colors duration-200 px-2 py-1 rounded-md border border-slate-200/70 shrink-0">
                        {correlativo}
                      </span>

                      <div className="p-2 rounded-xl bg-brand-icon-bg text-brand-primary shrink-0 hidden sm:flex items-center justify-center">
                        <Icon className="w-4 h-4" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-brand-dark leading-snug">
                          {item.descripcion}
                        </p>
                        <div className="sm:hidden mt-2 flex items-center gap-2">
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[10px] font-bold border border-slate-200 bg-brand-icon-bg text-brand-primary">
                            <Icon className="w-3 h-3" />
                            {item.unidad_medida}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-3.5 shrink-0 pl-9 sm:pl-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                      <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-[11px] font-bold border border-slate-200 bg-brand-icon-bg text-brand-primary">
                        <Icon className="w-3.5 h-3.5 shrink-0" />
                        {item.unidad_medida}
                      </span>

                      <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200/80 px-3.5 py-1 rounded-xl">
                        <span className="text-[11px] uppercase tracking-wider font-semibold text-slate-400">
                          Cantidad:
                        </span>
                        <span className="font-mono font-black text-sm text-brand-dark">
                          {item.cantidad}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.section>
  );
}

export default React.memo(ProjectRequirements);
