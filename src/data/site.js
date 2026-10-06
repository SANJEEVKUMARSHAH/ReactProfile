// Site-wide facts live here so every component reads them from one place.
export const site = {
  name: "Sanjeev Kumar Shah",
  url: "https://sanjeevkumarshah.com.np",
  email: "shahsanjeev700@gmail.com",
  github: "https://github.com/SANJEEVKUMARSHAH",
  linkedin: "https://www.linkedin.com/in/sanjeev-kumar-shah-749a11380",
  university: "Kathmandu University",
};

// Used by the Navbar, MobileMenu and Footer
export const navLinks = [
  { to: "/", label: "Home", end: true },
  { to: "/about", label: "About" },
  { to: "/skills", label: "Skills" },
  { to: "/projects", label: "Projects" },
  { to: "/journey", label: "Journey" },
  { to: "/contact", label: "Contact" },
  { to: "/rating", label: "Rate Me" },
];

export const footerLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/projects", label: "Projects" },
  { to: "/contact", label: "Contact" },
  { to: "/rating", label: "Rate Me" },
];
