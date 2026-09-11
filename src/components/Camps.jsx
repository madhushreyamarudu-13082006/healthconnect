import { useEffect, useState } from "react";
import CampRegistration from "./CampRegistration";

function Camps() {
  const [camps, setCamps] = useState([]);
  const [selectedCamp, setSelectedCamp] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/camps")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch camps.");
        }

        return response.json();
      })
      .then((data) => {
        setCamps(data.camps);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Unable to load health camps.");
        setLoading(false);
      });
  }, []);

  if (selectedCamp) {
    return (
      <CampRegistration
        camp={selectedCamp}
        onBack={() => setSelectedCamp(null)}
      />
    );
  }

  return (
    <section className="camps-section" id="camps">
      <div className="section-heading">
        <h2>Upcoming Health Camps</h2>
        <p>Find a health camp near you and register easily.</p>
      </div>

      {loading && (
        <p style={{ textAlign: "center" }}>
          Loading health camps...
        </p>
      )}

      {error && (
        <p
          style={{
            textAlign: "center",
            color: "red",
          }}
        >
          {error}
        </p>
      )}

      {!loading && !error && (
        <div className="camps-container">
          {camps.map((camp) => (
            <div className="camp-card" key={camp.id}>
              <div className="camp-icon">
                {camp.id === 1
                  ? "🩺"
                  : camp.id === 2
                  ? "🦷"
                  : "❤️"}
              </div>

              <h3>{camp.name}</h3>

              <p className="camp-info">
                📍 {camp.location}
              </p>

              <p className="camp-info">
                📅 {camp.date}
              </p>

              <p className="camp-info">
                👥 {camp.slots} Slots Available
              </p>

              <button
                className="register-btn"
                onClick={() => setSelectedCamp(camp)}
              >
                Register Now
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default Camps;