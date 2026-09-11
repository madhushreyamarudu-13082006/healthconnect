function Hero() {
  return (
    <section className="hero-section" id="home">
      <div className="hero-content">
        <p className="tagline">YOUR HEALTH, OUR PRIORITY</p>

        <h1>
          Find the Right <span>Health Camp</span> Near You
        </h1>

        <p className="hero-text">
          Discover and register for health camps easily. Connect with
          healthcare services and take a step towards a healthier life.
        </p>

        <a href="#camps" className="explore-btn">
          Explore Health Camps →
        </a>
      </div>

      <div className="hero-image">
        <div className="health-card">
          <div className="heart">❤️</div>
          <h2>Stay Healthy</h2>
          <p>Care • Support • Wellness</p>
        </div>
      </div>
    </section>
  )
}

export default Hero