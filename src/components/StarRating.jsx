import { useState } from "react";

// A group of 5 radio buttons drawn as stars. Native radios give us
// keyboard support (arrow keys) and screen-reader labels for free.
// Props: value (0-5), onChange (function), disabled (boolean)
export default function StarRating({ value, onChange, disabled = false }) {
  const [hover, setHover] = useState(0);
  const shown = hover || value;

  return (
    <fieldset disabled={disabled}>
      <legend className="sr-only">Rate this website from 1 to 5 stars</legend>
      <div className="flex gap-1" onMouseLeave={() => setHover(0)}>
        {[1, 2, 3, 4, 5].map((n) => (
          <label key={n} className="cursor-pointer" onMouseEnter={() => setHover(n)}>
            <input
              type="radio"
              name="rating"
              value={n}
              checked={value === n}
              onChange={() => onChange(n)}
              className="peer sr-only"
            />
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              strokeLinejoin="round"
              className={`h-10 w-10 rounded-md transition-colors peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-red-500 ${
                n <= shown ? "fill-red-500 stroke-red-500" : "fill-transparent stroke-gray-400 dark:stroke-gray-500"
              }`}
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
            <span className="sr-only">
              {n} star{n > 1 ? "s" : ""}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
