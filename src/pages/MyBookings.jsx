import { useState, useEffect } from 'react';
import { Container, Card, Row, Col, Alert, Button, Spinner } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { getUserBookings } from '../services/flightsService';
import { useNavigate } from 'react-router-dom';
import EditBookingModal from '../components/EditBookingModal';
import BoardingPass from '../components/BoardingPass';

export default function MyBookings() {
  const { isUserAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingBooking, setEditingBooking] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    if (!isUserAuthenticated) {
      navigate('/login', { state: { from: { pathname: '/my-bookings' } } });
      return;
    }

    fetchBookings();
  }, [isUserAuthenticated, navigate]);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await getUserBookings();
      setBookings(data || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load bookings. Please try again.');
      console.error('Error fetching bookings:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEditBooking = (booking) => {
    setEditingBooking(booking);
    setShowEditModal(true);
  };

  const handleEditSuccess = async (updatedBooking) => {
    setBookings(bookings.map(b => b.id === updatedBooking.id ? updatedBooking : b));
    setShowEditModal(false);
    setEditingBooking(null);
  };

  if (!isUserAuthenticated) {
    return null;
  }

  return (
    <Container className="py-5">
      <div className="mb-4">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h2 className="fw-bold mb-2">
              <i className="bi bi-ticket-perforated me-2" style={{ color: '#667eea' }}></i>
              My Bookings
            </h2>
            <p className="text-muted mb-0">View and manage your flight bookings</p>
          </div>
          <Button
            variant="outline-primary"
            onClick={fetchBookings}
            style={{ borderRadius: '10px' }}
          >
            <i className="bi bi-arrow-clockwise me-2"></i>
            Refresh
          </Button>
        </div>
      </div>

      {error && (
        <Alert variant="danger" className="border-0" style={{ borderRadius: '12px' }}>
          <i className="bi bi-exclamation-triangle-fill me-2"></i>
          {error}
        </Alert>
      )}

      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" role="status" style={{ color: '#667eea' }}>
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          <p className="mt-3 text-muted">Loading your bookings...</p>
        </div>
      ) : bookings.length === 0 ? (
        <Card className="border-0 shadow-sm" style={{ borderRadius: '15px' }}>
          <Card.Body className="text-center py-5">
            <div className="mb-3" style={{ fontSize: '4rem', color: '#cbd5e0' }}>
              <i className="bi bi-inbox"></i>
            </div>
            <h5 className="fw-bold mb-2">No Bookings Yet</h5>
            <p className="text-muted mb-4">You haven't made any flight bookings yet.</p>
            <button
              className="btn btn-primary"
              onClick={() => navigate('/flights')}
              style={{
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                border: 'none'
              }}
            >
              <i className="bi bi-search me-2"></i>Browse Flights
            </button>
          </Card.Body>
        </Card>
      ) : (
        <Row>
          {bookings.map((booking) => {
            const flightSummary = booking.flight || booking.flightSummary;

            return (
              <Col md={12} lg={6} key={booking.id} className="mb-4">
                <BoardingPass booking={booking} flight={flightSummary} />

                {/* Edit and Print Buttons */}
                <div className="mt-3 d-flex gap-2">
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => handleEditBooking(booking)}
                    style={{ borderRadius: '10px', flex: 1 }}
                  >
                    <i className="bi bi-pencil me-2"></i>
                    Edit Booking
                  </Button>
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={() => window.print()}
                    style={{ borderRadius: '10px' }}
                  >
                    <i className="bi bi-printer me-2"></i>
                    Print
                  </Button>
                </div>
              </Col>
            );
          })}
        </Row>
      )}

      {/* Edit Booking Modal */}
      {editingBooking && (
        <EditBookingModal
          show={showEditModal}
          onHide={() => {
            setShowEditModal(false);
            setEditingBooking(null);
          }}
          booking={editingBooking}
          onSuccess={handleEditSuccess}
        />
      )}
    </Container>
  );
}
