import {
  BadgeCheck,
  FolderKanban,
  GraduationCap,
  HeartHandshake,
} from "lucide-react";
import SectionLabel from "../common/SectionLabel";
import SectionTitle from "../common/SectionTitle";
import CountUp from "../CountUp/CountUp";

const mainStat = {
  number: "40+",
  badge: "Calificados Concytec",
  description:
    "Registrados en Concytec impulsando la producción científica y tecnológica de nuestra universidad.",
};

const secondaryStats = [
  {
    number: "15+",
    label: "Proyectos vigentes",
    icon: FolderKanban,
  },
  {
    number: "10+",
    label: "Semilleros activos",
    icon: GraduationCap,
  },
  {
    number: "100%",
    label: "Compromiso con Piura",
    icon: HeartHandshake,
  },
];

export default function Stats() {
  return (
    <section className="py-10 lg:py-14 bg-white overflow-hidden">
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

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5" data-aos="fade">
            <div className="flex flex-col">
              <div className="inline-flex items-center gap-1.5 self-start bg-brand-primary/10 text-brand-primary font-medium text-xs py-1 px-2.5 rounded-full mb-3">
                <BadgeCheck className="shrink-0 size-3.5" />
                <span>{mainStat.badge}</span>
              </div>

              <div className="text-4xl sm:text-6xl font-extrabold tracking-tight text-brand-dark my-1">
                <CountUp value={mainStat.number} />
              </div>

              <p className="text-sm sm:text-base font-normal text-slate-600 leading-relaxed max-w-md">
                {mainStat.description}
              </p>
            </div>
          </div>

          <div
            className="lg:col-span-7 relative lg:before:absolute lg:before:top-0 lg:before:-start-6 lg:before:w-px lg:before:h-full lg:before:bg-slate-200"
            data-aos="fade"
          >
            <div className="grid grid-cols-3 gap-2 sm:gap-4 divide-x divide-slate-100">
              {secondaryStats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={index}
                    className={`${index !== 0 ? "ps-2 sm:ps-6" : ""}`}
                  >
                    <div className="inline-flex items-center justify-center p-2 rounded-lg bg-slate-100 text-brand-primary mb-2">
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
        </div>
      </div>
    </section>
  );
}
