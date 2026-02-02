import { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would send the form data to a backend
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div style={{ background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)', minHeight: '100vh', paddingTop: '40px', paddingBottom: '60px' }}>
      <Container>
        <Row className="mb-5">
          <Col className="text-center">
            <h1 className="display-4 fw-bold mb-3" style={{ color: '#2d3748' }}>
              Get in Touch
            </h1>
            <p className="lead text-muted">
              We're here to help! Reach out to us with any questions or concerns.
            </p>
          </Col>
        </Row>

        <Row>
          <Col lg={8} className="mx-auto">
            <Card className="border-0 shadow-sm" style={{ borderRadius: '15px' }}>
              <Card.Body className="p-5">
                {submitted && (
                  <Alert variant="success" className="border-0 mb-4" style={{ borderRadius: '10px' }}>
                    <i className="bi bi-check-circle-fill me-2"></i>
                    Thank you for your message! We'll get back to you soon.
                  </Alert>
                )}

                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-semibold">Name</Form.Label>
                        <Form.Control
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Your name"
                          required
                          style={{ borderRadius: '10px', border: '2px solid #e2e8f0' }}
                          className="py-2"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-semibold">Email</Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="your.email@example.com"
                          required
                          style={{ borderRadius: '10px', border: '2px solid #e2e8f0' }}
                          className="py-2"
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">Subject</Form.Label>
                    <Form.Control
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="What's this about?"
                      required
                      style={{ borderRadius: '10px', border: '2px solid #e2e8f0' }}
                      className="py-2"
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label className="fw-semibold">Message</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={5}
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us more..."
                      required
                      style={{ borderRadius: '10px', border: '2px solid #e2e8f0' }}
                    />
                  </Form.Group>

                  <Button
                    type="submit"
                    variant="primary"
                    className="w-100 py-2 fw-semibold"
                    style={{
                      borderRadius: '10px',
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      border: 'none',
                      fontSize: '1.1rem',
                      boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)'
                    }}
                  >
                    <i className="bi bi-send me-2"></i>
                    Send Message
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="mt-5">
          <Col md={4} className="text-center mb-4">
            <div className="mb-3" style={{ fontSize: '2.5rem', color: '#667eea' }}>
              <i className="bi bi-envelope-fill"></i>
            </div>
            <h5 className="fw-bold">Email</h5>
            <p className="text-muted mb-0">support@skyportal.dev</p>
          </Col>
          <Col md={4} className="text-center mb-4">
            <div className="mb-3" style={{ fontSize: '2.5rem', color: '#667eea' }}>
              <i className="bi bi-telephone-fill"></i>
            </div>
            <h5 className="fw-bold">Phone</h5>
            <p className="text-muted mb-0">+1 (555) 123-4567</p>
          </Col>
          <Col md={4} className="text-center mb-4">
            <div className="mb-3" style={{ fontSize: '2.5rem', color: '#667eea' }}>
              <i className="bi bi-clock-fill"></i>
            </div>
            <h5 className="fw-bold">Hours</h5>
            <p className="text-muted mb-0">24/7 Support Available</p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
