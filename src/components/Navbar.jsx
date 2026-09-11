function Navbar({ onLogin, onHome }) {
  return (
    <nav className="navbar">

      <div className="logo">
        🏥 <span>HealthConnect</span>
      </div>

      <div className="nav-links">

        <a href="#home" onClick={onHome}>
          Home
        </a>

        <a href="#camps">
          Camps
        </a>

        <a href="#about">
          About
        </a>

        <button
          className="login-btn"
          onClick={onLogin}
        >
          Login
        </button>

      </div>

    </nav>
  )
}

export default Navbar