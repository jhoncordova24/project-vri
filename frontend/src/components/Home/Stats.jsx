import {
  BadgeCheck,
  FolderKanban,
  GraduationCap,
  Lightbulb,
  Award,
  BookOpenText,
} from "lucide-react";
import SectionLabel from "../common/SectionLabel";
import SectionTitle from "../common/SectionTitle";
import CountUp from "../common/CountUp";

const stats = [
  {
    number: "40+",
    label: "Docentes Concytec",
    icon: BadgeCheck,
  },
  {
    number: "25+",
    label: "Proyectos vigentes",
    icon: FolderKanban,
  },
  {
    number: "10+",
    label: "Semilleros activos",
    icon: GraduationCap,
  },
  {
    number: "12+",
    label: "Patentes registradas",
    icon: Award,
  },
  {
    number: "70+",
    label: "Emprendimientos capacitados",
    icon: Lightbulb,
  },
  {
    number: "20+",
    label: "Artículos publicados",
    icon: BookOpenText,
    hideOnDesktop: true,
  },
];

export default function Stats() {
  return (
    <section className="pt-16 pb-10 lg:pt-16 lg:pb-10 bg-white overflow-hidden">
      <div className="max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto">
        <div
          className="max-w-3xl mx-auto text-center mb-10 lg:mb-16"
          data-aos="fade"
        >
          <SectionLabel>Nuestro Impacto</SectionLabel>
          <SectionTitle>
            Transformamos el conocimiento en soluciones reales, impulsando la
            investigación científica y el desarrollo sostenible de nuestra
            región.
          </SectionTitle>
        </div>

        <div
          className="grid grid-cols-3 lg:grid-cols-5 gap-y-8 gap-x-2 sm:gap-x-4 "
          data-aos="fade"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className={`text-center sm:text-start ${
                  stat.hideOnDesktop ? "lg:hidden" : ""
                } ${index !== 0 ? "lg:ps-6" : ""}`}
              >
                <div className="inline-flex items-center justify-center p-2 rounded-lg bg-brand-icon-bg text-brand-primary mb-2">
                  <Icon className="size-4 shrink-0" />
                </div>
                <p className="text-xl sm:text-3xl lg:text-4xl font-extrabold text-brand-primary tracking-tight">
                  <CountUp value={stat.number} />
                </p>
                <p className="mt-1 text-[11px] sm:text-sm font-medium text-slate-600 leading-snug">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
