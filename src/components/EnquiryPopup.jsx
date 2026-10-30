import { useEffect, useState } from "react";
import "./EnquiryPopup.css";

const initialForm = {
  name: "",
  phone: "",
  email: "",
  buyingTimeline: "",
  visitTimeline: "",
  consent: false,
};

// Use this function on any Enquire Now button.
export const openEnquiryPopup = () => {
  window.dispatchEvent(new Event("felixa:open-enquiry"));
};

export default function EnquiryPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("");
  const [statusType, setStatusType] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const open = () => {
      setStatus("");
      setStatusType("");
      setIsOpen(true);
    };
    const closeOnEscape = (event) => {
      if (event.key === "Escape" && !isSubmitting) setIsOpen(false);
    };

    window.addEventListener("felixa:open-enquiry", open);
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      window.removeEventListener("felixa:open-enquiry", open);
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [isSubmitting]);

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  const updateField = (event) => {
    const { name, value, type, checked } = event.target;
    setForm((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));
    setStatus("");
    setStatusType("");
  };

  const closePopup = () => {
    if (!isSubmitting) setIsOpen(false);
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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const responseText = await response.text();
      let result = {};
      try {
        result = responseText ? JSON.parse(responseText) : {};
      } catch {
        throw new Error(`Invalid server response (HTTP ${response.status}).`);
      }

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Unable to submit your enquiry.");
      }

      setStatus(result.message || "Thank you! Your enquiry has been received.");
      setStatusType("success");
      setForm({ ...initialForm });
    } catch (error) {
      setStatus(error.message || "Something went wrong. Please try again.");
      setStatusType("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fv-enquiry-overlay"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) closePopup();
      }}
    >
      <section
        className="fv-enquiry-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="fv-enquiry-title"
      >
        <button
          className="fv-enquiry-close"
          type="button"
          onClick={closePopup}
          disabled={isSubmitting}
          aria-label="Close enquiry form"
        >
          ×
        </button>

        <div className="fv-enquiry-header">
          <span className="fv-enquiry-eyebrow">FELIXA VISTAS</span>
          <h2 id="fv-enquiry-title">Enquire Now</h2>
          <p>Share your details and our team will get in touch with you.</p>
        </div>

        <form className="fv-enquiry-form" onSubmit={handleSubmit}>
          <div className="fv-enquiry-field">
            <label htmlFor="popup-name">Your name</label>
            <input
              id="popup-name"
              name="name"
              type="text"
              placeholder="Full name"
              autoComplete="name"
              value={form.name}
              onChange={updateField}
              maxLength={100}
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="fv-enquiry-two-columns">
            <div className="fv-enquiry-field">
              <label htmlFor="popup-phone">Mobile number</label>
              <input
                id="popup-phone"
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

            <div className="fv-enquiry-field">
              <label htmlFor="popup-email">Email address</label>
              <input
                id="popup-email"
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

          <div className="fv-enquiry-field">
            <label htmlFor="popup-buying">When are you planning to buy?</label>
            <select
              id="popup-buying"
              name="buyingTimeline"
              value={form.buyingTimeline}
              onChange={updateField}
              required
              disabled={isSubmitting}
            >
              <option value="" disabled>Select your timeline</option>
              <option value="Immediately">Immediately</option>
              <option value="Within 1 month">Within 1 month</option>
              <option value="Within 3 months">Within 3 months</option>
              <option value="Within 6 months">Within 6 months</option>
              <option value="Just exploring">Just exploring</option>
            </select>
          </div>

          <div className="fv-enquiry-field">
            <label htmlFor="popup-visit">When can you visit the site?</label>
            <select
              id="popup-visit"
              name="visitTimeline"
              value={form.visitTimeline}
              onChange={updateField}
              required
              disabled={isSubmitting}
            >
              <option value="" disabled>Select your timeline</option>
              <option value="Today">Today</option>
              <option value="This weekend">This weekend</option>
              <option value="Within 7 days">Within 7 days</option>
              <option value="Within 2 weeks">Within 2 weeks</option>
              <option value="Contact me first">Contact me first</option>
            </select>
          </div>

          <label className="fv-enquiry-consent">
            <input
              type="checkbox"
              name="consent"
              checked={form.consent}
              onChange={updateField}
              required
              disabled={isSubmitting}
            />
            <span>I agree to be contacted by Felixa Vistas about my enquiry.</span>
          </label>

          <button className="fv-enquiry-submit" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Enquiry"}
            <span aria-hidden="true">{isSubmitting ? "…" : "→"}</span>
          </button>

          {status && (
            <p className={`fv-enquiry-status is-${statusType}`} role="status" aria-live="polite">
              {status}
            </p>
          )}

          <p className="fv-enquiry-privacy">
            Your information is confidential and will only be used to assist with your enquiry.
          </p>
        </form>
      </section>
    </div>
  );
}
