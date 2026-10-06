import { NavLink } from "react-router-dom";

const mobileLinkClass = ({ isActive }) =>
  `block rounded-xl px-4 py-3 text-base font-medium transition-colors ${
    isActive
      ? "bg-red-500/10 text-red-700 dark:text-red-300"
      : "text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-white/5"
  }`;

// Props: isOpen (boolean), onClose (function), links (array)
export default function MobileMenu({ isOpen, onClose, links }) {
  if (!isOpen) return null; // conditional rendering: nothing when closed

  return (
    <nav
      id="mobile-menu"
      aria-label="Mobile"
      className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-gray-200 bg-gray-50/95 px-4 py-3 backdrop-blur-md lg:hidden dark:border-white/10 dark:bg-gray-900/95"
    >
      <ul className="flex flex-col gap-1">
        {links.map((link) => (
          <li key={link.to}>
            {/* onClick={onClose} closes the menu after navigating */}
            <NavLink to={link.to} end={link.end} onClick={onClose} className={mobileLinkClass}>
              {link.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
