import { Link } from 'react-router-dom';
import './Home.css';

export default function Home() {
  const token = localStorage.getItem('authToken');
  return (
    <div className="home">
            {/* Section 1: Welcome to EduNexus */}
            <section className="edunexus-hero" style={{background: 'linear-gradient(120deg, #6a85f1 0%, #b06ab3 100%)', color: '#fff', padding: '60px 0 40px 0', textAlign: 'center'}}>
              <h1 style={{fontSize: '3rem', fontWeight: 700, marginBottom: 16}}>Welcome to EduNexus</h1>
              <p style={{fontSize: '1.4rem', marginBottom: 40, fontWeight: 400}}>
                Make informed decisions about your education and collaborate with the right people
              </p>
              <div style={{display: 'flex', justifyContent: 'center', gap: 32, flexWrap: 'wrap'}}>
                <div style={{background: 'rgba(255,255,255,0.8)', borderRadius: 20, padding: 32, width: 260, boxShadow: '0 2px 16px rgba(0,0,0,0.04)', margin: 8}}>
                  <div style={{fontSize: 48, color: '#5b7cff', marginBottom: 12}}><span role="img" aria-label="shield">✔️</span></div>
                  <h3 style={{fontWeight: 600, fontSize: 20, marginBottom: 8, color: '#111'}}>Choose the Right Teammates</h3>
                  <p style={{color: '#222', fontSize: 16}}>See peer ratings and pick reliable collaborators.</p>
                </div>
                <div style={{background: 'rgba(255,255,255,0.8)', borderRadius: 20, padding: 32, width: 260, boxShadow: '0 2px 16px rgba(0,0,0,0.04)', margin: 8}}>
                  <div style={{fontSize: 48, color: '#ff4081', marginBottom: 12}}><span role="img" aria-label="star">⭐</span></div>
                  <h3 style={{fontWeight: 600, fontSize: 20, marginBottom: 8, color: '#111'}}>Discover the Best Electives</h3>
                  <p style={{color: '#222', fontSize: 16}}>Learn from feedback and maximize your GPA.</p>
                </div>
                <div style={{background: 'rgba(255,255,255,0.8)', borderRadius: 20, padding: 32, width: 260, boxShadow: '0 2px 16px rgba(0,0,0,0.04)', margin: 8}}>
                  <div style={{fontSize: 48, color: '#ffb300', marginBottom: 12}}><span role="img" aria-label="chart">📈</span></div>
                  <h3 style={{fontWeight: 600, fontSize: 20, marginBottom: 8, color: '#111'}}>Get Insights on Core Courses</h3>
                  <p style={{color: '#222', fontSize: 16}}>Know what to expect and how to succeed.</p>
                </div>
                <div style={{background: 'rgba(255,255,255,0.8)', borderRadius: 20, padding: 32, width: 260, boxShadow: '0 2px 16px rgba(0,0,0,0.04)', margin: 8}}>
                  <div style={{fontSize: 48, color: '#00c48c', marginBottom: 12}}><span role="img" aria-label="feedback">📝</span></div>
                  <h3 style={{fontWeight: 600, fontSize: 20, marginBottom: 8, color: '#111'}}>Benefit from Peer Feedback</h3>
                  <p style={{color: '#222', fontSize: 16}}>Make smarter academic choices with community reviews.</p>
                </div>
              </div>
            </section>

            {/* Section 2: Join Our Community */}
            <section style={{background: '#fafbfc', padding: '60px 0 40px 0', textAlign: 'center'}}>
              <h2 style={{fontSize: '2.5rem', fontWeight: 700, marginBottom: 12}}>Join Our Community</h2>
              <p style={{fontSize: '1.2rem', color: '#666', marginBottom: 40}}>
                Connect with students and peers from around the world
              </p>
              <div style={{display: 'flex', justifyContent: 'center', gap: 32, flexWrap: 'wrap'}}>
                <div style={{background: 'linear-gradient(120deg, #6a85f1 0%, #b06ab3 100%)', color: '#fff', borderRadius: 20, padding: 32, width: 260, margin: 8, boxShadow: '0 2px 16px rgba(0,0,0,0.04)'}}>
                  <div style={{fontSize: 48, marginBottom: 12}}><span role="img" aria-label="student">👤</span></div>
                  <h3 style={{fontWeight: 500, fontSize: 20, marginBottom: 8}}>Registered Students</h3>
                </div>
                <div style={{background: 'linear-gradient(120deg, #ff4081 0%, #ff7eb3 100%)', color: '#fff', borderRadius: 20, padding: 32, width: 260, margin: 8, boxShadow: '0 2px 16px rgba(0,0,0,0.04)'}}>
                  <div style={{fontSize: 48, marginBottom: 12}}><span role="img" aria-label="star">⭐</span></div>
                  <h3 style={{fontWeight: 500, fontSize: 20, marginBottom: 8}}>Courses with Reviews</h3>
                </div>
                <div style={{background: 'linear-gradient(120deg, #00c48c 0%, #2de1fc 100%)', color: '#fff', borderRadius: 20, padding: 32, width: 260, margin: 8, boxShadow: '0 2px 16px rgba(0,0,0,0.04)'}}>
                  <div style={{fontSize: 48, marginBottom: 12}}><span role="img" aria-label="active">🎓</span></div>
                  <h3 style={{fontWeight: 500, fontSize: 20, marginBottom: 8}}>Active Students</h3>
                </div>
                <div style={{background: 'linear-gradient(120deg, #ffb300 0%, #ffda77 100%)', color: '#fff', borderRadius: 20, padding: 32, width: 260, margin: 8, boxShadow: '0 2px 16px rgba(0,0,0,0.04)'}}>
                  <div style={{fontSize: 48, marginBottom: 12}}><span role="img" aria-label="briefcase">💼</span></div>
                  <h3 style={{fontWeight: 500, fontSize: 20, marginBottom: 8}}>Projects Recruiting</h3>
                </div>
              </div>
            </section>

            {/* Section 3: Ready to Explore */}
            <section style={{background: 'linear-gradient(120deg, #6a85f1 0%, #b06ab3 100%)', color: '#fff', padding: '60px 0 60px 0', textAlign: 'center'}}>
              <h2 style={{fontSize: '2.5rem', fontWeight: 700, marginBottom: 12}}>Ready to Explore?</h2>
              <p style={{fontSize: '1.2rem', marginBottom: 32}}>
                Join thousands of students making smarter choices about learning and collaboration
              </p>
              <div style={{display: 'flex', justifyContent: 'center', gap: 24, flexWrap: 'wrap'}}>
                <Link to="/signup" className="btn btn-primary btn-lg" style={{fontSize: 20, padding: '16px 32px', background: '#fff', color: '#5b7cff', border: 'none', borderRadius: 8, fontWeight: 700, margin: 8}}>
                  CREATE FREE ACCOUNT
                </Link>
                <Link to="/login" className="btn btn-secondary btn-lg" style={{fontSize: 20, padding: '16px 32px', background: 'transparent', color: '#fff', border: '2px solid #fff', borderRadius: 8, fontWeight: 700, margin: 8}}>
                  SIGN IN
                </Link>
              </div>
            </section>
    </div>
  );
}
