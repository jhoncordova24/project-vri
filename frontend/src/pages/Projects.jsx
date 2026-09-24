import React from "react";
import { useProjects } from "../hooks/useProjects";
import heroBg from "../assets/projects/hero.webp";
import PageHero from "../components/common/PageHero";
import LoadingSpinner from "../components/common/LoadingSpinner";
import ProjectsHeader from "../components/Projects/ProjectsHeader";
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
    <main className="w-full bg-slate-50/60 min-h-screen">
      <PageHero
        title="Proyectos de Investigación"
        subtitle="Conoce las iniciativas científicas, tecnológicas y humanísticas financiadas por nuestra institución."
        badge="Vicerrectorado de Investigación"
        imageSrc={DEFAULT_HERO_IMAGE}
      />

      <ProjectsHeader
        title={convocationData?.titulo}
        selectedYear={selectedYear}
        availableYears={availableYears}
        onYearChange={setSelectedYear}
        convocationData={convocationData}
      />

      {loading && (
        <div className="py-12">
          <LoadingSpinner message="Cargando información de convocatorias..." />
        </div>
      )}

      {error && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-2xl p-6 text-center text-sm font-medium">
            {error}
          </div>
        </div>
      )}

      {!loading && !error && convocationData && (
        <ProjectList projects={convocationData.proyectos} />
      )}
    </main>
  );
}
