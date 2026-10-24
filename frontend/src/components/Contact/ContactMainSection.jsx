import React, { useState } from "react";
import {
  Mail,
  MapPin,
  Clock,
  Send,
  ArrowRight,
  ExternalLink,
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
  const [isMapActive, setIsMapActive] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const mailtoSubject = encodeURIComponent(`Consulta Web - ${formData.name}`);
    const mailtoBody = encodeURIComponent(
      `${formData.message}\n\n---\nResponder a: ${formData.email}`,
    );
    window.location.href = `mailto:${formData.targetEmail}?subject=${mailtoSubject}&body=${mailtoBody}`;
  };

  return (
    <SectionContainer
      label="CANALES GENERALES"
      title="Información y Atención"
      centered={true}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
        <div
          className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-7 lg:p-8 shadow-xs"
          data-aos="fade-up"
          data-aos-duration="600"
        >
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-1">
            Envíanos un mensaje
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mb-6">
            Completa los datos y se abrirá tu gestor de correo preconfigurado.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Nombres y Apellidos
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Ej. Juan Pérez"
                  className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-brand-primary focus:ring-1 focus:ring-brand-primary text-slate-800 placeholder:text-slate-400 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="tu_correo@ejemplo.com"
                  className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-brand-primary focus:ring-1 focus:ring-brand-primary text-slate-800 placeholder:text-slate-400 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Dependencia de Destino
              </label>
              <select
                name="targetEmail"
                value={formData.targetEmail}
                onChange={handleChange}
                className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-hidden focus:border-brand-primary focus:ring-1 focus:ring-brand-primary text-slate-800 transition-all"
              >
                {TARGET_EMAILS.map((item, idx) => (
                  <option key={idx} value={item.email}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Consulta o Mensaje
              </label>
              <textarea
                name="message"
                required
                rows={5}
                value={formData.message}
                onChange={handleChange}
                placeholder="Escribe aquí los detalles de tu consulta institucional..."
                className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-brand-primary focus:ring-1 focus:ring-brand-primary text-slate-800 placeholder:text-slate-400 resize-none transition-all"
              />
            </div>

            <div className="pt-2">
              <Button
                type="submit"
                variant="primary"
                icon={Send}
                iconPosition="left"
                className="w-full cursor-pointer"
              >
                Enviar Consulta
              </Button>
            </div>

            <p className="text-center text-xs text-slate-500 pt-1">
              Atención presencial y virtual en días hábiles institucionales.
            </p>
          </form>
        </div>

        <div
          className="flex flex-col justify-between h-full"
          data-aos="fade-up"
          data-aos-duration="600"
          data-aos-delay="100"
        >
          <div className="divide-y divide-slate-200/80">
            <div className="flex gap-x-5 py-5 first:pt-0">
              <div className="w-10 h-10 rounded-xl bg-brand-icon-bg text-brand-primary flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5 stroke-[1.8]" />
              </div>
              <div className="grow min-w-0">
                <h4 className="text-sm font-bold text-slate-900">
                  Correo Institucional
                </h4>
                <p className="mt-0.5 text-xs text-slate-500">
                  Mesa de partes virtual y atención general
                </p>
                <a
                  href="mailto:vrinvestigacion@unp.edu.pe"
                  className="mt-2 inline-flex items-center gap-x-1.5 text-xs font-semibold text-brand-primary hover:text-brand-hover transition-colors truncate max-w-full"
                >
                  <span className="truncate">vrinvestigacion@unp.edu.pe</span>
                  <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                </a>
              </div>
            </div>

            <div className="flex gap-x-5 py-5">
              <div className="w-10 h-10 rounded-xl bg-brand-icon-bg text-brand-primary flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5 stroke-[1.8]" />
              </div>
              <div className="grow">
                <h4 className="text-sm font-bold text-slate-900">
                  Horario de Atención
                </h4>
                <p className="mt-0.5 text-xs text-slate-500">
                  Lunes a Viernes · Horario continuo
                </p>
                <p className="mt-1.5 text-xs sm:text-sm font-semibold text-slate-800">
                  8:00 a.m. - 3:00 p.m.
                </p>
              </div>
            </div>

            <div className="flex gap-x-5 py-5">
              <div className="w-10 h-10 rounded-xl bg-brand-icon-bg text-brand-primary flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 stroke-[1.8]" />
              </div>
              <div className="grow">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">
                      Sede Central
                    </h4>
                    <p className="mt-0.5 text-xs text-slate-500">
                      Vicerrectorado de Investigación · Campus Universitario
                    </p>
                    <p className="mt-1 text-xs font-medium text-slate-700">
                      Edificio de la OTI, 5.° piso (Urb. Miraflores, Castilla)
                    </p>
                  </div>
                  <a
                    href="https://maps.app.goo.gl/iXFboJb9yPEkJ76g6"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 inline-flex items-center gap-1 text-xs font-semibold text-brand-primary hover:text-brand-hover transition-colors"
                  >
                    <span>Abrir</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div
            onClick={() => setIsMapActive(true)}
            onMouseLeave={() => setIsMapActive(false)}
            className="mt-2 w-full h-56 sm:h-64 rounded-2xl overflow-hidden border border-slate-200/90 shadow-2xs relative bg-slate-100 cursor-pointer"
          >
            <iframe
              title="Centro de Informática y Telecomunicaciones UNP"
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d254295.48186844753!2d-80.556273!3d-5.204896!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x904a106d09e6a02d%3A0xba5339135e72d16f!2sCentro%20de%20Inform%C3%A1tica%20y%20Telecomunicaciones!5e0!3m2!1ses-419!2spe!4v1792870010937!5m2!1ses-419!2spe"
              className={`w-full h-full border-0 absolute inset-0 transform-gpu ${
                isMapActive ? "pointer-events-auto" : "pointer-events-none"
              }`}
              loading="lazy"
              allowFullScreen=""
              referrerPolicy="strict-origin-when-cross-origin"
            />

            {!isMapActive && (
              <div className="absolute inset-0 bg-transparent flex items-end justify-center pb-3 pointer-events-none transition-opacity">
                <span className="bg-slate-900/75 backdrop-blur-xs text-white text-[11px] font-medium px-2.5 py-1 rounded-full shadow-sm">
                  Haz clic para interactuar con el mapa
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
