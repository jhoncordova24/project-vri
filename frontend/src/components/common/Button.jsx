import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function Button({
  children,
  to,
  href,
  icon: Icon = ArrowRight,
  iconPosition = "right",
  className = "",
  disabled = false,
  type = "button",
  ...props
}) {
  const baseClasses = `inline-flex items-center gap-1.5 md:gap-2 py-2 px-5 md:py-3 md:px-7 font-semibold text-xs md:text-sm text-white bg-brand-primary hover:bg-brand-hover disabled:opacity-50 disabled:cursor-not-allowed transition-colors rounded-full shadow-md focus:outline-none ${className}`;

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
