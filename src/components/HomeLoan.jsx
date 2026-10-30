
import { useEffect, useRef, useState } from "react";
import "./HomeLoan.css";

const banks = [
  {
    name: "Axis Bank",
    logo: "/images/bank/axis.svg",
    className: "axis",
  },
  {
    name: "ICICI Bank",
    logo: "/images/bank/icici.svg",
    className: "icici",
  },
  {
    name: "LIC",
    logo: "/images/bank/lic.svg",
    className: "lic",
  },
  {
    name: "IDBI Bank",
    logo: "/images/bank/idbi.svg",
    className: "idbi",
  },
  {
    name: "HDFC Bank",
    logo: "/images/bank/hdfc.svg",
    className: "hdfc",
  },
  {
    name: "SBI",
    logo: "/images/bank/sbi.svg",
    className: "sbi",
  },
];

function HomeLoan() {
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
      id="home-loan"
      className={`fv-home-loan ${isVisible ? "is-visible" : ""}`}
    >
      <div className="fv-home-loan-container">
        {/* SECTION HEADING */}
        <div className="fv-home-loan-copy">
          <span className="fv-home-loan-eyebrow">
            HOME LOAN FACILITIES
          </span>

          <h2 className="fv-home-loan-title">
            A SMARTER, SIMPLER PATH
            <br className="fv-loan-desktop-break" />
            TO HOMEOWNERSHIP.
          </h2>

          <p className="fv-home-loan-description">
            Felixa Vistas makes your home-buying journey more
            convenient with APF approval from leading banks,
            including SBI, HDFC, ICICI, Axis Bank, IDBI and LIC.
            With home loan facilities of up to 80%, you can take
            a confident step towards owning your dream plot.
          </p>
        </div>

        {/* BANK LOGOS */}
        <div
          className="fv-home-loan-banks"
          aria-label="Participating home loan banks"
        >
          {banks.map((bank, index) => (
            <div
              className={`fv-home-loan-bank ${bank.className}`}
              key={bank.name}
              style={{ "--bank-delay": `${index * 100}ms` }}
              title={bank.name}
            >
              <img
                src={bank.logo}
                alt={bank.name}
                loading="lazy"
                decoding="async"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HomeLoan;
