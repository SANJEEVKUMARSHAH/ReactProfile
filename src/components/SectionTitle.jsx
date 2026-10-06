// `as` lets a page choose h1 or h2 so every page has exactly one h1.
export default function SectionTitle({ title, subtitle, as: Heading = "h2" }) {
  const size = Heading === "h1" ? "text-4xl sm:text-5xl" : "text-3xl";
  return (
    <div className="mb-10 max-w-2xl">
      <Heading className={`${size} font-bold`}>{title}</Heading>
      {subtitle && <p className="mt-3 text-lg text-gray-600 dark:text-gray-400">{subtitle}</p>}
    </div>
  );
}
