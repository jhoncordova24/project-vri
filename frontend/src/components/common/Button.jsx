import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const VARIANTS = {
  primary: "bg-brand-primary hover:bg-brand-hover text-white shadow-md",
  secondary:
    "bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-sm",
  outline: "border border-white text-white hover:bg-white hover:text-slate-900",
};

export default function Button({
  children,
  to,
  href,
  variant = "primary",
  icon: Icon = ArrowRight,
  iconPosition = "right",
  className = "",
  disabled = false,
  type = "button",
  ...props
}) {
  const baseClasses = `inline-flex items-center justify-center gap-1.5 md:gap-2 py-2.5 px-5 md:py-3 md:px-6 font-semibold text-xs md:text-sm rounded-full transition-all duration-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed ${VARIANTS[variant] || VARIANTS.primary} ${className}`;

  const renderIcon = Icon ? (
    <Icon className="w-3.5 h-3.5 md:w-4 md:h-4 shrink-0" />
  ) : null;

  const content = (
    <>
      {iconPosition === "left" && renderIcon}
      {children}
      {iconPosition === "right" && renderIcon}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={baseClasses} {...props}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={baseClasses} {...props}>
        {content}
      </a>
    );
  }

  return (
    <button type={type} disabled={disabled} className={baseClasses} {...props}>
      {content}
    </button>
  );
}
