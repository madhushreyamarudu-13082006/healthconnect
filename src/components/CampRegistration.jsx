import { useState } from "react";

function CampRegistration({ camp, onBack }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    gender: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setError("");

    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.age ||
      !formData.gender
    ) {
      setError("Please fill in all the fields.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:5000/api/registrations",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            age: formData.age,
            gender: formData.gender,
            campId: camp.id,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed.");
      }

      setSubmitted(true);
    } catch (err) {
      setError(
        err.message || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <section className="registration-section">
        <div className="registration-card success-card">

          <div className="success-icon">✅</div>

          <h2>Registration Successful!</h2>

          <p>You have successfully registered for:</p>

          <h3>{camp.name}</h3>

          <p>📍 {camp.location}</p>

          <p>📅 {camp.date}</p>

          <button
            className="back-btn"
            onClick={onBack}
          >
            ← Back to Health Camps
          </button>

        </div>
      </section>
    );
  }

  return (
    <section className="registration-section">

      <div className="registration-card">

        <button
          className="back-link"
          onClick={onBack}
        >
          ← Back to Camps
        </button>

        <div className="registration-icon">📝</div>

        <h2>Health Camp Registration</h2>

        <p className="registration-subtitle">
          Register for {camp.name}
        </p>

        <div className="selected-camp">

          <h3>{camp.name}</h3>

          <p>📍 {camp.location}</p>

          <p>📅 {camp.date}</p>

          <p>👥 {camp.slots} Slots Available</p>

        </div>

        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label>Full Name</label>

            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Email</label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Phone Number</label>

            <input
              type="tel"
              name="phone"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Age</label>

            <input
              type="number"
              name="age"
              placeholder="Enter your age"
              value={formData.age}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Gender</label>

            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {error && (
            <p
              style={{
                color: "red",
                textAlign: "center",
                marginBottom: "15px",
              }}
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            className="registration-submit"
            disabled={loading}
          >
            {loading
              ? "Registering..."
              : "Confirm Registration"}
          </button>

        </form>

      </div>

    </section>
  );
}

export default CampRegistration;