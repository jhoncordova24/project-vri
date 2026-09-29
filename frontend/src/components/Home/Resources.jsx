import { memo } from "react";
import SectionContainer from "../common/SectionContainer";
import Button from "../common/Button";
import {
  BookOpen,
  Search,
  FileText,
  Atom,
  ShieldCheck,
  BookMarked,
  Globe2,
  ArrowUpRight,
} from "lucide-react";

const RESOURCES = [
  {
    title: "Repositorio UNP",
    description: "Tesis y publicaciones institucionales de acceso abierto",
    icon: BookOpen,
    link: "https://repositorio.unp.edu.pe/home",
    category: "Institucional",
  },
  {
    title: "Scopus",
    description: "Citas y literatura científica revisada por pares",
    icon: Search,
    link: "https://www.scopus.com/pages/home",
    category: "Base de datos",
  },
  {
    title: "ScienceDirect",
    description: "Artículos y libros científicos de Elsevier",
    icon: FileText,
    link: "https://sciencedirect.com/",
    category: "Base de datos",
  },
  {
    title: "IOPscience",
    description: "Revistas especializadas en física y ciencias exactas",
    icon: Atom,
    link: "https://iopscience.iop.org/",
    category: "Base de datos",
  },
  {
    title: "Turnitin",
    description: "Verificación de similitud y originalidad académica",
    icon: ShieldCheck,
    link: "https://latam.turnitin.com/",
    category: "Herramienta",
  },
  {
    title: "Revistas UNP",
    description:
      "Portal de revistas científicas y académicas de la institución",
    icon: BookMarked,
    link: "https://revistas.unp.edu.pe/index.php/index/es",
    category: "Institucional",
  },
  {
    title: "PeruCRIS",
    description:
      "Plataforma que visibiliza la producción científica de los investigadores de la universidad",
    icon: Globe2,
    link: "https://perucris.concytec.gob.pe/",
    category: "Nacional",
  },
];

const TOTAL_PLATFORMS = RESOURCES.length;
const TOTAL_CATEGORIES = new Set(RESOURCES.map((r) => r.category)).size;

const ResourceCard = memo(function ResourceCard({ item, isClone = false }) {
  const IconComponent = item.icon;

  return (
    <a
      href={item.link}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Abrir ${item.title}`}
      tabIndex={isClone ? -1 : 0}
      className="
        group relative isolate flex flex-col justify-between overflow-hidden
        w-[290px] sm:w-[350px] h-[210px] sm:h-[230px] shrink-0
        rounded-3xl p-5 sm:p-6
        bg-white border border-slate-200/90
        transition-all duration-500 ease-out transform-gpu
        hover:-translate-y-2 hover:border-brand-primary/40
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary
      "
    >
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute -right-10 -top-10 -z-10 h-48 w-48 rounded-full
          bg-[radial-gradient(circle,theme(colors.brand.icon-bg)_0%,transparent_70%)]
          transition-transform duration-500 ease-out opacity-80
          group-hover:scale-125
        "
      />

      <IconComponent
        aria-hidden="true"
        strokeWidth={0.9}
        className="
          pointer-events-none absolute -right-8 -bottom-10 -z-10
          h-56 w-56 sm:h-64 sm:w-64 text-brand-primary/[0.05] -rotate-12
          transition-all duration-700 ease-out
          group-hover:scale-115 group-hover:rotate-0 group-hover:text-brand-secondary/[0.14]
        "
      />

      <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-primary">
        {item.category}
      </span>

      <div className="flex items-end justify-between gap-4">
        <div className="min-w-0">
          <h3 className="text-lg sm:text-xl font-bold tracking-tight text-brand-dark group-hover:text-brand-primary transition-colors line-clamp-1">
            {item.title}
          </h3>
          <p className="mt-1.5 text-xs sm:text-[13px] leading-relaxed text-slate-600 line-clamp-2">
            {item.description}
          </p>
        </div>

        <span
          aria-hidden="true"
          className="
            flex h-10 w-10 shrink-0 items-center justify-center rounded-full
            border border-slate-200 bg-brand-icon-bg text-brand-primary
            transition-all duration-300
            group-hover:bg-brand-primary group-hover:text-white group-hover:border-brand-primary group-hover:scale-110
          "
        >
          <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </a>
  );
});

function MarqueeRow({ items }) {
  return (
    <div
      className="
        relative w-full overflow-hidden py-4
        [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]
        [-webkit-mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]
      "
    >
      <div className="animate-marquee flex transform-gpu will-change-transform motion-reduce:animate-none">
        <div className="flex shrink-0 gap-5 pr-5">
          {items.map((item) => (
            <ResourceCard key={item.title} item={item} />
          ))}
        </div>
        <div className="flex shrink-0 gap-5 pr-5" aria-hidden="true">
          {items.map((item) => (
            <ResourceCard key={`clone-${item.title}`} item={item} isClone />
          ))}
        </div>
      </div>
    </div>
  );
}

function ResourceStats() {
  return (
    <dl className="mx-auto mt-2 flex w-fit items-center justify-center gap-6 px-4 py-2">
      <div className="text-center">
        <dd className="font-mono text-xl font-black text-brand-dark sm:text-2xl">
          {TOTAL_PLATFORMS}
        </dd>
        <dt className="text-[11px] text-slate-500 sm:text-xs">Plataformas</dt>
      </div>

      <div className="h-8 w-px bg-slate-200" aria-hidden="true" />

      <div className="text-center">
        <dd className="font-mono text-xl font-black text-brand-dark sm:text-2xl">
          {TOTAL_CATEGORIES}
        </dd>
        <dt className="text-[11px] text-slate-500 sm:text-xs">Categorías</dt>
      </div>

      <div className="h-8 w-px bg-slate-200" aria-hidden="true" />

      <div className="text-center">
        <dd className="font-mono text-xl font-black text-brand-primary sm:text-2xl">
          ∞
        </dd>
        <dt className="text-[11px] text-slate-500 sm:text-xs">Acceso libre</dt>
      </div>
    </dl>
  );
}

export default function Resources() {
  return (
    <SectionContainer
      label="Recursos Digitales"
      title="Plataformas e información científica a tu alcance"
      centered
      className="bg-white overflow-hidden"
      dataAos="fade-up"
      headerBottom={<ResourceStats />}
    >
      <div className="relative left-1/2 right-1/2 -mx-[50vw] w-screen max-w-[100vw]">
        <MarqueeRow items={RESOURCES} />
      </div>

      <div className="mt-10 flex justify-center">
        <Button to="/servicios">Explorar todos los servicios</Button>
      </div>
    </SectionContainer>
  );
}
