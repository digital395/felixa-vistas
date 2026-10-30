import { useEffect, useRef, useState } from "react";
import "./WhyUs.css";

const highlights = [
  "DTCP & RERA-Approved Residential Villa Plots",
  "Prime Highway-Facing Location with High Growth Potential",
  "Strategic Connectivity to Vandalur, Padappai, Mudichur & Tambaram",
  "25+ Curated Lifestyle Amenities",
  "Secure, Gated Community with Ready-to-Construct Plots",
  "Seamless Connectivity to Key Hubs & Destinations",
  "Clear Titles & Legally Verified Documentation",
];

function WhyUs() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="why-us"
      className={`fv-why ${isVisible ? "is-visible" : ""}`}
    >
      <div className="fv-why-container">
        {/* LEFT: IMAGE */}
        <div className="fv-why-visual">
          <div className="fv-why-image-frame">
            <img
              src="/images/highlight.webp"
              alt="Felixa Vistas residential villa plots"
              className="fv-why-image"
              loading="lazy"
              decoding="async"
            />

            <div
              className="fv-why-image-overlay"
              aria-hidden="true"
            />
          </div>
        </div>

        {/* RIGHT: PROJECT HIGHLIGHTS */}
        <div className="fv-why-content">
          

          <h2 className="fv-why-title">
            Project Highlights
          </h2>

          <div className="fv-why-features">
            {highlights.map((highlight, index) => (
              <article
                className="fv-why-feature"
                key={highlight}
                style={{
                  "--feature-delay": `${index * 120}ms`,
                }}
              >
                <span
                  className="fv-why-check"
                  aria-hidden="true"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="11"
                      fill="currentColor"
                    />

                    <path
                      d="m7.5 12.2 3 3 6-6.2"
                      stroke="white"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>

                <div className="fv-why-feature-body">
                  <h3>{highlight}</h3>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default WhyUs;
