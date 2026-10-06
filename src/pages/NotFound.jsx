import { Link } from "react-router-dom";
import Seo from "../components/Seo";

export default function NotFound() {
  return (
    <>
      <Seo title="Page not found | Sanjeev Kumar Shah" description="The page you are looking for does not exist." path="/404" noindex />
      <div className="container-page py-24 text-center">
        <p className="font-display text-7xl font-bold text-red-600 dark:text-red-400">404</p>
        <h1 className="mt-4 text-3xl font-bold sm:text-4xl">Page not found</h1>
        <p className="mx-auto mt-3 max-w-md">The page you're looking for doesn't exist or has moved.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/" className="btn btn-primary">Go home</Link>
          <Link to="/projects" className="btn btn-outline">See my projects</Link>
        </div>
      </div>
    </>
  );
}
