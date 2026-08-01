type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  variant?: "light" | "dark";
  className?: string;
};

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  variant = "light",
  className = "",
}: SectionHeadingProps) {
  const isCenter = align === "center";
  const isDark = variant === "dark";
  return (
    <div className={`${isCenter ? "mx-auto text-center" : "text-left"} max-w-2xl ${className}`}>
      {eyebrow && (
        <span
          className={`text-xs font-semibold uppercase tracking-[0.25em] ${
            isDark ? "text-gold-light" : "text-gold"
          }`}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={`mt-3 font-serif text-3xl leading-tight sm:text-4xl ${
          isDark ? "text-ivory" : "text-black"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-4 text-base leading-relaxed ${
            isDark ? "text-ivory/70" : "text-charcoal/70"
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
