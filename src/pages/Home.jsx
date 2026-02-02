import { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Card, Alert, Modal } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getFlights } from '../services/flightsService';
import BookingModal from '../components/BookingModal';
import { fmtCurrency, fmtDateTime } from '../utils/formatters';

export default function Home() {
  const { isUserAuthenticated, isAdminAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [flights, setFlights] = useState([]);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        setLoading(true);
        setError('');
        const data = await getFlights();
        setFlights(data.slice(0, 6)); // Show first 6 flights
      } catch (err) {
        setError('Failed to load flights. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchFlights();
  }, []);

  // Cleanup timeout to prevent memory leak
  useEffect(() => {
    let timeoutId;
    if (bookingSuccess) {
      timeoutId = setTimeout(() => setBookingSuccess(false), 5000);
    }
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [bookingSuccess]);

  const handleBookFlight = (flight) => {
    if (!isUserAuthenticated) {
      setShowLoginPrompt(true);
      return;
    }
    setSelectedFlight(flight);
    setShowBookingModal(true);
  };

  const handleBookingSuccess = () => {
    setBookingSuccess(true);
  };

  return (
    <>
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        paddingTop: '100px',
        paddingBottom: '80px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.05\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          opacity: 0.3
        }}></div>
        <Container style={{ position: 'relative', zIndex: 1 }}>
          <Row className="align-items-center">
            <Col lg={7} className="mb-4 mb-lg-0">
              <h1 className="display-3 fw-bold mb-4" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.2)' }}>
                Your Journey Begins Here
              </h1>
              <p className="lead mb-4" style={{ fontSize: '1.3rem', opacity: 0.95 }}>
                Discover amazing destinations, compare prices, and book your perfect flight with ease.
                Experience world-class service and seamless travel planning.
              </p>
              <div className="d-flex gap-3 flex-wrap">
                <Button
                  as={Link}
                  to="/flights"
                  variant="light"
                  size="lg"
                  className="px-4 py-3 fw-semibold"
                  style={{ borderRadius: '12px' }}
                >
                  <i className="bi bi-search me-2"></i>
                  Explore Flights
                </Button>
                {isUserAuthenticated ? (
                  <Button
                    variant="outline-light"
                    size="lg"
                    className="px-4 py-3 fw-semibold"
                    style={{ borderRadius: '12px', borderWidth: '2px' }}
                    onClick={() => navigate('/flights')}
                  >
                    <i className="bi bi-ticket-perforated me-2"></i>
                    Book Now
                  </Button>
                ) : !isAdminAuthenticated && (
                  <Button
                    variant="outline-light"
                    size="lg"
                    className="px-4 py-3 fw-semibold"
                    style={{ borderRadius: '12px', borderWidth: '2px' }}
                    onClick={() => navigate('/login')}
                  >
                    <i className="bi bi-person-circle me-2"></i>
                    Sign In to Book
                  </Button>
                )}
              </div>
            </Col>
            <Col lg={5} className="text-center">
              <div style={{ fontSize: '12rem', opacity: 0.2 }}>
                <i className="bi bi-airplane-engines"></i>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Features Section */}
      <section className="py-5" style={{ background: '#f8f9fa' }}>
        <Container>
          <Row className="text-center mb-5">
            <Col>
              <h2 className="fw-bold mb-3">Why Choose Us?</h2>
              <p className="text-muted">Experience the best in flight booking</p>
            </Col>
          </Row>
          <Row>
            <Col md={4} className="mb-4">
              <Card className="h-100 border-0 shadow-sm" style={{ borderRadius: '15px' }}>
                <Card.Body className="text-center p-4">
                  <div className="mb-3" style={{ fontSize: '3rem', color: '#667eea' }}>
                    <i className="bi bi-shield-check"></i>
                  </div>
                  <h5 className="fw-bold">Secure Booking</h5>
                  <p className="text-muted mb-0">Your data and payments are protected with industry-leading security.</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card className="h-100 border-0 shadow-sm" style={{ borderRadius: '15px' }}>
                <Card.Body className="text-center p-4">
                  <div className="mb-3" style={{ fontSize: '3rem', color: '#667eea' }}>
                    <i className="bi bi-clock-history"></i>
                  </div>
                  <h5 className="fw-bold">24/7 Support</h5>
                  <p className="text-muted mb-0">Round-the-clock customer service to assist you anytime, anywhere.</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card className="h-100 border-0 shadow-sm" style={{ borderRadius: '15px' }}>
                <Card.Body className="text-center p-4">
                  <div className="mb-3" style={{ fontSize: '3rem', color: '#667eea' }}>
                    <i className="bi bi-tags"></i>
                  </div>
                  <h5 className="fw-bold">Best Prices</h5>
                  <p className="text-muted mb-0">Compare prices from multiple airlines and get the best deals.</p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Featured Flights Section */}
      <section className="py-5">
        <Container>
          <Row className="mb-4">
            <Col>
              <h2 className="fw-bold mb-2">Featured Flights</h2>
              <p className="text-muted">Popular destinations available now</p>
            </Col>
            <Col xs="auto">
              <Button as={Link} to="/flights" variant="outline-primary" style={{ borderRadius: '10px' }}>
                View All <i className="bi bi-arrow-right ms-1"></i>
              </Button>
            </Col>
          </Row>

          {bookingSuccess && (
            <Alert variant="success" className="mb-4 border-0" style={{ borderRadius: '12px' }}>
              <i className="bi bi-check-circle-fill me-2"></i>
              Booking confirmed successfully! Check your email for details.
            </Alert>
          )}

          {error && (
            <Alert variant="danger" className="mb-4 border-0" style={{ borderRadius: '12px' }}>
              <i className="bi bi-exclamation-triangle-fill me-2"></i>
              {error}
            </Alert>
          )}

          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border" style={{ color: '#667eea' }} role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-3 text-muted">Loading flights...</p>
            </div>
          ) : flights.length === 0 ? (
            <div className="text-center py-5">
              <p className="text-muted">No flights available at the moment.</p>
            </div>
          ) : (
            <Row>
              {flights.map(flight => (
                <Col md={6} lg={4} key={flight.id} className="mb-4">
                  <Card className="h-100 border-0 shadow-sm" style={{ borderRadius: '15px', transition: 'transform 0.2s' }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                  >
                    <Card.Body className="p-4">
                      <div className="d-flex justify-content-between align-items-start mb-3">
                        <div>
                          <h5 className="fw-bold mb-1">{flight.code}</h5>
                          <p className="text-muted small mb-0">{flight.airline}</p>
                        </div>
                        <span className="badge" style={{
                          background: flight.status === 'On Time' ? '#10b981' :
                            flight.status === 'Delayed' ? '#ef4444' : '#6b7280',
                          borderRadius: '8px',
                          padding: '6px 12px'
                        }}>
                          {flight.status}
                        </span>
                      </div>

                      <div className="mb-3">
                        <div className="d-flex align-items-center mb-2">
                          <i className="bi bi-geo-alt-fill me-2" style={{ color: '#667eea' }}></i>
                          <span className="fw-semibold">{flight.from}</span>
                          <i className="bi bi-arrow-right mx-3 text-muted"></i>
                          <span className="fw-semibold">{flight.to}</span>
                        </div>
                        <div className="small text-muted">
                          <div><i className="bi bi-calendar3 me-1"></i> {fmtDateTime(flight.departAt)}</div>
                        </div>
                      </div>

                      <div className="d-flex justify-content-between align-items-center pt-3" style={{ borderTop: '1px solid #e2e8f0' }}>
                        <div>
                          <span className="text-muted small">Starting from</span>
                          <div className="fw-bold fs-5" style={{ color: '#667eea' }}>
                            {fmtCurrency(flight.price)}
                          </div>
                        </div>
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => handleBookFlight(flight)}
                          style={{
                            borderRadius: '10px',
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            border: 'none',
                            padding: '8px 20px'
                          }}
                        >
                          <i className="bi bi-ticket-perforated me-1"></i>
                          Book
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </Container>
      </section>

      {/* Login Prompt Modal */}
      <Modal show={showLoginPrompt} onHide={() => setShowLoginPrompt(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Login Required</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Please sign in to book flights.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowLoginPrompt(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => {
            setShowLoginPrompt(false);
            navigate('/login', { state: { from: { pathname: '/' } } });
          }}>
            Sign In
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Booking Modal */}
      {selectedFlight && (
        <BookingModal
          show={showBookingModal}
          onHide={() => {
            setShowBookingModal(false);
            setSelectedFlight(null);
          }}
          flight={selectedFlight}
          onSuccess={handleBookingSuccess}
        />
      )}
    </>
  );
}
