export default function SectionTitle({ children, className = "", ...props }) {
  return (
    <h2
      className={`text-2xl sm:text-2xl md:text-3xl font-semibold text-slate-800 leading-relaxed tracking-tight ${className}`}
      {...props}
    >
      {children}
    </h2>
  );
}
