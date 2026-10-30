
import { useEffect, useRef, useState } from "react";
import "./Location.css";

function Location() {
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
      className={`fv-location-section ${
        isVisible ? "is-visible" : ""
      }`}
      id="location"
    >
      <div className="fv-location-container">
        {/* LEFT: LOCATION CONTENT */}
        <div className="fv-location-content">
          <span className="fv-location-eyebrow">
            LOCATION
          </span>

          <h2 className="fv-location-title">
            A PRIME ADDRESS, CLOSER
            <br className="fv-location-desktop-break" />
            TO EVERYTHING.
          </h2>

          <p className="fv-location-description">
            Located on the highway in Padappai, Chennai,
            Felixa Vistas offers convenient connectivity to
            Vandalur, Mudichur and Tambaram. Just a 10-minute
            drive from Vandalur Bus Stand, its strategic
            location brings everyday convenience closer while
            offering a peaceful, green environment to call home.
          </p>
        </div>

        {/* RIGHT: LOCATION IMAGE */}
        <div className="fv-location-visual">
          <div className="fv-location-image-frame">
            <img
              src="/images/location.jpg"
              alt="Aerial view of green land and surrounding landscapes near Felixa Vistas"
              className="fv-location-image"
              loading="lazy"
              decoding="async"
            />

            <div
              className="fv-location-image-overlay"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Location;
