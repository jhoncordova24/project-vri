import React from "react";
import SectionLabel from "../common/SectionLabel";
import SectionTitle from "../common/SectionTitle";
import vicerrectorImg from "../../assets/about/structure/vicerrector.webp";

const LEADERSHIP = {
  name: "Dr. Orlando Bartolomé Zapata Coloma",
  role: "Vicerrector de Investigación",
  unit: "Alta Dirección",
  image: vicerrectorImg,
};

const DIRECTORS = [
  {
    name: "Dr. Carlos Mendoza Silva",
    role: "Director General de Investigación",
    unit: "DGI",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=320&h=320",
  },
  {
    name: "Mg. Roberto Castro Peña",
    role: "Director de Innovación y Transferencia",
    unit: "DITT",
    image:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=320&h=320",
  },
  {
    name: "Dra. Lucía Valdivia Cruz",
    role: "Directora de Editorial y Producción",
    unit: "DEPC",
    image:
      "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?auto=format&fit=crop&q=80&w=320&h=320",
  },
  {
    name: "Dr. Walter Arévalo Ríos",
    role: "Director de Centros e Institutos",
    unit: "CII",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=320&h=320",
  },
  {
    name: "Mg. Patricia Morales Wong",
    role: "Jefa de Unidad de Fondos Concursables",
    unit: "UFC",
    image:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=320&h=320",
  },
  {
    name: "Dr. Fernando Ruiz Chunga",
    role: "Presidente del Comité de Ética",
    unit: "CEI",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=320&h=320",
  },
  {
    name: "Mg. Elena Flores Prado",
    role: "Coordinadora de Semilleros",
    unit: "DGI",
    image:
      "https://images.unsplash.com/photo-1548142813-c348350df52b?auto=format&fit=crop&q=80&w=320&h=320",
  },
  {
    name: "Dr. Jorge Medina Cánepa",
    role: "Especialista en Propiedad Intelectual",
    unit: "DITT",
    image:
      "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=320&h=320",
  },
];

export default function Structure() {
  return (
    <section className="relative w-full py-16 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div
          className="max-w-3xl mx-auto text-center space-y-4"
          data-aos="fade-up"
          data-aos-duration="800"
          data-aos-easing="ease-out-cubic"
        >
          <SectionLabel>EQUIPO DIRECTIVO</SectionLabel>
          <SectionTitle>
            Liderazgo académico y científico comprometido con el desarrollo
          </SectionTitle>
        </div>

        <div
          className="flex justify-center text-center"
          data-aos="fade-up"
          data-aos-duration="800"
          data-aos-delay="100"
          data-aos-easing="ease-out-cubic"
        >
          <div className="flex flex-col items-center">
            <img
              className="rounded-full w-28 h-28 sm:w-32 sm:h-32 object-cover"
              src={LEADERSHIP.image}
              alt={LEADERSHIP.name}
            />
            <div className="mt-3 sm:mt-4 space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-brand-primary block">
                {LEADERSHIP.unit}
              </span>
              <h3 className="text-lg sm:text-xl font-semibold text-slate-900">
                {LEADERSHIP.name}
              </h3>
              <p className="text-sm text-slate-600">{LEADERSHIP.role}</p>
            </div>
          </div>
        </div>

        <div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 md:gap-10"
          data-aos="fade-up"
          data-aos-duration="800"
          data-aos-delay="200"
          data-aos-easing="ease-out-cubic"
        >
          {DIRECTORS.map((member, idx) => (
            <div key={idx} className="text-center group">
              <img
                className="rounded-full w-20 h-20 sm:w-24 sm:h-24 mx-auto object-cover transition-transform duration-300 group-hover:scale-105"
                src={member.image}
                alt={member.name}
              />
              <div className="mt-3 sm:mt-4 space-y-0.5">
                <h4 className="text-sm sm:text-base font-semibold text-slate-900 group-hover:text-brand-primary transition-colors">
                  {member.name}
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-tight">
                  {member.role}
                </p>
                <span className="text-[10px] font-bold text-brand-primary uppercase tracking-wider block pt-1">
                  {member.unit}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
