import Seo from "../components/Seo";
import SectionTitle from "../components/SectionTitle";
import ProjectCard from "../components/ProjectCard";
import { projects } from "../data/projects";

export default function Projects() {
  return (
    <>
      <Seo
        title="Projects | Sanjeev Kumar Shah"
        description="Projects by Sanjeev Kumar Shah, including an ESP32-based IoT smart farming system and a React weather app."
        path="/projects"
        pageType="CollectionPage"
      />
      <div className="container-page py-12 sm:py-16">
        <SectionTitle as="h1" title="Projects" subtitle="Things I've built while learning." />
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} as="h2" />
          ))}
        </div>
        <p className="mt-10">More projects will be added as I keep learning and building.</p>
      </div>
    </>
  );
}
