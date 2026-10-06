// Props: title, description, current (boolean), isLast (boolean)
export default function TimelineItem({ title, description, current = false, isLast = false }) {
  return (
    <li className="relative pb-8 pl-10 last:pb-0" data-aos="fade-up">
      {!isLast && (
        <span aria-hidden="true" className="absolute left-[11px] top-7 h-full w-px bg-red-300 dark:bg-red-900" />
      )}
      <span
        aria-hidden="true"
        className={`absolute left-0 top-1.5 h-6 w-6 rounded-full border-2 ${
          current ? "border-red-500 bg-red-500" : "border-red-400 bg-gray-50 dark:bg-gray-900"
        }`}
      />
      <div className="card">
        <h3 className="flex flex-wrap items-center gap-2 text-lg font-semibold">
          {title}
          {current && <span className="tag">Now</span>}
        </h3>
        <p className="mt-1">{description}</p>
      </div>
    </li>
  );
}
