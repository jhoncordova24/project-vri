import { useRef, useMemo, useCallback, useState, useEffect, memo } from "react";
import {
  Mail,
  ExternalLink,
  Award,
  UserCheck,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import SectionContainer from "../common/SectionContainer";

const ROLE_PRIORITY = {
  principal: 1,
  "co-investigad": 2,
  alumno: 3,
  alumna: 3,
  tesista: 3,
};

const getInitials = (name = "") =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0])
    .join("")
    .toUpperCase() || "IN";

const TeamMemberCard = memo(function TeamMemberCard({ item }) {
  const member = item.investigadores;
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  if (!member) return null;

  const isPrincipal = item.rol?.toLowerCase().includes("principal");
  const hasPhoto = Boolean(member.foto_url) && !imageError;
  const initials = getInitials(member.nombres_apellidos);

  const academicLinks = [
    member.cti_vitae_url && {
      href: member.cti_vitae_url,
      label: "CTI Vitae",
      className: "text-brand-primary bg-brand-icon-bg hover:bg-brand-primary",
    },
    member.orcid_url && {
      href: member.orcid_url,
      label: "ORCID",
      icon: Award,
      className: "text-emerald-700 bg-emerald-50 hover:bg-emerald-600",
    },
  ].filter(Boolean);

  return (
    <div
      className={`relative flex flex-col items-center p-6 bg-white rounded-2xl border shadow-xs transition-shadow duration-200 w-full sm:w-[300px] lg:w-[280px] shrink-0 snap-center sm:snap-start transform-gpu ${
        isPrincipal
          ? "border-brand-primary/40 ring-1 ring-brand-primary/10"
          : "border-slate-200/80"
      }`}
    >
      {isPrincipal && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 px-3 py-1 bg-brand-primary text-white text-[11px] font-bold rounded-full shadow-sm flex items-center gap-1.5 uppercase tracking-wider whitespace-nowrap">
          <UserCheck className="w-3.5 h-3.5" /> Líder de Proyecto
        </div>
      )}

      <div className="relative mb-4 mt-2 w-28 h-28">
        {hasPhoto ? (
          <>
            {!imageLoaded && (
              <div className="absolute inset-0 rounded-full bg-slate-200 animate-pulse border-2 border-slate-100 flex items-center justify-center">
                <span className="text-slate-300 font-bold text-xl select-none">
                  {initials}
                </span>
              </div>
            )}
            <img
              src={member.foto_url}
              alt={member.nombres_apellidos}
              loading="lazy"
              decoding="async"
              width="112"
              height="112"
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
              className={`w-28 h-28 rounded-full object-cover border-2 border-slate-100 transition-opacity duration-300 ${
                imageLoaded ? "opacity-100" : "opacity-0"
              }`}
            />
          </>
        ) : (
          <div className="w-28 h-28 rounded-full flex items-center justify-center bg-gradient-to-tr from-slate-900 via-slate-800 to-brand-primary text-white font-bold text-2xl tracking-wider select-none border-2 border-slate-100 shadow-inner">
            <span>{initials}</span>
          </div>
        )}
      </div>

      <div className="min-h-[3rem] flex items-center justify-center w-full px-2">
        <h4 className="font-bold text-slate-800 text-base text-center line-clamp-2 break-words leading-tight">
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
          className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-brand-primary truncate max-w-full mb-5"
        >
          <Mail className="w-3.5 h-3.5 shrink-0" />
          <span className="truncate">{member.email}</span>
        </a>
      ) : (
        <div className="mb-5" />
      )}

      <div className="mt-auto w-full pt-4 border-t border-slate-100 flex flex-wrap items-center justify-center gap-2">
        {academicLinks.length > 0 ? (
          academicLinks.map(({ href, label, icon: Icon, className }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold hover:text-white rounded-xl transition-colors ${className}`}
            >
              {Icon && <Icon className="w-3 h-3" />}
              <span>{label}</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          ))
        ) : (
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
  const [{ canLeft, canRight }, setCanScroll] = useState({
    canLeft: false,
    canRight: false,
  });

  const sortedTeam = useMemo(() => {
    return [...team].sort((a, b) => {
      const getP = (rol = "") => {
        const r = rol.toLowerCase().trim();
        return (
          ROLE_PRIORITY[
            Object.keys(ROLE_PRIORITY).find((k) => r.includes(k))
          ] || 99
        );
      };
      return getP(a.rol) - getP(b.rol);
    });
  }, [team]);

  const showNav = sortedTeam.length > 1;
  const showDesktopNav = sortedTeam.length > 4;

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScroll({
      canLeft: el.scrollLeft > 10,
      canRight: el.scrollLeft + el.clientWidth < el.scrollWidth - 10,
    });
  }, []);

  useEffect(() => {
    updateScrollState();
    let rAF;
    const onScroll = () => {
      cancelAnimationFrame(rAF);
      rAF = requestAnimationFrame(updateScrollState);
    };

    const el = scrollRef.current;
    el?.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      cancelAnimationFrame(rAF);
      el?.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [updateScrollState, sortedTeam]);

  const scrollByAmount = (dir) => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth =
      window.innerWidth < 640
        ? el.clientWidth
        : (el.firstElementChild?.offsetWidth || 300) + 24;
    el.scrollBy({ left: dir * cardWidth, behavior: "smooth" });
  };

  if (!team.length) return null;

  const navBtnBase = `absolute top-1/2 -translate-y-1/2 z-20 w-9 h-9 items-center justify-center rounded-full bg-brand-primary text-white shadow-md active:scale-95 transition-opacity duration-200 ${
    showDesktopNav ? "flex" : "flex lg:hidden"
  }`;

  return (
    <SectionContainer
      label="Participantes"
      title="Equipo de investigación"
      centered
    >
      <div className="relative" data-aos="fade" data-aos-duration="600">
        {showNav && (
          <>
            {canLeft && (
              <button
                type="button"
                onClick={() => scrollByAmount(-1)}
                className={`${navBtnBase} -left-3 sm:-left-4 lg:-left-5`}
                aria-label="Anterior"
              >
                <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
              </button>
            )}
            {canRight && (
              <button
                type="button"
                onClick={() => scrollByAmount(1)}
                className={`${navBtnBase} -right-3 sm:-right-4 lg:-right-5`}
                aria-label="Siguiente"
              >
                <ChevronRight className="w-5 h-5 stroke-[2.5]" />
              </button>
            )}
          </>
        )}

        <div
          ref={scrollRef}
          className={`flex gap-6 lg:gap-8 overflow-x-auto snap-x snap-mandatory py-4 overscroll-x-contain transform-gpu [-webkit-overflow-scrolling:touch] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${
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
    </SectionContainer>
  );
}
