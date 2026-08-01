type PlaceholderImageProps = {
  label: string;
  className?: string;
  rounded?: boolean;
};

// A clearly-marked stand-in used anywhere a real photo hasn't been added yet.
// Swap it out automatically by filling in an `image` path in /src/data.
export default function PlaceholderImage({
  label,
  className = "",
  rounded = false,
}: PlaceholderImageProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-blush via-ivory-dark to-gold-light/50 text-center ${
        rounded ? "rounded-full" : ""
      } ${className}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.4}
        className="h-7 w-7 text-gold opacity-70"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 9a2 2 0 0 1 2-2h1.17a2 2 0 0 0 1.664-.89l.522-.78A2 2 0 0 1 10.017 4.5h3.966a2 2 0 0 1 1.664.89l.522.78A2 2 0 0 0 17.833 7H19a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z"
        />
        <circle cx="12" cy="13" r="3.25" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="max-w-[80%] px-2 text-[11px] font-medium uppercase tracking-wide text-charcoal/60">
        {label}
      </span>
    </div>
  );
}
