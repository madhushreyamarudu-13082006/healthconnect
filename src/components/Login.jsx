function Login({ onRegister, onLoginSuccess }) {

  function handleSubmit(e) {
    e.preventDefault()

    onLoginSuccess()
  }

  return (
    <section className="login-section">

      <div className="login-card">

        <div className="login-icon">🏥</div>

        <h2>Welcome Back</h2>

        <p className="login-subtitle">
          Login to your HealthConnect account
        </p>

        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label>Email Address</label>

            <input
              type="email"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>

            <input
              type="password"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className="login-submit"
          >
            Login
          </button>

        </form>

        <p className="register-text">
          Don't have an account?

          <a
            href="#register"
            onClick={(e) => {
              e.preventDefault()
              onRegister()
            }}
          >
            {" "}Register here
          </a>
        </p>

      </div>

    </section>
  )
}

export default Login