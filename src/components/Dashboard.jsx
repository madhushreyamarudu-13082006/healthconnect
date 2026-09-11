import { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

function Dashboard({ onExploreCamps }) {
  const [registrationCount, setRegistrationCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/registrations")
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setRegistrationCount(data.registrations.length);
        }
      })
      .catch((error) => {
        console.error("Error fetching registrations:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  async function handleLogout() {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout error:", error);
    }
  }

  return (
    <section className="dashboard-section">
      <div className="dashboard-container">

        <div className="dashboard-header">
          <div>
            <p className="dashboard-tag">HEALTHCONNECT</p>

            <h1>Welcome to Your Dashboard 👋</h1>

            <p>
              Manage your health camp registrations and discover upcoming camps.
            </p>
          </div>

          <button
            className="dashboard-btn"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>

        <div className="dashboard-cards">

          <div className="dashboard-card">
            <div className="dashboard-card-icon">🏥</div>

            <h3>Available Camps</h3>

            <p className="dashboard-number">3</p>

            <span>Health camps available</span>
          </div>

          <div className="dashboard-card">
            <div className="dashboard-card-icon">📋</div>

            <h3>My Registrations</h3>

            <p className="dashboard-number">
              {loading ? "..." : registrationCount}
            </p>

            <span>Camp registrations</span>
          </div>

          <div className="dashboard-card">
            <div className="dashboard-card-icon">📅</div>

            <h3>Upcoming Camps</h3>

            <p className="dashboard-number">3</p>

            <span>Upcoming health camps</span>
          </div>

        </div>

        <div className="dashboard-main">

          <div className="dashboard-welcome">
            <h2>Find a Health Camp</h2>

            <p>
              Explore available health camps and register for the healthcare
              service that suits your needs.
            </p>

            <button
              className="dashboard-btn"
              onClick={onExploreCamps}
            >
              Explore Health Camps →
            </button>
          </div>

          <div className="dashboard-info">
            <h3>Quick Information</h3>

            <div className="info-item">
              <span>🩺</span>
              <p>General Health Checkup</p>
            </div>

            <div className="info-item">
              <span>🦷</span>
              <p>Dental Health Camp</p>
            </div>

            <div className="info-item">
              <span>❤️</span>
              <p>Heart Health Camp</p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

export default Dashboard;