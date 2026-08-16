import React from "react";
import { useProjects } from "../hooks/useProjects";
import heroBg from "../assets/projects/hero.webp";
import PageHero from "../components/common/PageHero";
import LoadingSpinner from "../components/common/LoadingSpinner";
import ProjectsHero from "../components/Projects/ProjectsHero";
import ConvocationDocs from "../components/Projects/ConvocationDocs";
import ProjectList from "../components/Projects/ProjectList";

const DEFAULT_HERO_IMAGE = heroBg;

export default function Projects() {
  const {
    selectedYear,
    setSelectedYear,
    availableYears,
    convocationData,
    loading,
    error,
  } = useProjects(2025);

  return (
    <>
      <PageHero
        title="Proyectos de Investigación"
        subtitle="Conoce las iniciativas científicas, tecnológicas y humanísticas financiadas por nuestra institución."
        badge="Vicerrectorado de Investigación"
        imageSrc={DEFAULT_HERO_IMAGE}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <ProjectsHero
          title={convocationData?.titulo}
          selectedYear={selectedYear}
          availableYears={availableYears}
          onYearChange={setSelectedYear}
        />

        {loading && (
          <LoadingSpinner message="Cargando información de convocatorias..." />
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-2xl p-6 text-center text-sm font-medium my-8">
            {error}
          </div>
        )}

        {!loading && !error && convocationData && (
          <>
            <ConvocationDocs data={convocationData} />
            <ProjectList projects={convocationData.proyectos} />
          </>
        )}
      </div>
    </>
  );
}
