export default function SectionLabel({ children, className = "" }) {
  return (
    <p
      className={`text-xs md:text-sm font-bold tracking-widest text-brand-primary uppercase mb-2 md:mb-3 ${className}`}
    >
      {children}
    </p>
  );
}
