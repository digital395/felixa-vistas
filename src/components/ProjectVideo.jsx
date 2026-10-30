
import { useEffect, useState } from "react";
import "./ProjectVideo.css";

function ProjectVideo() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <section className="fv-video-section" aria-label="Project film">
        <div className="fv-video-container">
          <button
            type="button"
            className="fv-video-preview"
            onClick={() => setIsOpen(true)}
            aria-label="Play Felixa Vistas project film"
          >
            <img
              src="/images/project-video-cover.jpg"
              alt="Architectural view of a contemporary residential community"
              className="fv-video-cover"
              loading="lazy"
              decoding="async"
            />

            <span className="fv-video-shade" aria-hidden="true" />

            <span className="fv-video-play" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5.8c0-.65.7-1.05 1.27-.72l10.1 5.85a1.23 1.23 0 0 1 0 2.14l-10.1 5.85A.83.83 0 0 1 8 18.2V5.8Z" />
              </svg>
            </span>
          </button>
        </div>
      </section>

      {isOpen && (
        <div
          className="fv-video-modal"
          role="dialog"
          aria-modal="true"
          aria-label="Felixa Vistas project video"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setIsOpen(false);
            }
          }}
        >
          <button
            className="fv-video-close"
            type="button"
            onClick={() => setIsOpen(false)}
            aria-label="Close video"
          >
            &times;
          </button>

          <div className="fv-video-modal-content">
            <p className="fv-video-modal-eyebrow">
              FELIXA VISTAS
            </p>
            <h2>Discover a New Way of Living</h2>
            <p>
              Your project film will appear here once the
              YouTube video link is added.
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default ProjectVideo;
