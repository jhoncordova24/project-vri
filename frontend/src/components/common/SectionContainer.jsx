import SectionLabel from "./SectionLabel";
import SectionTitle from "./SectionTitle";

export default function SectionContainer({
  children,
  label,
  title,
  description,
  action, // Badge, contador, botón de búsqueda o filtros
  headerBottom, // Para elementos que van debajo del título (como tabs de categorías)
  centered = false,
  className = "",
  maxWidth = "max-w-7xl",
  dataAos = "fade-up",
  isSinglePage = false, // Ponlo en true en páginas de vista única (ej: News)
  id,
}) {
  const hasHeader = Boolean(label || title);

  return (
    <section
      id={id}
      className={`py-12 sm:py-16 w-full ${isSinglePage ? "min-h-screen" : ""} ${className}`}
      data-aos={dataAos || undefined}
    >
      <div className={`${maxWidth} mx-auto px-4 sm:px-6 lg:px-8`}>
        {hasHeader && (
          <div className="mb-8 sm:mb-10">
            <div
              className={`flex flex-col ${
                centered
                  ? "items-center text-center"
                  : "md:flex-row md:items-end justify-between gap-4"
              }`}
            >
              <div>
                {label && <SectionLabel>{label}</SectionLabel>}
                {title && <SectionTitle>{title}</SectionTitle>}
                {description && (
                  <p className="text-sm text-slate-500 mt-1 max-w-2xl">
                    {description}
                  </p>
                )}
              </div>

              {action && (
                <div className="shrink-0 self-start md:self-auto">{action}</div>
              )}
            </div>

            {/* Ranura opcional para barras de filtros/categorías */}
            {headerBottom && <div className="mt-6">{headerBottom}</div>}
          </div>
        )}

        {children}
      </div>
    </section>
  );
}
