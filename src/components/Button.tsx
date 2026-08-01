import Link from "next/link";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline";
  className?: string;
  target?: string;
  rel?: string;
};

const variants = {
  primary:
    "bg-black text-ivory hover:bg-charcoal border border-black hover:border-charcoal",
  secondary:
    "bg-gold text-black hover:bg-gold-light border border-gold hover:border-gold-light",
  outline:
    "bg-transparent text-black border border-black/70 hover:bg-black hover:text-ivory",
};

export default function Button({
  href,
  children,
  variant = "primary",
  className = "",
  target,
  rel,
}: ButtonProps) {
  return (
    <Link
      href={href}
      target={target}
      rel={rel}
      className={`inline-flex items-center justify-center gap-2 rounded-full px-7 py-3 text-sm font-medium uppercase tracking-wide transition-colors duration-200 ${variants[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}
