
import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="fv-footer">
      <div className="fv-footer-glow" aria-hidden="true" />

      <div className="fv-footer-container">
        {/* Left: Location details */}
        <div className="fv-footer-location">
          <div className="fv-footer-info">
            <h3>Project location</h3>
            <p className="fv-footer-caption">Site Address: Karasangal, Padappai, Tamil Nadu - 601 301
</p>
          </div>

        
        </div>

        {/* Center: Brand */}
        <a
          href="/"
          className="fv-footer-brand"
          aria-label="Felixa Vistas home"
        >
          <span className="fv-footer-brand-top">
            FELI<span>X</span>A
          </span>
          <span className="fv-footer-brand-bottom">VISTAS</span>
        </a>

        {/* Right: Contact details */}
        <div className="fv-footer-contact">
          <div className="fv-footer-info">
            <h3>Phone and WhatsApp</h3>
            <a href="tel:+917200007879" className="fv-footer-contact-link">
              +91  72000 07879
            </a>
          </div>

          <div className="fv-footer-info fv-footer-email">
            <h3>Email</h3>
            <a
              href="mailto:contact@felixa.in"
              className="fv-footer-contact-link"
            >
              contact@felixa.in
            </a>
          </div>
        </div>
      </div>

      <div className="fv-footer-bottom">
        <p>
          Copyright {new Date().getFullYear()} <span>·</span> Design by BCB
        </p>
      </div>
    </footer>
  );
};

export default Footer;
