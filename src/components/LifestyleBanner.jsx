
import { useEffect, useRef, useState } from "react";
import "./LifestyleBanner.css";

function LifestyleBanner() {
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
      className={`fv-lifestyle-banner ${
        isVisible ? "is-visible" : ""
      }`}
      aria-label="Felixa Vistas lifestyle"
    >
      <div className="fv-lifestyle-background" />

      <div className="fv-lifestyle-overlay" />

      <div className="fv-lifestyle-inner">
        <div className="fv-lifestyle-arch">
          <span
            className="fv-lifestyle-quote-mark"
            aria-hidden="true"
          >
            &ldquo;
          </span>
        </div>

        <blockquote className="fv-lifestyle-quote">
          <p>
           Invest today, watch your wealth rise,<br/>
A brighter future awaits your wise choice.<br/>
Peaceful living, with growth that never says goodbye!

          </p>
        </blockquote>
      </div>
    </section>
  );
}

export default LifestyleBanner;
