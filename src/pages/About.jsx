import { Container, Row, Col, Card } from 'react-bootstrap';

export default function About() {
  return (
    <div style={{ background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)', minHeight: '100vh', paddingTop: '40px', paddingBottom: '60px' }}>
      <Container>
        <Row className="mb-5">
          <Col className="text-center">
            <h1 className="display-4 fw-bold mb-3" style={{ color: '#2d3748' }}>
              About SkyPortal
            </h1>
            <p className="lead text-muted" style={{ maxWidth: '700px', margin: '0 auto' }}>
              Your trusted partner for seamless flight booking and travel management
            </p>
          </Col>
        </Row>

        <Row className="mb-5">
          <Col lg={8} className="mx-auto">
            <Card className="border-0 shadow-sm mb-4" style={{ borderRadius: '15px' }}>
              <Card.Body className="p-5">
                <h3 className="fw-bold mb-4" style={{ color: '#667eea' }}>
                  <i className="bi bi-info-circle me-2"></i>Our Mission
                </h3>
                <p className="lead mb-4">
                  SkyPortal is dedicated to making air travel accessible, convenient, and enjoyable for everyone. 
                  We combine cutting-edge technology with exceptional customer service to provide you with the best 
                  flight booking experience.
                </p>
                <p className="text-muted">
                  Whether you're planning a business trip or a vacation, our platform offers comprehensive flight 
                  search, comparison, and booking capabilities. We work with leading airlines to bring you the best 
                  prices and most convenient schedules.
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col md={4} className="mb-4">
            <Card className="h-100 border-0 shadow-sm text-center" style={{ borderRadius: '15px' }}>
              <Card.Body className="p-4">
                <div className="mb-3" style={{ fontSize: '3rem', color: '#667eea' }}>
                  <i className="bi bi-globe"></i>
                </div>
                <h5 className="fw-bold">Global Reach</h5>
                <p className="text-muted mb-0">
                  Access flights to destinations worldwide with our extensive network of airline partners.
                </p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-4">
            <Card className="h-100 border-0 shadow-sm text-center" style={{ borderRadius: '15px' }}>
              <Card.Body className="p-4">
                <div className="mb-3" style={{ fontSize: '3rem', color: '#667eea' }}>
                  <i className="bi bi-lightning-charge"></i>
                </div>
                <h5 className="fw-bold">Fast & Easy</h5>
                <p className="text-muted mb-0">
                  Book your flights in minutes with our intuitive interface and streamlined booking process.
                </p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-4">
            <Card className="h-100 border-0 shadow-sm text-center" style={{ borderRadius: '15px' }}>
              <Card.Body className="p-4">
                <div className="mb-3" style={{ fontSize: '3rem', color: '#667eea' }}>
                  <i className="bi bi-heart"></i>
                </div>
                <h5 className="fw-bold">Customer First</h5>
                <p className="text-muted mb-0">
                  Your satisfaction is our priority. We're here to help you every step of the way.
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}