
import { useState } from "react";
import "./SiteVisit.css";

const initialForm = {
  name: "",
  phone: "",
  email: "",
  buyingTimeline: "",
  visitTimeline: "",
  consent: false,
};

function SiteVisit() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("");
  const [statusType, setStatusType] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateField = (event) => {
    const { name, value, type, checked } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));

    setStatus("");
    setStatusType("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);
    setStatus("Submitting your enquiry...");
    setStatusType("loading");

    try {
      const response = await fetch("/api/site-visit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Unable to submit your enquiry. Please try again."
        );
      }

      setStatus(
        result.message ||
          "Thank you! Your enquiry has been submitted successfully."
      );
      setStatusType("success");
      setForm({ ...initialForm });
    } catch (error) {
      setStatus(
        error.message ||
          "Unable to submit your enquiry. Please try again."
      );
      setStatusType("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="fv-site-visit" id="enquiry">
      <div className="fv-site-visit-bg" aria-hidden="true" />
      <div className="fv-site-visit-shade" aria-hidden="true" />

      <div className="fv-site-visit-container">
        {/* LEFT: ENQUIRY FORM */}
        <div className="fv-site-visit-card">
          <div className="fv-site-visit-heading">
            <span className="fv-site-visit-eyebrow">
              YOUR NEXT CHAPTER STARTS HERE
            </span>

            <h2>Book your site visit</h2>
          </div>

          <form
            className="fv-site-visit-form"
            onSubmit={handleSubmit}
          >
            <div className="fv-form-field">
              <label htmlFor="fv-visit-name">Your name</label>
              <input
                id="fv-visit-name"
                name="name"
                type="text"
                placeholder="Full name"
                autoComplete="name"
                value={form.name}
                onChange={updateField}
                required
                maxLength={100}
                disabled={isSubmitting}
              />
            </div>

            <div className="fv-form-two-columns">
              <div className="fv-form-field">
                <label htmlFor="fv-visit-phone">
                  Mobile number
                </label>
                <input
                  id="fv-visit-phone"
                  name="phone"
                  type="tel"
                  placeholder="+91"
                  autoComplete="tel"
                  inputMode="tel"
                  pattern="[+]?[0-9 ()-]{10,16}"
                  title="Enter a valid phone number."
                  value={form.phone}
                  onChange={updateField}
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div className="fv-form-field">
                <label htmlFor="fv-visit-email">
                  Email address
                </label>
                <input
                  id="fv-visit-email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  value={form.email}
                  onChange={updateField}
                  required
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <div className="fv-form-field">
              <label htmlFor="fv-buying-timeline">
                When are you planning to buy?
              </label>

              <select
                id="fv-buying-timeline"
                name="buyingTimeline"
                value={form.buyingTimeline}
                onChange={updateField}
                required
                disabled={isSubmitting}
              >
                <option value="" disabled>
                  Select your timeline
                </option>
                <option value="Immediately">Immediately</option>
                <option value="Within 1 month">Within 1 month</option>
                <option value="Within 3 months">Within 3 months</option>
                <option value="Within 6 months">Within 6 months</option>
                <option value="Just exploring">Just exploring</option>
              </select>
            </div>

            <div className="fv-form-field">
              <label htmlFor="fv-visit-timeline">
                When can you visit the site?
              </label>

              <select
                id="fv-visit-timeline"
                name="visitTimeline"
                value={form.visitTimeline}
                onChange={updateField}
                required
                disabled={isSubmitting}
              >
                <option value="" disabled>
                  Select your timeline
                </option>
                <option value="Today">Today</option>
                <option value="This weekend">This weekend</option>
                <option value="Within 7 days">Within 7 days</option>
                <option value="Within 2 weeks">Within 2 weeks</option>
                <option value="Contact me first">Contact me first</option>
              </select>
            </div>

            <label className="fv-visit-consent">
              <input
                type="checkbox"
                name="consent"
                checked={form.consent}
                onChange={updateField}
                required
                disabled={isSubmitting}
              />

              <span>
                I agree to be contacted by Felixa Vistas about my enquiry.
              </span>
            </label>

            <button
              className="fv-visit-submit"
              type="submit"
              disabled={isSubmitting}
            >
              <span>
                {isSubmitting ? "Submitting..." : "I'm Interested"}
              </span>

              <span
                className="fv-visit-submit-arrow"
                aria-hidden="true"
              >
                {isSubmitting ? "…" : "→"}
              </span>
            </button>

            {status && (
              <p
                className={`fv-visit-status is-${statusType}`}
                role="status"
                aria-live="polite"
              >
                {status}
              </p>
            )}

            <p className="fv-visit-privacy">
              Your information is confidential and will only be used to
              assist with your enquiry.
            </p>
          </form>
        </div>

        {/* RIGHT: GOOGLE MAP */}
        <div className="fv-site-visit-map">
          <iframe
            title="Find Felixa Vistas, Padappai, Chennai on Google Maps"
            src="https://maps.google.com/maps?q=12.9043152%2C80.0427169&z=16&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />

          <a
            className="fv-map-open-link"
            href="https://www.google.com/maps/place/FELIXA+VISTAS/@12.9043152,80.0427169,17z/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span aria-hidden="true">↗</span>
            Open in Google Maps
          </a>
        </div>
      </div>
    </section>
  );
}

export default SiteVisit;
