import SectionLabel from "./SectionLabel";
import SectionTitle from "./SectionTitle";

export default function SectionContainer({
  children,
  label,
  title,
  description,
  action,
  headerBottom,
  centered = false,
  className = "",
  maxWidth = "max-w-7xl",
  dataAos = "fade-up",
  isSinglePage = false,
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
                <div className="w-full md:w-auto shrink-0">{action}</div>
              )}
            </div>

            {headerBottom && <div className="mt-6">{headerBottom}</div>}
          </div>
        )}

        {children}
      </div>
    </section>
  );
}
