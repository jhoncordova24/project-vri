import { useState, useMemo, memo } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  User,
  Layers,
  CheckCircle2,
  Clock,
  ShieldCheck,
  ChevronRight,
  X,
} from "lucide-react";
import SectionContainer from "../common/SectionContainer";
import Pagination from "../common/Pagination";

const ITEMS_PER_PAGE = 5;
const collator = new Intl.Collator("es", {
  sensitivity: "base",
  numeric: true,
});

const normalizeText = (str = "") =>
  str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();

const ProjectCard = memo(function ProjectCard({ project, index, year }) {
  const isFinished = Boolean(project.culminado);

  return (
    <Link
      to={`/proyectos/detalle/${project.id}`}
      state={{
        preview: {
          titulo: project.titulo,
          linea_investigacion: project.linea_investigacion,
          anio: year || project.convocatorias?.anio,
        },
      }}
      className={`group relative flex flex-col gap-3 rounded-2xl p-4 sm:p-5 border transition-all duration-200 ${
        isFinished
          ? "bg-slate-50/70 border-slate-200 opacity-90 hover:opacity-100 hover:bg-white hover:border-slate-300"
          : "bg-white border-slate-200 border-l-4 border-l-brand-primary shadow-xs hover:shadow-md hover:border-slate-300 hover:border-l-brand-hover"
      }`}
    >
      <div className="flex items-start justify-between gap-3 min-w-0">
        <div className="flex items-start gap-2.5 sm:gap-3.5 min-w-0 flex-1">
          <span
            className={`shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-lg font-bold text-xs flex items-center justify-center transition-colors ${
              isFinished
                ? "bg-slate-200/70 text-slate-600"
                : "bg-slate-100 text-brand-dark group-hover:bg-brand-primary group-hover:text-white"
            }`}
          >
            {String(index + 1).padStart(2, "0")}
          </span>

          <h3
            className={`text-xs sm:text-sm font-semibold leading-snug line-clamp-2 transition-colors ${
              isFinished
                ? "text-slate-600 group-hover:text-brand-dark"
                : "text-brand-dark group-hover:text-brand-primary"
            }`}
          >
            {project.titulo}
          </h3>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span
            className={`inline-flex items-center gap-1 sm:gap-1.5 px-2.5 py-0.5 sm:py-1 rounded-full text-[11px] font-semibold border ${
              isFinished
                ? "bg-slate-200/60 border-slate-300 text-slate-600"
                : "bg-emerald-50 border-emerald-200 text-emerald-700"
            }`}
          >
            {isFinished ? (
              <>
                <CheckCircle2 className="w-3 h-3 text-slate-500" />
                <span>Culminado</span>
              </>
            ) : (
              <>
                <Clock className="w-3 h-3 text-emerald-600" />
                <span>En ejecución</span>
              </>
            )}
          </span>

          <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-brand-primary group-hover:translate-x-0.5 transition-all shrink-0 hidden sm:block" />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 border-t border-slate-100 text-xs">
        <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-4 min-w-0 text-slate-600">
          <div className="flex items-center gap-1.5 truncate">
            <User className="w-3.5 h-3.5 text-brand-primary shrink-0" />
            <span className="truncate">
              <strong className="text-slate-800 font-medium">
                {project.investigadorPrincipalNombre}
              </strong>
            </span>
          </div>

          {project.gestorNombre && (
            <div className="hidden sm:flex items-center gap-1.5 truncate text-slate-500">
              <ShieldCheck className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="truncate">{project.gestorNombre}</span>
            </div>
          )}
        </div>

        {project.linea_investigacion && (
          <span
            title={project.linea_investigacion}
            className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-slate-100/90 border border-slate-200/80 text-slate-600 font-medium text-[11px] self-start sm:self-auto max-w-full sm:max-w-xs truncate"
          >
            <Layers className="w-3 h-3 text-slate-500 shrink-0" />
            <span className="truncate">{project.linea_investigacion}</span>
          </span>
        )}
      </div>
    </Link>
  );
});

export default function ProjectList({ projects = [], year }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const preparedProjects = useMemo(() => {
    return projects
      .map((p) => {
        const principal =
          p.investigadorPrincipal?.nombres_apellidos ||
          p.proyecto_investigadores?.find(
            (pi) => pi.rol === "Investigador Principal",
          )?.investigadores?.nombres_apellidos ||
          "No asignado";

        const gestor =
          p.gestor?.nombres_apellidos || p.gestores?.nombres_apellidos || null;

        return {
          ...p,
          investigadorPrincipalNombre: principal,
          gestorNombre: gestor,
          _blob: normalizeText(
            `${p.titulo} ${principal} ${gestor || ""} ${p.linea_investigacion || ""}`,
          ),
        };
      })
      .sort((a, b) => collator.compare(a.titulo, b.titulo));
  }, [projects]);

  const filteredProjects = useMemo(() => {
    const term = normalizeText(searchTerm);
    return term
      ? preparedProjects.filter((p) => p._blob.includes(term))
      : preparedProjects;
  }, [preparedProjects, searchTerm]);

  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProjects = filteredProjects.slice(
    offset,
    offset + ITEMS_PER_PAGE,
  );
  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE) || 1;

  const updateSearch = (value) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  return (
    <SectionContainer
      title="Proyectos Aprobados"
      description={`Mostrando ${filteredProjects.length} de ${projects.length} registros`}
      action={
        <div className="relative w-full md:w-80 lg:w-96">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Buscar por título, investigador o línea..."
            value={searchTerm}
            onChange={(e) => updateSearch(e.target.value)}
            className="w-full pl-10 pr-9 py-2 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-colors shadow-xs"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => updateSearch("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 rounded-full"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      }
    >
      {paginatedProjects.length === 0 ? (
        <div className="text-center py-12 bg-white/60 rounded-2xl border border-dashed border-slate-200">
          <p className="text-sm text-slate-500 font-medium">
            No se encontraron proyectos coincidentes con tu búsqueda.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-2.5 sm:gap-3">
          {paginatedProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={offset + index}
              year={year}
            />
          ))}
        </div>
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalCount={filteredProjects.length}
        pageSize={ITEMS_PER_PAGE}
        onPageChange={setCurrentPage}
        itemName="proyectos"
      />
    </SectionContainer>
  );
}
