export default function AmbientSection({
  children,
  className = "",
  containerClassName = "",
  ...props
}) {
  return (
    <section
      className={`relative w-full bg-slate-50/50 bg-[radial-gradient(100%_50%_at_50%_0%,rgba(219,234,254,0.5)_0%,transparent_100%)] ${className}`}
      {...props}
    >
      <div
        className={`relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${containerClassName}`}
      >
        {children}
      </div>
    </section>
  );
}
