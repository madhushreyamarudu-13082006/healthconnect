import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

function Register({ onLogin }) {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setError("");
    setSuccess(false);

    if (
      !formData.name ||
      !formData.username ||
      !formData.email ||
      !formData.mobile ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError("Please fill in all the fields.");
      return;
    }

    if (!/^[a-zA-Z0-9_]{4,20}$/.test(formData.username)) {
      setError(
        "Username must be 4-20 characters and contain only letters, numbers or _. "
      );
      return;
    }

    if (!/^[0-9]{10}$/.test(formData.mobile)) {
      setError("Mobile number must contain exactly 10 digits.");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      /*
       * Create the Firebase Authentication account.
       */
      await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      /*
       * Username and mobile storage will be connected
       * to Firestore in the next step.
       */

      setSuccess(true);

      setFormData({
        name: "",
        username: "",
        email: "",
        mobile: "",
        password: "",
        confirmPassword: "",
      });
    } catch (err) {
      console.error(err);

      if (err.code === "auth/email-already-in-use") {
        setError("This email is already registered.");
      } else if (err.code === "auth/invalid-email") {
        setError("Please enter a valid email address.");
      } else if (err.code === "auth/weak-password") {
        setError("Password is too weak. Use at least 6 characters.");
      } else {
        setError("Registration failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <section className="login-section">
        <div className="login-card">

          <div className="login-icon">✅</div>

          <h2>Account Created!</h2>

          <p className="login-subtitle">
            Your HealthConnect account has been created successfully.
          </p>

          <button
            className="login-submit"
            onClick={onLogin}
          >
            Go to Login
          </button>

        </div>
      </section>
    );
  }

  return (
    <section className="login-section">
      <div className="login-card">

        <div className="login-icon">🏥</div>

        <h2>Create Account</h2>

        <p className="login-subtitle">
          Create your HealthConnect account
        </p>

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
            <label>Username</label>

            <input
              type="text"
              name="username"
              placeholder="Choose a unique username"
              value={formData.username}
              onChange={handleChange}
            />

            <small>
              4-20 characters: letters, numbers or _
            </small>
          </div>

          <div className="form-group">
            <label>Email Address</label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Mobile Number</label>

            <input
              type="tel"
              name="mobile"
              placeholder="Enter your 10-digit mobile number"
              value={formData.mobile}
              onChange={handleChange}
              maxLength="10"
            />
          </div>

          <div className="form-group">
            <label>Password</label>

            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Confirm Password</label>

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
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
            className="login-submit"
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>

        </form>

        <p className="register-text">
          Already have an account?

          <a
            href="#login"
            onClick={(e) => {
              e.preventDefault();
              onLogin();
            }}
          >
            {" "}Login here
          </a>
        </p>

      </div>
    </section>
  );
}

export default Register;