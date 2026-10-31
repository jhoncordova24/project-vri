import {
  BadgeCheck,
  FolderKanban,
  GraduationCap,
  Lightbulb,
  Award,
  BookOpenText,
} from "lucide-react";
import SectionContainer from "../common/SectionContainer";
import CountUp from "../common/CountUp";

const STATS = [
  {
    id: "renacyt",
    number: "40+",
    label: "Docentes Renacyt",
    icon: BadgeCheck,
  },
  {
    id: "proyectos",
    number: "25+",
    label: "Proyectos vigentes",
    icon: FolderKanban,
  },
  {
    id: "semilleros",
    number: "10+",
    label: "Semilleros activos",
    icon: GraduationCap,
  },
  {
    id: "patentes",
    number: "5+",
    label: "Solicitudes de patente",
    icon: Award,
  },
  {
    id: "emprendimientos",
    number: "70+",
    label: "Emprendimientos capacitados",
    icon: Lightbulb,
  },
  {
    id: "articulos",
    number: "20+",
    label: "Artículos publicados",
    icon: BookOpenText,
    hideOnDesktop: true,
  },
];

export default function Stats() {
  return (
    <SectionContainer
      label="Nuestro Impacto"
      title="Transformamos el conocimiento en soluciones reales, impulsando la investigación científica y el desarrollo sostenible de nuestra región."
      centered
      className="bg-white"
      dataAos="fade"
    >
      <div className="grid grid-cols-3 lg:grid-cols-5 gap-y-8 gap-x-2 sm:gap-x-4">
        {STATS.map(
          ({ id, number, label, icon: Icon, hideOnDesktop }, index) => (
            <div
              key={id}
              className={`text-center sm:text-start ${
                hideOnDesktop ? "lg:hidden" : ""
              } ${index !== 0 ? "lg:ps-6" : ""}`}
            >
              <div className="inline-flex items-center justify-center p-2 rounded-lg bg-brand-icon-bg text-brand-primary mb-2">
                <Icon className="size-4 shrink-0" />
              </div>

              <p className="text-lg sm:text-3xl lg:text-4xl font-extrabold text-brand-primary tracking-tight">
                <CountUp value={number} />
              </p>

              <p className="mt-1 text-[11px] sm:text-sm font-medium text-slate-600 leading-snug">
                {label}
              </p>
            </div>
          ),
        )}
      </div>
    </SectionContainer>
  );
}
