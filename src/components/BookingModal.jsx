import { useState, useEffect } from 'react';
import { Modal, Form, Button, Alert, Row, Col } from 'react-bootstrap';
import { bookFlight } from '../services/flightsService';
import { fmtCurrency, fmtDateTime } from '../utils/formatters';
import PaymentModal from './PaymentModal';

export default function BookingModal({ show, onHide, flight, onSuccess }) {
  const [formData, setFormData] = useState({
    passengerName: '',
    passengerEmail: '',
    passengerPhone: '',
    numberOfPassengers: 1,
    seatPreference: 'Economy',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPayment, setShowPayment] = useState(false);

  useEffect(() => {
    if (show && flight) {
      setFormData({
        passengerName: '',
        passengerEmail: '',
        passengerPhone: '',
        numberOfPassengers: 1,
        seatPreference: 'Economy',
      });
      setError('');
    }
  }, [show, flight]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    // Show payment modal instead of directly booking
    setShowPayment(true);
  };

  const handlePaymentSuccess = async (completeBookingData) => {
    setLoading(true);
    try {
      const booking = await bookFlight(completeBookingData);
      if (onSuccess) {
        onSuccess(booking);
      }
      setShowPayment(false);
      onHide();
    } catch (err) {
      setError(err.response?.data?.message || 'Booking failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!flight) return null;

  const totalPrice = flight.price * parseInt(formData.numberOfPassengers);

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton style={{ borderBottom: '2px solid #e2e8f0' }}>
        <Modal.Title className="fw-bold">
          <i className="bi bi-ticket-perforated me-2" style={{ color: '#667eea' }}></i>
          Book Flight
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Flight Details Card */}
        <div className="mb-4 p-3" style={{
          background: 'linear-gradient(135deg, #667eea15 0%, #764ba215 100%)',
          borderRadius: '12px',
          border: '1px solid #e2e8f0'
        }}>
          <Row>
            <Col md={6}>
              <div className="mb-2">
                <span className="text-muted small">Flight Code</span>
                <div className="fw-bold">{flight.code}</div>
              </div>
              <div className="mb-2">
                <span className="text-muted small">Airline</span>
                <div className="fw-semibold">{flight.airline}</div>
              </div>
            </Col>
            <Col md={6}>
              <div className="mb-2">
                <span className="text-muted small">Route</span>
                <div className="fw-bold">
                  <i className="bi bi-airplane me-1"></i>
                  {flight.from} → {flight.to}
                </div>
              </div>
              <div className="mb-2">
                <span className="text-muted small">Departure</span>
                <div>{fmtDateTime(flight.departAt)}</div>
              </div>
            </Col>
          </Row>
          <div className="mt-3 pt-3" style={{ borderTop: '1px solid #e2e8f0' }}>
            <div className="d-flex justify-content-between align-items-center">
              <span className="text-muted">Price per passenger</span>
              <span className="fw-bold fs-5" style={{ color: '#667eea' }}>
                {fmtCurrency(flight.price)}
              </span>
            </div>
          </div>
        </div>

        {error && (
          <Alert variant="danger" className="border-0" style={{ borderRadius: '10px' }}>
            <i className="bi bi-exclamation-triangle-fill me-2"></i>
            {error}
          </Alert>
        )}

        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">
                  Passenger Name <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="passengerName"
                  value={formData.passengerName}
                  onChange={handleChange}
                  placeholder="Full name"
                  required
                  style={{ borderRadius: '10px', border: '2px solid #e2e8f0' }}
                  className="py-2"
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">
                  Email <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="email"
                  name="passengerEmail"
                  value={formData.passengerEmail}
                  onChange={handleChange}
                  placeholder="email@example.com"
                  required
                  style={{ borderRadius: '10px', border: '2px solid #e2e8f0' }}
                  className="py-2"
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">Phone Number</Form.Label>
                <Form.Control
                  type="tel"
                  name="passengerPhone"
                  value={formData.passengerPhone}
                  onChange={handleChange}
                  placeholder="+1 234 567 8900"
                  style={{ borderRadius: '10px', border: '2px solid #e2e8f0' }}
                  className="py-2"
                />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">
                  Passengers <span className="text-danger">*</span>
                </Form.Label>
                <Form.Select
                  name="numberOfPassengers"
                  value={formData.numberOfPassengers}
                  onChange={handleChange}
                  required
                  style={{ borderRadius: '10px', border: '2px solid #e2e8f0' }}
                  className="py-2"
                >
                  {[1, 2, 3, 4, 5, 6].map(num => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">Seat Class</Form.Label>
                <Form.Select
                  name="seatPreference"
                  value={formData.seatPreference}
                  onChange={handleChange}
                  style={{ borderRadius: '10px', border: '2px solid #e2e8f0' }}
                  className="py-2"
                >
                  <option value="Economy">Economy</option>
                  <option value="Business">Business</option>
                  <option value="First">First Class</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          {/* Total Price */}
          <div className="p-3 mb-3" style={{
            background: '#f7fafc',
            borderRadius: '10px',
            border: '2px solid #e2e8f0'
          }}>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <div className="fw-semibold">Total Amount</div>
                <small className="text-muted">
                  {formData.numberOfPassengers} passenger{formData.numberOfPassengers > 1 ? 's' : ''} × {fmtCurrency(flight.price)}
                </small>
              </div>
              <div className="fw-bold fs-4" style={{ color: '#667eea' }}>
                {fmtCurrency(totalPrice)}
              </div>
            </div>
          </div>

          <div className="d-flex gap-2">
            <Button
              variant="outline-secondary"
              onClick={onHide}
              className="flex-fill"
              style={{ borderRadius: '10px', border: '2px solid #e2e8f0' }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={loading}
              className="flex-fill"
              style={{
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                border: 'none',
                boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)'
              }}
            >
              <>
                <i className="bi bi-arrow-right-circle me-2"></i>
                Proceed to Payment
              </>
            </Button>
          </div>
        </Form>
      </Modal.Body>

      {/* Payment Modal */}
      <PaymentModal
        show={showPayment}
        onHide={() => setShowPayment(false)}
        bookingData={{
          flightId: flight.id,
          ...formData,
          totalPrice: flight.price * parseInt(formData.numberOfPassengers),
        }}
        onPaymentSuccess={handlePaymentSuccess}
      />
    </Modal>
  );
}
