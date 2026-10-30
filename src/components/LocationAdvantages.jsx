import { useState } from "react";
import "./LocationAdvantages.css";

const categories = [
  {
    id: "schools",
    label: "SCHOOLS",
    places: [
      {
        name: "Alwin International Public School",
        distance: "2.5 km",
        type: "SCHOOL",
      },
      {
        name: "Velammal Vidhyashram, Padappai",
        distance: "3 km",
        type: "SCHOOL",
      },
      {
        name: "Shree Niketan Patasala, Varadharajapuram",
        distance: "4 km",
        type: "SCHOOL",
      },
      { name: "PERI CBSE School", distance: "5 km", type: "SCHOOL" },
    ],
  },
  {
    id: "colleges",
    label: "COLLEGES",
    places: [
      {
        name: "Dhaanish Ahmed College of Engineering",
        distance: "5 km",
        type: "COLLEGE",
      },
      {
        name: "RRASE College of Engineering",
        distance: "3 km",
        type: "COLLEGE",
      },
      {
        name: "SRM University, Kattankulathur",
        distance: "10 km",
        type: "COLLEGE",
      },
    ],
  },
  {
    id: "hospitals",
    label: "HOSPITALS",
    places: [
      {
        name: "Govt Primary Health Centre, Padappai",
        distance: "2 km",
        type: "HOSPITAL",
      },
      {
        name: "A G Hospital - Rural Health Clinic",
        distance: "3 km",
        type: "HOSPITAL",
      },
      {
        name: "Doctors Plaza Clinic & Lab, Padappai",
        distance: "3 km",
        type: "HOSPITAL",
      },
      { name: "Saradha Hospitals", distance: "4 km", type: "HOSPITAL" },
      {
        name: "Sayee Speciality Hospital – Padappai",
        distance: "5 km",
        type: "HOSPITAL",
      },
      { name: "Deepam Health Care Centre", distance: "2 km", type: "HOSPITAL" },
    ],
  },
];

function LocationAdvantages() {
  const [activeCategory, setActiveCategory] = useState("schools");

  const selectedCategory = categories.find(
    (category) => category.id === activeCategory,
  );

  return (
    <section
      className="fv-advantages"
      id="location-advantages"
      aria-labelledby="fv-advantages-title"
    >
      <div className="fv-advantages-container">
        <div className="fv-advantages-heading">
          <span className="fv-advantages-eyebrow">LOCATION ADVANTAGES</span>

          <h2 id="fv-advantages-title">
            WELL CONNECTED.
            <br />
            PEACEFULLY POSITIONED.
          </h2>

          <p>
            Discover Felixa Vistas in Padappai, Chennai, where highway
            connectivity brings key destinations closer. With convenient access
            to Vandalur, Mudichur and Tambaram, enjoy a location that balances
            everyday accessibility with the calm of green surroundings.
          </p>
        </div>

        <div
          className="fv-advantages-tabs"
          role="group"
          aria-label="Location advantage categories"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              className={`fv-advantages-tab ${
                activeCategory === category.id ? "active" : ""
              }`}
              aria-pressed={activeCategory === category.id}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.label}
            </button>
          ))}
        </div>

        <div className="fv-advantages-timeline-viewport">
<div
  key={selectedCategory.id}
  className="fv-advantages-timeline"
  style={{
    "--item-count": selectedCategory.places.length,
  }}
>      
      <div className="fv-advantages-line" aria-hidden="true" />

            {selectedCategory.places.map((place, index) => (
              <article
                className="fv-advantages-place"
                key={`${selectedCategory.id}-${index}`}
                style={{ "--item-index": index }}
              >
                <div className="fv-advantages-distance">
                  {place.distance || "DISTANCE TBA"}
                </div>

                <div className="fv-advantages-dot" />

                <div className="fv-advantages-place-content">
                  <h3>{place.name}</h3>
                  <span>{place.type}</span>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* <p className="fv-advantages-note">
          Nearby destination names and distances will be updated after
          verification.
        </p> */}
      </div>
    </section>
  );
}

export default LocationAdvantages;
