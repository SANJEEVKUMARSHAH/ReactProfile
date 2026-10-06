import Seo from "../components/Seo";
import SectionTitle from "../components/SectionTitle";
import SkillCard from "../components/SkillCard";
import { levels, skillCategories } from "../data/skills";

export default function Skills() {
  return (
    <>
      <Seo
        title="Skills | Sanjeev Kumar Shah"
        description="Programming, web, database, tools and IoT skills of Sanjeev Kumar Shah, with an honest label for each level: Comfortable, Practicing, Learning or Exploring."
        path="/skills"
      />
      <div className="container-page py-12 sm:py-16">
        <SectionTitle
          as="h1"
          title="Skills"
          subtitle="What I use and what I'm still learning. Labels, not percentages, because that's more honest."
        />

        <dl className="card mb-10 grid gap-3 sm:grid-cols-2">
          {Object.entries(levels).map(([level, meaning]) => (
            <div key={level}>
              <dt className="font-semibold text-gray-900 dark:text-white">{level}</dt>
              <dd>{meaning}</dd>
            </div>
          ))}
        </dl>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((category) => (
            <SkillCard key={category.title} title={category.title} items={category.items} />
          ))}
        </div>
      </div>
    </>
  );
}
