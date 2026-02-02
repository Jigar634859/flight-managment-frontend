import { useEffect, useState } from 'react';
import { Container, Card, Badge, Button, Row, Col, Alert, Modal } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { getFlightById } from '../services/flightsService';
import { fmtCurrency, fmtDateTime } from '../utils/formatters';
import { useAuth } from '../context/AuthContext';
import BookingModal from '../components/BookingModal';

export default function FlightDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isUserAuthenticated } = useAuth();
  const [flight, setFlight] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  useEffect(() => {
    (async () => setFlight(await getFlightById(id)))();
  }, [id]);

  const handleBookFlight = () => {
    if (!isUserAuthenticated) {
      setShowLoginPrompt(true);
      return;
    }
    setShowBookingModal(true);
  };

  const handleBookingSuccess = () => {
    setBookingSuccess(true);
    setTimeout(() => setBookingSuccess(false), 5000);
  };

  if (!flight) return (
    <Container className="py-5">
      <div className="text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="text-muted mt-3">Loading flight details...</p>
      </div>
    </Container>
  );

  const statusColor = flight.status === 'On Time' ? 'success' : 
                     flight.status === 'Delayed' ? 'danger' : 'secondary';

  return (
    <div style={{ background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)', minHeight: '100vh', paddingTop: '40px', paddingBottom: '60px' }}>
      <Container>
        {bookingSuccess && (
          <Alert variant="success" className="mb-4 border-0" style={{ borderRadius: '12px' }}>
            <i className="bi bi-check-circle-fill me-2"></i>
            Booking confirmed successfully! Check your email for details.
          </Alert>
        )}

        <Row>
          <Col lg={8} className="mx-auto">
            <Card className="border-0 shadow-lg" style={{ borderRadius: '20px', overflow: 'hidden' }}>
              <Card.Header style={{ 
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                border: 'none',
                padding: '30px'
              }}>
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <h2 className="fw-bold mb-2">{flight.airline}</h2>
                    <h4 className="mb-0 opacity-75">{flight.code}</h4>
                  </div>
                  <Badge bg={statusColor} style={{ fontSize: '1rem', padding: '10px 20px', borderRadius: '10px' }}>
                    {flight.status}
                  </Badge>
                </div>
              </Card.Header>
              <Card.Body className="p-5">
                <Row className="mb-4">
                  <Col md={6}>
                    <div className="mb-4">
                      <div className="text-muted small mb-2">FROM</div>
                      <h3 className="fw-bold">{flight.from}</h3>
                      <div className="text-muted">
                        <i className="bi bi-calendar3 me-2"></i>
                        {fmtDateTime(flight.departAt)}
                      </div>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="mb-4">
                      <div className="text-muted small mb-2">TO</div>
                      <h3 className="fw-bold">{flight.to}</h3>
                      <div className="text-muted">
                        <i className="bi bi-calendar3 me-2"></i>
                        {fmtDateTime(flight.arriveAt)}
                      </div>
                    </div>
                  </Col>
                </Row>

                <div className="text-center mb-4">
                  <i className="bi bi-airplane-engines" style={{ fontSize: '3rem', color: '#667eea', transform: 'rotate(90deg)' }}></i>
                </div>

                <div className="p-4 mb-4" style={{ 
                  background: 'linear-gradient(135deg, #667eea15 0%, #764ba215 100%)',
                  borderRadius: '15px',
                  border: '1px solid #e2e8f0'
                }}>
                  <Row className="align-items-center">
                    <Col>
                      <div className="text-muted small">Price per passenger</div>
                      <div className="fw-bold fs-3" style={{ color: '#667eea' }}>
                        {fmtCurrency(flight.price)}
                      </div>
                    </Col>
                    <Col xs="auto">
                      <Button
                        variant="primary"
                        size="lg"
                        onClick={handleBookFlight}
                        style={{
                          borderRadius: '12px',
                          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                          border: 'none',
                          padding: '12px 40px',
                          fontSize: '1.1rem',
                          fontWeight: '600',
                          boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)'
                        }}
                      >
                        <i className="bi bi-ticket-perforated me-2"></i>
                        Book Now
                      </Button>
                    </Col>
                  </Row>
                </div>

                <div className="row g-3">
                  <div className="col-md-4">
                    <div className="text-center p-3" style={{ background: '#f8f9fa', borderRadius: '10px' }}>
                      <i className="bi bi-clock-history" style={{ fontSize: '2rem', color: '#667eea' }}></i>
                      <div className="mt-2 fw-semibold">On-Time</div>
                      <div className="small text-muted">Guarantee</div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="text-center p-3" style={{ background: '#f8f9fa', borderRadius: '10px' }}>
                      <i className="bi bi-shield-check" style={{ fontSize: '2rem', color: '#667eea' }}></i>
                      <div className="mt-2 fw-semibold">Secure</div>
                      <div className="small text-muted">Payment</div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="text-center p-3" style={{ background: '#f8f9fa', borderRadius: '10px' }}>
                      <i className="bi bi-headset" style={{ fontSize: '2rem', color: '#667eea' }}></i>
                      <div className="mt-2 fw-semibold">24/7</div>
                      <div className="small text-muted">Support</div>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Login Prompt Modal */}
      <Modal show={showLoginPrompt} onHide={() => setShowLoginPrompt(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Login Required</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Please sign in to book this flight.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowLoginPrompt(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => {
            setShowLoginPrompt(false);
            navigate('/login', { state: { from: { pathname: `/flights/${id}` } } });
          }}>
            Sign In
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Booking Modal */}
      {flight && (
        <BookingModal
          show={showBookingModal}
          onHide={() => setShowBookingModal(false)}
          flight={flight}
          onSuccess={handleBookingSuccess}
        />
      )}
    </div>
  );
}
