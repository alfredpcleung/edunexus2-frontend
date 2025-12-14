import { Link } from 'react-router-dom';

export default function Dashboard() {
  // In a real app, fetch and aggregate user data here
  return (
    <div className="dashboard-page container" style={{textAlign: 'center'}}>
      <div style={{display: 'flex', gap: 40, flexWrap: 'wrap', justifyContent: 'center', marginTop: 40}}>
        <Link to="/services" style={{
          background: 'linear-gradient(135deg, #6a85f1 0%, #b06ab3 100%)',
          borderRadius: 32,
          padding: 40,
          width: 300,
          minHeight: 200,
          boxShadow: '0 8px 32px rgba(90,120,255,0.10)',
          margin: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textDecoration: 'none',
          color: '#fff',
          transition: 'box-shadow 0.2s',
          fontWeight: 600
        }}>
          <div style={{fontSize: 56, marginBottom: 24}}><span role="img" aria-label="courses">📚</span></div>
          <div style={{fontSize: 26, fontWeight: 700, marginBottom: 12}}>My Courses</div>
          <div style={{fontSize: 18, color: 'rgba(255,255,255,0.92)'}}>View and review your courses</div>
        </Link>
        <Link to="/projects" style={{
          background: 'linear-gradient(135deg, #ff4081 0%, #ff7eb3 100%)',
          borderRadius: 32,
          padding: 40,
          width: 300,
          minHeight: 200,
          boxShadow: '0 8px 32px rgba(255,64,129,0.10)',
          margin: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textDecoration: 'none',
          color: '#fff',
          transition: 'box-shadow 0.2s',
          fontWeight: 600
        }}>
          <div style={{fontSize: 56, marginBottom: 24}}><span role="img" aria-label="projects">💡</span></div>
          <div style={{fontSize: 26, fontWeight: 700, marginBottom: 12}}>My Projects</div>
          <div style={{fontSize: 18, color: 'rgba(255,255,255,0.92)'}}>Showcase your student projects</div>
        </Link>
        <Link to="/contacts" style={{
          background: 'linear-gradient(135deg, #00c48c 0%, #2de1fc 100%)',
          borderRadius: 32,
          padding: 40,
          width: 300,
          minHeight: 200,
          boxShadow: '0 8px 32px rgba(0,196,140,0.10)',
          margin: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textDecoration: 'none',
          color: '#fff',
          transition: 'box-shadow 0.2s',
          fontWeight: 600
        }}>
          <div style={{fontSize: 56, marginBottom: 24}}><span role="img" aria-label="feedback">📝</span></div>
          <div style={{fontSize: 26, fontWeight: 700, marginBottom: 12}}>Peer Feedback</div>
          <div style={{fontSize: 18, color: 'rgba(255,255,255,0.92)'}}>See and give peer feedback</div>
        </Link>
      </div>
    </div>
  );
}