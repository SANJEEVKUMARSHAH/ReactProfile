import Seo from "../components/Seo";
import SectionTitle from "../components/SectionTitle";
import { site } from "../data/site";

const interests = ["Web Development", "React", "IoT", "Robotics", "AI/ML", "Software Development"];

export default function About() {
  return (
    <>
      <Seo
        title="About Sanjeev Kumar Shah | Computer Engineering"
        description="Sanjeev Kumar Shah is a Computer Engineering student at Kathmandu University who learns software development by building real projects."
        path="/about"
        pageType="AboutPage"
      />
      <div className="container-page py-12 sm:py-16">
        <SectionTitle as="h1" title="About me" subtitle="A Computer Engineering student who learns by building." />

        <div className="grid gap-6 md:grid-cols-2">
          <section className="card md:col-span-2" data-aos="fade-up">
            <h2 className="text-xl font-semibold">Who I am</h2>
            <p className="mt-3 max-w-prose">
              I'm Sanjeev Kumar Shah, a Computer Engineering student at {site.university}, Nepal. Most of what I know
              so far, I've picked up by building things rather than only reading about them. I started with C and C++,
              moved into object-oriented programming, and now I'm working through web development.
            </p>
            <p className="mt-3 max-w-prose">
              This portfolio is part of that process. I use it to document what I'm learning, the projects I'm building
              and how I'm growing as a developer during university.
            </p>
          </section>

          <section className="card" data-aos="fade-up">
            <h2 className="text-xl font-semibold">Education</h2>
            <p className="mt-3 font-medium text-gray-900 dark:text-white">B.E. Computer Engineering</p>
            <p>{site.university}</p>
            <p>Dhulikhel, Nepal</p>
            <p className="mt-1">Batch 2025–2029</p>
          </section>

          <section className="card" data-aos="fade-up">
            <h2 className="text-xl font-semibold">Technical interests</h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {interests.map((interest) => (
                <li key={interest} className="tag">{interest}</li>
              ))}
            </ul>
          </section>

          <section className="card">
            <h2 className="text-xl font-semibold">How I learn</h2>
            <p className="mt-3">
              I like taking an idea, breaking it down and working out how to build it, even when that means a lot of
              trial, error and debugging along the way.
            </p>
          </section>

          <section className="card">
            <h2 className="text-xl font-semibold">Where I'm heading</h2>
            <p className="mt-3">
              I'm interested in software development, web development, IoT and AI/ML. I'm using my university projects
              to find out which of these I enjoy building most.
            </p>
          </section>
        </div>

        <div className="mt-10">
          <a href="/resume.pdf" download className="btn btn-primary">Download Resume</a>
        </div>
      </div>
    </>
  );
}
