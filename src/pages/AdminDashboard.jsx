import { useEffect, useState } from 'react';
import { Container, Card, Button, Toast, ToastContainer, Row, Col, Form, Badge, InputGroup, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getFlights, addFlight, updateFlight, deleteFlight, searchFlights } from '../services/flightsService';
import { useAuth } from '../context/AuthContext';
import FlightTable from '../components/FlightTable';
import FlightFormModal from '../components/FlightFormModal';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [flights, setFlights] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [toast, setToast] = useState({ show: false, msg: '', bg: 'success' });
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // Advanced search state
  const [searchMode, setSearchMode] = useState('all'); // 'all' or 'advanced'
  const [searchParams, setSearchParams] = useState({
    from: '',
    to: '',
    date: ''
  });
  const [isSearching, setIsSearching] = useState(false);

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    logout('admin');
    setShowLogoutModal(false);
    navigate('/admin/login', { replace: true });
  };

  const refresh = async () => {
    setFlights(await getFlights());
    setSearchMode('all');
    setSearchParams({ from: '', to: '', date: '' });
  };

  useEffect(() => { refresh(); }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchParams.from || !searchParams.to) {
      setToast({ show: true, msg: 'Please enter both From and To locations', bg: 'warning' });
      return;
    }

    setIsSearching(true);
    try {
      const results = await searchFlights(
        searchParams.from,
        searchParams.to,
        searchParams.date || null
      );
      setFlights(results);
      setSearchMode('advanced');
      setToast({
        show: true,
        msg: `Found ${results.length} flight(s)`,
        bg: 'info'
      });
    } catch (err) {
      setToast({ show: true, msg: 'Search failed. Please try again.', bg: 'danger' });
      console.error('Search error:', err);
    } finally {
      setIsSearching(false);
    }
  };

  const clearSearch = () => {
    refresh();
  };

  const onAdd = () => { setEditing(null); setShowModal(true); };
  const onEdit = (flight) => { setEditing(flight); setShowModal(true); };
  const onDelete = async (flight) => {
    if (window.confirm(`Delete flight ${flight.code}?`)) {
      await deleteFlight(flight.id);
      setToast({ show: true, msg: 'Flight deleted successfully', bg: 'danger' });
      if (searchMode === 'advanced') {
        handleSearch({ preventDefault: () => { } });
      } else {
        refresh();
      }
    }
  };

  const onSubmit = async (data) => {
    try {
      if (editing) {
        await updateFlight(editing.id, data);
        setToast({ show: true, msg: 'Flight updated successfully', bg: 'info' });
      } else {
        await addFlight(data);
        setToast({ show: true, msg: 'Flight added successfully', bg: 'success' });
      }
      setShowModal(false);
      if (searchMode === 'advanced') {
        handleSearch({ preventDefault: () => { } });
      } else {
        refresh();
      }
    } catch (err) {
      setToast({ show: true, msg: 'Operation failed. Please try again.', bg: 'danger' });
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea15 0%, #764ba215 100%)',
      paddingTop: '30px',
      paddingBottom: '50px'
    }}>
      <Container fluid className="px-4">
        {/* Header */}
        <div className="mb-4">
          <Row className="align-items-center">
            <Col>
              <h2 className="fw-bold mb-1" style={{ color: '#2d3748' }}>
                <i className="bi bi-speedometer2 me-3" style={{ color: '#667eea' }}></i>
                Admin Dashboard
              </h2>
              <p className="text-muted mb-0">Manage flights, search routes, and monitor operations</p>
            </Col>
            <Col xs="auto">
              <div className="d-flex gap-2">
                <Button
                  onClick={onAdd}
                  size="lg"
                  style={{
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    border: 'none',
                    boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
                    padding: '12px 30px',
                    fontWeight: '600'
                  }}
                >
                  <i className="bi bi-plus-circle me-2"></i>
                  Add New Flight
                </Button>
                <Button
                  onClick={handleLogout}
                  size="lg"
                  variant="outline-danger"
                  style={{
                    borderRadius: '12px',
                    padding: '12px 30px',
                    fontWeight: '600',
                    borderWidth: '2px'
                  }}
                >
                  <i className="bi bi-box-arrow-right me-2"></i>
                  Logout
                </Button>
              </div>
            </Col>
          </Row>
        </div>

        {/* Advanced Search Card */}
        <Card className="border-0 shadow-sm mb-4" style={{ borderRadius: '15px' }}>
          <Card.Body className="p-4">
            <div className="d-flex align-items-center mb-3">
              <i className="bi bi-search me-2" style={{ fontSize: '1.3rem', color: '#667eea' }}></i>
              <h5 className="mb-0 fw-bold">Advanced Flight Search</h5>
              {searchMode === 'advanced' && (
                <Badge bg="primary" className="ms-3" style={{ borderRadius: '8px' }}>
                  <i className="bi bi-funnel me-1"></i>
                  Filtered Results
                </Badge>
              )}
            </div>

            <Form onSubmit={handleSearch}>
              <Row className="g-3">
                <Col md={3}>
                  <Form.Group>
                    <Form.Label className="fw-semibold small text-muted">
                      <i className="bi bi-geo-alt-fill me-1"></i>
                      From (Origin)
                    </Form.Label>
                    <InputGroup>
                      <InputGroup.Text style={{ background: '#f7fafc', border: '2px solid #e2e8f0' }}>
                        <i className="bi bi-airplane-engines"></i>
                      </InputGroup.Text>
                      <Form.Control
                        type="text"
                        placeholder="e.g., DEL, BOM"
                        value={searchParams.from}
                        onChange={(e) => setSearchParams({ ...searchParams, from: e.target.value.toUpperCase() })}
                        style={{ border: '2px solid #e2e8f0', borderLeft: 'none' }}
                      />
                    </InputGroup>
                  </Form.Group>
                </Col>

                <Col md={3}>
                  <Form.Group>
                    <Form.Label className="fw-semibold small text-muted">
                      <i className="bi bi-geo-fill me-1"></i>
                      To (Destination)
                    </Form.Label>
                    <InputGroup>
                      <InputGroup.Text style={{ background: '#f7fafc', border: '2px solid #e2e8f0' }}>
                        <i className="bi bi-geo-alt"></i>
                      </InputGroup.Text>
                      <Form.Control
                        type="text"
                        placeholder="e.g., DEL, BOM"
                        value={searchParams.to}
                        onChange={(e) => setSearchParams({ ...searchParams, to: e.target.value.toUpperCase() })}
                        style={{ border: '2px solid #e2e8f0', borderLeft: 'none' }}
                      />
                    </InputGroup>
                  </Form.Group>
                </Col>

                <Col md={3}>
                  <Form.Group>
                    <Form.Label className="fw-semibold small text-muted">
                      <i className="bi bi-calendar3 me-1"></i>
                      Date (Optional)
                    </Form.Label>
                    <InputGroup>
                      <InputGroup.Text style={{ background: '#f7fafc', border: '2px solid #e2e8f0' }}>
                        <i className="bi bi-calendar-event"></i>
                      </InputGroup.Text>
                      <Form.Control
                        type="date"
                        value={searchParams.date}
                        onChange={(e) => setSearchParams({ ...searchParams, date: e.target.value })}
                        style={{ border: '2px solid #e2e8f0', borderLeft: 'none' }}
                      />
                    </InputGroup>
                  </Form.Group>
                </Col>

                <Col md={3} className="d-flex align-items-end">
                  <div className="d-grid gap-2 w-100">
                    <Button
                      type="submit"
                      disabled={isSearching}
                      style={{
                        borderRadius: '10px',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        border: 'none',
                        fontWeight: '600',
                        padding: '10px'
                      }}
                    >
                      {isSearching ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2"></span>
                          Searching...
                        </>
                      ) : (
                        <>
                          <i className="bi bi-search me-2"></i>
                          Search Flights
                        </>
                      )}
                    </Button>
                    {searchMode === 'advanced' && (
                      <Button
                        variant="outline-secondary"
                        onClick={clearSearch}
                        style={{ borderRadius: '10px', fontWeight: '600' }}
                      >
                        <i className="bi bi-x-circle me-2"></i>
                        Clear Filter
                      </Button>
                    )}
                  </div>
                </Col>
              </Row>
            </Form>
          </Card.Body>
        </Card>

        {/* Flights Table Card */}
        <Card className="border-0 shadow-sm" style={{ borderRadius: '15px' }}>
          <Card.Header
            className="d-flex justify-content-between align-items-center"
            style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              borderRadius: '15px 15px 0 0',
              padding: '20px 25px'
            }}
          >
            <div>
              <h5 className="mb-1 fw-bold">
                <i className="bi bi-airplane me-2"></i>
                {searchMode === 'advanced' ? 'Search Results' : 'All Flights'}
              </h5>
              <small className="opacity-75">
                {flights.length} flight{flights.length !== 1 ? 's' : ''} found
              </small>
            </div>
            <div className="d-flex gap-2">
              <Button
                variant="light"
                size="sm"
                onClick={refresh}
                style={{ borderRadius: '8px', fontWeight: '600' }}
              >
                <i className="bi bi-arrow-clockwise me-1"></i>
                Refresh
              </Button>
            </div>
          </Card.Header>
          <Card.Body className="p-0">
            <FlightTable
              flights={flights}
              admin
              onEdit={onEdit}
              onDelete={onDelete}
            />
          </Card.Body>
        </Card>
      </Container>

      <FlightFormModal
        show={showModal}
        onHide={() => setShowModal(false)}
        onSubmit={onSubmit}
        initial={editing}
      />

      <ToastContainer position="bottom-end" className="p-3" style={{ zIndex: 9999 }}>
        <Toast
          bg={toast.bg}
          onClose={() => setToast({ ...toast, show: false })}
          show={toast.show}
          delay={3000}
          autohide
        >
          <Toast.Body className="text-white fw-semibold">
            <i className="bi bi-check-circle me-2"></i>
            {toast.msg}
          </Toast.Body>
        </Toast>
      </ToastContainer>

      {/* Logout Confirmation Modal */}
      <Modal
        show={showLogoutModal}
        onHide={() => setShowLogoutModal(false)}
        centered
        backdrop="static"
      >
        <Modal.Body className="p-0" style={{ borderRadius: '15px', overflow: 'hidden' }}>
          <div style={{
            background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
            padding: '30px',
            textAlign: 'center'
          }}>
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 15px',
              backdropFilter: 'blur(10px)'
            }}>
              <i className="bi bi-box-arrow-right" style={{ fontSize: '2.5rem', color: '#fff' }}></i>
            </div>
            <h4 className="fw-bold mb-2" style={{ color: '#fff' }}>Logout Confirmation</h4>
            <p className="mb-0" style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '0.95rem' }}>
              Are you sure you want to end your admin session?
            </p>
          </div>

          <div className="p-4">
            <div style={{
              background: '#fef2f2',
              border: '1px solid #fecaca',
              borderRadius: '10px',
              padding: '15px',
              marginBottom: '20px'
            }}>
              <div className="d-flex align-items-start">
                <i className="bi bi-info-circle-fill me-2 mt-1" style={{ color: '#ef4444' }}></i>
                <div>
                  <strong style={{ color: '#991b1b', fontSize: '0.9rem' }}>Important:</strong>
                  <p className="mb-0 mt-1" style={{ color: '#7f1d1d', fontSize: '0.85rem' }}>
                    You will be redirected to the login page and will need to re-authenticate to access the admin dashboard.
                  </p>
                </div>
              </div>
            </div>

            <div className="d-flex gap-2">
              <Button
                variant="outline-secondary"
                onClick={() => setShowLogoutModal(false)}
                className="flex-fill"
                style={{
                  borderRadius: '10px',
                  padding: '12px',
                  fontWeight: '600',
                  borderWidth: '2px'
                }}
              >
                <i className="bi bi-x-circle me-2"></i>
                Cancel
              </Button>
              <Button
                variant="danger"
                onClick={confirmLogout}
                className="flex-fill"
                style={{
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                  border: 'none',
                  padding: '12px',
                  fontWeight: '600',
                  boxShadow: '0 4px 15px rgba(239, 68, 68, 0.4)'
                }}
              >
                <i className="bi bi-box-arrow-right me-2"></i>
                Yes, Logout
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
