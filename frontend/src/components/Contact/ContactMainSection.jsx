import React from "react";
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
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = data.get("name") || "";
    const email = data.get("email") || "";
    const targetEmail = data.get("targetEmail") || TARGET_EMAILS[0].email;
    const message = data.get("message") || "";

    const mailtoSubject = encodeURIComponent(`Consulta Web - ${name}`);
    const mailtoBody = encodeURIComponent(
      `${message}\n\n---\nRemitente: ${name}\nCorreo de contacto: ${email}`,
    );

    window.location.href = `mailto:${targetEmail}?subject=${mailtoSubject}&body=${mailtoBody}`;
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
      <div className="mt-6 sm:mt-8 lg:mt-12 grid items-center lg:grid-cols-2 gap-y-10 sm:gap-y-12 lg:gap-16">
        <div
          className="flex flex-col bg-white border border-slate-200 rounded-xl p-4 sm:p-6 lg:p-8"
          data-aos="fade-up"
          data-aos-duration="600"
          data-aos-once="true"
        >
          <h2 className="mb-4 sm:mb-6 lg:mb-8 text-base sm:text-lg lg:text-xl font-semibold text-slate-800">
            Envíanos un mensaje
          </h2>

          <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
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
                  placeholder="Nombres y Apellidos"
                  className="py-2 sm:py-2.5 lg:py-3 px-3.5 sm:px-4 block w-full rounded-lg border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-colors"
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
                  placeholder="Correo Electrónico"
                  className="py-2 sm:py-2.5 lg:py-3 px-3.5 sm:px-4 block w-full rounded-lg border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-colors"
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
                defaultValue={TARGET_EMAILS[0].email}
                className="py-2 sm:py-2.5 lg:py-3 px-3.5 sm:px-4 block w-full rounded-lg border border-slate-200 bg-white text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-colors"
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
                placeholder="Escribe aquí los detalles de tu consulta institucional..."
                className="py-2 sm:py-2.5 lg:py-3 px-3.5 sm:px-4 block w-full rounded-lg border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary resize-none transition-colors"
              />
            </div>

            <div className="pt-1">
              <Button
                type="submit"
                variant="primary"
                className="w-full cursor-pointer py-2 sm:py-2.5 text-xs sm:text-sm"
              >
                Enviar Consulta
              </Button>
            </div>

            <div className="pt-1 text-center">
              <p className="text-xs text-slate-500">
                Atención presencial y virtual en días hábiles institucionales.
              </p>
            </div>
          </form>
        </div>

        <div
          className="divide-y divide-slate-200"
          data-aos="fade-up"
          data-aos-duration="600"
          data-aos-delay="100"
          data-aos-once="true"
        >
          <div className="flex gap-x-4 sm:gap-x-6 lg:gap-x-7 py-4 sm:py-5 lg:py-6 lg:first:pt-0">
            <Mail className="shrink-0 size-5 sm:size-6 mt-1 text-brand-primary stroke-[1.8]" />
            <div className="grow min-w-0">
              <h3 className="text-sm sm:text-base font-semibold text-slate-800">
                Correo Institucional
              </h3>
              <p className="mt-0.5 sm:mt-1 text-xs sm:text-sm text-slate-500">
                Mesa de partes virtual y recepción de trámites académicos.
              </p>
              <a
                href="mailto:vrinvestigacion@unp.edu.pe"
                className="mt-1 sm:mt-2 inline-flex items-center gap-x-1.5 text-xs sm:text-sm font-medium text-slate-600 hover:text-brand-primary transition-colors truncate max-w-full"
              >
                <span className="truncate">vrinvestigacion@unp.edu.pe</span>
                <ChevronRight className="shrink-0 size-3.5 sm:size-4 text-slate-400" />
              </a>
            </div>
          </div>

          <div className="flex gap-x-4 sm:gap-x-6 lg:gap-x-7 py-4 sm:py-5 lg:py-6">
            <Clock className="shrink-0 size-5 sm:size-6 mt-1 text-brand-primary stroke-[1.8]" />
            <div className="grow">
              <h3 className="text-sm sm:text-base font-semibold text-slate-800">
                Horario de Atención
              </h3>
              <p className="mt-0.5 sm:mt-1 text-xs sm:text-sm text-slate-500">
                Lunes a Viernes en horario de jornada continua.
              </p>
              <p className="mt-1 sm:mt-2 text-xs sm:text-sm font-medium text-slate-700">
                8:00 a.m. - 3:00 p.m.
              </p>
            </div>
          </div>

          <div className="flex gap-x-4 sm:gap-x-6 lg:gap-x-7 py-4 sm:py-5 lg:py-6">
            <MapPin className="shrink-0 size-5 sm:size-6 mt-1 text-brand-primary stroke-[1.8]" />
            <div className="grow">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="text-sm sm:text-base font-semibold text-slate-800">
                    Sede Central
                  </h3>
                  <p className="mt-0.5 sm:mt-1 text-xs sm:text-sm text-slate-500">
                    Vicerrectorado de Investigación · Campus Universitario
                  </p>
                  <p className="mt-0.5 text-xs sm:text-sm text-slate-600">
                    Edificio de la OTI, 5.° piso (Urb. Miraflores, Castilla)
                  </p>
                </div>
                <a
                  href="https://maps.app.goo.gl/iXFboJb9yPEkJ76g6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 inline-flex items-center gap-x-1 text-xs sm:text-sm font-medium text-slate-600 hover:text-brand-primary transition-colors"
                >
                  <span>Abrir</span>
                  <ExternalLink className="size-3.5 sm:size-4 text-slate-400" />
                </a>
              </div>
            </div>
          </div>

          <div className="flex gap-x-4 sm:gap-x-6 lg:gap-x-7 py-4 sm:py-5 lg:py-6 last:pb-0">
            <Globe className="shrink-0 size-5 sm:size-6 mt-1 text-brand-primary stroke-[1.8]" />
            <div className="grow">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="text-sm sm:text-base font-semibold text-slate-800">
                    Portal Institucional
                  </h3>
                  <p className="mt-0.5 sm:mt-1 text-xs sm:text-sm text-slate-500">
                    Universidad Nacional de Piura
                  </p>
                  <p className="mt-0.5 text-xs sm:text-sm text-slate-600">
                    Acceso al portal central y servicios universitarios
                  </p>
                </div>
                <a
                  href="https://www.unp.edu.pe/web/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 inline-flex items-center gap-x-1 text-xs sm:text-sm font-medium text-slate-600 hover:text-brand-primary transition-colors"
                >
                  <span>unp.edu.pe</span>
                  <ExternalLink className="size-3.5 sm:size-4 text-slate-400" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
