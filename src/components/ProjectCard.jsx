import { Link } from "react-router-dom";
import SafeImage from "./SafeImage";

// Props: project (object from data/projects.js), as (heading level for this card)
export default function ProjectCard({ project, as: Heading = "h3" }) {
  const { id, title, description, image, technologies, github, demo } = project;

  return (
    <article className="card card-hover flex h-full flex-col overflow-hidden p-0">
      <SafeImage
        src={image}
        alt={`Screenshot of the ${title} project`}
        width="800"
        height="450"
        loading="lazy"
        className="aspect-video w-full object-cover"
      />
      <div className="flex flex-1 flex-col gap-4 p-6">
        <Heading className="text-xl font-semibold">{title}</Heading>
        <p>{description}</p>

        <ul className="flex flex-wrap gap-2" aria-label="Technologies used">
          {technologies.map((tech) => (
            <li key={tech} className="tag">
              {tech}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-wrap gap-2 pt-2">
          {/* Conditional rendering: a button only appears when the link exists */}
          {github && (
            <a href={github} target="_blank" rel="noopener noreferrer" aria-label={`${title} on GitHub (opens in a new tab)`} className="btn btn-outline">
              GitHub
            </a>
          )}
          {demo && (
            <a href={demo} target="_blank" rel="noopener noreferrer" aria-label={`${title} live demo (opens in a new tab)`} className="btn btn-outline">
              Live Demo
            </a>
          )}
          <Link to={`/projects/${id}`} aria-label={`View details of ${title}`} className="btn btn-primary">
            View Details
          </Link>
        </div>
      </div>
    </article>
  );
}
