import { Link } from "react-router-dom";
import Seo from "../components/Seo";
import SafeImage from "../components/SafeImage";
import SocialLinks from "../components/SocialLinks";
import SectionTitle from "../components/SectionTitle";
import ProjectCard from "../components/ProjectCard";
import { projects } from "../data/projects";

export default function Home() {
  // filter() keeps only the projects marked featured: true
  const featured = projects.filter((project) => project.featured);

  return (
    <>
      <Seo
        title="Sanjeev Kumar Shah | Computer Engineering Student & Developer"
        description="Portfolio of Sanjeev Kumar Shah, a Computer Engineering student at Kathmandu University learning web development, IoT and AI/ML by building projects."
        path="/"
      />

      <section className="relative overflow-hidden" aria-labelledby="hero-title">
        <div className="circuit" aria-hidden="true" />
        <div className="container-page relative grid items-center gap-12 py-14 sm:py-20 lg:grid-cols-[1.15fr_0.85fr]">
          <div data-aos="fade-up">
            <h1 id="hero-title" className="text-4xl font-bold sm:text-5xl lg:text-6xl">
              Hi, I'm Sanjeev <span role="img" aria-label="waving hand">👋</span>
            </h1>
            <p className="mt-4 font-display text-2xl font-medium text-red-700 dark:text-red-400">
              Computer Engineering Student and Developer
            </p>
            <p className="mt-1 text-lg">Kathmandu University •   Nepal</p>
            <p className="mt-6 max-w-xl text-lg">
            I 'm a Computer Engineering student at Kathmandu University, learning software development by building real projects and exploring web development, IoT and AI/ML along the way.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/projects" className="btn btn-primary">View My Projects</Link>
              <Link to="/contact" className="btn btn-outline">Contact Me</Link>
            </div>

            <SocialLinks className="mt-8" />
          </div>

          <div className="mx-auto w-full max-w-xs sm:max-w-sm" data-aos="fade-left">
            <div className="card p-3">
              <SafeImage
                src="/profile.jpg"
                alt="Portrait of Sanjeev Kumar Shah"
                width="480"
                height="480"
                fetchPriority="high"
                fallbackText="SKS"
                fallbackClassName="text-5xl font-bold"
                className="aspect-square w-full rounded-xl object-cover"
              />
            </div>
            <div className="card mt-4 p-4">
              <p className="font-display font-semibold text-gray-900 dark:text-white">Currently working on</p>
              <p className="mt-1 text-sm">
                Improving my JavaScript: asynchronous programming, APIs and backend development.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="container-page pt-8">
        <SectionTitle title="Featured project" subtitle="A closer look at something I've built." />
        <div className="max-w-3xl">
          {featured.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>
    </>
  );
}
