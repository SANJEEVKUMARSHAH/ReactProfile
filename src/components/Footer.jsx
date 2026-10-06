import { Link } from "react-router-dom";
import SocialLinks from "./SocialLinks";
import { footerLinks, site } from "../data/site";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-gray-200 bg-red-50 dark:border-white/10 dark:bg-[#2e0d10]/60">
      <div className="container-page grid gap-8 py-10 md:grid-cols-[1.5fr_1fr_auto] md:items-start">
        <div>
          <p className="font-display text-lg font-semibold text-gray-900 dark:text-white">{site.name}</p>
          <p className="mt-1">Computer Engineering Student</p>
          <p>{site.university}</p>
        </div>

        <nav aria-label="Footer">
          <ul className="grid grid-cols-2 gap-x-6 gap-y-2">
            {footerLinks.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="hover:text-red-700 dark:hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <SocialLinks />
      </div>
      <p className="border-t border-gray-200 py-4 text-center text-sm dark:border-white/10">
        &copy; {new Date().getFullYear()} {site.name}
      </p>
    </footer>
  );
}
