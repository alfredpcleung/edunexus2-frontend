import { Link } from 'react-router-dom';
import './Home.css';

export default function Home() {
  const token = localStorage.getItem('authToken');

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-avatar">
            <img src="/photo.jpg" alt="Alfred Leung" className="avatar-image" />
          </div>
          <h1 className="hero-title">Hi, I'm Alfred Leung</h1>
          <p className="hero-subtitle">
            Full-Stack Developer • Software Engineer • Problem Solver
          </p>
          <p className="hero-description">
            I build clean, reliable web applications with React, Node.js, and SQL. 
            My mission is to create solutions that are both functional and elegant.
          </p>
          <div className="hero-cta">
            {token ? (
              <>
                <Link to="/contacts" className="btn btn-primary">
                  Manage Contacts
                </Link>
                <Link to="/projects" className="btn btn-secondary">
                  View Projects
                </Link>
              </>
            ) : (
              <>
                <Link to="/signup" className="btn btn-primary">
                  Get Started
                </Link>
                <Link to="/login" className="btn btn-secondary">
                  Sign In
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2 className="section-title">Core Competencies</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">💻</div>
              <h3>Web Development</h3>
              <p>
                Building responsive, accessible, and modern web applications 
                with React, JavaScript, and modern frontend tools.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🗄️</div>
              <h3>Backend Development</h3>
              <p>
                Creating robust server-side applications with Node.js, Express, 
                and secure authentication systems.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Database Design</h3>
              <p>
                Designing efficient relational schemas and writing optimized SQL 
                queries for real-world data problems.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🧪</div>
              <h3>Quality Assurance</h3>
              <p>
                Writing comprehensive tests and ensuring applications are 
                error-free, reliable, and performant.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section className="tools">
        <div className="container">
          <h2 className="section-title">Technologies</h2>
          <div className="tools-grid">
            <div className="tool-badge">React</div>
            <div className="tool-badge">JavaScript</div>
            <div className="tool-badge">Node.js</div>
            <div className="tool-badge">Express</div>
            <div className="tool-badge">MongoDB</div>
            <div className="tool-badge">SQL</div>
            <div className="tool-badge">REST APIs</div>
            <div className="tool-badge">Git</div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {!token && (
        <section className="cta-section">
          <div className="container">
            <h2>Ready to explore?</h2>
            <p>Sign up to manage your portfolio data</p>
            <Link to="/signup" className="btn btn-primary btn-lg">
              Create Account
            </Link>
          </div>
        </section>
      )}

      {/* Stats Section */}
      <section className="stats">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">50+</div>
              <div className="stat-label">Projects</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">100+</div>
              <div className="stat-label">Hours Coding</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">10+</div>
              <div className="stat-label">Technologies</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">∞</div>
              <div className="stat-label">Passion</div>
            </div>
          </div>
          <div className="stats-cta">
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg">
              View My Resume
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
