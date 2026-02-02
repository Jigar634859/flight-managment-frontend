import { useState, useEffect } from 'react';
import { Modal, Form, Button, Alert, Row, Col, Badge } from 'react-bootstrap';
import { updateBooking, getBookingById, getFlightById } from '../services/flightsService';
import { fmtCurrency, fmtDateTime } from '../utils/formatters';

// Helper functions for status badges
const getBookingStatusVariant = (status) => {
  if (!status) return 'secondary';
  const statusLower = status.toLowerCase();
  switch (statusLower) {
    case 'confirmed':
      return 'success';
    case 'pending':
      return 'warning';
    case 'cancelled':
      return 'danger';
    default:
      return 'secondary';
  }
};

const getFlightStatusVariant = (status) => {
  if (!status) return 'info';
  const statusLower = status.toLowerCase();
  switch (statusLower) {
    case 'on time':
      return 'success';
    case 'delayed':
      return 'warning';
    case 'cancelled':
      return 'danger';
    case 'scheduled':
      return 'info';
    default:
      return 'info';
  }
};

export default function EditBookingModal({ show, onHide, booking, onSuccess }) {
  const [formData, setFormData] = useState({
    passengerName: '',
    passengerEmail: '',
    passengerPhone: '',
    numberOfPassengers: 1,
    seatPreference: 'Economy',
  });
  const [currentBooking, setCurrentBooking] = useState(null);
  const [flight, setFlight] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetchingBooking, setFetchingBooking] = useState(false);

  useEffect(() => {
    if (show && booking) {
      // Fetch fresh booking data using getBookingById to get latest status
      fetchBookingDetails(booking.id);
    }
  }, [show, booking]);

  const fetchBookingDetails = async (bookingId) => {
    try {
      setFetchingBooking(true);
      setError('');

      // Fetch fresh booking data from backend (includes currentFlightStatus and fs)
      const freshBooking = await getBookingById(bookingId);
      setCurrentBooking(freshBooking);

      // Initialize form with booking data
      setFormData({
        passengerName: freshBooking.passengerName || '',
        passengerEmail: freshBooking.passengerEmail || '',
        passengerPhone: freshBooking.passengerPhone || '',
        numberOfPassengers: freshBooking.numberOfPassengers || 1,
        seatPreference: freshBooking.seatPreference || 'Economy',
      });

      // Extract flight details from BookingResponse (flight field)
      const flightSummary = freshBooking.flight || freshBooking.flightSummary;
      if (flightSummary) {
        setFlight({
          id: flightSummary.id,
          code: flightSummary.code,
          airline: flightSummary.airline,
          from: flightSummary.from,
          to: flightSummary.to,
          departAt: flightSummary.departAt,
          arriveAt: flightSummary.arriveAt,
          price: freshBooking.totalPrice / (freshBooking.numberOfPassengers || 1), // Calculate per passenger price
        });
      } else if (freshBooking.flightId) {
        // Fallback: fetch flight if not in response
        fetchFlight(freshBooking.flightId);
      }
    } catch (err) {
      console.error('Failed to fetch booking details:', err);
      setError(err.response?.data?.message || 'Failed to load booking details.');
      // Fallback to using passed booking data
      setCurrentBooking(booking);
      setFormData({
        passengerName: booking.passengerName || '',
        passengerEmail: booking.passengerEmail || '',
        passengerPhone: booking.passengerPhone || '',
        numberOfPassengers: booking.numberOfPassengers || 1,
        seatPreference: booking.seatPreference || 'Economy',
      });
    } finally {
      setFetchingBooking(false);
    }
  };

  const fetchFlight = async (flightId) => {
    try {
      const flightData = await getFlightById(flightId);
      setFlight(flightData);
    } catch (err) {
      console.error('Failed to fetch flight:', err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const bookingId = currentBooking?.id || booking?.id;
      if (!bookingId) {
        throw new Error('Booking ID not found');
      }

      const updateData = {
        passengerName: formData.passengerName,
        passengerEmail: formData.passengerEmail,
        passengerPhone: formData.passengerPhone,
        numberOfPassengers: parseInt(formData.numberOfPassengers),
        seatPreference: formData.seatPreference,
      };

      // Backend returns BookingResponse with enriched flight data
      const updatedBooking = await updateBooking(bookingId, updateData);
      if (onSuccess) {
        onSuccess(updatedBooking);
      }
      onHide();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update booking. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Use currentBooking if available, otherwise fallback to booking prop
  const displayBooking = currentBooking || booking;
  if (!displayBooking) return null;

  const flightSummary = displayBooking.flight || displayBooking.flightSummary;
  const totalPrice = flight
    ? flight.price * parseInt(formData.numberOfPassengers)
    : displayBooking.totalPrice;

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton style={{ borderBottom: '2px solid #e2e8f0' }}>
        <Modal.Title className="fw-bold">
          <i className="bi bi-pencil-square me-2" style={{ color: '#667eea' }}></i>
          Edit Booking
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Flight Details Card */}
        {flightSummary && (
          <div className="mb-4 p-3" style={{
            background: 'linear-gradient(135deg, #667eea15 0%, #764ba215 100%)',
            borderRadius: '12px',
            border: '1px solid #e2e8f0'
          }}>
            <Row>
              <Col md={6}>
                <div className="mb-2">
                  <span className="text-muted small">Flight Code</span>
                  <div className="fw-bold">{flightSummary.code}</div>
                </div>
                <div className="mb-2">
                  <span className="text-muted small">Airline</span>
                  <div className="fw-semibold">{flightSummary.airline}</div>
                </div>
              </Col>
              <Col md={6}>
                <div className="mb-2">
                  <span className="text-muted small">Route</span>
                  <div className="fw-bold">
                    <i className="bi bi-airplane me-1"></i>
                    {flightSummary.from} → {flightSummary.to}
                  </div>
                </div>
                <div className="mb-2">
                  <span className="text-muted small">Departure</span>
                  <div>{flightSummary.departAt && fmtDateTime(flightSummary.departAt)}</div>
                </div>
              </Col>
            </Row>
            <div className="mt-3 pt-3" style={{ borderTop: '1px solid #e2e8f0' }}>
              <div className="d-flex justify-content-between align-items-center">
                <span className="text-muted">Price per passenger</span>
                <span className="fw-bold fs-5" style={{ color: '#667eea' }}>
                  {fmtCurrency(flight ? flight.price : (booking.totalPrice / (booking.numberOfPassengers || 1)))}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Booking Status */}
        <div className="mb-3">
          <Alert variant="info" className="border-0" style={{ borderRadius: '10px' }}>
            <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
              <div>
                <i className="bi bi-check-circle me-2"></i>
                <strong>Booking Status:</strong>
                <Badge bg={getBookingStatusVariant(displayBooking.status)} className="ms-2">
                  {displayBooking.status || 'Confirmed'}
                </Badge>
              </div>
              {displayBooking.flightStatus && (
                <div>
                  <i className="bi bi-airplane me-2"></i>
                  <strong>Flight Status:</strong>
                  <Badge bg={getFlightStatusVariant(displayBooking.flightStatus)} className="ms-2">
                    {displayBooking.flightStatus}
                  </Badge>
                </div>
              )}
            </div>
          </Alert>
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
                  {formData.numberOfPassengers} passenger{formData.numberOfPassengers > 1 ? 's' : ''} × {fmtCurrency(flight ? flight.price : (displayBooking.totalPrice / (displayBooking.numberOfPassengers || 1)))}
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
              disabled={loading || fetchingBooking}
              className="flex-fill"
              style={{
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                border: 'none',
                boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)'
              }}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                  Updating...
                </>
              ) : (
                <>
                  <i className="bi bi-check-circle me-2"></i>
                  Update Booking
                </>
              )}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
