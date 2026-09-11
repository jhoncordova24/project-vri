import React from "react";
import { useParams, useLocation } from "react-router-dom";
import ProjectDetailHero from "../components/ProjectDetail/ProjectDetailHero";
import ProjectReview from "../components/ProjectDetail/ProjectReview";
import ProjectTeam from "../components/ProjectDetail/ProjectTeam";
import ProjectPhysicalProgress from "../components/ProjectDetail/ProjectPhysicalProgress";
import ProjectFinancialProgress from "../components/ProjectDetail/ProjectFinancialProgress";
import ProjectRequirements from "../components/ProjectDetail/ProjectRequirements";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { useProjectDetail } from "../hooks/useProjectDetail";
import heroBg from "../assets/projects/hero.webp";

export default function ProjectDetail() {
  const { id } = useParams();
  const location = useLocation();
  const preview = location.state?.preview;
  const { project, loading, error } = useProjectDetail(id);

  const displayTitle = project?.titulo || preview?.titulo;
  const displayLine =
    project?.linea_investigacion || preview?.linea_investigacion;
  const displayYear = project?.convocatorias?.anio || preview?.anio || 2025;

  return (
    <>
      <ProjectDetailHero
        title={displayTitle}
        subtitle={displayLine ? `Línea de investigación: ${displayLine}` : ""}
        badge="Proyecto de Investigación"
        imageSrc={heroBg}
        year={displayYear}
        loading={loading}
      />

      {loading && !project && (
        <LoadingSpinner message="Cargando detalles del proyecto..." />
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-2xl p-6 text-center text-sm font-medium my-8 max-w-7xl mx-auto">
          {error}
        </div>
      )}

      {!error && project && (
        <div className="w-full bg-slate-50/50">
          <ProjectReview
            resenia={project.resenia}
            contract={project.contrato_numero}
            contractUrl={project.contrato_pdf_url}
            modification={project.resolucion_modificacion}
            modificationUrl={project.resolucion_modificacion_pdf_url}
            culmination={project.resolucion_culminacion}
            culminationUrl={project.resolucion_culminacion_pdf_url}
          />
          <ProjectTeam team={project.proyecto_investigadores} />
          <ProjectPhysicalProgress
            deliverables={project.proyecto_entregables}
          />
          <ProjectFinancialProgress budget={project.proyecto_presupuesto} />
          <ProjectRequirements requirements={project.proyecto_requerimientos} />
        </div>
      )}
    </>
  );
}
