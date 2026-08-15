import React from "react";
import { Target, Compass, CheckCircle2 } from "lucide-react";
import SectionLabel from "../common/SectionLabel";
import SectionTitle from "../common/SectionTitle";

const STATEMENTS = [
  {
    id: "mission",
    label: "Misión",
    icon: Target,
    title: "Excelencia científica y transferencia tecnológica",
    description:
      "Gestionar la investigación con altos estándares de calidad y ética, conectando el conocimiento con el desarrollo social y productivo.",
    highlights: [
      "Proyectos I+D+i de impacto",
      "Semilleros de investigación",
      "Publicaciones indexadas",
    ],
  },
  {
    id: "vision",
    label: "Visión",
    icon: Compass,
    title: "Liderazgo e innovación con proyección global",
    description:
      "Ser un vicerrectorado referente por su producción científica, generación de patentes y vinculación estratégica internacional.",
    highlights: [
      "Referente en ciencia e innovación",
      "Ecosistema de patentes",
      "Alianzas internacionales",
    ],
  },
];

function StatementCard({ item }) {
  const Icon = item.icon;

  return (
    <div className="group relative p-8 sm:p-10 transition-all duration-300 hover:bg-brand-primary/[0.02] flex flex-col justify-between">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand-icon-bg text-brand-primary flex items-center justify-center transition-colors duration-300 group-hover:bg-brand-primary group-hover:text-white">
            <Icon className="w-5 h-5 stroke-[1.8]" />
          </div>
          <span className="text-xs font-bold tracking-wider uppercase text-brand-primary">
            {item.label}
          </span>
        </div>

        <h3 className="text-lg font-semibold text-slate-800 leading-snug">
          {item.title}
        </h3>

        <p className="text-sm text-slate-600 leading-relaxed">
          {item.description}
        </p>
      </div>

      <div className="pt-6 mt-6 border-t border-slate-100 space-y-2">
        {item.highlights.map((highlight, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-brand-primary shrink-0" />
            <span className="text-xs text-slate-600 font-medium">
              {highlight}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function MissionVision() {
  return (
    <section className="relative w-full py-16 sm:py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div
          className="max-w-2xl mx-auto text-center space-y-3"
          data-aos="fade-up"
          data-aos-duration="800"
          data-aos-easing="ease-out-cubic"
        >
          <SectionLabel>PROPÓSITO Y DIRECCIÓN</SectionLabel>
          <SectionTitle>
            Comprometidos con el desarrollo científico y la transformación
            social
          </SectionTitle>
        </div>

        <div
          className="max-w-5xl mx-auto rounded-3xl bg-white border border-slate-200/80 overflow-hidden"
          data-aos="fade-up"
          data-aos-duration="800"
          data-aos-delay="150"
          data-aos-easing="ease-out-cubic"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-200/80">
            {STATEMENTS.map((item) => (
              <StatementCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
