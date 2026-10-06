import { useState } from "react";

// Shows a placeholder if the image file is missing, so the layout never breaks.
export default function SafeImage({ src, alt, className = "", fallbackText = "Image coming soon", fallbackClassName = "text-sm font-medium", ...rest }) {
  const [failed, setFailed] = useState(false);

  if (failed || !src) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex items-center justify-center bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200 ${fallbackClassName} ${className}`}
      >
        {fallbackText}
      </div>
    );
  }
  return <img src={src} alt={alt} className={className} onError={() => setFailed(true)} {...rest} />;
}
