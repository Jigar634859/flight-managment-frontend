import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinkStyle = {
    color: '#9ca3af',
    textDecoration: 'none',
    transition: 'all 0.3s ease',
    display: 'inline-block'
  };

  const socialIconStyle = {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'rgba(102, 126, 234, 0.1)',
    color: '#667eea',
    fontSize: '1.2rem',
    transition: 'all 0.3s ease',
    textDecoration: 'none'
  };

  return (
    <footer
      className="mt-auto"
      style={{
        background: 'linear-gradient(135deg, #1a202c 0%, #2d3748 100%)',
        color: '#e2e8f0',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Decorative gradient overlay */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '4px',
        background: 'linear-gradient(90deg, #667eea 0%, #764ba2 50%, #667eea 100%)',
        backgroundSize: '200% 100%',
        animation: 'gradient 3s ease infinite'
      }}></div>

      <Container style={{ paddingTop: '60px', paddingBottom: '30px' }}>
        <Row className="g-4">
          {/* Brand Section */}
          <Col lg={4} md={6} className="mb-4">
            <div className="mb-4">
              <h4 className="fw-bold mb-3" style={{ color: '#fff' }}>
                <i className="bi bi-airplane-engines me-2" style={{
                  color: '#667eea',
                  fontSize: '1.8rem',
                  verticalAlign: 'middle'
                }}></i>
                SkyPortal
              </h4>
              <p className="mb-3" style={{ color: '#9ca3af', lineHeight: '1.7' }}>
                Your trusted partner for seamless flight booking and travel management.
                Experience the future of air travel with cutting-edge technology.
              </p>
              <div className="d-flex gap-2 align-items-center">
                <div style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: '#10b981',
                  boxShadow: '0 0 10px #10b981'
                }}></div>
                <span style={{ color: '#10b981', fontSize: '0.9rem', fontWeight: '600' }}>
                  Online & Ready to Serve
                </span>
              </div>
            </div>
          </Col>

          {/* Quick Links */}
          <Col lg={2} md={6} className="mb-4">
            <h6 className="fw-bold mb-3" style={{ color: '#fff', fontSize: '1rem' }}>
              <i className="bi bi-link-45deg me-2" style={{ color: '#667eea' }}></i>
              Quick Links
            </h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link
                  to="/flights"
                  style={footerLinkStyle}
                  onMouseEnter={(e) => {
                    e.target.style.color = '#667eea';
                    e.target.style.paddingLeft = '8px';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = '#9ca3af';
                    e.target.style.paddingLeft = '0';
                  }}
                >
                  <i className="bi bi-chevron-right me-1"></i>
                  Browse Flights
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/my-bookings"
                  style={footerLinkStyle}
                  onMouseEnter={(e) => {
                    e.target.style.color = '#667eea';
                    e.target.style.paddingLeft = '8px';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = '#9ca3af';
                    e.target.style.paddingLeft = '0';
                  }}
                >
                  <i className="bi bi-chevron-right me-1"></i>
                  My Bookings
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/about"
                  style={footerLinkStyle}
                  onMouseEnter={(e) => {
                    e.target.style.color = '#667eea';
                    e.target.style.paddingLeft = '8px';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = '#9ca3af';
                    e.target.style.paddingLeft = '0';
                  }}
                >
                  <i className="bi bi-chevron-right me-1"></i>
                  About Us
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/contact"
                  style={footerLinkStyle}
                  onMouseEnter={(e) => {
                    e.target.style.color = '#667eea';
                    e.target.style.paddingLeft = '8px';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = '#9ca3af';
                    e.target.style.paddingLeft = '0';
                  }}
                >
                  <i className="bi bi-chevron-right me-1"></i>
                  Contact
                </Link>
              </li>
            </ul>
          </Col>

          {/* Support */}
          <Col lg={3} md={6} className="mb-4">
            <h6 className="fw-bold mb-3" style={{ color: '#fff', fontSize: '1rem' }}>
              <i className="bi bi-headset me-2" style={{ color: '#667eea' }}></i>
              Support
            </h6>
            <ul className="list-unstyled">
              <li className="mb-3">
                <div className="d-flex align-items-start">
                  <i className="bi bi-envelope-fill me-2 mt-1" style={{ color: '#667eea' }}></i>
                  <div>
                    <div style={{ fontSize: '0.85rem', color: '#9ca3af', marginBottom: '2px' }}>Email</div>
                    <a
                      href="mailto:support@skyportal.dev"
                      style={{ color: '#e2e8f0', textDecoration: 'none', fontSize: '0.95rem' }}
                      onMouseEnter={(e) => e.target.style.color = '#667eea'}
                      onMouseLeave={(e) => e.target.style.color = '#e2e8f0'}
                    >
                      support@skyportal.dev
                    </a>
                  </div>
                </div>
              </li>
              <li className="mb-3">
                <div className="d-flex align-items-start">
                  <i className="bi bi-telephone-fill me-2 mt-1" style={{ color: '#667eea' }}></i>
                  <div>
                    <div style={{ fontSize: '0.85rem', color: '#9ca3af', marginBottom: '2px' }}>Phone</div>
                    <span style={{ color: '#e2e8f0', fontSize: '0.95rem' }}>+91 1800-123-4567</span>
                  </div>
                </div>
              </li>
              <li className="mb-3">
                <div className="d-flex align-items-start">
                  <i className="bi bi-clock-fill me-2 mt-1" style={{ color: '#667eea' }}></i>
                  <div>
                    <div style={{ fontSize: '0.85rem', color: '#9ca3af', marginBottom: '2px' }}>Support Hours</div>
                    <span style={{ color: '#e2e8f0', fontSize: '0.95rem' }}>24/7 Available</span>
                  </div>
                </div>
              </li>
            </ul>
          </Col>

          {/* Connect */}
          <Col lg={3} md={6} className="mb-4">
            <h6 className="fw-bold mb-3" style={{ color: '#fff', fontSize: '1rem' }}>
              <i className="bi bi-share me-2" style={{ color: '#667eea' }}></i>
              Connect With Us
            </h6>
            <p style={{ color: '#9ca3af', fontSize: '0.9rem', marginBottom: '15px' }}>
              Follow us on social media for updates and offers
            </p>
            <div className="d-flex gap-2 mb-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                style={socialIconStyle}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#667eea';
                  e.currentTarget.style.color = '#fff';
                  e.currentTarget.style.transform = 'translateY(-3px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(102, 126, 234, 0.1)';
                  e.currentTarget.style.color = '#667eea';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <i className="bi bi-facebook"></i>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                style={socialIconStyle}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#667eea';
                  e.currentTarget.style.color = '#fff';
                  e.currentTarget.style.transform = 'translateY(-3px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(102, 126, 234, 0.1)';
                  e.currentTarget.style.color = '#667eea';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <i className="bi bi-twitter-x"></i>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                style={socialIconStyle}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#667eea';
                  e.currentTarget.style.color = '#fff';
                  e.currentTarget.style.transform = 'translateY(-3px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(102, 126, 234, 0.1)';
                  e.currentTarget.style.color = '#667eea';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <i className="bi bi-instagram"></i>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                style={socialIconStyle}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#667eea';
                  e.currentTarget.style.color = '#fff';
                  e.currentTarget.style.transform = 'translateY(-3px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(102, 126, 234, 0.1)';
                  e.currentTarget.style.color = '#667eea';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <i className="bi bi-linkedin"></i>
              </a>
            </div>

            {/* Newsletter */}
            <div style={{
              background: 'rgba(102, 126, 234, 0.1)',
              padding: '15px',
              borderRadius: '10px',
              border: '1px solid rgba(102, 126, 234, 0.2)'
            }}>
              <div className="d-flex align-items-center mb-2">
                <i className="bi bi-envelope-heart-fill me-2" style={{ color: '#667eea' }}></i>
                <span style={{ fontSize: '0.9rem', fontWeight: '600', color: '#fff' }}>
                  Newsletter
                </span>
              </div>
              <p style={{ fontSize: '0.85rem', color: '#9ca3af', marginBottom: '0' }}>
                Subscribe for exclusive deals and travel tips
              </p>
            </div>
          </Col>
        </Row>

        {/* Divider */}
        <div style={{
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(102, 126, 234, 0.3), transparent)',
          margin: '40px 0 30px'
        }}></div>

        {/* Bottom Bar */}
        <Row>
          <Col lg={6} className="text-center text-lg-start mb-3 mb-lg-0">
            <p className="mb-0" style={{ color: '#9ca3af', fontSize: '0.9rem' }}>
              © {currentYear} <span style={{ color: '#667eea', fontWeight: '600' }}>SkyPortal</span>.
              All rights reserved.
            </p>
          </Col>
          <Col lg={6} className="text-center text-lg-end">
            <div className="d-flex justify-content-center justify-content-lg-end align-items-center gap-3 flex-wrap">
              <a
                href="#"
                style={{ color: '#9ca3af', fontSize: '0.9rem', textDecoration: 'none' }}
                onMouseEnter={(e) => e.target.style.color = '#667eea'}
                onMouseLeave={(e) => e.target.style.color = '#9ca3af'}
              >
                Privacy Policy
              </a>
              <span style={{ color: '#4b5563' }}>•</span>
              <a
                href="#"
                style={{ color: '#9ca3af', fontSize: '0.9rem', textDecoration: 'none' }}
                onMouseEnter={(e) => e.target.style.color = '#667eea'}
                onMouseLeave={(e) => e.target.style.color = '#9ca3af'}
              >
                Terms of Service
              </a>
              <span style={{ color: '#4b5563' }}>•</span>
              <span style={{ color: '#9ca3af', fontSize: '0.9rem' }}>
                Made with <i className="bi bi-heart-fill" style={{ color: '#ef4444' }}></i> in Gurgaon
              </span>
            </div>
          </Col>
        </Row>
      </Container>

      {/* Add gradient animation keyframes */}
      <style>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </footer>
  );
}
