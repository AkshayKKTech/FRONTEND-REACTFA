import React, { useState } from 'react';

function App() {
  const [orderId, setOrderId] = useState('');
  const [status, setStatus] = useState(null);

  // Simulating a backend API call to track an underwriting order
  const handleTrackOrder = (e) => {
    e.preventDefault();
    if (!orderId.trim()) {
      setStatus('Please enter a valid Order ID.');
      return;
    }
    setStatus(`Checking records... Order ID #${orderId} is currently UNDER REVIEW by the Bangalore Operations Team.`);
  };

  return (
    <div style={styles.container}>
      {/* Navigation Bar */}
      <nav style={styles.navbar}>
        <div style={styles.logo}>First American India Portal</div>
        <div style={styles.navLinks}>
          <a href="#home" style={styles.link}>Home</a>
          <a href="#services" style={styles.link}>Services</a>
          <a href="#track" style={styles.link}>Track Order</a>
        </div>
      </nav>

      {/* Hero Section */}
      <header id="home" style={styles.hero}>
        <h1 style={styles.heroTitle}>Title Insurance & Risk Underwriting Platform</h1>
        <p style={styles.heroSubtitle}>Enterprise-grade 3-Tier Web Application running on AWS EKS via GitOps.</p>
        <a href="#track" style={styles.ctaButton}>Get Started</a>
      </header>

      {/* Services Section */}
      <section id="services" style={styles.servicesSection}>
        <h2 style={styles.sectionHeading}>Our Core Microservices</h2>
        <div style={styles.cardGrid}>
          <div style={styles.card}>
            <h3>🗄️ Property Record Indexing</h3>
            <p>Automated ingestion systems pulling bulk legal records from multiple global county databases.</p>
          </div>
          <div style={styles.card}>
            <h3>🔍 Title Examination</h3>
            <p>Interactive internal tools allowing operations analysts to check for property liens and legal risks.</p>
          </div>
          <div style={styles.card}>
            <h3>📁 Secure Document Vault</h3>
            <p>Encrypted data streams routing multi-page legal PDFs directly to highly available cloud storage pools.</p>
          </div>
        </div>
      </section>

      {/* Interactive Tracking Section */}
      <section id="track" style={styles.trackSection}>
        <h2 style={styles.sectionHeading}>Track Transaction Progress</h2>
        <form onSubmit={handleTrackOrder} style={styles.form}>
          <input 
            type="text" 
            placeholder="Enter Title Order ID (e.g., FAM-2026)" 
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            style={styles.input}
          />
          <button type="submit" style={styles.button}>Query Database</button>
        </form>
        {status && <div style={styles.statusBox}>{status}</div>}
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <p>© 2026 First American India DevOps Demo Project. Built with React & Nginx.</p>
      </footer>
    </div>
  );
}

// Inline CSS Styles for a single-file implementation
const styles = {
  container: { fontFamily: "'Segoe UI', Roboto, sans-serif", color: '#333', margin: 0, padding: 0, backgroundColor: '#f9f9f9' },
  navbar: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#003366', padding: '15px 30px', color: '#fff' },
  logo: { fontSize: '20px', fontWeight: 'bold' },
  navLinks: { display: 'flex', gap: '20px' },
  link: { color: '#fff', textDecoration: 'none', fontSize: '16px' },
  hero: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', backgroundColor: '#e6f2ff', padding: '80px 20px', borderBottom: '1px solid #cce6ff' },
  heroTitle: { fontSize: '36px', color: '#003366', marginBottom: '10px' },
  heroSubtitle: { fontSize: '18px', color: '#555', marginBottom: '25px' },
  ctaButton: { padding: '12px 24px', backgroundColor: '#003366', color: '#fff', textDecoration: 'none', borderRadius: '5px', fontWeight: 'bold' },
  servicesSection: { padding: '60px 20px', maxWidth: '1200px', margin: '0 auto', textAlign: 'center' },
  sectionHeading: { fontSize: '28px', color: '#003366', marginBottom: '40px' },
  cardGrid: { display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' },
  card: { backgroundColor: '#fff', padding: '25px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', maxWidth: '300px', textAlign: 'left', borderTop: '4px solid #003366' },
  trackSection: { backgroundColor: '#f0f4f8', padding: '60px 20px', textAlign: 'center' },
  form: { display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '20px', flexWrap: 'wrap' },
  input: { padding: '12px', width: '300px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '16px' },
  button: { padding: '12px 24px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold' },
  statusBox: { marginTop: '25px', padding: '15px', backgroundColor: '#fff', borderLeft: '4px solid #ffc107', display: 'inline-block', borderRadius: '4px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' },
  footer: { textAlign: 'center', padding: '20px', backgroundColor: '#003366', color: '#fff', marginTop: '40px', fontSize: '14px' }
};

export default App;

