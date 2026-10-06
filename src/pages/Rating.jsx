import { useEffect, useState } from "react";
import Seo from "../components/Seo";
import SectionTitle from "../components/SectionTitle";
import RatingForm from "../components/RatingForm";

export default function Rating() {
  const [stats, setStats] = useState(null); // { average, total }
  const [loadState, setLoadState] = useState("loading"); // loading | ready | error

  // Load real numbers from the server when the page opens
  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/ratings", { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error("bad response");
        return res.json();
      })
      .then((data) => {
        setStats(data);
        setLoadState("ready");
      })
      .catch((err) => {
        if (err.name !== "AbortError") setLoadState("error");
      });
    return () => controller.abort(); // cleanup if the page closes first
  }, []);

  function handleSubmitted(newStats) {
    if (newStats) {
      setStats(newStats);
      setLoadState("ready");
    }
  }

  return (
    <>
      <Seo
        title="Rate My Portfolio | Sanjeev Kumar Shah"
        description="Rate the portfolio of Sanjeev Kumar Shah from 1 to 5 stars and leave optional feedback."
        path="/rating"
      />
      <div className="container-page py-12 sm:py-16">
        <SectionTitle as="h1" title="Rate my portfolio" subtitle="Your honest rating and feedback help me improve this site." />
        <div className="grid items-start gap-8 lg:grid-cols-2">
          <RatingForm onSubmitted={handleSubmitted} />

          <section className="card" aria-labelledby="ratings-title" aria-live="polite">
            <h2 id="ratings-title" className="text-xl font-semibold">What visitors say</h2>
            {loadState === "loading" && <p className="mt-3">Loading ratings...</p>}
            {loadState === "error" && <p className="mt-3">Ratings can't be loaded right now. Please try again later.</p>}
            {loadState === "ready" && stats.total === 0 && <p className="mt-3">No ratings yet. Be the first to rate.</p>}
            {loadState === "ready" && stats.total > 0 && (
              <div className="mt-3">
                <p className="font-display text-5xl font-bold text-gray-900 dark:text-white">
                  {stats.average.toFixed(1)} <span className="text-2xl font-medium">/ 5</span>
                </p>
                <p className="mt-1">
                  Based on {stats.total} rating{stats.total === 1 ? "" : "s"}
                </p>
              </div>
            )}
          </section>
        </div>
      </div>
    </>
  );
}
