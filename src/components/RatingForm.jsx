import { useState } from "react";
import StarRating from "./StarRating";

const STORAGE_KEY = "portfolio-rated";

function alreadyRated() {
  try {
    return localStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

// Props: onSubmitted (function called with the new stats after a successful save)
export default function RatingForm({ onSubmitted }) {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [status, setStatus] = useState(alreadyRated() ? "done" : "idle"); // idle | sending | done
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (rating === 0) {
      setError("Choose a star rating from 1 to 5 before submitting.");
      return;
    }
    setError("");
    setStatus("sending");

    try {
      const res = await fetch("/api/ratings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rating, feedback }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Your rating could not be saved.");

      try {
        localStorage.setItem(STORAGE_KEY, "1");
      } catch {
        /* ignore */
      }
      setStatus("done");
      onSubmitted?.(data.stats);
    } catch (err) {
      setStatus("idle");
      setError(
        err instanceof SyntaxError || err instanceof TypeError
          ? "Could not reach the server. Check your connection and try again."
          : err.message
      );
    }
  }

  if (status === "done") {
    return (
      <div role="status" className="card text-center">
        <p className="font-display text-xl font-semibold text-gray-900 dark:text-white">Thank you for rating my portfolio.</p>
        <p className="mt-1">Your feedback helps me improve it.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="card space-y-5">
      <div>
        <p className="mb-2 font-medium text-gray-900 dark:text-white">How would you rate this website?</p>
        <StarRating value={rating} onChange={setRating} disabled={status === "sending"} />
      </div>

      <div>
        <label htmlFor="feedback" className="mb-1.5 block font-medium text-gray-900 dark:text-white">
          Feedback <span className="font-normal text-gray-500 dark:text-gray-400">(optional)</span>
        </label>
        <textarea
          id="feedback"
          rows={4}
          maxLength={500}
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          className="input"
          placeholder="What worked well? What could be better?"
        />
      </div>

      {error && (
        <p role="alert" className="text-sm font-medium text-red-700 dark:text-red-300">
          {error}
        </p>
      )}

      <button type="submit" disabled={status === "sending"} className="btn btn-primary">
        {status === "sending" ? "Submitting..." : "Submit Rating"}
      </button>
    </form>
  );
}
