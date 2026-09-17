import React from "react";
import SectionLabel from "../common/SectionLabel";
import SectionTitle from "../common/SectionTitle";
import vicerrectorImg from "../../assets/about/structure/vicerrector.webp";
import directorDiImg from "../../assets/about/structure/director-di.webp";
import directorBienesImg from "../../assets/about/structure/director-bienes.webp";
import coordinadorInnovacionImg from "../../assets/about/structure/coordinador-innovacion.webp";
import coordinadorBasicaImg from "../../assets/about/structure/coordinador-basica.webp";
import coordinadorIncubadorasImg from "../../assets/about/structure/coordinador-incubadoras.webp";

const LEADERSHIP = {
  name: "Dr. Orlando Bartolomé Zapata Coloma",
  role: "Vicerrector de Investigación",
  image: vicerrectorImg,
};

const DIRECTORS = [
  {
    name: "Dr. Juan Manuel Tume Ruiz",
    role: "Director de la Dirección de Investigación",
    image: directorDiImg,
  },
  {
    name: "Mgtr. Robert Moises Montero Timaná",
    role: "Jefe de la Dirección de Bienes y Servicios",
    image: directorBienesImg,
  },
  {
    name: "Mtro. Econ. Elvis Luilly Vertiz Contreras",
    role: "Coordinador de la Unidad de Gestión de Proyectos Básica y Aplicada",
    image: coordinadorBasicaImg,
  },

  {
    name: "Mgtr. Néstor Atarama Montero",
    role: " Coordinador de la Dirección de Innovación y Transferencia Tecnológica",
    image: coordinadorInnovacionImg,
  },

  {
    name: "Ing. Candy Yasmín Burgos Bayona",
    role: "Coordinadora de la Dirección de Incubadoras de Empresas",
    image: coordinadorIncubadorasImg,
  },
  {
    name: "Dr. Julio Piscoya Arbanil",
    role: "Presidente del Comité de Ética",
    image:
      "https://biajqtukwsnwtoyndeak.supabase.co/storage/v1/object/public/investigadores/julio-piscoya-arbanil.webp",
  },
  {
    name: "Mg. Elena Flores Prado",
    role: "Coordinadora de Semilleros",
    image:
      "https://images.unsplash.com/photo-1548142813-c348350df52b?auto=format&fit=crop&q=80&w=320&h=320",
  },
  {
    name: "Dr. Jorge Medina Cánepa",
    role: "Especialista en Propiedad Intelectual",
    image:
      "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=320&h=320",
  },
];

export default function Structure() {
  return (
    <section className="relative w-full py-6 bg-white overflow-hidden pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
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
              className="rounded-full w-28 h-28 sm:w-32 sm:h-32 object-cover ring-4 ring-slate-50"
              src={LEADERSHIP.image}
              alt={LEADERSHIP.name}
            />
            <div className="mt-3 sm:mt-4 space-y-1">
              <h3 className="text-lg sm:text-xl font-semibold text-slate-900">
                {LEADERSHIP.name}
              </h3>
              <p className="text-sm text-slate-600">{LEADERSHIP.role}</p>
            </div>
          </div>
        </div>

        <div
          className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 sm:gap-x-6 lg:gap-x-8 gap-y-12"
          data-aos="fade-up"
          data-aos-duration="800"
          data-aos-delay="200"
          data-aos-easing="ease-out-cubic"
        >
          {DIRECTORS.map((member, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center text-center group px-1"
            >
              <img
                className="rounded-full w-24 h-24 sm:w-28 sm:h-28 mx-auto object-cover ring-2 ring-slate-100 transition-transform duration-300 group-hover:scale-105"
                src={member.image}
                alt={member.name}
              />
              <div className="mt-3 sm:mt-4 space-y-1 w-full max-w-[280px]">
                <h4 className="text-sm sm:text-[15px] font-semibold text-slate-900 group-hover:text-brand-primary transition-colors leading-snug xl:whitespace-nowrap">
                  {member.name}
                </h4>
                <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed">
                  {member.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
