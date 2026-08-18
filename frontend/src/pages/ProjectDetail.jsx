import React from "react";
import { useParams } from "react-router-dom";
import ProjectDetailHero from "../components/ProjectDetail/ProjectDetailHero";
import ProjectReview from "../components/ProjectDetail/ProjectReview";
import ProjectTeam from "../components/ProjectDetail/ProjectTeam";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { useProjectDetail } from "../hooks/useProjectDetail";
import heroBg from "../assets/projects/hero.webp";

export default function ProjectDetail() {
  const { id } = useParams();
  const { project, loading, error } = useProjectDetail(id);

  return (
    <>
      <ProjectDetailHero
        title={project?.titulo}
        subtitle={
          project?.linea_investigacion
            ? `Línea de investigación: ${project.linea_investigacion}`
            : ""
        }
        badge="Proyecto de Investigación"
        imageSrc={heroBg}
        year={project?.convocatorias?.anio || 2025}
        loading={loading}
      />

      {loading && (
        <LoadingSpinner message="Cargando detalles del proyecto..." />
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-2xl p-6 text-center text-sm font-medium my-8 max-w-7xl mx-auto">
          {error}
        </div>
      )}

      {!loading && !error && project && (
        <div className="w-full bg-slate-50/50">
          <ProjectReview resenia={project.resenia} />
          <ProjectTeam team={project.proyecto_investigadores} />
        </div>
      )}
    </>
  );
}
