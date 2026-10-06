import { Link, useParams } from "react-router-dom";
import Seo from "../components/Seo";
import SafeImage from "../components/SafeImage";
import { projects } from "../data/projects";

// Small helpers so the same markup isn't repeated for every section
function Section({ title, children }) {
  return (
    <section className="card">
      <h2 className="text-xl font-semibold">{title}</h2>
      <div className="mt-3">{children}</div>
    </section>
  );
}

function BulletList({ items }) {
  return (
    <ul className="list-disc space-y-1 pl-5">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export default function ProjectDetails() {
  const { id } = useParams(); // reads :id from /projects/:id
  const project = projects.find((p) => p.id === id);

  // Invalid id -> friendly not-found state
  if (!project) {
    return (
      <>
        <Seo title="Project not found | Sanjeev Kumar Shah" description="This project does not exist." path={`/projects/${id}`} noindex />
        <div className="container-page py-20 text-center">
          <h1 className="text-4xl font-bold">Project not found</h1>
          <p className="mx-auto mt-3 max-w-md">There is no project with the address "{id}". It may have been renamed or removed.</p>
          <Link to="/projects" className="btn btn-primary mt-8">See all projects</Link>
        </div>
      </>
    );
  }

  const { title, image, overview, problem, solution, technologies, hardware, software, contribution, challenges, futureImprovements, github, demo } = project;

  return (
    <>
      <Seo title={`${title} | Projects | Sanjeev Kumar Shah`} description={overview || project.description} path={`/projects/${id}`} />
      <div className="container-page py-12 sm:py-16">
        <Link to="/projects" className="text-sm font-medium text-red-700 hover:underline dark:text-red-300">
          Back to projects
        </Link>
        <h1 className="mt-4 text-4xl font-bold sm:text-5xl">{title}</h1>

        <SafeImage
          src={image}
          alt={`Screenshot of the ${title} project`}
          width="1200"
          height="675"
          className="mt-8 aspect-video w-full rounded-2xl border border-gray-200 object-cover dark:border-white/10"
        />

        <div className="mt-8 flex flex-wrap gap-3">
          {github && (
            <a href={github} target="_blank" rel="noopener noreferrer" aria-label={`${title} on GitHub (opens in a new tab)`} className="btn btn-primary">GitHub</a>
          )}
          {demo && (
            <a href={demo} target="_blank" rel="noopener noreferrer" aria-label={`${title} live demo (opens in a new tab)`} className="btn btn-outline">Live Demo</a>
          )}
        </div>

        {/* `value && ...` only renders a section when that data exists */}
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {overview && <div className="md:col-span-2"><Section title="Overview"><p>{overview}</p></Section></div>}
          {problem && <Section title="Problem"><p>{problem}</p></Section>}
          {solution && <Section title="Solution"><p>{solution}</p></Section>}
          <Section title="Technologies">
            <ul className="flex flex-wrap gap-2">
              {technologies.map((tech) => (
                <li key={tech} className="tag">{tech}</li>
              ))}
            </ul>
          </Section>
          {hardware?.length > 0 && <Section title="Hardware"><BulletList items={hardware} /></Section>}
          {software?.length > 0 && <Section title="Software"><BulletList items={software} /></Section>}
          {contribution && <Section title="My contribution"><p>{contribution}</p></Section>}
          {challenges?.length > 0 && <Section title="Challenges"><BulletList items={challenges} /></Section>}
          {futureImprovements?.length > 0 && <Section title="Future improvements"><BulletList items={futureImprovements} /></Section>}
        </div>
      </div>
    </>
  );
}
