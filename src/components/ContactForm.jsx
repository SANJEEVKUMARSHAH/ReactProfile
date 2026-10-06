import { useState } from "react";
import { site } from "../data/site";

const emptyForm = { name: "", email: "", subject: "", message: "", website: "" };

// Client-side validation is for quick feedback only.
// The server (api/contact.js) validates again because the browser can't be trusted.
function validate(v) {
  const errors = {};
  if (v.name.trim().length < 2) errors.name = "Enter your name (at least 2 characters).";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email.trim())) errors.email = "Enter a valid email address, like name@example.com.";
  if (v.subject.trim().length < 3) errors.subject = "Enter a subject (at least 3 characters).";
  if (v.message.trim().length < 10) errors.message = "Write a message of at least 10 characters.";
  else if (v.message.length > 2000) errors.message = "Keep your message under 2000 characters.";
  return errors;
}

// The visible fields. We map over this array instead of repeating markup.
const fields = [
  { name: "name", label: "Name", type: "text", autoComplete: "name" },
  { name: "email", label: "Email", type: "email", autoComplete: "email" },
  { name: "subject", label: "Subject", type: "text", autoComplete: "off" },
  { name: "message", label: "Message", type: "textarea", autoComplete: "off" },
];

export default function ContactForm() {
  const [values, setValues] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [serverError, setServerError] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      // Move focus to the first invalid field
      const first = fields.find((f) => found[f.name]);
      document.getElementById(first.name)?.focus();
      return;
    }

    setStatus("sending");
    setServerError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "The message could not be sent.");
      setStatus("success");
      setValues(emptyForm);
    } catch (err) {
      setStatus("error");
      setServerError(
        err instanceof SyntaxError || err instanceof TypeError
          ? "Could not reach the server. Check your connection and try again."
          : err.message
      );
    }
  }

  const sending = status === "sending";

  return (
    <form onSubmit={handleSubmit} noValidate className="card space-y-5">
      {fields.map((field) => {
        const error = errors[field.name];
        const shared = {
          id: field.name,
          name: field.name,
          value: values[field.name],
          onChange: handleChange,
          disabled: sending,
          autoComplete: field.autoComplete,
          "aria-invalid": error ? "true" : "false",
          "aria-describedby": error ? `${field.name}-error` : undefined,
          className: "input",
        };
        return (
          <div key={field.name}>
            <label htmlFor={field.name} className="mb-1.5 block font-medium text-gray-900 dark:text-white">
              {field.label}
            </label>
            {field.type === "textarea" ? (
              <textarea rows={6} maxLength={2000} {...shared} />
            ) : (
              <input type={field.type} {...shared} />
            )}
            {error && (
              <p id={`${field.name}-error`} className="mt-1.5 text-sm font-medium text-red-700 dark:text-red-300">
                {error}
              </p>
            )}
          </div>
        );
      })}

      {/* Honeypot: hidden from people, but bots tend to fill it in */}
      <div className="hidden" aria-hidden="true">
        <label>
          Leave this empty
          <input type="text" name="website" tabIndex={-1} autoComplete="off" value={values.website} onChange={handleChange} />
        </label>
      </div>

      <button type="submit" disabled={sending} className="btn btn-primary">
        {sending ? "Sending..." : "Send Message"}
      </button>

      {/* aria-live regions announce results to screen readers */}
      <div aria-live="polite">
        {status === "success" && (
          <p role="status" className="rounded-xl bg-green-100 p-3 text-sm font-medium text-green-900 dark:bg-green-900/30 dark:text-green-200">
            Your message has been sent successfully.
          </p>
        )}
        {status === "error" && (
          <p role="alert" className="rounded-xl bg-red-100 p-3 text-sm font-medium text-red-900 dark:bg-red-900/40 dark:text-red-100">
            {serverError} You can also email me directly at{" "}
            <a href={`mailto:${site.email}`} className="underline">
              {site.email}
            </a>
            .
          </p>
        )}
      </div>
    </form>
  );
}
