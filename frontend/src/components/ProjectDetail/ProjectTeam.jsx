import React, {
  useRef,
  useMemo,
  useCallback,
  useState,
  useEffect,
  memo,
} from "react";
import {
  Mail,
  ExternalLink,
  Award,
  UserCheck,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import SectionLabel from "../common/SectionLabel";
import SectionTitle from "../common/SectionTitle";

const ROLE_PRIORITY = {
  "investigador principal": 1,
  "investigadora principal": 1,
  "co-investigador": 2,
  "co-investigadora": 2,
  alumno: 3,
  alumna: 3,
  tesista: 3,
};

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

const TeamMemberCard = memo(function TeamMemberCard({ item }) {
  const member = item.investigadores;
  if (!member) return null;

  const isPrincipal = item.rol?.toLowerCase().includes("principal");

  return (
    <div
      data-aos="fade-up"
      className={`relative flex flex-col items-center p-5 sm:p-6 bg-white rounded-2xl border transition-colors duration-200 group shadow-sm w-full sm:w-[300px] lg:w-[280px] flex-shrink-0 snap-start ${
        isPrincipal
          ? "border-brand-primary/40 ring-1 ring-brand-primary/10"
          : "border-slate-200/80"
      }`}
    >
      {isPrincipal && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 px-3 py-1 bg-brand-primary text-white text-[11px] font-bold rounded-full shadow-md flex items-center gap-1.5 uppercase tracking-wider whitespace-nowrap">
          <UserCheck className="w-3.5 h-3.5" />
          Líder de Proyecto
        </div>
      )}

      <div className="relative mb-4 mt-2">
        <div className="w-28 h-28 rounded-full overflow-hidden flex items-center justify-center bg-gradient-to-tr from-slate-900 via-slate-800 to-brand-primary text-white font-bold text-2xl tracking-wider select-none">
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

      <div className="min-h-[3rem] flex items-center justify-center w-full px-2">
        <h4 className="font-bold text-slate-800 text-base sm:text-base text-center line-clamp-2 break-words leading-tight group-hover:text-brand-primary transition-colors">
          {member.nombres_apellidos}
        </h4>
      </div>

      <span className="mt-2 mb-3 px-3 py-1 text-xs font-semibold text-brand-primary bg-brand-icon-bg rounded-full border border-brand-primary/20 text-center">
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
        {member.cti_vitae_url && (
          <a
            href={member.cti_vitae_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-brand-primary bg-brand-icon-bg hover:bg-brand-primary hover:text-white rounded-xl transition-colors duration-200"
          >
            <span>CTI Vitae</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        )}

        {member.orcid_url && (
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
        )}

        {!member.cti_vitae_url && !member.orcid_url && (
          <span className="text-[11px] text-slate-400 italic py-1">
            Sin enlaces académicos
          </span>
        )}
      </div>
    </div>
  );
});

export default function ProjectTeam({ team = [] }) {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const sortedTeam = useMemo(() => {
    if (!team || team.length === 0) return [];
    return [...team].sort((a, b) => {
      const roleA = a.rol?.toLowerCase().trim() || "";
      const roleB = b.rol?.toLowerCase().trim() || "";
      const pA = ROLE_PRIORITY[roleA] || 99;
      const pB = ROLE_PRIORITY[roleB] || 99;
      return pA - pB;
    });
  }, [team]);

  const showMobileNav = sortedTeam.length > 1;
  const showDesktopNav = sortedTeam.length > 4;

  const updateScrollState = useCallback(() => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;

    setCanScrollLeft(scrollLeft > 5);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 5);
  }, []);

  useEffect(() => {
    updateScrollState();
    window.addEventListener("resize", updateScrollState);
    return () => window.removeEventListener("resize", updateScrollState);
  }, [updateScrollState, sortedTeam]);

  const scrollByAmount = useCallback((dir) => {
    if (!scrollRef.current) return;
    const cardWidth = scrollRef.current.firstChild?.offsetWidth || 300;
    scrollRef.current.scrollBy({
      left: dir * (cardWidth + 24),
      behavior: "smooth",
    });
  }, []);

  if (!team || team.length === 0) return null;

  const navButtonBaseClass = `absolute top-1/2 -translate-y-1/2 z-20 w-9 h-9 items-center justify-center rounded-full bg-brand-primary text-white shadow-lg hover:brightness-110 active:scale-95 transition-all duration-300 ${
    showDesktopNav ? "flex" : "flex lg:hidden"
  }`;

  return (
    <section
      className="w-full py-12 sm:py-16 bg-slate-50/50 "
      data-aos="fade-up"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center mb-6 sm:mb-12">
          <SectionLabel>Participantes</SectionLabel>
          <SectionTitle>Equipo de investigación</SectionTitle>
        </div>

        <div className="relative">
          {showMobileNav && (
            <>
              <button
                type="button"
                onClick={() => scrollByAmount(-1)}
                className={`${navButtonBaseClass} -left-3 sm:-left-4 lg:-left-5 ${
                  canScrollLeft
                    ? "opacity-100 scale-100 pointer-events-auto"
                    : "opacity-0 scale-75 pointer-events-none"
                }`}
                aria-label="Anterior"
                tabIndex={canScrollLeft ? 0 : -1}
              >
                <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
              </button>
              <button
                type="button"
                onClick={() => scrollByAmount(1)}
                className={`${navButtonBaseClass} -right-3 sm:-right-4 lg:-right-5 ${
                  canScrollRight
                    ? "opacity-100 scale-100 pointer-events-auto"
                    : "opacity-0 scale-75 pointer-events-none"
                }`}
                aria-label="Siguiente"
                tabIndex={canScrollRight ? 0 : -1}
              >
                <ChevronRight className="w-5 h-5 stroke-[2.5]" />
              </button>
            </>
          )}

          <div
            ref={scrollRef}
            onScroll={updateScrollState}
            className={`flex gap-6 lg:gap-8 overflow-x-auto snap-x snap-mandatory pt-4 pb-4 scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] ${
              !showDesktopNav ? "lg:justify-center" : ""
            }`}
          >
            {sortedTeam.map((item, index) => (
              <TeamMemberCard
                key={item.id || item.investigadores?.id || index}
                item={item}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
