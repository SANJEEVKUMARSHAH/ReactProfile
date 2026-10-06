import { levels } from "../data/skills";

const badgeStyles = {
  Comfortable: "bg-red-600 text-white",
  Practicing: "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-100",
  Learning: "border border-red-300 text-red-800 dark:border-red-500/50 dark:text-red-200",
  Exploring: "border border-dashed border-gray-400 text-gray-700 dark:border-white/30 dark:text-gray-300",
};

// Props: title (string), items (array of { name, level })
export default function SkillCard({ title, items }) {
  return (
    <section className="card" aria-labelledby={`skills-${title}`}>
      <h2 id={`skills-${title}`} className="text-xl font-semibold">
        {title}
      </h2>
      <ul className="mt-4 divide-y divide-gray-200 dark:divide-white/10">
        {items.map((skill) => (
          <li key={skill.name} className="flex items-center justify-between gap-3 py-2.5">
            <span className="text-gray-900 dark:text-gray-100">{skill.name}</span>
            <span
              title={levels[skill.level]}
              className={`rounded-full px-2.5 py-1 text-xs font-medium ${badgeStyles[skill.level]}`}
            >
              {skill.level}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
