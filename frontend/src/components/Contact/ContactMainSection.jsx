import React, { useState } from "react";
import {
  Mail,
  MapPin,
  Clock,
  ChevronRight,
  ExternalLink,
  Globe,
} from "lucide-react";
import SectionContainer from "../common/SectionContainer";
import Button from "../common/Button";

const TARGET_EMAILS = [
  {
    label: "Mesa de Partes General (VRI)",
    email: "vrinvestigacion@unp.edu.pe",
  },
  {
    label: "Dirección de Investigación",
    email: "inst.investigacion@unp.edu.pe",
  },
  {
    label: "Dirección de Incubadora de Empresas (Nexora)",
    email: "infoincubadora@unp.edu.pe",
  },
  {
    label: "Dirección de Innovación y Transferencia",
    email: "diyttec.vri@unp.edu.pe",
  },
  {
    label: "Dirección de Producción de Bienes y Servicios",
    email: "dpbs-vri@unp.edu.pe",
  },
];

export default function ContactMainSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    targetEmail: "vrinvestigacion@unp.edu.pe",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const mailtoSubject = encodeURIComponent(`Consulta Web - ${formData.name}`);
    const mailtoBody = encodeURIComponent(
      `${formData.message}\n\n---\nRemitente: ${formData.name}\nCorreo de contacto: ${formData.email}`,
    );
    window.location.href = `mailto:${formData.targetEmail}?subject=${mailtoSubject}&body=${mailtoBody}`;
  };

  return (
    <SectionContainer
      label="CANALES GENERALES"
      title="Información y Atención"
      description={
        <span className="hidden sm:inline">
          Canales directos de consulta, atención administrativa y ubicación del
          Vicerrectorado de Investigación.
        </span>
      }
      centered={true}
    >
      <div className="mt-6 sm:mt-10 lg:mt-12 grid items-center lg:grid-cols-2 gap-6 lg:gap-14">
        <div
          className="flex flex-col bg-white border border-slate-200/80 rounded-2xl p-5 sm:p-7 lg:p-8 shadow-xs"
          data-aos="fade-up"
          data-aos-duration="600"
        >
          <h2 className="mb-4 sm:mb-6 text-sm sm:text-base lg:text-lg font-semibold text-slate-700">
            Envíanos un mensaje
          </h2>

          <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label htmlFor="contact-name" className="sr-only">
                  Nombres y Apellidos
                </label>
                <input
                  type="text"
                  id="contact-name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Nombres y Apellidos"
                  className="py-2.5 sm:py-3 px-3.5 sm:px-4 block w-full rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-700 placeholder:text-slate-400 focus:outline-hidden focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all"
                />
              </div>

              <div>
                <label htmlFor="contact-email" className="sr-only">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  id="contact-email"
                  name="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Correo Electrónico"
                  className="py-2.5 sm:py-3 px-3.5 sm:px-4 block w-full rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-700 placeholder:text-slate-400 focus:outline-hidden focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all"
                />
              </div>
            </div>

            <div>
              <label htmlFor="contact-target" className="sr-only">
                Dependencia de Destino
              </label>
              <select
                id="contact-target"
                name="targetEmail"
                value={formData.targetEmail}
                onChange={handleChange}
                className="py-2.5 sm:py-3 px-3.5 sm:px-4 block w-full rounded-xl border border-slate-200 bg-white text-xs sm:text-sm text-slate-700 focus:outline-hidden focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all"
              >
                {TARGET_EMAILS.map((item, idx) => (
                  <option key={idx} value={item.email}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="contact-message" className="sr-only">
                Consulta o Mensaje
              </label>
              <textarea
                id="contact-message"
                name="message"
                required
                rows={4}
                value={formData.message}
                onChange={handleChange}
                placeholder="Escribe aquí los detalles de tu consulta institucional..."
                className="py-2.5 sm:py-3 px-3.5 sm:px-4 block w-full rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-700 placeholder:text-slate-400 focus:outline-hidden focus:border-brand-primary focus:ring-1 focus:ring-brand-primary resize-none transition-all"
              />
            </div>

            <div className="pt-1.5 sm:pt-2">
              <Button
                type="submit"
                variant="primary"
                className="w-full cursor-pointer"
              >
                Enviar Consulta
              </Button>
            </div>

            <p className="text-center text-[11px] text-slate-400 pt-1">
              Atención presencial y virtual en días hábiles institucionales.
            </p>
          </form>
        </div>

        <div
          className="divide-y divide-slate-200/80"
          data-aos="fade-up"
          data-aos-duration="600"
          data-aos-delay="100"
        >
          <div className="flex gap-x-5 py-5 sm:py-6 first:pt-0">
            <Mail className="shrink-0 size-5 sm:size-6 mt-1 text-brand-primary stroke-[1.8]" />
            <div className="grow min-w-0">
              <h4 className="text-xs sm:text-sm font-semibold text-slate-800">
                Correo Institucional
              </h4>
              <p className="mt-0.5 sm:mt-1 text-xs sm:text-sm text-slate-500 leading-relaxed">
                Mesa de partes virtual y recepción de trámites académicos.
              </p>
              <a
                href="mailto:vrinvestigacion@unp.edu.pe"
                className="mt-1.5 sm:mt-2 inline-flex items-center gap-x-1.5 text-xs sm:text-sm font-medium text-slate-600 hover:text-brand-primary transition-colors truncate max-w-full"
              >
                <span className="truncate">vrinvestigacion@unp.edu.pe</span>
                <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 text-slate-400 group-hover:text-brand-primary" />
              </a>
            </div>
          </div>

          <div className="flex gap-x-5 py-5 sm:py-6">
            <Clock className="shrink-0 size-5 sm:size-6 mt-1 text-brand-primary stroke-[1.8]" />
            <div className="grow">
              <h4 className="text-xs sm:text-sm font-semibold text-slate-800">
                Horario de Atención
              </h4>
              <p className="mt-0.5 sm:mt-1 text-xs sm:text-sm text-slate-500 leading-relaxed">
                Lunes a Viernes en horario de jornada continua.
              </p>
              <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm font-medium text-slate-700">
                8:00 a.m. - 3:00 p.m.
              </p>
            </div>
          </div>

          <div className="flex gap-x-5 py-5 sm:py-6">
            <MapPin className="shrink-0 size-5 sm:size-6 mt-1 text-brand-primary stroke-[1.8]" />
            <div className="grow">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h4 className="text-xs sm:text-sm font-semibold text-slate-800">
                    Sede Central
                  </h4>
                  <p className="mt-0.5 sm:mt-1 text-xs sm:text-sm text-slate-500 leading-relaxed">
                    Vicerrectorado de Investigación · Campus Universitario
                  </p>
                  <p className="mt-1 text-xs sm:text-sm text-slate-600">
                    Edificio de la OTI, 5.° piso (Urb. Miraflores, Castilla)
                  </p>
                </div>
                <a
                  href="https://maps.app.goo.gl/iXFboJb9yPEkJ76g6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 inline-flex items-center gap-1 text-xs sm:text-sm font-medium text-slate-600 hover:text-brand-primary transition-colors"
                >
                  <span>Abrir</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400 hover:text-brand-primary" />
                </a>
              </div>
            </div>
          </div>

          <div className="flex gap-x-5 py-5 sm:py-6 last:pb-0">
            <Globe className="shrink-0 size-5 sm:size-6 mt-1 text-brand-primary stroke-[1.8]" />
            <div className="grow">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h4 className="text-xs sm:text-sm font-semibold text-slate-800">
                    Portal Institucional
                  </h4>
                  <p className="mt-0.5 sm:mt-1 text-xs sm:text-sm text-slate-500 leading-relaxed">
                    Universidad Nacional de Piura
                  </p>
                  <p className="mt-1 text-xs sm:text-sm text-slate-600">
                    Acceso al portal central y servicios universitarios
                  </p>
                </div>
                <a
                  href="https://www.unp.edu.pe/web/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 inline-flex items-center gap-1 text-xs sm:text-sm font-medium text-slate-600 hover:text-brand-primary transition-colors"
                >
                  <span>unp.edu.pe</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400 hover:text-brand-primary" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
