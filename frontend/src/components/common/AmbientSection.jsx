export default function AmbientSection({
  children,
  className = "",
  containerClassName = "",
  ...props
}) {
  return (
    <section
      className={`relative w-full overflow-hidden bg-white ${className}`}
      {...props}
    >
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100/80 via-blue-50/40 to-white pointer-events-none" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-primary/10 rounded-full blur-3xl pointer-events-none z-0" />
      <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-blue-300/20 rounded-full blur-3xl pointer-events-none z-0" />

      <div
        className={`relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${containerClassName}`}
      >
        {children}
      </div>
    </section>
  );
}
