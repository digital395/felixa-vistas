
import "./Hero.css";

const statistics = [
  {
    number: "7.30",
    lines: ["ACRES"],
  },
  {
    number: "25+",
    lines: ["LIFESTYLE AMENITIES"],
  },
  {
    number: "BANG ON",
    lines: ["HIGHWAY ROAD"],
  },
  {
    number: "SECURED",
    lines: ["GATED COMMUNITY"],
  },
];

 

  
function Hero() {
  return (
    <section className="fv-hero" id="home">
      <div className="fv-hero-background" />

      <div className="fv-hero-overlay" />

      <div className="fv-hero-content">
        <div className="fv-hero-copy">
          <div className="fv-location">
            <svg
              viewBox="0 0 24 24"
              width="17"
              height="17"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"
                stroke="currentColor"
                strokeWidth="1.8"
              />
              <circle
                cx="12"
                cy="10"
                r="2.5"
                stroke="currentColor"
                strokeWidth="1.8"
              />
            </svg>

            <span>PADAPPAI, CHENNAI</span>
          </div>

          <h1 className="fv-hero-title">
            A NEW ADDRESS TO BUILD 
            <br />
         YOUR DREAMS!
            <br className="fv-desktop-break" />
           
          </h1>

          {/* <p className="fv-hero-description">
            Thoughtfully planned homes, modern living,
            and a community designed around you.
          </p> */}

          <a href="#enquiry" className="fv-hero-button">
            EXPLORE YOUR HOME
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>

      <div className="fv-stats-wrap">
        <div className="fv-stats">
          {statistics.map((item) => (
            <div className="fv-stat" key={item.number}>
              <div className="fv-stat-number">
                {item.number}
              </div>

              <div className="fv-stat-label">
                {item.lines.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Hero;
