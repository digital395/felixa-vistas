import { useEffect, useRef, useState } from "react";
import "./AboutProject.css";

function AboutProject() {
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
      {
        threshold: 0.15,
        rootMargin: "0px 0px -40px 0px",
      },
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className={`fv-about ${isVisible ? "is-visible" : ""}`}
    >
      <div className="fv-about-container">
        {/* LEFT: PROJECT INFORMATION */}
        <div className="fv-about-content">
          <span className="fv-about-eyebrow">ABOUT PROJECT</span>

          <h2 className="fv-about-title">
            YOUR DREAM PLOT. YOUR FUTURE. YOUR FELIXA VISTAS!
          </h2>

          <p className="fv-about-description">
            Discover FELIXA VISTAS, a thoughtfully planned plotted community
            spanning 7.30 acres in Padappai. Set along a highway-facing stretch,
            it offers the ideal blend of strategic location, green surroundings
            and a lifestyle designed around your aspirations.
          </p>
          <p className="fv-about-description">
            Situated at the heart of key growth corridors, FELIXA VISTAS
            connects you effortlessly to Vandalur, Padappai, Mudichur and
            Tambaram. With Vandalur Bus Stand just 10 minutes away, you stay
            well-connected to important destinations while enjoying a peaceful
            residential environment.
          </p>
          <p className="fv-about-description">
            Explore residential plots ranging from approximately 650 to 2,000
            sq.ft. within a secure gated community featuring 25+ lifestyle
            amenities. Whether you're planning to build your dream home or
            looking for a promising real estate investment, this is an
            opportunity to make a valuable move.
          </p>
          <p className="fv-about-description">
            Adding to the convenience, FELIXA VISTAS comes with APF approvals
            from SBI, HDFC, ICICI, AXIS, IDBI and LIC, with loan facilities
            available up to 80%.{" "}
          </p>
          <a href="#enquiry" className="fv-about-link">
            DISCOVER THE PROJECT
            <span aria-hidden="true">↗</span>
          </a>
        </div>

        {/* RIGHT: PROJECT IMAGE */}
        <div className="fv-about-visual">
          <div className="fv-about-image-frame">
            <img
              src="/images/aboutproject.webp"
              alt="Contemporary kitchen interior showcasing modern living at Felixa Vistas"
              className="fv-about-image"
              loading="lazy"
              decoding="async"
            />

            <div className="fv-about-image-shade" aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutProject;
