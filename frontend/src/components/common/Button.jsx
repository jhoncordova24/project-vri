import { ArrowRight } from "lucide-react";

export default function Button({
  children,
  href = "#",
  icon: Icon = ArrowRight,
  className = "",
  ...props
}) {
  return (
    <a
      href={href}
      className={`inline-flex items-center gap-1.5 md:gap-2 py-2 px-5 md:py-3 md:px-7 font-semibold text-xs md:text-sm text-white bg-brand-primary hover:bg-brand-hover transition-colors rounded-full shadow-md focus:outline-none ${className}`}
      {...props}
    >
      {children}
      {Icon && <Icon className="w-3.5 h-3.5 md:w-4 md:h-4 shrink-0" />}
    </a>
  );
}
