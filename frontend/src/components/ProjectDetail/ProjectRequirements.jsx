import { useState, useEffect, useCallback, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, GraduationCap, Package, CheckCircle2 } from "lucide-react";
import SectionContainer from "../common/SectionContainer";
import Pagination from "../common/Pagination";
import { getProjectRequirementsPaginated } from "../../services/projectsService";

const CATEGORY_ICONS = {
  Servicio: Briefcase,
  Subvención: GraduationCap,
  Unidad: Package,
};

const FILTER_DEFS = [
  { key: "Todos", label: "Todos" },
  { key: "Servicio", label: "Servicios" },
  { key: "Subvención", label: "Subvenciones" },
  { key: "Unidad", label: "Bienes / Unidades" },
];

const ITEMS_PER_PAGE = 5;

const RequirementRow = memo(function RequirementRow({ item, index }) {
  const unidadMedida = item.catalogo_requerimientos?.unidad_medida;
  const descripcion = item.catalogo_requerimientos?.descripcion;

  const Icon = CATEGORY_ICONS[unidadMedida] || Package;
  const correlativo = String(index + 1).padStart(2, "0");

  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="p-3.5 sm:p-5 flex items-center justify-between gap-3 sm:gap-4 hover:bg-slate-50/80 transition-colors group"
    >
      <div className="flex items-center gap-3 min-w-0 flex-1">
        <span className="font-mono text-xs sm:text-sm font-bold text-slate-500 bg-slate-100 group-hover:bg-brand-primary group-hover:text-white transition-colors duration-200 px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-lg border border-slate-200/70 shrink-0 select-none">
          {correlativo}
        </span>

        <div className="p-2 sm:p-2.5 rounded-xl bg-brand-icon-bg text-brand-primary shrink-0 flex items-center justify-center">
          <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-xs sm:text-sm md:text-base font-semibold text-slate-900 leading-snug line-clamp-2 sm:line-clamp-none">
            {descripcion}
          </p>
          <div className="flex sm:hidden items-center gap-2 mt-0.5">
            <span className="text-[11px] font-medium text-slate-500">
              {unidadMedida}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 shrink-0">
        <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold border border-slate-200 bg-brand-icon-bg/50 text-brand-primary">
          <Icon className="w-3.5 h-3.5 shrink-0" />
          {unidadMedida}
        </span>

        <div className="flex items-center justify-center min-w-[2rem] sm:min-w-0 bg-slate-50 border border-slate-200/70 px-2.5 sm:px-3.5 py-1.5 sm:py-1.5 rounded-xl">
          <span className="hidden sm:inline text-xs uppercase tracking-wider font-bold text-slate-400 mr-2">
            Cant.
          </span>
          <span className="font-mono font-black text-xs sm:text-sm text-slate-800">
            {item.cantidad}
          </span>
        </div>
      </div>
    </motion.div>
  );
});

function ProjectRequirements({ projectId }) {
  const [selectedFilter, setSelectedFilter] = useState("Todos");
  const [currentPage, setCurrentPage] = useState(1);
  const [requirements, setRequirements] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [totalUnidades, setTotalUnidades] = useState(0);
  const [categoryCounts, setCategoryCounts] = useState({
    Todos: 0,
    Servicio: 0,
    Subvención: 0,
    Unidad: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function fetchRequirements() {
      if (!projectId) return;
      setLoading(true);

      try {
        const result = await getProjectRequirementsPaginated({
          projectId,
          page: currentPage,
          pageSize: ITEMS_PER_PAGE,
          unidadMedida: selectedFilter,
        });

        if (isMounted) {
          setRequirements(result.data);
          setTotalCount(result.totalCount);
          setTotalPages(result.totalPages);

          let totalCant = 0;
          for (let i = 0; i < result.data.length; i++) {
            totalCant += Number(result.data[i].cantidad) || 0;
          }
          setTotalUnidades(totalCant);

          if (selectedFilter === "Todos") {
            const counts = {
              Todos: result.totalCount,
              Servicio: 0,
              Subvención: 0,
              Unidad: 0,
            };
            setCategoryCounts((prev) => ({ ...prev, ...counts }));
          }
        }
      } catch (error) {
        console.error("Error loading project requirements:", error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchRequirements();

    return () => {
      isMounted = false;
    };
  }, [projectId, currentPage, selectedFilter]);

  const handleFilterClick = useCallback((e) => {
    const key = e.currentTarget.dataset.key;
    if (key) {
      setSelectedFilter(key);
      setCurrentPage(1);
    }
  }, []);

  const filters = FILTER_DEFS.map((f) => ({
    ...f,
    count: categoryCounts[f.key] || 0,
  }));

  if (!loading && totalCount === 0 && selectedFilter === "Todos") {
    return null;
  }

  return (
    <SectionContainer
      label="LOGÍSTICA Y RECURSOS"
      title="Requerimientos Atendidos"
      dataAos={null}
      action={
        <div className="self-start shrink-0 w-fit inline-flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-slate-700 bg-white border border-slate-200/80 shadow-xs py-2 px-4 rounded-full">
          <CheckCircle2 className="w-4 h-4 text-brand-primary" />
          <span>Total provisto:</span>
          <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-full text-xs font-bold bg-brand-icon-bg text-brand-primary font-mono">
            {totalUnidades} {totalUnidades === 1 ? "ítem" : "ítems"}
          </span>
        </div>
      }
      headerBottom={
        <div className="flex items-center gap-2 pb-2 overflow-x-auto scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
          {filters.map((tab) => {
            const isActive = selectedFilter === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                data-key={tab.key}
                onClick={handleFilterClick}
                className={`inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 shrink-0 border cursor-pointer ${
                  isActive
                    ? "bg-brand-icon-bg text-brand-primary border-brand-primary/40 font-semibold shadow-xs"
                    : "bg-white text-slate-500 border-slate-200/80 hover:border-brand-primary/30 hover:text-brand-primary"
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`inline-flex items-center justify-center min-w-[1.2rem] h-4.5 px-1 rounded-md text-[10px] sm:text-[11px] font-mono leading-none transition-colors ${
                    isActive
                      ? "bg-brand-primary text-white font-bold"
                      : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>
      }
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs divide-y divide-slate-100 overflow-hidden">
          <AnimatePresence mode="popLayout">
            {requirements.length === 0 ? (
              <div className="p-8 text-center text-slate-400 text-sm font-medium">
                {loading
                  ? "Cargando requerimientos..."
                  : "No hay requerimientos en esta categoría."}
              </div>
            ) : (
              requirements.map((item, idx) => {
                const absoluteIndex = (currentPage - 1) * ITEMS_PER_PAGE + idx;
                return (
                  <RequirementRow
                    key={
                      item.id ??
                      `${item.catalogo_requerimientos?.unidad_medida}-${item.catalogo_requerimientos?.descripcion}-${idx}`
                    }
                    item={item}
                    index={absoluteIndex}
                  />
                );
              })
            )}
          </AnimatePresence>
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalCount={totalCount}
          pageSize={ITEMS_PER_PAGE}
          onPageChange={(page) => setCurrentPage(page)}
          itemName="requerimientos"
        />
      </motion.div>
    </SectionContainer>
  );
}

export default memo(ProjectRequirements);
