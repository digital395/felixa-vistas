
import { useState, useEffect } from "react";
import "./Header.css";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Amenities", href: "#amenities" },
  { label: "Location", href: "#location" },
  { label: "FAQs", href: "#faq" },
  { label: "Home Loans", href: "#home-loan" },
];

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("fv-menu-open", menuOpen);

    return () => document.body.classList.remove("fv-menu-open");
  }, [menuOpen]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") closeMenu();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <header
      className={`fv-header ${scrolled ? "is-scrolled" : ""} ${
        menuOpen ? "menu-open" : ""
      }`}
    >
      <div className="fv-header-inner">
        {/* Brand */}
        <a
          href="#home"
          className="fv-brand"
          aria-label="Felixa Vistas home"
          onClick={closeMenu}
        >
          <img
            src="/images/logo.png"
            alt="Felixa Vistas"
            className="fv-logo"
          />
        </a>

        {/* Mobile menu toggle */}
        <button
          className={`fv-menu-toggle ${menuOpen ? "is-active" : ""}`}
          type="button"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          aria-controls="fv-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>

        {/* Navigation */}
        <nav
          id="fv-navigation"
          className={`fv-navigation ${menuOpen ? "is-open" : ""}`}
          aria-label="Main navigation"
        >
          {navLinks.map((link, index) => (
            <a
              key={link.label}
              href={link.href}
              className="fv-nav-link"
              style={{ "--nav-index": index }}
              onClick={closeMenu}
            >
              {link.label}
            </a>
          ))}

          <a
            href="#enquiry"
            className="fv-nav-cta"
            onClick={closeMenu}
          >
            <span>Enquire Now</span>
            <span className="fv-cta-arrow" aria-hidden="true">
              ↗
            </span>
          </a>
        </nav>
      </div>
    </header>
  );
}

export default Header;
