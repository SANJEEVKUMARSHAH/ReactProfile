import Seo from "../components/Seo";
import SectionTitle from "../components/SectionTitle";
import TimelineItem from "../components/TimelineItem";
import { journey } from "../data/journey";

export default function Journey() {
  return (
    <>
      <Seo
        title="Learning Journey | Sanjeev Kumar Shah"
        description="The learning journey of Sanjeev Kumar Shah: from C and C++ to web development, IoT with ESP32, React and what he is learning now."
        path="/journey"
      />
      <div className="container-page py-12 sm:py-16">
        <SectionTitle as="h1" title="My learning journey" subtitle="A timeline of what I've been learning and building." />
        <ol className="max-w-2xl">
          {journey.map((step, index) => (
            <TimelineItem
              key={step.id}
              title={step.title}
              description={step.description}
              current={step.current}
              isLast={index === journey.length - 1}
            />
          ))}
        </ol>
      </div>
    </>
  );
}
