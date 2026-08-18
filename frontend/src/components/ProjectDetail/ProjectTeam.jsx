import React from "react";
import { Mail, ExternalLink, Award, UserCheck } from "lucide-react";
import SectionLabel from "../common/SectionLabel";
import SectionTitle from "../common/SectionTitle";

export default function ProjectTeam({ team = [] }) {
  if (!team || team.length === 0) return null;

  const getInitials = (name) => {
    if (!name) return "IN";
    return name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part[0])
      .join("")
      .toUpperCase();
  };

  const rolePriority = {
    "investigador principal": 1,
    "investigadora principal": 1,
    "co-investigador": 2,
    "co-investigadora": 2,
    alumno: 3,
    alumna: 3,
    tesista: 3,
  };

  const sortedTeam = [...team].sort((a, b) => {
    const roleA = a.rol?.toLowerCase().trim() || "";
    const roleB = b.rol?.toLowerCase().trim() || "";
    const pA = rolePriority[roleA] || 99;
    const pB = rolePriority[roleB] || 99;
    return pA - pB;
  });

  return (
    <section
      className="w-full py-12 sm:py-16 bg-slate-50/50 border-t border-slate-200/60"
      data-aos="fade-up"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center mb-12">
          <SectionLabel>Participantes</SectionLabel>
          <SectionTitle>Equipo de investigación</SectionTitle>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {sortedTeam.map((item, index) => {
            const member = item.investigadores;
            if (!member) return null;

            const isPrincipal = item.rol?.toLowerCase().includes("principal");

            return (
              <div
                key={item.id || member.id || index}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                className={`relative flex flex-col items-center p-6 bg-white rounded-2xl border transition-colors duration-200 group shadow-sm ${
                  isPrincipal
                    ? "border-brand-primary/40 ring-1 ring-brand-primary/10"
                    : "border-slate-200/80"
                }`}
              >
                {isPrincipal && (
                  <div className="absolute -top-3 px-3 py-1 bg-brand-primary text-white text-[11px] font-bold rounded-full shadow-md flex items-center gap-1.5 uppercase tracking-wider">
                    <UserCheck className="w-3.5 h-3.5" />
                    Líder de Proyecto
                  </div>
                )}

                <div className="relative mb-4 mt-2">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-slate-100 ring-4 ring-slate-50 shadow-inner flex items-center justify-center bg-gradient-to-tr from-slate-900 via-slate-800 to-brand-primary text-white font-bold text-xl tracking-wider select-none">
                    {member.foto_url ? (
                      <img
                        src={member.foto_url}
                        alt={member.nombres_apellidos}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    ) : (
                      <span>{getInitials(member.nombres_apellidos)}</span>
                    )}
                  </div>
                </div>

                <h4 className="font-bold text-slate-800 text-sm sm:text-base text-center line-clamp-2 min-h-[2.75rem] flex items-center justify-center group-hover:text-brand-primary transition-colors">
                  {member.nombres_apellidos}
                </h4>

                <span className="mt-2 mb-3 px-3 py-1 text-xs font-semibold text-brand-primary bg-brand-icon-bg rounded-full border border-brand-primary/20">
                  {item.rol || "Investigador"}
                </span>

                {member.email ? (
                  <a
                    href={`mailto:${member.email}`}
                    title={member.email}
                    className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-brand-primary truncate max-w-full mb-5 transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5 flex-shrink-0" />
                    <span className="truncate">{member.email}</span>
                  </a>
                ) : (
                  <div className="mb-5" />
                )}

                <div className="mt-auto w-full pt-4 border-t border-slate-100 flex flex-wrap items-center justify-center gap-2">
                  {member.cti_vitae_url ? (
                    <a
                      href={member.cti_vitae_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-brand-primary bg-brand-icon-bg hover:bg-brand-primary hover:text-white rounded-xl transition-colors duration-200"
                    >
                      <span>CTI Vitae</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ) : null}

                  {member.orcid_url ? (
                    <a
                      href={member.orcid_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-600 hover:text-white rounded-xl transition-colors duration-200"
                    >
                      <Award className="w-3 h-3" />
                      <span>ORCID</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ) : null}

                  {!member.cti_vitae_url && !member.orcid_url && (
                    <span className="text-[11px] text-slate-400 italic py-1">
                      Sin enlaces académicos
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
