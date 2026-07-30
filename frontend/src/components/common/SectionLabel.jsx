export default function SectionLabel({ children, className = "" }) {
  return (
    <p
      className={`text-sm font-bold tracking-widest text-brand-primary uppercase mb-3 ${className}`}
    >
      {children}
    </p>
  );
}
