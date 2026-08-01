import Image from "next/image";
import PlaceholderImage from "./PlaceholderImage";

type SmartImageProps = {
  src: string;
  alt: string;
  label: string;
  className?: string;
  rounded?: boolean;
  sizes?: string;
  priority?: boolean;
};

// Renders the real photo once `src` is set in the data file; otherwise falls
// back to a placeholder tile so the layout never shows a broken image.
export default function SmartImage({
  src,
  alt,
  label,
  className = "",
  rounded = false,
  sizes = "100vw",
  priority = false,
}: SmartImageProps) {
  if (!src) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <PlaceholderImage label={label} rounded={rounded} className="absolute inset-0" />
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${rounded ? "rounded-full" : ""} ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        loading={priority ? undefined : "lazy"}
        className="object-cover"
      />
    </div>
  );
}
