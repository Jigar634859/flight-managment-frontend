import { useEffect, useState } from 'react';
import { Container, Card, Row, Col, Form, Button, Badge, InputGroup } from 'react-bootstrap';
import { getFlights, searchFlights } from '../services/flightsService';
import FlightTable from '../components/FlightTable';

export default function Flights() {
  const [flights, setFlights] = useState([]);
  const [searchMode, setSearchMode] = useState('all'); // 'all' or 'advanced'
  const [searchParams, setSearchParams] = useState({
    from: '',
    to: '',
    date: ''
  });
  const [isSearching, setIsSearching] = useState(false);

  const loadAllFlights = async () => {
    setFlights(await getFlights());
    setSearchMode('all');
    setSearchParams({ from: '', to: '', date: '' });
  };

  useEffect(() => {
    loadAllFlights();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchParams.from || !searchParams.to) {
      alert('Please enter both From and To locations');
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
    } catch (err) {
      alert('Search failed. Please try again.');
      console.error('Search error:', err);
    } finally {
      setIsSearching(false);
    }
  };

  const clearSearch = () => {
    loadAllFlights();
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
          <h2 className="fw-bold mb-1" style={{ color: '#2d3748' }}>
            <i className="bi bi-airplane-fill me-3" style={{ color: '#667eea' }}></i>
            Browse Flights
          </h2>
          <p className="text-muted mb-0">Search and book your perfect flight</p>
        </div>

        {/* Advanced Search Card */}
        <Card className="border-0 shadow-sm mb-4" style={{ borderRadius: '15px' }}>
          <Card.Body className="p-4">
            <div className="d-flex align-items-center mb-3">
              <i className="bi bi-search me-2" style={{ fontSize: '1.3rem', color: '#667eea' }}></i>
              <h5 className="mb-0 fw-bold">Search Flights</h5>
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
                        Show All
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
                <i className="bi bi-list-ul me-2"></i>
                {searchMode === 'advanced' ? 'Search Results' : 'All Available Flights'}
              </h5>
              <small className="opacity-75">
                {flights.length} flight{flights.length !== 1 ? 's' : ''} available
              </small>
            </div>
            <div className="d-flex gap-2">
              <Button
                variant="light"
                size="sm"
                onClick={loadAllFlights}
                style={{ borderRadius: '8px', fontWeight: '600' }}
              >
                <i className="bi bi-arrow-clockwise me-1"></i>
                Refresh
              </Button>
            </div>
          </Card.Header>
          <Card.Body className="p-0">
            <FlightTable flights={flights} clickable />
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}