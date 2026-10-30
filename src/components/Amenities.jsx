
import { useRef, useState, useEffect } from "react";
import "./Amenities.css";

const amenities = [
  {
    title: "",
    image: "/images/amenities/landscapedgardens.webp",
    alt: "Green landscaped gardens with walking paths",
  },
  {
    title: "",
    image: "/images/amenities/childrenplayarea.webp",
    alt: "Outdoor children's playground",
  },
  {
    title: "",
    image: "/images/amenities/sportscourt.webp",
    alt: "Outdoor sports and basketball court",
  },
  {
    title: "",
    image: "/images/amenities/securegatedcommunity.webp",
    alt: "securegatedcommunity",
  },
  {
    title: "",
    image: "/images/amenities/streetlights.webp",
    alt: "Modern residential clubhouse",
  },
  {
    title: "",
    image: "/images/amenities/eblineprovision.webp",
    alt: "Tree-lined walking paths",
  },
];

function Amenities() {
  const trackRef = useRef(null);
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoForward, setCanGoForward] = useState(true);

  const updateControls = () => {
    const track = trackRef.current;
    if (!track) return;

    const maxScroll = track.scrollWidth - track.clientWidth;

    setCanGoBack(track.scrollLeft > 2);
    setCanGoForward(track.scrollLeft < maxScroll - 2);
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    updateControls();

    track.addEventListener("scroll", updateControls, {
      passive: true,
    });

    const resizeObserver = new ResizeObserver(updateControls);
    resizeObserver.observe(track);

    return () => {
      track.removeEventListener("scroll", updateControls);
      resizeObserver.disconnect();
    };
  }, []);

  const moveCarousel = (direction) => {
    const track = trackRef.current;
    if (!track) return;

    const firstCard = track.querySelector(".fv-amenity-card");
    const cardWidth = firstCard?.getBoundingClientRect().width ?? 260;
    const gap = parseFloat(getComputedStyle(track).columnGap) || 14;

    track.scrollBy({
      left: direction * (cardWidth + gap),
      behavior: "smooth",
    });
  };

  return (
    <section className="fv-amenities" id="amenities">
      <div className="fv-amenities-layout">
        <div className="fv-amenities-intro">
          <span className="fv-amenities-eyebrow">
            AMENITIES
          </span>

          <h2 className="fv-amenities-title">
            Designed for Better
            <br />
            Living.
          </h2>

         

          <div className="fv-amenities-controls">
            <button
              type="button"
              onClick={() => moveCarousel(-1)}
              disabled={!canGoBack}
              aria-label="Previous amenities"
            >
              <span aria-hidden="true">←</span>
            </button>

            <button
              type="button"
              onClick={() => moveCarousel(1)}
              disabled={!canGoForward}
              aria-label="Next amenities"
            >
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>

        <div
          className="fv-amenities-track"
          ref={trackRef}
          role="region"
          aria-label="Explore residential amenities"
          tabIndex={0}
        >
          {amenities.map((amenity, index) => (
            <article
              className="fv-amenity-card"
              key={amenity.title}
            >
              <img
                className="fv-amenity-image"
                src={amenity.image}
                alt={amenity.alt}
                loading={index < 3 ? "eager" : "lazy"}
                decoding="async"
              />

              <div
                className="fv-amenity-overlay"
                aria-hidden="true"
              />

              <div className="fv-amenity-content">
                <span className="fv-amenity-number">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <h3>{amenity.title}</h3>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="fv-amenities-mobile-hint">
        Swipe to explore amenities <span aria-hidden="true">→</span>
      </div>
    </section>
  );
}

export default Amenities;
