import Seo from "../components/Seo";
import SectionTitle from "../components/SectionTitle";
import ContactForm from "../components/ContactForm";
import SocialLinks from "../components/SocialLinks";
import { site } from "../data/site";

export default function Contact() {
  return (
    <>
      <Seo
        title="Contact Sanjeev Kumar Shah"
        description="Get in touch with Sanjeev Kumar Shah about projects, learning or collaboration. Send a message through the form or reach out on GitHub and LinkedIn."
        path="/contact"
        pageType="ContactPage"
      />
      <div className="container-page py-12 sm:py-16">
        <SectionTitle
          as="h1"
          title="Let's connect"
          subtitle="I'm always interested in learning, building projects and meeting other students and developers."
        />
        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <ContactForm />
          <aside className="card h-fit">
            <h2 className="text-xl font-semibold">Other ways to reach me</h2>
            <p className="mt-3">
              Email:{" "}
              <a href={`mailto:${site.email}`} className="font-medium text-red-700 hover:underline dark:text-red-300">
                {site.email}
              </a>
            </p>
            <SocialLinks className="mt-5" />
          </aside>
        </div>
      </div>
    </>
  );
}
